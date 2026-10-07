"use client";

import React from "react";
import { useAboutCarousel } from "@/components/About/useAboutCarousel";
import "./AppointGemResults.scss";

interface ResultItem {
  value: string;
  delta: string;
  title: string;
  desc: string;
}

const RESULTS: ResultItem[] = [
  {
    value: "18,412",
    delta: "▲ 16.4%",
    title: "Bookings per month",
    desc: "Volume handled across live Slota accounts this month.",
  },
  {
    value: "86.4%",
    delta: "▲ 5.1%",
    title: "Staff utilisation",
    desc: "Billable time against published availability, per practitioner.",
  },
  {
    value: "₹ 4.86 Cr",
    delta: "▲ 21.2%",
    title: "Booking revenue",
    desc: "Collected through the platform, deposits and balances included.",
  },
  {
    value: "3.2%",
    delta: "▼ from 11%",
    title: "No-show rate",
    desc: "After automated reminder journeys replaced manual calls.",
  },
  {
    value: "4–6 wks",
    delta: "typical",
    title: "Time to go live",
    desc: "From kickoff to first live branch, including data migration.",
  },
  {
    value: "99.95%",
    delta: "12-month",
    title: "Platform uptime",
    desc: "Shared multi-region cloud layer behind every Infinium product.",
  },
];

function ResultCardView({
  item,
  isClone = false,
}: {
  item: ResultItem;
  isClone?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`result-card ${isClone ? "result-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="result-value-row">
        <span className="result-value">{item.value}</span>
        <span className="result-delta">{item.delta}</span>
      </div>
      <h3 className="result-card-title">{item.title}</h3>
      <p className="result-card-desc">{item.desc}</p>
    </div>
  );
}

export function AppointGemResults() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(RESULTS.length, 1024);

  return (
    <section id="results" className="appointgem-results-section" aria-labelledby="results-title">
      <div className="appointgem-results-container">
        <div className="results-header">
          <div>
            <span data-reveal="" className="appointgem-eyebrow">Key results</span>
            <h2 data-reveal="" id="results-title" className="results-headline">
              Measured across <br className="mobile-title-break" />live accounts
            </h2>
          </div>
          <p data-reveal="" className="results-subtitle">
            Current month across Slota deployments, compared with the same month last year.
          </p>
        </div>

        <div className="results-wrap">
          <div className="results-track">
            <div className="results-grid" ref={scrollRef}>
              {/* Clone of last card */}
              <ResultCardView
                item={RESULTS[RESULTS.length - 1]}
                isClone={true}
              />

              {/* Real items */}
              {RESULTS.map((item) => (
                <ResultCardView key={item.title} item={item} />
              ))}

              {/* Clone of first card */}
              <ResultCardView item={RESULTS[0]} isClone={true} />
            </div>

            {/* Navigation Arrow Buttons */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous result"
              onClick={handlePrev}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next result"
              onClick={handleNext}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="carousel-dots" aria-label="Results navigation dots">
            {RESULTS.map((item, idx) => (
              <button
                key={item.title}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to result ${idx + 1}`}
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
