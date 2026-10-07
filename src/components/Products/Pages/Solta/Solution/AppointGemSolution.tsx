"use client";

import React, { useCallback, useEffect, useState } from "react";
import "./AppointGemSolution.scss";

const SOLUTIONS = [
  {
    title: "Multi-location calendars",
    desc: "Availability derived from live staff rosters per branch, with room and equipment capacity respected.",
    tint: "#1F31E8",
  },
  {
    title: "Staff-level availability",
    desc: "Each practitioner carries their own working hours, leave and service list; the public widget only ever shows what is real.",
    tint: "#1E9E5A",
  },
  {
    title: "Payments in the booking",
    desc: "Deposits, part payments and balances attach to the appointment, with invoices raised against the visit.",
    tint: "#E8A21F",
  },
  {
    title: "Reminder journeys",
    desc: "Automated SMS, WhatsApp and email sequences with confirm and reschedule links, logged per booking.",
    tint: "#8B3FE8",
  },
  {
    title: "One customer record",
    desc: "Visit history, notes, payments and communications on a single profile shared across branches.",
    tint: "#0F8F87",
  },
  {
    title: "Utilisation reporting",
    desc: "Revenue and utilisation per practitioner, service and branch, exportable or scheduled.",
    tint: "#2AA8C4",
  },
];

export function AppointGemSolution() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const totalSolutions = SOLUTIONS.length;

  const goToNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((index) => (index + 1) % totalSolutions);
  }, [totalSolutions]);

  const goToPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((index) => (index - 1 + totalSolutions) % totalSolutions);
  }, [totalSolutions]);

  useEffect(() => {
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const currentSolution = SOLUTIONS[activeIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalSolutions).padStart(2, "0");

  return (
    <section id="solution" className="appointgem-solution-section" aria-labelledby="solution-title">
      <div className="appointgem-solution-container">
        <div className="solution-header">
          <div>
            <span data-reveal="" className="appointgem-eyebrow">Our solution</span>
            <h2 data-reveal="" id="solution-title" className="solution-headline">
              What ships in <br className="mobile-title-break" />Slota
            </h2>
          </div>
          <p data-reveal="" className="solution-subtitle">
            Six capabilities, all included. Nothing on this list is a paid add-on or a custom build.
          </p>
        </div>

        <div className="solution-grid">
          {SOLUTIONS.map((item) => (
            <div key={item.title} data-reveal="" className="solution-card">
              <span className="dot-indicator" style={{ backgroundColor: item.tint }} />
              <h3 className="solution-card-title">{item.title}</h3>
              <p className="solution-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="solution-mobile-slider-area">
          <div className="solution-slider-wrapper">
            <button
              type="button"
              className="slider-arrow-btn prev-btn"
              onClick={goToPrev}
              aria-label="Previous solution"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="slider-card-stage">
              <div className={`single-solution-card slide-${slideDirection}`}>
                <div className="card-accent-strip" style={{ backgroundColor: currentSolution.tint }} />
                <div className="card-header-row">
                  <div className="card-badge-wrap">
                    <span className="solution-icon" style={{ backgroundColor: currentSolution.tint }} />

                  </div>
                  <div className="card-counter">
                    <span className="current-num">{formattedIndex}</span>
                    <span className="divider">/</span>
                    <span className="total-num">{formattedTotal}</span>
                  </div>
                </div>
                <h3 className="single-solution-title">{currentSolution.title}</h3>
                <p className="single-solution-desc">{currentSolution.desc}</p>
                <div className="card-bottom-row">
                </div>
              </div>
            </div>

            <button
              type="button"
              className="slider-arrow-btn next-btn"
              onClick={goToNext}
              aria-label="Next solution"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="slider-pagination" aria-label="Solution navigation">
            {SOLUTIONS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`pagination-dot ${activeIndex === index ? "is-active" : ""}`}
                onClick={() => {
                  setSlideDirection(index > activeIndex ? "next" : "prev");
                  setActiveIndex(index);
                }}
                aria-label={`Go to solution ${index + 1}: ${item.title}`}
              >
                <span className="dot-fill" style={{ backgroundColor: activeIndex === index ? item.tint : undefined }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}