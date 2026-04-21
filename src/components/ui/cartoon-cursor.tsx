"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CartoonCursor() {
  const [mounted, setMounted] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Main cursor — snappy
  const cursorX = useSpring(rawX, { stiffness: 700, damping: 35, mass: 0.4 });
  const cursorY = useSpring(rawY, { stiffness: 700, damping: 35, mass: 0.4 });

  // Trailing dot — sluggish, lags behind
  const dotX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 1 });
  const dotY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 1 });

  // Only show on desktop — don't render on touch devices
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [role='button'], input, label, select, textarea, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mounted, rawX, rawY]);

  if (!mounted) return null;

  return (
    <>
      {/* Main Cursor — cartoon rounded square that morphs */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.55 : hovering ? 1.7 : 1,
            borderRadius: clicking ? "6px" : hovering ? "12px" : "50%",
            backgroundColor: clicking ? "#FF3CAC" : hovering ? "#FFE234" : "#ffffff",
            rotate: clicking ? -10 : hovering ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 28 }}
          className="w-7 h-7 border-[3px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
          style={{ willChange: "transform, border-radius, background-color" }}
        />
      </motion.div>

      {/* Trailing Dot — lazy lagger */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 2.5 : hovering ? 0.4 : 1,
            backgroundColor: hovering ? "#39FF14" : "#FFE234",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="w-2.5 h-2.5 rounded-full border-[2px] border-black"
          style={{ willChange: "transform, background-color" }}
        />
      </motion.div>
    </>
  );
}
