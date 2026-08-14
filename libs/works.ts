export interface WebsiteItem {
  name: string;
  slug: string;
  url?: string; 
  summary: string;
  stack: string[];
  image: string[];
  feature: string;
}

export interface VideoItem {
  url: string;
}

export interface Experience {
  company: string;
  slug: string;
  description: string;
  year: string;
  role: string;
  websites?: WebsiteItem[];
  designs?: string[];
  videos?: VideoItem[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Personal",
    slug: "personal",
    role: "I Do What I Like",
    year: "School — Present",
    description: "A place where I spent countless hours learning and experimenting, constantly refining my craft while building a portfolio of work I could be proud of.",
    websites: [
      {
        name: "Belajar Aja",
        slug: "belajar-aja",
        url: "https://cehwin.cloud",
        summary: "A RAG-based document learning platform built with Next.js and NestJS. Features include Google OAuth, vector-based document storage, an AI assistant powered by LangChain, and an adaptive quiz engine using randomized window sampling to surface the most relevant content.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
        image: [
          "/works/BelajarAja/BelajarPreview.webp",
          "/works/BelajarAja/BelajarPreview2.webp",
          "/works/BelajarAja/BelajarPreview3.webp",
          "/works/BelajarAja/BelajarPreview4.webp",
          "/works/BelajarAja/BelajarPreview5.webp",
          "/works/BelajarAja/BelajarPreview6.webp",
          "/works/BelajarAja/BelajarPreview7.webp",
          "/works/BelajarAja/BelajarPreview8.webp",
          "/works/BelajarAja/BelajarPreview9.webp",
        ],
        feature: "Google Authentication (JWT), Document Upload (Chunking & Vector Storage Currently PDF only), AI Assistant (RAG with Document-based Similarity Search), Dynamic Quiz Generation (Randomized Window Sampling with Weighted Context Retrieval), Interactive Quiz Taking, Automated Scoring & Review System",
      },
    ],
    designs: [
     
    ],
  },
  {
    company: "Bandar Musik Jakarta",
    slug: "bandar-musik-jakarta",
    role: "Full Stack Developer",
    year: "2024 - Present",
    description: "I wore two hats that rarely meet in one role. On the creative side, I led video production for TikTok and Instagram — shaping raw ideas into concepts, then bringing them to life through editing, color grading, and audio mixing, always with an eye for storytelling that actually holds attention. On the technical side, I took on building the company's website entirely from scratch, using Laravel, React, TypeScript, and MySQL, and saw it through to full deployment — managing servers, optimizing performance, and wiring up API integrations along the way. The result was a role that blended visual creativity with full-stack engineering, giving me a rare, well-rounded perspective on how content and technology come together.",
    websites: [
      {
        name: "Bandar Musik Jakarta",
        slug: "bandar-musik-jakarta",
        url: "https://bandarmusikjakarta.com",
        summary: "Bandar Musik Jakarta is an e-commerce site I built for a music instrument store, carrying around 10,000 products. It's built with Laravel on the backend and Next.js on the frontend, styled with Tailwind CSS using a custom theme, clean white/slate cards, and amber/red accents.Key features include detailed product pages with specs and embedded videos, brand filtering, an admin upload system, shipping cost integration (RajaOngkir/Komerce), Accurate Online for accounting, and SEO essentials like structured data and a dynamic sitemap. It's also optimized with Redis caching and fronted by Cloudflare for performance and security.\n\nBasically, it's a full online storefront built to give the store real e-commerce capability, from browsing to checkout to backend management.",
        stack: [
          "Laravel",
          "NextJS",
          "Tailwind CSS",
          "TypeScript",
          "MySQL",
          "Nginx",
          "Redis",
          "Cloudflare",
          "GSAP",
          "Hostinger"
        ],
        image: [
          "/works/BMJ/BMJPreview.webp",
          "/works/BMJ/BMJPreview2.webp",
          "/works/BMJ/BMJPreview3.webp",
          "/works/BMJ/BMJPreview4.webp",
          "/works/BMJ/BMJPreview5.webp",
        ],
        feature: "Product catalog browsing, detailed product specs, embedded product videos, product filtering, admin product upload, shipping cost calculator, accounting integration, Realtime Search, SEO optimization, dynamic sitemap, FAQ accordion, related products carousel, milestone counter, backend caching, Cloudflare security, Multirole Access, Guest Wishlist, Last View Product, CRUD Admin",
      },
      {
        name: "Net Musik",
        slug: "net-musik",
        url: "https://net.bandarmusikjakarta.com",
        summary: "Net Musik is an e-commerce platform for musical instrument sales, built with a decoupled full-stack architecture: a NestJS backend (Prisma ORM + PostgreSQL) and a Next.js frontend. It features JWT-based authentication with httpOnly cookies, an admin dashboard for product management (with automatic image conversion to WebP on upload), and role-based access control via Next.js middleware.\n\nOn the customer side, there's a complete checkout flow — from selecting cart items, entering a shipping address, and choosing a payment method (bank transfer or COD), to an order summary and confirmation page. Shipping cost is currently a flat-rate placeholder, pending future integration with RajaOngkir/Komerce.",
        stack: [
          "NestJS",
          "NextJS",
          "Tailwind CSS",
          "TypeScript",
          "Prisma",
          "PostgreSQL",
          "Nginx",
          "JWT",
          "Multer",
          "Redis",
          "GSAP",
          "Hostinger"
        ],
        image: [
          "/works/Net/NetPreview1.webp",
          "/works/Net/NetPreview2.webp",
          "/works/Net/NetPreview3.webp",
          "/works/Net/NetPreview4.webp",
          "/works/Net/NetPreview5.webp",
        ],
        feature: "Auth: JWT via httpOnly cookies + Passport, CORS with credentials, Image upload using Multer + sharp (convert to WebP), Product data model using native PostgreSQL string arrays, Order/create endpoint for checkout process, Admin dashboard: login form, product upload form, monochrome UI with GSAP animations, Next.js middleware for role-based route protection (including RSC/Server Action edge cases), Product creation flow: after POST, calls revalidateProducts() + router.push/router.refresh() to return to product list, Customer checkout page: select cart items via sessionStorage, recipient address form, payment method (bank transfer/COD), order summary with flat-rate shipping (placeholder pending RajaOngkir/Komerce integration)",
      },
    ],
    designs: [
       "/gallery/BMJ/BMJ1.webp",
      "/gallery/BMJ/BMJ2.webp",
      "/gallery/BMJ/BMJ3.webp",
      "/gallery/BMJ/BMJ4.webp",
      "/gallery/BMJ/BMJ5.webp",
      "/gallery/BMJ/BMJ6.webp",
    ],
    videos: [{ url: "https://drive.google.com/drive/folders/1qx4-ujwhSfe7sJnyITqG6Mstj2zhjdEj?usp=sharing" }],
  },
  {
    company: "Delta Musik",
    slug: "delta-musik",
    role: "Graphic Design - Video Editor",
    year: "2023-2024",
    description: "Creative professional at Delta Musik with dual expertise as a Lead Graphic Designer and Lead Video Editor. Proven track record in driving corporate branding, executing marketing campaigns, and producing high-quality daily digital and print content.",
    designs: [
      "/gallery/Delta/Delta1.webp",
      "/gallery/Delta/Delta2.webp",
      "/gallery/Delta/Delta3.webp",
      "/gallery/Delta/Delta4.webp",
      "/gallery/Delta/Delta5.webp",
      "/gallery/Delta/Delta6.webp",
      "/gallery/Delta/Delta7.webp",
      "/gallery/Delta/Delta8.webp",
      "/gallery/Delta/Delta9.webp",
      "/gallery/Delta/Delta10.webp",
      "/gallery/Delta/Delta11.webp",
      "/gallery/Delta/Delta12.webp",
    ],
  },
];

export type FlatWebsite = WebsiteItem & { company: string; companySlug: string };
export type FlatDesign = { image: string; company: string; companySlug: string };
export type FlatVideo = VideoItem & { company: string; companySlug: string };

export function flattenWebsites(exps: Experience[] = EXPERIENCES): FlatWebsite[] {
  return exps.flatMap((exp) =>
    (exp.websites ?? []).map((w) => ({ ...w, company: exp.company, companySlug: exp.slug }))
  );
}

export function flattenDesigns(exps: Experience[] = EXPERIENCES): FlatDesign[] {
  return exps.flatMap((exp) =>
    (exp.designs ?? []).map((image) => ({ image, company: exp.company, companySlug: exp.slug }))
  );
}

export function flattenVideos(exps: Experience[] = EXPERIENCES): FlatVideo[] {
  return exps.flatMap((exp) =>
    (exp.videos ?? []).map((v) => ({ ...v, company: exp.company, companySlug: exp.slug }))
  );
}