"use client";
import React, { useRef, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
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
  right: { x: 120, y: 0, rotateY: 40, opacity: 0 },
  left: { x: -120, y: 0, rotateY: -40, opacity: 0 },
  "bottom-corner": { x: 60, y: 120, rotateX: 30, rotateY: 20, opacity: 0 },
  "top-corner": { x: -60, y: -120, rotateX: -30, rotateY: -20, opacity: 0 },
};

  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Intersection Observer for in/out animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP in/out animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (inView) {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        duration: 1.2,
        delay: index * 0.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(el, {
        ...directionVariants[project.direction],
        duration: 1.1,
        ease: "power3.inOut",
      });
    }
  }, [inView, project.direction, index]);

  // Hover 3D tilt
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
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
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ perspective: 1200, opacity: 0 }}
      className="group relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white/10 to-black/30 border border-white/10 hover:shadow-2xl transition-transform duration-300 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Suspense fallback={<div className='w-full h-full bg-zinc-900/40 animate-pulse' /> }>
          <Image
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
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
    </div>
  );
}
