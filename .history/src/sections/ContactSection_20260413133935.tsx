"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import IparxMediaLogo from "@/components/IparxMediaLogo";
import ContactNetBg from "@/components/ContactNetBg";
const ContactModal = dynamic(() => import("@/components/ContactModal"), { ssr: false });

export default function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section id="contact" className="w-full flex flex-col items-center py-10 px-1 sm:py-16 sm:px-2 bg-transparent relative overflow-hidden">
      <ContactNetBg />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-black/80 border border-white/10 shadow-2xl backdrop-blur-lg flex flex-col md:flex-row p-3 xs:p-4 sm:p-8 md:p-14 gap-6 md:gap-0 relative"
        style={{ boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)" }}
      >
        {/* Left: Heading, subtitle, button */}
        <div className="flex-1 flex flex-col justify-center items-start gap-3 xs:gap-4 sm:gap-6 w-full">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-2">
            Elevate Your Influence with <span className="text-purple-400">Akash!</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-2">
            Explore, <span className="text-purple-400 font-semibold">Collaborate</span>, <span className="text-purple-400 font-semibold">Innovate</span>, and Achieve
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-4 py-2 xs:px-6 xs:py-3 sm:px-10 sm:py-4 rounded-full bg-purple-400 hover:bg-purple-500 text-white text-sm xs:text-base sm:text-lg font-bold shadow-lg transition-all duration-300"
            style={{ boxShadow: "0 2px 16px 0 rgba(128,90,213,0.25)" }}
            onClick={() => setModalOpen(true)}
          >
            Let&apos;s Collaborate
          </motion.button>
        </div>
        {/* Right: Contact info and social */}
        <div className="flex flex-col justify-center items-end min-w-0 sm:min-w-[220px] md:pl-12 mt-6 md:mt-0 w-full md:w-auto">
          <div className="mb-4 sm:mb-8 w-full md:w-auto">
            <h3 className="text-sm xs:text-base sm:text-lg font-bold text-white mb-1">CONTACT ME</h3>
            <p className="text-white/80 mb-2 sm:mb-4 text-xs xs:text-sm sm:text-base break-all">akash@email.com</p>
            <h3 className="text-sm xs:text-base sm:text-lg font-bold text-white mb-1">FOLLOW ME</h3>
            <div className="flex gap-2 xs:gap-3 sm:gap-4">
              <a href="https://instagram.com/akashpandey_004" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-purple-400 p-2 text-purple-400 hover:bg-purple-400 hover:text-white transition-colors">
                <FaInstagram size={20} className="xs:text-[22px] sm:text-[24px]" />
              </a>
              <a href="https://linkedin.com/in/akash-pandey-5b9494315" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-purple-400 p-2 text-purple-400 hover:bg-purple-400 hover:text-white transition-colors">
                <FaLinkedin size={20} className="xs:text-[22px] sm:text-[24px]" />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom: Big IPARX MEDIA logo with link */}
      </motion.div>
      {/* Place logo further below the card, always centered */}
      <div className="block md:hidden w-full flex justify-center mt-6 xs:mt-8">
        <div className="max-w-[180px] xs:max-w-[220px] w-full h-auto">
          <IparxMediaLogo />
        </div>
      </div>
      <div className="hidden md:flex w-full justify-center mt-8 sm:mt-[4.5rem]">
        <div className="max-w-[220px] w-full h-auto">
          <IparxMediaLogo />
        </div>
      </div>
    </section>
  );
}
