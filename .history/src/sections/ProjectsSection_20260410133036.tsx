"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const ProjectsCard3D = dynamic(() => import("./ProjectsCard3D"), { ssr: false });

const projects = [
  {
    title: "Modern Portfolio Website",
    image: "/projects/portfolio.png",
    description:
      "A highly animated, responsive portfolio site built with Next.js, Framer Motion, and Tailwind CSS, featuring glassmorphism and dark mode.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/akashpandey-dev/portfolio",
    demo: "https://akashpandey.dev/",
    direction: "right",
  },
  {
    title: "CloudOps Dashboard",
    image: "/projects/cloudops.png",
    description:
      "A real-time dashboard for monitoring AWS resources, with live charts, notifications, and role-based access.",
    tech: ["React", "AWS", "Node.js", "Socket.io"],
    github: "https://github.com/akashpandey-dev/cloudops-dashboard",
    demo: "#",
    direction: "left",
  },
  {
    title: "App Builder Platform",
    image: "/projects/appbuilder.png",
    description:
      "A drag-and-drop platform for building web and mobile apps visually, supporting custom code and cloud deployment.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com/akashpandey-dev/appbuilder",
    demo: "#",
    direction: "bottom-corner",
  },
  {
    title: "AI SaaS Platform",
    image: "/projects/ai-saas.png",
    description:
      "A SaaS platform for deploying and managing AI models with real-time analytics and user management.",
    tech: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/akashpandey-dev/ai-saas",
    demo: "#",
    direction: "top-corner",
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
          <ProjectsCard3D key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
