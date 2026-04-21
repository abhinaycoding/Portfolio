"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PaperTearTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Snappier transformations
  const topY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-105%"]);
  const bottomY = useTransform(scrollYProgress, [0, 0.8], ["0%", "105%"]);
  const paperOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  
  const topRotate = useTransform(scrollYProgress, [0, 0.8], [0, -8]);
  const bottomRotate = useTransform(scrollYProgress, [0, 0.8], [0, 8]);

  const tearPath = "M0 0H1440V60L1410 75L1380 50L1350 90L1320 65L1290 100L1260 70L1230 110L1200 80L1170 105L1140 70L1110 95L1080 60L1050 85L1020 55L990 100L960 70L930 115L900 80L870 105L840 65L810 95L780 60L750 90L720 70L690 105L660 80L630 100L600 70L570 95L540 65L510 110L480 80L450 105L420 75L390 100L360 70L330 95L300 60L270 90L240 70L210 105L180 80L150 100L120 70L90 95L60 65L30 105L0 70V0Z";

  return (
    <div ref={containerRef} className="relative h-[180vh] w-full bg-transparent z-[35] pointer-events-none">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pointer-events-none">
        
        {/* ── THE REVEAL LAYER (Behind the paper) ── */}
        <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]) }}
            className="absolute inset-0 z-0 bg-[#0A0A0A] flex items-center justify-center font-['Fredoka',sans-serif]"
        >
            {/* Industrial schematics pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFE234_1px,transparent_1px)] bg-[length:20px_20px]" />
            
            {/* Glimpse of what's coming */}
            <div className="text-center">
                <span className="text-[12rem] font-black text-white/[0.03] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">TECH</span>
            </div>
        </motion.div>

        {/* TOP HALF */}
        <motion.div 
            style={{ y: topY, rotate: topRotate, opacity: paperOpacity, originX: 0, originY: 1 }}
            className="absolute top-0 left-0 w-full h-[55%] z-20"
        >
            <div className="w-full h-full bg-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px] opacity-[0.05]" />
                <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="absolute -bottom-[2px] left-0 w-full h-[80px] md:h-[120px] drop-shadow-[0_15px_0_rgba(0,0,0,1)]">
                    <path d={tearPath} fill="white" stroke="black" strokeWidth="12" />
                </svg>
            </div>
        </motion.div>

        {/* BOTTOM HALF */}
        <motion.div 
            style={{ y: bottomY, rotate: bottomRotate, opacity: paperOpacity, originX: 1, originY: 0 }}
            className="absolute bottom-0 left-0 w-full h-[55%] z-20"
        >
            <div className="w-full h-full bg-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px] opacity-[0.05]" />
                <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="absolute -top-[2px] left-0 w-full h-[80px] md:h-[120px] rotate-180 drop-shadow-[0_-15px_0_rgba(0,0,0,1)]">
                    <path d={tearPath} fill="white" stroke="black" strokeWidth="12" />
                </svg>
            </div>
        </motion.div>

        {/* Center Text */}
        <motion.div 
            style={{ 
                opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 1, 0]), 
                scale: useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1.2]),
                rotate: useTransform(scrollYProgress, [0.1, 0.4], [-5, 2])
            }}
            className="absolute inset-0 flex items-center justify-center z-30"
        >
            <div className="px-12 py-5 bg-black border-[5px] border-white text-white font-black text-4xl md:text-7xl uppercase tracking-tighter shadow-[12px_12px_0_0,#FFE234]" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                ENGINE_ROOM: UNLOCKED
            </div>
        </motion.div>

      </div>
    </div>
  );
}
