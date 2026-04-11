import Image from "next/image";
import { motion } from "framer-motion";

export default function IparxMediaLogo() {
  return (
    <motion.a
      href="https://iparxmedia.com" // Change to your actual link
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
      className="flex items-center gap-3 group"
      style={{ textDecoration: "none" }}
    >
      <span
        className="font-extrabold text-[2.8rem] md:text-[4rem] tracking-tight"
        style={{
          color: "#8b8bff", // Techy blue-purple
          fontFamily: 'Geist, Inter, Arial, sans-serif',
          letterSpacing: "-0.04em",
        }}
      >
        IPARX
      </span>
      <span
        className="font-extrabold text-[2.8rem] md:text-[4rem] text-white group-hover:text-purple-400 transition-colors duration-200"
        style={{
          fontFamily: 'Geist, Inter, Arial, sans-serif',
          letterSpacing: "-0.04em",
        }}
      >
        MEDIA
      </span>
    </motion.a>
  );
}
