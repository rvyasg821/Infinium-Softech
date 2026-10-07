"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./ProductCatalogue.scss";
import { PRODUCT_CATEGORIES, ProductItem } from "@/data/productsData";

interface ProductCatalogueProps {
  products: ProductItem[];
  activeFilter: string;
  onSelectFilter: (category: string) => void;
}

export function ProductCatalogue({
  products,
  activeFilter,
  onSelectFilter,
}: ProductCatalogueProps) {
  const catalogueGridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.tag === activeFilter);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
    catalogueGridRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [filteredProducts.length]);

  useEffect(() => {
    const grid = catalogueGridRef.current;
    if (!grid) return;

    const syncActiveIndex = () => {
      const firstCard = grid.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
      const distance = firstCard.offsetWidth + gap;
      if (!distance) return;

      const visibleCards = window.innerWidth > 1024 ? 3 : window.innerWidth > 767 ? 2 : 1;
      const maxIndex = Math.max(0, filteredProducts.length - visibleCards);
      const nextIndex = Math.max(
        0,
        Math.min(maxIndex, Math.round(grid.scrollLeft / distance))
      );

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    grid.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      grid.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("resize", syncActiveIndex);
    };
  }, [filteredProducts.length]);

  const moveCatalogue = useCallback(
    (direction: 1 | -1) => {
      const grid = catalogueGridRef.current;
      const firstCard = grid?.firstElementChild as HTMLElement | null;
      if (!grid || !firstCard || filteredProducts.length === 0) return;

      const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
      const distance = firstCard.offsetWidth + gap;
      const visibleCards = window.innerWidth > 1024 ? 3 : window.innerWidth > 767 ? 2 : 1;
      const maxIndex = Math.max(0, filteredProducts.length - visibleCards);

      activeIndexRef.current = Math.max(
        0,
        Math.min(maxIndex, activeIndexRef.current + direction)
      );
      setActiveIndex(activeIndexRef.current);

      grid.scrollTo({
        left: activeIndexRef.current * distance,
        behavior: "smooth",
      });
    },
    [filteredProducts.length]
  );

  const visibleCards =
    typeof window !== "undefined"
      ? window.innerWidth > 1024
        ? 3
        : window.innerWidth > 767
          ? 2
          : 1
      : 3;
  const maxIndex = Math.max(0, filteredProducts.length - visibleCards);

  return (
    <section id="catalogue" className="product-catalogue-section">
      <div className="product-catalogue-container">
        {/* Section Header */}
        <div data-reveal="" className="catalogue-header">
          <div>
            <div className="catalogue-eyebrow">The catalogue</div>
            <h2 className="catalogue-title">Browse by industry</h2>
          </div>
          <div className="catalogue-count">
            Showing <strong>{filteredProducts.length}</strong> of {products.length}{" "}
            products
          </div>
        </div>

        {/* Filter Chips */}
        <div data-reveal="" className="catalogue-chips">
          {PRODUCT_CATEGORIES.map((category) => {
            const isSelected = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                className={`chip-btn ${isSelected ? "is-active" : ""}`}
                onClick={() => onSelectFilter(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div data-reveal="" className="catalogue-grid-wrap">
          {activeIndex > 0 && (
            <button
              type="button"
              className="catalogue-scroll-button catalogue-scroll-button--previous"
              onClick={() => moveCatalogue(-1)}
              aria-label="Show previous products"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <div ref={catalogueGridRef} className="catalogue-grid">
            {filteredProducts.map((p) => (
              <article data-reveal="" key={p.id} className="product-card-item">
                <div
                  className="card-top-wash"
                  style={{ backgroundColor: p.wash }}
                >
                  <div className="card-top-header">
                    <div className="brand-badge-group">
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt={`${p.name} Logo`}
                          width={34}
                          height={34}
                          className="brand-logo"
                        />
                      ) : (
                        <span
                          className="brand-mark"
                          style={{ backgroundColor: p.tint }}
                        >
                          {p.mark}
                        </span>
                      )}
                      <div>
                        <span className="product-name">{p.name}</span>
                        <span className="product-tag-text">{p.tag}</span>
                      </div>
                    </div>
                    <span className="product-num">{p.n}</span>
                  </div>

                  {/* Screenshot image or fallback */}
                  {p.shot ? (
                    <div className="card-shot-wrapper">
                      <Image
                        src={p.shot}
                        alt={`${p.name} product screens`}
                        width={600}
                        height={360}
                        className="card-shot-img"
                      />
                    </div>
                  ) : (
                    <div className="card-shot-fallback">
                      <span className="fallback-mark" style={{ color: p.tint }}>
                        {p.mark}
                      </span>
                      <span className="fallback-text">Screens coming soon</span>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <p className="card-desc">{p.desc}</p>
                  <div className="card-features">
                    {p.features.map((f, i) => (
                      <span key={i} className="feature-pill">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <Link href="/book-a-demo" className="btn-primary">
                      Book a demo <span className="arrow">→</span>
                    </Link>
                    <Link href={`/products/${p.id}`} className="btn-secondary">
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {activeIndex < maxIndex && (
            <button
              type="button"
              className="catalogue-scroll-button catalogue-scroll-button--next"
              onClick={() => moveCatalogue(1)}
              aria-label="Show next products"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="catalogue-empty">
            No products in that industry yet.{" "}
            <button
              type="button"
              className="btn-reset"
              onClick={() => onSelectFilter("All")}
            >
              Show all nine
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
