"use client"

import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

const abouts = [
  {
    number: "01",
    label: "Approach",
    text: "I'm Cehwin, a fullstack developer who likes understanding the full picture before writing a single line of code. I'm the type who'll dig into an edge case until it actually makes sense, not just until it stops throwing errors — debugging is half the job, and I don't mind spending time there.",
    offset: "",
  },
  {
    number: "02",
    label: "Structure",
    text: "I work best with a clear structure: separating concerns properly, keeping frontend and backend decoupled, and building things in a way my future self won't hate. I lean toward simplicity over cleverness, and I'd rather ship something solid than something flashy that breaks in three months.",
    offset: "md:mt-16 md:pl-10",
  },
  {
    number: "03",
    label: "Curiosity",
    text: "I pick up new things fast, and I'm currently diving into AI integration — exploring RAG pipelines and how they can fit into real, production-level applications. Curious by nature, comfortable moving between frontend and backend, and always down to learn a new tool if it genuinely solves a problem.",
    offset: "md:mt-6 md:pl-4",
  },
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
          className={`flex flex-col sm:flex-row gap-4 sm:gap-8 max-w-2xl ${abt.offset}`}
        >
          <div className="flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1 shrink-0 sm:w-24">
            <span className="font-primary font-extrabold text-lg text-neutral-600">
              {abt.number}
            </span>
            <span className="text-xs uppercase tracking-wider text-neutral-400">
              {abt.label}
            </span>
          </div>

          <p className="split text-justify font-second text-base md:text-lg leading-relaxed text-neutral-200 tracking-tight">
            {abt.text}
          </p>
        </div>
      ))}
    </div>
  )
}