"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, // Sedikit dilambatkan biar seirama
          ease: "power3.out", 
          delay: 1.1 // Wajib 1.1 detik (menunggu tirai selesai naik + jeda)
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}