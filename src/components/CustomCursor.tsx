"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12);

      cursor.style.transform = `translate3d(${posRef.current.x - 4}px, ${posRef.current.y - 4}px, 0)`;
      ring.style.transform = `translate3d(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => {
      cursor.classList.add("scale-150");
      ring.classList.add("scale-150", "opacity-0");
    };

    const onLeaveInteractive = () => {
      cursor.classList.remove("scale-150");
      ring.classList.remove("scale-150", "opacity-0");
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Core dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full pointer-events-none"
        style={{ background: "linear-gradient(135deg, #00E5FF, #FFE234)" }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] w-10 h-10 rounded-full pointer-events-none border"
        style={{
          border: "1px solid rgba(0, 229, 255, 0.5)",
          boxShadow: "0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 10px rgba(255, 226, 52, 0.1)",
        }}
      />
    </>
  );
}
