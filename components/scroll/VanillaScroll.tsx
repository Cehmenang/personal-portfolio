"use client"
import { useEffect, useRef } from "react"

export default function VanillaScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Bikin body punya height yang sama dengan konten kita
    // biar scrollbar native tetep muncul
    const setBodyHeight = () => {
      document.body.style.height = `${wrapper.getBoundingClientRect().height}px`
    }
    setBodyHeight()
    window.addEventListener("resize", setBodyHeight)

    // Variabel untuk animasi
    let currentY = 0
    let targetY = 0
    const ease = 0.08 // Semakin kecil, semakin smooth/lambat (0.01 - 0.1)

    // Rumus LERP (Linear Interpolation)
    const lerp = (start: number, end: number, factor: number) => {
      return start * (1 - factor) + end * factor
    }

    // Fungsi render yang jalan 60x per detik
    const render = () => {
      targetY = window.scrollY
      // Hitung posisi baru perlahan-lahan mendekati target
      currentY = lerp(currentY, targetY, ease)
      
      // Geser div konten pakai transform GPU
      wrapper.style.transform = `translate3d(0, -${currentY}px, 0)`
      
      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", setBodyHeight)
      document.body.style.height = ""
    }
  }, [])

  return (
    <>
      <div 
        ref={wrapperRef} 
        className="fixed top-0 left-0 w-full overflow-hidden will-change-transform"
      >
        {children}
      </div>
    </>
  )
}