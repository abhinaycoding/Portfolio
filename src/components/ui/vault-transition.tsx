"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VaultTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const lockRingRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mainGearRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Only make the vault visible once the hero scrolls off-screen.
      // Before that, it stays invisible so the user never sees it on load.
      const revealContainer = containerRef.current;
      gsap.set(revealContainer, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: revealContainer,
        start: "top 100%", // fires exactly when vault top edge just enters viewport from below
        onEnter: () => gsap.to(revealContainer, { autoAlpha: 1, duration: 0, overwrite: true }),
        onLeaveBack: () => gsap.to(revealContainer, { autoAlpha: 0, duration: 0, overwrite: true }),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 0.1, 
        }
      });

      // Background moving text
      tl.fromTo(marqueeRef1.current, { xPercent: 0 }, { xPercent: -30, duration: 8, ease: "none" }, 0)
        .fromTo(marqueeRef2.current, { xPercent: -30 }, { xPercent: 0, duration: 8, ease: "none" }, 0)

      // 1. Enter: Cartoon doors slam shut with heavy impact elasticity
      .fromTo(containerRef.current, { scale: 1.2 }, { scale: 1, duration: 2, ease: "power2.out" }, 0)
      .fromTo(leftDoorRef.current, { xPercent: -100, rotateY: -15 }, { xPercent: 0, rotateY: 0, duration: 2, ease: "back.out(1.2)" }, 0)
      .fromTo(rightDoorRef.current, { xPercent: 100, rotateY: 15 }, { xPercent: 0, rotateY: 0, duration: 2, ease: "back.out(1.2)" }, 0)
      
      // 2. Big chunky lock slides into the center with massive spin
      .fromTo(lockRef.current, { scale: 4, opacity: 0, rotation: 720 }, { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(2)" }, 1.8)
      
      // 3. Locking mechanical action (Gears spin abruptly, double gears)
      .to(lockRingRef.current, { rotation: 180, scale: 1.1, duration: 0.7, ease: "power2.in" }, 2.8)
      .to(lockRingRef.current, { scale: 1, duration: 0.8, ease: "bounce.out" }, 3.5)
      .to(mainGearRef.current, { rotation: -180, duration: 1.5, ease: "back.inOut(1.5)" }, 2.8)
      
      // 4. Secure State: Indicator pops to green
      .to(indicatorRef.current, { backgroundColor: "#39FF14", scale: 1.4, duration: 0.3, ease: "elastic.out(1, 0.3)" }, 4.3)
      .to(textRef.current, { opacity: 1, scale: 1.1, rotation: -5, duration: 0.3, ease: "back.out(3)" }, 4.3)
      
      // Hold state 
      .to({}, { duration: 1.5 })
      
      // 5. Unlocking sequence
      .to(indicatorRef.current, { backgroundColor: "#FF0000", scale: 1, duration: 0.2 }, 5.8)
      .to(textRef.current, { opacity: 0, scale: 0.8, duration: 0.2 }, 5.8)
      .to(lockRingRef.current, { rotation: 0, duration: 1.2, ease: "back.inOut(1.5)" }, 6)
      .to(mainGearRef.current, { rotation: 0, duration: 1.2, ease: "back.inOut(1.5)" }, 6)
      
      // 6. Explosive Blast open pop (doors break off hinges vertically and horizontally)
      .to(lockRef.current, { scale: 0, opacity: 0, rotation: -360, duration: 0.6, ease: "back.in(2)" }, 7)
      .to(leftDoorRef.current, { xPercent: -120, yPercent: -15, rotation: -12, scale: 1.1, duration: 2, ease: "power3.inOut" }, 7.4)
      .to(rightDoorRef.current, { xPercent: 120, yPercent: 15, rotation: 12, scale: 1.1, duration: 2, ease: "power3.inOut" }, 7.4)
      .to(containerRef.current, { scale: 1.1, opacity: 0, duration: 2, ease: "power2.in" }, 7.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden" style={{ opacity: 0, visibility: 'hidden' }}>
       
       {/* Background structural plate (Flat, dotted) */}
       <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFE234] overflow-hidden pointer-events-none">
          {/* Static Halftone Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_3px,transparent_3px)] bg-[length:30px_30px] opacity-10 z-10" />
          
          {/* Massive Scroll-Linked Background Text */}
          <div className="absolute flex flex-col gap-10 opacity-[0.15] w-[400%] font-black uppercase text-8xl lg:text-[10rem] tracking-tighter text-black leading-none break-keep whitespace-nowrap" style={{ fontFamily: "'Fredoka', sans-serif" }}>
             <div ref={marqueeRef1} className="w-full">
                RESTRICTED AREA /// SYSTEMS LOCKING DOWN /// RESTRICTED AREA /// SYSTEMS LOCKING DOWN /// RESTRICTED AREA ///
             </div>
             <div ref={marqueeRef2} className="w-full text-[#FF3CAC] opacity-70">
                NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS
             </div>
             <div ref={marqueeRef1} className="w-full" style={{ alignSelf: 'flex-start' }}>
                RESTRICTED AREA /// SYSTEMS LOCKING DOWN /// RESTRICTED AREA /// SYSTEMS LOCKING DOWN /// RESTRICTED AREA ///
             </div>
             <div ref={marqueeRef2} className="w-full text-[#00E5FF] opacity-70">
                NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS /// NO ACCESS
             </div>
             <div ref={marqueeRef1} className="w-full z-0">
                RESTRICTED AREA /// SYSTEMS LOCKING DOWN /// RESTRICTED AREA /// SYSTEMS LOCKING DOWN /// RESTRICTED AREA ///
             </div>
          </div>
       </div>

       {/* LEFT DOOR - CARTOON STYLE */}
       <div ref={leftDoorRef} className="absolute top-0 left-0 w-[50.2%] h-full flex flex-col justify-between overflow-hidden shadow-[15px_0_0_0_rgba(0,0,0,1)] z-10 bg-[#FF3CAC] border-r-[8px] border-black">
          
          {/* Halftone dots overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[length:12px_12px] opacity-[0.15]" />
          
          {/* Yellow Caution Tape Edge Base */}
          <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-32 bg-[#FFE234] border-l-[8px] border-black overflow-hidden flex flex-col justify-center shadow-[-8px_0_0_0_rgba(0,0,0,0.1)]">
             {/* Diagonal Stripes (Sharp and flat) */}
             <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000,#000_20px,transparent_20px,transparent_40px)] opacity-100" />
             <div className="absolute top-0 right-0 w-[8px] h-full bg-white opacity-40" />
          </div>

          {/* Screws / Rivets (Cartoonish) */}
          <div className="absolute right-40 top-16 w-10 h-10 rounded-full bg-white border-[4px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
              <div className="w-5 h-[4px] bg-black rotate-45 rounded-full" />
          </div>
          <div className="absolute right-40 bottom-16 w-10 h-10 rounded-full bg-white border-[4px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
              <div className="w-5 h-[4px] bg-black rotate-[20deg] rounded-full" />
          </div>
          
          {/* Interlocking Teeth Left */}
          <div className="absolute top-1/4 -right-[4px] w-12 h-32 bg-[#FF6B00] border-[6px] border-black rounded-l-2xl z-10 shadow-[-6px_6px_0_0_rgba(0,0,0,0.2)]" />
          <div className="absolute bottom-1/4 -right-[4px] w-12 h-32 bg-[#FF6B00] border-[6px] border-black rounded-l-2xl z-10 shadow-[-6px_6px_0_0_rgba(0,0,0,0.2)]" />
       </div>

       {/* RIGHT DOOR - CARTOON STYLE */}
       <div ref={rightDoorRef} className="absolute top-0 right-0 w-[50.2%] h-full flex flex-col justify-between overflow-hidden shadow-[-15px_0_0_0_rgba(0,0,0,1)] z-10 bg-[#00E5FF] border-l-[8px] border-black">
          
          <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[length:12px_12px] opacity-[0.15]" />
          
          <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-32 bg-[#FFE234] border-r-[8px] border-black overflow-hidden flex flex-col justify-center shadow-[8px_0_0_0_rgba(0,0,0,0.1)]">
             <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#000,#000_20px,transparent_20px,transparent_40px)] opacity-100" />
             <div className="absolute top-0 left-0 w-[8px] h-full bg-white opacity-40" />
          </div>

          {/* Screws / Rivets */}
          <div className="absolute left-40 top-16 w-10 h-10 rounded-full bg-white border-[4px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
              <div className="w-5 h-[4px] bg-black rotate-[60deg] rounded-full" />
          </div>
          <div className="absolute left-40 bottom-16 w-10 h-10 rounded-full bg-white border-[4px] border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
              <div className="w-5 h-[4px] bg-black rotate-[-10deg] rounded-full" />
          </div>

          {/* Interlocking Teeth Right */}
          <div className="absolute top-[35%] -left-[4px] w-12 h-32 bg-[#39FF14] border-[6px] border-black rounded-r-2xl z-10 shadow-[6px_6px_0_0_rgba(0,0,0,0.2)]" />
       </div>

       {/* CENTRAL HEAVY LOCK MODULE - CARTOON STYLE */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div ref={lockRef} className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center">
             
             {/* Main Solid Base Plate */}
             <div className="absolute inset-0 rounded-full bg-white border-[8px] border-black shadow-[15px_15px_0_0_rgba(0,0,0,1)]" />
             
             {/* Secondary Recessed Ring */}
             <div className="absolute inset-6 rounded-full bg-[#FFE234] border-[6px] border-black shadow-[inset_6px_6px_0_0_rgba(0,0,0,0.3)]" />

             {/* Spinning Locking Ring Mechanism */}
             <div ref={lockRingRef} className="absolute inset-8 rounded-full border-[20px] border-[#FF6B00] border-x-black border-dashed opacity-100" style={{ borderDasharray: "30 20" }} />
             
             {/* Massive Rotating Vault Gear */}
             <div ref={mainGearRef} className="absolute inset-16 flex items-center justify-center bg-white border-[6px] border-black rounded-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] z-10">
                <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] text-[#BF5AF2]">
                   <polygon fill="currentColor" stroke="black" strokeWidth="4" strokeLinejoin="round" points="50,0 60,15 85,15 85,40 100,50 85,60 85,85 60,85 50,100 40,85 15,85 15,60 0,50 15,40 15,15 40,15" />
                   <circle cx="50" cy="50" r="30" fill="white" stroke="black" strokeWidth="4" />
                </svg>
             </div>

             {/* Central Digital Core Lens */}
             <div className="absolute inset-[110px] lg:inset-[130px] rounded-full bg-black border-[6px] border-black flex items-center justify-center z-30 shadow-[inner_5px_5px_0_0_rgba(255,255,255,0.2)]">
                {/* Glowing LED Status Indicator */}
                <div ref={indicatorRef} className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-red-500 border-[4px] border-black" />
                
                {/* Lens Gloss Overlay (Stylized) */}
                <div className="absolute top-2 w-8 h-3 bg-white opacity-80 rounded-full" />
             </div>

             {/* Dynamic Status Text overlaying the lock base */}
             <div ref={textRef} className="absolute -bottom-20 bg-white border-[6px] border-black px-8 py-3 rounded-2xl shadow-[10px_10px_0_0_rgba(0,0,0,1)] opacity-0 -translate-y-8 rotate-[-2deg]">
                <span className="text-black font-['Fredoka',sans-serif] font-black uppercase text-xl lg:text-2xl italic tracking-tighter">SECURED! 🔒</span>
             </div>

             {/* Structural Ring Bolts */}
             {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                 <div key={deg} className="absolute w-6 h-6 lg:w-8 lg:h-8 bg-white border-[4px] border-black rounded-full shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex items-center justify-center" style={{
                     transform: `rotate(${deg}deg) translateY(-145px) rotate(-${deg}deg)`
                 }}>
                     <div className="w-3 h-[4px] bg-black rotate-45 rounded-sm" />
                 </div>
             ))}

          </div>
       </div>

    </div>
  );
}
