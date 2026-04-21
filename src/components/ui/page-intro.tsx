"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["A", "B", "H", "I", "N", "A", "Y"];
const LETTER_COLORS = ["#FF3CAC", "#00E5FF", "#39FF14", "#BF5AF2", "#FF6B00", "#FFE234", "#FF3CAC"];

const DECORATIONS = [
  { emoji: "⚡", style: { top: "12%", left: "8%" },   rotate: -20, delay: 0.8,  size: "text-5xl lg:text-7xl" },
  { emoji: "✦",  style: { top: "18%", right: "10%" }, rotate:  15, delay: 1.0,  size: "text-4xl lg:text-6xl" },
  { emoji: "🎯", style: { bottom: "20%", left: "6%" },  rotate: -10, delay: 1.2,  size: "text-4xl lg:text-6xl" },
  { emoji: "🚀", style: { bottom: "14%", right: "8%" }, rotate:  25, delay: 0.9,  size: "text-5xl lg:text-7xl" },
  { emoji: "★",  style: { top: "40%", left: "3%" },   rotate: -5,  delay: 1.3,  size: "text-3xl lg:text-5xl" },
  { emoji: "★",  style: { top: "35%", right: "4%" },  rotate:  12, delay: 1.1,  size: "text-3xl lg:text-5xl" },
];

const LOADING_TEXTS = [
  "BOOTING UP...",
  "LOADING VIBES...",
  "INITIATING CHAOS...",
  "ALMOST THERE...",
  "LET'S GOOO 🚀",
];

export default function PageIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-initialization in React Strict Mode (dev)
    if (initialized.current) return;
    initialized.current = true;

    // Progress bar animation - fills over ~5 seconds
    const barInterval = setInterval(() => {
      setBarWidth(prev => {
        if (prev >= 100) { clearInterval(barInterval); return 100; }
        return prev + 1.2;
      });
    }, 60);

    // Cycle loading texts
    const textInterval = setInterval(() => {
      setLoadingIdx(prev => (prev + 1) % LOADING_TEXTS.length);
    }, 900);

    // Exit after 5.5s — long enough to read everything
    const exitTimer = setTimeout(() => {
      clearInterval(barInterval);
      clearInterval(textInterval);
      setBarWidth(100);
      setPhase("exit");
    }, 5500);

    return () => {
      clearInterval(barInterval);
      clearInterval(textInterval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase === "exit") {
      const doneTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 900);
      return () => clearTimeout(doneTimer);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const isExiting = phase === "exit";

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">

      {/* TOP PANEL */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#FFE234] origin-top overflow-hidden"
        style={{ willChange: "transform" }}
        animate={isExiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0 : 0 }}
      >
        {/* Halftone dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[length:24px_24px] opacity-[0.08]" />
        {/* Top border stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-[12px] bg-black" />
      </motion.div>

      {/* BOTTOM PANEL */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[#FFE234] origin-bottom overflow-hidden"
        style={{ willChange: "transform" }}
        animate={isExiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0 : 0 }}
      >
        {/* Halftone dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[length:24px_24px] opacity-[0.08]" />
        {/* Top border stripe */}
        <div className="absolute top-0 left-0 right-0 h-[12px] bg-black" />

        {/* ── LOADING BAR ── (lives in bottom half) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[280px] lg:w-[380px] flex flex-col items-center gap-4">
          {/* Loading text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="font-black uppercase tracking-widest text-black text-sm"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {LOADING_TEXTS[loadingIdx]}
            </motion.p>
          </AnimatePresence>
          {/* Chunky progress bar container */}
          <div className="w-full h-7 bg-white border-[5px] border-black rounded-full shadow-[6px_6px_0_0_#000] overflow-hidden">
            <motion.div
              className="h-full bg-black rounded-full origin-left"
              style={{ width: `${barWidth}%` }}
              transition={{ ease: "linear" }}
            >
              {/* Stripes on the bar */}
              <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_16px)]" />
            </motion.div>
          </div>
          <p className="font-mono font-black text-black/50 text-xs tracking-widest">{Math.round(barWidth)}%</p>
        </div>
      </motion.div>

      {/* ── CENTER CONTENT (letters + tagline + decorations) ── */}
      {!isExiting && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 pointer-events-none">

          {/* Floating Cartoon Decorations */}
          {DECORATIONS.map((d, i) => (
            <motion.div
              key={i}
              className={`absolute ${d.size} select-none`}
              style={d.style}
              initial={{ opacity: 0, scale: 0, rotate: d.rotate * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: d.rotate }}
              transition={{ delay: d.delay, type: "spring", stiffness: 400, damping: 12 }}
            >
              {d.emoji}
            </motion.div>
          ))}

          {/* ── NAME LETTERS (giant, staggered drop-in) ── */}
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            {LETTERS.map((letter, i) => (
              <motion.div
                key={i}
                className="relative w-14 h-14 lg:w-24 lg:h-24 flex items-center justify-center rounded-2xl border-[5px] lg:border-[7px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] lg:shadow-[10px_10px_0_0_rgba(0,0,0,1)]"
                style={{ backgroundColor: LETTER_COLORS[i], willChange: "transform, opacity" }}
                initial={{ y: -300, opacity: 0, rotate: (i % 2 === 0 ? -15 : 15) }}
                animate={{ y: 0, opacity: 1, rotate: (i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1) }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                }}
              >
                <span
                  className="text-3xl lg:text-5xl font-black text-black leading-none select-none"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {letter}
                </span>
              </motion.div>
            ))}
          </div>

          {/* ── TAGLINE ── */}
          <motion.div
            className="bg-black text-[#FFE234] px-8 py-3 rounded-2xl border-[5px] border-black shadow-[8px_8px_0_0_rgba(255,255,255,0.3)] rotate-[-1deg]"
            initial={{ opacity: 0, x: -80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 280, damping: 18 }}
          >
            <span
              className="text-base lg:text-xl font-black uppercase tracking-widest whitespace-nowrap"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              DEVELOPER. DESIGNER. VIBE-CODER.
            </span>
          </motion.div>

        </div>
      )}

    </div>
  );
}
