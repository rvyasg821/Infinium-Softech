"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./NeedlyInterface.scss";

const IMAGES = Array.from({ length: 12 }, (_, i) => `/shots/Needly/Needly_ui-${i + 1}.png`);

const MOBILE_QUERY = "(max-width: 1023px)";
const MOBILE_SLIDE_DELAY = 2500; // ms between slides on mobile

export function NeedlyInterface() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<boolean>(false);
  const stoppedRef = useRef<boolean>(false); // true once the user touches/clicks on mobile

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

  // Reset scroll + stop state when switching between desktop and mobile
  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = 0;
    stoppedRef.current = false;
    setActiveIndex(0);
  }, [isMobile]);

  // DESKTOP: continuous marquee
  useEffect(() => {
    if (isMobile) return;

    let animationFrameId: number;

    const scrollStep = () => {
      const track = trackRef.current;
      if (track && !hoverRef.current) {
        track.scrollLeft += 0.8;

        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  // Scroll to a specific slide (used by auto-slide, arrows and dots)
  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slideWidth = track.clientWidth;
    if (!slideWidth) return;

    track.scrollTo({ left: index * slideWidth, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  // MOBILE: one image at a time, auto slide until user interacts
  useEffect(() => {
    if (!isMobile) return;

    const interval = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || stoppedRef.current) return;

      const slideWidth = track.clientWidth;
      if (!slideWidth) return;

      const currentIndex = Math.round(track.scrollLeft / slideWidth);
      const nextIndex = currentIndex + 1 >= IMAGES.length ? 0 : currentIndex + 1;

      goTo(nextIndex);
    }, MOBILE_SLIDE_DELAY);

    return () => window.clearInterval(interval);
  }, [isMobile, goTo]);

  // Keep the active dot in sync when the user swipes manually
  const handleScroll = () => {
    if (!isMobile) return;
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;

    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex((prev) => (prev === index ? prev : index));
  };

  // Stop the mobile carousel permanently when user touches / clicks
  const handleUserInteract = () => {
    if (isMobile) stoppedRef.current = true;
  };

  const handlePrev = () => {
    stoppedRef.current = true;
    goTo(activeIndex === 0 ? IMAGES.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    stoppedRef.current = true;
    goTo(activeIndex === IMAGES.length - 1 ? 0 : activeIndex + 1);
  };

  const handleDotClick = (index: number) => {
    stoppedRef.current = true;
    goTo(index);
  };

  // On mobile show each image once, on desktop duplicate for the infinite marquee
  const list = isMobile ? IMAGES : [...IMAGES, ...IMAGES];

  return (
    <section id="interface" className="needly-interface-section">
      <div className="needly-interface-container">

        <div className="interface-header">
          <span className="section-eyebrow" data-reveal="">Interface</span>
          <h2 className="interface-headline">
            Purpose-built interfaces for every user.
          </h2>
          <p className="interface-desc">
            From sending grocery requests to managing shop responses, Needly provides simple interfaces designed for both customers and shop owners.
          </p>
        </div>

        <div
          className="interface-carousel-wrapper"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
          onPointerDown={handleUserInteract}
          onTouchStart={handleUserInteract}
          onClick={handleUserInteract}
        >
          {isMobile && (
            <button
              type="button"
              className="interface-arrow interface-arrow-left"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div className="interface-marquee-viewport" ref={trackRef} onScroll={handleScroll}>
            <div className="interface-marquee-track">
              {list.map((src, idx) => (
                <div key={`${src}-${idx}`} className="interface-image-card">
                  <Image
                    src={src}
                    alt={`Needly Interface ${(idx % IMAGES.length) + 1}`}
                    width={300}
                    height={650}
                    className="grid-image"
                    priority={idx < 2}
                  />
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <button
              type="button"
              className="interface-arrow interface-arrow-right"
              onClick={handleNext}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {isMobile && (
          <div className="interface-dots" role="tablist" aria-label="Interface images">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to image ${i + 1}`}
                className={`interface-dot${i === activeIndex ? " is-active" : ""}`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}