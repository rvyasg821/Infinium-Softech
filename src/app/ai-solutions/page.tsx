import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { AiSolutionsPage } from "@/components/Solutions/Pages/AiSolutions/AiSolutionsPage";

export const metadata: Metadata = getPageMetadata("/ai-solutions");

export default function AISolutionsRoutePage() {
  return <AiSolutionsPage />;
}
