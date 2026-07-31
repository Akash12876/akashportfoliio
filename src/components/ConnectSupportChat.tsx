"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaHeadset,
  FaTimes,
  FaPaperPlane,
  FaUserCircle,
  FaPhoneAlt,
  FaCircle,
} from "react-icons/fa";
import {
  createCustomerChatSession,
  type ConnectChatSession,
  type ConnectTranscriptItem,
} from "@/lib/connectChatSession";

type SupportMsg = {
  id: string;
  role: "customer" | "agent" | "system";
  content: string;
  time: string;
};

type Phase = "idle" | "prechat" | "connecting" | "chatting" | "ended";

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const QUEUE_TOPICS = [
  "General inquiry",
  "Project discussion",
  "Amazon Connect / IVR",
  "Hire / Collaborate",
] as const;

/**
 * Live Support widget — same UI as before, backed by real Amazon Connect Chat.
 * Not an AI agent: messages come from Connect agents / contact flow via ChatJS.
 */
export default function ConnectSupportChat() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof QUEUE_TOPICS)[number]>("General inquiry");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<SupportMsg[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);
  const [queueSeconds, setQueueSeconds] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Amazon Connect ready");
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<ConnectChatSession | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, agentTyping, phase]);

  // Queue wait timer while connecting / waiting for agent
  useEffect(() => {
    if (phase !== "connecting") return;
    setQueueSeconds(0);
    const tick = window.setInterval(() => setQueueSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(tick);
  }, [phase]);

  const pushMsg = useCallback((msg: SupportMsg) => {
    if (seenIdsRef.current.has(msg.id)) return;
    seenIdsRef.current.add(msg.id);
    setMessages((m) => [...m, msg]);
  }, []);

  const cleanupSession = useCallback(async () => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    const session = sessionRef.current;
    sessionRef.current = null;
    if (!session) return;
    try {
      await session.disconnectParticipant();
    } catch {
      // Session may already be closed
    }
  }, []);

  const handleTranscriptItem = useCallback(
    (data: ConnectTranscriptItem) => {
      const id = data.Id ?? uid();
      const content = (data.Content ?? "").trim();
      const role = (data.ParticipantRole ?? "").toUpperCase();
      const type = (data.Type ?? "").toUpperCase();
      const contentType = data.ContentType ?? "";

      // Typing events are handled separately
      if (contentType.includes("typing")) return;

      if (type === "MESSAGE" || content) {
        if (role === "CUSTOMER") {
          // Customer messages are shown when we send; skip websocket echo duplicates
          if (seenIdsRef.current.has(id)) return;
          pushMsg({ id, role: "customer", content: content || "(message)", time: nowTime() });
          return;
        }
        if (role === "AGENT") {
          setAgentTyping(false);
          setStatusLabel("Agent connected");
          pushMsg({
            id,
            role: "agent",
            content: content || "(empty message)",
            time: nowTime(),
          });
          return;
        }
        // SYSTEM / bot prompts from the contact flow
        if (content) {
          pushMsg({ id, role: "system", content, time: nowTime() });
        }
      }
    },
    [pushMsg]
  );

  const wireSessionEvents = useCallback(
    (session: ConnectChatSession) => {
      session.onConnectionEstablished(() => {
        setPhase("chatting");
        setStatusLabel("Connected — waiting for agent");
        pushMsg({
          id: uid(),
          role: "system",
          content: "Connected to Amazon Connect. Waiting for a support agent…",
          time: nowTime(),
        });
      });

      session.onMessage((event) => {
        handleTranscriptItem(event.data);
      });

      session.onTyping((event) => {
        const role = (event.data?.ParticipantRole ?? "").toUpperCase();
        if (role === "AGENT") {
          setAgentTyping(true);
          if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
          typingTimerRef.current = setTimeout(() => setAgentTyping(false), 4000);
        }
      });

      session.onEnded(() => {
        setAgentTyping(false);
        setStatusLabel("Session ended");
        setPhase("ended");
        pushMsg({
          id: uid(),
          role: "system",
          content: "Agent left the chat. Thank you for contacting support.",
          time: nowTime(),
        });
        sessionRef.current = null;
      });

      session.onConnectionBroken(() => {
        setAgentTyping(false);
        setStatusLabel("Connection lost");
        setPhase("ended");
        pushMsg({
          id: uid(),
          role: "system",
          content: "Connection to Amazon Connect was lost.",
          time: nowTime(),
        });
        sessionRef.current = null;
      });
    },
    [handleTranscriptItem, pushMsg]
  );

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setError("");
    seenIdsRef.current = new Set();
    setMessages([
      {
        id: uid(),
        role: "system",
        content: `Queue: ${topic} · Starting Amazon Connect contact…`,
        time: nowTime(),
      },
    ]);
    setPhase("connecting");
    setStatusLabel("In queue…");

    try {
      const res = await fetch("/api/start-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
        }),
      });

      const data = (await res.json()) as {
        contactId?: string;
        participantId?: string;
        participantToken?: string;
        region?: string;
        error?: string;
        details?: string;
      };

      if (!res.ok || !data.contactId || !data.participantId || !data.participantToken) {
        throw new Error(data.details || data.error || "Failed to start chat");
      }

      const session = await createCustomerChatSession({
        contactId: data.contactId,
        participantId: data.participantId,
        participantToken: data.participantToken,
        region: data.region ?? "us-west-2",
      });

      sessionRef.current = session;
      wireSessionEvents(session);
      await session.connect();
      // onConnectionEstablished will flip phase to chatting
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setPhase("prechat");
      setStatusLabel("Amazon Connect ready");
      setMessages([]);
      sessionRef.current = null;
    }
  };

  const sendCustomer = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || phase !== "chatting") return;
    const session = sessionRef.current;
    if (!session) return;

    const localId = uid();
    pushMsg({ id: localId, role: "customer", content: trimmed, time: nowTime() });
    setInput("");

    try {
      await session.sendMessage({
        message: trimmed,
        contentType: "text/plain",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      pushMsg({
        id: uid(),
        role: "system",
        content: `Could not send message: ${message}`,
        time: nowTime(),
      });
    }
  };

  const endChat = async () => {
    await cleanupSession();
    setAgentTyping(false);
    setStatusLabel("Session ended");
    pushMsg({
      id: uid(),
      role: "system",
      content: "Chat ended. Thank you for contacting support.",
      time: nowTime(),
    });
    setPhase("ended");
  };

  const reset = () => {
    void cleanupSession();
    setPhase("prechat");
    setMessages([]);
    setInput("");
    setAgentTyping(false);
    setQueueSeconds(0);
    setError("");
    setStatusLabel("Amazon Connect ready");
    seenIdsRef.current = new Set();
  };

  const openWidget = () => {
    setOpen(true);
    if (phase === "idle" || phase === "ended") {
      setPhase("prechat");
      if (phase === "ended") {
        setMessages([]);
        setError("");
        setStatusLabel("Amazon Connect ready");
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      void cleanupSession();
    };
  }, [cleanupSession]);

  const statusDotGreen = phase === "chatting" && statusLabel === "Agent connected";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-4 z-[70] flex h-[min(560px,78vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#ff9900]/35 bg-[#0b1220] shadow-2xl shadow-orange-500/15 sm:left-6"
          >
            <header className="flex items-center justify-between bg-gradient-to-r from-[#232f3e] via-[#1a2332] to-[#232f3e] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff9900] text-[#232f3e]">
                  <FaHeadset className="text-lg" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Live Support</p>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <FaCircle
                      className={`text-[8px] ${statusDotGreen ? "text-emerald-400" : "text-amber-400"}`}
                    />
                    {phase === "connecting" && `In queue… (${queueSeconds}s)`}
                    {phase === "chatting" && statusLabel}
                    {phase === "prechat" && "Amazon Connect ready"}
                    {phase === "ended" && "Session ended"}
                    {phase === "idle" && "Support"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {phase === "chatting" && (
                  <button
                    type="button"
                    onClick={() => void endChat()}
                    className="rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                  >
                    End
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close support chat"
                >
                  <FaTimes />
                </button>
              </div>
            </header>

            <div className="border-b border-white/5 bg-[#161e2e] px-3 py-1.5 text-center text-[10px] font-medium tracking-wide text-[#ff9900]/90 uppercase">
              Human support · Not an AI agent · Amazon Connect Chat
            </div>

            {phase === "prechat" && (
              <form onSubmit={(e) => void startChat(e)} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                <p className="text-sm text-zinc-300">
                  Start a live chat with our support team — powered by Amazon Connect.
                </p>
                {error ? (
                  <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                    {error}
                  </p>
                ) : null}
                <label className="block text-xs font-semibold text-zinc-400">
                  Your name
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ff9900]/50"
                    placeholder="Full name"
                  />
                </label>
                <label className="block text-xs font-semibold text-zinc-400">
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ff9900]/50"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block text-xs font-semibold text-zinc-400">
                  Queue / topic
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as (typeof QUEUE_TOPICS)[number])}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ff9900]/50"
                  >
                    {QUEUE_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#ff9900] py-3 text-sm font-bold text-[#232f3e] transition hover:bg-[#ffb84d]"
                >
                  <FaPhoneAlt />
                  Start live chat
                </button>
              </form>
            )}

            {phase === "connecting" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ff9900]/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                >
                  <FaHeadset className="text-2xl text-[#ff9900]" />
                </motion.div>
                <div>
                  <p className="text-base font-semibold text-white">Connecting to support…</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Amazon Connect · Wait {queueSeconds}s
                  </p>
                  <p className="mt-3 text-xs text-zinc-500">
                    Starting contact and opening chat session…
                  </p>
                </div>
              </div>
            )}

            {(phase === "chatting" || phase === "ended") && (
              <>
                <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#0e1624] px-3 py-4">
                  {messages.map((msg) => {
                    if (msg.role === "system") {
                      return (
                        <p key={msg.id} className="text-center text-[11px] text-zinc-500">
                          {msg.content}
                        </p>
                      );
                    }
                    const isCustomer = msg.role === "customer";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${isCustomer ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {!isCustomer && (
                          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#232f3e] text-[#ff9900]">
                            <FaUserCircle />
                          </span>
                        )}
                        <div
                          className={`max-w-[78%] ${isCustomer ? "items-end" : "items-start"} flex flex-col`}
                        >
                          {!isCustomer && (
                            <span className="mb-0.5 text-[10px] font-semibold text-[#ff9900]">
                              Support Agent
                            </span>
                          )}
                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                              isCustomer
                                ? "rounded-br-md bg-[#ff9900] text-[#1a1a1a]"
                                : "rounded-bl-md border border-white/10 bg-[#1a2436] text-zinc-100"
                            }`}
                          >
                            {msg.content}
                          </div>
                          <span className="mt-0.5 text-[10px] text-zinc-500">{msg.time}</span>
                        </div>
                      </div>
                    );
                  })}
                  {agentTyping && (
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#232f3e] text-[#ff9900]">
                        <FaUserCircle />
                      </span>
                      <div className="rounded-2xl border border-white/10 bg-[#1a2436] px-4 py-2.5">
                        <span className="text-xs text-zinc-400">Agent is typing</span>
                        <span className="ml-1 inline-flex gap-0.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff9900]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff9900] [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff9900] [animation-delay:300ms]" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {phase === "chatting" ? (
                  <form
                    className="flex gap-2 border-t border-white/10 bg-[#161e2e] px-3 py-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void sendCustomer(input);
                    }}
                  >
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message to support…"
                      className="flex-1 rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#ff9900]/50"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff9900] text-[#232f3e] disabled:opacity-40"
                      aria-label="Send message"
                    >
                      <FaPaperPlane className="text-sm" />
                    </button>
                  </form>
                ) : (
                  <div className="border-t border-white/10 bg-[#161e2e] px-3 py-3">
                    <button
                      type="button"
                      onClick={reset}
                      className="w-full rounded-xl bg-[#ff9900] py-2.5 text-sm font-bold text-[#232f3e]"
                    >
                      Start new chat
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : openWidget())}
        className="fixed bottom-6 left-4 z-[70] flex items-center gap-2 rounded-full border border-[#ff9900]/50 bg-[#232f3e] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 sm:left-6"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label={open ? "Close live support" : "Open live support chat"}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff9900] text-[#232f3e]">
          <FaHeadset />
        </span>
        <span className="hidden sm:inline">{open ? "Close chat" : "Live Support"}</span>
      </motion.button>
    </>
  );
}
