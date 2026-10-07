"use client";

import { ABOUT_BELIEFS, AboutBelief } from "@/data/aboutData";
import { useAboutCarousel } from "../useAboutCarousel";
import "./AboutBeliefs.scss";

function BeliefCardView({
  belief,
  isClone = false,
  isLast = false,
}: {
  belief: AboutBelief;
  isClone?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`belief-card ${isClone ? "belief-card--clone" : ""} ${isLast ? "belief-card--last" : ""
        }`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div
        className="belief-indicator"
        style={{ backgroundColor: belief.tint }}
        aria-hidden="true"
      />
      <h3 className="belief-title">{belief.name}</h3>
      <p className="belief-desc">{belief.desc}</p>
    </div>
  );
}

export function AboutBeliefs() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(ABOUT_BELIEFS.length, 1024);

  return (
    <section className="about-beliefs-section" aria-label="What We Believe">
      <div className="about-beliefs-container">
        <div data-reveal="" className="about-beliefs-eyebrow">
          What we believe
        </div>

        <div className="about-beliefs-wrap">
          <div className="about-beliefs-track">
            <div className="about-beliefs-grid" ref={scrollRef}>
              {/* Clone of last card placed before first card for seamless reverse scroll */}
              <BeliefCardView
                belief={ABOUT_BELIEFS[ABOUT_BELIEFS.length - 1]}
                isClone={true}
              />

              {/* Real Beliefs */}
              {ABOUT_BELIEFS.map((belief, idx) => (
                <BeliefCardView
                  key={idx}
                  belief={belief}
                  isLast={idx === ABOUT_BELIEFS.length - 1}
                />
              ))}

              {/* Clone of first card placed right next to last card for seamless forward scroll */}
              <BeliefCardView belief={ABOUT_BELIEFS[0]} isClone={true} />
            </div>

            {/* Left Arrow Button (exact card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous belief"
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

            {/* Right Arrow Button (exact card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next belief"
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
          <div className="carousel-dots" aria-label="Beliefs navigation dots">
            {ABOUT_BELIEFS.map((belief, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to belief ${idx + 1}: ${belief.name}`}
              >
                <span
                  className="dot-fill"
                  style={{
                    backgroundColor: activeIndex === idx ? belief.tint : "#0C0C0D",
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
