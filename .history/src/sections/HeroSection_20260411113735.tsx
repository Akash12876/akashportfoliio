"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroNetBg from "@/components/HeroNetBg";


export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <HeroNetBg />
      <div className="flex flex-col items-center gap-8 mt-24 relative z-10">
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative w-[320px] h-[320px] flex items-end justify-center select-none"
        >
          <Image
            src="/profile.jpg.jpg"
            alt="Profile"
            width={320}
            height={320}
            className="object-cover w-full h-full rounded-full border-4 border-white/20 shadow-xl"
            priority
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/80 via-white/10 to-transparent pointer-events-none rounded-b-full" style={{filter:'blur(8px)'}} />
        </motion.div>
        <div className="w-full flex flex-col items-center justify-center mt-2">
          <h1 className="text-[2.2rem] sm:text-[3rem] font-bold font-[Poppins,sans-serif] text-white text-center leading-tight tracking-tight" style={{fontWeight:700}}>
            Elevate Your Brand with Akash
          </h1>
          <h2 className="text-lg sm:text-2xl font-semibold text-cyan-300 text-center mt-2 mb-1">
            Full Stack Developer | Cloud & DevOps Enthusiast
          </h2>
        </div>
        <div className="flex gap-6 mt-8 items-center justify-center w-full">
          <a
            href="#projects"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-[length:200%_200%] animate-btn-gradient text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-white via-zinc-200 to-cyan-100 bg-[length:200%_200%] animate-btn-gradient text-black text-lg font-semibold border border-zinc-300 shadow-lg transition-all duration-300 hover:from-cyan-100 hover:to-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Contact Me
          </a>
        </div>
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
    </section>
  );
}
