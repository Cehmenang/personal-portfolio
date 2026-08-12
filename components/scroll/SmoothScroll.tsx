"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    // 2. Sinkronisasi dengan ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // 3. Gunakan requestAnimationFrame bawaan browser (lebih efisien secara resource)
    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    
    rafId = requestAnimationFrame(raf)

    return () => {
      // 4. Cleanup yang bersih
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}