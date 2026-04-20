"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    text: "Abhinay's attention to design detail is unlike most developers I've worked with. He ships fast and the output is polished from day one.",
    name: "Sarah Mitchell",
    role: "Product Manager, TechVentures",
    avatar: "SM",
    color: "#3b82f6",
  },
  {
    text: "We hired Abhinay to revamp our business website and the conversion rate went up 40%. He understood both design and business goals clearly.",
    name: "Rohan Mehta",
    role: "CEO, LocalBiz Solutions",
    avatar: "RM",
    color: "#8b5cf6",
  },
  {
    text: "The billing SaaS he built for us handles 50+ daily transactions without a hitch. Rock-solid code and great communication throughout.",
    name: "Priya Sharma",
    role: "Owner, MultiShop Retail",
    avatar: "PS",
    color: "#06b6d4",
  },
];

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="p-8 rounded-2xl relative overflow-hidden group h-full"
      style={{
        background: "rgba(13,13,20,0.9)",
        border: `1px solid rgba(255,255,255,0.06)`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top, ${t.color}12, transparent)` }}
      />
      {/* Top line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}80, transparent)` }}
      />

      {/* Quote icon */}
      <div
        className="text-5xl font-black leading-none mb-4 opacity-25"
        style={{ color: t.color }}
      >
        "
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--text-secondary)" }}>
        {t.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${t.color}80, ${t.color})` }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif" }}>
            {t.name}
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
            {t.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #a78bfa, transparent)" }} />
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--purple-light)" }}>
            Testimonials
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          What People{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Say
          </span>
        </motion.h2>
        <p className="text-base mb-16 max-w-xl" style={{ color: "var(--text-muted)" }}>
          Trust signals from clients and collaborators who've seen the work up close.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
