"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t-[8px] border-black overflow-hidden">
      
      {/* Decorative colored strip */}
      <div className="h-6 bg-[#FFE234] border-y-[4px] border-black" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white border-[4px] border-black rounded-2xl flex items-center justify-center font-black text-2xl text-black shadow-[4px_4px_0_0_#FFE234] rotate-[-5deg] hover:rotate-0 transition-transform">
              A
            </div>
            <span className="text-xl font-black text-white italic tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                ABHINAY — ENGINEER
            </span>
          </div>
          <p className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
            © {year} · BUILT FOR THE NEXT LEVEL
          </p>
        </div>

        {/* Center: Socials */}
        <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "GITHUB", href: "https://github.com/abhinaycoding", color: "hover:text-[#00E5FF]" },
              { label: "LINKEDIN", href: "https://linkedin.com/in/abhinay-nachankar-36b3a7223/", color: "hover:text-[#FF3CAC]" },
              { label: "RESUME", href: "/resume.pdf", color: "hover:text-[#39FF14]" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-black tracking-widest text-white/40 transition-colors uppercase ${link.color}`}
                style={{ fontFamily: "'Fredoka', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
        </div>

        {/* Right: Signature */}
        <div className="hidden lg:block relative">
            <motion.div 
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="px-6 py-3 bg-[#FFE234] border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000] rotate-[-2deg]"
            >
                <span className="text-sm font-black text-black uppercase tracking-widest">
                    MADE WITH 💛
                </span>
            </motion.div>
        </div>
      </div>

      {/* Giant Background Watermark */}
      <div className="text-center opacity-5 select-none pointer-events-none pb-10">
          <span
            className="text-[12rem] md:text-[20rem] font-black text-white leading-none uppercase italic"
            style={{ 
                fontFamily: "'Fredoka', sans-serif",
                WebkitTextStroke: "4px rgba(255,255,255,0.1)"
            }}
          >
            ABHINAY
          </span>
      </div>
    </footer>
  );
}
