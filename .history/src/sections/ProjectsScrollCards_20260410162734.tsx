
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Modern Portfolio Website",
    image: "/projects/portfolio.png",
    description: "A highly animated, responsive portfolio site built with Next.js, Framer Motion, and Tailwind CSS, featuring glassmorphism and dark mode.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/akashpandey-dev/portfolio",
    demo: "https://akashpandey.dev/",
  },
  {
    title: "CloudOps Dashboard",
    image: "/projects/cloudops.png",
    description: "A real-time dashboard for monitoring AWS resources, with live charts, notifications, and role-based access.",
    tech: ["React", "AWS", "Node.js", "Socket.io"],
    github: "https://github.com/akashpandey-dev/cloudops-dashboard",
    demo: "#",
  },
  {
    title: "App Builder Platform",
    image: "/projects/appbuilder.png",
    description: "A drag-and-drop platform for building web and mobile apps visually, supporting custom code and cloud deployment.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com/akashpandey-dev/appbuilder",
    demo: "#",
  },
  {
    title: "AI SaaS Platform",
    image: "/projects/ai-saas.png",
    description: "A SaaS platform for deploying and managing AI models with real-time analytics and user management.",
    tech: ["Next.js", "Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/akashpandey-dev/ai-saas",
    demo: "#",
  },
];
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });

  // Directions for each card
  const directions = [
    { x: -200, y: 0 }, // left
    { x: 200, y: 0 },  // right
    { x: 0, y: -200 }, // top
    { x: 0, y: 200 },  // bottom
  ];

export default function ProjectsScrollCards() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });
  const directions = [
    { x: -200, y: 0 },
    { x: 200, y: 0 },
    { x: 0, y: -200 },
    { x: 0, y: 200 },
  ];
  return (
    <section ref={sectionRef} className="w-full max-w-6xl mx-auto py-20 flex flex-col gap-12 items-center min-h-[100vh]">
      <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 w-full text-center drop-shadow-lg">Projects</h2>
      {projects.map((project, idx) => (
        <motion.div
          key={project.title}
          className="bg-zinc-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl w-full"
          initial={{ opacity: 0, x: directions[idx % 4].x, y: directions[idx % 4].y, scale: 0.95, rotateX: 0 }}
          animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, x: directions[idx % 4].x, y: directions[idx % 4].y, scale: 0.95, rotateX: 0 }}
          transition={{ duration: 0.8, delay: idx * 0.18, type: "spring", bounce: 0.22 }}
        >
          <div className="relative w-full md:w-1/2 flex justify-center items-center min-h-[240px]">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={240}
              className="rounded-xl object-cover"
              priority={idx === 0}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">{project.title}</h3>
            <p className="text-zinc-200">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-200 text-xs font-mono shadow">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:text-cyan-400 transition-colors text-lg font-bold"
                title="GitHub"
              >
                GitHub
              </a>
              {project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-cyan-400 transition-colors text-lg font-bold"
                  title="Live Demo"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
