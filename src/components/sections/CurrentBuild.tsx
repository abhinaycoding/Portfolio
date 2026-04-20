"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CurrentBuild() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 border-b border-[#111]" ref={ref}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Sticky Label */}
        <div className="md:w-1/4">
          <div className="sticky top-32 text-sm font-medium text-[#666] flex items-center gap-4">
            <span className="w-4 h-px bg-[#333]" />
            Now
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 md:p-8 rounded-xl border border-[#1a1a1a] bg-[#080808] relative overflow-hidden group"
          >
            {/* Background minimal radial */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white opacity-[0.015] blur-[80px] pointer-events-none group-hover:opacity-[0.03] transition-opacity duration-1000" />
            
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ededed]"></span>
              </span>
              <span className="text-sm font-medium tracking-wide uppercase text-[#ededed]">
                Current focus
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
              AI Automations & Graph Tooling
            </h3>
            
            <p className="text-[#888] leading-relaxed max-w-lg mb-6">
              Building localized LLM workflows that integrate deeply with business systems. Focusing on deterministic outputs and highly snappy user interfaces for complex data visualization.
            </p>

            <a 
              href="https://github.com/abhinay" 
              className="inline-flex items-center gap-2 text-sm text-[#ededed] hover:text-white hover-underline pb-0.5"
            >
              See activity on GitHub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
