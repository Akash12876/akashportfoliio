"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaHtml5, FaCss3Alt, FaJs, FaMobileAlt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiDocker, SiMongodb, SiRedux } from "react-icons/si";

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
  return (
    <section id="skills" className="relative w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] text-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-cyan-400 drop-shadow-lg"
      >
        Skills
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 shadow-xl bg-white/10 backdrop-blur-md border border-white/10 hover:scale-105 hover:shadow-2xl transition-transform duration-300 group`}
          >
            <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r ${cat.color} text-transparent bg-clip-text`}>{cat.title}</h3>
            <div className="grid grid-cols-2 gap-6">
              {cat.skills.map((skill, j) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + j * 0.07 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/30 group-hover:bg-black/40 transition-colors duration-300 shadow"
                >
                  <span className="text-3xl md:text-4xl mb-1 drop-shadow-lg">{skill.icon}</span>
                  <span className="font-medium text-zinc-100 text-base md:text-lg">{skill.name}</span>
                  <span className="text-xs text-cyan-200 font-mono">{skill.level}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
