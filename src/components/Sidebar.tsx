"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { User, Brain, Rocket, MessageSquare, Zap, Trophy } from "lucide-react";
import Magnetic from "./Magnetic";
import Logo from "./Logo";

const LINKS = [
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Brain },
  { label: "Projects", href: "#projects", icon: Rocket },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Contact", href: "#contact", icon: MessageSquare },
];

export default function Sidebar() {
  const [activeSegment, setActiveSegment] = useState("about");
  const { scrollYProgress } = useScroll();
  const heightProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSegment(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col items-center gap-10"
    >
      {/* ─── CLEAN LOGO ─── */}
      <Magnetic>
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center transition-transform"
        >
          <Logo className="w-14 h-14" scrolled={true} />
        </motion.a>
      </Magnetic>

      <div className="relative">
        {/* ─── NAV STATION ─── */}
        <nav className="flex flex-col items-center gap-6 p-3 bg-[#111] border-[3px] border-white/10 rounded-full shadow-2xl">
          {LINKS.map((link) => {
            const isActive = activeSegment === link.href.substring(1);
            const Icon = link.icon;
            return (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-colors"
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-[#333] rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <div className="flex flex-col items-center gap-1 relative z-10">
                    <Icon className={`w-5 h-5 transition-all ${isActive ? "text-[#FFE234] scale-110" : "text-white opacity-40 group-hover:opacity-100"}`} />
                    <span className="text-[7px] font-black uppercase tracking-tighter text-white/20 group-hover:text-white transition-colors">
                        {link.label}
                    </span>
                  </div>
                </a>
              </Magnetic>
            );
          })}
        </nav>

        {/* ─── VERTICAL PROGRESS (RIGHT SIDE) ─── */}
        <div className="absolute -right-4 top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            style={{ height: useTransform(heightProgress, [0, 1], ["0%", "100%"]) }}
            className="w-full bg-[#39FF14]"
          />
        </div>
      </div>

      {/* ─── Haptic Hire ─── */}
      <Magnetic>
        <motion.a
          href="mailto:hello@abhinay.dev"
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-white text-black border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-[#FFE234] transition-all"
        >
          <Zap className="w-6 h-6 fill-current" />
        </motion.a>
      </Magnetic>
    </motion.aside>
  );
}
