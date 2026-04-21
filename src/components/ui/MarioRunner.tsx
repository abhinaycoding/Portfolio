"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MarioRunner() {
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  // Mario Frame labels (using 8-bit style emoji or characters if assets aren't available)
  // For a "Creative" solution, I'll use a stylized pixel-art Mario build from boxes or a CSS sprite.
  
  return (
    <div className="relative w-full h-12 overflow-hidden pointer-events-none">
      {/* The "Caution Tape" Track */}
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-[repeating-linear-gradient(90deg,#000,#000_20px,#FFE234_20px,#FFE234_40px)] shadow-[0_4px_0_0_rgba(0,0,0,0.2)]" />
      
      <motion.div
        animate={{ 
          x: ["-10%", "110%"],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute bottom-1 w-12 h-12 z-20 flex items-center justify-center text-4xl select-none"
      >
        <motion.div
            animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ 
                duration: 0.4, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
        >
            🏃‍♂️
        </motion.div>
        
        {/* Cartoon "Speed Dust" Stickers */}
        <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [0, -20] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -left-4 bottom-2 text-white/40 text-xs"
        >
            💨
        </motion.div>
      </motion.div>
    </div>
  );
}
