"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaHtml5, FaCss3Alt, FaJs, FaMobileAlt, FaDatabase, FaLinux } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiDocker, SiMongodb, SiRedux, SiKubernetes, SiGithubactions, SiJenkins, SiNginx, SiTerraform } from "react-icons/si";

// Typing animation subheading component
function TypingSubheading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.7, once: false });
  const phrases = [
    "Expertise in Web, App & DevOps 🚀",
    "React, Next.js, Node.js, AWS, Docker, ...",
    "Building modern, scalable solutions!",
  ];
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (inView) {
      if (typing) {
        if (charIdx < phrases[phraseIdx].length) {
          timeout = setTimeout(() => {
            setDisplay((d) => d + phrases[phraseIdx][charIdx]);
            setCharIdx((i) => i + 1);
          }, 60);
        } else {
          timeout = setTimeout(() => setTyping(false), 1200);
        }
      } else {
        timeout = setTimeout(() => {
          setDisplay("");
          setCharIdx(0);
          setTyping(true);
          setPhraseIdx((idx) => (idx + 1) % phrases.length);
        }, 700);
      }
    } else {
      setDisplay("");
      setCharIdx(0);
      setTyping(true);
      setPhraseIdx(0);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [charIdx, typing, inView]);

  return (
    <div ref={ref} className="mt-3 min-h-[32px] flex justify-center">
      <span className="text-base sm:text-lg font-mono text-cyan-300 bg-black/30 px-3 py-1 rounded shadow-inner border border-cyan-900/20 animate-pulse-fast">
        {display}
        <span className="inline-block w-2 h-5 align-middle bg-cyan-400 ml-1 animate-blink rounded-sm" />
      </span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
        .animate-pulse-fast { animation: pulse 1.2s cubic-bezier(.4,0,.6,1) infinite; }
      `}</style>
    </div>
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
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" />, level: "Advanced" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, level: "Advanced" },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-400" />, level: "Expert" },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-300" />, level: "Expert" },
      { name: "JavaScript", icon: <FaJs className="text-yellow-300" />, level: "Expert" },
      { name: "Redux", icon: <SiRedux className="text-purple-400" />, level: "Advanced" },
    ],
  },
  {
    title: "App Development",
    color: "from-pink-500 to-purple-500",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" />, level: "Advanced" },
      { name: "Mobile Apps", icon: <FaMobileAlt className="text-pink-300" />, level: "Intermediate" },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "Advanced" },
      { name: "Database", icon: <FaDatabase className="text-blue-200" />, level: "Advanced" },
    ],
  },
  {
    title: "DevOps",
    color: "from-yellow-400 via-green-400 to-blue-400",
    skills: [
      { name: "AWS", icon: <FaAws className="text-yellow-400" />, level: "Advanced" },
      { name: "Docker", icon: <SiDocker className="text-blue-400" />, level: "Advanced" },
      { name: "Kubernetes", icon: <SiKubernetes className="text-blue-300" />, level: "Intermediate" },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-gray-200" />, level: "Advanced" },
      { name: "Jenkins", icon: <SiJenkins className="text-red-400" />, level: "Intermediate" },
      { name: "Linux", icon: <FaLinux className="text-gray-300" />, level: "Expert" },
      { name: "Nginx", icon: <SiNginx className="text-green-400" />, level: "Advanced" },
      { name: "Terraform", icon: <SiTerraform className="text-purple-400" />, level: "Intermediate" },
    ],
  },
];

type SkillCardProps = { cat: SkillCategory; i: number };
function SkillCard({ cat, i }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.4, once: false });
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.95, rotateX: 30 }}
      animate={inView
        ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
        : { opacity: 0, y: -120, scale: 0.92, rotateX: -30 }}
      transition={{ duration: 0.7, ease: "backOut", delay: i * 0.2 }}
      className="w-full flex flex-col md:flex-row items-center justify-between bg-[#18181c] bg-opacity-95 rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12"
      style={{ minHeight: 420, zIndex: 10, boxShadow: "0 8px 48px 0 #000a, 0 1.5px 0 #222" }}
    >
      {/* Left: Icon grid */}
      <div className="flex-1 flex items-center justify-center mb-8 md:mb-0">
        <div className="grid grid-cols-3 gap-6">
          {cat.skills.map((skill: Skill, j: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + j * 0.07 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 group-hover:bg-black/50 transition-colors duration-300 shadow"
            >
              <span className="text-3xl md:text-4xl mb-1 drop-shadow-lg">{skill.icon}</span>
              <span className="font-medium text-zinc-100 text-base md:text-lg">{skill.name}</span>
              <span className="text-xs text-cyan-200 font-mono">{skill.level}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Right: Details */}
      <div className="flex-1 flex flex-col items-start md:items-start justify-center md:pl-12">
        <h3 className={`text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r ${cat.color} text-transparent bg-clip-text`}>{cat.title}</h3>
        <ul className="mb-6 space-y-2">
          {cat.skills.map((skill: Skill) => (
            <li key={skill.name} className="flex items-center gap-2 text-lg">
              <span className="inline-block align-middle">{skill.icon}</span>
              <span className="align-middle font-semibold text-zinc-100">{skill.name}</span>
              <span className="text-xs text-cyan-300 ml-2">{skill.level}</span>
            </li>
          ))}
        </ul>
        <button className="mt-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform">Learn More</button>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardHeight = 420;
      const offset = rect.top + window.scrollY;
      const scrollY = window.scrollY + windowHeight / 2;
      let idx = Math.floor((scrollY - offset) / cardHeight);
      idx = Math.max(0, Math.min(skillCategories.length - 1, idx));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full pt-40 pb-32 px-4 sm:px-8 bg-gradient-to-br from-[#050509] via-[#0a0a0a] to-[#050509] text-white flex flex-col items-center min-h-[100vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "backOut" }}
        viewport={{ once: false, amount: 0.7 }}
        className="z-30 w-full flex flex-col items-center justify-center mb-8"
        style={{ pointerEvents: "none", position: 'absolute', top: '32px', left: 0, right: 0 }}
      >
        <div className="bg-[#18181c] rounded-xl px-4 py-1 shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0"
            style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.01em' }}
          >
            My Skills
          </h2>
        </div>
        <TypingSubheading />
      </motion.div>
      <div
        className="relative w-full max-w-3xl flex flex-col items-center justify-center mt-24 gap-16"
        style={{ perspective: 1200 }}
      >
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} i={i} />
        ))}
      </div>
    </section>
  );
}
          <h2
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0"
            style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.01em' }}
          >
            My Skills
          </h2>
        </div>
        <TypingSubheading />
      </motion.div>
      <div
        className="relative w-full max-w-3xl flex flex-col items-center justify-center mt-24 gap-16"
        style={{ perspective: 1200 }}
      >
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} i={i} />
        ))}
      </div>
    </section>
  );
// ...existing code ends here
