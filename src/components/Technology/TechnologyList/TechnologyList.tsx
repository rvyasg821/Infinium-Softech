"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "./TechnologyList.scss";
import {
  CATEGORY_HEADERS,
  INDIVIDUAL_TECH_ITEMS,
  TECHNOLOGY_HERO_INDEX_ITEMS,
} from "@/data/technology/technologyData";

const SECTION_IDS = TECHNOLOGY_HERO_INDEX_ITEMS.map((item) =>
  item.href.substring(1)
);

export function TechnologyList() {
  const categoryKeys = Object.keys(CATEGORY_HEADERS);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToElement = useCallback((element: HTMLElement) => {
    const headerHeight =
      document.querySelector<HTMLElement>(".site-header-wrapper")
        ?.getBoundingClientRect().height ?? 0;
    const stickyBarHeight =
      document.querySelector<HTMLElement>(".tech-sticky-bar-section")
        ?.getBoundingClientRect().height ?? 0;
    const targetY =
      element.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      stickyBarHeight -
      12;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  const scrollActiveTabIntoView = useCallback((sectionId: string) => {
    if (!navContainerRef.current) return;
    const container = navContainerRef.current;
    const activeCard = container.querySelector(
      `[data-nav-id="${sectionId}"]`
    ) as HTMLElement;

    if (activeCard) {
      // Horizontally scroll only, absolutely no vertical block alignment to prevent jumping
      const scrollTarget = activeCard.offsetLeft - container.offsetWidth / 2 + activeCard.offsetWidth / 2;
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth"
      });
    }
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.05,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (SECTION_IDS.includes(id)) {
            setActiveSection(id);
            scrollActiveTabIntoView(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [scrollActiveTabIntoView]);

  // Handle hash scrolling when arriving with a hash or when hash changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        if (id.startsWith("tech-")) {
          const techId = id.replace("tech-", "");
          const techItem = INDIVIDUAL_TECH_ITEMS.find((t) => t.id === techId);
          if (techItem) {
            setActiveSection(techItem.category);
            scrollActiveTabIntoView(techItem.category);
          }
        } else if (SECTION_IDS.includes(id)) {
          setActiveSection(id);
          scrollActiveTabIntoView(id);
        }

        setTimeout(() => {
          scrollToElement(element);
        }, 120);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [scrollActiveTabIntoView, scrollToElement]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.currentTarget.blur();

    const id = href.substring(1);
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);
    scrollActiveTabIntoView(id);
    scrollToElement(element);
  };

  return (
    <div id="tech-list" className="technology-list-wrapper">
      {/* Sticky Index Navigation Bar */}
      <section className="tech-sticky-bar-section">
        <div className="tech-sticky-container">
          <div
            className="solutions-hero-index tech-sticky-index"
            ref={navContainerRef}
          >
            {TECHNOLOGY_HERO_INDEX_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.num}
                  href={item.href}
                  data-nav-id={sectionId}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`index-card ${isActive ? "active" : ""}`}
                  style={
                    { "--item-accent-color": item.color } as React.CSSProperties
                  }
                >
                  <div className="index-content">
                    <div className="index-title-row">
                      <span
                        className="index-dot"
                        style={{ backgroundColor: item.color }}
                        aria-hidden="true"
                      />
                      <span className="index-title">{item.title}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Blocks and All Technology Items */}
      {categoryKeys.map((catKey, cIdx) => {
        const header = CATEGORY_HEADERS[catKey];
        const categoryItems = INDIVIDUAL_TECH_ITEMS.filter(
          (item) => item.category === catKey
        );
        const isWhiteSection = cIdx % 2 === 1;

        return (
          <section
            key={header.id}
            id={header.id}
            className={`technology-category-block ${isWhiteSection ? "theme-white" : "theme-paper"}`}
          >
            {/* Category Header Banner */}
            <div className="category-header-container">
              <div data-reveal="" className="category-header-eyebrow">
                <span className="num-badge">{header.num}</span>
                <span className="num-divider" aria-hidden="true" />
                <span className="eyebrow-label">{header.title}</span>
              </div>

              <h2 data-reveal="" className="category-header-title">
                {header.subtitle}
              </h2>
            </div>

            {/* Individual Technology Items Grid / Rows */}
            <div className="category-items-container">
              {categoryItems.map((item, iIdx) => {
                const isReverse = iIdx % 2 === 1;
                return (
                  <div
                    key={item.id}
                    id={`tech-${item.id}`}
                    data-reveal=""
                    className={`technology-item-row ${isReverse ? "reverse" : ""}`}
                  >
                    {/* Text Column */}
                    <div className="technology-text-col">
                      <div className="tech-badge-pill">
                        <span
                          className="badge-dot"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.categoryName}</span>
                      </div>

                      <h3 className="technology-title">{item.title}</h3>

                      <p className="technology-desc">{item.description}</p>

                      <div className="technology-action-row">
                        <Link
                          href={`/contact?tech=${encodeURIComponent(item.title)}`}
                          className="technology-link-btn"
                        >
                          Hire {item.title} Developer <span className="arrow">→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Visual / Image Column */}
                    <div className="technology-visual-col">
                      <div className="mockup-card">
                        <div className="mockup-content">
                          <div className="image-frame">
                            {item.image ? (
                              <Image
                                src={item.image.startsWith("/") || item.image.startsWith("http") ? item.image : `/${item.image}`}
                                alt={item.title}
                                width={480}
                                height={320}
                                className="strivedge-tech-img"
                                priority={cIdx === 0 && iIdx < 2}
                                unoptimized={
                                  item.image.endsWith(".svg") ||
                                  item.id === "terraform"
                                }
                              />
                            ) : (
                              <span
                                className="technology-image-fallback"
                                aria-hidden="true"
                              >
                                {item.title}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* <div className="mockup-footer">
                          <span className="status-label">Enterprise Ready</span>
                          <span className="products-tag">{item.title}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}