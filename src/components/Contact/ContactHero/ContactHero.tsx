"use client";

import "./ContactHero.scss";

export function ContactHero() {
  return (
    <section className="contact-hero-section content-padding" aria-label="Contact Us Hero">
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

      <div className="contact-hero-container">
        <div data-reveal="" className="contact-hero-eyebrow">
          Contact us
        </div>

        <div className="contact-hero-grid">
          {/* Headline strictly in two lines as requested */}
          <h1 data-reveal="" className="contact-hero-headline">
            Tell us what you run.
            <br />
            <span className="highlight">We&apos;ll show you the fit.</span>
          </h1>

          <div className="contact-hero-side">
            <p data-reveal="" className="contact-hero-intro">
              Every enquiry goes to a person who works on the product, not a queue.
              Tell us the scale you operate at and we&apos;ll come back with the
              platform that matches, a walkthrough and an honest timeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}