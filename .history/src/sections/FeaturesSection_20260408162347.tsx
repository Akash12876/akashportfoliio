"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
            className="group bg-white/10 rounded-2xl border-2 border-white/30 shadow-2xl p-8 flex flex-col items-center transition-all duration-300 font-[Poppins,sans-serif] relative overflow-hidden"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
            }}
          >
            {/* Glassy border overlay only on border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl z-20" style={{boxShadow:'0 0 0 4px rgba(255,255,255,0.18)', border:'2px solid rgba(255,255,255,0.25)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', mixBlendMode:'lighten'}} />
            <div className="relative z-30 w-full flex justify-center mb-6">
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
            <h3 className="relative z-30 text-2xl font-bold text-white mb-2 text-center group-hover:text-cyan-300 transition-colors tracking-tight">
              {f.title}
            </h3>
            <p className="relative z-30 text-white/90 text-base text-center font-medium tracking-wide" style={{fontFamily:'Poppins, sans-serif'}}>{f.desc}</p>
          </motion.div>
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
            className="group bg-white/10 backdrop-blur-[8px] rounded-2xl border-2 border-white/30 shadow-2xl p-8 flex flex-col items-center transition-all duration-300 font-[Poppins,sans-serif] relative overflow-hidden"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
            }}
          >
            {/* Glassy border overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/30 z-20" style={{backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', boxShadow:'0 0 0 2px rgba(255,255,255,0.18)'}} />
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
