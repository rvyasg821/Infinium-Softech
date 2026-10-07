"use client";

import { useEffect } from "react";
import { SolutionsHero } from "./SolutionsHero/SolutionsHero";
import { SolutionsList } from "./SolutionsList/SolutionsList";
import { SolutionsCta } from "./SolutionsCta/SolutionsCta";

export function Solutions() {
  // Global ScrollAnimationProvider handles [data-reveal] animations globally

  return (
    <div className="solutions-page">
      <SolutionsHero />
      <SolutionsList />
      <SolutionsCta />
    </div>
  );
}
