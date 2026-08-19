"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  itemSelector: string,
  yOffset = 24
) {
  const containerRef = useRef<T>(null);

  useLayoutEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(
      containerRef.current?.querySelectorAll(itemSelector) ?? []
    );
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: yOffset });

      ScrollTrigger.batch(items, {
        start: "top 90%",
        end: "bottom 10%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out", overwrite: true }),
        onEnterBack: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power3.out", overwrite: true }),
        onLeave: (batch) =>
          gsap.to(batch, { opacity: 0, y: -yOffset, duration: 0.35, stagger: 0.03, ease: "power2.in", overwrite: true }),
        onLeaveBack: (batch) =>
          gsap.to(batch, { opacity: 0, y: yOffset, duration: 0.35, stagger: 0.03, ease: "power2.in", overwrite: true }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, [itemSelector, yOffset]);

  return containerRef;
}