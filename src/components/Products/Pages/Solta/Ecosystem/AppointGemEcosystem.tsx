"use client";

import React from "react";
import Link from "next/link";
import { useAboutCarousel } from "@/components/About/useAboutCarousel";
import "./AppointGemEcosystem.scss";

import { ECOSYSTEM_PRODUCTS, EcosystemProduct } from "@/data/ecosystemData";
import Image from "next/image";

function EcosystemCardView({
  prod,
  isClone = false,
}: {
  prod: EcosystemProduct;
  isClone?: boolean;
}) {
  return (
    <Link
      href={`/products/${prod.id}`}
      className={`ecosystem-card ${isClone ? "ecosystem-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="card-image-box">
        <Image
          src={prod.shot}
          alt={prod.name}
          width={600}
          height={400}
          className="card-img"
        />
      </div>

      <div className="card-body">
        <div className="card-identity">
          <span 
            className="card-badge" 
            style={{ backgroundColor: prod.logo ? "transparent" : prod.tint }}
          >
            {prod.logo ? (
              <Image src={prod.logo} alt={prod.name} width={40} height={40} className="badge-logo" />
            ) : (
              prod.mark
            )}
          </span>
          <h3 className="card-name" style={{ color: prod.tint }}>{prod.name}</h3>
        </div>
        <p className="card-desc">{prod.desc}</p>
      </div>

      <div className="card-footer">
        <div className="footer-status">
          <span className="status-dot" style={{ backgroundColor: "#1E9E5A" }} /> Live on iOS / Android
        </div>
        <div className="footer-link" style={{ color: prod.tint }}>
          Explore <span className="arrow" aria-hidden="true">&rsaquo;</span>
        </div>
      </div>
    </Link>
  );
}

export function AppointGemEcosystem() {
  const slotaProducts = ["WelzoKart", "LoadGo", "Needly"];
  const RELATED_PRODUCTS = slotaProducts
    .map((name) => ECOSYSTEM_PRODUCTS.find((p) => p.name === name))
    .filter((p): p is EcosystemProduct => p !== undefined);

  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(RELATED_PRODUCTS.length, 1024);

  return (
    <section className="appointgem-ecosystem-section" aria-labelledby="ecosystem-title">
      <div className="appointgem-ecosystem-container">
        <div className="ecosystem-header">
          <h2 data-reveal="" id="ecosystem-title" className="ecosystem-headline">
            Other products in <br className="mobile-title-break" />the ecosystem
          </h2>
          <Link href="/products" className="ecosystem-link">
            View all nine <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="ecosystem-wrap">
          <div className="ecosystem-track">
            <div className="ecosystem-grid" ref={scrollRef}>
              {/* Clone of last card */}
              <EcosystemCardView
                prod={RELATED_PRODUCTS[RELATED_PRODUCTS.length - 1]}
                isClone={true}
              />

              {/* Real products */}
              {RELATED_PRODUCTS.map((prod) => (
                <EcosystemCardView key={prod.name} prod={prod} />
              ))}

              {/* Clone of first card */}
              <EcosystemCardView prod={RELATED_PRODUCTS[0]} isClone={true} />
            </div>

            {/* Left/Right Arrow Buttons */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous ecosystem product"
              onClick={handlePrev}
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

            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next ecosystem product"
              onClick={handleNext}
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
          </div>

          {/* Dots */}
          <div className="carousel-dots" aria-label="Ecosystem products navigation dots">
            {RELATED_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.name}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to product ${idx + 1}`}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}