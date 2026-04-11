"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#hero", icon: <FaHome /> },
  { label: "Features", href: "#features", icon: <FaUser /> },
  { label: "Skills", href: "#skills", icon: <FaCode /> },
  { label: "Projects", href: "#projects", icon: <FaProjectDiagram /> },
  { label: "Experience", href: "#experience", icon: <FaCode /> },
  { label: "Contact", href: "#contact", icon: <FaEnvelope /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg flex items-center justify-between px-4 sm:px-8 py-3 transition-all">
      <div className="flex items-center gap-4 sm:gap-8">
        <span className="font-extrabold text-xl sm:text-2xl text-cyan-400 tracking-widest">AKASH</span>
        <div className="hidden md:flex gap-2 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-base sm:text-lg font-medium text-white/90 hover:text-cyan-400 transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              tabIndex={0}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <button
        className="md:hidden text-2xl text-cyan-300 p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-black/90 backdrop-blur-lg z-50 flex flex-col gap-8 pt-24 px-6 md:hidden`}
        style={{ boxShadow: open ? '0 0 0 9999px rgba(0,0,0,0.3)' : undefined }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-white/90 hover:text-cyan-400 transition-colors px-2 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            onClick={() => setOpen(false)}
            tabIndex={0}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </motion.div>
      {/* Overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
          tabIndex={-1}
        />
      )}
    </nav>
  );
}
