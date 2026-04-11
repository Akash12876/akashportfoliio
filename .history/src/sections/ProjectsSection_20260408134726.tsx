"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Modern Portfolio Website",
    image: "/projects/portfolio.png",
    description:
      "A highly animated, responsive portfolio site built with Next.js, Framer Motion, and Tailwind CSS, featuring glassmorphism and dark mode.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/akashpandey-dev/portfolio",
    demo: "https://akashpandey.dev/",
  },
  {
    title: "CloudOps Dashboard",
    image: "/projects/cloudops.png",
    description:
      "A real-time dashboard for monitoring AWS resources, with live charts, notifications, and role-based access.",
    tech: ["React", "AWS", "Node.js", "Socket.io"],
    github: "https://github.com/akashpandey-dev/cloudops-dashboard",
    demo: "#",
  },
  {
    title: "App Builder Platform",
    image: "/projects/appbuilder.png",
    description:
      "A drag-and-drop platform for building web and mobile apps visually, supporting custom code and cloud deployment.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com/akashpandey-dev/appbuilder",
    demo: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full py-20 px-4 sm:px-8 bg-black/90 text-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-cyan-400 drop-shadow-lg"
      >
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white/10 to-black/30 border border-white/10 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 pointer-events-none" />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-xl font-semibold mb-1 text-cyan-300 drop-shadow">{project.title}</h3>
              <p className="text-zinc-200 text-sm mb-2 min-h-[48px]">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-200 text-xs font-mono shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-cyan-400 transition-colors text-lg"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 hover:text-cyan-400 transition-colors text-lg"
                    title="Live Demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
