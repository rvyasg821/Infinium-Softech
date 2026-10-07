import type { Metadata } from "next";
import { AiSolutionsPage } from "@/components/Solutions/Pages/AiSolutions/AiSolutionsPage";

export const metadata: Metadata = {
  title: "AI Solutions",
  description:
    "AI solutions built for business efficiency, automation, and smarter decision-making.",
  alternates: {
    canonical: "/ai-solutions",
  },
};

export default function AISolutionsRoutePage() {
  return <AiSolutionsPage />;
}
