import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Technology } from "@/components/Technology/Technology";

export const metadata: Metadata = getPageMetadata("/technology");

export default function TechnologyPage() {
  return (
    <main className="main">
      <Technology />
    </main>
  );
}
