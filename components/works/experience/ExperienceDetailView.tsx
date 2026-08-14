"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Experience } from "@/libs/works";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceDetailView({ exp }: { exp: Experience }) {
  const rootRef = useRef<HTMLElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  /* entrance: back link, meta, description, lalu tiap section body */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".ed-back", { opacity: 0, y: -8, duration: 0.4 })
        .from(".ed-title", { opacity: 0, y: 24, duration: 0.6 }, "-=0.2")
        .from(".ed-meta", { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, "-=0.35")
        .from(".ed-description", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* tiap section (Website / Graphic Design / Video Editing) reveal pas discroll,
     replay dua arah — pola yang sama kayak section lain di web ini */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".ed-section");
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll(".ed-section-heading"), {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      const items = gsap.utils.toArray<HTMLElement>(".ed-item");
      if (items.length > 0) {
        gsap.set(items, { opacity: 0, y: 28 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          end: "bottom 10%",
          onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", overwrite: true }),
          onEnterBack: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", overwrite: true }),
          onLeave: (b) => gsap.to(b, { opacity: 0, y: -28, duration: 0.4, stagger: 0.03, ease: "power2.in", overwrite: true }),
          onLeaveBack: (b) => gsap.to(b, { opacity: 0, y: 28, duration: 0.4, stagger: 0.03, ease: "power2.in", overwrite: true }),
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* parallax float buat gallery design — sama pola kayak gallery di halaman website detail */
  useLayoutEffect(() => {
    if (!exp.designs?.length) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        designRef.current?.querySelectorAll(".ed-design-item") ?? []
      );
      items.forEach((item) => {
        const inner = item.querySelector(".ed-design-inner");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      });
    }, designRef);
    return () => ctx.revert();
  }, [exp.designs]);

  return (
    <section
      ref={rootRef}
      className="w-full bg-neutral-950 text-neutral-50 px-6 md:px-12 py-24 md:py-32 font-[var(--font-second)]"
    >
      <Link
        href="/"
        className="ed-back inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
      >
        ← Back
      </Link>

      <div className="mt-8 mb-6">
        <h1 className="ed-title font-[var(--font-primary)] font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.95]">
          {exp.company}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
        <span className="ed-meta text-sm uppercase tracking-wider text-neutral-400">{exp.role}</span>
        <span className="ed-meta text-sm uppercase tracking-wider text-neutral-600">{exp.year}</span>
      </div>

      <p className="ed-description text-neutral-300 text-lg leading-relaxed w-full md:w-[90%] text-justify mb-20">
        {exp.description}
      </p>

      {/* WEBSITE */}
      {exp.websites?.length ? (
        <div className="ed-section mb-20">
          <h2 className="ed-section-heading text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
            Website
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-950">
            {exp.websites.map((site) => (
              <Link
                key={site.slug}
                href={`/work/website/${site.slug}`}
                className="ed-item group relative block bg-neutral-950 aspect-video overflow-hidden"
              >
                {site.image[0] && (
                  <Image
                    src={site.image[0]}
                    alt={site.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/30 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 bg-neutral-900/70 backdrop-blur-sm text-sm">
                  <span className="font-medium">{site.name}</span>
                  <span className="text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* GRAPHIC DESIGN */}
      {exp.designs?.length ? (
        <div className="ed-section mb-20">
          <h2 className="ed-section-heading text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
            Graphic Design
          </h2>
          <div ref={designRef} className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-950">
            {exp.designs.map((img, idx) => (
              <button
                key={img}
                onClick={() => setLightboxIdx(idx)}
                className="ed-item ed-design-item relative aspect-square bg-neutral-950 overflow-hidden group"
              >
                <div className="ed-design-inner absolute inset-x-0 -top-[15%] h-[130%]">
                  <Image
                    src={img}
                    alt={`${exp.company} design ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* VIDEO EDITING */}
      {exp.videos?.length ? (
        <div className="ed-section mb-4">
          <h2 className="ed-section-heading text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
            Video Editing
          </h2>
          <div className="border-t border-neutral-800">
            {exp.videos.map((v, idx) => (
              <a
                key={v.url + idx}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-item group flex items-center justify-between gap-4 border-b border-neutral-800 py-6 text-neutral-50 transition-colors duration-300 hover:bg-neutral-50 hover:text-neutral-900 hover:px-4"
              >
                <span>
                  <span className="font-[var(--font-primary)] font-bold text-lg md:text-xl block">
                    Video Folder {idx + 1}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 group-hover:text-neutral-600">
                    Google Drive
                  </span>
                </span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {/* lightbox untuk gallery design */}
      {lightboxIdx !== null && exp.designs?.[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 flex items-center justify-center p-6"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 text-neutral-50 text-2xl"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative w-full max-w-3xl aspect-[4/5]">
            <Image
              src={exp.designs[lightboxIdx]}
              alt="Design full view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* footer nav */}
      <div className="mt-16 pt-8 border-t border-neutral-800">
        <Link href="/#work" className="text-sm text-neutral-500 hover:text-neutral-50 transition-colors">
          ← All Work
        </Link>
      </div>
    </section>
  );
}