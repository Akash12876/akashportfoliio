"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroNetBg from "@/components/HeroNetBg";
import PremiumButton from "@/components/PremiumButton";

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <HeroNetBg />
      <div className="relative z-10 mx-auto mt-24 flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row md:items-stretch">
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 0 4px #fff, 0 0 32px 0 #22d3ee80",
            rotateY: -8,
            borderColor: "#22d3ee",
          }}
          style={{
            perspective: 800,
            border: "3px solid #fff",
            boxShadow: "0 4px 32px 0 rgba(34,211,238,0.15)",
            background: "rgba(0,0,0,0.85)",
            overflow: "hidden",
            paddingTop: "12px",
          }}
          className="relative flex h-[420px] w-[340px] select-none items-start justify-center rounded-2xl transition-all duration-300 md:mr-10"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            whileHover={{ scale: 1.08, y: 0 }}
            className="flex h-[400px] w-[300px] items-start justify-center"
            style={{ transition: "transform 0.3s cubic-bezier(.4,2,.6,1)" }}
          >
            <Image
              src="/AK.png"
              alt="Profile"
              width={300}
              height={400}
              className="h-full w-full rounded-xl bg-black object-contain transition-all duration-300"
              priority
            />
          </motion.div>
        </motion.div>

        <div className="mt-2 flex w-full flex-1 flex-col items-center justify-center md:items-start">
          <h1
            className="text-center text-[2.2rem] font-bold leading-tight tracking-tight text-white sm:text-[3rem] md:text-left"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          >
            Elevate Your Brand with Akash
          </h1>
          <p className="mt-3 max-w-xl text-center text-base font-medium leading-relaxed text-cyan-300/95 sm:text-lg md:text-left">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Software Engineer · Amazon Connect Developer
            </span>
            <span className="mt-1 block text-zinc-400">
              Full Stack &amp; Amazon Connect | Building web &amp; AWS cloud solutions
            </span>
          </p>
          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-4 md:justify-start">
            <PremiumButton href="#projects" variant="primary" size="lg">
              View Projects
            </PremiumButton>
            <PremiumButton href="#contact" variant="outline" size="lg">
              Contact Me
            </PremiumButton>
          </div>
        </div>
      </div>
    </section>
  );
}
