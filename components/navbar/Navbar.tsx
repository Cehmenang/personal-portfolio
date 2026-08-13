"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const HIDE_AFTER_PX = 80; // baru mulai sembunyi setelah scroll sejauh ini
const NAVBAR_OFFSET = 88; // kira-kira tinggi navbar, biar section nggak ketutup pas landing

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const isHidden = useRef(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* hide/show navbar — pakai ScrollTrigger (nyatu ke ticker yang sama dengan
     ScrollTrigger lain di halaman, misal parallax shader di Hero), bukan
     window scroll listener terpisah — biar update-nya sinkron & nggak jank. */
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (isMenuOpen) return; // jangan disembunyiin pas menu mobile lagi kebuka

        const pastThreshold = self.scroll() > HIDE_AFTER_PX;
        const goingDown = self.direction === 1;

        if (goingDown && pastThreshold && !isHidden.current) {
          isHidden.current = true;
          gsap.to(navRef.current, { y: "-100%", duration: 0.45, ease: "power3.out", overwrite: true });
        } else if ((!goingDown || !pastThreshold) && isHidden.current) {
          isHidden.current = false;
          gsap.to(navRef.current, { y: "0%", duration: 0.45, ease: "power3.out", overwrite: true });
        }
      },
    });

    return () => st.kill();
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (isMenuOpen) {
      gsap.to(el, { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true });
      gsap.fromTo(
        el.querySelectorAll(".mobile-link"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(el, { opacity: 0, duration: 0.25, ease: "power2.in", overwrite: true });
    }
  }, [isMenuOpen]);

  // kunci scroll body pas menu mobile lagi kebuka
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* scroll manual ke section — dipanggil tiap klik link hash, TERLEPAS dari
     apakah hash di URL sekarang udah sama atau belum. Native <a href="#x">
     cuma nge-scroll kalau hash-nya BERUBAH, makanya klik link yang sama dua
     kali nggak ngapa-ngapain kalau diserahin ke browser. */
  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);

    const id = href.split("#")[1];
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    // update URL tanpa trigger native hash jump / re-render
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-6 md:px-12 py-5 md:py-6 bg-neutral-800/10 backdrop-blur-sm border-b border-neutral-200/50 font-second will-change-transform"
      >
        {/* logo */}
        <Link
          href="/"
          className="font-primary text-neutral-50 flex gap-x-2 relative"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="italic md:text-[10px] md:text-[14px] relative top-[-9px] md:top-[-6px]">Heaven</span>
          <span className="font-bold font-second relative left-[-50px] top-[4px] text-[18px] md:text-[22px] tracking-tighter">Cehwin</span>
        </Link>

        {/* links — desktop */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-sm uppercase tracking-wider text-neutral-50/70 hover:text-neutral-50 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* hamburger — mobile */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="md:hidden relative z-[910] w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
        >
          <span
            className={`block h-px w-6 bg-neutral-50 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-neutral-50 transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* mobile menu overlay — selalu ada di DOM, opacity + pointer-events dikontrol GSAP */}
      <div
        ref={menuRef}
        className={`fixed z-[850] w-full h-dvh bg-neutral-950 flex flex-col items-center justify-center gap-8 md:hidden opacity-0 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link.href);
            }}
            className="mobile-link font-primary font-extrabold text-3xl tracking-tight text-neutral-50"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}