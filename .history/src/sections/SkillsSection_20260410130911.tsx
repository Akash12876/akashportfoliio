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
