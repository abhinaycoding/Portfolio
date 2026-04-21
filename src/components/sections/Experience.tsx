"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Zap, Shield } from "lucide-react";
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

function ExperienceCard({ log, i, colors }: { log: any; i: number; colors: string[] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

    function handleMouseMove(e: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div 
          className="sticky pt-8 w-full group"
          style={{ top: `calc(10vh + ${i * 40}px)`, zIndex: i + 1 }}
        >
           {/* ─── CHUNKY BLOCK ─── */}
           <motion.div 
             ref={cardRef}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             style={{ rotateX, rotateY, perspective: 1000 }}
             className={`relative w-full ${colors[i % colors.length]} p-8 md:p-12 rounded-[3.5rem] border-[6px] border-black shadow-[16px_16px_0_0_#000] flex flex-col md:flex-row items-start md:items-center justify-between gap-10 overflow-hidden transform-gpu origin-top transition-shadow duration-300 hover:shadow-[24px_24px_0_0_#000]`}
           >
             {/* ── Floating 'STATUS' Sticker ── */}
             <motion.div 
                style={{ 
                    x: useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]),
                    rotate: i % 2 === 0 ? -12 : 12
                }}
                className="absolute top-6 right-10 z-30 px-6 py-2 bg-black border-[3px] border-white rounded-xl shadow-[4px_4px_0_0_#000] flex items-center gap-2 font-black text-white text-xs uppercase"
             >
                <Zap className="w-4 h-4 text-[#FFE234] fill-current" />
                {log.meta.split(' // ')[0]}
             </motion.div>

             {/* Holographic Shine Overlay */}
             <motion.div 
                style={{ 
                    left: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "150%"]),
                    top: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "150%"]),
                    background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 45%, rgba(0,229,255,0.1) 50%, rgba(255,60,172,0.1) 55%, transparent 100%)" 
                }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20"
             />

             {/* Cartoon Highlights */}
             <div className="absolute top-4 left-8 w-24 h-5 bg-white/40 rounded-full rotate-[-5deg] pointer-events-none" />
             
             {/* Industrial Rivets */}
             <div className="absolute top-6 left-6 w-3 h-3 bg-black/20 rounded-full border border-black/30" />
             <div className="absolute bottom-6 left-6 w-3 h-3 bg-black/20 rounded-full border border-black/30" />

             {/* Left Column: Metadata */}
             <div className="flex-1 pt-6 relative z-10">
               <div className="bg-black text-white px-5 py-2 inline-block rounded-full border-[3px] border-white mb-6 rotate-[-2deg] font-['Fredoka',sans-serif] font-bold text-xl uppercase tracking-widest shadow-[4px_4px_0_0_#000] group-hover:rotate-0 transition-transform">
                  {log.year}
               </div>
               <h3 className="text-4xl md:text-5xl lg:text-6xl font-['Fredoka',sans-serif] text-white font-bold mb-4 tracking-wide" style={{ WebkitTextStroke: "2px black", textShadow: "4px 4px 0px black" }}>{log.role}</h3>
               <p className="text-2xl md:text-3xl text-black font-extrabold uppercase bg-white inline-block px-5 py-2 border-[4px] border-black rounded-2xl shadow-[4px_4px_0_0_#000] rotate-[1deg] whitespace-nowrap group-hover:-rotate-1 transition-transform">{log.company}</p>
             </div>
             
             {/* Right Column: Descriptions & Tags */}
             <div className="flex-1 relative z-10">
               <p className="text-black leading-relaxed text-xl md:text-2xl font-bold mb-8 bg-white/50 p-6 border-[4px] border-black rounded-[2rem] shadow-[8px_8px_0_0_#000]">{log.desc}</p>
               
               <div className="flex flex-wrap gap-3">
                  {log.tags.map((tag: string, idx: number) => (
                     <span key={idx} className="px-5 py-3 bg-white border-[3px] border-black rounded-full font-black text-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:rotate-3 transition-transform cursor-pointer whitespace-nowrap text-sm md:text-base">
                       {tag}
                     </span>
                  ))}
               </div>
             </div>

           </motion.div>
        </div>
    );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const COLORS = ["bg-[#00E5FF]", "bg-[#FF3CAC]", "bg-[#FFE234]", "bg-[#39FF14]"];

  return (
    <section id="experience" ref={containerRef} className="relative py-48 bg-transparent overflow-hidden px-6 font-['Nunito',sans-serif]">
      <div className="max-w-6xl mx-auto relative flex flex-col items-center">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="items-center mb-32 relative z-10 w-full flex flex-col text-center">
          <div className="inline-block bg-white border-[3px] border-black text-black px-6 py-2.5 font-black uppercase text-xl rounded-full shadow-[6px_6px_0_0_#000] mb-8 rotate-[2deg] hover:rotate-[-2deg] transition-transform whitespace-nowrap">
            STORY_LOG v2.0 🍄
          </div>
          <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-['Fredoka',sans-serif] font-bold text-white leading-[0.8] tracking-tight rotate-[-1deg]" style={{ WebkitTextStroke: "3px black", textShadow: "8px 8px 0px black" }}>
            The Epic <br/> <span className="text-[#FFE234]">Journey!</span>
          </h2>
        </div>

        {/* ─── STICKY STACKING DECK ─── */}
        <div className="relative w-full pb-[20vh] flex flex-col gap-10">
          {LOGS.map((log, i) => (
            <ExperienceCard key={i} log={log} i={i} colors={COLORS} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
