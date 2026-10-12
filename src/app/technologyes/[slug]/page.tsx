import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";
import { Technology } from "@/components/Technology/Technology";
import {
  INDIVIDUAL_TECH_ITEMS,
  SLUG_TO_CATEGORY_MAP,
  CATEGORY_HEADERS,
  getTechSlug,
  findTechBySlug,
} from "@/data/technology/technologyData";

export function generateStaticParams() {
  const categorySlugs = Object.keys(SLUG_TO_CATEGORY_MAP);
  const techSlugs = INDIVIDUAL_TECH_ITEMS.map((t) => t.id);
  const prettySlugs = INDIVIDUAL_TECH_ITEMS.map((t) => getTechSlug(t.id));
  return [...new Set([...categorySlugs, ...techSlugs, ...prettySlugs])].map(
    (slug) => ({
      slug,
    })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const categoryKey = SLUG_TO_CATEGORY_MAP[slug];
  if (categoryKey && CATEGORY_HEADERS[categoryKey]) {
    const cat = CATEGORY_HEADERS[categoryKey];
    const title = `${cat.title} Frameworks & Solutions | Infinium Softech`;
    const description = `${cat.subtitle}. Explore Infinium Softech's comprehensive ${cat.title} stack and enterprise architectures.`;
    const canonical = `${SITE_URL}/technologyes/${slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: SITE_NAME,
        type: "website",
        images: [{ url: `${SITE_URL}/og/default.png`, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  const tech = findTechBySlug(slug);
  if (tech) {
    const title = `${tech.title} Development & Services | Infinium Softech`;
    const description =
      tech.description.length > 155
        ? `${tech.description.slice(0, 152)}...`
        : tech.description;
    const canonical = `${SITE_URL}/technologyes/${slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: SITE_NAME,
        type: "website",
        images: [
          {
            url: `${SITE_URL}${tech.image || "/og/default.png"}`,
            alt: tech.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  return getPageMetadata("/technologyes");
}

export default async function TechnologyesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoryKey = SLUG_TO_CATEGORY_MAP[slug];
  const tech = findTechBySlug(slug);

  if (!categoryKey && !tech) {
    notFound();
  }

  const itemTitle = categoryKey
    ? CATEGORY_HEADERS[categoryKey]?.title ?? "Technology"
    : tech?.title ?? "Technology";

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: itemTitle,
    description: tech
      ? tech.description
      : categoryKey
      ? CATEGORY_HEADERS[categoryKey]?.subtitle
      : "Technology Stack",
    url: `${SITE_URL}/technologyes/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Infinium Softech",
      url: SITE_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Technologyes",
          item: `${SITE_URL}/technologyes`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: itemTitle,
          item: `${SITE_URL}/technologyes/${slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="main">
        <Technology initialSlug={slug} />
      </main>
    </>
  );
}
