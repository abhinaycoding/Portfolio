"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

const LINKS = [
  { label: "About", href: "#about", emoji: "👤" },
  { label: "Skills", href: "#skills", emoji: "🧠" },
  { label: "Projects", href: "#projects", emoji: "🚀" },
  { label: "Resume", href: "/resume.pdf", emoji: "📄" },
  { label: "Contact", href: "#contact", emoji: "💬" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => setScrolled(latest > 80));
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 md:hidden ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div className={`w-full flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "px-6 md:px-12 py-3 bg-white/90 backdrop-blur-md border-b-[4px] border-black shadow-[0_4px_0_0_#000]"
            : "px-6 md:px-16 py-6"
        }`}>
          {/* Logo */}
          <Magnetic>
            <motion.a
              href="#"
              whileHover={{ rotate: 10, scale: 1.1 }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl border-[3px] border-black shadow-[4px_4px_0_0_#000] font-bold text-2xl transition-colors ${
                scrolled ? "bg-[#FFE234] text-black" : "bg-white text-black"
              }`}
            >
              A
            </motion.a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {LINKS.map((link) => (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  className={`px-5 py-2 text-sm font-black uppercase tracking-widest transition-all hover:scale-110 active:scale-95 ${
                    scrolled ? "text-black hover:text-[#FF3CAC]" : "text-white hover:text-[#FFE234]"
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  <span className="mr-2">{link.emoji}</span>
                  {link.label}
                </a>
              </Magnetic>
            ))}
            <div className={`w-[3px] h-6 mx-2 ${scrolled ? "bg-black" : "bg-white/20"}`} />
            <Magnetic>
              <motion.a
                href="mailto:abhinaycoding@gmail.com"
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="ml-2 px-6 py-2.5 bg-[#FFE234] text-black border-[3px] border-black rounded-full font-black text-sm uppercase shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all whitespace-nowrap"
              >
                Hire Me ⚡
              </motion.a>
            </Magnetic>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col items-center justify-center w-12 h-12 rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#000] transition-colors ${
              scrolled ? "bg-[#FFE234]" : "bg-white"
            }`}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-6 h-[3px] bg-black rounded" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-[3px] bg-black rounded my-1" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-6 h-[3px] bg-black rounded" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%", borderRadius: "0 0 0 100%" }}
            animate={{ x: 0, borderRadius: 0 }}
            exit={{ x: "100%", borderRadius: "0 0 0 100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 150 }}
            className="fixed inset-0 z-[99] bg-[#FFE234] flex flex-col items-center justify-center border-l-[8px] border-black overflow-hidden"
          >
            {/* Background Halftone Overlay */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[radial-gradient(#000_2px,transparent_2px)] bg-[length:10px_10px]" />
            
            {/* Background Cartoon Decals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }} 
              animate={{ opacity: 0.3, scale: 1 }} 
              transition={{ delay: 0.5 }}
              className="absolute top-20 left-10 text-7xl select-none rotate-[-12deg]"
            >
              ★
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }} 
              animate={{ opacity: 0.3, scale: 1 }} 
              transition={{ delay: 0.7 }}
              className="absolute bottom-20 right-10 text-8xl select-none rotate-[15deg]"
            >
              ⚡
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }} 
              animate={{ opacity: 0.2, scale: 1 }} 
              transition={{ delay: 0.9 }}
              className="absolute top-1/2 left-[-20px] text-9xl select-none opacity-10"
            >
              👾
            </motion.div>

            {/* Close Button "Red Alert" Style */}
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-10 w-16 h-16 bg-[#FF3CAC] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] text-3xl font-black text-white hover:scale-110 active:scale-95 transition-all z-20 flex items-center justify-center overflow-hidden group"
            >
              <span className="relative z-10">✕</span>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/20 group-hover:h-full transition-all" />
            </button>

            {/* Menu Label */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-12 left-10 hidden lg:block"
            >
                <div className="px-4 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-lg">
                    System_Menu v1.0
                </div>
            </motion.div>

            {/* Links Container */}
            <div className="w-full px-10 flex flex-col gap-6 relative z-10">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: (i % 2 === 0 ? -2 : 2) }}
                    transition={{ 
                        type: "spring", 
                        damping: 20, 
                        stiffness: 150,
                        delay: 0.2 + (i * 0.1) 
                    }}
                  >
                    <Magnetic>
                        <a
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="group relative flex items-center gap-6 px-8 py-5 bg-white border-[4px] border-black rounded-3xl shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-all hover:-translate-y-2 active:translate-y-1 active:shadow-none"
                        >
                            <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                                {link.emoji}
                            </span>
                            <span 
                                className="text-4xl md:text-6xl font-black uppercase text-black tracking-tight"
                                style={{ fontFamily: "'Fredoka', sans-serif" }}
                            >
                                {link.label}
                            </span>
                            
                            {/* Sticker Accent */}
                            <div className="absolute top-2 right-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                <Zap className="w-6 h-6 text-[#FFE234] fill-current" />
                            </div>
                        </a>
                    </Magnetic>
                  </motion.div>
                ))}
                
                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 self-center w-full"
                >
                    <Magnetic>
                        <a
                        href="mailto:abhinaycoding@gmail.com"
                        className="flex items-center justify-center gap-4 px-10 py-6 bg-[#39FF14] border-[4px] border-black rounded-full font-black text-2xl md:text-3xl uppercase shadow-[10px_10px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all hover:scale-105 active:scale-95 whitespace-nowrap group"
                        >
                        <span>HIRE ME</span>
                        <Rocket className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            {/* Bottom Warning Tape Decoration */}
            <div className="absolute bottom-0 w-[200%] h-8 bg-black flex overflow-hidden opacity-20 pointer-events-none">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="text-yellow-400 font-black text-lg px-4 italic tracking-widest">
                            CAUTION // HIGH VOLTAGE // SYSTEM_READY //
                        </span>
                    ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
