"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { STACK_LAYERS, STACK_NOTES, StackLayer } from "@/data/stackData";
import "./TechStack.scss";

export function TechStack() {
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const [activeNoteIdx, setActiveNoteIdx] = useState(0);
  const isInteractingRef = useRef(false);

  const scrollToNote = useCallback((idx: number) => {
    const container = notesContainerRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    let targetIdx = idx;
    if (targetIdx < 0) targetIdx = STACK_NOTES.length - 1;
    if (targetIdx >= STACK_NOTES.length) targetIdx = 0;
    setActiveNoteIdx(targetIdx);

    const target = cards[targetIdx];
    if (target) {
      const left =
        target.offsetLeft -
        container.offsetLeft -
        (container.offsetWidth - target.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, left),
        behavior: "smooth",
      });
    }
  }, []);

  const handlePrev = useCallback(() => {
    isInteractingRef.current = true;
    scrollToNote(activeNoteIdx - 1);
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 4000);
  }, [activeNoteIdx, scrollToNote]);

  const handleNext = useCallback(() => {
    isInteractingRef.current = true;
    scrollToNote(activeNoteIdx + 1);
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 4000);
  }, [activeNoteIdx, scrollToNote]);

  // Track active note during manual scroll
  useEffect(() => {
    const container = notesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (window.innerWidth >= 768) return;
      const cards = Array.from(container.children) as HTMLElement[];
      if (!cards.length) return;

      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((el, idx) => {
        const elCenter = el.offsetLeft - container.offsetLeft + el.offsetWidth / 2;
        const diff = Math.abs(containerCenter - elCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      setActiveNoteIdx(closestIdx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll on mobile/tablet (< 768px)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 768 || isInteractingRef.current) return;
      setActiveNoteIdx((prev) => {
        const next = (prev + 1) % STACK_NOTES.length;
        const container = notesContainerRef.current;
        if (container) {
          const cards = Array.from(container.children) as HTMLElement[];
          const target = cards[next];
          if (target) {
            const left =
              target.offsetLeft -
              container.offsetLeft -
              (container.offsetWidth - target.offsetWidth) / 2;
            container.scrollTo({
              left: Math.max(0, left),
              behavior: "smooth",
            });
          }
        }
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="stack"
      className="stack-section content-padding"
      aria-label="Technology Stack"
    >
      {/* Background Radial Glow */}
      <div className="stack-glow" aria-hidden="true" />

      <div className="stack-container">
        {/* Section Header */}
        <div className="stack-header">
          <div>
            <div data-reveal="" className="stack-eyebrow">Technology</div>

            <h2 data-reveal="" className="stack-headline">
              The Technology Behind
              <br />
              <span className="highlight">Every Product.</span>
            </h2>
          </div>

          <p data-reveal="" className="stack-intro">
            Web, mobile, and cloud solutions are built on a shared
            technology foundation, so improvements at the platform level
            can benefit products across the entire ecosystem.
          </p>
        </div>

        {/* 3 Architecture Layers with Marquee Tracks */}
        <div className="stack-layers">
          {STACK_LAYERS.map((layer: StackLayer) => (
            <div data-reveal="" key={layer.n} className="stack-layer-row">
              {/* Left Layer Info */}
              <div className="layer-meta">
                <div className="layer-kicker-row">
                  <span className="layer-kicker">{layer.kicker}</span>
                </div>

                <h3 className="layer-title">{layer.title}</h3>
                <p className="layer-desc">{layer.desc}</p>
              </div>

              {/* Right Marquee Infinite Track */}
              <div className="layer-marquee-wrapper">
                <div
                  className={`marquee-track direction-${layer.direction}`}
                  style={{
                    animationDuration: `${layer.duration}s`,
                  }}
                >
                  {/* Render twice for seamless infinite scroll loop */}
                  {[0, 1].map((copyIdx) => (
                    <div
                      key={copyIdx}
                      className="marquee-group"
                      aria-hidden={copyIdx === 1 ? "true" : undefined}
                    >
                      {layer.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="tech-chip">
                          {item.icon ? (
                            <div className="chip-icon-wrapper">
                              <Image 
                                src={item.icon} 
                                alt={item.name} 
                                width={24} 
                                height={24} 
                                unoptimized={item.icon.endsWith(".svg")}
                                className="tech-chip-img"
                              />
                            </div>
                          ) : (
                            <span
                              className="chip-tint"
                              style={{ backgroundColor: item.tint }}
                              aria-hidden="true"
                            />
                          )}
                          <div className="chip-info">
                            <span className="chip-name">{item.name}</span>
                            <span className="chip-role">{item.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3 Architecture Commitments */}
        <div
          className="stack-notes-wrap"
          onMouseEnter={() => {
            isInteractingRef.current = true;
          }}
          onMouseLeave={() => {
            isInteractingRef.current = false;
          }}
          onTouchStart={() => {
            isInteractingRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isInteractingRef.current = false;
            }, 3000);
          }}
        >
          {/* Mobile Navigation Left Arrow Button */}
          {/* <button
            type="button"
            className="stack-notes-arrow prev-btn"
            onClick={handlePrev}
            aria-label="Previous architecture commitment"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button> */}

          {/* <div ref={notesContainerRef} className="stack-notes-grid">
            {STACK_NOTES.map((note, idx) => (
              <div data-reveal="" key={idx} className="note-card">
                <div className="note-check" aria-hidden="true">
                  ✓
                </div>
                <p className="note-text">{note}</p>
              </div>
            ))}
          </div> */}

          {/* Mobile Navigation Right Arrow Button */}
          {/* <button
            type="button"
            className="stack-notes-arrow next-btn"
            onClick={handleNext}
            aria-label="Next architecture commitment"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button> */}

          {/* Mobile Dots Pagination Indicator */}
          {/* <div
            className="stack-notes-dots"
            aria-label="Architecture commitments pagination"
          >
            {STACK_NOTES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`notes-dot ${
                  activeNoteIdx === idx ? "is-active" : ""
                }`}
                onClick={() => scrollToNote(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
