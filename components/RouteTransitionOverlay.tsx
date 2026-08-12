"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function RouteTransitionOverlay() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const el = overlayRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    const tl = gsap.timeline();

    tl.set(el, { scaleY: 0, transformOrigin: "bottom" })
      // Durasi naik diperlambat jadi 0.9 detik
      .to(el, { scaleY: 1, duration: 0.9, ease: "power3.inOut" }) 
      .set(el, { transformOrigin: "top" })
      // Durasi turun 0.9 detik, dengan jeda (delay) 0.2 detik
      .to(el, { scaleY: 0, duration: 0.9, ease: "power3.inOut", delay: 0.2 }); 
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{ transform: "scaleY(0)" }}
      className="fixed inset-0 z-[999] bg-neutral-50 pointer-events-none text-neutral-950 flex justify-center items-center text-[100px]"
    >
        Teleport
    </div>
  );
}