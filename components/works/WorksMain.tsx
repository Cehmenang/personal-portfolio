"use client";

import { useState, useRef, useLayoutEffect, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCES, flattenDesigns, flattenVideos, flattenWebsites } from "@/libs/works";

gsap.registerPlugin(ScrollTrigger);

type FilterTab = "All" | "Website" | "Graphic Design" | "Video Editing";

const CATEGORIES: FilterTab[] = ["Website", "Graphic Design", "Video Editing"];
const ITEMS_PER_PAGE = 6;

export default function WorksMain() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgLabelsRef = useRef<HTMLDivElement>(null);

  const websiteItems = useMemo(() => flattenWebsites(), []);
  const designItems = useMemo(() => flattenDesigns(), []);
  const videoItems = useMemo(() => flattenVideos(), []);

  const switchTab = (tab: FilterTab) => {
    setActiveTab(tab);
    setLightboxIdx(null);
    setCurrentPage(1);
  };

  /* header + background label dekoratif */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".works-eyebrow, .works-title", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(".works-bg-label", {
        opacity: 0,
        x: -20,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* reveal item yang lagi tampil */
  useLayoutEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(
      contentRef.current?.querySelectorAll(".reveal-item") ?? []
    );
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 20 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        end: "bottom 10%",
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", overwrite: true }),
        onEnterBack: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", overwrite: true }),
        onLeave: (b) => gsap.to(b, { opacity: 0, y: -20, duration: 0.35, stagger: 0.03, ease: "power2.in", overwrite: true }),
        onLeaveBack: (b) => gsap.to(b, { opacity: 0, y: 20, duration: 0.35, stagger: 0.03, ease: "power2.in", overwrite: true }),
      });
    }, contentRef);

    return () => ctx.revert();
  }, [activeTab, currentPage]);

  /* lock scroll halaman utama selama lightbox kebuka */
  useEffect(() => {
    if (lightboxIdx !== null) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [lightboxIdx]);

  // Kalkulasi Pagination untuk Graphic Design
  const totalDesignPages = Math.ceil(designItems.length / ITEMS_PER_PAGE);
  const currentDesignItems = designItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-neutral-950 text-neutral-50 px-6 md:px-12 my-40 md:my-10 py-24 md:py-32 overflow-hidden font-[var(--font-second)]"
    >
      {/* decorative background category stack */}
      <div
        ref={bgLabelsRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-24 right-6 md:right-12 text-right hidden md:block"
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className={`works-bg-label font-[var(--font-primary)] font-extrabold uppercase leading-[0.95] tracking-tight transition-colors duration-300 text-4xl lg:text-6xl ${
              activeTab === cat ? "text-neutral-50" : "text-neutral-800"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* header */}
      <div className="relative z-10 mb-14 md:mb-20">
        <span className="works-eyebrow block text-sm tracking-[0.2em] uppercase text-neutral-400 mb-3">
          Selected Works
        </span>
        <h2 className="works-title font-[var(--font-primary)] font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight">
          {activeTab === "All" ? (
            <span><span className="italic tracking-tighter">Works </span>I Have Done</span>
          ) : (
            activeTab
          )}
        </h2>
      </div>

      {/* menu */}
      <div className="relative z-10 flex flex-wrap gap-3 mb-10 md:mb-14">
        {(["All", "Website", "Graphic Design", "Video Editing"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-300 ${
              activeTab === tab
                ? "bg-neutral-50 text-neutral-900 border-neutral-50"
                : "bg-transparent text-neutral-300 border-neutral-700 hover:border-neutral-400 hover:text-neutral-50"
            }`}
          >
            {tab === "All" ? "My Works" : tab}
          </button>
        ))}
      </div>

      <div ref={contentRef} className="relative z-10">
        {/* ALL */}
        {activeTab === "All" && (
          <div className="border-t border-neutral-800">
            {EXPERIENCES.map((exp, idx) => (
              <ExperienceRow key={exp.slug} exp={exp} number={String(idx + 1).padStart(2, "0")} />
            ))}
          </div>
        )}

        {/* WEBSITE */}
        {activeTab === "Website" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-950">
            {websiteItems.length === 0 && <EmptyState label="website" />}
            {websiteItems.map((site) => (
              <Link
                key={site.slug}
                href={`/work/website/${site.slug}`}
                // Di sini class aspect-[4/3] diubah menjadi aspect-video (16:9)
                className="reveal-item group relative block bg-neutral-950 aspect-video overflow-hidden"
              >
                {site.image[0] && (
                  <Image
                    src={site.image[0]}
                    alt={site.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 bg-neutral-900/70 backdrop-blur-sm text-sm">
                  <span className="min-w-0">
                    <span className="font-medium text-neutral-50 block truncate">{site.name}</span>
                    <span className="text-xs text-neutral-400">{site.company}</span>
                  </span>
                  <span className="text-neutral-400 shrink-0">↗</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* GRAPHIC DESIGN */}
        {activeTab === "Graphic Design" && (
          <>
            {designItems.length === 0 ? (
              <EmptyState label="graphic design" />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-950">
                  {currentDesignItems.map((d, idx) => {
                    const realIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx;
                    
                    return (
                      <button
                        key={`${d.companySlug}-${d.image}-${realIdx}`}
                        onClick={() => setLightboxIdx(realIdx)}
                        className="reveal-item relative aspect-square bg-neutral-950 overflow-hidden group"
                      >
                        <Image
                          src={d.image}
                          alt={`${d.company} design ${realIdx + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-end bg-neutral-900/0 group-hover:bg-neutral-900/50 transition-colors duration-500 p-3 opacity-0 group-hover:opacity-100">
                          <span className="text-xs uppercase tracking-wider">{d.company}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalDesignPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12 mb-4">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium border border-neutral-700 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Prev
                    </button>
                    
                    <span className="text-sm text-neutral-400 font-medium tracking-widest">
                      {currentPage} <span className="mx-1">/</span> {totalDesignPages}
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalDesignPages, p + 1))}
                      disabled={currentPage === totalDesignPages}
                      className="px-4 py-2 text-sm font-medium border border-neutral-700 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* VIDEO EDITING */}
        {activeTab === "Video Editing" && (
          <div className="border-t border-neutral-800">
            {videoItems.length === 0 && <EmptyState label="video editing" />}
            {videoItems.map((v, idx) => (
              <Link
                key={`${v.companySlug}-${idx}`}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal-item group flex items-center justify-between gap-4 border-b border-neutral-800 py-6 text-neutral-50 transition-colors duration-300 hover:bg-neutral-50 hover:text-neutral-900 hover:px-4"
              >
                <span>
                  <span className="font-[var(--font-primary)] font-bold text-lg md:text-xl block">{v.company}</span>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 group-hover:text-neutral-600">
                    Google Drive Folder
                  </span>
                </span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* lightbox untuk gallery design */}
      {activeTab === "Graphic Design" && lightboxIdx !== null && designItems[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 flex items-center justify-center p-6"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 text-neutral-50 text-2xl z-10"
            aria-label="Close"
          >
            ✕
          </button>

          <div
            className="relative w-[90vw] h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={designItems[lightboxIdx].image}
              alt="Design full view"
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="text-neutral-500 text-sm py-10">Belum ada karya di kategori {label}.</p>;
}

function ExperienceRow({
  exp,
  number,
}: {
  exp: (typeof EXPERIENCES)[number];
  number: string;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);

  const handleEnter = () => {
    gsap.to(rowRef.current, {
      backgroundColor: "var(--color-neutral-50)",
      color: "var(--color-neutral-900)",
      paddingLeft: 24,
      paddingRight: 24,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(rowRef.current, {
      backgroundColor: "rgba(0,0,0,0)",
      color: "var(--color-neutral-50)",
      paddingLeft: 0,
      paddingRight: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <Link
      ref={rowRef}
      href={`/work/${exp.slug}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="reveal-item group flex items-center justify-between gap-4 border-b border-neutral-800 py-6 md:py-8 text-neutral-50"
    >
      <span className="flex items-baseline gap-4 md:gap-8 min-w-0">
        <span className="text-sm text-neutral-500 shrink-0">{number}</span>
        <span className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 min-w-0">
          <span className="font-[var(--font-primary)] font-extrabold text-2xl sm:text-3xl md:text-5xl tracking-tight truncate">
            {exp.company}
          </span>
          <span className="text-sm text-neutral-500 group-hover:text-neutral-600 shrink-0">{exp.role}</span>
        </span>
      </span>

      <span className="flex items-center gap-3 md:gap-6 shrink-0">
        <span className="hidden sm:inline text-xs md:text-sm uppercase tracking-wider text-neutral-500 group-hover:text-neutral-600">
          {exp.year}
        </span>
        <span className="text-lg md:text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          ↗
        </span>
      </span>
    </Link>
  );
}