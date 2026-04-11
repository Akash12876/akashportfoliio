"use client";
import React from "react";
import Image from "next/image";

const brands2 = [
  { name: "MOVATOBAGS" },
  { name: "INDE ARTISANS" },
  { name: "INDE ICONS" },
  { name: "OPEN LIMITS" },
  { name: "BMDU" },
];

export default function BrandStripReverse() {
  return (
    <div className="relative w-full overflow-x-hidden py-8 animated-net-bg">
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
      <div className="relative flex items-center">
        <div className="animate-marquee-reverse flex min-w-full gap-24">
          {(() => {
            // Shuffle unique brand names for the second loop
            const uniqueNames = [...new Set(brands2.map(b => b.name))];
            const shuffled = [...uniqueNames];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return [
              ...uniqueNames.map((name, i) => (
                <div key={"orig-" + i} className="flex-shrink-0 flex items-center justify-center h-16">
                  <span className="text-2xl font-bold text-white/90 select-none">{name}</span>
                </div>
              )),
              ...shuffled.map((name, i) => (
                <div key={"shuf-" + i} className="flex-shrink-0 flex items-center justify-center h-16">
                  <span className="text-2xl font-bold text-white/90 select-none">{name}</span>
                </div>
              ))
            ];
          })()}
        </div>
      </div>
      <style jsx>{`
        .animate-marquee-reverse {
          display: flex;
          animation: marquee-reverse 18s linear infinite;
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
