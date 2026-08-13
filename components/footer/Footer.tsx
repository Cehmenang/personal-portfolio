"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiInstagram, SiGithub } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

gsap.registerPlugin(ScrollTrigger);

// samain sama contacts di BaseName
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/cehmenang", icon: SiInstagram },
  { name: "Linkedin", href: "https://www.linkedin.com/in/heaven-cehwin-703896238", icon: SlSocialLinkedin },
  { name: "Github", href: "https://github.com/Cehmenang", icon: SiGithub },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  /* reveal masuk/keluar viewport, dua arah — pola yang sama dipakai di section lain */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom bottom",
          toggleActions: "play reverse play reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-neutral-950 text-neutral-50 border-t border-neutral-800 px-6 md:px-12 py-10 md:py-12 font-[var(--font-second)]"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* nama + copyright */}
        <div className="footer-item">
          <p className="font-[var(--font-primary)] font-extrabold text-xl md:text-2xl tracking-tight">
            Heaven Cehwin
          </p>
          <p className="text-sm text-neutral-500 mt-1">© 2026 Copyright</p>
        </div>

        {/* social icons */}
        <div className="footer-item flex items-center gap-4">
          {SOCIALS.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-700 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-50 hover:border-neutral-50 transition-colors duration-300"
            >
              <Icon size={18} strokeWidth={1.75} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}