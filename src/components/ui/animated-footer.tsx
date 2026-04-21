"use client"
import React, { useEffect, useRef, useState } from "react";
import Logo from "../Logo";

interface LinkItem {
  href: string;
  label: string;
}

interface FooterProps {
  leftLinks: LinkItem[];
  rightLinks: LinkItem[];
  copyrightText: string;
  barCount?: number; 
}

const Footer: React.FC<FooterProps> = ({
  leftLinks,
  rightLinks,
  copyrightText,
  barCount = 48, 
}) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adaptiveBarCount, setAdaptiveBarCount] = useState(barCount);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Use the established POP palette
  const POP_COLORS = ["#00E5FF", "#FFE234", "#39FF14", "#FF3CAC"];

  useEffect(() => {
    setIsMounted(true);
    // Adaptive Scaling: Reduce complexity on mobile
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setAdaptiveBarCount(isMobile ? Math.min(24, barCount) : barCount);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [barCount]);


  useEffect(() => {
    let t = 0; 
    let lastTime = 0;

    const animateWave = (timestamp: number) => {
      // Throttle to 60fps if possible, but keep it smooth
      if (timestamp - lastTime < 16) {
        animationFrameRef.current = requestAnimationFrame(animateWave);
        return;
      }
      lastTime = timestamp;

      const waveElements = waveRefs.current;
      let offset = 0;

      for (let i = 0; i < adaptiveBarCount; i++) {
        const element = waveElements[i];
        if (element) {
          offset += Math.max(0, 25 * Math.sin((t + i) * 0.35)); 
          // Use translate3d for GPU acceleration
          element.style.transform = `translate3d(0, ${i + offset}px, 0)`;
        }
      }

      t += 0.07;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    if (isVisible) {
      animationFrameRef.current = requestAnimationFrame(animateWave);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible, adaptiveBarCount]);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white relative flex flex-col w-full overflow-hidden select-none border-t-[10px] border-black"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between w-full gap-12 pb-32 pt-16 px-6 md:px-10 lg:px-16 relative z-20">
        
        <div className="space-y-6">
          <ul className="flex flex-wrap gap-8 text-white/50">
            {leftLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-sm font-black uppercase tracking-widest hover:text-[#00E5FF] transition-all duration-300 transform-gpu hover:scale-105 inline-block"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="pt-4">
            <div className="flex items-center gap-4 mb-4">
               {/* Simple Industrial 'A' Mark */}
               <div className="w-12 h-12 bg-[#FFE234] border-[4px] border-black rounded-xl flex items-center justify-center shadow-[6px_6px_0_0_#000] rotate-[-2deg]">
                  <span className="text-2xl font-black text-black italic">A</span>
               </div>
               <span className="text-xl font-black italic tracking-tighter uppercase leading-none">
                 ABHINAY — <span className="text-[#FFE234]">DEV</span>
               </span>
            </div>
            
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center gap-x-3">
              <svg className="w-3 h-3 text-[#FFE234]/50" viewBox="0 0 80 80">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M67.4307 11.5693C52.005 -3.85643 26.995 -3.85643 11.5693 11.5693C-3.85643 26.995 -3.85643 52.005 11.5693 67.4307C26.995 82.8564 52.005 82.8564 67.4307 67.4307C82.8564 52.005 82.8564 26.995 67.4307 11.5693ZM17.9332 17.9332C29.8442 6.02225 49.1558 6.02225 61.0668 17.9332C72.9777 29.8442 72.9777 49.1558 61.0668 61.0668C59.7316 62.4019 58.3035 63.5874 56.8032 64.6232L56.8241 64.6023C46.8657 54.6439 46.8657 38.4982 56.8241 28.5398L58.2383 27.1256L51.8744 20.7617L50.4602 22.1759C40.5018 32.1343 24.3561 32.1343 14.3977 22.1759L14.3768 22.1968C15.4126 20.6965 16.5981 19.2684 17.9332 17.9332ZM34.0282 38.6078C25.6372 38.9948 17.1318 36.3344 10.3131 30.6265C7.56889 39.6809 9.12599 49.76 14.9844 57.6517L34.0282 38.6078ZM21.3483 64.0156C29.24 69.874 39.3191 71.4311 48.3735 68.6869C42.6656 61.8682 40.0052 53.3628 40.3922 44.9718L21.3483 64.0156Z"
                />
              </svg>
              {copyrightText}
            </p>
          </div>
        </div>

        <div className="space-y-8 flex flex-col items-start md:items-end">
          <ul className="flex flex-wrap md:justify-end gap-6 md:gap-10">
            {rightLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-sm font-black uppercase tracking-widest text-white/50 hover:text-[#39FF14] transition-all duration-300 transform-gpu hover:scale-105 inline-block"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] font-black uppercase tracking-widest text-[#00E5FF] hover:underline"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Back to top ↑
            </button>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
              GPU ACCELERATED
            </div>
          </div>
        </div>
      </div>

      <div
        id="waveContainer"
        aria-hidden="true"
        className="relative z-10"
        style={{ overflow: "hidden", height: 260 }}
      >
        <div style={{ marginTop: 0 }}>
          {Array.from({ length: adaptiveBarCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { waveRefs.current[index] = el; }}
              className="wave-segment"
              style={{
                width: "100%",
                height: `${index + 1}px`,
                // Cycling through the POP palette
                backgroundColor: POP_COLORS[index % POP_COLORS.length],
                boxShadow: `0 0 20px ${POP_COLORS[index % POP_COLORS.length]}44`,
                transition: "transform 0.1s ease",
                willChange: "transform",
                marginTop: "-2px",
                opacity: isMounted ? 0.85 + (Math.random() * 0.1) : 0.9
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Absolute Bottom Strip */}
      <div className="h-4 bg-[#FFE234] border-t-[4px] border-black w-full" />
    </footer>
  );
};

export default Footer;
