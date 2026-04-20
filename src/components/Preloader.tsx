"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 18) + 5;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => setVisible(false), 900);
      }
      setProgress(count);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader flex-col gap-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{ background: "var(--bg-primary)", zIndex: 9999 }}
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 text-center"
          >
            <div
              className="text-5xl font-black tracking-tight mb-2"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: "linear-gradient(135deg, #60a5fa, #818cf8, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Abhinay
            </div>
            <div className="text-sm tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
              Portfolio
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative z-10 w-64"
          >
            <div className="flex justify-between mb-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>Loading</span>
              <span>{progress}%</span>
            </div>
            <div
              className="h-px rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #2563eb, #8b5cf6)",
                  boxShadow: "0 0 12px rgba(139, 92, 246, 0.8)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Done tick */}
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-10 text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              ✦ Ready
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
