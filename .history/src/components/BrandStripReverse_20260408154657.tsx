"use client";
import React from "react";
import Image from "next/image";

const brands2 = [
  { src: "/brands/brand6.png", alt: "Brand 6" },
  { src: "/brands/brand7.png", alt: "Brand 7" },
  { src: "/brands/brand8.png", alt: "Brand 8" },
  { src: "/brands/brand9.png", alt: "Brand 9" },
  { src: "/brands/brand10.png", alt: "Brand 10" },
];

export default function BrandStripReverse() {
  return (
    <div className="relative w-full overflow-x-hidden py-8 animated-net-bg">
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
      <div className="relative flex items-center">
        <div className="animate-marquee-reverse flex min-w-full gap-24">
          {brands2.map((brand, i) => (
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
          {brands2.map((brand, i) => (
            <div key={brands2.length + i} className="flex-shrink-0 flex items-center justify-center h-16">
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
