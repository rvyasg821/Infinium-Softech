"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProductHero.scss";
import { PRODUCT_STATS } from "@/data/productsData";

gsap.registerPlugin(ScrollTrigger);

export function ProductHero() {
  const statsRowRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const statsRow = statsRowRef.current;
    if (!statsRow) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statsRow,
        start: "top 85%",
        once: true,
        onEnter: () => {
          PRODUCT_STATS.forEach((stat, index) => {
            const element = statRefs.current[index];
            if (!element) return;

            const counter = { value: 0 };
            gsap.to(counter, {
              value: stat.raw,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                const formattedValue = stat.decimals && stat.decimals > 0
                  ? counter.value.toFixed(stat.decimals)
                  : Math.round(counter.value).toLocaleString("en-US");

                element.textContent = `${stat.prefix || ""}${formattedValue}${stat.suffix || ""}`;
              },
            });
          });
        },
      });
    }, statsRow);

    return () => context.revert();
  }, []);

  return (
    <section className="product-hero-section" aria-label="Product Hero">
      {/* Glow Orbs */}
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="product-hero-container">
        {/* Eyebrow Badge */}
        <div data-reveal="" className="product-hero-eyebrow">
          Product catalogue
        </div>

        {/* Title & Description Grid */}
        <div className="product-hero-header">
          <h1 data-reveal="" className="product-hero-title">
            Every product we build, <span className="highlight">  in one place.</span>
          </h1>
          <p data-reveal="" className="product-hero-desc">
            Each platform ships independently and inherits the same sign-in,
            billing, reporting and cloud layer. Filter by industry, compare
            what ships in the box, then book a walkthrough of the one that
            fits.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRowRef} className="product-hero-stats">
          {PRODUCT_STATS.map((stat, idx) => (
            <div data-reveal="" key={idx} className="stat-card">
              <div
                ref={(element) => {
                  statRefs.current[idx] = element;
                }}
                className="stat-value"
              >
                {stat.display}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
