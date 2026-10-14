"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, 
  Sparkles, 
  Zap, 
  Lightbulb, 
  Cpu, 
  Flame, 
  MapPin 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: "1.5+", unit: "YEARS", label: "Shipping Code", color: "text-[#FFE234]", dotBg: "bg-[#FFE234]" },
  { value: "15+", unit: "PROJECTS", label: "Shipped & Open Source", color: "text-[#00E5FF]", dotBg: "bg-[#00E5FF]" },
  { value: "3x", unit: "AWARDS", label: "Hackathons & Honors", color: "text-[#39FF14]", dotBg: "bg-[#39FF14]" },
  { value: "100%", unit: "CRAFT", label: "Focus & Performance", color: "text-[#FF3CAC]", dotBg: "bg-[#FF3CAC]" },
];

const WHAT_I_BRING = [
  { 
    title: "Modern Frontend", 
    desc: "Production development with React & Next.js", 
    icon: Code2, 
    bg: "bg-[#00E5FF]", 
    color: "text-black" 
  },
  { 
    title: "Creative UI & Motion", 
    desc: "Strong visual taste, interaction & dynamic UX", 
    icon: Sparkles, 
    bg: "bg-[#FF3CAC]", 
    color: "text-white" 
  },
  { 
    title: "Smooth Motion", 
    desc: "Fluid physics, GSAP & Framer Motion pipelines", 
    icon: Zap, 
    bg: "bg-[#39FF14]", 
    color: "text-black" 
  },
  { 
    title: "Product Thinking", 
    desc: "User-centric architecture & product engineering", 
    icon: Lightbulb, 
    bg: "bg-[#FFE234]", 
    color: "text-black" 
  },
  { 
    title: "Performance", 
    desc: "Sub-second loads, 60fps & clean architecture", 
    icon: Cpu, 
    bg: "bg-[#BF5AF2]", 
    color: "text-white" 
  },
  { 
    title: "Execution", 
    desc: "Rapid delivery, agile iteration & ownership", 
    icon: Flame, 
    bg: "bg-[#FF6B00]", 
    color: "text-white" 
  },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0.1, 0.9], [-15, 15]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bring-card", {
        scrollTrigger: { trigger: ".bring-grid", start: "top 85%" },
        y: 40, opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.7, ease: "power4.out",
      });
      gsap.from(".metric-card", {
        scrollTrigger: { trigger: ".metrics-row", start: "top 95%" },
        scale: 0.85, opacity: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.7)"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-[#050505]">

      {/* ── Background Elements ── */}
      <div className="absolute w-[900px] h-[900px] bg-[#00E5FF]/[0.15] rounded-full blur-[180px] pointer-events-none -top-60 -right-60 z-0" />
      <div className="absolute w-[700px] h-[700px] bg-[#FF3CAC]/[0.1] rounded-full blur-[180px] pointer-events-none -bottom-60 -left-60 z-0" />

      <div className="max-w-[1500px] mx-auto px-8 sm:px-12 md:px-14 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: PORTRAIT ── */}
          <div className="lg:col-span-5 relative flex justify-center xl:justify-center">
            <motion.div style={{ y: parallaxY }} className="sticky top-24 lg:top-28 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] xl:max-w-[420px]">
                <PortraitCard3D imageScale={imageScale} />
            </motion.div>
          </div>

          {/* ── RIGHT: NARRATIVE ── */}
          <div className="lg:col-span-7 flex flex-col gap-10 pt-1 lg:pt-2">
            
            {/* Header with Live Status & Location Badges */}
            <div>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-fit px-5 py-2 bg-[#FFE234] border-[3px] border-black rounded-full shadow-[5px_5px_0_0_#000] -rotate-1 whitespace-nowrap"
                    >
                        <span className="text-xs font-black tracking-[0.2em] uppercase text-black block">Who am I?</span>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#111] border-[3px] border-black rounded-full shadow-[5px_5px_0_0_#000] text-xs font-black tracking-wider text-white"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]" />
                        </span>
                        <span className="uppercase tracking-widest text-[11px] text-[#39FF14]">OPEN TO HIGH-IMPACT ROLES</span>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#111] border-[3px] border-black rounded-full shadow-[5px_5px_0_0_#000] text-xs font-black tracking-wider text-white/70"
                    >
                        <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span className="uppercase tracking-widest text-[11px]">INDIA • GLOBAL REMOTE</span>
                    </motion.div>
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase italic tracking-tighter" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    ABHINAY
                </h2>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-6 text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl font-['Nunito',sans-serif]">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    I’m a developer who enjoys <span className="text-white font-black italic underline decoration-[#00E5FF] decoration-4 underline-offset-4">modern product engineering</span>—building products that feel fresh, interactive, and visually memorable while staying clean under the hood.
                </motion.p>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    My focus is creating websites and apps that combine strong UI design, smooth animations, responsive performance, and real usability. I like experiences that look <span className="text-white font-black">premium</span>, feel fast, and keep users engaged.
                </motion.p>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Beyond visuals, I care about solid engineering, scalable structure, and turning ideas into products people actually use.
                </motion.p>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    I’m especially interested in the space where <span className="bg-[#39FF14] text-black px-2 py-0.5 font-bold italic">creativity meets code</span>—modern interfaces, product systems, and digital experiences that stand out.
                </motion.p>
            </div>

            {/* ─── WHAT I BRING MATRIX ─── */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.4em]">Core Capabilities & Craft</h3>
                  <span className="text-xs font-mono font-bold text-white/30 tracking-widest">06 SPECIALTIES</span>
                </div>
                <div className="bring-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WHAT_I_BRING.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="bring-card group relative">
                              <div className="absolute inset-0 bg-black notch-card translate-x-1 translate-y-1" />
                              <div className={`relative notch-card p-6 border-[3px] border-black h-full ${item.bg} ${item.color} flex flex-col justify-between transition-transform duration-200 group-hover:-translate-y-1`}>
                                  <div className="flex items-center justify-between mb-3">
                                      <h4 className="text-xl font-black uppercase leading-tight italic" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                        {item.title}
                                      </h4>
                                      <div className="w-10 h-10 rounded-xl bg-black/15 border-[2px] border-black/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                        <Icon className="w-5 h-5 text-current" />
                                      </div>
                                  </div>
                                  <p className="text-xs font-bold opacity-85 uppercase tracking-wider">{item.desc}</p>
                              </div>
                          </div>
                        );
                    })}
                </div>
            </div>

            {/* ─── CORE STATS (METRICS BENTO) ─── */}
            <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.4em]">Proven Track Record</h3>
                  <span className="text-xs font-mono font-bold text-[#FFE234] tracking-widest">KEY METRICS</span>
                </div>
                <div className="metrics-row grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {METRICS.map((m, i) => (
                        <div key={i} className="metric-card group relative">
                            <div className="absolute inset-0 bg-black notch-card translate-x-1 translate-y-1" />
                            <div className="relative notch-card p-5 border-[3px] border-black bg-[#111] h-full flex flex-col justify-between group-hover:border-white/40 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.15em] leading-tight">{m.label}</span>
                                    <div className={`w-2 h-2 rounded-full ${m.dotBg} shadow-[0_0_8px_currentColor] shrink-0`} />
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-3xl lg:text-4xl font-black italic tracking-tighter leading-none ${m.color}`} style={{ fontFamily: "'Fredoka', sans-serif" }}>
                                        {m.value}
                                    </span>
                                    <span className="text-white/30 text-[10px] font-black tracking-widest uppercase">{m.unit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function PortraitCard3D({ imageScale }: { imageScale: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

    // Shine/Shadow Parallax
    const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
    const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [40, 15]);
    const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [40, 15]);

    function handleMouseMove(event: React.MouseEvent) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div className="relative group/card w-full max-w-[320px] sm:max-w-[360px] md:max-w-[390px] xl:max-w-[420px] mx-auto">
            {/* ── Floating 'Stickers' ── */}
            <motion.div 
                style={{ 
                    x: useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]),
                    rotate: -12
                }}
                className="absolute -top-6 -left-6 z-30 w-16 h-16 xl:w-20 xl:h-20 bg-[#BF5AF2] border-[4px] border-black rounded-2xl shadow-[5px_5px_0_0_#000] flex items-center justify-center pointer-events-none hidden lg:flex"
            >
                <span className="text-3xl xl:text-4xl">★</span>
            </motion.div>

            <motion.div 
                style={{ 
                    x: useTransform(mouseXSpring, [-0.5, 0.5], [25, -25]),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]),
                    rotate: 10
                }}
                className="absolute top-1/4 -right-8 z-30 px-3.5 py-1.5 bg-[#FF6B00] border-[3px] border-black rounded-lg shadow-[5px_5px_0_0_#000] flex items-center justify-center gap-2 pointer-events-none hidden lg:flex"
            >
                <code className="text-[11px] font-black text-white">&lt;CODE/&gt;</code>
            </motion.div>

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                    rotateX, 
                    rotateY, 
                    perspective: 1000,
                    boxShadow: useTransform(
                        [shadowX, shadowY],
                        ([sx, sy]) => `${sx}px ${sy}px 0px 0px #000`
                    )
                }}
                className="pop-card bg-white p-4 rotate-[-2deg] rounded-[2rem] border-[4px] border-black transition-shadow duration-300 w-full relative z-10 group overflow-visible"
            >
                {/* ── Cartoon Speech Bubble ── */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-9 -right-8 z-40 bg-white border-[3px] border-black px-3.5 py-1.5 rounded-2xl shadow-[4px_4px_0_0_#000] rotate-6 hidden lg:block"
                >
                    <span className="text-[11px] font-black text-black">PRODUCT CRAFT! 💻</span>
                    <div className="absolute -bottom-2 left-4 w-3.5 h-3.5 bg-white border-b-[3px] border-r-[3px] border-black rotate-45" />
                </motion.div>

                {/* Decorative Rivets */}
                <div className="absolute top-8 left-8 w-3 h-3 bg-black/10 rounded-full z-40 border-[2px] border-black/20" />
                <div className="absolute top-8 right-8 w-3 h-3 bg-black/10 rounded-full z-40 border-[2px] border-black/20" />

                <div className="relative rounded-2xl overflow-hidden border-[4px] border-black bg-[#111] aspect-[3/4]">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full origin-center">
                        <img
                            src="/portrait.png"
                            alt="Abhinay"
                            className="w-full h-full object-cover grayscale-[0.1] contrast-[1.1] transform-gpu"
                            style={{ 
                                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" 
                            }}
                        />
                    </motion.div>
                    
                    {/* Holographic Shine Overlay */}
                    <motion.div 
                        style={{ 
                            left: shineX, 
                            top: shineY,
                            background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.4) 45%, rgba(0,229,255,0.2) 50%, rgba(255,60,172,0.2) 55%, transparent 100%)" 
                        }}
                        className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20"
                    />

                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] bg-[length:12px_12px] z-10" />
                </div>
                
                <div className="pt-6 pb-2 text-center relative z-20">
                    <p className="font-['Fredoka',sans-serif] font-black text-3xl text-black uppercase tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)]">
                        ABHINAY 👾
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3CAC]" />
                        <p className="text-black/60 font-bold text-sm uppercase tracking-widest leading-none">MODERN WEB DEVELOPER</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                    </div>
                </div>

                <motion.div 
                    style={{ 
                        x: useTransform(mouseXSpring, [-0.5, 0.5], [12, -12]),
                        y: useTransform(mouseYSpring, [-0.5, 0.5], [12, -12])
                    }}
                    className="absolute -bottom-5 right-1 sm:-right-4 flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#39FF14] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-[4deg] z-30 whitespace-nowrap group-hover:scale-110 transition-transform duration-300"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                    <span className="text-xs font-black tracking-widest uppercase text-black">READY!</span>
                </motion.div>
            </motion.div>
        </div>
    );
}
