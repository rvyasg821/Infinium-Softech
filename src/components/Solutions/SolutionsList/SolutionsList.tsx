"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "./SolutionsList.scss";
import {
  SOLUTIONS_LIST_DATA,
  HERO_INDEX_ITEMS,
} from "@/data/solutions/solutionsData";

const SECTION_IDS = HERO_INDEX_ITEMS.map((item) => item.href.substring(1));

function SolutionVisualCol({ item }: { item: typeof SOLUTIONS_LIST_DATA[0] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -10,
      y: (x / rect.width) * 10
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div data-reveal="" className="solution-visual-col">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`solution-image-card ${item.tintClass}`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease"
        }}
      >
        <div className="solution-image-content">
          <div className="solution-image-frame">
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={640}
              height={480}
              className="strivedge-portfolio-img"
              priority={item.num === "01"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export function SolutionsList() {
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollActiveTabIntoView = useCallback((sectionId: string) => {
    if (!navContainerRef.current) return;
    const activeCard = navContainerRef.current.querySelector(
      `[data-nav-id="${sectionId}"]`
    ) as HTMLElement;
    if (activeCard) {
      const container = navContainerRef.current;
      const scrollLeft =
        activeCard.offsetLeft -
        container.offsetWidth / 2 +
        activeCard.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
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
        if (SECTION_IDS.includes(id)) {
          setActiveSection(id);
          scrollActiveTabIntoView(id);
        }
        setTimeout(() => {
          const targetY =
            element.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }, 120);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [scrollActiveTabIntoView]);

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

    const targetY =
      element.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div className="solutions-list-wrapper">
      {/* Sticky Category Index Navigation Bar */}
      <section className="solutions-sticky-bar-section">
        <div className="solutions-sticky-container">
          <div
            className="solutions-hero-index solutions-sticky-index"
            ref={navContainerRef}
          >
            {HERO_INDEX_ITEMS.map((item) => {
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

      {/* Solutions Item Sections */}
      {SOLUTIONS_LIST_DATA.map((item, idx) => {
        const isWhite = idx % 2 === 1;
        return (
          <section
            key={item.id}
            id={item.id}
            className={`solution-item-section ${isWhite ? "theme-white" : "theme-paper"}`}
          >
            <div className={`solution-item-container ${item.reverse ? "reverse" : ""}`}>
              {/* Text Column */}
              <div className="solution-text-col">
                <div data-reveal="" className="solution-eyebrow-row">
                  <span className="num-badge">{item.num}</span>
                  <span className="num-divider" aria-hidden="true" />
                  <span className="eyebrow-label">{item.category}</span>
                </div>
                <h2 data-reveal="" className="solution-title">
                  {item.title}
                </h2>
                <p data-reveal="" className="solution-desc">
                  {item.description}
                </p>

                <div data-reveal="" className="solution-checklist">
                  {item.checklist.map((point, pIdx) => (
                    <div key={pIdx} className="check-item">
                      <span
                        className="dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div data-reveal="" className="solution-action-row">
                  <Link href={item.ctaLink} className="solution-link-btn">
                    {item.ctaText} <span className="arrow">→</span>
                  </Link>
                </div>
              </div>

              {/* Visual Column with Strivedge Website Image */}
              <SolutionVisualCol item={item} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
