"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

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
  useEffect(() => {
    if (!mounted) return;
    if (iconsRef.current && iconsRef.current.length) {
      gsap.fromTo(
        iconsRef.current,
        {
          y: 40,
          opacity: 0,
          rotateY: -60,
          rotateX: 30,
          scale: 0.7,
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: {
            amount: 0.3,
            grid: [4, 6],
            from: "random"
          },
          ease: "power3.out",
          delay: 0.3,
          onComplete: () => {
            iconsRef.current.forEach((el, i) => {
              gsap.to(el, {
                rotateY: gsap.utils.random(-18, 18),
                rotateX: gsap.utils.random(-12, 12),
                yoyo: true,
                repeat: -1,
                duration: gsap.utils.random(1.1, 1.7),
                ease: "sine.inOut",
                delay: gsap.utils.random(0, 0.7),
                repeatDelay: 0,
                y: "+=" + gsap.utils.random(7, 18),
              });
            });
          },
        }
      );
    }
  }, [mounted]);

  if (!mounted) return null;
  return (
    <section ref={sectionRef} className="w-full py-20 px-4 sm:px-8 flex flex-col items-center bg-gradient-to-b from-[#0a0a1a] to-[#181824] relative overflow-hidden">
      {/* Enhanced 3D glassmorphic animated background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none" style={{width: 480, height: 480, background: 'transparent'}}>
        {/* Main glassy orb */}
        <div
          style={{
            width: 340,
            height: 340,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            background: 'linear-gradient(120deg, rgba(0,255,255,0.18) 0%, rgba(120,0,255,0.13) 100%)',
            boxShadow: '0 0 120px 40px #00eaff77, 0 0 180px 60px #a855f777, 0 0 0 60px #fff0',
            filter: 'blur(18px) saturate(2.1)',
            opacity: 0.82,
            animation: 'rotate3dGlassMain 3.8s cubic-bezier(.7,0,.3,1) infinite',
            zIndex: 1,
            border: 'none',
          }}
        />
        {/* Inner highlight */}
        <div
          style={{
            width: 180,
            height: 180,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 40%, #fff7 0%, #fff0 80%)',
            filter: 'blur(14px)',
            opacity: 0.7,
            animation: 'rotate3dGlassHighlight 2.7s cubic-bezier(.7,0,.3,1) infinite',
            zIndex: 2,
            border: 'none',
          }}
        />
        {/* Outer glow ring */}
        <div
          style={{
            width: 420,
            height: 420,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #00eaff11 0%, #a855f711 100%)',
            filter: 'blur(38px)',
            opacity: 0.18,
            animation: 'rotate3dGlassRing 4.5s linear infinite',
            zIndex: 0,
            border: 'none',
          }}
        />
        <style>{`
          @keyframes rotate3dGlassMain {
            0% { transform: translate(-50%,-50%) rotateX(0deg) rotateZ(0deg) scale(1); }
            30% { transform: translate(-50%,-50%) rotateX(24deg) rotateZ(120deg) scale(1.08); }
            60% { transform: translate(-50%,-50%) rotateX(-18deg) rotateZ(240deg) scale(0.97); }
            100% { transform: translate(-50%,-50%) rotateX(0deg) rotateZ(360deg) scale(1); }
          }
          @keyframes rotate3dGlassHighlight {
            0% { transform: translate(-50%,-50%) rotateZ(0deg) scale(1); }
            50% { transform: translate(-50%,-50%) rotateZ(180deg) scale(1.08); }
            100% { transform: translate(-50%,-50%) rotateZ(360deg) scale(1); }
          }
          @keyframes rotate3dGlassRing {
            0% { transform: translate(-50%,-50%) rotateZ(0deg); }
            100% { transform: translate(-50%,-50%) rotateZ(360deg); }
          }
        `}</style>
      </div>
      <div className="mb-6 flex flex-col items-center relative z-10">
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
      <div className="flex flex-wrap justify-center gap-6 mt-8 max-w-5xl relative z-10">
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
