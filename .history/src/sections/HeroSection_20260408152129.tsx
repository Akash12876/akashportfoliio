"use client";
import React, { useState } from "react";


import { motion } from "framer-motion";
import Image from "next/image";



export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-8 mt-24">
        {/* Image with seamless blur/fade at the bottom, no visible container */}
        <div className="relative w-[340px] h-[340px] flex items-end justify-center select-none">
          <Image
            src="profile.jpg.jpg" // Place your image in public/profile.jpg
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
        <div className="flex gap-6 mt-2">
          <a
            href="#projects"
            className="px-10 py-4 rounded-full bg-black text-white text-lg font-semibold shadow-lg transition-all duration-300 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Let's Explore
          </a>
          <a
            href="#contact"
            className="px-10 py-4 rounded-full bg-white text-black text-lg font-semibold border border-zinc-300 shadow-lg transition-all duration-300 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
