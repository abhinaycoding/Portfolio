"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: "1.5", label: "Years of Development", bg: "bg-[#FFE234]" },
];

const WHAT_I_BRING = [
  { title: "Modern Frontend", desc: "Development with React / Next.js", bg: "bg-[#00E5FF]", color: "text-black" },
  { title: "Vibe-Coded UI", desc: "Strong visual taste & aesthetic", bg: "bg-[#FF3CAC]", color: "text-white" },
  { title: "Smooth Motion", desc: "Interaction & interaction design", bg: "bg-[#39FF14]", color: "text-black" },
  { title: "Product Thinking", desc: "Product-first engineering mindset", bg: "bg-[#FFE234]", color: "text-black" },
  { title: "Performance", desc: "Optimized, performance-focused builds", bg: "bg-[#BF5AF2]", color: "text-white" },
  { title: "Execution", desc: "Fast execution & learning mindset", bg: "bg-[#FF6B00]", color: "text-white" },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bring-card", {
        scrollTrigger: { trigger: ".bring-grid", start: "top 85%" },
        y: 40, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.8, ease: "power4.out",
      });
      gsap.from(".metric-card", {
        scrollTrigger: { trigger: ".metrics-row", start: "top 95%" },
        scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-8 md:py-12 lg:py-16 overflow-hidden bg-[#050505]">

      {/* ── Background Elements ── */}
      <div className="absolute w-[900px] h-[900px] bg-[#00E5FF]/[0.15] rounded-full blur-[180px] pointer-events-none -top-60 -right-60 z-0" />
      <div className="absolute w-[700px] h-[700px] bg-[#FF3CAC]/[0.1] rounded-full blur-[180px] pointer-events-none -bottom-60 -left-60 z-0" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* ── LEFT: PORTRAIT ── */}
          <div className="lg:col-span-5 relative">
            <motion.div style={{ y: parallaxY }} className="sticky top-32">
                <PortraitCard3D imageScale={imageScale} />
            </motion.div>
          </div>

          {/* ── RIGHT: NARRATIVE ── */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            {/* Header */}
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-fit px-6 py-2 bg-[#FFE234] border-[3px] border-black rounded-full shadow-[6px_6px_0_0_#000] -rotate-2 mb-6 whitespace-nowrap"
                >
                    <span className="text-sm font-black tracking-[0.2em] uppercase text-black block">Who am I?</span>
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase italic tracking-tighter">
                    ABHINAY
                </h2>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-8 text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    I’m a developer who enjoys <span className="text-white font-black italic underline decoration-[#00E5FF] decoration-4 underline-offset-4">modern vibe-coded development</span>—building products that feel fresh, interactive, and visually memorable while staying clean under the hood.
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
            <div className="mt-10">
                <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.4em] mb-8 border-b border-white/10 pb-4">What I Bring</h3>
                <div className="bring-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WHAT_I_BRING.map((item, i) => (
                        <div key={i} className="bring-card group relative">
                            <div className="absolute inset-0 bg-black notch-card translate-x-1 translate-y-1" />
                            <div className={`relative notch-card p-6 border-[3px] border-black h-full ${item.bg} ${item.color}`}>
                                <h4 className="text-xl font-black uppercase leading-tight mb-2 italic">{item.title}</h4>
                                <p className="text-xs font-bold opacity-80 uppercase tracking-wider">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── CORE STATS (METRICS) ─── */}
            <div className="mt-16 pt-10 border-t border-white/5">
                <div className="metrics-row">
                    {METRICS.map((m, i) => (
                        <div key={i} className="metric-card">
                            <p className="text-white/30 text-xs font-black uppercase tracking-[0.4em] mb-3">{m.label}</p>
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${m.bg} shadow-[0_0_15px_rgba(255,226,52,0.4)]`} />
                                <span className="text-5xl font-black text-white italic tracking-tighter leading-none">{m.value} <span className="text-white/20 text-2xl not-italic ml-2">YEARS</span></span>
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
        <div className="relative group/card">
            {/* ── Floating 'Stickers' ── */}
            <motion.div 
                style={{ 
                    x: useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
                    rotate: -15
                }}
                className="absolute -top-10 -left-10 z-30 w-24 h-24 bg-[#BF5AF2] border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000] flex items-center justify-center pointer-events-none hidden lg:flex"
            >
                <span className="text-4xl">★</span>
            </motion.div>

            <motion.div 
                style={{ 
                    x: useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]),
                    rotate: 12
                }}
                className="absolute top-1/4 -right-16 z-30 px-4 py-2 bg-[#FF6B00] border-[4px] border-black rounded-lg shadow-[6px_6px_0_0_#000] flex items-center justify-center gap-2 pointer-events-none hidden lg:flex"
            >
                <code className="text-xs font-black text-white">&lt;CODE/&gt;</code>
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
                className="pop-card bg-white p-4 rotate-[-3deg] rounded-[2rem] border-[4px] border-black transition-shadow duration-300 max-w-[440px] mx-auto lg:mx-0 relative z-10 group overflow-visible"
            >
                {/* ── Cartoon Speech Bubble ── */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-12 -right-20 z-40 bg-white border-[4px] border-black px-4 py-2 rounded-2xl shadow-[5px_5px_0_0_#000] rotate-6 hidden lg:block"
                >
                    <span className="text-xs font-black text-black">VIBE-CODING! 💻</span>
                    <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-b-4 border-r-4 border-black rotate-45" />
                </motion.div>

                {/* Decorative Rivets */}
                <div className="absolute top-8 left-8 w-3 h-3 bg-black/10 rounded-full z-40 border-[2px] border-black/20" />
                <div className="absolute top-8 right-8 w-3 h-3 bg-black/10 rounded-full z-40 border-[2px] border-black/20" />

                <div className="relative rounded-2xl overflow-hidden border-[4px] border-black bg-[#111] aspect-[3/4]">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full origin-center">
                        <img
                            src="/portrait.png"
                            alt="Abhinay"
                            className="w-full h-full object-cover grayscale-[0.1] contrast-[1.1]"
                            style={{ 
                                filter: "drop-shadow(3px 3px 0 white) drop-shadow(-3px -3px 0 white) drop-shadow(3px -3px 0 white) drop-shadow(-3px 3px 0 white)" 
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
                        x: useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]),
                        y: useTransform(mouseYSpring, [-0.5, 0.5], [15, -15])
                    }}
                    className="absolute -bottom-6 -right-6 flex items-center gap-3 px-6 py-3 bg-[#39FF14] border-[4px] border-black rounded-full shadow-[8px_8px_0_0_#000] rotate-[5deg] z-30 whitespace-nowrap group-hover:scale-110 transition-transform duration-300"
                >
                    <span className="w-3 h-3 rounded-full bg-black animate-pulse" />
                    <span className="text-sm font-black tracking-widest uppercase text-black">READY!</span>
                </motion.div>
            </motion.div>
        </div>
    );
}
