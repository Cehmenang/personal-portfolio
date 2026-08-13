"use client";

import { useRef, useLayoutEffect, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlatWebsite } from "@/libs/works";

gsap.registerPlugin(ScrollTrigger);

const AUTO_SLIDE_MS = 4000;
const FEATURES_PER_PAGE = 5;

export default function WebsiteDetailView({ site }: { site: FlatWebsite }) {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const featuresBoxRef = useRef<HTMLDivElement>(null);
  // 1. Tambahkan ref untuk list fitur
  const featureListRef = useRef<HTMLUListElement>(null);

  const images = site.image;
  const hasMultiple = images.length > 1;
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => {
    const total = images.length;
    const next = ((idx % total) + total) % total;
    if (next === current) return;

    const el = heroImgRef.current;
    if (!el) {
      setCurrent(next);
      return;
    }

    gsap.to(el, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(next);
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      },
    });
  };

  useEffect(() => {
    if (!hasMultiple) return;
    const t = setInterval(() => goTo(current + 1), AUTO_SLIDE_MS);
    return () => clearInterval(t);
  }, [current, hasMultiple]);

  const featureList = useMemo(
    () =>
      site.feature
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    [site.feature]
  );

  const featurePages = useMemo(() => {
    const pages: string[][] = [];
    for (let i = 0; i < featureList.length; i += FEATURES_PER_PAGE) {
      pages.push(featureList.slice(i, i + FEATURES_PER_PAGE));
    }
    return pages.length > 0 ? pages : [[]];
  }, [featureList]);

  const [featurePage, setFeaturePage] = useState(0);
  // 2. State penjaga agar tidak bisa spam klik saat animasi berjalan
  const [isAnimatingFeature, setIsAnimatingFeature] = useState(false);
  const hasMultiplePages = featurePages.length > 1;

  const goToFeaturePage = (idx: number) => {
    if (isAnimatingFeature) return;
    const total = featurePages.length;
    const next = ((idx % total) + total) % total;
    if (next === featurePage) return;

    setIsAnimatingFeature(true);

    const items = featureListRef.current?.querySelectorAll("li");
    
    // 3. Animasi keluar (slide ke atas & fade out) sebelum pindah halaman
    if (items && items.length > 0) {
      gsap.to(items, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => {
          setFeaturePage(next);
        },
      });
    } else {
      setFeaturePage(next);
    }
  };

  // 4. Animasi masuk (dari bawah & fade in) tiap kali `featurePage` berubah (halaman baru dirender)
  useLayoutEffect(() => {
    const items = featureListRef.current?.querySelectorAll("li");
    if (!items || items.length === 0) {
      setIsAnimatingFeature(false);
      return;
    }

    gsap.fromTo(
      items,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
        onComplete: () => setIsAnimatingFeature(false),
      }
    );
  }, [featurePage]);

  // samain tinggi box Features dengan tinggi hero image
  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    const featuresEl = featuresBoxRef.current;
    if (!heroEl || !featuresEl) return;

    const syncHeight = () => {
      featuresEl.style.maxHeight = `${heroEl.offsetHeight}px`;
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    ro.observe(heroEl);
    return () => ro.disconnect();
  }, [images.length]);

  /* entrance: back link, title, summary/CTA, stack, hero, features */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".wd-back", { opacity: 0, y: -8, duration: 0.4 })
        .from(".wd-title", { opacity: 0, y: 24, duration: 0.6 }, "-=0.2")
        .from(".wd-meta", { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 }, "-=0.35")
        .fromTo(
          heroRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          "-=0.3"
        )
        .from(".wd-body-item", { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* gallery */
  useLayoutEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(
      galleryRef.current?.querySelectorAll(".wd-gallery-item") ?? []
    );
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 32 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        end: "bottom 10%",
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", overwrite: true }),
        onEnterBack: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", overwrite: true }),
        onLeave: (b) => gsap.to(b, { opacity: 0, y: -32, duration: 0.4, stagger: 0.03, ease: "power2.in", overwrite: true }),
        onLeaveBack: (b) => gsap.to(b, { opacity: 0, y: 32, duration: 0.4, stagger: 0.03, ease: "power2.in", overwrite: true }),
      });

      items.forEach((item) => {
        const inner = item.querySelector(".wd-gallery-inner");
        if (!inner) return;

        gsap.fromTo(
          inner,
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [images.length]);

  return (
    <section
      ref={rootRef}
      className="w-full bg-neutral-950 text-neutral-50 px-6 md:px-12 py-24 md:py-32 font-[var(--font-second)]"
    >
      <Link
        href={`/work/${site.companySlug}`}
        className="wd-back inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
      >
        ← {site.company}
      </Link>

      <div className="mt-8 mb-8">
        <span className="block text-sm tracking-[0.2em] uppercase text-neutral-500 mb-3">
          {site.company}
        </span>
        <h1 className="wd-title font-[var(--font-primary)] font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.95]">
          {site.name}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 gap-y-6 md:gap-y-0 md:gap-10 items-start mb-8">
        <p className="wd-meta md:col-span-2 text-neutral-500 text-sm md:text-md leading-relaxed text-justify whitespace-pre-line">
          {site.summary}
        </p>
        {site.url && (
          <div className="wd-meta md:justify-self-end">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-50 text-neutral-900 text-sm font-medium hover:bg-neutral-200 transition-colors whitespace-nowrap"
            >
              Visit Live Site ↗
            </a>
          </div>
        )}
      </div>

      <div className="wd-meta flex flex-wrap gap-3 mb-14">
        {site.stack.map((s) => (
          <span
            key={s}
            className="px-3 py-1 rounded-full border border-neutral-700 text-neutral-300 text-xs md:text-sm"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
        <div className="md:col-span-2">
          {images.length > 0 && (
            <div ref={heroRef} className="relative w-full aspect-video overflow-hidden bg-neutral-950 group">
              <div ref={heroImgRef} className="absolute inset-0">
                <Image
                  src={images[current]}
                  alt={`${site.name} — ${current + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
              </div>

              {hasMultiple && (
                <>
                  <button
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-950/60 text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-neutral-950/90"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => goTo(current + 1)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-950/60 text-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-neutral-950/90"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {images.map((img, idx) => (
                      <button
                        key={img}
                        onClick={() => goTo(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === current ? "w-6 bg-neutral-50" : "w-1.5 bg-neutral-50/40 hover:bg-neutral-50/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="wd-body-item flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500">Features</h2>
            {hasMultiplePages && (
              <span className="text-xs text-neutral-600">
                {featurePage + 1}/{featurePages.length}
              </span>
            )}
          </div>

          <div ref={featuresBoxRef} className="overflow-hidden">
            {/* 5. Attach ref ke elemen ul ini */}
            <ul ref={featureListRef} className="space-y-1">
              {featurePages[featurePage].map((f) => (
                <li
                  key={f}
                  className="text-sm md:text-[16px] flex items-start gap-2 text-neutral-300 leading-relaxed border-b border-b-neutral-800 py-3 capitalize opacity-0" // default opacity-0 agar animasi masuknya smooth pas awal render
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {hasMultiplePages && (
            <div className="flex items-center justify-between mt-auto pt-4">
              <button
                onClick={() => goToFeaturePage(featurePage - 1)}
                aria-label="Previous features"
                className="text-sm text-neutral-500 hover:text-neutral-50 transition-colors disabled:opacity-50"
                disabled={isAnimatingFeature}
              >
                ‹ Prev
              </button>
              <div className="flex items-center gap-1.5">
                {featurePages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToFeaturePage(idx)}
                    aria-label={`Go to features page ${idx + 1}`}
                    disabled={isAnimatingFeature}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === featurePage ? "w-5 bg-neutral-50" : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => goToFeaturePage(featurePage + 1)}
                aria-label="Next features"
                className="text-sm text-neutral-500 hover:text-neutral-50 transition-colors disabled:opacity-50"
                disabled={isAnimatingFeature}
              >
                Next ›
              </button>
            </div>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">Gallery</h2>
          <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-950">
            {images.map((img, idx) => (
              <button
                key={img}
                onClick={() => goTo(idx)}
                className={`wd-gallery-item relative aspect-video bg-neutral-950 overflow-hidden ${
                  idx === current ? "ring-2 ring-inset ring-neutral-50" : ""
                }`}
              >
                <div className="wd-gallery-inner absolute inset-x-0 -top-[15%] h-[130%]">
                  <Image
                    src={img}
                    alt={`${site.name} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-24 pt-8 border-t border-neutral-800 flex items-center justify-between">
        <Link href="/#work" className="text-sm text-neutral-500 hover:text-neutral-50 transition-colors">
          ← All Work
        </Link>
        <Link
          href={`/work/${site.companySlug}`}
          className="text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
        >
          Back to {site.company} →
        </Link>
      </div>
    </section>
  );
}