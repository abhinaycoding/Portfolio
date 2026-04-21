"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Atom, 
  Triangle, 
  DraftingCompass, 
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
  Layers,
  Globe,
  Link,
  RotateCcw,
  Smartphone,
  Star
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STACK = [
  {
    category: "FRONTEND", color: "bg-[#00E5FF]",
    items: [
      { name: "React", icon: Atom, proficiency: 95, featured: true, description: "Component-driven UI architecture & state management." },
      { name: "Next.js", icon: Triangle, proficiency: 92, featured: false },
      { name: "JavaScript", icon: Code2, proficiency: 94, featured: false },
      { name: "TypeScript", icon: ShieldCheck, proficiency: 88, featured: false },
      { name: "Tailwind CSS", icon: Wind, proficiency: 95, featured: false },
      { name: "Responsive UI", icon: Smartphone, proficiency: 96, featured: true, description: "Fluid, mobile-first design systems across all devices." },
      { name: "Animations", icon: Zap, proficiency: 90, featured: false },
      { name: "GSAP", icon: DraftingCompass, proficiency: 85, featured: false },
    ],
  },
  {
    category: "PRODUCT & INTEGRATION", color: "bg-[#FF3CAC]",
    items: [
      { name: "Firebase Auth", icon: ShieldCheck, proficiency: 90, featured: true, description: "Secure user authentication & session management." },
      { name: "Firestore", icon: Database, proficiency: 88, featured: false },
      { name: "API Integration", icon: Link, proficiency: 92, featured: false },
      { name: "Payment Flows", icon: CreditCard, proficiency: 85, featured: false },
      { name: "AI Workflows", icon: Zap, proficiency: 82, featured: true, description: "Automated AI toolchains & intelligent feature integration." },
      { name: "SaaS Features", icon: Box, proficiency: 88, featured: false },
      { name: "Iteration", icon: RotateCcw, proficiency: 90, featured: false },
    ],
  },
  {
    category: "TOOLS", color: "bg-[#39FF14]",
    items: [
      { name: "GitHub", icon: Code2, proficiency: 92, featured: true, description: "Advanced version control & collaborative workflows." },
      { name: "Vercel", icon: Globe, proficiency: 95, featured: false },
      { name: "AI Dev", icon: Zap, proficiency: 90, featured: false },
    ],
  },
];

const FLOATING_STICKERS = [
  { icon: Zap, color: "bg-[#FFE234]", rotate: 15, top: "10%", left: "5%" },
  { icon: Star, color: "bg-[#FF3CAC]", rotate: -15, top: "20%", left: "85%" },
  { icon: Smartphone, color: "bg-[#00E5FF]", rotate: 10, top: "80%", left: "12%" },
  { icon: Box, color: "bg-[#39FF14]", rotate: -10, top: "65%", left: "90%" },
  { icon: Zap, color: "bg-[#FF6B00]", rotate: 20, top: "45%", left: "3%" },
  { icon: Flame, color: "bg-[#FFE234]", rotate: -5, top: "15%", left: "45%" },
];

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

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="skills" ref={sectionRef} className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-transparent px-6 font-['Nunito',sans-serif]">

      {/* ── Torn Paper Transition ── */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none -translate-y-[1px]">
        <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            preserveAspectRatio="none"
            className="w-full h-[60px] md:h-[100px] drop-shadow-[0_10px_0_rgba(0,0,0,1)]"
        >
          <path 
            d="M0 0H1440V60L1410 75L1380 50L1350 90L1320 65L1290 100L1260 70L1230 110L1200 80L1170 105L1140 70L1110 95L1080 60L1050 85L1020 55L990 100L960 70L930 115L900 80L870 105L840 65L810 95L780 60L750 90L720 70L690 105L660 80L630 100L600 70L570 95L540 65L510 110L480 80L450 105L420 75L390 100L360 70L330 95L300 60L270 90L240 70L210 105L180 80L150 100L120 70L90 95L60 65L30 105L0 70V0Z" 
            fill="white" 
            stroke="black" 
            strokeWidth="8"
          />
          {/* Paper Texture Overlay */}
          <rect width="1440" height="120" fill="url(#halftone-small)" opacity="0.1" />
          <defs>
            <pattern id="halftone-small" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="black" />
            </pattern>
          </defs>
        </svg>
      </div>

      {/* Floating Industrial Stickers */}
      {hasMounted && FLOATING_STICKERS.map((s, i) => (
          <FloatingSticker key={i} sticker={s} i={i} scrollYProgress={scrollYProgress} />
      ))}

      {/* Background grid + vibrant shapes - BOOSTED */}
      <div className="absolute inset-0 spotlight-grid opacity-30" />
      <div className="absolute w-[800px] h-[800px] bg-[#FFE234]/[0.35] rounded-full blur-[180px] pointer-events-none top-[-10%] left-[-20%] z-0" />
      <div className="absolute w-[600px] h-[600px] bg-[#39FF14]/[0.25] rounded-full blur-[150px] pointer-events-none bottom-[-5%] right-[-15%] z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* ── Header ── */}
        <div className="mb-20">
          <div className="w-fit px-6 py-2 bg-[#FF3CAC] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-1 mb-10 whitespace-nowrap">
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

            {/* Tabs - Funny Buttons */}
            <div className="flex flex-wrap gap-5">
              {STACK.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                  whileTap={{ scale: 0.95, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`relative notch-card px-8 lg:px-16 py-4 lg:py-10 text-sm lg:text-3xl font-black tracking-widest uppercase border-[5px] lg:border-[8px] border-black shadow-[8px_8px_0_0_#000] lg:shadow-[14px_14px_0_0_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-colors group ${
                    activeCategory === i
                      ? s.color + " text-black"
                      : "bg-white text-black"
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {/* Subtle Halftone Overlay on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:6px_6px]" />
                  
                  <span className="relative z-10">{s.category}</span>
                </motion.button>
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
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
        className={`skill-item group relative border-[4px] border-black shadow-[10px_10px_0_0_#000] bg-white rounded-[2rem] overflow-visible transition-shadow duration-300 ${
          isFeatured ? "lg:col-span-3 md:col-span-2 p-6 md:p-10" : "lg:col-span-2 p-5 md:p-8"
        }`}
    >
        {/* ── Floating 'LEVEL' Sticker ── */}
        <motion.div 
            style={{ 
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
                rotate: 15
            }}
            className={`absolute -top-4 -right-4 z-30 px-3 py-1 ${activeColor} border-[3px] border-black rounded-lg shadow-[4px_4px_0_0_#000] flex items-center justify-center font-black text-black text-[9px] scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none`}
        >
            {skill.proficiency > 90 ? "EXPERT" : "PRO"}
        </motion.div>

        {/* Decorative Rivets */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-black/10 rounded-full z-40 border-[1px] border-black/20" />
        <div className="absolute top-4 right-10 w-2 h-2 bg-black/10 rounded-full z-40 border-[1px] border-black/20" />

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-bg" />
        
        {/* ── Holographic Shine ── */}
        <motion.div 
            style={{ 
                left: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"]),
                top: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "150%"]),
                background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" 
            }}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20"
        />

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
                <p className="text-black/60 font-bold leading-relaxed mb-8 max-w-[280px]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    &quot;{skill.description}&quot;
                </p>
            )}

            <div className="mt-auto">
                <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em]">Sensor Data</span>
                    <span className="text-[10px] font-black text-black uppercase">{skill.proficiency}%</span>
                </div>
                {/* Progress bar container (Physical Gauge Style) */}
                <div className="relative h-5 bg-black/10 border-[4px] border-black rounded-xl overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "backOut" }}
                        viewport={{ once: true }}
                        className={`absolute inset-0 ${activeColor} border-r-[4px] border-black`}
                    />
                    {/* Gauge Marks */}
                    <div className="absolute inset-0 opacity-20 flex justify-around items-center px-1 pointer-events-none">
                        {[...Array(10)].map((_, idx) => (
                            <div key={idx} className="w-0.5 h-2 bg-black/40 rounded-full" />
                        ))}
                    </div>
                    {/* Glass Shine */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 pointer-events-none" />
                </div>
            </div>
        </div>
    </motion.div>
  );
}

function FloatingSticker({ sticker, i, scrollYProgress }: { sticker: any; i: number; scrollYProgress: any }) {
  const Icon = sticker.icon;
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50 * (i + 1)]);

  return (
    <motion.div
      style={{
        top: sticker.top,
        left: sticker.left,
        y: yTransform
      }}
      animate={{
        rotate: [sticker.rotate, sticker.rotate + 10, sticker.rotate],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
      className="absolute pointer-events-none select-none z-0 hidden lg:block"
    >
      <div className={`relative w-16 h-16 ${sticker.color} border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000] flex items-center justify-center`}>
        <Icon size={32} className="text-black" strokeWidth={3} />
        {/* Sticker "Peel" reflect */}
        <div className="absolute top-1 left-1 w-4 h-1.5 bg-white/40 rounded-full rotate-[-45deg]" />
      </div>
    </motion.div>
  );
}
