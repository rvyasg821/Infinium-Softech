"use client";

import { useEffect } from "react";
import { TechnologyHero } from "./TechnologyHero/TechnologyHero";
import { TechnologyList } from "./TechnologyList/TechnologyList";

export function Technology() {
  // Global ScrollAnimationProvider handles [data-reveal] animations globally

  return (
    <div className="technology-page">
      <TechnologyHero />
      <TechnologyList />
    </div>
  );
}
