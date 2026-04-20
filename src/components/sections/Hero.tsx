"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const subtitles = [
  "Frontend Engineer",
  "Full-Stack Builder",
  "AI Product Developer",
];

function RotatingSubtitle() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % subtitles.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-8 overflow-hidden relative">
      <motion.div
        key={idx}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="font-semibold tracking-wide text-lg md:text-xl"
        style={{ color: "var(--blue-light)" }}
      >
        {subtitles[idx]}
      </motion.div>
    </div>
  );
}

// Animated background grid (no video, pure CSS)
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 70%, rgba(6,182,212,0.08) 0%, transparent 60%),
            #050508
          `,
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Animated orbs */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: "10%",
          left: "60%",
          background: "radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: "10%",
          left: "20%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("mousemove", handle);
    return () => document.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

const letterVariants: any = {
  hidden: { opacity: 0, y: 60, skewY: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { delay: 2.8 + i * 0.07, duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function Hero() {
  const name = "Abhinay";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CinematicBackground />
      <MouseGlow />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
          style={{
            background: "rgba(37, 99, 235, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            color: "var(--blue-light)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <h1
            className="font-black leading-none tracking-tighter select-none flex flex-wrap justify-center"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(5rem, 16vw, 14rem)",
            }}
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #f1f5f9 30%, #94a3b8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none",
                  filter: "drop-shadow(0 0 30px rgba(99,102,241,0.2))",
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Rotating subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="mb-6"
        >
          <RotatingSubtitle />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.7 }}
          className="text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          style={{ color: "var(--text-secondary)" }}
        >
          I build{" "}
          <span style={{ color: "var(--blue-light)" }}>polished products</span>,
          scalable web apps, and interfaces{" "}
          <span style={{ color: "var(--purple-light)" }}>users remember</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.9, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full font-semibold text-white relative overflow-hidden group"
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            download
            className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 group"
            style={{
              background: "rgba(17,17,32,0.8)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "var(--text-primary)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12"
            style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.8), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
