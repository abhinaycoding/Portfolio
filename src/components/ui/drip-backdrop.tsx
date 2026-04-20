"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const DRIP_COLORS = [
  "#FF3CAC", // Pink
  "#FFE234", // Yellow
  "#00E5FF", // Cyan
  "#39FF14", // Green
  "#FF9A8B", // Peach
  "#7C3AED", // Purple
  "#2563EB", // Blue
  "#F59E0B", // Orange
];

export const DripBackdrop = () => {
  const [drips, setDrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Determine number of drips based on typical screen width
    const count = 30; 
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      width: Math.random() * 40 + 60, // Significantly broader: 60px to 100px
      left: (i / count) * 100 + "%",
      height: Math.random() * 60 + 20 + "%", // 20% to 80% height
      color: DRIP_COLORS[i % DRIP_COLORS.length],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
    }));
    setDrips(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050505]">
      {/* Central Visibility Pocket (Vignette) */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0)_0%,rgba(5,5,5,0.4)_40%,rgba(5,5,5,0.8)_100%)]" />
      <div className="relative w-full h-full blur-[2px]">
        {drips.map((drip) => (
          <motion.div
            key={drip.id}
            initial={{ y: "-100%" }}
            animate={{ 
              y: ["-100%", "160%"],
            }}
            transition={{
              duration: drip.duration,
              repeat: Infinity,
              ease: "linear",
              delay: drip.delay,
            }}
            className="absolute rounded-b-full"
            style={{
              left: drip.left,
              width: drip.width,
              height: drip.height,
              backgroundColor: drip.color,
              opacity: 0.35, // Significantly bolder
            }}
          />
        ))}
        
        {/* Secondary layer for more "pop" without blur */}
        {drips.slice(0, 15).map((drip, i) => (
          <motion.div
            key={`solid-${i}`}
            initial={{ y: "-100%" }}
            animate={{ 
              y: ["-100%", "180%"],
            }}
            transition={{
              duration: drip.duration + 2,
              repeat: Infinity,
              ease: "linear",
              delay: drip.delay + 1,
            }}
            className="absolute rounded-b-full"
            style={{
              left: `calc(${drip.left} + 10px)`,
              width: drip.width / 2,
              height: drip.height,
              backgroundColor: drip.color,
              opacity: 0.25, // More "pop"
            }}
          />
        ))}
      </div>
    </div>
  );
};
