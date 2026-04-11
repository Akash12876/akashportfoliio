"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Custom Development",
    desc: "Monitor your finances live with clear, intuitive dashboards.",
    img: "/features/custom-dev.png", // Place your image in public/features/
    alt: "Custom Development",
  },
  {
    title: "SaaS Prebuilt @ 50,000 /-",
    desc: "Monitor your finances live with clear, intuitive dashboards.",
    img: "/features/saas-prebuilt.png", // Place your image in public/features/
    alt: "SaaS Prebuilt",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-8 flex flex-col items-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="block mx-auto mb-4 px-6 py-2 rounded-full bg-zinc-100 text-zinc-500 font-medium shadow text-sm w-fit">
          Features
        </span>
        <h2 className="text-4xl sm:text-5xl font-semibold text-zinc-800 text-center mb-2 leading-tight">
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
              scale: 1.04,
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
              y: -8,
            }}
            className="group bg-white rounded-2xl border border-zinc-200 shadow-lg p-8 flex flex-col items-center transition-all duration-300"
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
            <h3 className="text-2xl font-bold text-zinc-900 mb-2 text-center group-hover:text-cyan-600 transition-colors">
              {f.title}
            </h3>
            <p className="text-zinc-500 text-base text-center">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
