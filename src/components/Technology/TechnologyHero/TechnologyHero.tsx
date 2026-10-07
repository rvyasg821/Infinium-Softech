import Link from "next/link";
import "./TechnologyHero.scss";
import { TECHNOLOGY_HERO_INDEX_ITEMS } from "@/data/technology/technologyData";

export function TechnologyHero() {
  return (
    <section
      id="technology"
      className="technology-hero-section"
      aria-label="Technology Hero"
    >
      {/* Background Animated Glow Orbs */}
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="technology-hero-container">
        <div data-reveal="" className="technology-hero-eyebrow">
          Technology Stack
        </div>

        <div className="technology-hero-grid">
          <h1 data-reveal="" className="technology-hero-headline">
            Our Tech Stack. Your<br />
            <span className="highlight"> Digital Advantage.</span>
          </h1>

          <div className="technology-hero-side">
            <p data-reveal="" className="technology-hero-desc">
              Explore our cutting-edge frontend, backend, mobile, database, CMS, cloud, and design technologies designed to deliver scalable, reliable, and future-ready solutions.
            </p>

            <div data-reveal="" className="technology-hero-actions">
              <Link href="#frontend" className="btn-primary">
                Explore All Stack
              </Link>

              <Link href="/contact" className="btn-outline">
                Let’s Build Together
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Category Index Grid */}
      </div>
    </section>
  );
}
