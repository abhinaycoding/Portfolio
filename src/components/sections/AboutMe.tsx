"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: "3+", label: "Years Building", bg: "bg-[#00E5FF]" },
  { value: "12+", label: "Products Shipped", bg: "#FF3CAC" },
  { value: "99.9%", label: "Uptime Standard", bg: "#39FF14" },
  { value: "<300ms", label: "Avg Latency", bg: "#FFE234" },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        scrollTrigger: { trigger: ".metrics-row", start: "top 85%" },
        y: 40, opacity: 0, scale: 0.5, stagger: 0.12, duration: 0.8, ease: "back.out(1.7)",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-48 lg:py-56 overflow-hidden">

      {/* ── Section separator ── */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-[#FFE234]/30 to-transparent" />
      <div className="pop-divider absolute top-4 left-0 right-0 opacity-20" />

      {/* Background colorful blooms - BOOSTED */}
      <div className="absolute w-[900px] h-[900px] bg-[#00E5FF]/[0.35] rounded-full blur-[180px] pointer-events-none -top-60 -right-60 z-0" />
      <div className="absolute w-[700px] h-[700px] bg-[#FF3CAC]/[0.3] rounded-full blur-[180px] pointer-events-none -bottom-60 -left-60 z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* ── Left: Portrait (5 cols) ── */}
          <motion.div style={{ y: parallaxY }} className="relative lg:col-span-5">
            <div className="pop-card bg-white p-4 rotate-[-3deg] hover:rotate-[2deg] transition-transform duration-500 max-w-[440px] mx-auto lg:mx-0 shadow-[20px_20px_0_0_#000]">
              <div className="relative rounded-2xl overflow-hidden border-[4px] border-black bg-black aspect-[3/4]">
                <motion.div style={{ scale: imageScale }} className="w-full h-full origin-center">
                  <img
                    src="/portrait.png"
                    alt="Abhinay"
                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                  />
                </motion.div>
                {/* Overlay dots for that comic feel */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] bg-[length:12px_12px]" />
              </div>
              
              {/* Polaroid bottom */}
              <div className="pt-6 pb-2 text-center">
                <p className="font-['Fredoka',sans-serif] font-black text-3xl text-black uppercase tracking-widest">
                  ABHINAY 👾
                </p>
                <p className="text-black/60 font-bold text-sm uppercase tracking-widest mt-1">PRODUCT ENGINEER</p>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-6 -right-6 flex items-center gap-3 px-6 py-3 bg-[#39FF14] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-[5deg]">
                <span className="w-3 h-3 rounded-full bg-black animate-pulse" />
                <span className="text-sm font-black tracking-widest uppercase text-black">READY!</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Content (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            {/* Label */}
            <div className="w-fit px-6 py-2 bg-[#00E5FF] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] -rotate-2">
              <span className="text-sm font-black tracking-[0.2em] uppercase text-black block">
                WHO AM I? ⚡
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              {["Engineering", "with obsessive", "precision."].map((line, i) => (
                <div key={i} className="mask-line overflow-hidden">
                  <motion.h2
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl lg:text-[4.8rem] font-black leading-[1.0] tracking-tight text-white uppercase italic"
                    style={{ 
                      fontFamily: "'Fredoka', sans-serif",
                      WebkitTextStroke: "2px black",
                      textShadow: "6px 6px 0 black"
                    }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            {/* Paragraphs */}
            <div className="space-y-6 max-w-lg">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl text-white font-black leading-relaxed"
                >
                  I build <span className="bg-[#FF3CAC] px-2 border-[3px] border-black text-black">real products</span> with clean code and wildly expressive design intuition. Focused on shipping ideas that win.
                </motion.p>
            </div>

            {/* Divider */}
            <div className="h-2 bg-black border-[3px] border-white/20 rounded-full w-40" />

            {/* Metrics */}
            <div className="metrics-row grid grid-cols-2 lg:grid-cols-4 gap-6">
              {METRICS.map((m, i) => (
                <div 
                  key={i} 
                  className={`metric-card group p-6 rounded-3xl border-[4px] border-black shadow-[8px_8px_0_0_#000] hover:scale-105 transition-transform duration-300 ${
                    i % 4 === 0 ? "bg-[#00E5FF]" : i % 4 === 1 ? "bg-[#FF3CAC]" : i % 4 === 2 ? "bg-[#39FF14]" : "bg-[#FFE234]"
                  }`}
                >
                  <div
                    className="text-3xl font-black tracking-tighter text-black uppercase"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[10px] font-black tracking-widest uppercase text-black opacity-60 mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
