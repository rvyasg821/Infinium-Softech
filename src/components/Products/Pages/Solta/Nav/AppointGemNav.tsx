"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScrollAnimation } from "@/components/providers/ScrollAnimationProvider";
import "./AppointGemNav.scss";

const NAV_ITEMS = [
  { label: "Overview", href: "#overview", color: "#2AA8C4" },
  { label: "Interface", href: "#interface", color: "#1F31E8" },
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
// How long scrolling must be idle before we unlock scroll-spy after a click
const SCROLL_IDLE_MS = 150;

export function AppointGemNav() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo } = useScrollAnimation();

  // True while a click-initiated smooth scroll is running
  const isProgrammaticScrollRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollActiveTabIntoView = useCallback(
    (sectionId: string, force = false) => {
      const container = navContainerRef.current;
      if (!container) return;

      const activeCard = container.querySelector(
        `[data-nav-id="${sectionId}"]`
      ) as HTMLElement | null;
      if (!activeCard) return;

      const cardLeft = activeCard.offsetLeft;
      const cardRight = cardLeft + activeCard.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const containerScrollRight = containerScrollLeft + containerWidth;

      const isVisible =
        cardLeft >= containerScrollLeft + 16 &&
        cardRight <= containerScrollRight - 16;

      if (!isVisible || force) {
        const left =
          cardLeft - containerWidth / 2 + activeCard.offsetWidth / 2;
        container.scrollTo({ left, behavior: "smooth" });
      }
    },
    []
  );

  // Keep the active tab visible – runs ONLY when active section changes
  useEffect(() => {
    scrollActiveTabIntoView(activeSection);
  }, [activeSection, scrollActiveTabIntoView]);

  // Scroll-spy (rAF throttled)
  useEffect(() => {
    let ticking = false;

    const computeActive = () => {
      ticking = false;

      if (isProgrammaticScrollRef.current) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, SCROLL_IDLE_MS);
        return;
      }

      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
          current = id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(computeActive);
      }
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      isProgrammaticScrollRef.current = true;
      setActiveSection(id);
      scrollActiveTabIntoView(id, true);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 1200);

      scrollTo(element, { offset: -SCROLL_OFFSET });
    },
    [scrollActiveTabIntoView, scrollTo]
  );

  // Handle initial hash + hash changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.substring(1);
      if (!SECTION_IDS.includes(id)) return;

      setTimeout(() => scrollToSection(id), 120);
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [scrollToSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.currentTarget.blur();
    scrollToSection(href.substring(1));
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
                style={
                  { "--item-accent-color": item.color } as React.CSSProperties
                }
                aria-current={isActive ? "true" : undefined}
              >
                <div className="index-title-row">
                  <span
                    className="appointgem-index-dot"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span className="appointgem-label" data-label={item.label}>
                    {item.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}