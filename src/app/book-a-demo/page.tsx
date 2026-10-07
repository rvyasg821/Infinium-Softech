import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { BookDemo } from "@/components/BookDemo";

export const metadata: Metadata = getPageMetadata("/book-a-demo");

export default function BookDemoPage() {
  return (
    <main className="main">
      <BookDemo />
    </main>
  );
}
