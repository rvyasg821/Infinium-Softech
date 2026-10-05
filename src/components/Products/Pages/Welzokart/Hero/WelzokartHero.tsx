"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import "./WelzokartHero.scss";

export function WelzokartHero({ product }: { product: ProductItem }) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <section ref={sectionRef} className="appointgem-hero-section" aria-labelledby="appointgem-title">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="appointgem-hero-container">
        <div data-reveal="" className="appointgem-hero-crumbs">
          <Link href="/products">Products</Link>
          <span>/</span>
          <span className="current">Welzokart</span>
        </div>

        <div data-reveal="" className="appointgem-hero-identity">
          <img src={product.logo || "/logos/welzokart-logo.png"} alt={`${product.name} Logo`} className="appointgem-hero-logo" />
          <div>
            <strong>Welzokart</strong>
            <span className="sub">
              <i className="appointgem-hero-pulse-dot" /> Smart Grocery Delivery Platform
            </span>
          </div>
        </div>

        <div ref={introRef} className="appointgem-hero-intro">
          <h1 data-reveal="" id="appointgem-title" className="appointgem-hero-title">
            WelzoKart Smart<br className="mobile-title-break" /> <span className="highlight">Grocery Delivery App</span>
          </h1>

          <div className="appointgem-hero-right">
            <p data-reveal="" className="appointgem-hero-copy">
              WelzoKart is a modern grocery delivery application designed to simplify everyday shopping through a fast, intuitive, and user-friendly experience. The platform allows users to explore fresh products, daily essentials, and household items with seamless navigation, quick search, and smooth checkout.
            </p>

            <div data-reveal="" className="appointgem-hero-actions">
              <Link href="/contact" className="appointgem-hero-primary">
                Book a walkthrough <span aria-hidden="true">→</span>
              </Link>
              <a href="#interface" className="appointgem-hero-secondary">
                See the interface
              </a>
            </div>
          </div>
        </div>

        <div ref={interfaceRef} id="interface" className="appointgem-hero-interface">
          <div className="appointgem-hero-tablet" aria-label="Slota Tablet Companies View">
            <div className="appointgem-hero-tablet-screen">
              <img
                src="/shots/tablet-appointgem.webp"
                alt="Slota Tablet Companies Screen"
                className="appointgem-hero-tablet-img"
              />
            </div>
          </div>

          <div className="appointgem-hero-mobile" aria-label="Slota Mobile Companies View">
            <span className="notch" />
            <div className="appointgem-hero-mobile-screen">
              <img
                src="/shots/mobile-appotingem.webp"
                alt="Slota Mobile Companies Screen"
                className="appointgem-hero-mobile-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}