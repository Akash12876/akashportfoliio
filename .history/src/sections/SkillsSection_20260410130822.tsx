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
// ...existing code ends here
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
