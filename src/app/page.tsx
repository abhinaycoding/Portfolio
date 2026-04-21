"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/sections/HeroSequence";
import VaultTransition from "@/components/ui/vault-transition";
import AboutMe from "@/components/sections/AboutMe";
import TechnicalSkills from "@/components/sections/TechnicalSkills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import AnimatedFooter from "@/components/ui/animated-footer";
import { DripBackdrop } from "@/components/ui/drip-backdrop";
import { motion, AnimatePresence } from "framer-motion";
import PageIntro from "@/components/ui/page-intro";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <PageIntro onComplete={() => setIntroComplete(true)} />

      <AnimatePresence>
        {introComplete && (
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Sidebar />
            <main className="relative bg-[#050505] overflow-hidden">
              <div className="pointer-events-none fixed inset-0 z-0">
                <DripBackdrop />
              </div>

              <HeroSequence />
              <VaultTransition />

              <motion.div
                className="relative z-10 w-full flex flex-col gap-12 md:gap-16 lg:gap-20 bg-transparent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <AboutMe />
                <TechnicalSkills />
                <FeaturedProjects />
                <Achievements />
                <Contact />
                
                <AnimatedFooter 
                  leftLinks={[]}
                  rightLinks={[
                    { href: "https://github.com/abhinaycoding", label: "GitHub" },
                    { href: "https://linkedin.com/in/abhinay-nachankar-36b3a7223/", label: "LinkedIn" },
                    { href: "https://instagram.com/abhi.nft", label: "Instagram" },
                    { href: "mailto:abhinaycoding@gmail.com", label: "Email" },
                  ]}
                  copyrightText={`ABHINAY ${currentYear}. ALL SYSTEMS GO.`}
                  barCount={48}
                />
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
