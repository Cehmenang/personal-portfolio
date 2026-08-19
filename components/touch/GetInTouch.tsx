"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FlutedGlass } from "@paper-design/shaders-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  { value: "web", label: "Web Development" },
  { value: "design", label: "Web Design" },
  { value: "video", label: "Video Editing" },
  { value: "design", label: "Graphic Design" },
]

const WHATSAPP_NUMBER = "6289503138950"

export default function GetInTouch() {
  const [name, setName] = useState("")
  const [service, setService] = useState(services[0].value)

  // DEBUG: set true kalo mau liat garis start/end trigger-nya pas dev
  const SHOW_SCROLLTRIGGER_MARKERS = false

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean }

        if (reduceMotion) {
          gsap.set(".git-header-text, .git-shader-wrapper, .git-field, .git-submit", {
            opacity: 1,
            y: 0,
            scale: 1,
          })
          return
        }

        // shader butuh waktu buat render/resize, refresh biar posisi trigger akurat
        const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300)

        // reveal sekali pas section pertama kali masuk viewport
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".get-in-touch",
            start: "top 85%",
            once: true,
            markers: SHOW_SCROLLTRIGGER_MARKERS,
          },
        })

        tl.from(".git-shader-wrapper", {
          opacity: 0,
          scale: 1.25,
          duration: 1.4,
          ease: "power2.out",
        })
          .from(
            ".git-header-text",
            {
              opacity: 0,
              y: 60,
              duration: 1,
              ease: "expo.out",
            },
            "<=.15"
          )
          .from(
            ".git-field",
            {
              opacity: 0,
              y: 40,
              duration: 0.7,
              stagger: 0.18,
              ease: "power3.out",
            },
            "-=.3"
          )
          .from(
            ".git-submit",
            {
              opacity: 0,
              y: 40,
              scale: 0.9,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=.2"
          )

        const parallax = gsap.fromTo(
          ".git-parallax",
          { yPercent: 0 },
          {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: ".get-in-touch",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              markers: SHOW_SCROLLTRIGGER_MARKERS,
            },
          }
        )

        return () => {
          clearTimeout(refreshTimeout)
          tl.scrollTrigger?.kill()
          tl.kill()
          parallax.scrollTrigger?.kill()
          parallax.kill()
        }
      }
    )

    return () => {
      mm.revert()
    }
  }, [])

  const isValid = name.trim().length > 0

  const buildWhatsAppLink = () => {
    const serviceLabel = services.find((s) => s.value === service)?.label ?? ""
    const message = `Hello, my name is ${name.trim()}, and I need your service for ${serviceLabel}. Please reply to my message as soon as possible, thank you.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    window.open(buildWhatsAppLink(), "_blank")
  }

  return (
    <section className="get-in-touch relative bg-neutral-950 w-full overflow-hidden py-16 md:py-10" id="contact">
      <div className="relative w-full h-[140px] sm:h-[170px] lg:h-[200px] flex items-center justify-center overflow-hidden border-t border-b border-neutral-800">
        <div className="git-shader-wrapper absolute inset-0 w-full h-full">
          <FlutedGlass
            width={1280}
            height={200}
            image="/BGGweh.webp"
            colorBack="#7d7d7d00"
            colorShadow="#000000"
            colorHighlight="#ffffff"
            size={0.85}
            shadows={0}
            highlights={0}
            shape="pattern"
            angle={46}
            distortionShape="prism"
            distortion={1}
            shift={-0.14}
            stretch={1}
            blur={1}
            edges={1}
            margin={0}
            grainMixer={0.26}
            grainOverlay={0.23}
            scale={4}
            fit="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h2 className="git-header-text relative z-10 font-primary text-neutral-50 mix-blend-difference text-[32px] sm:text-[48px] lg:text-[72px] tracking-tighter text-center px-4">
          Get In Touch
        </h2>
      </div>

      {/* Form */}
      <div className="w-full flex flex-col items-center py-12 sm:py-20 lg:py-24 px-4 sm:px-6">
        <p className="git-field capitalize font-second text-neutral-400 text-sm sm:text-base text-center max-w-xs sm:max-w-md mb-8 sm:mb-10">
          Tell me your name and what you need, I&apos;ll get your message directly on WhatsApp.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm sm:max-w-md flex flex-col gap-5 sm:gap-6"
        >
          <div className="git-field flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-second text-neutral-500 text-xs uppercase tracking-wide"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Heaven Cehwin"
              className="font-second bg-transparent border-b-2 border-neutral-800 focus:border-neutral-50 outline-none text-neutral-50 placeholder:text-neutral-700 py-2 text-base transition-colors"
              required
            />
          </div>

          <div className="git-field flex flex-col gap-2">
            <label
              htmlFor="service"
              className="font-second text-neutral-500 text-xs uppercase tracking-wide"
            >
              Service Needed
            </label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="font-second bg-neutral-950 border-b-2 border-neutral-800 focus:border-neutral-50 outline-none text-neutral-50 py-2 text-base transition-colors appearance-none cursor-pointer"
            >
              {services.map((s) => (
                <option key={s.value} value={s.value} className="bg-neutral-950">
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="git-submit font-primary tracking-tight border-2 border-neutral-50 py-3 mt-2 sm:mt-4 w-full text-center rounded-full text-[15px] sm:text-[18px] text-neutral-50 transition hover:bg-neutral-50 hover:text-neutral-950 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-50"
          >
            Chat on WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}