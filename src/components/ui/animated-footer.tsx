"use client"
import React, { useEffect, useRef, useState } from "react";

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
  barCount = 32, 
}) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Use the established POP palette
  const POP_COLORS = ["#00E5FF", "#FFE234", "#39FF14", "#FF3CAC"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);


  useEffect(() => {
    let t = 0; 

    const animateWave = () => {
      const waveElements = waveRefs.current;
      let offset = 0;

      waveElements.forEach((element, index) => {
        if (element) {
          // Increased amplitude and frequency for a more "Aggressive" POP feel
          offset += Math.max(0, 30 * Math.sin((t + index) * 0.4)); 
          element.style.transform = `translateY(${index + offset}px)`;
        }
      });

      t += 0.08;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    if (isVisible) {
      animateWave();
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
  }, [isVisible]);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white relative flex flex-col w-full overflow-hidden select-none border-t-[10px] border-black"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between w-full gap-12 pb-32 pt-16 px-6 md:px-10 lg:px-16 relative z-20">
        
        <div className="space-y-6">
          <ul className="flex flex-wrap gap-8">
            {leftLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-sm font-black uppercase tracking-widest hover:text-[#00E5FF] transition-colors"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFE234] border-[3px] border-black rounded-xl flex items-center justify-center font-black text-black shadow-[4px_4px_0_0_#000] rotate-[-5deg]">
                  A
               </div>
               <span className="text-xl font-black italic tracking-tighter uppercase leading-none">
                 ABHINAY — <span className="text-[#FFE234]">DEV</span>
               </span>
            </div>
            
            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-x-3">
              <svg className="w-4 h-4 text-[#FFE234]" viewBox="0 0 80 80">
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
                  className="text-sm font-black uppercase tracking-widest hover:text-[#39FF14] transition-colors"
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
              className="text-xs font-black uppercase tracking-widest text-[#00E5FF] hover:underline"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Back to top ↑
            </button>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              Machine Optimized
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
          {Array.from({ length: barCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { waveRefs.current[index] = el; }}
              className="wave-segment"
              style={{
                height: `${index + 1}px`,
                // Cycling through the POP palette
                backgroundColor: POP_COLORS[index % POP_COLORS.length],
                boxShadow: `0 0 20px ${POP_COLORS[index % POP_COLORS.length]}33`,
                transition: "transform 0.1s ease",
                willChange: "transform",
                marginTop: "-2px",
                opacity: 0.8 + (Math.random() * 0.2) // Slight flicker effect for the glowing tubes
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
