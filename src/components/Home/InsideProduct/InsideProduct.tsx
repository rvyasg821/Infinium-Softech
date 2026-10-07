"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { WHY_CAPABILITIES } from "@/data/whyData";
import "./InsideProduct.scss";

export function InsideProduct() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalCards = WHY_CAPABILITIES.length;

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

  // Auto-scroll / Auto-play timer (4s)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
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

  const currentCap = WHY_CAPABILITIES[activeIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCards).padStart(2, "0");

  return (
    <section
      id="inside-product"
      className="inside-product-section content-padding"
      aria-label="Inside a product"
    >
      <div className="inside-product-container">
        {/* Section Header */}
        <div className="inside-product-header">
          <div data-reveal="" className="inside-product-eyebrow">Inside a product</div>

          <h2 data-reveal="" className="inside-product-headline">
            One Platform Core.
            <br />
            Multiple Ways to Work.
          </h2>

          <p data-reveal="" className="inside-product-intro">
            Explore each product to see who it serves, the capabilities it
            brings together, and how it streamlines workflows from end
            to end.
          </p>
        </div>

        {/* DESKTOP VIEW: 4x2 Platform Capabilities Grid (Desktop >= 1024px) */}
        <div className="inside-product-grid" aria-label="Platform capabilities grid">
          {WHY_CAPABILITIES.map((cap, idx) => (
            <div data-reveal="" key={idx} className="capability-card">
              <div
                className="capability-icon"
                style={{ backgroundColor: cap.tint }}
                aria-hidden="true"
              />

              <div className="capability-name">{cap.name}</div>
              <p className="capability-desc">{cap.desc}</p>
            </div>
          ))}
        </div>

        {/* MOBILE / SMALL SIZE VIEW: Centered Single Card Slider with Middle Arrows (< 1024px) */}
        <div className="inside-product-mobile-slider-area">
          <div
            className="inside-product-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Arrow Button - Vertically in Middle of Card */}
            <button
              type="button"
              className="slider-arrow-btn prev-btn"
              onClick={goToPrev}
              aria-label="Previous capability card"
            >
              <svg
                width="16"
                height="16"
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

            {/* Single Centered Active Card Stage */}
            <div className="slider-card-stage">
              <div
                key={activeIndex}
                className={`single-capability-card slide-${slideDirection}`}
              >
                {/* Accent Strip */}
                <div
                  className="card-accent-strip"
                  style={{ backgroundColor: currentCap.tint }}
                  aria-hidden="true"
                />

                {/* Header Row: Icon, Category Badge & Counter */}
                <div className="card-header-row">
                  <div className="card-badge-wrap">
                    <div
                      className="capability-icon"
                      style={{ backgroundColor: currentCap.tint }}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="card-counter">
                    <span className="current-num">{formattedIndex}</span>
                    <span className="divider">/</span>
                    <span className="total-num">{formattedTotal}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="capability-name">{currentCap.name}</h3>
                <p className="capability-desc">{currentCap.desc}</p>

                {/* Bottom Details Row */}
              </div>
            </div>

            {/* Right Arrow Button - Vertically in Middle of Card */}
            <button
              type="button"
              className="slider-arrow-btn next-btn"
              onClick={goToNext}
              aria-label="Next capability card"
            >
              <svg
                width="16"
                height="16"
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
          <div className="slider-pagination" aria-label="Card navigation dots">
            {WHY_CAPABILITIES.map((cap, idx) => (
              <button
                key={idx}
                type="button"
                className={`pagination-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${cap.name}`}
              >
                <span
                  className="dot-fill"
                  style={{
                    backgroundColor: activeIndex === idx ? cap.tint : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

