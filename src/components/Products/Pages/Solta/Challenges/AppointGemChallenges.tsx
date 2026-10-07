"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AppointGemChallenges.scss";

const CHALLENGES = [
  {
    num: "01",
    title: "Availability nobody trusted",
    desc: "Slots were offered from a shared sheet that never reflected leave, rosters or room capacity.",
  },
  {
    num: "02",
    title: "Payments off to the side",
    desc: "Deposits sat in a separate payment app, so the front desk could not tell what was already paid.",
  },
  {
    num: "03",
    title: "Reminders done by hand",
    desc: "Staff called each customer the evening before, and missed the ones they ran out of time for.",
  },
  {
    num: "04",
    title: "No branch-level view",
    desc: "Multi-location owners could not compare utilisation or revenue without rebuilding a report each month.",
  },
  {
    num: "05",
    title: "Records split per tool",
    desc: "History lived across a diary, a billing tool and WhatsApp, so follow-ups repeated questions.",
  },
  {
    num: "06",
    title: "Rescheduling chaos",
    desc: "A single move meant three manual edits, and the invoice still pointed at the original slot.",
  },
];

export function AppointGemChallenges() {
  const challengesGridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth > 767 ? 2 : 1);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const syncActiveIndex = useCallback(() => {
    const grid = challengesGridRef.current;
    const firstCard = grid?.firstElementChild as HTMLElement | null;
    if (!grid || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
    const distance = firstCard.offsetWidth + gap;
    const maxIndex = Math.max(0, CHALLENGES.length - visibleCards);
    const nextIndex = Math.max(
      0,
      Math.min(maxIndex, Math.round(grid.scrollLeft / distance)),
    );

    setActiveIndex(nextIndex);
  }, [visibleCards]);

  useEffect(() => {
    const grid = challengesGridRef.current;
    if (!grid) return;

    grid.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      grid.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [syncActiveIndex]);

  const moveChallenges = (direction: 1 | -1) => {
    const grid = challengesGridRef.current;
    const firstCard = grid?.firstElementChild as HTMLElement | null;
    if (!grid || !firstCard) return;

    const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
    const distance = firstCard.offsetWidth + gap;
    const maxIndex = Math.max(0, CHALLENGES.length - visibleCards);
    const nextIndex = Math.max(
      0,
      Math.min(maxIndex, activeIndex + direction),
    );

    setActiveIndex(nextIndex);
    grid.scrollTo({ left: nextIndex * distance, behavior: "smooth" });
  };

  return (
    <section id="challenges" className="appointgem-challenges-section" aria-labelledby="challenges-title">
      <div className="appointgem-challenges-container">
        <div className="challenges-card-wrapper">
          <div className="challenges-header">
            <div>
              <span data-reveal="" className="challenges-eyebrow">Key challenges</span>
              <h2 data-reveal="" id="challenges-title" className="challenges-headline">
                What broke before <br className="mobile-title-break" />the platform
              </h2>
            </div>
            <p data-reveal="" className="challenges-subtitle">
              Drawn from onboarding clinics, studios and diagnostics chains that ran on shared spreadsheets and a phone line.
            </p>
          </div>

          <div className="challenges-grid-wrap">
            {activeIndex > 0 && (
              <button
                type="button"
                className="challenges-scroll-button challenges-scroll-button--previous"
                onClick={() => moveChallenges(-1)}
                aria-label="Show previous challenges"
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
            )}

            <div ref={challengesGridRef} className="challenges-grid">
              {CHALLENGES.map((item) => (
                <div key={item.num} data-reveal="" className="challenge-item">
                  <span className="challenge-num">{item.num}</span>
                  <h3 className="challenge-item-title">{item.title}</h3>
                  <p className="challenge-item-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {activeIndex < CHALLENGES.length - visibleCards && (
              <button
                type="button"
                className="challenges-scroll-button challenges-scroll-button--next"
                onClick={() => moveChallenges(1)}
                aria-label="Show next challenges"
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}