"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function PortraitSection() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Global Scroll animations (Weighted)
  const y = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Staggered slice animations based on scroll
  const slice1Y = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const slice2Y = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const slice3Y = useTransform(scrollYProgress, [0.3, 0.6], [140, 0]);

  const springX = useSpring(0, { stiffness: 60, damping: 25 });
  const springY = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 40;
      const y = (clientY / innerHeight - 0.5) * 40;
      springX.set(x);
      springY.set(y);
      
      document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <section 
      ref={container} 
      className="relative h-[160vh] w-full flex items-center justify-center bg-black overflow-hidden py-32"
    >
      {/* ─── Premium Volumetric Aura ─── */}
      <motion.div 
        style={{ 
          background: `radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.04) 0%, transparent 100%)`,
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-16 md:gap-40">
        
        {/* ─── CYBER SLICE PORTRAIT (UPGRADED) ─── */}
        <motion.div 
          style={{ opacity, y }}
          className="relative w-[340px] h-[480px] md:w-[540px] md:h-[720px] flex gap-3 group"
        >
          {/* Slice 1 (Refractive Edge) */}
          <motion.div 
            style={{ y: slice1Y, rotateX: springY, rotateY: springX }}
            className="flex-1 relative overflow-hidden glass-prism border-l border-white/10"
          >
            <motion.img 
              src="/portrait.png" 
              className="absolute h-full w-[300%] max-w-none object-cover grayscale group-hover:grayscale-0 contrast-125 transition-all duration-1000"
              style={{ left: "0%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            
            {/* Metadata float */}
            <motion.div style={{ x: springX, y: springY }} className="absolute bottom-10 left-4 text-[8px] font-mono text-white/40 tracking-wider">
               ID_01 // LFT_CHNL
            </motion.div>
          </motion.div>

          {/* Slice 2 (Center Focus) */}
          <motion.div 
            style={{ y: slice2Y, rotateX: springY, rotateY: springX }}
            className="flex-[1.2] relative overflow-hidden border-x border-white/20 z-10 glass-prism shadow-[0_0_80px_rgba(255,255,255,0.05)]"
          >
            <motion.img 
              src="/portrait.png" 
              className="absolute h-full w-[250%] max-w-none object-cover grayscale group-hover:grayscale-0 contrast-110 transition-all duration-1000"
              style={{ left: "-75%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
            
            {/* Premium Refraction Highlight */}
            <div className="absolute inset-0 scan-line z-20 pointer-events-none opacity-30" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 backdrop-blur-[2px]">
               <span className="text-[11px] font-mono text-white tracking-[0.8em] rotate-90 whitespace-nowrap font-bold">ABHINAY_V1.0</span>
            </div>
          </motion.div>

          {/* Slice 3 (Refractive Edge) */}
          <motion.div 
            style={{ y: slice3Y, rotateX: springY, rotateY: springX }}
            className="flex-1 relative overflow-hidden glass-prism border-r border-white/10"
          >
            <motion.img 
              src="/portrait.png" 
              className="absolute h-full w-[300%] max-w-none object-cover grayscale group-hover:grayscale-0 contrast-125 transition-all duration-1000"
              style={{ left: "-200%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            
            {/* Technical Spec Float */}
            <motion.div style={{ x: springX, y: springY }} className="absolute top-10 right-4 text-[8px] font-mono text-white/40 text-right tracking-wider">
               SYS_LINK // STABLE <br/>
               LAT_0MS
            </motion.div>
          </motion.div>

          {/* ─── Premium HUD Brackets ─── */}
          <motion.div 
            style={{ x: useSpring(springX, { stiffness: 200 }), y: useSpring(springY, { stiffness: 200 }) }}
            className="absolute -inset-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/40" />
            
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/20 uppercase tracking-[1em]">
              Scanning_Entity
            </div>
          </motion.div>
        </motion.div>

        {/* ─── SECTION TEXT ─── */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-5 mb-10">
              <span className="text-[11px] font-mono text-white/30 uppercase tracking-[0.6em]">Identification</span>
              <div className="h-[1px] bg-gradient-to-r from-white/20 to-transparent flex-1" />
            </div>
            
            <h2 className="text-6xl md:text-[8rem] font-bold tracking-[ -0.05em] text-white mb-12 leading-[0.8] variable-weight">
              Core <br/>
              Architect.
            </h2>
            
            <p className="text-text-secondary leading-relaxed max-w-lg text-lg md:text-xl font-light mb-16">
               Merging high-fidelity visual logic with hardened system reliability. I architect platforms that define the <span className="text-white font-medium">next generation</span> of engineering standards.
            </p>

            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-16">
               <div className="group/item">
                 <div className="text-[9px] font-mono text-white/30 uppercase mb-4 tracking-widest group-hover/item:text-white/60 transition-colors">Integrity</div>
                 <div className="text-sm text-white font-mono">100.00% Reliable</div>
               </div>
               <div className="group/item">
                 <div className="text-[9px] font-mono text-white/30 uppercase mb-4 tracking-widest group-hover/item:text-white/60 transition-colors">Bandwidth</div>
                 <div className="text-sm text-white font-mono">Unrestricted</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
