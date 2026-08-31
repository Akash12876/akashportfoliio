"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  FaAws,
  FaCopy,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import PremiumButton from "@/components/PremiumButton";

const ease = [0.22, 1, 0.36, 1] as const;

/** Real AWS services Akash works with — click to see actual use cases */
const AWS_SERVICES = [
  {
    id: "ec2",
    name: "EC2",
    short: "Compute",
    detail:
      "Linux instances for app hosting — security groups, SSH access, Nginx + Node deployments, and environment setup for production workloads.",
  },
  {
    id: "s3",
    name: "S3",
    short: "Storage",
    detail:
      "Bucket creation, object uploads, public/private ACLs, lifecycle rules, static asset hosting, and CloudFront origins for fast delivery.",
  },
  {
    id: "lambda",
    name: "Lambda",
    short: "Serverless",
    detail:
      "CRM + Connect automation — webhook handlers, EventBridge triggers, contact flow callbacks, and API integrations without managing servers.",
  },
  {
    id: "rds",
    name: "RDS",
    short: "Database",
    detail:
      "PostgreSQL on RDS for SaaS apps — connection pooling, backups, security groups, and pairing with Prisma ORM in production.",
  },
  {
    id: "iam",
    name: "IAM",
    short: "Security",
    detail:
      "Least-privilege policies for Connect, Lambda, and S3. Access keys for APIs, role-based permissions, and secure service-to-service auth.",
  },
  {
    id: "eventbridge",
    name: "EventBridge",
    short: "Events",
    detail:
      "Event-driven workflows between Connect, Lambda, and CRM — routing contact events and automating downstream actions.",
  },
  {
    id: "cloudwatch",
    name: "CloudWatch",
    short: "Monitoring",
    detail:
      "Logs, metrics, and alarms for Lambda functions and Connect integrations — debugging production issues before users notice.",
  },
  {
    id: "amplify",
    name: "Amplify",
    short: "Deploy",
    detail:
      "Frontend hosting with CI/CD hooks, env vars, custom domains, and pairing with backend APIs on Vercel or AWS.",
  },
  {
    id: "apigateway",
    name: "API Gateway",
    short: "APIs",
    detail:
      "REST endpoints in front of Lambda — throttling, API keys, and secure public interfaces for SaaS and Connect webhooks.",
  },
  {
    id: "cognito",
    name: "Cognito",
    short: "Auth",
    detail:
      "User pools and identity for web apps — federated login patterns alongside Clerk/custom auth in full-stack projects.",
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    short: "CDN",
    detail:
      "CDN in front of S3 and web origins — cache policies, HTTPS, and lower latency for static assets and media.",
  },
  {
    id: "connect",
    name: "Connect",
    short: "Contact Center",
    detail:
      "Contact flows, IVR, Lex V2, queues, chat, CCP — the core of CRM + support automation work at AR Group.",
  },
];

const WORK_LOG = [
  {
    when: "Now",
    what: "AR Group of Education",
    note: "CRM SaaS, Connect IVR/Lex, 3× WordPress → Next.js migrations, Lambda hooks",
  },
  {
    when: "2026",
    what: "Nexiora AI",
    note: "Evidence-first search, SSE streaming, Turborepo monorepo, Razorpay billing",
  },
  {
    when: "2024–25",
    what: "E-commerce & WordPress",
    note: "Marketplace ops, SEO, custom themes — foundation before full-stack",
  },
];

const PRINCIPLES = [
  "Ship to production, then polish — not the other way around.",
  "Every API and contact flow should be debuggable at 2 AM.",
  "WordPress got me started; Next.js + AWS is where I build now.",
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 70, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function AwsCloudPanel() {
  const [active, setActive] = useState("ec2");
  const selected = AWS_SERVICES.find((s) => s.id === active) ?? AWS_SERVICES[0];

  return (
    <div className="rounded-2xl border border-sky-500/15 bg-[#0a0f14] p-5 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-500/80">
            aws console
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">Cloud services I use</h3>
        </div>
        <FaAws className="text-2xl text-orange-400/90" />
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {AWS_SERVICES.map((svc) => (
          <button
            key={svc.id}
            type="button"
            onClick={() => setActive(svc.id)}
            className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition ${
              active === svc.id
                ? "border-sky-400/50 bg-sky-500/15 text-sky-200"
                : "border-white/8 bg-white/[0.03] text-zinc-500 hover:border-white/15 hover:text-zinc-300"
            }`}
          >
            {svc.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="rounded-xl border border-white/8 bg-black/40 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-orange-500/20 px-2 py-0.5 font-mono text-xs font-bold text-orange-300">
              {selected.name}
            </span>
            <span className="text-xs text-zinc-600">{selected.short}</span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">{selected.detail}</p>
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 font-mono text-[10px] text-zinc-600">
        + Route 53 · DynamoDB · Secrets Manager · SNS · VPC
      </p>
    </div>
  );
}

export default function AboutSection() {
  const [copied, setCopied] = useState(false);
  const [noteIdx, setNoteIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNoteIdx((i) => (i + 1) % PRINCIPLES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("pandeyakash85296@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section
      id="about"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/[0.04] bg-[#060608] px-4 py-20 sm:px-8 sm:py-24"
    >
      {/* subtle grid — not generic blobs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header — left-aligned, human voice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className="mb-12 max-w-3xl md:mb-14"
        >
          <p className="mb-3 flex items-center gap-2 font-mono text-xs text-zinc-600">
            <FaMapMarkerAlt className="text-zinc-500" />
            Noida, India · BCA 2025 · Software Engineer
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-tight">
            I build web apps, contact centers,
            <span className="text-zinc-500"> and </span>
            AI tools that run in production.
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-zinc-400 md:text-lg">
            Started with WordPress and e-commerce — product listings, SEO, the usual grind.
            Now at{" "}
            <span className="text-zinc-200">AR Group of Education</span>, I work on CRM SaaS,
            Amazon Connect (IVR, Lex, live chat), and AWS — EC2 instances, S3 buckets, Lambda,
            RDS, IAM, CloudWatch. Side project:{" "}
            <span className="text-zinc-200">Nexiora AI</span>, an evidence-first research platform.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left — story + work log */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                rotating note
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={noteIdx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-base italic leading-relaxed text-zinc-300"
                >
                  &ldquo;{PRINCIPLES[noteIdx]}&rdquo;
                </motion.p>
              </AnimatePresence>

              <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
                {WORK_LOG.map((entry) => (
                  <li key={entry.what} className="flex gap-4">
                    <span className="w-14 shrink-0 font-mono text-xs text-cyan-600/90 pt-0.5">
                      {entry.when}
                    </span>
                    <div>
                      <p className="font-medium text-zinc-200">{entry.what}</p>
                      <p className="mt-0.5 text-sm text-zinc-500">{entry.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: 0.06 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { n: 20, s: "+", l: "months coding professionally" },
                { n: 8, s: "+", l: "projects shipped" },
                { n: 3, s: "", l: "WP → Next.js migrations" },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="rounded-xl border border-white/[0.06] bg-black/30 px-3 py-4 text-center"
                >
                  <p className="text-2xl font-bold text-white">
                    <AnimatedCounter value={stat.n} suffix={stat.s} />
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-zinc-600">{stat.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — AWS panel + cert + connect */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease, delay: 0.04 }}
            >
              <AwsCloudPanel />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.45, ease }}
              className="flex flex-col gap-4 rounded-2xl border border-orange-500/15 bg-orange-950/20 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-orange-500/70">
                  AWS Certified
                </p>
                <p className="mt-1 font-semibold text-white">Amazon Connect Developer</p>
                <p className="text-sm text-zinc-500">Jul 2026 · Credly verified</p>
              </div>
              <span className="self-start rounded-lg border border-orange-500/25 bg-orange-500/10 px-3 py-1.5 font-mono text-xs text-orange-300 sm:self-center">
                connect + cloud
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45, ease }}
              className="flex flex-wrap gap-2"
            >
              <PremiumButton
                href="https://www.linkedin.com/in/akash-pandey-5b9494315"
                variant="primary"
                size="sm"
              >
                <FaLinkedin />
                LinkedIn
              </PremiumButton>
              <button
                type="button"
                onClick={() => void copyEmail()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
              >
                <FaCopy className="text-xs" />
                {copied ? "Copied" : "pandeyakash85296@gmail.com"}
              </button>
              <PremiumButton href="#skills" variant="outline" size="sm">
                See all skills
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
