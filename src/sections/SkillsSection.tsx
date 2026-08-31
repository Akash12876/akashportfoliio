"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import SkillsAmbientBg from "@/components/SkillsAmbientBg";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaShopify,
  FaWordpress,
  FaPhoneAlt,
  FaHeadset,
  FaComments,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiGithubactions,
  SiNginx,
} from "react-icons/si";

const easeOut = [0.22, 1, 0.36, 1] as const;

const typingPhrases = [
  "EC2 · S3 · Lambda · RDS · IAM · CloudWatch",
  "Amazon Connect · IVR · Lex · Live Chat",
  "Next.js · TypeScript · PostgreSQL · Prisma",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, delay: i * 0.1 },
  }),
};

function TypingSubheading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!inView) return;
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (charIdx < typingPhrases[phraseIdx].length) {
        timeout = setTimeout(() => {
          setDisplay((d) => d + typingPhrases[phraseIdx][charIdx]);
          setCharIdx((i) => i + 1);
        }, 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 1400);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplay("");
        setCharIdx(0);
        setTyping(true);
        setPhraseIdx((idx) => (idx + 1) % typingPhrases.length);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, typing, inView, phraseIdx]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: easeOut }}
      className="mt-4 flex min-h-[2.75rem] w-full justify-center px-2"
    >
      <span className="inline-flex max-w-full items-center rounded-lg border border-cyan-900/30 bg-black/40 px-4 py-1.5 font-mono text-sm text-cyan-300 sm:text-base">
        <span className="truncate">{inView ? display : "\u00a0"}</span>
        <span
          className="ml-1 inline-block h-4 w-0.5 shrink-0 rounded-sm bg-cyan-400"
          style={{ animation: inView ? "skills-cursor-blink 1s step-end infinite" : "none" }}
        />
      </span>
    </motion.div>
  );
}

type Skill = { name: string; icon: React.ReactNode; level: string };
type SkillCategory = { title: string; color: string; skills: Skill[] };

const skillCategories: SkillCategory[] = [
  {
    title: "Web Development",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" />, level: "Expert" },
      { name: "Next.js", icon: <SiNextdotjs className="text-zinc-200" />, level: "Advanced" },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" />, level: "Intermediate" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, level: "Advanced" },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-400" />, level: "Expert" },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-300" />, level: "Expert" },
      { name: "JavaScript", icon: <FaJs className="text-yellow-300" />, level: "Expert" },
      { name: "PostgreSQL", icon: <FaDatabase className="text-blue-400" />, level: "Advanced" },
      { name: "Express.js", icon: <SiNginx className="text-gray-200" />, level: "Advanced" },
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" />, level: "Intermediate" },
      { name: "Database", icon: <FaDatabase className="text-blue-200" />, level: "Advanced" },
      { name: "Shopify", icon: <FaShopify className="text-green-400" />, level: "Expert" },
      { name: "WordPress", icon: <FaWordpress className="text-blue-400" />, level: "Expert" },
    ],
  },
  {
    title: "Amazon Connect",
    color: "from-orange-400 via-amber-500 to-yellow-400",
    skills: [
      { name: "Amazon Connect", icon: <FaPhoneAlt className="text-orange-400" />, level: "Advanced" },
      { name: "Contact Flows", icon: <FaHeadset className="text-amber-300" />, level: "Advanced" },
      { name: "IVR / Routing", icon: <FaComments className="text-yellow-300" />, level: "Advanced" },
      { name: "Agent Workspace", icon: <FaHeadset className="text-orange-300" />, level: "Intermediate" },
      { name: "Contact Lens", icon: <FaChartLine className="text-cyan-300" />, level: "Intermediate" },
      { name: "Lex / Chatbots", icon: <FaRobot className="text-sky-300" />, level: "Intermediate" },
      { name: "CCP Integration", icon: <FaPhoneAlt className="text-amber-400" />, level: "Advanced" },
      { name: "Call Analytics", icon: <FaChartLine className="text-green-300" />, level: "Intermediate" },
    ],
  },
  {
    title: "AWS Cloud",
    color: "from-sky-400 via-blue-500 to-indigo-500",
    skills: [
      { name: "EC2 Instances", icon: <FaAws className="text-amber-400" />, level: "Advanced" },
      { name: "S3 Buckets", icon: <FaAws className="text-orange-300" />, level: "Advanced" },
      { name: "AWS Lambda", icon: <FaNodeJs className="text-green-400" />, level: "Advanced" },
      { name: "Amazon RDS", icon: <FaDatabase className="text-blue-400" />, level: "Advanced" },
      { name: "IAM & Security", icon: <FaAws className="text-red-300" />, level: "Advanced" },
      { name: "EventBridge", icon: <FaAws className="text-yellow-300" />, level: "Intermediate" },
      { name: "CloudWatch", icon: <FaChartLine className="text-purple-300" />, level: "Advanced" },
      { name: "AWS Amplify", icon: <FaAws className="text-orange-400" />, level: "Advanced" },
      { name: "API Gateway", icon: <FaAws className="text-cyan-300" />, level: "Advanced" },
      { name: "CloudFront CDN", icon: <FaAws className="text-sky-300" />, level: "Intermediate" },
      { name: "Cognito Auth", icon: <FaAws className="text-yellow-300" />, level: "Intermediate" },
      { name: "Route 53 DNS", icon: <FaDatabase className="text-sky-200" />, level: "Intermediate" },
      { name: "DynamoDB", icon: <FaDatabase className="text-blue-300" />, level: "Intermediate" },
      { name: "VPC & Networking", icon: <FaAws className="text-indigo-300" />, level: "Intermediate" },
      { name: "CI/CD Pipeline", icon: <SiGithubactions className="text-gray-200" />, level: "Advanced" },
    ],
  },
];

type SkillCardProps = { cat: SkillCategory; i: number };

function SkillCard({ cat, i }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.2, once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.article
      ref={cardRef}
      custom={i}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#18181c]/95 shadow-2xl"
      style={{ boxShadow: "0 8px 48px 0 #000a, 0 1.5px 0 #222" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, ease: easeOut, delay: 0.08 + i * 0.1 }}
        className="flex w-full flex-col items-center justify-between px-4 py-8 md:flex-row md:px-12 md:py-10"
      >
        <motion.div
          className="mb-8 flex flex-1 items-center justify-center md:mb-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 + i * 0.1 } },
          }}
        >
          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-6"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            {cat.skills.map((skill: Skill) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.92 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: easeOut } },
                }}
                className="flex flex-col items-center gap-2 rounded-xl bg-black/40 p-3 shadow transition-colors duration-300 hover:bg-black/55"
              >
                <span className="mb-1 text-3xl drop-shadow-lg md:text-4xl">{skill.icon}</span>
                <span className="text-center text-sm font-medium text-zinc-100 md:text-base">{skill.name}</span>
                <span className="font-mono text-xs text-cyan-200">{skill.level}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-1 flex-col items-start justify-center md:pl-12"
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 + i * 0.1 }}
        >
          <h3
            className={`mb-4 bg-gradient-to-r ${cat.color} bg-clip-text text-2xl font-bold text-transparent sm:text-3xl`}
          >
            {cat.title}
          </h3>
          <ul className="mb-6 max-h-48 space-y-2 overflow-y-auto pr-1 sm:max-h-none">
            {cat.skills.map((skill: Skill) => (
              <li key={skill.name} className="flex items-center gap-2 text-base sm:text-lg">
                <span className="inline-block shrink-0">{skill.icon}</span>
                <span className="font-semibold text-zinc-100">{skill.name}</span>
                <span className="ml-auto text-xs text-cyan-300 sm:ml-2">{skill.level}</span>
              </li>
            ))}
          </ul>
          <PremiumButton
            variant="primary"
            size="md"
            className="premium-btn-no-shine mt-2"
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Learn More
          </PremiumButton>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { amount: 0.6, once: true });

  return (
    <section
      id="skills"
      className="relative flex w-full scroll-mt-28 flex-col items-center overflow-hidden bg-[#050509] px-4 py-24 text-white sm:px-8 sm:py-28"
    >
      <SkillsAmbientBg />
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, ease: easeOut }}
        className="z-10 mb-14 flex w-full max-w-3xl flex-col items-center text-center"
      >
        <div className="rounded-xl bg-[#18181c] px-5 py-2 shadow-lg">
          <h2
            className="m-0 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            style={{ fontFamily: "Montserrat, Poppins, sans-serif", fontWeight: 700, letterSpacing: "0.01em" }}
          >
            My Skills
          </h2>
        </div>
        <TypingSubheading />
      </motion.header>

      <motion.div
        className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-12 sm:gap-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} i={i} />
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes skills-cursor-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
