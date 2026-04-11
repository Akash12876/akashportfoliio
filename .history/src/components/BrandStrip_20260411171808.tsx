"use client";
import React from "react";
import Image from "next/image";

const brands = [
  { name: "Plum" },
  { name: "Daily Objects" },
  { name: "Murzban" },
  { name: "Ceya" },
  { name: "Minitpe" },
];

export default function BrandStrip() {
  return (
    <div className="relative w-full overflow-x-hidden py-8 animated-net-bg">
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
      <div className="relative flex items-center">
        <div className="animate-marquee flex min-w-full gap-24">
          {brands.map((brand, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-16">
              <span className="text-2xl font-bold text-white/90 select-none">
                {brand.name}
              </span>
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {brands.map((brand, i) => (
            <div key={brands.length + i} className="flex-shrink-0 flex items-center justify-center h-16">
              <span className="text-2xl font-bold text-white/90 bg-white/10 px-8 py-2 rounded-lg shadow-md border border-white/20 hover:bg-cyan-500/20 transition-all select-none">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          display: flex;
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
