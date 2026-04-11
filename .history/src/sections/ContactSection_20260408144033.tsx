"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 sm:px-8 bg-black/80 text-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold mb-10 text-cyan-400 drop-shadow-lg"
      >
        Contact
      </motion.h2>
      <button
        onClick={() => setOpen(true)}
        className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-all duration-300"
      >
        Collaborate
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-full max-w-md bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] shadow-2xl z-50 p-8 flex flex-col"
            style={{ boxShadow: "8px 0 32px 0 rgba(0,0,0,0.4)" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl text-cyan-300 hover:text-cyan-400 transition-colors"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-cyan-300">Let's Connect</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 justify-center">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white/10 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white/10 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="px-4 py-3 rounded-lg bg-white/10 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              />
              <button
                type="submit"
                className="mt-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-lg font-semibold shadow-lg transition-all duration-300"
              >
                Send Message
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-green-400 text-center font-semibold mt-2"
                  >
                    Message sent! (Demo only)
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Overlay for sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
