import Link from "next/link";
import "./SolutionsHero.scss";
import { HERO_INDEX_ITEMS } from "@/data/solutions/solutionsData";

export function SolutionsHero() {
  return (
    <section
      id="solutions"
      className="solutions-hero-section"
      aria-label="Solutions Hero"
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

      <div className="solutions-hero-container">
        <div data-reveal="" className="solutions-hero-eyebrow">
          Solutions
        </div>

        <div className="solutions-hero-grid">
          <h1 data-reveal="" className="solutions-hero-headline">
            Different products.<br />
            <span className="highlight">One Team Behind All.</span>
          </h1>

          <div className="solutions-hero-side">
            <p data-reveal="" className="solutions-hero-desc">
              Mobile, web, custom software, AI, enterprise systems and cloud.
              Every engagement is delivered by the team that builds and runs
              nine live products on the same shared core.
            </p>

            <div data-reveal="" className="solutions-hero-actions">
              <Link href="#mobile-applications" className="btn-primary">
                Explore the six
              </Link>

              <Link href="/contact" className="btn-outline">
                Talk to sales
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Index Grid */}
        {/* <div className="solutions-hero-index">
          {HERO_INDEX_ITEMS.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              data-reveal=""
              className="index-card"
            >
              <div className="index-content">
                <span className="index-num">{item.num}</span>
                <div className="index-title-row">
                  <span
                    className="index-dot"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span className="index-title">{item.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div> */}
      </div>
    </section>
  );
}