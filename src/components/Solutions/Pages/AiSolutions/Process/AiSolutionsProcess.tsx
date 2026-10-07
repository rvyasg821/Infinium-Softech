"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SolutionsProcessStep, SolutionsSectionIntro } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsProcess.scss";

const defaultContent: SolutionsSectionIntro & { items: SolutionsProcessStep[] } = {
  eyebrow: "How we work",
  titleStart: "From first brief",
  titleEnd: "to live AI.",
  description: "A clear path from use case and data review to deployment and ongoing improvement.",
  items: [
  {
    number: "01",
    tint: "#1F31E8",
    title: "Discovery",
    description: "Define the workflow, decisions, users, and success measures.",
  },
  {
    number: "02",
    tint: "#1E9E5A",
    title: "Data readiness",
    description: "Check data quality, access, privacy, and integration needs.",
  },
  {
    number: "03",
    tint: "#E8A21F",
    title: "Solution design",
    description: "Select the model, controls, and human review points.",
  },
  {
    number: "04",
    tint: "#8B3FE8",
    title: "Build & validate",
    description: "Test the solution against real tasks and performance targets.",
  },
  {
    number: "05",
    tint: "#0F8F87",
    title: "Integrate & launch",
    description: "Connect AI to your products, systems, and teams.",
  },
  {
    number: "06",
    tint: "#2AA8C4",
    title: "Monitor & improve",
    description: "Track accuracy and drift, then refine as your data changes.",
  },
  ],
};

export function AiSolutionsProcess({ content = defaultContent }: { content?: SolutionsSectionIntro & { items: SolutionsProcessStep[] } } = {}) {
  const process = content.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const totalSteps = process.length;

  const goToNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((previous) => (previous + 1) % totalSteps);
  }, [totalSteps]);

  const goToPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((previous) => (previous - 1 + totalSteps) % totalSteps);
  }, [totalSteps]);

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

  const currentStep = process[activeIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalSteps).padStart(2, "0");

  return (
    <section className="ai-solutions-process" aria-labelledby="ai-process-title">
      <div className="ai-solutions-container">
        <div className="process-header">
          <span data-reveal="" className="process-eyebrow">{content.eyebrow}</span>
          <h2 data-reveal="" id="ai-process-title" className="process-headline">
            {content.titleStart}
            <br />
            {content.titleEnd}
          </h2>
          <p data-reveal="" className="process-intro">
            {content.description}
          </p>
        </div>

        <div data-reveal="" className="process-grid" aria-label="AI delivery steps">
          {process.map((step) => (
            <article key={step.number} className="process-card">
              <span className="process-number" style={{ color: step.tint }}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div data-reveal="" className="process-mobile-slider-area">
          <div
            className="process-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button type="button" className="process-arrow-btn prev-btn" onClick={goToPrev} aria-label="Previous delivery step">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <div className="process-slider-stage" aria-live="polite" aria-atomic="true">
              <article key={activeIndex} className={`process-slider-card slide-${slideDirection}`}>
                <div className="process-slider-topline">
                  <span className="process-slider-number" style={{ backgroundColor: currentStep.tint }}>
                    {currentStep.number}
                  </span>
                  <span className="process-slider-counter" aria-label={`Step ${formattedIndex} of ${formattedTotal}`}>
                    <span>{formattedIndex}</span>
                    <span className="divider">/</span>
                    <span className="total-num">{formattedTotal}</span>
                  </span>
                </div>
                <h3>{currentStep.title}</h3>
                <p>{currentStep.description}</p>
              </article>
            </div>

            <button type="button" className="process-arrow-btn next-btn" onClick={goToNext} aria-label="Next delivery step">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="process-pagination" aria-label="AI delivery step navigation">
            {process.map((step, index) => (
              <button
                key={step.number}
                type="button"
                className={`process-pagination-dot ${activeIndex === index ? "is-active" : ""}`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to step ${index + 1}: ${step.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <span style={{ backgroundColor: activeIndex === index ? step.tint : undefined }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
