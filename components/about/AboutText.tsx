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
    offset: "left-0 top-0",
  },
  {
    number: "02",
    label: "Structure",
    text: "I work best with a clear structure: separating concerns properly, keeping frontend and backend decoupled, and building things in a way my future self won't hate. I lean toward simplicity over cleverness, and I'd rather ship something solid than something flashy that breaks in three months.",
    offset: "left-[50%] top-[50%]",
  },
  {
    number: "03",
    label: "Curiosity",
    text: "I pick up new things fast, and I'm currently diving into AI integration — exploring RAG pipelines and how they can fit into real, production-level applications. Curious by nature, comfortable moving between frontend and backend, and always down to learn a new tool if it genuinely solves a problem.",
    offset: "right-0 bottom-0",
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
    <div ref={containerRef} className="flex flex-col gap-y-14 md:gap-y-6 relative">
      {abouts.map((abt, idx) => (
        <div
          key={idx}
          className={`flex flex-col sm:flex-row gap-4 sm:gap-8 absolute ${abt.offset} right-0`}
        >
          <p className="split text-justify font-second text-base md:text-[22px] leading-relaxed text-neutral-400 tracking-tight">
            {abt.text}
          </p>
        </div>
      ))}
    </div>
  )
}