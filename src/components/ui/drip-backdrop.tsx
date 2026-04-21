"use client";
import React from "react";
import { motion } from "framer-motion";

const DRIP_COLORS = [
  "#FF3CAC", "#FFE234", "#00E5FF", "#39FF14", 
  "#FF9A8B", "#7C3AED", "#2563EB", "#F59E0B",
];

export const DripBackdrop = () => {
  const [drips, setDrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Responsive Scaling: Fewer drips on mobile to preserve frame rate
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 12 : 30; 
    
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      width: Math.random() * 40 + 60,
      left: (i / count) * 100 + "%",
      height: Math.random() * 60 + 20 + "%",
      color: DRIP_COLORS[i % DRIP_COLORS.length],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
    }));
    setDrips(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050505] transform-gpu">
      {/* Central Visibility Pocket (Vignette) - High Efficiency CSS */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0)_0%,rgba(5,5,5,0.4)_40%,rgba(5,5,5,0.8)_100%)]" />
      
      {/* Optimized Blur Layer */}
      <div className="relative w-full h-full backdrop-blur-[1px]">
        {drips.map((drip) => (
          <motion.div
            key={`blur-${drip.id}`}
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "160%"] }}
            transition={{
              duration: drip.duration,
              repeat: Infinity,
              ease: "linear",
              delay: drip.delay,
            }}
            className="absolute rounded-b-full transform-gpu"
            style={{
              left: drip.left,
              width: drip.width,
              height: drip.height,
              backgroundColor: drip.color,
              opacity: 0.35,
              willChange: "transform",
            }}
          />
        ))}
        
        {/* Secondary layer (Fewer elements on secondary layer for performance) */}
        {drips.slice(0, 10).map((drip, i) => (
          <motion.div
            key={`solid-${i}`}
            initial={{ y: "-100%" }}
            animate={{ y: ["-100%", "180%"] }}
            transition={{
              duration: drip.duration + 2,
              repeat: Infinity,
              ease: "linear",
              delay: drip.delay + 1,
            }}
            className="absolute rounded-b-full transform-gpu"
            style={{
              left: `calc(${drip.left} + 10px)`,
              width: drip.width / 2,
              height: drip.height,
              backgroundColor: drip.color,
              opacity: 0.2,
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
};
