"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback, RefObject } from "react";
import {
  DELIVERY_STEPS,
  ENGAGEMENT_MODELS,
  DeliveryStep,
  EngagementModel,
} from "@/data/deliverData";
import { ABOUT_ENGAGEMENTS } from "@/data/aboutData";
import "./Delivery.scss";

function useCarousel(ref: RefObject<HTMLDivElement | null>, itemCount: number) {
  const pausedRef = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getVisibleCards = useCallback(() => {
    const el = ref.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>("[data-card]")).filter(
      (card) => {
        return (
          card.offsetParent !== null ||
          window.getComputedStyle(card).display !== "none"
        );
      }
    );
  }, [ref]);

  const getCardCenterScrollLeft = useCallback(
    (el: HTMLElement, card: HTMLElement) => {
      const cardRect = card.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const cardRelativeLeft = cardRect.left - elRect.left + el.scrollLeft;
      return cardRelativeLeft - (el.clientWidth - card.offsetWidth) / 2;
    },
    []
  );

  const getActiveIndex = useCallback(() => {
    const el = ref.current;
    if (!el) return 0;
    const cards = getVisibleCards();
    if (cards.length === 0) return 0;

    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const cardRelativeLeft = cardRect.left - elRect.left + el.scrollLeft;
      const cardCenter = cardRelativeLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [ref, getVisibleCards]);

  const scrollToIndex = useCallback(
    (targetIndex: number, smooth = true) => {
      const el = ref.current;
      if (!el) return;
      const cards = getVisibleCards();
      if (cards.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
      const targetCard = cards[clampedIndex];
      const targetScrollLeft = getCardCenterScrollLeft(el, targetCard);

      el.scrollTo({
        left: Math.max(
          0,
          Math.min(el.scrollWidth - el.clientWidth, targetScrollLeft)
        ),
        behavior: smooth ? "smooth" : "instant",
      });
    },
    [ref, getVisibleCards, getCardCenterScrollLeft]
  );

  const handleNext = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cards = getVisibleCards();
    if (cards.length === 0) return;

    const currentIndex = getActiveIndex();
    const nextIndex = currentIndex + 1;

    if (nextIndex < cards.length) {
      scrollToIndex(nextIndex, true);
    } else {
      scrollToIndex(0, true);
    }
  }, [ref, getVisibleCards, getActiveIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cards = getVisibleCards();
    if (cards.length === 0) return;

    const currentIndex = getActiveIndex();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      scrollToIndex(prevIndex, true);
    } else {
      scrollToIndex(cards.length - 1, true);
    }
  }, [ref, getVisibleCards, getActiveIndex, scrollToIndex]);

  const pauseTemporarily = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, 4500);
  }, []);

  // Initialize position to first real card on mobile mount
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;

    const cards = getVisibleCards();
    if (cards.length === itemCount + 2) {
      scrollToIndex(1, false);
    }
  }, [ref, itemCount, getVisibleCards, scrollToIndex]);

  // Seamless jump between clones and original cards
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let jumpTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (jumpTimeout) clearTimeout(jumpTimeout);

      jumpTimeout = setTimeout(() => {
        const cards = getVisibleCards();
        if (cards.length !== itemCount + 2) return;

        const currentIndex = getActiveIndex();
        if (currentIndex === 0) {
          // At prepended clone of last item -> jump silently to real last item
          scrollToIndex(itemCount, false);
        } else if (currentIndex === itemCount + 1) {
          // At appended clone of first item -> jump silently to real first item
          scrollToIndex(1, false);
        }
      }, 150);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (jumpTimeout) clearTimeout(jumpTimeout);
    };
  }, [ref, itemCount, getVisibleCards, getActiveIndex, scrollToIndex]);

  // Auto-scroll on mobile
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const interval = setInterval(() => {
      if (pausedRef.current || !el) return;
      handleNext();
    }, 3200);

    return () => clearInterval(interval);
  }, [ref, handleNext]);

  return {
    handleNext,
    handlePrev,
    pauseTemporarily,
  };
}

function StepCardView({
  step,
  isClone = false,
  index = 0,
}: {
  step: DeliveryStep;
  isClone?: boolean;
  index?: number;
}) {
  return (
    <div
      className={`step-card ${isClone ? "step-card--clone" : `step-card--${index + 1}`
        }`}
      data-card
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="step-header">
        <span className="step-num">{step.n}</span>
        <span className="step-time">{step.time}</span>
      </div>

      <div
        className="step-bar"
        style={{ backgroundColor: step.tint }}
        aria-hidden="true"
      />

      <h3 className="step-title">{step.title}</h3>
      <p className="step-desc">{step.desc}</p>
      <div className="step-owner">{step.owner}</div>
    </div>
  );
}

function EngagementCardView({
  model,
  isClone = false,
  index = 0,
}: {
  model: EngagementModel;
  isClone?: boolean;
  index?: number;
}) {
  return (
    <div
      className={`engagement-card ${isClone ? "engagement-card--clone" : `engagement-card--${index + 1}`
        }`}
      data-card
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="engagement-top">
        <span className="engagement-tag">{model.tag}</span>
        <div
          className="engagement-icon"
          style={{ backgroundColor: model.tint }}
          aria-hidden="true"
        />
      </div>

      <h3 className="engagement-title">{model.title}</h3>
      <p className="engagement-desc">{model.desc}</p>

      <div className="engagement-points">
        {model.points.map((point: string, pIdx: number) => (
          <div key={pIdx} className="point-item">
            <span className="check-icon" aria-hidden="true">
              ✓
            </span>
            <span>{point}</span>
          </div>
        ))}
        <div className="point-divider-bottom" aria-hidden="true" />
      </div>

      <div className="engagement-footer">
        <span className="fit-label">{model.fit}</span>
        <Link href="contact" className="btn-talk">
          Talk to us{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export function Delivery() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const engagementRef = useRef<HTMLDivElement>(null);

  const stepsCarousel = useCarousel(stepsRef, DELIVERY_STEPS.length);
  const engagementCarousel = useCarousel(
    engagementRef,
    ENGAGEMENT_MODELS.length
  );

  return (
    <section
      id="demo"
      className="delivery-section content-padding"
      aria-label="Delivery and Engagements"
    >
      <div className="delivery-container">
        {/* Section Header */}
        <div className="delivery-header">
          <div>
            <div data-reveal="" className="delivery-eyebrow">How we deliver</div>

            <h2 data-reveal="" className="delivery-headline">
              From first call to
              <br />
              live in production.
            </h2>
          </div>

          <p data-reveal="" className="delivery-intro">
            A fixed delivery method behind every product. You always know what
            happens next, who owns it, and when it goes live.
          </p>
        </div>

        {/* 5-Step Delivery Pipeline */}
        <div data-reveal="" className="delivery-steps-wrap">
          <div className="delivery-steps-grid" ref={stepsRef}>
            {/* Clone of last card placed before first card for seamless reverse scroll */}
            <StepCardView
              step={DELIVERY_STEPS[DELIVERY_STEPS.length - 1]}
              isClone={true}
            />

            {/* Real Delivery Steps */}
            {DELIVERY_STEPS.map((step: DeliveryStep, idx: number) => (
              <StepCardView key={step.n} step={step} index={idx} />
            ))}

            {/* Clone of first card placed right next to last card for seamless forward scroll */}
            <StepCardView step={DELIVERY_STEPS[0]} isClone={true} />
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            className="carousel-btn carousel-btn--left"
            aria-label="Previous step"
            onClick={() => {
              stepsCarousel.pauseTemporarily();
              stepsCarousel.handlePrev();
            }}
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

          {/* Right Arrow Button */}
          <button
            type="button"
            className="carousel-btn carousel-btn--right"
            aria-label="Next step"
            onClick={() => {
              stepsCarousel.pauseTemporarily();
              stepsCarousel.handleNext();
            }}
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

        {/* 3 Engagement Models */}
        <div className="engagement-wrap">
          <div className="engagement-grid" ref={engagementRef}>
            {/* Clone of last card placed before first card for seamless reverse scroll */}
            <EngagementCardView
              model={ENGAGEMENT_MODELS[ENGAGEMENT_MODELS.length - 1]}
              isClone={true}
            />

            {/* Real Engagement Models */}
            {ENGAGEMENT_MODELS.map((model: EngagementModel, idx: number) => (
              <EngagementCardView key={idx} model={model} index={idx} />
            ))}

            {/* Clone of first card placed right next to last card for seamless forward scroll */}
            <EngagementCardView model={ENGAGEMENT_MODELS[0]} isClone={true} />
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            className="carousel-btn carousel-btn--left"
            aria-label="Previous engagement model"
            onClick={() => {
              engagementCarousel.pauseTemporarily();
              engagementCarousel.handlePrev();
            }}
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

          {/* Right Arrow Button */}
          <button
            type="button"
            className="carousel-btn carousel-btn--right"
            aria-label="Next engagement model"
            onClick={() => {
              engagementCarousel.pauseTemporarily();
              engagementCarousel.handleNext();
            }}
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

        {/* Consultation / Book Demo CTA Banner */}
        <div data-reveal="" className="consultation-card">
          <div className="consultation-glow" aria-hidden="true" />

          <div className="consultation-content-wrap">
            <div className="consultation-info">
              <span className="consultation-badge">Book consultation</span>

              <h3 className="consultation-title">
                Tell us the operation.
                <br />
                We&apos;ll bring the products.
              </h3>

              <p className="consultation-desc">
                A 30-minute session with an implementation lead, mapped to your
                industry and current stack.
              </p>

              <div className="consultation-actions">
                <Link href="/book-a-demo" className="btn-primary-consult">
                  Book Live Demo{" "}
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>

                <Link href="/contact" className="btn-secondary-consult">
                  Talk to sales
                </Link>
              </div>
            </div>

            {/* Right Side Engagement List */}
            <div className="consultation-right">
              {ABOUT_ENGAGEMENTS.map((engagement, idx) => (
                <div key={idx} className="engagement-item">
                  <span
                    className="engagement-dot"
                    style={{ backgroundColor: engagement.tint }}
                    aria-hidden="true"
                  />
                  <div className="engagement-content">
                    <span className="engagement-title">{engagement.title}</span>
                    <span className="engagement-fit">{engagement.fit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Animated Wave Band */}
            <div className="consultation-wave-wrap" aria-hidden="true">
              <div className="wave-inner">
                <svg
                  viewBox="0 0 800 420"
                  preserveAspectRatio="xMidYMid slice"
                  className="wave-svg"
                >
                  <defs>
                    <linearGradient id="ctaBand" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                      <stop
                        offset="34%"
                        stopColor="#4B5CF5"
                        stopOpacity="0.85"
                      />
                      <stop offset="62%" stopColor="#8B3FE8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1F31E8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="ctaBandSoft"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                      <stop
                        offset="46%"
                        stopColor="#6E7BFF"
                        stopOpacity="0.4"
                      />
                      <stop offset="100%" stopColor="#8B3FE8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#ctaBandSoft)" strokeWidth="1">
                    <path d="M-40 296 C 150 246 250 176 420 158 C 560 143 660 176 840 138" />
                    <path d="M-40 308 C 150 258 250 188 420 170 C 560 155 660 188 840 150" />
                    <path d="M-40 320 C 150 270 250 200 420 182 C 560 167 660 200 840 162" />
                    <path d="M-40 332 C 150 282 250 212 420 194 C 560 179 660 212 840 174" />
                    <path d="M-40 344 C 150 294 250 224 420 206 C 560 191 660 224 840 186" />
                    <path d="M-40 356 C 150 306 250 236 420 218 C 560 203 660 236 840 198" />
                  </g>
                  <g fill="none" stroke="url(#ctaBand)" strokeWidth="1.4">
                    <path d="M-40 268 C 160 214 260 150 430 132 C 570 117 670 152 840 112" />
                    <path d="M-40 282 C 160 228 260 164 430 146 C 570 131 670 166 840 126" />
                    <path d="M-40 368 C 150 318 250 248 420 230 C 560 215 660 248 840 210" />
                  </g>
                  <g fill="none" stroke="url(#ctaBandSoft)" strokeWidth="1">
                    <path d="M-40 208 C 170 158 280 104 450 96 C 590 90 690 118 840 84" />
                    <path d="M-40 226 C 170 176 280 122 450 114 C 590 108 690 136 840 102" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
