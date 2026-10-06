"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AppointGemNav.scss";

const NAV_ITEMS = [
  { label: "Overview", href: "#overview", color: "#2AA8C4" },
  { label: "Interface", href: "#interface1", color: "#1F31E8" },
  { label: "Key challenges", href: "#challenges", color: "#1E9E5A" },
  { label: "Our solution", href: "#solution", color: "#0F8F87" },
  { label: "Workflow", href: "#workflow", color: "#8B3FE8" },
  { label: "Key results", href: "#results", color: "#E8A21F" },
  { label: "Technology", href: "#stack", color: "#D94F70" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.substring(1));

// Where a section lands after clicking (space for sticky header + sub nav)
const SCROLL_OFFSET = 110;
// A section becomes active when its top passes this line (must be >= SCROLL_OFFSET)
const ACTIVATION_OFFSET = 140;

export function AppointGemNav() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
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
          const targetY = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
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
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <nav
      className="appointgem-subnav-sticky"
      aria-label="AppointGem Page Navigation"
    >
      <div className="appointgem-subnav-container">
        <div className="appointgem-subnav-index" ref={navContainerRef}>
          {NAV_ITEMS.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                data-nav-id={id}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`appointgem-subnav-item ${isActive ? "active" : ""}`}
                style={{ "--item-accent-color": item.color } as React.CSSProperties}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="index-title-row">
                  <span
                    className="appointgem-index-dot"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}