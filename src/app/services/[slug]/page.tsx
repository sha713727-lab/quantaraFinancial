import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { allPracticePages, getServiceBySlug } from "@/features/landing/content";
import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";
import { ServiceDetailView } from "@/features/landing/service-detail-view";

type ServiceDetailParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allPracticePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      title: service.title,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailParams) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <PageShell>
      <ServiceDetailView service={service} />
      <InnerPageEndMatter
        title="Book a consultation"
        description={`${service.title} starts with a scoped conversation — not a generic pitch.`}
        ctaLabel="Book a Consultation"
      />
    </PageShell>
  );
}
