"use client";

import React from "react";
import { useAboutCarousel } from "@/components/About/useAboutCarousel";
import "./NeedlyStack.scss";

interface TechItem {
  name: string;
  role: string;
  logo: string;
}

const TECH_STACK: TechItem[] = [
  { name: "React", role: "Web console", logo: "/technology/reactjs.png" },
  { name: "Node.js", role: "Services", logo: "/technology/nodejs.png" },
  { name: "PostgreSQL", role: "Bookings data", logo: "/technology/Postgre-SQL.png" },
  { name: "Flutter", role: "Staff mobile", logo: "/technology/Flutter.png" },
  { name: "AWS", role: "Multi-region cloud", logo: "/technology/AWS.png" },
  { name: "Figma", role: "Design system", logo: "/technology/Figma.png" },
];

function TechItemBoxView({
  item,
  isClone = false,
}: {
  item: TechItem;
  isClone?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`tech-item-box ${isClone ? "tech-item-box--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="tech-content">
        <div className="tech-name">{item.name}</div>
        <div className="tech-role">{item.role}</div>
      </div>
      {item.logo && (
        <div className="tech-logo">
          <img src={item.logo} alt={`${item.name} logo`} />
        </div>
      )}
    </div>
  );
}

export function NeedlyStack() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(TECH_STACK.length, 1024);

  return (
    <section id="stack" className="appointgem-stack-section" aria-labelledby="stack-title">
      <div className="appointgem-stack-container">
        <div className="stack-card-wrapper">
          <div className="stack-grid">
            <div className="stack-info">
              <span data-reveal="" className="stack-eyebrow">Technology</span>
              <h2 data-reveal="" id="stack-title" className="stack-headline">
                The stack behind <br />it
              </h2>
              <p data-reveal="" className="stack-desc">
                Same toolchain as every other Infinium product, so a fix in the platform layer lands here too.
              </p>
            </div>

            <div className="tech-wrap">
              <div className="tech-track">
                <div className="tech-items-grid" ref={scrollRef}>
                  {/* Clone of last card */}
                  <TechItemBoxView
                    item={TECH_STACK[TECH_STACK.length - 1]}
                    isClone={true}
                  />

                  {/* Real items */}
                  {TECH_STACK.map((item) => (
                    <TechItemBoxView key={item.name} item={item} />
                  ))}

                  {/* Clone of first card */}
                  <TechItemBoxView item={TECH_STACK[0]} isClone={true} />
                </div>

                {/* Left/Right Buttons */}
                <button
                  type="button"
                  className="carousel-btn carousel-btn--left"
                  aria-label="Previous tech item"
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
                  aria-label="Next tech item"
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

              {/* Dots */}
              <div className="carousel-dots" aria-label="Tech stack navigation dots">
                {TECH_STACK.map((item, idx) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                    onClick={() => scrollToIndex(idx)}
                    aria-label={`Go to tech item ${idx + 1}`}
                  >
                    <span className="dot-fill" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
