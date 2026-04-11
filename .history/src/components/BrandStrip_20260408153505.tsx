"use client";
import React from "react";
import Image from "next/image";

const brands = [
  { src: "/brands/plum.png", alt: "Plum" },
  { src: "/brands/dailyobjects.png", alt: "Daily Objects" },
  { src: "/brands/murzban.png", alt: "Murzban" },
  { src: "/brands/ceya.png", alt: "Ceya" },
  { src: "/brands/minitpe.png", alt: "Minitpe" },
];

export default function BrandStrip() {
  return (
    <div className="relative w-full overflow-x-hidden py-8 bg-gradient-to-r from-[#18141c] via-[#231a23] to-[#18141c]">
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
      <div className="relative flex items-center">
        <div className="animate-marquee flex min-w-full gap-24">
          {brands.map((brand, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-16">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={160}
                height={64}
                className="object-contain grayscale opacity-80 hover:opacity-100 transition"
                draggable={false}
              />
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {brands.map((brand, i) => (
            <div key={brands.length + i} className="flex-shrink-0 flex items-center justify-center h-16">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={160}
                height={64}
                className="object-contain grayscale opacity-80 hover:opacity-100 transition"
                draggable={false}
              />
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
