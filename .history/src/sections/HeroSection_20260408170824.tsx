"use client";
import React, { useState } from "react";


import { motion } from "framer-motion";
import Image from "next/image";



export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden animated-net-bg">
      <div className="flex flex-col items-center gap-8 mt-24">
        {/* Image with seamless blur/fade at the bottom, no visible container */}
        <div className="relative w-[340px] h-[340px] flex items-end justify-center select-none">
          <Image
            src="/profile.jpg.jpg" // Place your image in public/profile.jpg
            alt="Akash Pandey"
            width={340}
            height={340}
            className="object-cover w-full h-full"
            priority
          />
          {/* Blur/fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/80 via-white/10 to-transparent pointer-events-none" style={{filter:'blur(8px)'}} />
        </div>
        {/* Large headline, matching reference style */}
        <h1 className="text-[3rem] sm:text-[4.5rem] font-bold font-[Poppins,sans-serif] text-white text-center leading-tight tracking-tight" style={{fontWeight:700}}>
          BUILD YOUR STARTUP<br className="hidden sm:block" /> WITH ME
        </h1>
        {/* Buttons row, matching reference */}
        <div className="relative flex gap-6 mt-2 items-center justify-center">
          {/* Animated color shade from right corner */}
          <div className="absolute right-0 bottom-0 w-64 h-24 sm:w-96 sm:h-32 pointer-events-none z-0 animate-hero-shade"
            style={{
              background: "linear-gradient(120deg, rgba(0,255,255,0.18) 0%, rgba(0,0,0,0) 70%), linear-gradient(90deg, rgba(255,0,150,0.12) 0%, rgba(0,0,0,0) 80%)"
            }}
          />
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
            @keyframes hero-shade {
              0% { opacity: 0.7; transform: translateX(40px) scale(1); }
              50% { opacity: 1; transform: translateX(0) scale(1.08); }
              100% { opacity: 0.7; transform: translateX(40px) scale(1); }
            }
            .animate-hero-shade {
              animation: hero-shade 4s ease-in-out infinite;
            }
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
