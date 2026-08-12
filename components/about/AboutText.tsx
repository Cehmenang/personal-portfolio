"use client"

import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

const abouts = [
  "I'm Cehwin, a fullstack developer who likes understanding the full picture before writing a single line of code. I'm the type who'll dig into an edge case until it actually makes sense, not just until it stops throwing errors — debugging is half the job, and I don't mind spending time there.",
  "I work best with a clear structure: separating concerns properly, keeping frontend and backend decoupled, and building things in a way my future self won't hate. I lean toward simplicity over cleverness, and I'd rather ship something solid than something flashy that breaks in three months.",
  "I pick up new things fast, and I'm currently diving into AI integration — exploring RAG pipelines and how they can fit into real, production-level applications. Curious by nature, comfortable moving between frontend and backend, and always down to learn a new tool if it genuinely solves a problem."
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
    <div ref={containerRef} className="flex flex-col gap-y-10">
      {abouts.map((abt, idx) => (
        <p
          key={idx}
          className="split text-justify text-[24px] font-primary tracking-tight text-neutral-50">
          {abt}
        </p>
      ))}
    </div>
  )
}