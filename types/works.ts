type Category = "Website" | "Graphic Design" | "Video Editing";
type VideoPlatform = "drive" | "instagram" | "tiktok";

interface BaseWork {
  id: string;
  number: string;
  brand: string;
  image: string;
  /** slug generik, dipakai buat halaman "Works I Have Done" -> /work/[slug] */
  slug: string;
}

interface WebsiteWork extends BaseWork {
  category: "Website";
  /** stack yang dipake, tampil di halaman detail /work/website/[slug] */
  stack: string[];
  features: string[];
  summary: string;
}

interface GraphicWork extends BaseWork {
  category: "Graphic Design";
  /** opsional: tag/medium kalo mau ditampilin di galeri, mis. "Poster", "Branding" */
  medium?: string;
}

interface VideoWork extends BaseWork {
  category: "Video Editing";
  platform: VideoPlatform;
  /** link Drive / IG / TikTok tempat video-nya disimpen */
  externalUrl: string;
}

export type Work = WebsiteWork | GraphicWork | VideoWork;