"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./NeedlySolution.scss";

const MOBILE_QUERY = "(max-width: 1023px)";
const SLIDE_DELAY = 3000; // ms between slides on mobile / tablet

const CARDS = [
  {
    title: "Quick Request Builder",
    desc: "Our simple list maker lets customers effortlessly draft and send grocery requests to nearby shops.",
    className: "span-2 bg-orange-gradient dark-text",
  },
  {
    title: "Shop Verification",
    desc: "A rigorous vetting system ensures shoppers connect only with legitimate, trusted local grocery stores.",
    className: "",
  },
  {
    title: "Transparent Confirmation",
    desc: "Users review exact quotes directly from shop owners before securely confirming. No hidden fees.",
    className: "",
  },
  {
    title: "Any-Device Sync",
    desc: "The request-and-response loop works seamlessly across both mobile apps and web browsers for everyone.",
    className: "span-2 bg-solid-green white-text",
  },
  {
    title: "Live Notification Cloud",
    desc: "A specialized architecture manages real-time pings reliably between customers and busy shops.",
    className: "span-1-5",
  },
  {
    title: "Platform Insights",
    desc: "Integrated dashboards help admins track request volumes, shop reply rates, and successful drop-offs.",
    className: "span-1-5",
  },
  {
    title: "Nearby Shop Matching",
    desc: "Every request is routed automatically to grocery shops in your area, so the closest stores see your list first and reply faster.",
    className: "span-2 bg-soft-green",
  },
  {
    title: "Compare Shop Replies",
    desc: "Receive quotes from several shops side by side and choose the best price and availability.",
    className: "",
  },
];

export function NeedlySolution() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stoppedRef = useRef<boolean>(false); // true once the user touches/clicks the carousel

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect mobile / tablet breakpoint
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Reset position when switching between desktop and mobile
  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = 0;
    stoppedRef.current = false;
    setActiveIndex(0);
  }, [isMobile]);

  // Distance between the start of one slide and the next (card width + gap)
  const getStride = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  };

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const stride = getStride();
    if (!stride) return;

    track.scrollTo({ left: index * stride, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  // Auto slide on mobile until the user interacts
  useEffect(() => {
    if (!isMobile) return;

    const interval = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || stoppedRef.current) return;

      const stride = getStride();
      if (!stride) return;

      const current = Math.round(track.scrollLeft / stride);
      goTo(current + 1 >= CARDS.length ? 0 : current + 1);
    }, SLIDE_DELAY);

    return () => window.clearInterval(interval);
  }, [isMobile, goTo]);

  // Keep dots in sync when the user swipes
  const handleScroll = () => {
    if (!isMobile) return;
    const track = trackRef.current;
    const stride = getStride();
    if (!track || !stride) return;

    const index = Math.round(track.scrollLeft / stride);
    setActiveIndex((prev) => (prev === index ? prev : index));
  };

  const stopAutoSlide = () => {
    stoppedRef.current = true;
  };

  const handlePrev = () => {
    stopAutoSlide();
    goTo(activeIndex === 0 ? CARDS.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    stopAutoSlide();
    goTo(activeIndex === CARDS.length - 1 ? 0 : activeIndex + 1);
  };

  const handleDotClick = (index: number) => {
    stopAutoSlide();
    goTo(index);
  };

  return (
    <section id="solution" className="needly-solution-section">
      <div className="needly-solution-container">

        <div className="solution-header">
          <span className="section-eyebrow" data-reveal="">Our solution</span>
          <h2 className="solution-headline">
            Smart, fast, and transparent tools for local request matching.
          </h2>
          <p className="solution-desc">
            Needly's custom solutions ensure smooth list creation, rapid shop replies, secure confirmations, and effortless local coordination.
          </p>
        </div>

        <div className="solution-carousel">
          <div
            className="solution-bento-grid"
            ref={trackRef}
            onScroll={handleScroll}
            onPointerDown={stopAutoSlide}
            onTouchStart={stopAutoSlide}
          >
            {CARDS.map((card) => (
              <div key={card.title} className={`bento-card ${card.className}`.trim()}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Controls: only visible on 1023px and below (hidden by CSS on desktop) */}
          <div className="solution-controls">
            <button
              type="button"
              className="solution-arrow"
              onClick={handlePrev}
              aria-label="Previous card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="solution-dots" role="tablist" aria-label="Solution cards">
              {CARDS.map((card, i) => (
                <button
                  key={card.title}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to card ${i + 1}`}
                  className={`solution-dot${i === activeIndex ? " is-active" : ""}`}
                  onClick={() => handleDotClick(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="solution-arrow"
              onClick={handleNext}
              aria-label="Next card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}