"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "NoteNook",
    subtitle: "Master Your Studies",
    desc: "A premium, gamified study platform for ambitious students. Master your curriculum with focused tools and deep-work integration for maximum academic impact.",
    tech: ["Next.js", "Framer Motion", "Tailwind", "Radix UI"],
    metrics: ["Gamified XP", "Study Mode"],
    year: "2026",
    link: "https://notenook-app.vercel.app/",
    color: "bg-[#FFE234]",
    icon: "📖"
  },
  {
    title: "PodStream",
    subtitle: "Curating the Signal",
    desc: "Minimalism for the auditory obsessive. A high-performance podcast aggregation dashboard engineered with a brutalist, typography-first interface.",
    tech: ["React State", "Lucide", "Next.js", "Zustand"],
    metrics: ["Sub-second loads", "No Bloat"],
    year: "2026",
    link: "https://podstream-two.vercel.app/dashboard",
    color: "bg-[#FF3CAC]",
    icon: "🎙️"
  },
  {
    title: "Veltrix Labs",
    subtitle: "Digital Future Collective",
    desc: "A digital product agency collective building the future of web experiences. High-fidelity branding meets sophisticated frontend engineering for the next generation of startups.",
    tech: ["GSAP", "Next.js", "WebGL Logic", "Premium UI"],
    metrics: ["Agency Grade", "Custom Motion"],
    year: "2026",
    link: "https://veltrixlabs.vercel.app/",
    color: "bg-[#39FF14]",
    icon: "⚡"
  },
  {
    title: "YouthForce Security",
    subtitle: "Enterprise Defense Systems",
    desc: "Professional security infrastructure. Engineered for high-load operational monitoring, multi-layered defense coordination, and real-time response tracking.",
    tech: ["Vercel Edge", "Next.js", "Security Ops", "Scalable Systems"],
    metrics: ["Client Work", "Ops Ready"],
    year: "2026",
    link: "https://client-work-1-rose.vercel.app/",
    color: "bg-[#00E5FF]",
    icon: "🛡️"
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" },
          y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.2)",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
      
      {/* ── Section separator ── */}
      <div className="pop-divider absolute top-0 left-0 right-0 opacity-10" />

      {/* Background colorful blooms */}
      <div className="absolute w-[800px] h-[800px] bg-[#BF5AF2]/[0.1] rounded-full blur-[180px] pointer-events-none -top-[10%] -right-[15%]" />
      <div className="absolute w-[600px] h-[600px] bg-[#00E5FF]/[0.08] rounded-full blur-[150px] pointer-events-none bottom-[-10%] left-[-15%]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* ── Header ── */}
        <div className="mb-24 lg:mb-40 flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <div className="w-fit px-6 py-2 bg-[#39FF14] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-[-1deg] mb-12 whitespace-nowrap">
              <span className="text-sm font-black tracking-[0.2em] uppercase text-black block">
                MY WORK 🚀
              </span>
            </div>
            <div className="space-y-1">
              {["Selected", "projects."].map((line, i) => (
                <div key={i} className="mask-line overflow-hidden">
                  <motion.h2
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl lg:text-[6.5rem] font-black leading-[0.9] tracking-tight uppercase"
                    style={{ 
                      fontFamily: "'Fredoka', sans-serif",
                      WebkitTextStroke: "2px white",
                      textShadow: "10px 10px 0 black"
                    }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg lg:text-xl max-w-[320px] leading-[1.6] font-bold italic border-l-4 border-[#FF3CAC] pl-6"
          >
            A curated selection of high-energy products I&apos;ve built and shipped to the world.
          </motion.p>
        </div>

        {/* ── Project Rows ── */}
        <div className="space-y-12 md:space-y-20 lg:space-y-24">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={i} project={project} index={i} />
          ))}
          {/* Final bottom divider */}
          <div className="pop-divider opacity-20 mt-20" />
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(event: React.MouseEvent) {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={rowRef}
      href={project.link}
      style={{ rotate: scrollRotate }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-row group block relative perspective-1000"
    >
      {/* ── Floating Badge Sticker ── */}
      <motion.div 
        style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]),
            rotate: 15
        }}
        className="absolute -top-4 left-1/4 z-30 px-4 py-1.5 bg-[#FF6B00] border-[3px] border-black rounded-lg shadow-[6px_6px_0_0_#000] flex items-center justify-center font-black text-white text-[10px] scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none"
      >
        PROJECT_0{index + 1}
      </motion.div>

      {/* Extreme Shadow Layer */}
      <div className="absolute inset-0 bg-black notch-card translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-300" />
      
      <motion.div 
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className={`relative notch-card p-8 md:p-12 border-[4px] border-black bg-white transition-all cursor-pointer overflow-hidden z-10`}
      >
        {/* Halftone Texture Overlay on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[length:6px_6px] transition-opacity duration-300" />

        {/* Shine spot */}
        <div className="absolute top-4 left-6 w-20 h-4 bg-black/10 rounded-full rotate-[-4deg]" />

        {/* ── Holographic Shine ── */}
        <motion.div 
            style={{ 
                left: useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"]),
                top: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "150%"]),
                background: "linear-gradient(135deg, transparent 0%, rgba(0,229,255,0.05) 50%, transparent 100%)" 
            }}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20"
        />

        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 relative z-10">

          {/* Index + Emoji Group */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-sm font-black text-black/20 font-mono">
              0{index + 1}
            </span>
            <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl border-[3px] border-black ${project.color} text-2xl md:text-3xl shadow-[4px_4px_0_0_#000] transition-transform group-hover:rotate-12 group-hover:scale-110`}>
              {project.icon}
            </div>
          </div>

          {/* Title + subtitle Group */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-xl md:text-4xl font-black tracking-tight text-black uppercase leading-tight"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {project.title}
            </h3>
            <p className="text-[10px] md:text-sm font-bold text-black/40 uppercase tracking-widest mt-1 font-['Nunito',sans-serif]">
              {project.subtitle}
            </p>
          </div>

          {/* Tech tags - Horizontal scroll or wrap on mobile */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 md:px-4 py-1 md:py-1.5 text-[9px] md:text-[11px] font-black uppercase tracking-widest border-[2px] md:border-[3px] border-black rounded-full bg-black text-white group-hover:bg-[#FFE234] group-hover:text-black transition-colors shadow-[2px_2px_0_0_#000]"
                style={{ fontFamily: "'Fredoka', sans-serif" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Row for Mobile (Arrow / View / Year) */}
          <div className="flex items-center justify-between lg:justify-end gap-4 mt-2 lg:mt-0">
            <span className="text-[11px] font-black text-black/30 uppercase tracking-widest font-mono">
                {project.year}
            </span>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] md:border-[4px] border-black bg-[#FFE234] flex items-center justify-center shadow-[4px_4px_0_0_#000] group-hover:shadow-[6px_6px_0_0_#000] transition-all active:scale-95">
                <span className="text-xl md:text-2xl font-black text-black">🚀</span>
            </div>
          </div>
        </div>

        {/* Detail text on hover - Compact on mobile */}
        <div className="mt-6 pt-6 border-t-[2px] border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 overflow-hidden h-0 group-hover:h-auto">
            <p className="text-black font-bold text-sm md:text-lg max-w-xl italic">
                &quot;{project.desc}&quot;
            </p>
            <div className="flex flex-wrap gap-3">
                {project.metrics.map((m, mi) => (
                    <span key={mi} className="px-3 py-1 bg-black text-white rounded-lg text-[9px] md:text-xs font-black uppercase tracking-widest border-[2px] border-[#FFE234]/50 shadow-[2px_2px_0_0_rgba(255,226,52,0.2)]">
                        {m}
                    </span>
                ))}
            </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
