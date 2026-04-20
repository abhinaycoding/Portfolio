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
  { label: "Email", href: "mailto:hello@abhinay.dev", display: "hello@abhinay.dev", icon: Mail },
  { label: "GitHub", href: "https://github.com/abhinay", display: "github.com/abhinay", icon: CustomIcons.Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/abhinay", display: "linkedin.com/in/abhinay", icon: CustomIcons.Linkedin },
  { label: "Social", href: "https://instagram.com/abhinay", display: "@abhinay", icon: CustomIcons.Instagram },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-48 lg:py-64 overflow-hidden bg-[#050505] border-t border-white/5">
      
      {/* ─── CLEAN SUBTLE DIVIDER ─── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* ─── BENTO GRID (DISCIPLINED) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* 1. Main Headline Unit (12 cols) */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="md:col-span-12 p-10 md:p-14 bg-[#111] border-[1px] border-white/10 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-10"
            >
                <div className="flex-1">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none uppercase tracking-tighter mb-8 italic">
                       Let&apos;s build <br/> 
                       <span className="text-white/40">the future.</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                        I am currently available for new projects and collaborations. If you have an epic idea, let&apos;s make it happen.
                    </p>
                </div>
                
                <div className="shrink-0">
                    <Magnetic>
                        <a href="mailto:hello@abhinay.dev" className="inline-flex items-center gap-4 px-10 py-5 bg-[#FFE234] text-black text-xl font-black uppercase rounded-full hover:scale-105 transition-transform group">
                           Contact Me <Zap className="w-5 h-5 fill-current group-hover:animate-bounce" />
                        </a>
                    </Magnetic>
                </div>
            </motion.div>

            {/* 3. Social Grid (All 12 cols) */}
            <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
                {SOCIALS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div 
                            key={s.label}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            viewport={{ once: true }}
                        >
                            <a 
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block p-8 bg-[#111] border-[1px] border-white/10 rounded-[1.5rem] hover:bg-white/5 transition-all h-full"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <Icon className="w-6 h-6 text-white transition-transform group-hover:scale-110 group-hover:text-[#FFE234]" />
                                    <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{s.label}</p>
                                    <p className="text-lg font-bold text-white group-hover:text-[#FFE234] transition-colors truncate">{s.display}</p>
                                </div>
                            </a>
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
