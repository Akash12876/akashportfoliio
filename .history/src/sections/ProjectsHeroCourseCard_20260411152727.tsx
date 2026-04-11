// import React from "react";
// import Image from "next/image";

// export default function ProjectsHeroCourseCard() {
//   return (
//     <section className="bg-zinc-900 rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden w-full max-w-6xl mx-auto mt-10">
//       {/* Left: Laptop Mockup with Floating Cards */}
//       <div className="relative w-full md:w-1/2 flex justify-center items-center min-h-[340px]">
//         <Image
//           src="/laptop-mockup.png"
//           alt="Laptop"
//           width={420}
//           height={260}
//           className="w-[420px] drop-shadow-2xl z-10"
//           priority
//         />
//         {/* Floating UI Cards */}
//         <div className="absolute top-20 left-16 w-32 h-20 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-center z-20">
//           <span className="text-white font-semibold">Websites</span>
//         </div>
//         <div className="absolute top-36 left-40 w-36 h-24 bg-white/10 rounded-xl backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-center z-20">
//           <span className="text-white font-semibold">DSA</span>
//         </div>
//         <div className="absolute top-10 left-44 w-40 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg flex flex-col items-center justify-center z-20">
//           <span className="text-white font-semibold">$62,970</span>
//           <span className="text-xs text-zinc-200">Today</span>
//         </div>
//       </div>

//       {/* Right: Text & Features */}
//       <div className="w-full md:w-1/2 flex flex-col gap-6">
//         <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
//           2.0 Job Ready AI Powered Cohort: <br />
//           Complete Web Development + DSA + Gen-AI + Aptitude
//         </h2>
//         <div className="flex gap-4 mt-4 flex-wrap">
//           <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-4 py-2 text-white text-base font-medium">
//             <span role="img" aria-label="clock">⏰</span>
//             <span>200+ Hours</span>
//           </div>
//           <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-4 py-2 text-white text-base font-medium">
//             <span role="img" aria-label="certified">🎓</span>
//             <span>Yes Certified</span>
//           </div>
//           <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-4 py-2 text-white text-base font-medium">
//             <span role="img" aria-label="support">📞</span>
//             <span>24/7 Mentor Support</span>
//           </div>
//         </div>
//         <div className="mt-6 flex items-end gap-4">
//           <span className="text-3xl md:text-4xl font-bold text-orange-500">Rs.5999</span>
//           <span className="text-xl text-zinc-400 line-through">Rs.11998 (+GST)</span>
//         </div>
//         <button className="mt-4 bg-white text-black rounded-lg px-6 py-3 font-semibold shadow hover:bg-zinc-100 transition flex items-center gap-2 w-fit">
//           Check Course <span aria-hidden>→</span>
//         </button>
//       </div>
//     </section>
//   );
// }
