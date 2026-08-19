"use client"

import gsap from "gsap"
import { useEffect } from "react"
import ShaderBackground from "./Shader"
import Link from "next/link"
import ImageShader from "./ImageShader"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const front = ["H", "e", "a", "v", "e", "n"]
const back = ["C", "e", "h", "w", "i", "n"]

const contacts = [
  { name: "Instagram", link: "https://www.instagram.com/cehmenang" },
  { name: "Linkedin", link: "https://www.linkedin.com/in/heaven-cehwin-703896238" },
  { name: "Github", link: "https://github.com/Cehmenang" },
]

export default function BaseName() {

  useEffect(() => {
    const mm = gsap.matchMedia()

    // target fontSize & gap beda per breakpoint
    mm.add(
      {
        isMobile: "(max-width: 639px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const { isMobile, isTablet } = context.conditions as {
          isMobile: boolean
          isTablet: boolean
        }

        const targetFontSize = isMobile ? "40px" : isTablet ? "72px" : "128px"
        const targetGap = isMobile ? "40" : isTablet ? "150" : "300"

        const tl = gsap.timeline()
        tl.from(".front-name", {
          opacity: 0,
          duration: .5,
          stagger: .07,
          y: 30
        })
        .from(".back-name", {
          opacity: 0,
          duration: .5,
          stagger: .07,
          y: 30
        }, "<=.4")
        .to(".base-name-inner", {
          fontSize: targetFontSize,
          duration: 1,
        }, "<=1")
        .addLabel("reveal", "<=1")
        .to(".base-name-inner", {
          gap: targetGap,
          duration: .5,
          ease: "sine"
        }, "reveal")
        .from(".base-shown", {
          rotate: 6,
          scale: 0,
          duration: 1.5,
          ease: "expo.inOut"
        }, "reveal")
        .to(".front-name, .back-name", {
          color: "#ffffff",
          duration: 0.5,
          ease: "sine"
        }, "reveal")
        .fromTo(".contact-item", {
          opacity: 0,
        }, {
          opacity: 1,
          duration: .2,
        })

        return () => {
          tl.kill()
        }
      }
    )

    const parallax = gsap.to(".image-shader-wrapper", {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: ".base",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })

    return () => {
      mm.revert()
      parallax.scrollTrigger?.kill()
      parallax.kill()
    }

  }, [])

  return (
    <div className="base relative bg-neutral-950 h-dvh overflow-hidden">

      <div
        className="base-shown w-full bg-neutral-950 absolute inset-0 brightness-75 hue-shift overflow-hidden"
        style={{
          height: "110dvh",
          maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)"
        }}
      >
        <div className="absolute inset-0 image-shader-wrapper">
          <ImageShader />
        </div>
        <div className="absolute inset-0 mix-blend-screen">
          <ShaderBackground />
        </div>
      </div>

      <div className="base-name w-full h-dvh flex flex-col items-center justify-center absolute px-4">

        <div className="base-name-inner font-primary flex flex-wrap items-center justify-center text-[36px] sm:text-[56px] lg:text-[80px] gap-x-4 sm:gap-x-6 lg:gap-x-10 tracking-tighter text-center">

          <div className="depan flex">
            {front.map((txt: string, idx: number) => (
              <h1 key={idx} className="front-name text-neutral-50 mix-blend-difference">{txt}</h1>
            ))}
          </div>
          <div className="depan flex">
            {back.map((txt: string, idx: number) => (
              <h1 key={idx} className="back-name text-neutral-50 mix-blend-difference">{txt}</h1>
            ))}
          </div>

        </div>

        <div className="contact-me flex flex-col sm:flex-row items-center mt-8 sm:mt-0 gap-3 sm:gap-0 w-full sm:w-auto max-w-xs sm:max-w-none">
          {contacts.map((ctx, idx) => {
            const offsetY = idx % 2 === 0 ? "sm:translate-y-2" : "sm:-translate-y-2"
            return (
              <Link
                key={idx}
                href={ctx.link}
                target="_blank"
                className={`contact-item text-neutral-50 font-primary tracking-tight border-2 border-neutral-50 py-1 w-full sm:w-72 text-center rounded-full text-[16px] sm:text-[20px] mix-blend-difference transition ${offsetY} ${idx !== 0 ? "sm:-ml-10" : ""} ${idx % 2 == 0 ? "hover:bg-neutral-50 hover:text-neutral-950" : "bg-neutral-50 text-neutral-950 hover:bg-neutral-800/20 hover:text-neutral-50"}`}
              >
                {ctx.name}
              </Link>
            )
          })}
        </div>

      </div>

    </div>
  )
}