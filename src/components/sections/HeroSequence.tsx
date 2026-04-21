"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";
import PromptingIsAllYouNeed from "@/components/ui/animated-hero-section";

// --- Atmospheric Helper: Particle Field ---
const AtmosphericDust = ({ count = 20 }) => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    setParticles(Array.from({ length: count }).map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 105 + "%",
      duration: Math.random() * 12 + 12,
      delay: Math.random() * 8,
    })));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ y: [null, "-10%"], opacity: [0, 0.3, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          className="absolute w-0.5 h-0.5 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,transparent_100%)]"
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
};

// --- Cartoon Decals Helper ---
const CartoonDecals = () => {
    const decals = [
        { char: "★", color: "text-[#FFE234]", top: "15%", left: "12%", rotate: -15, scale: 1.5 },
        { char: "★", color: "text-[#FF3CAC]", top: "65%", left: "85%", rotate: 20, scale: 1.2 },
        { char: "⚡", color: "text-[#00E5FF]", top: "25%", left: "88%", rotate: 10, scale: 1.4 },
        { char: "👾", color: "text-[#39FF14]", top: "75%", left: "15%", rotate: -5, scale: 1.1 },
        { char: "{ }", color: "text-white/20", top: "45%", left: "5%", rotate: 12, scale: 0.8, mono: true },
        { char: "=>", color: "text-white/20", top: "10%", left: "80%", rotate: -8, scale: 0.9, mono: true },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {decals.map((d, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: 1, 
                        scale: d.scale,
                        y: ["-10px", "10px"],
                        rotate: [d.rotate - 5, d.rotate + 5]
                    }}
                    transition={{ 
                        delay: 2 + (i * 0.2), 
                        duration: 3 + i, 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        ease: "easeInOut" 
                    }}
                    className={`absolute ${d.color} font-black text-4xl lg:text-7xl ${d.mono ? 'font-mono' : ''} drop-shadow-[5px_5px_0_rgba(0,0,0,1)] select-none opacity-40`}
                    style={{ top: d.top, left: d.left }}
                >
                    {d.char}
                </motion.div>
            ))}
        </div>
    );
};

export default function HeroSequence() {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  


  useEffect(() => {
    // Master Cinematic Timetable
    const timers = [
      setTimeout(() => setStage(1), 800),   // Initiation
      setTimeout(() => setStage(2), 2800),  // Tension
      setTimeout(() => setStage(3), 3800),  // Power On Flicker
      setTimeout(() => setStage(4), 4800),  // Stabilize / Idle
    ];
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgHue = useTransform(scrollYProgress, [0, 0.4], ["#000", "#030408"]);

  // Pro Vantage Transforms


  return (
    <motion.section
      ref={containerRef}
      style={{ perspective: "4000px" }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8 bg-transparent"
    >
      <AtmosphericDust />
      <CartoonDecals />
      
      {/* ─── CINEMATIC STUDIO ENVIRONMENT ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Anamorphic Glows */}
        <div className="absolute top-[-10%] left-[-15%] w-[130%] h-[30%] bg-white/[0.04] blur-[180px] rounded-[100%]" />
        
        {/* Ignition Bloom Pulse */}
        <motion.div 
          animate={{ 
            opacity: stage === 3 ? [0, 0.5, 0.25] : stage > 3 ? 0.25 : 0,
            scale: stage === 3 ? [1, 1.4, 1.2] : 1
          }}
          className="absolute top-[30%] left-[-10%] w-full h-full bg-blue-500/[0.1] blur-[240px] rounded-[100%] transition-opacity duration-1000" 
        />
        <motion.div 
          animate={{ 
            opacity: stage >= 3 ? 0.15 : 0,
          }}
          className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-pink-500/[0.1] blur-[200px] rounded-[100%]" 
        />
      </div>
      
      


      {/* ─── HI-DEFINITION TYPOGRAPHIC HERO ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full h-[65vh] flex flex-col items-center"
      >
        <div className="w-full h-full relative">
           {/* Contrast Shield - Dark pocket for pixel text pop */}
           <div className="absolute inset-0 bg-[#050505]/20 blur-3xl rounded-full scale-150 z-0" />
           <div className="relative z-10 w-full h-full">
              <PromptingIsAllYouNeed />
           </div>
        </div>
        
        <motion.div
           initial={{ opacity: 0, scaleX: 0 }}
           animate={{ opacity: 1, scaleX: 1 }}
           transition={{ duration: 1.2, delay: 1 }}
           className="w-24 h-1 bg-white/20 mt-16 mb-8 rounded-full"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 relative z-50 pointer-events-auto mt-4"
        >
          <motion.a
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            download
            className="px-10 py-4 bg-[#FFE234] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] font-black uppercase italic tracking-tighter text-black flex items-center justify-center gap-3 transition-transform whitespace-nowrap"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            GET RESUME
          </motion.a>
        </motion.div>

      </motion.div>


      

      <div className="absolute inset-0 pointer-events-none opacity-[0.015] noise-bg" />
    </motion.section>
  );
}
