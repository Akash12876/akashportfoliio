"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full flex justify-center items-center py-16 px-2 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl rounded-3xl bg-black/80 border border-white/10 shadow-2xl backdrop-blur-lg flex flex-col md:flex-row p-8 md:p-14 gap-8 md:gap-0 relative"
        style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)" }}
      >
        {/* Left: Heading, subtitle, button */}
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
            Elevate Your Influence with <span className="text-purple-400">Akash!</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-2">
            Explore, <span className="text-purple-400 font-semibold">Collaborate</span>, <span className="text-purple-400 font-semibold">Innovate</span>, and Achieve
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-full bg-purple-400 hover:bg-purple-500 text-white text-lg font-bold shadow-lg transition-all duration-300"
            style={{ boxShadow: "0 2px 16px 0 rgba(128,90,213,0.25)" }}
          >
            Let&apos;s Collaborate
          </motion.a>
        </div>
        {/* Right: Contact info and social */}
        <div className="flex flex-col justify-between items-end min-w-[220px] md:pl-12">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-1">CONTACT ME</h3>
            <p className="text-white/80 mb-4">akash@email.com</p>
            <h3 className="text-lg font-bold text-white mb-1">FOLLOW ME</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-purple-400 p-2 text-purple-400 hover:bg-purple-400 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-purple-400 p-2 text-purple-400 hover:bg-purple-400 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="text-xs md:text-sm text-white/70 text-right">
            <span className="font-bold">Work with me</span><br />
            Be a part of the team<br />
            Metro Station–Saket, 241, Westend Marg, Saidulajab, Butterfly Park, Mittal Garden, Saket, New Delhi, Delhi<br />
            110030 1st Floor, Peninsula Park, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400047
          </div>
        </div>
      </motion.div>
    </section>
  );
}
