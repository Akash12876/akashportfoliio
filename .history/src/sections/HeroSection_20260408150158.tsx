"use client";
import React, { useState } from "react";


import { motion } from "framer-motion";
import Image from "next/image";

const skills = [
  "Website Development",
  "Application Development",
  "DevOps (AWS)"
];

const typingDelay = 120;

function useTypingEffect(words: string[], delay: number) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = words[index % words.length];
    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), delay);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), delay / 2);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index, words, delay]);
  return displayed;
}

export default function HeroSection() {
  const typed = useTypingEffect(skills, typingDelay);
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-8 mt-24">
        {/* Image Container */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-lg w-64 h-64 flex items-center justify-center mb-6">
          <Image
            src="/your-image.png" // Place your image in public/your-image.png
            alt="Akash Pandey"
            width={240}
            height={240}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 flex flex-col items-center gap-6"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Hi, I'm <span className="text-cyan-400">Akash Pandey</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-medium h-10">
            <span className="text-cyan-300">{typed}</span>
            <span className="animate-blink">|</span>
          </h2>
          <div className="flex gap-4 mt-6">
            <a href="#projects" className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-all duration-300">
              View Work
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-lg font-semibold border border-cyan-400 text-cyan-200 shadow-lg transition-all duration-300">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
      {/* Add particle background and parallax here later */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
    </section>
  );
}
