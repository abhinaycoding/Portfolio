"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Award, Medal, Star, ExternalLink } from "lucide-react";
import Magnetic from "../Magnetic";

const ACHIEVEMENTS = [
  {
    title: "Global Hackathon Winner",
    category: "Innovation",
    date: "2024",
    desc: "First place out of 500+ teams for building a decentralized identity protocol with zero-knowledge proofs.",
    icon: Trophy,
    color: "bg-[#FFE234]",
    aspect: "aspect-[16/10]",
    span: "md:col-span-8"
  },
  {
    title: "Certified Cloud Architect",
    category: "Professional",
    date: "2024",
    desc: "Mastery in designing scalable, fault-tolerant systems on distributed infrastructure.",
    icon: Award,
    color: "bg-[#00E5FF]",
    aspect: "aspect-square",
    span: "md:col-span-4"
  },
  {
    title: "Open Source Contributor",
    category: "Community",
    date: "2023",
    desc: "Active contributor to major React-based frameworks and performance optimization libraries.",
    icon: Medal,
    color: "bg-[#FF3CAC]",
    aspect: "aspect-square",
    span: "md:col-span-4"
  },
  {
    title: "Top Product of the Month",
    category: "Recognition",
    date: "2023",
    desc: "Featured globally for building a physics-based animation engine that tripled user engagement.",
    icon: Star,
    color: "bg-[#39FF14]",
    aspect: "aspect-[16/10]",
    span: "md:col-span-8"
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 md:py-48 lg:py-56 overflow-hidden">
      
      {/* ── Section separator ── */}
      <div className="pop-divider absolute top-0 left-0 right-0 opacity-10" />

      {/* Atmospheric Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[#FFE234]/[0.05] rounded-full blur-[180px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* ── Header ── */}
        <div className="mb-20">
          <div className="w-fit px-6 py-2 bg-[#00E5FF] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-[-1deg] mb-10">
            <span className="text-sm font-black tracking-[0.2em] uppercase text-black block">
              HALL OF FAME 🏆
            </span>
          </div>
          <div className="space-y-1">
            {["Key milestone", "& achievements."].map((line, i) => (
              <div key={i} className="mask-line overflow-hidden">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
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

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {ACHIEVEMENTS.map((item, i) => (
                <AchievementCard key={i} item={item} i={i} />
            ))}
        </div>

      </div>
    </section>
  );
}

function AchievementCard({ item, i }: { item: any; i: number }) {
    const Icon = item.icon;
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className={`${item.span} group relative group`}
        >
            <div className="pop-card h-full bg-[#111] border-[4px] border-black rounded-[2.5rem] shadow-[12px_12px_0_0_#000] overflow-hidden flex flex-col">
                
                {/* Photo Holder / Background */}
                <div className={`relative ${item.aspect} w-full overflow-hidden bg-[#181818] border-b-[4px] border-black group`}>
                    {/* Placeholder Texture */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_2px,transparent_2px)] bg-[length:15px_15px]" />
                    
                    {/* Placeholder content - will be replaced by real images */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className={`w-24 h-24 rounded-3xl ${item.color} flex items-center justify-center border-[4px] border-black shadow-[8px_8px_0_0_#000] rotate-3`}
                        >
                            <Icon size={40} className="text-black" />
                        </motion.div>
                    </div>

                    {/* Overlay Label */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black border-[2px] border-white/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.category}</span>
                    </div>

                    <div className="absolute top-6 right-6 px-4 py-2 bg-white border-[2px] border-black rounded-xl shadow-[4px_4px_0_0_#000]">
                         <span className="text-xs font-black text-black">{item.date}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 italic" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            {item.title}
                        </h3>
                        <p className="text-white/50 text-lg leading-relaxed">
                            {item.desc}
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="flex gap-4">
                            <Magnetic>
                                <button className="p-4 bg-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0_0_#FFE234] hover:shadow-[6px_6px_0_0_#FFE234] transition-all group/btn">
                                    <ExternalLink size={20} className="text-black group-hover/btn:scale-110 transition-transform" />
                                </button>
                            </Magnetic>
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Signature Winner</span>
                    </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
        </motion.div>
    );
}
