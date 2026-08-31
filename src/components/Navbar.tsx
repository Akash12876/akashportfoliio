"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaRobot, FaList } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#hero", icon: <FaHome /> },
  { label: "About", href: "#about", icon: <FaUser /> },
  { label: "AI", href: "#ai", icon: <FaRobot /> },
  { label: "Features", href: "#features", icon: <FaList /> },
  { label: "Skills", href: "#skills", icon: <FaCode /> },
  { label: "Projects", href: "#projects", icon: <FaProjectDiagram /> },
  { label: "Contact", href: "#contact", icon: <FaEnvelope /> },
];

function scrollToHash(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2.5 shadow-lg backdrop-blur-lg sm:top-6 sm:gap-4 sm:px-6 sm:py-3">
        <a
          href="https://iparx-media-akashpandeyweconnect-6582s-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0 rounded-lg border-2 border-cyan-400 px-3 py-1.5 text-xs font-extrabold tracking-wide text-cyan-400 transition-colors duration-300 hover:border-red-500 sm:px-5 sm:py-2 sm:text-base"
          style={{ fontFamily: "Poppins, sans-serif", background: "none", boxShadow: "none", whiteSpace: "nowrap" }}
        >
          <motion.span
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.13, 1], color: ["#22d3ee", "#06b6d4", "#22d3ee"] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="inline-block w-full text-center"
            style={{ letterSpacing: "0.08em" }}
          >
            OUR BRAND
          </motion.span>
        </a>

        <div className="hidden min-w-0 flex-1 flex-wrap justify-center gap-4 md:flex lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-lg font-medium text-white/90 transition-colors hover:text-cyan-400"
              onClick={(e) => {
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  scrollToHash(link.href);
                }
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-cyan-300 backdrop-blur-md transition hover:bg-white/20 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu overlay"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-[70] flex h-full w-[min(18rem,calc(100vw-2rem))] flex-col gap-3 border-l border-white/20 bg-white/10 px-4 pb-8 pt-24 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <button
                type="button"
                className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white/90 backdrop-blur-md transition hover:text-cyan-400"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-lg font-semibold text-white/95 shadow-lg shadow-black/10 backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/15 hover:text-cyan-300"
                  onClick={(e) => {
                    setOpen(false);
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToHash(link.href);
                    }
                  }}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-cyan-300">
                    {link.icon}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
