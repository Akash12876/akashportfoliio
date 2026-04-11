import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    title: "2.0 Job Ready AI Powered Cohort",
    subtitle: "Complete Web Development + DSA + Gen-AI + Aptitude",
    features: [
      { icon: "⏰", label: "200+ Hours" },
      { icon: "🎓", label: "Yes Certified" },
      { icon: "📞", label: "24/7 Mentor Support" },
    ],
    price: "Rs.5999",
    oldPrice: "Rs.11998 (+GST)",
    image: "/laptop-mockup.png",
    label1: "Websites",
    label2: "DSA",
    stat: "$62,970",
  },
  {
    title: "Full Stack Mastery Bootcamp",
    subtitle: "React, Node.js, MongoDB, Cloud",
    features: [
      { icon: "⏰", label: "180+ Hours" },
      { icon: "🎓", label: "Certified" },
      { icon: "📞", label: "Mentor Support" },
    ],
    price: "Rs.4999",
    oldPrice: "Rs.9999 (+GST)",
    image: "/laptop-mockup.png",
    label1: "Backend",
    label2: "Frontend",
    stat: "$45,000",
  },
  {
    title: "AI & ML Pro Track",
    subtitle: "Machine Learning, Deep Learning, Gen-AI",
    features: [
      { icon: "⏰", label: "220+ Hours" },
      { icon: "🎓", label: "AI Certified" },
      { icon: "📞", label: "Mentor Support" },
    ],
    price: "Rs.7999",
    oldPrice: "Rs.15999 (+GST)",
    image: "/laptop-mockup.png",
    label1: "ML",
    label2: "AI",
    stat: "$80,000",
  },
  {
    title: "Aptitude & DSA Champion",
    subtitle: "Aptitude, DSA, Coding Interviews",
    features: [
      { icon: "⏰", label: "150+ Hours" },
      { icon: "🎓", label: "Certified" },
      { icon: "📞", label: "Mentor Support" },
    ],
    price: "Rs.2999",
    oldPrice: "Rs.5999 (+GST)",
    image: "/laptop-mockup.png",
    label1: "Aptitude",
    label2: "DSA",
    stat: "$30,000",
  },
];

export default function ProjectsScrollCards() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardIndex = useTransform(scrollYProgress, [0, 1], [0, cards.length - 1]);

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-black/90 py-20">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          style={{
            position: "sticky",
            top: "20vh",
            zIndex: cards.length - idx,
            opacity: cardIndex.get() === idx ? 1 : 0,
            pointerEvents: cardIndex.get() === idx ? "auto" : "none",
          }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: cardIndex.get() === idx ? 1 : 0, y: cardIndex.get() === idx ? 0 : 80 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="bg-zinc-900 rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden">
            <div className="relative w-full md:w-1/2 flex justify-center items-center min-h-[340px]">
              <Image
                src={card.image}
                alt="Laptop"
                width={420}
                height={260}
                className="w-[420px] drop-shadow-2xl z-10"
                priority
              />
              <div className="absolute top-20 left-16 w-32 h-20 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-center z-20">
                <span className="text-white font-semibold">{card.label1}</span>
              </div>
              <div className="absolute top-36 left-40 w-36 h-24 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-center z-20">
                <span className="text-white font-semibold">{card.label2}</span>
              </div>
              <div className="absolute top-10 left-44 w-40 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg flex flex-col items-center justify-center z-20">
                <span className="text-white font-semibold">{card.stat}</span>
                <span className="text-xs text-zinc-200">Today</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {card.title}
                <br />
                {card.subtitle}
              </h2>
              <div className="flex gap-4 mt-4 flex-wrap">
                {card.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-zinc-800 rounded-lg px-4 py-2 text-white text-base font-medium">
                    <span>{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-end gap-4">
                <span className="text-3xl md:text-4xl font-bold text-orange-500">{card.price}</span>
                <span className="text-xl text-zinc-400 line-through">{card.oldPrice}</span>
              </div>
              <button className="mt-4 bg-white text-black rounded-lg px-6 py-3 font-semibold shadow hover:bg-zinc-100 transition flex items-center gap-2 w-fit">
                Check Course <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
