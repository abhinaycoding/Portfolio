"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  scrolled?: boolean;
}

export default function Logo({ className = "w-12 h-12", scrolled = false }: LogoProps) {
  return (
    <div className={`relative ${className} group cursor-pointer`}>
      {/* ─── STICKER LAYERS (3D DEPTH) ─── */}
      {/* Deepest Offset Shadow */}
      <div className="absolute inset-0 bg-black rounded-2xl translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
      
      {/* Middle "Paper" Layer */}
      <div className="absolute inset-0 bg-white border-[3px] border-black rounded-2xl" />
      
      {/* Main Content Layer */}
      <div 
        className={`absolute inset-0 rounded-2xl border-[3px] border-black flex items-center justify-center transition-colors overflow-hidden ${
          scrolled ? "bg-[#FFE234]" : "bg-white"
        }`}
      >
        {/* Halftone Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:4px_4px]" />

        {/* ─── THE "A" LOGO MARK ─── */}
        <svg viewBox="0 0 100 100" className="w-8 h-8 relative z-10 drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
            <path
                d="M50 15L15 85H30L35 72H65L70 85H85L50 15ZM50 35L61 60H39L50 35Z"
                fill="currentColor"
                className="text-black"
                stroke="black"
                strokeWidth="4"
                strokeLinejoin="round"
            />
        </svg>

        {/* ─── RIVETS ─── */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-black/20 rounded-full border border-black/30" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-black/20 rounded-full border border-black/30" />
      </div>

      {/* ─── CAPTION / BADGE ─── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: -15 }}
        className="absolute -top-3 -right-3 z-30 w-7 h-7 bg-[#FF3CAC] border-[2px] border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform"
      >
        <Zap size={14} className="text-white fill-current" />
      </motion.div>
    </div>
  );
}
