"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SolutionsSectionIntro, SolutionsStrengthItem } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsStrengths.scss";

const defaultContent: SolutionsSectionIntro & { items: SolutionsStrengthItem[] } = {
  eyebrow: "Why Infinium Softech",
  titleStart: "AI built for work",
  titleEnd: "that matters",
  description:
    "Practical AI, integrated with your products and workflows, and supported from the first use case through production.",
  items: [
  {
    number: "01",
    title: "Pilot to production",
    description: "Move beyond demos with a clear use case, delivery plan, and measurable outcomes.",
  },
  {
    number: "02",
    title: "Fits existing workflows",
    description: "Connect AI with the tools and product workflows your teams already use.",
  },
  {
    number: "03",
    title: "Human-led decisions",
    description: "Keep people in control with review, approval, and override at critical steps.",
  },
  {
    number: "04",
    title: "Data stays protected",
    description: "Apply access controls, privacy safeguards, and audit trails around AI data.",
  },
  {
    number: "05",
    title: "Performance stays visible",
    description: "Monitor model accuracy and drift as real-world data and usage change.",
  },
  {
    number: "06",
    title: "Designed to scale",
    description: "Start with one workflow, then extend proven AI across products and teams.",
  },
  ],
};

export function AiSolutionsStrengths({ content = defaultContent }: { content?: SolutionsSectionIntro & { items: SolutionsStrengthItem[] } } = {}) {
  const strengths = content.items;
  const strengthsGridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth > 767 ? 2 : 1);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const syncActiveIndex = useCallback(() => {
    const grid = strengthsGridRef.current;
    const firstCard = grid?.firstElementChild as HTMLElement | null;
    if (!grid || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
    const distance = firstCard.offsetWidth + gap;
    const maxIndex = Math.max(0, strengths.length - visibleCards);
    const nextIndex = Math.max(0, Math.min(maxIndex, Math.round(grid.scrollLeft / distance)));
    setActiveIndex(nextIndex);
  }, [visibleCards]);

  useEffect(() => {
    const grid = strengthsGridRef.current;
    if (!grid) return;

    grid.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      grid.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [syncActiveIndex]);

  const moveStrengths = (direction: 1 | -1) => {
    const grid = strengthsGridRef.current;
    const firstCard = grid?.firstElementChild as HTMLElement | null;
    if (!grid || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
    const distance = firstCard.offsetWidth + gap;
    const maxIndex = Math.max(0, strengths.length - visibleCards);
    const nextIndex = Math.max(0, Math.min(maxIndex, activeIndex + direction));

    setActiveIndex(nextIndex);
    grid.scrollTo({ left: nextIndex * distance, behavior: "smooth" });
  };

  return (
    <section className="ai-solutions-strengths" aria-labelledby="ai-strengths-title">
      <div className="ai-solutions-container">
        <div className="strengths-panel">
          <div data-reveal="" className="strengths-header">
            <div>
              <span className="strengths-eyebrow">{content.eyebrow}</span>
              <h2 id="ai-strengths-title" className="strengths-headline">
                {content.titleStart}<br className="mobile-title-break" /> {content.titleEnd}
              </h2>
            </div>
            <p className="strengths-subtitle">
              {content.description}
            </p>
          </div>

          <div data-reveal="" className="strengths-grid-wrap">
            {activeIndex > 0 && (
              <button
                type="button"
                className="strengths-scroll-button strengths-scroll-button--previous"
                onClick={() => moveStrengths(-1)}
                aria-label="Show previous AI strengths"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <div ref={strengthsGridRef} className="strengths-grid">
              {strengths.map((item) => (
                <article key={item.number} className="strength-item">
                  <span className="strength-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>

            {activeIndex < strengths.length - visibleCards && (
              <button
                type="button"
                className="strengths-scroll-button strengths-scroll-button--next"
                onClick={() => moveStrengths(1)}
                aria-label="Show next AI strengths"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
