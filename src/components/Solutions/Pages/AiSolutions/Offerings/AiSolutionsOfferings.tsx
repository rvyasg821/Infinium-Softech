"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import type { SolutionsSectionIntro, SolutionsServiceItem } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsOfferings.scss";

const defaultContent: SolutionsSectionIntro & { items: SolutionsServiceItem[] } = {
  eyebrow: "What we deliver",
  titleStart: "AI services designed for",
  titleEnd: "measurable business impact.",
  description: "We put practical AI into your workflows to improve decisions, productivity, forecasting, and service quality.",
  items: [
  {
    number: "01",
    tint: "#1F31E8",
    title: "AI Strategy",
    description:
      "Map high-value use cases and build a practical AI roadmap for your operation.",
  },
  {
    number: "02",
    tint: "#1E9E5A",
    title: "Forecasting AI",
    description:
      "Forecast demand, utilisation, and customer trends so teams can plan confidently.",
  },
  {
    number: "03",
    tint: "#E8A21F",
    title: "Workflow Automation",
    description:
      "Automate repeatable work with AI agents while people stay in control of decisions.",
  },
  {
    number: "04",
    tint: "#8B3FE8",
    title: "Custom ML & LLMs",
    description:
      "Build machine-learning and language models around your data and workflows.",
  },
  {
    number: "05",
    tint: "#0F8F87",
    title: "Computer Vision",
    description:
      "Use vision and connected devices to improve inspection, safety, and quality.",
  },
  {
    number: "06",
    tint: "#2AA8C4",
    title: "Cloud AI & MLOps",
    description:
      "Deploy, monitor, and refine cloud AI systems as your products and data grow.",
  },
  {
    number: "07",
    tint: "#4338CA",
    title: "Product Integration",
    description:
      "Integrate AI predictions into existing products, platforms, and daily workflows.",
  },
  {
    number: "08",
    tint: "#0C0C0D",
    title: "AI Governance",
    description:
      "Add human review, access controls, and monitoring to keep AI accountable.",
  },
  ],
};

export function AiSolutionsOfferings({ content = defaultContent }: { content?: SolutionsSectionIntro & { items: SolutionsServiceItem[] } } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const offerings = content.items;
  const totalCards = offerings.length;

  const goToNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((previous) => (previous + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((previous) => (previous - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToIndex = (index: number) => {
    setSlideDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(goToNext, 4000);
    return () => window.clearInterval(timer);
  }, [isPaused, goToNext]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      if (distance > 45) goToNext();
      else if (distance < -45) goToPrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setIsPaused(false);
  };

  const currentOffering = offerings[activeIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCards).padStart(2, "0");

  return (
    <section id="ai-capabilities" className="ai-solutions-offerings">
      <div className="ai-solutions-container">
        <div className="offerings-header">
          <span data-reveal="" className="offerings-eyebrow">{content.eyebrow}</span>
          <h2 data-reveal="" className="offerings-headline">
            {content.titleStart}
            <br />
            {content.titleEnd}
          </h2>
          <p data-reveal="" className="offerings-intro">
            {content.description}
          </p>
        </div>

        <div data-reveal="" className="offerings-grid" aria-label="AI services">
          {offerings.map((offering) => (
            <article key={offering.number} className="offering-card">
              <div
                className="offering-icon"
                style={{ backgroundColor: offering.tint }}
                aria-hidden="true"
              />
              <h3>{offering.title}</h3>
              <p>{offering.description}</p>
            </article>
          ))}
        </div>

        <div data-reveal="" className="offerings-mobile-slider-area">
          <div
            className="offerings-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="slider-arrow-btn prev-btn"
              onClick={goToPrev}
              aria-label="Previous AI service"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="slider-card-stage" aria-live="polite" aria-atomic="true">
              <article key={activeIndex} className={`single-offering-card slide-${slideDirection}`}>
                <div
                  className="card-accent-strip"
                  style={{ backgroundColor: currentOffering.tint }}
                  aria-hidden="true"
                />
                <div className="card-header-row">
                  <div className="card-badge-wrap">
                    <div
                      className="offering-icon"
                      style={{ backgroundColor: currentOffering.tint }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="card-counter" aria-label={`Service ${formattedIndex} of ${formattedTotal}`}>
                    <span className="current-num">{formattedIndex}</span>
                    <span className="divider">/</span>
                    <span className="total-num">{formattedTotal}</span>
                  </div>
                </div>
                <h3>{currentOffering.title}</h3>
                <p>{currentOffering.description}</p>
              </article>
            </div>

            <button
              type="button"
              className="slider-arrow-btn next-btn"
              onClick={goToNext}
              aria-label="Next AI service"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="slider-pagination" aria-label="AI service navigation dots">
            {offerings.map((offering, index) => (
              <button
                key={offering.number}
                type="button"
                className={`pagination-dot ${activeIndex === index ? "is-active" : ""}`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to AI service ${index + 1}: ${offering.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <span
                  className="dot-fill"
                  style={{ backgroundColor: activeIndex === index ? offering.tint : undefined }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
