"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HatchTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hatchPlateRef = useRef<HTMLDivElement>(null);
  const lockArmsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scannerRef = useRef<HTMLDivElement>(null);
  const statusTabRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Visibility Setup: Hide until near
      const container = containerRef.current;
      gsap.set(container, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: container,
        start: "top 110%",
        onEnter: () => gsap.to(container, { autoAlpha: 1, duration: 0 }),
        onLeaveBack: () => gsap.to(container, { autoAlpha: 0, duration: 0 }),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 0.2, // Slightly more dampening for "heavy" feel
        }
      });

      // ── 1. THE SEALING SEQUENCE (Industrial Doors Slam Shut) ──
      tl.fromTo(container, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: "power2.out" }, 0)
        
        // ── 2. LOCKING ARMS (Swinging into place) ──
        .fromTo(lockArmsRef.current, 
          { scaleX: 0, opacity: 0, rotate: (i) => i * 45 - 20 }, 
          { scaleX: 1, opacity: 1, rotate: (i) => i * 45, duration: 1.5, stagger: 0.1, ease: "back.out(2)" }, 
          0.8
        )

        // ── 3. CORE ROTATION (The 'Screw' Lock) ──
        .to(hatchPlateRef.current, { rotation: 90, duration: 2, ease: "power3.inOut" }, 1.5)
        .to(coreRef.current, { scale: 1.2, boxShadow: "0 0 50px rgba(255, 226, 52, 0.6)", duration: 1, ease: "elastic.out(1, 0.3)" }, 2.8)

        // ── 4. BIO-SCANNER SWEEP ──
        .fromTo(scannerRef.current, { x: "-100%" }, { x: "100%", duration: 1.2, ease: "none" }, 3)
        .to(statusTabRef.current, { backgroundColor: "#FF3CAC", color: "#fff", textContent: "ACCESS_GRANTED", duration: 0.3 }, 4)
        .to(statusTabRef.current, { scale: 1.2, rotate: -2, duration: 0.2, ease: "back.out(4)" }, 4.1)

        // ── 5. RELEASE (The Big Drop) ──
        .to(lockArmsRef.current, { x: (i) => Math.cos(i * 45 * (Math.PI/180)) * 600, y: (i) => Math.sin(i * 45 * (Math.PI/180)) * 600, opacity: 0, duration: 1.5, ease: "power4.in" }, 5)
        .to(hatchPlateRef.current, { scale: 0, opacity: 0, rotation: -180, duration: 2, ease: "power4.in" }, 5.5)
        .to(container, { backgroundColor: "transparent", duration: 1 }, 6.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden z-[40]"
      style={{ visibility: 'hidden' }}
    >
        {/* Background mechanical patterns */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#FFE234_2px,transparent_2px)] bg-[length:40px_40px] pointer-events-none" />

        {/* ── THE HATCH ASSEMBLY ── */}
        <div className="absolute inset-0 flex items-center justify-center">
            
            {/* The Main Circular Hatch Frame */}
            <div 
                ref={hatchPlateRef}
                className="relative w-[320px] h-[320px] md:w-[600px] md:h-[600px] flex items-center justify-center"
            >
                {/* Massive Outward Ring with rivets */}
                <div className="absolute inset-0 rounded-full bg-black border-[12px] border-[#FFE234] shadow-[0_0_0_15px_#000]" />
                
                {/* Secondary 'Grill' Plate */}
                <div className="absolute inset-8 rounded-full border-[8px] border-black bg-[#111] overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,#000_40px,#000_80px)]" />
                </div>

                {/* ── LOCKING ARMS ── */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i}
                            ref={el => { if (lockArmsRef.current) lockArmsRef.current[i] = el; }}
                            className="absolute top-1/2 left-1/2 w-[160px] md:w-[300px] h-10 md:h-14 bg-[#FFE234] border-[5px] border-black origin-left -translate-y-1/2 z-20 shadow-[8px_8px_0_0_#000]"
                            style={{ transform: `translateY(-50%) rotate(${i * 45}deg) translateX(40px)` }}
                        >
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-[3px] border-black flex items-center justify-center">
                                <div className="w-4 h-0.5 bg-black rotate-45" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── CENTRAL EYE / CORE ── */}
                <div 
                    ref={coreRef}
                    className="relative w-40 h-40 md:w-72 md:h-72 rounded-full bg-black border-[10px] border-[#FFE234] z-30 flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                >
                    <div className="w-full h-full rounded-full border-[20px] border-black/40 border-dashed animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-12 h-12 md:w-20 md:h-20 bg-[#FF3CAC] rounded-full border-[6px] border-black shadow-[0_0_20px_#FF3CAC]" />
                    
                    {/* Scanner Beam */}
                    <div 
                        ref={scannerRef}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent w-full h-full opacity-50 z-40 transform -translate-x-full"
                    />
                </div>

                {/* Rivets surrounding the plate */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute w-5 h-5 bg-[#333] border-[3px] border-black rounded-full shadow-[2px_2px_0_0_#000]" 
                        style={{ 
                            transform: `rotate(${i * 30}deg) translateY(-260px) rotate(-${i * 30}deg)` 
                        }} 
                    />
                ))}
            </div>

            {/* ── ACCESS STATUS TAG ── */}
            <div 
                ref={statusTabRef}
                className="absolute transform translate-y-[240px] md:translate-y-[340px] px-6 py-2 bg-[#FFE234] border-[5px] border-black rounded-xl shadow-[10px_10px_0_0_#000] z-50 text-black font-black uppercase text-lg md:text-xl italic tracking-tighter"
                style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
                SCANNING_USER...
            </div>
        </div>

        {/* TOP & BOTTOM CAUTION BARS */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-[#FFE234] border-b-[5px] border-black overflow-hidden flex items-center">
            <div className="w-[1000%] flex animate-[marquee_20s_linear_infinite]">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-black font-black uppercase text-[10px] px-8 tracking-[0.4em]">
                        DANGER /// HIGH PRESSURE /// DO NOT ENTER /// DANGER /// HIGH PRESSURE /// DO NOT ENTER ///
                    </span>
                ))}
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#FFE234] border-t-[5px] border-black overflow-hidden flex items-center">
            <div className="w-[1000%] flex animate-[marquee_20s_linear_infinite_reverse]">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-black font-black uppercase text-[10px] px-8 tracking-[0.4em]">
                        AUTHORIZED PERSONNEL ONLY /// CLEARANCE LEVEL ALPHA /// AUTHORIZED PERSONNEL ONLY ///
                    </span>
                ))}
            </div>
        </div>
    </div>
  );
}
