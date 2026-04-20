"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
      {/* ─── Neural Grid ─── */}
      <div 
        className="absolute inset-0 spotlight-grid opacity-[0.2]" 
      />

      {/* ─── Scrolling Data Streams ─── */}
      <div className="absolute inset-0 opacity-[0.03]">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            className="absolute h-[1px] w-[50%] bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      {/* ─── Gaussian Atmosphere ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.01] blur-[150px] rounded-full" />
    </div>
  );
}
