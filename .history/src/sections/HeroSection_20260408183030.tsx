"use client";

import React, { useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { motion } from "framer-motion";
import Image from "next/image";

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
  const heading = "LET'S BUILD YOUR STARTUP WITH ME";
  const typed = useTypewriter(heading, 40);
  const typingDone = typed.length === heading.length;
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden animated-net-bg">
      <FloatingTechLogos />
      <div className="flex flex-col items-center gap-8 mt-24">
        {/* Animated image: slides in from top after site load, round format */}
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative w-[340px] h-[340px] flex items-end justify-center select-none"
        >
          <Image
            src="/profile.jpg.jpg"
            alt="Akash Pandey"
            width={340}
            height={340}
            className="object-cover w-full h-full rounded-full border-4 border-white/20 shadow-xl"
            priority
          />
          {/* Blur/fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/80 via-white/10 to-transparent pointer-events-none rounded-b-full" style={{filter:'blur(8px)'}} />
        </motion.div>
        {/* Animated headline: typewriter effect, one letter at a time from top */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center justify-center"
        >
          <h1 className="text-[2.5rem] sm:text-[3.5rem] font-bold font-[Poppins,sans-serif] text-white text-center leading-tight tracking-tight" style={{fontWeight:700, minHeight: '2.5em'}}>
            {typed}
          </h1>
          {/* Subheading: fade in and slide up after typing is done */}
          <motion.h2
            className="text-xl sm:text-2xl font-semibold text-cyan-300 text-center mt-2 mb-1"
            style={{minHeight:'1.5em'}}
            initial={{ opacity: 0, y: 30 }}
            animate={typingDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: typingDone ? 0.2 : 0, duration: 0.7, ease: "easeOut" }}
          >
            Full Stack Developer | Cloud & DevOps Enthusiast
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
