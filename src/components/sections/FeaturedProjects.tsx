"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Billing SaaS",
    subtitle: "Real-time Financial Infrastructure",
    desc: "High-performance billing engine with multi-tenant scalability, sub-second transaction processing, and enterprise-grade reliability.",
    tech: ["Next.js", "Prisma", "Redis", "Stripe"],
    metrics: ["99.9% Uptime", "250ms P95"],
    year: "2024",
    link: "#",
    color: "bg-[#00E5FF]",
    icon: "💳"
  },
  {
    title: "AI Orchestrator",
    subtitle: "LLM Workflow Automation",
    desc: "Visual node-based editor for deploying localized LLM chains and automation workflows at enterprise scale with context-aware memory.",
    tech: ["React Flow", "Python", "LangChain", "PostgreSQL"],
    metrics: ["GPT-4o", "100k+ tokens/s"],
    year: "2024",
    link: "#",
    color: "bg-[#FF3CAC]",
    icon: "🤖"
  },
  {
    title: "Elite Engine",
    subtitle: "Luxury Commerce Platform",
    desc: "Premium marketplace with sub-second load times, 3D product visualization, and physics-based micro-interactions.",
    tech: ["Three.js", "GSAP", "Tailwind", "Vercel"],
    metrics: ["100 Lighthouse", "Mobile-First"],
    year: "2023",
    link: "#",
    color: "bg-[#39FF14]",
    icon: "🏎️"
  },
  {
    title: "Liquid Portfolio",
    subtitle: "WebGL Experience",
    desc: "Interactive developer portfolio with liquid cursor physics, WebGL shader effects, and cinematic scroll-driven animations.",
    tech: ["WebGL", "Next.js", "GSAP ScrollTrigger"],
    metrics: ["60fps", "GPU Accelerated"],
    year: "2023",
    link: "#",
    color: "bg-[#FFE234]",
    icon: "💧"
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
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-48 lg:py-56 overflow-hidden">
      
      {/* ── Section separator ── */}
      <div className="pop-divider absolute top-0 left-0 right-0 opacity-10" />

      {/* Background colorful blooms */}
      <div className="absolute w-[800px] h-[800px] bg-[#BF5AF2]/[0.1] rounded-full blur-[180px] pointer-events-none -top-[10%] -right-[15%]" />
      <div className="absolute w-[600px] h-[600px] bg-[#00E5FF]/[0.08] rounded-full blur-[150px] pointer-events-none bottom-[-10%] left-[-15%]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

        {/* ── Header ── */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <div className="w-fit px-6 py-2 bg-[#39FF14] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-[-1deg] mb-10">
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
          </div>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg max-w-[280px] leading-[1.6] font-bold italic"
          >
            A curated selection of high-energy products I&apos;ve built and shipped to the world.
          </motion.p>
        </div>

        {/* ── Project Rows ── */}
        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={i} project={project} index={i} />
          ))}
          {/* Final bottom divider */}
          <div className="pop-divider opacity-20" />
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const rotateValue = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  return (
    <motion.a
      ref={rowRef}
      href={project.link}
      style={{ rotate: rotateValue }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="project-row group block relative"
    >
      <div className={`pop-card p-8 md:p-10 border-[4px] border-black shadow-[10px_10px_0_0_#000] bg-white transition-all cursor-pointer overflow-hidden`}>
        
        {/* Shine spot */}
        <div className="absolute top-4 left-6 w-20 h-4 bg-black/10 rounded-full rotate-[-4deg]" />

        <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">

          {/* Index + Emoji */}
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-xl font-black text-black/20 font-mono">
              0{index + 1}
            </span>
            <div className={`w-16 h-16 flex items-center justify-center rounded-2xl border-[3px] border-black ${project.color} text-3xl shadow-[4px_4px_0_0_#000] transition-transform group-hover:rotate-12 group-hover:scale-110`}>
              {project.icon}
            </div>
          </div>

          {/* Title + subtitle */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-2xl md:text-4xl font-black tracking-tight text-black uppercase leading-[1.0]"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {project.title}
            </h3>
            <p className="text-sm font-bold text-black/40 uppercase tracking-widest mt-2 font-['Nunito',sans-serif]">
              {project.subtitle}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-4 py-1.5 text-[11px] font-black uppercase tracking-widest border-[3px] border-black rounded-full bg-black text-white group-hover:bg-[#FFE234] group-hover:text-black transition-colors"
                style={{ fontFamily: "'Fredoka', sans-serif" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Arrow / View */}
          <div className="shrink-0 flex items-center gap-4">
            <span className="hidden lg:block text-xs font-black text-black/20 uppercase tracking-widest font-mono">
                {project.year}
            </span>
            <div className="w-14 h-14 rounded-full border-[4px] border-black bg-[#FFE234] flex items-center justify-center shadow-[4px_4px_0_0_#000] group-hover:shadow-[6px_6px_0_0_#000] transition-all active:scale-90">
                <span className="text-2xl font-black text-black">🚀</span>
            </div>
          </div>
        </div>

        {/* Detail text on hover */}
        <div className="mt-8 pt-8 border-t-[3px] border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
            <p className="text-black font-bold text-lg max-w-xl italic">
                &quot;{project.desc}&quot;
            </p>
            <div className="flex gap-6">
                {project.metrics.map((m, mi) => (
                    <span key={mi} className="px-5 py-2 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest border-[2px] border-[#FFE234]/50">
                        {m}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </motion.a>
  );
}
