"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PaperTearTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Top paper slides UP, Bottom slides DOWN
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Rotating the pieces slightly as they tear for organic feel
  const topRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const bottomRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Jagged SVG Path for the "Rip"
  const tearPath = "M0 0H1440V60L1410 75L1380 50L1350 90L1320 65L1290 100L1260 70L1230 110L1200 80L1170 105L1140 70L1110 95L1080 60L1050 85L1020 55L990 100L960 70L930 115L900 80L870 105L840 65L810 95L780 60L750 90L720 70L690 105L660 80L630 100L600 70L570 95L540 65L510 110L480 80L450 105L420 75L390 100L360 70L330 95L300 60L270 90L240 70L210 105L180 80L150 100L120 70L90 95L60 65L30 105L0 70V0Z";

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-transparent z-40 pointer-events-none">
      {/* Sticky wrapper that mimics GSAP pinning without the DOM-moving bug */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pointer-events-none">
        
        {/* TOP HALF */}
        <motion.div 
            style={{ y: topY, rotate: topRotate, originX: 0, originY: 1 }}
            className="absolute top-0 left-0 w-full h-[55%] z-20 flex flex-col justify-end"
        >
            <div className="w-full h-full bg-white relative">
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px] opacity-[0.05]" />
                
                {/* Jagged Bottom Edge */}
                <svg 
                    viewBox="0 0 1440 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                    className="absolute -bottom-[2px] left-0 w-full h-[80px] drop-shadow-[0_10px_0_rgba(0,0,0,1)]"
                >
                    <path d={tearPath} fill="white" stroke="black" strokeWidth="10" />
                </svg>
            </div>
        </motion.div>

        {/* BOTTOM HALF */}
        <motion.div 
            style={{ y: bottomY, rotate: bottomRotate, originX: 1, originY: 0 }}
            className="absolute bottom-0 left-0 w-full h-[55%] z-20 flex flex-col justify-start"
        >
            <div className="w-full h-full bg-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px] opacity-[0.05]" />
                
                {/* Jagged Top Edge (Inverted) */}
                <svg 
                    viewBox="0 0 1440 120" 
                    fill="none" 
                    preserveAspectRatio="none"
                    className="absolute -top-[2px] left-0 w-full h-[80px] rotate-180 drop-shadow-[0_-10px_0_rgba(0,0,0,1)]"
                >
                    <path d={tearPath} fill="white" stroke="black" strokeWidth="10" />
                </svg>
            </div>
        </motion.div>

        {/* Dynamic Center Text (Appears during the rip) */}
        <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]), scale: useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]) }}
            className="absolute inset-0 flex items-center justify-center z-10"
        >
            <div className="px-10 py-4 bg-black border-[4px] border-white text-white font-black text-4xl md:text-6xl uppercase tracking-tighter -rotate-3 shadow-[15px_15px_0_0_#FFE234]">
                ENGINE_ROOM_01
            </div>
        </motion.div>

      </div>
    </div>
  );
}
