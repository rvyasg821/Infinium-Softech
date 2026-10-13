"use client";

import { TechnologyHero } from "./TechnologyHero/TechnologyHero";
import { TechnologyList } from "./TechnologyList/TechnologyList";

export function Technology({ initialSlug }: { initialSlug?: string }) {
  return (
    <div className="technology-page">
      <TechnologyHero />
      <TechnologyList initialSlug={initialSlug} />
    </div>
  );
}