"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://github.com/yourusername",
    icon: <FaGithub size={24} />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/yourusername",
    icon: <FaLinkedin size={24} />,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/yourusername",
    icon: <FaTwitter size={24} />,
    label: "Twitter",
  },
  {
    href: "mailto:your@email.com",
    icon: <FaEnvelope size={24} />,
    label: "Email",
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12 }}
      className="w-full mt-16 flex flex-col items-center justify-center py-8 px-4 bg-white/10 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-white/20"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
        className="flex gap-6 mb-4"
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="transition-transform hover:scale-125 hover:text-purple-500 text-white/80"
          >
            {link.icon}
          </a>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-white/70"
      >
        &copy; {new Date().getFullYear()} Akash. All rights reserved.
      </motion.p>
    </motion.footer>
  );
}
