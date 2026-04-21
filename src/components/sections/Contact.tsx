"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowUpRight, Zap } from "lucide-react";
import Magnetic from "../Magnetic";

// Custom High-Precision Brand SVGs
const CustomIcons = {
  Github: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  Linkedin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
};

const SOCIALS = [
  { label: "Email", href: "mailto:abhinaycoding@gmail.com", display: "abhinaycoding@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/abhinaycoding", display: "github.com/abhinaycoding", icon: CustomIcons.Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhinay-nachankar-36b3a7223/", display: "linkedin.com/abhinay-nachankar", icon: CustomIcons.Linkedin },
  { label: "Social", href: "https://instagram.com/abhi.nft", display: "@abhi.nft", icon: CustomIcons.Instagram },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#050505] border-t border-white/5">
      
      {/* ─── CLEAN SUBTLE DIVIDER ─── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* ─── BENTO GRID (DISCIPLINED) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* 1. Main Headline Module (12 cols) */}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="md:col-span-12 p-10 md:p-14 bg-[#111] border-[6px] border-black rounded-[3.5rem] shadow-[16px_16px_0_0_#000] flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden group"
            >
                {/* Background Halftone Decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] bg-[length:12px_12px] opacity-[0.03] pointer-events-none" />
                
                {/* Status Marquee */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-8 bg-[#FFE234] border-b-[4px] border-black flex overflow-hidden opacity-100 items-center">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-black font-black text-[10px] px-4 uppercase tracking-[0.3em]">
                                SYSTEM_STATUS: READY TO BUILD /// TRANSMITTING... /// 
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex-1 relative z-10 pt-8">
                    <div className="inline-block bg-[#FF3CAC] text-white px-4 py-1.5 rounded-lg border-[3px] border-black mb-6 rotate-[-2deg] font-black uppercase text-xs tracking-widest shadow-[4px_4px_0_0_#000]">
                        SIGNAL_STRENGTH: 100%
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-['Fredoka',sans-serif] font-black text-white leading-[0.85] uppercase tracking-tight mb-8" style={{ textShadow: "8px 8px 0px #000" }}>
                       Let&apos;s build <br/> 
                       <span className="text-[#FFE234] italic">the future.</span>
                    </h2>
                    <p className="text-white/40 text-xl max-w-xl leading-relaxed font-bold">
                        Currently available for high-fidelity collaborations. If you have an epic vision, let&apos;s make it a reality.
                    </p>
                </div>
                
                <div className="shrink-0 relative z-10">
                    <Magnetic>
                        <a href="mailto:abhinaycoding@gmail.com" className="relative inline-flex items-center gap-5 px-12 py-7 bg-[#39FF14] border-[5px] border-black text-black text-2xl font-black uppercase rounded-full shadow-[10px_10px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] hover:-translate-y-2 active:translate-y-1 active:shadow-none transition-all group overflow-hidden">
                           Contact Me 
                           <Zap className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" />
                           <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-700" />
                        </a>
                    </Magnetic>
                </div>
            </motion.div>

            {/* 3. Social Module Grid (All 12 cols) */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {SOCIALS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div 
                            key={s.label}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            viewport={{ once: true }}
                        >
                            <Magnetic>
                                <a 
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative block p-10 border-[5px] border-black rounded-[2.5rem] shadow-[12px_12px_0_0_#000] hover:shadow-[16px_16px_0_0_#000] hover:-translate-y-2 transition-all h-full overflow-hidden ${
                                        i % 4 === 0 ? "bg-[#00E5FF]" : i % 4 === 1 ? "bg-[#FF3CAC]" : i % 4 === 2 ? "bg-[#FFE234]" : "bg-[#39FF14]"
                                    }`}
                                >
                                    {/* Holographic Shine Overlay */}
                                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 -skew-y-12 translate-y-[-120%] group-hover:translate-y-[200%] transition-transform duration-700 pointer-events-none" />

                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 bg-black border-[3px] border-white rounded-2xl flex items-center justify-center shadow-[4px_4px_0_0_#000] group-hover:rotate-12 transition-transform rotate-[-6deg]">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="w-10 h-10 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_#000] group-hover:rotate-[-12deg] transition-transform">
                                            <ArrowUpRight className="w-5 h-5 text-black" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[12px] font-black text-black/40 uppercase tracking-widest mb-1">{s.label}</p>
                                        <p className="text-xl font-black text-black truncate italic transition-colors" style={{ fontFamily: "'Fredoka', sans-serif" }}>{s.display}</p>
                                    </div>
                                    
                                    {/* Industrial Rivets */}
                                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-black/10 border border-black/20" />
                                    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-black/10 border border-black/20" />
                                </a>
                            </Magnetic>
                        </motion.div>
                    );
                })}
            </div>

        </div>

        {/* ─── FOOTER ─── */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">© 2024 Abhinay. Designed with Passion.</p>
            <div className="flex gap-10">
                <a href="#" className="text-white/20 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Back to top ↑</a>
            </div>
        </div>

      </div>
    </section>
  );
}
