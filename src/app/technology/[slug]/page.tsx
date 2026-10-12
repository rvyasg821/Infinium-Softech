import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/seo";
import { Technology } from "@/components/Technology/Technology";
import {
    INDIVIDUAL_TECH_ITEMS,
    SLUG_TO_CATEGORY_MAP,
    getTechSlug,
} from "@/data/technology/technologyData";

export const metadata: Metadata = getPageMetadata("/technology");

export function generateStaticParams() {
    const categorySlugs = Object.keys(SLUG_TO_CATEGORY_MAP);
    const techSlugs = INDIVIDUAL_TECH_ITEMS.map((t) => t.id);
    const prettySlugs = INDIVIDUAL_TECH_ITEMS.map((t) => getTechSlug(t.id));
    return [...new Set([...categorySlugs, ...techSlugs, ...prettySlugs])].map((slug) => ({
        slug,
    }));
}

export default async function TechnologySlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const isValid =
        slug in SLUG_TO_CATEGORY_MAP ||
        INDIVIDUAL_TECH_ITEMS.some((t) => t.id === slug || getTechSlug(t.id) === slug);

    if (!isValid) notFound();

    return (
        <main className="main">
            <Technology initialSlug={slug} />
        </main>
    );
}