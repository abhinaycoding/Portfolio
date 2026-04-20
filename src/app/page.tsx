"use client";
import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/sections/HeroSequence";
import AboutMe from "@/components/sections/AboutMe";
import TechnicalSkills from "@/components/sections/TechnicalSkills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { DripBackdrop } from "@/components/ui/drip-backdrop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative bg-[#050505]">
        {/* The Rainbow Drip Backdrop - Restored as per the prompt */}
        <DripBackdrop />

        <HeroSequence />

        {/* Content sections - Transparent for background visibility */}
        <div className="relative z-10 w-full flex flex-col gap-20 md:gap-32 lg:gap-40 bg-transparent">
          <AboutMe />
          <TechnicalSkills />
          <FeaturedProjects />
          <Achievements />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
