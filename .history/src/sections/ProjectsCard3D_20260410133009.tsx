"use client";
import React, { useRef, Suspense } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  image: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  direction: "right" | "left" | "bottom-corner" | "top-corner";
}

const directionVariants = {
  right: { x: 120, y: 0, rotateY: 40 },
  left: { x: -120, y: 0, rotateY: -40 },
  "bottom-corner": { x: 60, y: 120, rotateX: 30, rotateY: 20 },
  "top-corner": { x: -60, y: -120, rotateX: -30, rotateY: -20 },
};

export default function ProjectsCard3D({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      directionVariants[project.direction],
      {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        duration: 1.2,
        delay: index * 0.25,
        ease: "power3.out",
      }
    );
    // Hover 3D tilt
    const el = cardRef.current;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * 18;
      const ry = ((x / rect.width) - 0.5) * 18;
      gsap.to(el, { rotateX: -rx, rotateY: ry, scale: 1.04, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [project.direction, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      style={{ perspective: 1200 }}
      className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white/10 to-black/30 border border-white/10 hover:shadow-2xl transition-transform duration-300"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Suspense fallback={<div className='w-full h-full bg-zinc-900/40 animate-pulse' /> }>
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </Suspense>
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
  );
}
