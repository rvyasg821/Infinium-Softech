"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SolutionsFaqItem, SolutionsSectionIntro } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsFaq.scss";

const defaultContent: SolutionsSectionIntro & { items: SolutionsFaqItem[] } = {
  eyebrow: "FAQ",
  titleStart: "Have questions?",
  titleEnd: "Start here.",
  description: "Clear answers about AI scope, delivery, data, and long-term support.",
  items: [
  {
    question: "How can AI help transform my business?",
    answer:
      "AI can automate repeatable work, improve forecasting, surface patterns in business data, and help teams make faster, better-informed decisions. We focus on use cases with clear operational value.",
  },
  {
    question: "What types of AI services do you offer?",
    answer:
      "Our work includes AI strategy, custom machine learning and LLMs, predictive analytics, intelligent automation, computer vision, and cloud AI with MLOps.",
  },
  {
    question: "Do you build custom AI for different industries?",
    answer:
      "Yes. We shape each solution around your industry, data, users, workflows, and compliance requirements rather than applying a one-size-fits-all model.",
  },
  {
    question: "How long does it take to develop an AI solution?",
    answer:
      "Timing depends on the use case, data readiness, integrations, and delivery scope. We clarify those factors during discovery and can define a focused pilot before a wider rollout.",
  },
  {
    question: "Is AI implementation affordable for smaller businesses?",
    answer:
      "A project can start with one high-value workflow and a clearly scoped pilot. The right investment depends on your goals, data, integrations, and support needs.",
  },
  {
    question: "Is my company’s data safe when using AI?",
    answer:
      "We plan for privacy, access controls, and appropriate data handling from the start. Data location, retention, and security requirements are agreed as part of solution design.",
  },
  {
    question: "Can AI integrate with my existing systems?",
    answer:
      "Yes. We assess your current products, APIs, and data flows, then integrate AI into the workflows and tools your teams already use.",
  },
  {
    question: "Do you support AI after deployment?",
    answer:
      "Yes. Post-launch work can include performance monitoring, drift checks, model updates, and improvements as your data and operational needs evolve.",
  },
  {
    question: "How do I know which AI solution is right for my business?",
    answer:
      "Start with the business problem and the decision or workflow you want to improve. We review your goals and data, assess feasibility, and recommend a practical next step.",
  },
  ],
};

export function AiSolutionsFaq({ content = defaultContent }: { content?: SolutionsSectionIntro & { items: SolutionsFaqItem[] } } = {}) {
  const faqs = content.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const totalFaqs = faqs.length;

  const goToNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((previous) => (previous + 1) % totalFaqs);
  }, [totalFaqs]);

  const goToPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((previous) => (previous - 1 + totalFaqs) % totalFaqs);
  }, [totalFaqs]);

  const goToIndex = (index: number) => {
    setSlideDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(goToNext, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, goToNext]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartXRef.current = event.touches[0].clientX;
    touchEndXRef.current = null;
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

  const prevIndex = (activeIndex - 1 + totalFaqs) % totalFaqs;
  const nextIndex = (activeIndex + 1) % totalFaqs;
  const previousFaq = faqs[prevIndex];
  const currentFaq = faqs[activeIndex];
  const nextFaq = faqs[nextIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalFaqs).padStart(2, "0");

  const handleSideCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <section className="ai-solutions-faq" aria-labelledby="ai-solutions-faq-title">
      <div className="ai-solutions-container">
        <div className="ai-solutions-faq-header">
          <div>
            <span data-reveal="" className="ai-solutions-faq-eyebrow">{content.eyebrow}</span>
            <h2 data-reveal="" id="ai-solutions-faq-title" className="ai-solutions-faq-title">
              {content.titleStart}
              <br />
              {content.titleEnd}
            </h2>
          </div>
          <p data-reveal="" className="ai-solutions-faq-intro">
            {content.description}
          </p>
        </div>

        <div data-reveal="" className="ai-solutions-faq-carousel" aria-label="Frequently asked questions">
          <div
            className="ai-solutions-faq-carousel-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button type="button" className="ai-faq-arrow prev-btn" onClick={goToPrev} aria-label="Previous question">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <div className="ai-faq-stage">
              <div
                className="ai-faq-stage-card ai-faq-stage-card--prev"
                onClick={goToPrev}
                onKeyDown={(event) => handleSideCardKeyDown(event, goToPrev)}
                role="button"
                tabIndex={0}
                aria-label={`Previous question: ${previousFaq.question}`}
              >
                <span className="ai-faq-card-counter">{String(prevIndex + 1).padStart(2, "0")} / {formattedTotal}</span>
                <span className="ai-faq-card-title">{previousFaq.question}</span>
                <span className="ai-faq-card-answer">{previousFaq.answer}</span>
              </div>

              <article key={activeIndex} className={`ai-faq-stage-card ai-faq-stage-card--active slide-${slideDirection}`} aria-live="polite">
                <div className="ai-faq-card-topline">
                  <span className="ai-faq-card-counter">{formattedIndex} / {formattedTotal}</span>
                  <span className="ai-faq-card-tag">FAQ</span>
                </div>
                <h3 className="ai-faq-card-title">{currentFaq.question}</h3>
                <p className="ai-faq-card-answer">{currentFaq.answer}</p>
              </article>

              <div
                className="ai-faq-stage-card ai-faq-stage-card--next"
                onClick={goToNext}
                onKeyDown={(event) => handleSideCardKeyDown(event, goToNext)}
                role="button"
                tabIndex={0}
                aria-label={`Next question: ${nextFaq.question}`}
              >
                <span className="ai-faq-card-counter">{String(nextIndex + 1).padStart(2, "0")} / {formattedTotal}</span>
                <span className="ai-faq-card-title">{nextFaq.question}</span>
                <span className="ai-faq-card-answer">{nextFaq.answer}</span>
              </div>
            </div>

            <button type="button" className="ai-faq-arrow next-btn" onClick={goToNext} aria-label="Next question">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="ai-solutions-faq-dots" aria-label="FAQ navigation">
            {faqs.map((faq, index) => (
              <button
                key={faq.question}
                type="button"
                className={`ai-solutions-faq-dot ${activeIndex === index ? "is-active" : ""}`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to question ${index + 1}: ${faq.question}`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}