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
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 mt-24 relative z-10 w-full max-w-5xl mx-auto">
        {/* Image on left, square with border radius and hover animation */}
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 0 4px #fff, 0 0 32px 0 #22d3ee80",
            rotateX: 8,
            rotateY: -8,
            borderColor: "#22d3ee"
          }}
          style={{
            perspective: 800,
            border: '3px solid #fff',
            boxShadow: '0 4px 32px 0 rgba(34,211,238,0.15)',
            background: 'rgba(0,0,0,0.85)'
          }}
          className="relative w-[340px] h-[420px] flex items-center justify-center select-none rounded-2xl md:mr-10 transition-all duration-300"
          whileTap={{ scale: 0.98 }}
          whileFocus={{ borderColor: '#38bdf8' }}
        >
          <motion.div
            whileHover={{ scale: 1.08, y: -12 }}
            className="w-[300px] h-[400px] flex items-start justify-center"
            style={{ transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)' }}
          >
            <Image
              src="/AK.png"
              alt="Profile"
              width={300}
              height={400}
              className="object-contain w-full h-full rounded-xl transition-all duration-300 bg-black"
              priority
            />
          </motion.div>
        </motion.div>
        {/* Content on right, unchanged */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center mt-2 w-full">
          <h1 className="text-[2.2rem] sm:text-[3rem] font-bold font-[Poppins,sans-serif] text-white text-center md:text-left leading-tight tracking-tight" style={{fontWeight:700}}>
            Elevate Your Brand with Akash
          </h1>
          <h2 className="text-lg sm:text-2xl font-semibold text-cyan-300 text-center md:text-left mt-2 mb-1">
            Full Stack & App Developer | Cloud & DevOps Enthusiast
          </h2>
          <div className="flex gap-6 mt-8 items-center justify-center md:justify-start w-full">
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
