"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaHtml5, FaCss3Alt, FaJs, FaMobileAlt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiDocker, SiMongodb, SiRedux } from "react-icons/si";
import Image from "next/image";

const skillCategories = [
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
    title: "DevOps (AWS)",
    color: "from-yellow-400 to-orange-500",
    skills: [
      { name: "AWS", icon: <FaAws className="text-yellow-400" />, level: "Advanced" },
      { name: "Docker", icon: <SiDocker className="text-blue-400" />, level: "Intermediate" },
    ],
  },
];


export default function SkillsSection() {
  // Track which card is visible
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Listen for scroll and update activeIndex
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Card height and offset
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
    <section id="skills" ref={sectionRef} className="relative w-full py-32 px-4 sm:px-8 bg-gradient-to-br from-[#050509] via-[#0a0a0a] to-[#050509] text-white flex flex-col items-center min-h-[100vh]">
      <div className="sticky top-0 z-30 w-full flex justify-center pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-10 text-cyan-400 drop-shadow-lg bg-transparent pointer-events-none"
          style={{textShadow: "0 2px 24px #000, 0 1px 0 #222"}}
        >
          Skills
        </motion.h2>
      </div>
      <div className="relative w-full max-w-3xl min-h-[420px] flex flex-col items-center justify-center" style={{ perspective: 1200 }}>
        <AnimatePresence initial={false} mode="wait">
          {skillCategories.map((cat, i) =>
            i === activeIndex ? (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, rotateY: 90, scale: 0.92 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.92 }}
                transition={{ duration: 0.7, ease: "backOut" }}
                className="absolute left-0 right-0 mx-auto flex flex-col md:flex-row items-center justify-between bg-[#18181c] bg-opacity-95 rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12"
                style={{ minHeight: 420, zIndex: 10, boxShadow: "0 8px 48px 0 #000a, 0 1.5px 0 #222" }}
              >
                {/* Left: Icon grid */}
                <div className="flex-1 flex items-center justify-center mb-8 md:mb-0">
                  <div className="grid grid-cols-3 gap-6">
                    {cat.skills.map((skill, j) => (
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
                    {cat.skills.map((skill) => (
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
            ) : null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
