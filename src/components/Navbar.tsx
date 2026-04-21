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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99] bg-[#FFE234] p-10 flex flex-col items-center justify-center gap-8 border-l-[8px] border-black"
          >
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-10 w-16 h-16 bg-white border-[4px] border-black rounded-full shadow-[8px_8px_0_0_#000] text-3xl font-bold"
            >
              ✕
            </button>
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMenuOpen(false)}
                className="text-5xl font-black uppercase text-black hover:scale-110 transition-transform"
                style={{ fontFamily: "'Fredoka', sans-serif" }}
              >
                {link.emoji} {link.label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:abhinaycoding@gmail.com"
              className="mt-10 px-10 py-5 bg-white border-[4px] border-black rounded-full font-black text-2xl uppercase shadow-[10px_10px_0_0_#000] whitespace-nowrap"
            >
              Contact Me!
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
