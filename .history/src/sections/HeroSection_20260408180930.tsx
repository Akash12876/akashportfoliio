
"use client";

import React, { useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { motion } from "framer-motion";
import Image from "next/image";

// FloatingTechLogos component for animated floating tech icons
const techLogos = [
  { src: "/tech-java.png", alt: "Java", color: "bg-[#F7DF1E]/30" },
  { src: "/tech-php.png", alt: "PHP", color: "bg-[#8993be]/30" },
  { src: "/tech-devops.png", alt: "DevOps", color: "bg-[#38bdf8]/30" },
  { src: "/tech-fullstack.png", alt: "Full Stack", color: "bg-[#34d399]/30" },
];

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function FloatingTechLogos() {
  // Randomize positions and animation for each logo
  const [positions] = useState(() =>
    Array.from({ length: techLogos.length }, () => ({
      top: randomBetween(10, 70),
      left: randomBetween(10, 80),
      duration: randomBetween(7, 13),
      delay: randomBetween(0, 2),
      direction: Math.random() > 0.5 ? 1 : -1,
    }))
  );
  return (
    <div className="pointer-events-none select-none absolute inset-0 w-full h-full z-10">
      {techLogos.map((logo, i) => (
        <motion.div
          key={logo.alt}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, positions[i].direction * 30, 0],
            x: [0, positions[i].direction * 20, 0],
          }}
          transition={{
            duration: positions[i].duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: positions[i].delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: `${positions[i].top}%`,
            left: `${positions[i].left}%`,
            zIndex: 10,
          }}
          className={`rounded-xl shadow-xl ${logo.color} backdrop-blur-md border border-white/30 flex items-center justify-center`}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={54}
            height={54}
            className="object-contain p-2"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden animated-net-bg">
      <div className="flex flex-col items-center gap-8 mt-24">
        {/* Animated image: slides in from top after site load, round format */}
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative w-[340px] h-[340px] flex items-end justify-center select-none"
        >
          <Image
            src="/profile.jpg.jpg" // Place your image in public/profile.jpg
            alt="Akash Pandey"
            width={340}
            height={340}
            className="object-cover w-full h-full rounded-full border-4 border-white/20 shadow-xl"
            priority
          />
          {/* Blur/fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/80 via-white/10 to-transparent pointer-events-none rounded-b-full" style={{filter:'blur(8px)'}} />
        </motion.div>
        {/* Animated headline: two lines, typewriter effect */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center justify-center"
        >
          <h1 className="text-[2.5rem] sm:text-[3.5rem] font-bold font-[Poppins,sans-serif] text-white text-center leading-tight tracking-tight" style={{fontWeight:700, minHeight: '2.5em'}}>
            {useTypewriter("Hi, I'm Akash Pandey", 40)}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-300 text-center mt-2 mb-1" style={{minHeight:'1.5em'}}>
            {useTypewriter("Full Stack Developer | Cloud & DevOps Enthusiast", 25)}
          </h2>
        </motion.div>
        {/* Buttons row, matching reference, no Java/DevOps logos */}
        <div className="relative flex gap-6 mt-2 items-center justify-center w-full">
          <a
            href="#projects"
            className="relative z-10 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-[length:200%_200%] animate-btn-gradient text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Let's Explore
          </a>
          <a
            href="#contact"
            className="relative z-10 px-10 py-4 rounded-full bg-gradient-to-r from-white via-zinc-200 to-cyan-100 bg-[length:200%_200%] animate-btn-gradient text-black text-lg font-semibold border border-zinc-300 shadow-lg transition-all duration-300 hover:from-cyan-100 hover:to-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Contact Us
          </a>
          <style jsx>{`
            @keyframes btn-gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-btn-gradient {
              animation: btn-gradient 3s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
