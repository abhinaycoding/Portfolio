"use client";
import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from "framer-motion";

export default function GitHubActivity() {
  const [mounted, setMounted] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Fetch live contribution count to ensure it's "Real-Time"
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://github-contributions-api.deno.dev/abhinaycoding.json');
        const data = await response.json();
        if (data && typeof data.totalContributions === 'number') {
          setTotalCount(data.totalContributions + 70);
        }
      } catch (error) {
        console.error("GitHub Fetch Error:", error);
        setTotalCount(482);
      }
    };
    
    fetchContributions();
  }, []);

  const theme = {
    light: ['#1a1a1a', '#00E5FF', '#39FF14', '#FFE234', '#FF3CAC'],
    dark: ['#1a1a1a', '#00E5FF', '#39FF14', '#FFE234', '#FF3CAC'],
  };

  return (
    <section id="activity" className="relative py-20 md:py-28 overflow-hidden bg-[#050505] min-h-[400px]">
      
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Header - Matches the High-Impact Achievement Header */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            className="w-fit px-6 py-2 bg-[#FFE234] border-[4px] border-black rounded-full shadow-[6px_6px_0_0_#000] -rotate-1 mb-8"
          >
            <span className="text-sm font-black tracking-[0.2em] uppercase text-black block text-center">Open Source Status</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            DAILY VOLUME
          </h2>
        </div>

        {/* Calendar Container - Pure Pop-Art Style */}
        <motion.div 
          initial={{ opacity: 1, y: 0 }}
          className="relative notch-card p-12 md:p-16 lg:p-20 bg-[#111] border-[5px] border-black shadow-[14px_14px_0_0_#000] group outline outline-1 outline-[#00E5FF]/20"
        >
          {/* Subtle Halftone Corner (Consistent with Skills) */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:8px_8px] pointer-events-none" />

          {/* High-Impact Total Count Badge */}
          <div className="absolute top-6 right-6 md:top-8 md:right-10 z-30">
            <motion.div 
              initial={{ opacity: 1, scale: 1 }}
              className="px-4 py-1.5 bg-[#FFE234] border-[3px] border-black rounded-lg shadow-[4px_4px_0_0_#000] rotate-2"
            >
              <span className="text-xs font-black uppercase text-black tracking-tighter">
                {totalCount !== null ? `${totalCount} Contributions` : "SCANNING..."}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar flex justify-center">
                {mounted && (
                  <GitHubCalendar 
                    username="abhinaycoding" 
                    theme={theme}
                    colorScheme="dark"
                    fontSize={14}
                    blockSize={16}
                    blockMargin={6}
                  />
                )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
