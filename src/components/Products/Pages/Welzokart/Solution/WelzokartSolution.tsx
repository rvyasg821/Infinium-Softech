"use client";

import React, { useState, useRef } from "react";
import "./WelzokartSolution.scss";
import { MousePointerClick, ShieldCheck, CreditCard, LayoutTemplate, Cloud, LineChart, ChevronLeft, ChevronRight } from "lucide-react";

const SOLUTIONS = [
  {
    title: "Intuitive Booking System",
    desc: "We built a user-friendly engine that allows customers to schedule deliveries in seconds. Real-time calendar integration prevents double-ordering.",
    icon: <MousePointerClick />
  },
  {
    title: "Verified Service Provider",
    desc: "A strong verification system was implemented, creating a safe and professional environment for grocery partners and delivery riders.",
    icon: <ShieldCheck />
  },
  {
    title: "Secure Payment Integration",
    desc: "End-to-end encrypted payment gateways supporting multiple methods like cards, wallets, and UPI. Fraud prevention mechanisms ensure trust.",
    icon: <CreditCard />
  },
  {
    title: "Multi-Platform Compatibility",
    desc: "The platform was designed to work seamlessly on web and mobile devices. Responsive layouts and optimized performance ensure uninterrupted service.",
    icon: <LayoutTemplate />
  },
  {
    title: "Scalable Cloud Infrastructure",
    desc: "A robust cloud architecture was used to handle peak traffic without downtime. Automated scaling and backup prepared WelzoKart for expansion.",
    icon: <Cloud />
  },
  {
    title: "Data-Driven Insights & Reporting",
    desc: "We integrated advanced analytics dashboards for admins to track bookings, revenue, and performance, empowering actionable decision making.",
    icon: <LineChart />
  },
];

export function WelzokartSolution() {
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
            Smart, scalable, and secure solutions for seamless grocery services.
          </h2>
          <p className="lc-desc">
            WelzoKart's tailored solutions ensure smooth ordering, secure payments, verified riders, and effortless scalability for a flawless customer experience.
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