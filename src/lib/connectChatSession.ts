/**
 * Thin wrapper around amazon-connect-chatjs for the customer chat session.
 * ChatJS is loaded only in the browser (dynamic import) — it references `self`
 * and must never run during Next.js SSR / prerender.
 */

export type StartChatCredentials = {
  contactId: string;
  participantId: string;
  participantToken: string;
  region?: string;
};

/** Minimal shape we use from ChatJS event payloads. */
export type ConnectTranscriptItem = {
  Id?: string;
  Type?: string;
  Content?: string;
  ContentType?: string;
  ParticipantRole?: string;
  DisplayName?: string;
  AbsoluteTime?: string;
};

export type ConnectChatSession = {
  connect: () => Promise<unknown>;
  sendMessage: (args: { message: string; contentType: string }) => Promise<unknown>;
  sendEvent: (args: { contentType: string }) => Promise<unknown>;
  disconnectParticipant: () => Promise<unknown>;
  onMessage: (handler: (event: { data: ConnectTranscriptItem }) => void) => void;
  onTyping: (handler: (event: { data: ConnectTranscriptItem }) => void) => void;
  onEnded: (handler: (event: unknown) => void) => void;
  onConnectionBroken: (handler: (event: unknown) => void) => void;
  onConnectionEstablished: (handler: (event: unknown) => void) => void;
};

type ConnectGlobal = {
  ChatSession: {
    create: (args: {
      chatDetails: {
        contactId: string;
        participantId: string;
        participantToken: string;
      };
      options?: { region?: string };
      type: "CUSTOMER";
      disableCSM?: boolean;
    }) => ConnectChatSession;
  };
};

let chatJsLoadPromise: Promise<void> | null = null;

async function ensureChatJsLoaded(): Promise<ConnectGlobal> {
  if (typeof window === "undefined") {
    throw new Error("Amazon Connect Chat can only start in the browser.");
  }

  const g = globalThis as typeof globalThis & { connect?: ConnectGlobal };
  if (g.connect?.ChatSession) return g.connect;

  if (!chatJsLoadPromise) {
    chatJsLoadPromise = import("amazon-connect-chatjs").then(() => undefined);
  }
  await chatJsLoadPromise;

  if (!g.connect?.ChatSession) {
    chatJsLoadPromise = null;
    throw new Error(
      "amazon-connect-chatjs failed to load (connect.ChatSession missing). Refresh and try again."
    );
  }
  return g.connect;
}

export async function createCustomerChatSession(
  creds: StartChatCredentials
): Promise<ConnectChatSession> {
  const region = creds.region ?? "us-west-2";
  const connect = await ensureChatJsLoaded();

  return connect.ChatSession.create({
    chatDetails: {
      contactId: creds.contactId,
      participantId: creds.participantId,
      participantToken: creds.participantToken,
    },
    options: { region },
    type: "CUSTOMER",
    disableCSM: true,
  });
}
