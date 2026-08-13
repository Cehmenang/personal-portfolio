"use client"

import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

const abouts = [
  {
    number: "01",
    label: "Approach",
    text: "As a Full-stack Developer specializing in the JavaScript/TypeScript ecosystem, React, Next.js, and Laravel, I build scalable end-to-end web applications. I focus on clean architecture and seamless separation of concerns, managing everything from REST APIs and MySQL databases to complex integrations like authentication and payment gateways.",
    offset: "",
  },
  {
    number: "02",
    label: "Develop",
    text: "I prioritize understanding the big picture before coding, favoring simple, maintainable solutions over fragile workarounds. Adaptable and meticulous in debugging, I thrive both independently and in teams, and I am currently expanding my skill set by integrating AI and RAG pipelines into production-ready systems.",
    offset: "ml-10",
  }
]

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function AboutText() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraphs = gsap.utils.toArray(".split")

      paragraphs.forEach((el: any) => {
        gsap.set(el, { opacity: 1 })

        SplitText.create(el, {
          type: "words, lines",
          linesClass: "line",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            return gsap.from(self.lines, {
              yPercent: 100,
              opacity: 0,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 30%",
                scrub: 1,
              },
            })
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col gap-y-14 md:gap-y-6">
      {abouts.map((abt, idx) => (
        <div
          key={idx}
          className={`flex flex-col sm:flex-row gap-4 sm:gap-8 ${abt.offset}`}
        >
          <p className="split text-justify font-second text-base md:text-[20px] leading-loose text-neutral-400 tracking-tight">
            {abt.text}
          </p>
        </div>
      ))}
    </div>
  )
}