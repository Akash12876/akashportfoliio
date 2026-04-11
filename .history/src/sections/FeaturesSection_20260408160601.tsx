"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Website Development",
    desc: "Monitor your finances live with clear, intuitive dashboards.",
    img: "/features/custom-dev.png", // Place your image in public/features/
    alt: "Custom Development",
  },
  {
    title: "App Development",
    desc: "Monitor your finances live with clear, intuitive dashboards.",
    img: "/features/saas-prebuilt.png", // Place your image in public/features/
    alt: "App Development",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-8 flex flex-col items-center bg-[#101014]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="block mx-auto mb-4 px-6 py-2 rounded-full bg-zinc-900 text-zinc-200 font-medium shadow text-sm w-fit">
          Features
        </span>
        <h2 className="text-4xl sm:text-5xl font-semibold text-white text-center mb-2 leading-tight">
          Streamline Business with our <br className="hidden sm:block" />
          Flexible Options
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 16px 48px 0 rgba(0,0,0,0.25)",
              y: -18,
            }}
            className="group bg-gradient-to-br from-[#232536]/60 via-[#232536]/40 to-[#232536]/60 backdrop-blur-md rounded-2xl border-2 border-cyan-400/40 shadow-xl p-8 flex flex-col items-center transition-all duration-300 font-[Poppins,sans-serif]"
            style={{
              borderImage: "linear-gradient(120deg,#67e8f9,#6366f1 80%,#232536 100%) 1",
            }}
          >
            <div className="w-full flex justify-center mb-6">
              <Image
                src={f.img}
                alt={f.alt}
                width={360}
                height={220}
                className="rounded-xl object-contain shadow"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/features/placeholder.png" // Optional: add a small placeholder image
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-cyan-300 transition-colors tracking-tight">
              {f.title}
            </h3>
            <p className="text-white/90 text-base text-center font-medium tracking-wide" style={{fontFamily:'Poppins, sans-serif'}}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
