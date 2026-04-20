"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, ExternalLink, Zap } from "lucide-react";
import Magnetic from "../Magnetic";

const ACHIEVEMENTS = [
  {
    title: "Tech-Xion",
    category: "Winners",
    date: "2026",
    desc: "Team OverClocked brought home the gold at Tech-Xion, showcasing high-speed innovation and system optimization.",
    image: "/images/Tech-Xion trophy.jpeg",
    icon: Award,
    color: "bg-[#FFE234]",
    aspect: "aspect-[16/10]",
    span: "md:col-span-8"
  },
  {
    title: "Code League 1.0",
    category: "First Runner-Up",
    date: "2026",
    desc: "Secured 1st Runner-Up among 90+ teams at G H Raisoni College. Developed NyayMitra, an AI Legal platform, winning ₹25,000 scholarship, cash, and headphones.",
    image: "/images/achievement_2026_silver.png",
    icon: Trophy,
    color: "bg-[#00E5FF]",
    aspect: "aspect-square",
    span: "md:col-span-4"
  },
  {
    title: "Hackbyte 4.0",
    category: "Winners",
    date: "2026",
    desc: "Honored for competing and excelling in the Hackbyte track among a selective group of specialized developers.",
    image: "/images/hackbyte.jpeg",
    icon: Zap,
    color: "bg-[#39FF14]",
    aspect: "aspect-square",
    span: "md:col-span-4"
  },
  {
    title: "Code League 1.0",
    category: "First Runner-Up",
    date: "2024",
    desc: "Secured 1st Runner-Up among 90+ teams at G H Raisoni College. Developed NyayMitra, an AI Legal platform, winning ₹25,000 scholarship, cash, and headphones.",
    image: "/images/codeleague.jpeg",
    icon: Trophy,
    color: "bg-[#FF3CAC]",
    aspect: "aspect-square",
    span: "md:col-span-4"
  },
  {
    title: "Tech-Xion",
    category: "Winners",
    date: "2024",
    desc: "Team OverClocked brought home the gold at Tech-Xion, showcasing high-speed innovation and system optimization.",
    slides: ["/images/Tech-Xion.jpeg", "/images/Tech-Xion%20trophy.jpeg"],
    icon: Award,
    color: "bg-[#00E5FF]",
    aspect: "aspect-square",
    span: "md:col-span-4"
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 md:py-48 lg:py-56 overflow-hidden bg-[#050505]">
      
      {/* ── Section separator ── */}
      <div className="pop-divider absolute top-0 left-0 right-0 opacity-10" />

      {/* Atmospheric Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[#FFE234]/[0.05] rounded-full blur-[180px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* ── Header ── */}
        <div className="mb-20">
          <div className="w-fit px-6 py-2 bg-[#FF3CAC] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] rotate-[-1deg] mb-10">
            <span className="text-sm font-black tracking-[0.2em] uppercase text-black block">
              HALL OF FAME 🏆
            </span>
          </div>
          <div className="space-y-1">
            {["Recent wins", "& milestones."].map((line, i) => (
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
                    textShadow: "10px 10px 0 black"
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

            {/* Core Stat Module in the empty space */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="md:col-span-8 relative flex items-center justify-center p-12 notch-card border-[4px] border-black bg-[#FFE234] shadow-[12px_12px_0_0_#000] min-h-[300px] group overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[length:12px_12px]" />
                
                <div className="relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase leading-tight italic" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        2x Hackathon <span className="inline-block group-hover:rotate-12 transition-transform">🏆</span>
                        <div className="w-20 h-2 bg-black mx-auto my-6 rounded-full" />
                        <span className="text-black/50">6x Grand Finalists</span>
                    </h2>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-6 left-6 text-black/20 font-mono font-black text-xs uppercase tracking-widest">
                    Overall Track Record
                </div>
                <div className="absolute bottom-6 right-6 text-black/20 font-mono font-black text-xs uppercase tracking-widest">
                    MTR.REF_092
                </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}

function AchievementCard({ item, i }: { item: any; i: number }) {
    const Icon = item.icon;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (item.slides && item.slides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % item.slides.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [item.slides]);
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className={`${item.span} group relative`}
        >
            {/* Shadow Layer */}
            <div className="absolute inset-0 bg-black notch-card translate-x-2 translate-y-2 opacity-50" />

            <div className="relative notch-card h-full bg-[#111] border-[4px] border-black overflow-hidden flex flex-col group/card hover:-translate-y-2 transition-all duration-300">
                
                {/* Image Section */}
                <div className={`relative ${item.aspect} w-full overflow-hidden bg-[#181818] border-b-[4px] border-black`}>
                    
                    {/* Render Image or Slideshow */}
                    {item.slides ? (
                        <div className="absolute inset-0">
                            {item.slides.map((slide: string, index: number) => (
                                <motion.img
                                    key={slide}
                                    src={slide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: index === currentSlide ? 1 : 0 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-all duration-700"
                                />
                            ))}
                        </div>
                    ) : (
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover/card:scale-110 transition-all duration-700" 
                        />
                    )}
                    
                    {/* Halftone Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-[0.1] pointer-events-none bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] bg-[length:6px_6px] transition-opacity duration-300" />

                    {/* Overlay Label */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black border-[2px] border-white/20 rounded-full z-20">
                        <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.category}</span>
                    </div>

                    <div className="absolute top-6 right-6 px-4 py-2 bg-white border-[2px] border-black rounded-xl shadow-[4px_4px_0_0_#000] z-20">
                         <span className="text-xs font-black text-black">{item.date}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-12 md:px-20 lg:px-24 py-12 md:py-16 flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 italic" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            {item.title}
                        </h3>
                        <p className="text-white/50 text-lg leading-relaxed">
                            {item.desc}
                        </p>
                    </div>


                </div>

                {/* Animated Gradient Shine on Hover */}
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            </div>
        </motion.div>
    );
}
