"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useGSAPStagger } from "../hooks/useGSAPStagger";

const techIcons = [
  { src: "/tech-html5.png", alt: "HTML5" },
  { src: "/tech-css3.png", alt: "CSS3" },
  { src: "/tech-js.png", alt: "JavaScript" },
  { src: "/tech-react.png", alt: "React" },
  { src: "/tech-redux.png", alt: "Redux" },
  { src: "/tech-ts.png", alt: "TypeScript" },
  { src: "/tech-node.png", alt: "Node.js" },
  { src: "/tech-express.png", alt: "Express" },
  { src: "/tech-mongo.png", alt: "MongoDB" },
  { src: "/tech-sass.png", alt: "Sass" },
  { src: "/tech-tailwind.png", alt: "Tailwind" },
  { src: "/tech-next.png", alt: "Next.js" },
  { src: "/tech-nest.png", alt: "NestJS" },
  { src: "/tech-graphql.png", alt: "GraphQL" },
  { src: "/tech-docker.png", alt: "Docker" },
  { src: "/tech-git.png", alt: "Git" },
  { src: "/tech-github.png", alt: "GitHub" },
  { src: "/tech-figma.png", alt: "Figma" },
  { src: "/tech-cypress.png", alt: "Cypress" },
  { src: "/tech-jest.png", alt: "Jest" },
  { src: "/tech-vercel.png", alt: "Vercel" },
  { src: "/tech-aws.png", alt: "AWS" },
  { src: "/tech-azure.png", alt: "Azure" },
  { src: "/tech-linux.png", alt: "Linux" },
];

export default function TechStackSection() {
  const sectionRef = useRef(null);
  const iconsRef = useRef([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useGSAPStagger(iconsRef, { delay: 0.7 });

  if (!mounted) return null;
  return (
    <section ref={sectionRef} className="w-full py-20 px-4 sm:px-8 flex flex-col items-center bg-gradient-to-b from-[#0a0a1a] to-[#181824]">
      <div className="mb-6 flex flex-col items-center">
        <span className="block mx-auto mb-2 px-5 py-1 rounded-full bg-zinc-900 text-zinc-200 font-medium shadow text-sm w-fit">
          Tech Stack &amp; Tools
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-1 leading-tight">
          Making apps with modern technologies.
        </h2>
        <p className="text-zinc-300 text-center max-w-xl text-base sm:text-lg">
          These tools &amp; stacks, I use, develop on, and deliver with.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-8 max-w-5xl">
        {techIcons.map((icon, i) => (
          <div
            key={icon.alt}
            ref={el => (iconsRef.current[i] = el)}
            className="bg-white/10 rounded-2xl border border-white/20 shadow-lg p-4 flex items-center justify-center backdrop-blur-md"
            style={{ width: 64, height: 64 }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={40}
              height={40}
              className="object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
