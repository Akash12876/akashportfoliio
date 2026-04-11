"use client";
import React, { useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";


import { motion } from "framer-motion";
import Image from "next/image";



export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden animated-net-bg">
      <div className="flex flex-col items-center gap-8 mt-24">
        {/* Animated 3D knot image: slides in from top after site load, round format */}
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative w-[340px] h-[340px] flex items-end justify-center select-none"
        >
          <Image
            src="/hero-3d-knot.png"
            alt="3D Knot"
            width={340}
            height={340}
            className="object-contain w-full h-full rounded-2xl shadow-2xl"
            priority
          />
        </motion.div>
        {/* Animated headline: types in letter by letter from top after image animation */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          <h1 className="text-[3rem] sm:text-[4.5rem] font-bold font-[Poppins,sans-serif] text-white text-center leading-tight tracking-tight" style={{fontWeight:700, minHeight: '4.5em'}}>
            {useTypewriter("BUILD YOUR STARTUP WITH ME", 40)}
          </h1>
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
