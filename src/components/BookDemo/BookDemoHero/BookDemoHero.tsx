"use client";

import "./BookDemoHero.scss";

export function BookDemoHero() {
  return (
    <section className="product-hero-section content-padding" aria-label="Book a Demo Hero">
      {/* Background Animated Glows */}
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
          Book a demo
        </div>

        {/* Title & Description Grid */}
        <div className="product-hero-header">
          <h1 data-reveal="" className="product-hero-title">
            See it running <span className="highlight">on your own numbers.</span>
          </h1>
          <p data-reveal="" className="product-hero-desc">
            Thirty minutes with a product specialist, on a workspace configured
            with your branches, roles and volumes. Not a slide deck.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="book-demo-stats">
          <div data-reveal="" className="stat-card">
            <div className="stat-value">30 min</div>
            <div className="stat-label">Live walkthrough</div>
          </div>
          <div data-reveal="" className="stat-card">
            <div className="stat-value">1 day</div>
            <div className="stat-label">Typical reply time</div>
          </div>
          <div data-reveal="" className="stat-card">
            <div className="stat-value">9</div>
            <div className="stat-label">Products, one platform</div>
          </div>
        </div>
      </div>
    </section>
  );
}
