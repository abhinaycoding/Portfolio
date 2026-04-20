"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "2021",
    title: "Started Coding",
    desc: "Discovered the power of code. Fell in love with building things on the web.",
    icon: "🚀",
    color: "#3b82f6",
  },
  {
    year: "2022",
    title: "Built Real Projects",
    desc: "Shipped first production apps. Moved from tutorials to actual solving of real-world problems.",
    icon: "⚡",
    color: "#8b5cf6",
  },
  {
    year: "2023",
    title: "Freelance Experience",
    desc: "Delivered client projects end-to-end. Learned to understand business needs, not just code.",
    icon: "💼",
    color: "#06b6d4",
  },
  {
    year: "2024",
    title: "Full-Stack & AI",
    desc: "Expanded into backend and AI product development. Built billing SaaS and automation systems.",
    icon: "🤖",
    color: "#a78bfa",
  },
  {
    year: "Now",
    title: "Ready to Scale",
    desc: "Actively looking to join a great team and build products that matter at scale.",
    icon: "🎯",
    color: "#34d399",
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="timeline" className="section-padding relative" ref={ref}>
      {/* BG glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #06b6d4, transparent)" }} />
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#22d3ee" }}>
            Journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-16"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          The{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Road So Far
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />
          <motion.div
            className="absolute left-6 top-0 w-px"
            initial={{ height: "0%" }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            style={{ background: "linear-gradient(180deg, #3b82f6, #8b5cf6, #06b6d4, #34d399)" }}
          />

          <div className="space-y-12 pl-20">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="relative group"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 300 }}
                  className="absolute -left-[3.5rem] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: m.color,
                    background: "var(--bg-primary)",
                    boxShadow: `0 0 12px ${m.color}80`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                </motion.div>

                {/* Card */}
                <div
                  className="p-6 rounded-2xl relative overflow-hidden group-hover:border-opacity-60 transition-all duration-300"
                  style={{
                    background: "rgba(13,13,20,0.8)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at left, ${m.color}10, transparent)` }}
                  />

                  <div className="flex items-start gap-4 relative">
                    <span className="text-2xl mt-1">{m.icon}</span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                          style={{ background: `${m.color}20`, color: m.color }}
                        >
                          {m.year}
                        </span>
                        <h3
                          className="text-base font-bold"
                          style={{ color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif" }}
                        >
                          {m.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
