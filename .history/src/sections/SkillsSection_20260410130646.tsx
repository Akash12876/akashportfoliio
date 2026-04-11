// ...existing code...
  handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full pt-40 pb-32 px-4 sm:px-8 bg-gradient-to-br from-[#050509] via-[#0a0a0a] to-[#050509] text-white flex flex-col items-center min-h-[100vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "backOut" }}
  viewport={{ once: false, amount: 0.7 }}
  className="z-30 w-full flex flex-col items-center justify-center mb-8"
        style={{ pointerEvents: "none", position: 'absolute', top: '32px', left: 0, right: 0 }}
      >
        <div className="bg-[#18181c] rounded-xl px-4 py-1 shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0"
            style={{ fontFamily: 'Montserrat, Poppins, sans-serif', fontWeight: 700, letterSpacing: '0.01em' }}
          >
            My Skills
          </h2>
        </div>
        <TypingSubheading />
      </motion.div>
      <div
        className="relative w-full max-w-3xl flex flex-col items-center justify-center mt-24 gap-16"
        style={{ perspective: 1200 }}
      >
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} i={i} />
        ))}
      </div>
    </section>
  );
}


"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaHtml5, FaCss3Alt, FaJs, FaMobileAlt, FaDatabase, FaLinux } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiDocker, SiMongodb, SiRedux, SiKubernetes, SiGithubactions, SiJenkins, SiNginx, SiTerraform } from "react-icons/si";


const skillCategories = [
  {
    title: "Web Development",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" />, level: "Expert" },
      { name: "Next.js", icon: <SiNextdotjs className="text-zinc-200" />, level: "Advanced" },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" />, level: "Advanced" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" />, level: "Advanced" },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-400" />, level: "Expert" },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-300" />, level: "Expert" },
      { name: "JavaScript", icon: <FaJs className="text-yellow-300" />, level: "Expert" },
      { name: "Redux", icon: <SiRedux className="text-purple-400" />, level: "Advanced" },
    ],
  },
  {
    title: "App Development",
    color: "from-pink-500 to-purple-500",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" />, level: "Advanced" },
      { name: "Mobile Apps", icon: <FaMobileAlt className="text-pink-300" />, level: "Intermediate" },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, level: "Advanced" },
      { name: "Database", icon: <FaDatabase className="text-blue-200" />, level: "Advanced" },
    ],
  },
  {
    title: "DevOps",
    color: "from-yellow-400 via-green-400 to-blue-400",
    skills: [
      { name: "AWS", icon: <FaAws className="text-yellow-400" />, level: "Advanced" },
      { name: "Docker", icon: <SiDocker className="text-blue-400" />, level: "Advanced" },
      { name: "Kubernetes", icon: <SiKubernetes className="text-blue-300" />, level: "Intermediate" },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-gray-200" />, level: "Advanced" },
      { name: "Jenkins", icon: <SiJenkins className="text-red-400" />, level: "Intermediate" },
      { name: "Linux", icon: <FaLinux className="text-gray-300" />, level: "Expert" },
      { name: "Nginx", icon: <SiNginx className="text-green-400" />, level: "Advanced" },
      { name: "Terraform", icon: <SiTerraform className="text-purple-400" />, level: "Intermediate" },
    ],
  },
];

// Typing animation subheading component (client only)
function TypingSubheading() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.7, once: false });
  const phrases = [
    "Expertise in Web, App & DevOps 🚀",
    "React, Next.js, Node.js, AWS, Docker, ...",
    "Building modern, scalable solutions!",
  ];
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (inView) {
      if (typing) {
        if (charIdx < phrases[phraseIdx].length) {
          timeout = setTimeout(() => {
            setDisplay((d) => d + phrases[phraseIdx][charIdx]);
            setCharIdx((i) => i + 1);
          }, 60);
        } else {
          timeout = setTimeout(() => setTyping(false), 1200);
        }
      } else {
        // ...existing code up to the end of the first export default SkillsSection...
              transition={{ duration: 0.5, delay: 0.2 + j * 0.07 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 group-hover:bg-black/50 transition-colors duration-300 shadow"
            >
              <span className="text-3xl md:text-4xl mb-1 drop-shadow-lg">{skill.icon}</span>
              <span className="font-medium text-zinc-100 text-base md:text-lg">{skill.name}</span>
              <span className="text-xs text-cyan-200 font-mono">{skill.level}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Right: Details */}
      <div className="flex-1 flex flex-col items-start md:items-start justify-center md:pl-12">
        <h3 className={`text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r ${cat.color} text-transparent bg-clip-text`}>{cat.title}</h3>
        <ul className="mb-6 space-y-2">
          {cat.skills.map((skill) => (
            <li key={skill.name} className="flex items-center gap-2 text-lg">
              <span className="inline-block align-middle">{skill.icon}</span>
              <span className="align-middle font-semibold text-zinc-100">{skill.name}</span>
              <span className="text-xs text-cyan-300 ml-2">{skill.level}</span>
            </li>
          ))}
        </ul>
        <button className="mt-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform">Learn More</button>
      </div>
    </motion.div>
  );
}
      </div>
    </section>
  );
}
