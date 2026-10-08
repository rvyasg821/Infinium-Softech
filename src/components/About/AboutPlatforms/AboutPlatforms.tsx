"use client";

import { ECOSYSTEM_PRODUCTS, EcosystemProduct } from "@/data/ecosystemData";
import { useAboutCarousel } from "../useAboutCarousel";
import "./AboutPlatforms.scss";
import Image from "next/image";
import Link from "next/link";

const CLONE_COUNT = 3;

function PlatformCardView({
  product,
  isClone = false,
}: {
  product: EcosystemProduct;
  isClone?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      data-reveal={isClone ? undefined : ""}
      className={`platform-card ${isClone ? "platform-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="card-image-box">
        <Image
          src={product.shot}
          alt={product.name}
          width={600}
          height={400}
          className="card-img"
        />
      </div>

      <div className="card-body">
        <div className="card-identity">
          <span
            className="card-badge"
            style={{ backgroundColor: product.logo ? "transparent" : product.tint }}
          >
            {product.logo ? (
              <Image src={product.logo} alt={product.name} width={40} height={40} className="badge-logo" />
            ) : (
              product.mark
            )}
          </span>
          <h3 className="card-name" style={{ color: product.tint }}>{product.name}</h3>
        </div>
        <p className="card-desc">{product.desc}</p>
      </div>

      <div className="card-footer">
        <div className="footer-status">
          <span className="status-dot" style={{ backgroundColor: "#1E9E5A" }} /> Live on iOS / Android
        </div>
        <div className="footer-link" style={{ color: product.tint }}>
          Explore <span className="arrow" aria-hidden="true">&rsaquo;</span>
        </div>
      </div>
    </Link>
  );
}

export function AboutPlatforms() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(ECOSYSTEM_PRODUCTS.length, {
      breakpoint: Infinity,
      cloneCount: CLONE_COUNT,
      alignMode: "auto",
    });

  const prependedClones = ECOSYSTEM_PRODUCTS.slice(-CLONE_COUNT);
  const appendedClones = ECOSYSTEM_PRODUCTS.slice(0, CLONE_COUNT);

  return (
    <section id="ecosystem" className="about-platforms-section" aria-label="What We've Built">
      <div className="about-platforms-container">
        <div className="about-platforms-header">
          <div>
            <div data-reveal="" className="about-platforms-eyebrow">
              What we&apos;ve built
            </div>
            <h2 data-reveal="" className="about-platforms-headline">
              Built for platforms,<br />designed for industries.
            </h2>
          </div>
          <p data-reveal="" className="about-platforms-intro">
            Each ships as its own platform and inherits the same identity, billing
            and reporting layer as the rest.
          </p>
        </div>

        <div className="about-platforms-wrap">
          <div className="about-platforms-track">
            <div className="about-platforms-grid" ref={scrollRef}>
              {/* Prepended clones for seamless reverse scroll */}
              {prependedClones.map((product, idx) => (
                <PlatformCardView
                  key={`pre-${product.n}-${idx}`}
                  product={product}
                  isClone={true}
                />
              ))}

              {/* Real Products */}
              {ECOSYSTEM_PRODUCTS.map((product) => (
                <PlatformCardView key={product.n} product={product} />
              ))}

              {/* Appended clones for seamless forward scroll */}
              {appendedClones.map((product, idx) => (
                <PlatformCardView
                  key={`post-${product.n}-${idx}`}
                  product={product}
                  isClone={true}
                />
              ))}
            </div>

            {/* Left Arrow Button (perfect card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous platform"
              onClick={handlePrev}
            >
              <svg
                width="20"
                height="20"
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

            {/* Right Arrow Button (perfect card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next platform"
              onClick={handleNext}
            >
              <svg
                width="20"
                height="20"
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

          {/* Pagination Dots */}
          <div className="carousel-dots" aria-label="Platforms navigation dots">
            {ECOSYSTEM_PRODUCTS.map((product, idx) => (
              <button
                key={product.n}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to platform ${idx + 1}: ${product.name}`}
              >
                <span
                  className="dot-fill"
                  style={{
                    backgroundColor: activeIndex === idx ? product.tint : "#0C0C0D",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}