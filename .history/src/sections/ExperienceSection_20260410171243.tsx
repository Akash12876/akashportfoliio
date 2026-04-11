"use client";
import React from "react";
import { motion } from "framer-motion";
// import { FaBuilding, FaCode, FaCloud } from "react-icons/fa";

const experiences = [
  {
    company: "Tech Innovators Pvt Ltd",
    role: "Frontend Developer",
    period: "2025 - Present",
    icon: "💻",
    description:
      "Developed and maintained modern web applications using React, Next.js, and Tailwind CSS. Led UI/UX improvements and implemented advanced animations for client projects.",
    tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
  },
  {
    company: "CloudOps Solutions",
    role: "DevOps Engineer (AWS)",
    period: "2024 - 2025",
    icon: "☁️",
    description:
      "Managed AWS infrastructure, automated CI/CD pipelines, and optimized cloud deployments for high-availability applications.",
    tech: ["AWS", "Docker", "CI/CD", "Node.js"],
  },
  {
    company: "AppWorks Studio",
    role: "Full Stack Developer",
    period: "2023 - 2024",
    icon: "🏢",
    description:
      "Built scalable web and mobile solutions, integrated REST APIs, and collaborated with cross-functional teams to deliver real-world projects.",
    tech: ["Node.js", "MongoDB", "React Native", "REST API"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-20 px-4 sm:px-8 bg-gradient-to-br from-[#0f2027] via-[#232526] to-[#2c5364] text-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-cyan-400 drop-shadow-lg"
      >
        Experience
      </motion.h2>
      <div className="relative w-full max-w-4xl flex flex-col gap-12">
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-cyan-400/60 via-white/10 to-blue-400/60 -translate-x-1/2 z-0 rounded-full" />
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10"
          >
            <div className="flex flex-col items-center md:items-end w-full md:w-1/3">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{exp.icon}</span>
                <span className="font-bold text-lg text-cyan-200">{exp.company}</span>
              </div>
              <span className="text-cyan-400 font-mono text-sm">{exp.period}</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-cyan-400 border-4 border-white/20 shadow-lg md:mt-4" />
            <div className="flex-1 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <span className="font-semibold text-cyan-300 text-base md:text-lg">{exp.role}</span>
                <span className="hidden md:inline-block text-cyan-200 mx-2">|</span>
                <span className="text-zinc-200 text-sm">{exp.period}</span>
              </div>
              <p className="text-zinc-100 text-sm mb-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-200 text-xs font-mono shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
