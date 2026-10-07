"use client";

import React, { useState, useRef } from "react";
import "./NeedlySolution.scss";
import { MousePointerClick, ShieldCheck, CreditCard, LayoutTemplate, Cloud, LineChart, ChevronLeft, ChevronRight } from "lucide-react";

const SOLUTIONS = [
  {
    title: "Quick Request Builder",
    desc: "We built a simple list maker that lets customers easily draft and send grocery requests to nearby shops.",
    icon: <MousePointerClick />
  },
  {
    title: "Shop Verification",
    desc: "A strong vetting system ensures shoppers connect only with legitimate, trusted local grocery stores.",
    icon: <ShieldCheck />
  },
  {
    title: "Transparent Confirmation",
    desc: "Customers review exact quotes from shop owners before securely confirming their orders. No hidden fees.",
    icon: <CreditCard />
  },
  {
    title: "Any-Device Sync",
    desc: "The request-and-response loop works seamlessly across both mobile apps and web browsers for fast access.",
    icon: <LayoutTemplate />
  },
  {
    title: "Live Notification Cloud",
    desc: "A real-time architecture reliably manages instant pings between customers and busy shop owners.",
    icon: <Cloud />
  },
  {
    title: "Platform Insights",
    desc: "Integrated dashboards help track request volumes, shop reply rates, and overall successful local deliveries.",
    icon: <LineChart />
  },
];

export function NeedlySolution() {
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!gridRef.current) return;
    const { scrollLeft, clientWidth } = gridRef.current;
    if (clientWidth > 0) {
      const cardWidth = gridRef.current.children[0]?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(Math.max(index, 0), SOLUTIONS.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (!gridRef.current) return;
    const card = gridRef.current.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(SOLUTIONS.length - 1, activeIndex + 1);
    scrollToSlide(nextIndex);
  };

  return (
    <section id="solution" className="welzokart-solution-lc">
      <div className="solution-lc-container">

        <div className="solution-lc-header">
          <span className="lc-eyebrow">OUR SOLUTION</span>
          <h2 className="lc-headline">
            Smart, fast, and transparent tools for local request matching.
          </h2>
          <p className="lc-desc">
            Needly's custom solutions ensure smooth list creation, rapid shop replies, secure confirmations, and effortless local delivery coordination.
          </p>
        </div>

        <div className="solution-carousel-wrapper">
          <button
            type="button"
            className="solution-nav-btn prev-btn"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous solution card"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={gridRef}
            className="solution-lc-grid"
            onScroll={handleScroll}
          >
            {SOLUTIONS.map((item, idx) => (
              <div key={idx} className="lc-solution-card">
                <div className="lc-card-header">
                  <div className="lc-card-icon">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="solution-nav-btn next-btn"
            onClick={handleNext}
            disabled={activeIndex === SOLUTIONS.length - 1}
            aria-label="Next solution card"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="solution-carousel-dots" aria-label="Solution pagination">
          {SOLUTIONS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`solution-dot ${activeIndex === idx ? "is-active" : ""}`}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to solution card ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}