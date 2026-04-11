
import React, { useRef, useState } from "react";
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
    title: "IPARX MEDIA",
    image: "/IPARX.jpg",
    description: "IPARX MEDIA is a fast-growing digital solutions startup focused on transforming brands into powerful digital leaders.",
    tech: ["React", "Next.js", "Framer Motion", "TypeScript", "GitHub", "Vercel"],
    github: "https://github.com/Akash12876/client-project",
    demo: "https://iparx-media-akashpandeyweconnect-6582s-projects.vercel.app/",
  },
  {
    title: "App Random Quote Generator",
    image: "/random.jpg",
    description: "Random Quote Generator is a simple yet engaging application that delivers inspirational and thought-provoking quotes instantly. With just one click, users can explore a variety of quotes designed to motivate, inspire, and spark creativity.",
    tech: ["Flutter (DART)", "Database", "API Integration"],
    github: "https://github.com/Akash12876/random_quote_generator",
    demo: "#",
  },
  {
    title: "AR Group of Education",
    image: "/A group.webp",
    description: "AR Group of Education has supported aspiring MBBS doctors since 2005, providing expert guidance and exceptional service.",
    tech: ["WordPress", "Plugins", "API Integration"],
    demo: "https://argroupofeducation.com/",
  },
  {
    title: "College Dunias",
    image: "/college.png",
    description: "Collegedunias helps aspirants identify the best private B.Tech. colleges suited to their goals and assist through the application process for admission.",
    tech: ["WordPress", "Plugins", "API Integration"],
    demo: "https://collegedunias.com/",
  },
  {
    title: "Movatobags",
    image: "/projects/movatobags.png",
    description: "Movatobags offers a wide range of stylish and durable bags for all occasions, combining functionality with modern design.",
    tech: ["Shopify", "Liquid Customization", "PHP", "Payment Integration", "API Integration"],
    demo: "https://movatobags.com/",
  },
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
      <span className="inline-block bg-[#181C22] text-white text-base font-medium px-6 py-2 rounded-full shadow-sm mb-8">Projects</span>
      {projects.map((project, idx) => (
        <motion.div
          key={project.title}
          className="bg-zinc-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl w-full"
          initial={{ opacity: 0, x: directions[idx % 4].x, y: directions[idx % 4].y, scale: 0.95, rotateX: 0 }}
          animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, x: directions[idx % 4].x, y: directions[idx % 4].y, scale: 0.95, rotateX: 0 }}
          transition={{ duration: 0.8, delay: idx * 0.18, type: "spring", bounce: 0.22 }}
        >
          <div className="relative w-full md:w-1/2 flex justify-center items-center min-h-[240px]">
            <ProjectImageWithFallback src={project.image} alt={project.title} idx={idx} />
          </div>
          // Fallback image component
          function ProjectImageWithFallback({ src, alt, idx }: { src: string; alt: string; idx: number }) {
            const [imgSrc, setImgSrc] = useState(src);
            return (
              <Image
                src={imgSrc}
                alt={alt}
                width={400}
                height={240}
                className="rounded-xl object-cover bg-zinc-800"
                priority={idx === 0}
                onError={() => setImgSrc("/projects/fallback.png")}
              />
            );
          }
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
