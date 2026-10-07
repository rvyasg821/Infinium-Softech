"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import "./BookDemoFaq.scss";

const DEMO_FAQS = [
  {
    q: "Who should join the call?",
    a: "Whoever owns the process today, plus anyone who signs off on new tools. Both is ideal but either works.",
  },
  {
    q: "Is it a sales pitch?",
    a: "No slide deck. We open a workspace and run your actual workflow through it, so you're seeing the product, not a script.",
  },
  {
    q: "Can we bring our own data?",
    a: "Yes, send a sample beforehand and we'll load it in. Otherwise we use volumes and roles close to what you describe.",
  },
  {
    q: "What if we're not ready to buy?",
    a: "That's fine. Most calls end with a scope and a price for reference, with no follow-up required until you're ready.",
  },
];

export function BookDemoFaq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  const totalCards = DEMO_FAQS.length;
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToIndex = (index: number) => {
    setSlideDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  // Auto-play timer (4.5s)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      if (diff > 45) {
        goToNext();
      } else if (diff < -45) {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setIsPaused(false);
  };

  const prevIndex = (activeIndex - 1 + totalCards) % totalCards;
  const nextIndex = (activeIndex + 1) % totalCards;
  const prevFaq = DEMO_FAQS[prevIndex];
  const currentFaq = DEMO_FAQS[activeIndex];
  const nextFaq = DEMO_FAQS[nextIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCards).padStart(2, "0");
  const formattedPrevIndex = String(prevIndex + 1).padStart(2, "0");
  const formattedNextIndex = String(nextIndex + 1).padStart(2, "0");

  return (
    <section className="contact-faq-section content-padding" aria-label="Before You Book FAQs">
      <div className="contact-faq-container">
        {/* Section Header */}
        <div className="contact-faq-header">
          <div>
            <div data-reveal="" className="contact-faq-eyebrow">
              Before you book
            </div>
            <h2 data-reveal="" className="contact-faq-headline">
              Questions we get first.
            </h2>
          </div>
          <p data-reveal="" className="contact-faq-intro">
            If one of these is your question, the answer is here and the call can move straight to your case.
          </p>
        </div>

        {/* 3-Card Stage Carousel: Left Half Prev | Center Main | Right Half Next */}
        <div className="contact-faq-slider-area" aria-label="FAQ carousel slider">
          <div
            className="contact-faq-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Arrow Button */}
            <button
              type="button"
              className="slider-arrow-btn prev-btn"
              onClick={goToPrev}
              aria-label="Previous question"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* 3-Card Stage Track */}
            <div className="faq-stage-track">
              {/* Previous Card (Half visible on left) */}
              <div
                className="faq-stage-card faq-stage-card--prev"
                onClick={goToPrev}
                role="button"
                tabIndex={0}
                aria-label={`Previous question: ${prevFaq.q}`}
              >
                <div className="card-top-bar">
                  <span className="card-counter">
                    {formattedPrevIndex} / {formattedTotal}
                  </span>
                </div>
                <h3 className="card-title">{prevFaq.q}</h3>
                <p className="card-desc">{prevFaq.a}</p>
              </div>

              {/* Main Card (Middle) */}
              <div
                key={activeIndex}
                className={`faq-stage-card faq-stage-card--active slide-${slideDirection}`}
              >
                <div className="card-top-bar">
                  <span className="card-counter">
                    {formattedIndex} / {formattedTotal}
                  </span>
                  <span className="card-tag">FAQ</span>
                </div>
                <h3 className="card-title">{currentFaq.q}</h3>
                <p className="card-desc">{currentFaq.a}</p>
              </div>

              {/* Next Card (Half visible on right) */}
              <div
                className="faq-stage-card faq-stage-card--next"
                onClick={goToNext}
                role="button"
                tabIndex={0}
                aria-label={`Next question: ${nextFaq.q}`}
              >
                <div className="card-top-bar">
                  <span className="card-counter">
                    {formattedNextIndex} / {formattedTotal}
                  </span>
                </div>
                <h3 className="card-title">{nextFaq.q}</h3>
                <p className="card-desc">{nextFaq.a}</p>
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              className="slider-arrow-btn next-btn"
              onClick={goToNext}
              aria-label="Next question"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="slider-pagination" aria-label="FAQ navigation dots">
            {DEMO_FAQS.map((faq, idx) => (
              <button
                key={idx}
                type="button"
                className={`pagination-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to question ${idx + 1}`}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
