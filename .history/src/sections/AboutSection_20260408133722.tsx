"use client";
import React from "react";
import { motion } from "framer-motion";

const about = {
  summary:
    "I am a passionate developer with a BCA (2025), experienced in building modern web and application solutions, and skilled in DevOps (AWS). I have delivered multiple real-world projects for various companies, focusing on clean code, performance, and premium user experience.",
  highlights: [
    { label: "Degree", value: "BCA (2025)" },
    { label: "Background", value: "Technical / Development" },
    { label: "Experience", value: "Multiple real-world projects" },
    { label: "Specialties", value: "Web, App, DevOps (AWS)" },
  ],
  skills: [
    { name: "Website Development", percent: 95, color: "bg-cyan-400" },
    { name: "Application Development", percent: 90, color: "bg-blue-400" },
    { name: "DevOps (AWS)", percent: 85, color: "bg-yellow-400" },
  ],
};

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-20 px-4 sm:px-8 bg-black/80 text-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-400 drop-shadow-lg"
      >
        About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-2xl text-lg text-center mb-8 text-zinc-200"
      >
        {about.summary}
      </motion.p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center justify-center">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {about.highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl px-6 py-4 shadow-lg flex items-center gap-4"
            >
              <span className="font-semibold text-cyan-300 w-32">{item.label}:</span>
              <span className="text-zinc-100">{item.value}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          {about.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-zinc-100">{skill.name}</span>
                <span className="text-cyan-200 font-mono">{skill.percent}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-3 rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
