"use client";
import React from "react";

import ProjectsHeroCourseCard from "./ProjectsHeroCourseCard";



export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 px-4 sm:px-8 bg-black/90 text-white flex flex-col items-center">
      <ProjectsHeroCourseCard />
    </section>
  );
}
