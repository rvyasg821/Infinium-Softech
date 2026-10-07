"use client";

import { ABOUT_DELIVERY_STEPS, AboutDeliveryStep } from "@/data/aboutData";
import { useAboutCarousel } from "../useAboutCarousel";
import "./AboutProcess.scss";

function ProcessCardView({
  step,
  isClone = false,
}: {
  step: AboutDeliveryStep;
  isClone?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`process-step-card ${isClone ? "process-step-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="step-card-num-row">
        <span
          className="step-card-num-badge"
          style={{ backgroundColor: step.tint }}
        >
          {step.n}
        </span>
        <span className="step-card-cadence">{step.time}</span>
      </div>

      <h3 className="step-card-title">{step.title}</h3>
      <p className="step-card-desc">{step.desc}</p>
    </div>
  );
}

export function AboutProcess() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(ABOUT_DELIVERY_STEPS.length, 1280);

  return (
    <section id="process" className="about-process-section" aria-label="How We Deliver">
      <div className="about-process-container">
        <div className="about-process-header">
          <div>
            <div data-reveal="" className="about-process-eyebrow">
              How we deliver
            </div>
            <h2 data-reveal="" className="about-process-headline">
              Five weeks from scope <br /> to go-live.
            </h2>
          </div>
          <p data-reveal="" className="about-process-intro">
            Migration, training and rollout are run by the same team that builds
            the software, with a named point of contact from week one.
          </p>
        </div>

        <div className="about-process-wrap">
          <div className="about-process-track">
            <div className="about-process-grid" ref={scrollRef}>
              {/* Clone of last card placed before first card for seamless reverse scroll */}
              <ProcessCardView
                step={ABOUT_DELIVERY_STEPS[ABOUT_DELIVERY_STEPS.length - 1]}
                isClone={true}
              />

              {/* Real Steps */}
              {ABOUT_DELIVERY_STEPS.map((step) => (
                <ProcessCardView key={step.n} step={step} />
              ))}

              {/* Clone of first card placed right next to last card for seamless forward scroll */}
              <ProcessCardView step={ABOUT_DELIVERY_STEPS[0]} isClone={true} />
            </div>

            {/* Left Arrow Button (exact card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous step"
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
              aria-label="Next step"
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
          <div
            className="carousel-dots"
            aria-label="Delivery steps navigation dots"
          >
            {ABOUT_DELIVERY_STEPS.map((step, idx) => (
              <button
                key={step.n}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to step ${idx + 1}: ${step.title}`}
              >
                <span
                  className="dot-fill"
                  style={{
                    backgroundColor:
                      activeIndex === idx ? step.tint : undefined,
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
