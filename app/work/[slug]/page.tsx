import ExperienceDetailView from "@/components/works/experience/ExperienceDetailView";
import { EXPERIENCES } from "@/libs/works";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({ slug: exp.slug }));
}

// Next.js 15: `params` di dynamic route sekarang Promise — wajib di-await.
export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = EXPERIENCES.find((e) => e.slug === slug);
  if (!exp) notFound();

  return <ExperienceDetailView exp={exp} />;
}