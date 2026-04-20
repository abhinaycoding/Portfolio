"use client";
import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/sections/HeroSequence";
import AboutMe from "@/components/sections/AboutMe";
import TechnicalSkills from "@/components/sections/TechnicalSkills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import AnimatedFooter from "@/components/ui/animated-footer";
import { DripBackdrop } from "@/components/ui/drip-backdrop";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar />
      <main className="relative bg-[#050505] overflow-hidden">
        {/* The Rainbow Drip Backdrop - Restored as per the prompt */}
        <div className="pointer-events-none fixed inset-0 z-0">
           <DripBackdrop />
        </div>

        <HeroSequence />

        {/* Content sections - Transparent for background visibility */}
        <div className="relative z-10 w-full flex flex-col gap-20 md:gap-32 lg:gap-40 bg-transparent">
          <AboutMe />
          <TechnicalSkills />
          <FeaturedProjects />
          <Achievements />
          <Contact />
          
          <AnimatedFooter 
            leftLinks={[
              { href: "#", label: "Legal" },
              { href: "#", label: "Privacy" },
              { href: "#", label: "Cookies" },
            ]}
            rightLinks={[
              { href: "https://github.com/abhinaycoding", label: "GitHub" },
              { href: "https://linkedin.com/in/abhinay-nachankar-36b3a7223/", label: "LinkedIn" },
              { href: "https://instagram.com/abhi.nft", label: "Instagram" },
              { href: "mailto:abhinaycoding@gmail.com", label: "Email" },
            ]}
            copyrightText={`ABHINAY ${currentYear}. ALL SYSTEMS GO.`}
            barCount={48}
          />
        </div>
      </main>
    </>
  );
}
