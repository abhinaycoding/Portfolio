"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    label: "Frontend",
    color: "blue",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind CSS", icon: "💨" },
      { name: "Framer Motion", icon: "🎞" },
      { name: "GSAP", icon: "⚡" },
    ],
  },
  {
    label: "Backend & DB",
    color: "purple",
    skills: [
      { name: "Firebase", icon: "🔥" },
      { name: "Node.js", icon: "🟢" },
      { name: "REST APIs", icon: "🔌" },
      { name: "PostgreSQL", icon: "🐘" },
    ],
  },
  {
    label: "Tools & Design",
    color: "cyan",
    skills: [
      { name: "GitHub", icon: "🐙" },
      { name: "Figma", icon: "🎨" },
      { name: "Vercel", icon: "▲" },
      { name: "VS Code", icon: "💙" },
    ],
  },
];

const colorMap = {
  blue: { accent: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", text: "#60a5fa" },
  purple: { accent: "#8b5cf6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", text: "#a78bfa" },
  cyan: { accent: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)", text: "#22d3ee" },
};

// Marquee ticker row
const allSkills = [
  "React ⚛️", "Next.js ▲", "TypeScript", "Tailwind CSS 💨", "GSAP ⚡", "Framer Motion",
  "Firebase 🔥", "Node.js 🟢", "Figma 🎨", "Vercel ▲", "GitHub 🐙", "REST APIs 🔌",
  "React ⚛️", "Next.js ▲", "TypeScript", "Tailwind CSS 💨", "GSAP ⚡", "Framer Motion",
  "Firebase 🔥", "Node.js 🟢", "Figma 🎨", "Vercel ▲", "GitHub 🐙", "REST APIs 🔌",
];

function MarqueeTicker({ reverse = false, speed = "30s" }: { reverse?: boolean; speed?: string }) {
  return (
    <div className="relative overflow-hidden py-3">
      {/* Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--bg-primary), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, var(--bg-primary), transparent)" }} />

      <div
        className="flex gap-4 whitespace-nowrap"
        style={{
          animation: `marquee ${speed} linear infinite ${reverse ? "reverse" : ""}`,
          width: "max-content",
        }}
      >
        {allSkills.concat(allSkills).map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "rgba(17,17,32,0.8)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      {/* Section label */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #8b5cf6, transparent)" }} />
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--purple-light)" }}>
            Skills & Tools
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          My{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Toolkit
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-base mb-16 max-w-xl"
          style={{ color: "var(--text-muted)" }}
        >
          A curated stack of battle-tested tools I use to ship great products fast.
        </motion.p>
      </div>

      {/* Marquee rows */}
      <div className="mb-16 space-y-3">
        <MarqueeTicker speed="30s" />
        <MarqueeTicker reverse speed="40s" />
      </div>

      {/* Category cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {skillCategories.map((cat, i) => {
          const colors = colorMap[cat.color as keyof typeof colorMap];
          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl relative overflow-hidden group"
              style={{
                background: "rgba(13,13,20,0.8)",
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* Bg glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top, ${colors.bg}, transparent)` }}
              />

              <div
                className="text-xs tracking-widest uppercase font-bold mb-6"
                style={{ color: colors.text }}
              >
                {cat.label}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, x: 4 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl transition-colors duration-200"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <span className="text-base">{skill.icon}</span>
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
