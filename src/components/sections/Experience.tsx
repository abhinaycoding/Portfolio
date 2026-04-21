"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGS = [
  {
    year: "PRESENT",
    role: "Product Engineer",
    company: "Building Scalable Products",
    meta: "BOOT_STABLE // 0MS_LATENCY",
    desc: "Architecting high-fidelity frontend systems and AI integration pipelines for modern SaaS infrastructure.",
    tags: ["System Architecture", "Performance Optimization", "AI Integration"]
  },
  {
    year: "2023",
    role: "Senior Frontend Engineer",
    company: "Product-Led Startup",
    meta: "V2.4_DEPLOYED // CORE_LOADED",
    desc: "Scale lead for enterprise billing dashboards. Optimized visual logic and hardened state management for high-load platforms.",
    tags: ["React Systems", "Hardened UX", "State Logic"]
  },
  {
    year: "2022",
    role: "Frontend Developer",
    company: "Digital Studio",
    meta: "INITIAL_ENTRY // DATA_LINK",
    desc: "Deployed over 15+ high-performance business engines. Focused on motion physics and pixel-perfect design translation.",
    tags: ["Motion Physics", "Web Fundamentals", "Design Ops"]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const COLORS = ["bg-cyan-300", "bg-pink-300", "bg-yellow-300"];

  return (
    <section id="experience" ref={containerRef} className="relative py-48 bg-transparent overflow-hidden px-6 font-['Nunito',sans-serif]">
      <div className="max-w-5xl mx-auto relative flex flex-col items-center">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center mb-32 relative z-10 w-full flex flex-col items-center">
          <div className="inline-block bg-white border-[3px] border-black text-black px-4 py-2 font-black uppercase text-xl rounded-full shadow-[4px_4px_0_0_#000] mb-8 rotate-[2deg] hover:rotate-[-2deg] transition-transform whitespace-nowrap">
            Level Up! 🍄
          </div>
          <h2 className="text-6xl md:text-[8rem] font-['Fredoka',sans-serif] font-bold text-white leading-[0.9] tracking-wide rotate-[-1deg]" style={{ WebkitTextStroke: "3px black", textShadow: "8px 8px 0px black" }}>
            My Epic <br/> <span className="text-yellow-400">Journey!</span>
          </h2>
        </div>

        {/* ─── STICKY STACKING DECK ─── */}
        <div className="relative w-full pb-[20vh]">
          {LOGS.map((log, i) => (
            <div 
              key={i} 
              className="sticky pt-8 w-full group"
              style={{ top: `calc(10vh + ${i * 40}px)`, zIndex: i + 1 }}
            >
               {/* ─── CHUNKY BLOCK ─── */}
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className={`relative w-full ${COLORS[i % COLORS.length]} p-8 md:p-12 rounded-[3rem] border-[6px] border-black shadow-[16px_16px_0_0_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-10 overflow-hidden transform-gpu origin-top`}
               >
                 {/* Cartoon Highlights */}
                 <div className="absolute top-4 left-8 w-24 h-5 bg-white/40 rounded-full rotate-[-5deg] pointer-events-none" />
                 
                 {/* Left Column: Metadata */}
                 <div className="flex-1 pt-6 relative z-10">
                   <div className="bg-black text-white px-5 py-2 inline-block rounded-full border-[3px] border-white mb-6 rotate-[-2deg] font-['Fredoka',sans-serif] font-bold text-xl uppercase tracking-widest shadow-[4px_4px_0_0_#000]">
                      {log.year}
                   </div>
                   <h3 className="text-4xl md:text-5xl font-['Fredoka',sans-serif] text-white font-bold mb-4 tracking-wide shadow-black" style={{ WebkitTextStroke: "2px black", textShadow: "4px 4px 0px black" }}>{log.role}</h3>
                   <p className="text-3xl text-black font-extrabold uppercase bg-white inline-block px-4 py-1 border-[4px] border-black rounded-full shadow-[4px_4px_0_0_#000] rotate-[1deg] whitespace-nowrap">{log.company}</p>
                 </div>
                 
                 {/* Right Column: Descriptions & Tags */}
                 <div className="flex-1 relative z-10">
                   <p className="text-black leading-relaxed text-2xl font-bold mb-8 bg-white/50 p-6 border-[4px] border-black rounded-3xl shadow-[8px_8px_0_0_#000]">{log.desc}</p>
                   
                   <div className="flex flex-wrap gap-3">
                      {log.tags.map((tag, idx) => (
                         <span key={idx} className="px-5 py-3 bg-white border-[3px] border-black rounded-full font-black text-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:rotate-3 transition-transform cursor-pointer whitespace-nowrap">
                           {tag}
                         </span>
                      ))}
                   </div>
                 </div>

               </motion.div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
