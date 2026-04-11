"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroNetBg from "@/components/HeroNetBg";
import { useEffect, useState } from "react";
// Floating tech logos data
const techLogos = [
  { src: "/java.png", alt: "Java", color: "bg-[#F7DF1E]/30" },
  { src: "/tech-php.png", alt: "PHP", color: "bg-[#8993be]/30" },
  { src: "/tech-devops.png", alt: "DevOps", color: "bg-[#38bdf8]/30" },
  { src: "/tech-fullstack.png", alt: "Full Stack", color: "bg-[#34d399]/30" },
];

export default function HeroSection() {
  // For floating logos (no mount state needed)
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <HeroNetBg />
      {/* Floating tech logos removed as requested */}
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
            Full Stack & App Developer | Cloud & DevOps Enthusiast
          </h2>
        </div>
        <div className="flex gap-6 mt-8 items-center justify-center w-full">
          <a
            href="#projects"
            className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-[length:200%_200%] animate-btn-gradient text-white text-lg font-semibold shadow-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
            onTouchStart={e => {
              e.currentTarget.classList.add('btn-active');
            }}
            onTouchEnd={e => {
              e.currentTarget.classList.remove('btn-active');
            }}
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute left-0 bottom-0 w-full h-full bg-black/80 rounded-full scale-y-0 group-hover:scale-y-100 btn-active:scale-y-100 origin-bottom transition-transform duration-300 z-0" />
            <span className="absolute inset-0 rounded-full ring-2 ring-white opacity-0 group-hover:opacity-100 btn-active:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </a>
          <a
            href="#contact"
            className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-white via-zinc-200 to-cyan-100 bg-[length:200%_200%] animate-btn-gradient text-black text-lg font-semibold border border-zinc-300 shadow-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
            onTouchStart={e => {
              e.currentTarget.classList.add('btn-active');
            }}
            onTouchEnd={e => {
              e.currentTarget.classList.remove('btn-active');
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white btn-active:text-white">Contact Me</span>
            <span className="absolute left-0 bottom-0 w-full h-full bg-black/80 rounded-full scale-y-0 group-hover:scale-y-100 btn-active:scale-y-100 origin-bottom transition-transform duration-300 z-0" />
            <span className="absolute inset-0 rounded-full ring-2 ring-white opacity-0 group-hover:opacity-100 btn-active:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
          .btn-active .group-hover\:scale-y-100 {
            transform: scaleY(1) !important;
          }
          .btn-active .group-hover\:opacity-100 {
            opacity: 1 !important;
          }
          .btn-active .group-hover\:text-white {
            color: #fff !important;
          }
        `}</style>
      </div>
    </section>
  );
}
