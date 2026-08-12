import { notFound } from "next/navigation";
import { flattenWebsites } from "@/libs/works";
import WebsiteDetailView from "@/components/works/website/WebsiteDetailView";

export function generateStaticParams() {
  return flattenWebsites().map((w) => ({ slug: w.slug }));
}

export default async function WebsiteDetailPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = flattenWebsites().find((w) => w.slug === slug);
  if (!site) notFound();

  return <WebsiteDetailView site={site} />;
}

