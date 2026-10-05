import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./AboutHero.scss";

export function AboutHero() {
  return (
    <section className="about-hero-section" aria-label="About Hero">
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

      <div className="about-hero-container">
        <div data-reveal="" className="about-hero-eyebrow">
          About us
        </div>

        <div className="about-hero-grid">
          <h1 data-reveal="" className="about-hero-headline">
            We build products, <br />
            <span className="highlight">not projects.</span>
          </h1>

          <div className="about-hero-side">
            <p data-reveal="" className="about-hero-desc">
              Infinium Softech creates proprietary digital products on a shared technology foundation. From identity and billing to notifications, analytics, and security, our common infrastructure enables every product to evolve faster, scale reliably, and deliver a consistent experience.
            </p>

            <div data-reveal="" className="about-hero-actions">
              <Link href="/products" className="btn-primary">
                See the nine platforms <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline">
                How we deliver <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
