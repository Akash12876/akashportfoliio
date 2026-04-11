"use client";
import React from "react";

import ProjectsScrollCards from "./ProjectsScrollCards";



export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 px-4 sm:px-8 bg-black/90 text-white flex flex-col items-center">
      <ProjectsScrollCards />
    </section>
  );
}
