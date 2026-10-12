import type { Metadata } from "next";
import { getPageMetadata, SITE_URL } from "@/lib/seo";
import { Technology } from "@/components/Technology/Technology";

export const metadata: Metadata = getPageMetadata("/technologyes");

export default function TechnologyesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Technologyes — Modern Frontend, Backend, Mobile, Cloud & Database Stack",
    description:
      "Explore Infinium Softech's comprehensive technology stack including React, Angular, Next.js, Node.js, Java, Swift, Android, AWS, Docker and databases.",
    url: `${SITE_URL}/technologyes`,
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
        <Technology />
      </main>
    </>
  );
}
