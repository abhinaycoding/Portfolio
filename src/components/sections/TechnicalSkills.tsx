"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Atom, 
  Triangle, 
  DraftingCompass, 
  Palette, 
  Wind, 
  Zap, 
  Boxes, 
  Server, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Flame, 
  Box, 
  CreditCard,
  Code2,
  Terminal,
  Cpu as Processor,
  Layers
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STACK = [
  {
    category: "Frontend", color: "bg-[#00E5FF]",
    items: [
      { name: "React", icon: Atom, proficiency: 95, featured: true, description: "Declarative, component-based UI engineering." },
      { name: "Next.js", icon: Triangle, proficiency: 92, featured: false },
      { name: "TypeScript", icon: Code2, proficiency: 90, featured: false },
      { name: "Tailwind", icon: Wind, proficiency: 95, featured: false },
      { name: "Framer Motion", icon: Zap, proficiency: 88, featured: false },
      { name: "GSAP", icon: DraftingCompass, proficiency: 85, featured: false },
      { name: "Three.js", icon: Boxes, proficiency: 75, featured: true, description: "High-performance 3D web experiences." },
    ],
  },
  {
    category: "Backend", color: "bg-[#FF3CAC]",
    items: [
      { name: "Node.js", icon: Server, proficiency: 88, featured: true, description: "Scalable server-side runtime for high-load apps." },
      { name: "Express", icon: Terminal, proficiency: 90, featured: false },
      { name: "Prisma", icon: Layers, proficiency: 85, featured: false },
      { name: "GraphQL", icon: Cpu, proficiency: 80, featured: false },
      { name: "Auth / JWT", icon: ShieldCheck, proficiency: 88, featured: false },
    ],
  },
  {
    category: "Database & Infrastructure", color: "bg-[#39FF14]",
    items: [
      { name: "PostgreSQL", icon: Database, proficiency: 85, featured: true, description: "Relational data modeling & optimization." },
      { name: "Redis", icon: Zap, proficiency: 78, featured: false },
      { name: "Firebase", icon: Flame, proficiency: 88, featured: false },
      { name: "Docker", icon: Box, proficiency: 75, featured: false },
      { name: "Stripe", icon: CreditCard, proficiency: 85, featured: false },
    ],
  },
];

const FLOATING_SYMBOLS = ["{ }", "const", "=>", "( )", "< />", "01", "if", "[]", "&&"];

export default function TechnicalSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const ctx = gsap.context(() => {
      gsap.from(".skill-item", {
        scrollTrigger: { trigger: ".skill-grid", start: "top 82%" },
        y: 40, opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.6, ease: "back.out(1.5)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 md:py-48 lg:py-56 overflow-hidden">

      {/* ── Section separator ── */}
      <div className="pop-divider absolute top-0 left-0 right-0 opacity-10" />

      {/* Floating Symbols Atmosphere */}
      {hasMounted && FLOATING_SYMBOLS.map((s, i) => (
        <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ 
                y: ["-20px", "20px"], 
                rotate: [0, 10, 0],
                opacity: [0.03, 0.08, 0.03] 
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            className="absolute font-mono font-black text-4xl text-white pointer-events-none select-none z-0"
        >
            {s}
        </motion.div>
      ))}

      {/* Background grid + vibrant shapes - BOOSTED */}
      <div className="absolute inset-0 spotlight-grid opacity-30" />
      <div className="absolute w-[800px] h-[800px] bg-[#FFE234]/[0.35] rounded-full blur-[180px] pointer-events-none top-[-10%] left-[-20%] z-0" />
      <div className="absolute w-[600px] h-[600px] bg-[#39FF14]/[0.25] rounded-full blur-[150px] pointer-events-none bottom-[-5%] right-[-15%] z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* ── Header ── */}
        <div className="mb-20">
          <div className="w-fit px-6 py-2 bg-[#FF3CAC] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-1 mb-10">
            <span className="text-sm font-black tracking-[0.2em] uppercase text-black block">
              TECH STACK 🧠
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="space-y-1">
              {["The engine", "room."].map((line, i) => (
                <div key={i} className="mask-line overflow-hidden">
                  <motion.h2
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl lg:text-[5.5rem] font-black leading-[0.9] tracking-tight uppercase"
                    style={{ 
                      fontFamily: "'Fredoka', sans-serif",
                      WebkitTextStroke: "2px white",
                      textShadow: "8px 8px 0 black"
                    }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3">
              {STACK.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className={`px-8 py-4 text-xs font-black tracking-widest uppercase rounded-2xl border-[4px] border-black shadow-[6px_6px_0_0_#000] transition-all hover:scale-105 active:scale-95 ${
                    activeCategory === i
                      ? s.color + " text-black"
                      : "bg-white text-black"
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {s.category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bento Skills Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="skill-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
          >
            {STACK[activeCategory].items.map((skill, i) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                i={i} 
                activeColor={STACK[activeCategory].color} 
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Principles ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-10 border-t-[4px] border-black flex flex-wrap gap-6"
        >
          {["Type-Safe", "Performance-First", "Clean Architecture", "Ship Fast"].map((p, i) => (
            <div 
                key={i} 
                className="px-6 py-3 bg-black border-[3px] border-white/20 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest shadow-[6px_6px_0_0_#FFE234] hover:shadow-[8px_8px_0_0_#FFE234] transition-all rotate-[1deg] hover:rotate-0"
            >
              {p}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, i, activeColor }: { skill: any; i: number; activeColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });

  function handleMouseMove(event: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  };

  const Icon = skill.icon;
  const isFeatured = skill.featured;

  return (
    <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className={`skill-item group relative border-[4px] border-black shadow-[10px_10px_0_0_#000] bg-white rounded-[2rem] overflow-hidden ${
          isFeatured ? "lg:col-span-3 md:col-span-2 p-10" : "lg:col-span-2 p-8"
        }`}
    >
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-bg" />
        
        {/* Hover Highlight (Sticker style) */}
        <div className="absolute top-4 left-6 w-16 h-4 bg-black/5 rounded-full rotate-[-4deg] opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl border-[3px] border-black shadow-[5px_5px_0_0_#000] transition-transform group-hover:scale-110 group-hover:rotate-6 bg-[#FFE234]`}>
                        <Icon size={28} strokeWidth={2.5} className="text-black" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-black tracking-tight" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            {skill.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                            <span className="text-[10px] font-black uppercase text-black/40 tracking-widest">{skill.proficiency}% PROFICIENCY</span>
                        </div>
                    </div>
                </div>
            </div>

            {isFeatured && skill.description && (
                <p className="text-black/60 font-medium leading-relaxed mb-8 max-w-[280px]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {skill.description}
                </p>
            )}

            <div className="mt-auto">
                {/* Progress bar container */}
                <div className="relative h-4 bg-black/10 border-[3px] border-black rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "backOut" }}
                        viewport={{ once: true }}
                        className={`absolute inset-0 ${activeColor} border-r-[3px] border-black`}
                    />
                    {/* Stripes */}
                    <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,1)_8px,rgba(0,0,0,1)_16px)]" />
                </div>
            </div>
        </div>

        {/* 3D Reflection Spot */}
        <motion.div 
            style={{ 
                x: useTransform(x, [-0.5, 0.5], [-100, 100]), 
                y: useTransform(y, [-0.5, 0.5], [-100, 100]) 
            }}
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
        />
    </motion.div>
  );
}
