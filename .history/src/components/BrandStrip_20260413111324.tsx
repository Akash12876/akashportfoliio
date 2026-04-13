"use client";
import React, { useEffect, useState } from "react";


const brands = [
  { name: "IPARX MEDIA" },
  { name: "AR GROUP" },
  { name: "COLLEGE DUNIYA" },
  { name: "Ceya" },
  { name: "Minitpe" },
];

export default function BrandStrip() {
  // Unique brand names
  const uniqueNames = React.useMemo(() => [...new Set(brands.map(b => b.name))], []);
  // Shuffle once on first render (client only)
  const [shuffled] = useState(() => {
    const arr = [...uniqueNames];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  return (
    <div className="relative w-full overflow-x-hidden py-8 animated-net-bg">
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
      <div className="relative flex items-center">
        <div className="animate-marquee flex min-w-full gap-24">
          {uniqueNames.map((name, i) => (
            <div key={"orig-" + i} className="flex-shrink-0 flex items-center justify-center h-16">
              <span className="text-2xl font-bold text-white/90 select-none">{name}</span>
            </div>
          ))}
          {shuffled.map((name, i) => (
            <div key={"shuf-" + i} className="flex-shrink-0 flex items-center justify-center h-16">
              <span className="text-2xl font-bold text-white/90 select-none">{name}</span>
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
