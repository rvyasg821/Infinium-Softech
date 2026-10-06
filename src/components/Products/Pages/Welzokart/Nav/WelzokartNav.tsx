"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScrollAnimation } from "@/components/providers/ScrollAnimationProvider";
import "./WelzokartNav.scss";

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

// Breathing room between the sticky bars and the top of a section
const GAP_BELOW_BARS = 12;
// Extra tolerance so a section clicked is always "active" after landing
const ACTIVATION_TOLERANCE = 8;
// How long scrolling must be idle before scroll-spy unlocks after a click
const SCROLL_IDLE_MS = 150;
// Wait this long before centering the active tab (avoids restarting animations)
const CENTER_DEBOUNCE_MS = 120;

export function WelzokartNav() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const navRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo } = useScrollAnimation();

  const isProgrammaticScrollRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchingStripRef = useRef(false);
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Real height of the sticky header + this sub-nav (measured, not hard-coded)
  const getStickyOffset = useCallback(() => {
    const headerVar = getComputedStyle(document.documentElement).getPropertyValue(
      "--site-header-height"
    );
    const headerH = parseFloat(headerVar) || 75;
    const subNavH = navRef.current?.offsetHeight ?? 0;
    return headerH + subNavH;
  }, []);

  const centerActiveTab = useCallback((sectionId: string, force = false) => {
    const container = stripRef.current;
    if (!container) return;

    const activeCard = container.querySelector(
      `[data-nav-id="${sectionId}"]`
    ) as HTMLElement | null;
    if (!activeCard) return;

    const cardLeft = activeCard.offsetLeft;
    const cardRight = cardLeft + activeCard.offsetWidth;
    const viewLeft = container.scrollLeft;
    const viewRight = viewLeft + container.clientWidth;

    const isVisible = cardLeft >= viewLeft + 16 && cardRight <= viewRight - 16;

    if (!isVisible || force) {
      const left =
        cardLeft - container.clientWidth / 2 + activeCard.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, []);

  // Keep the active tab visible: debounced, and never while the user touches the strip
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isTouchingStripRef.current) centerActiveTab(activeSection);
    }, CENTER_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [activeSection, centerActiveTab]);

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

      const activationLine =
        getStickyOffset() + GAP_BELOW_BARS + ACTIVATION_TOLERANCE;

      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= activationLine) {
          current = id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1];

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
  }, [getStickyOffset]);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      isProgrammaticScrollRef.current = true;
      setActiveSection(id);
      centerActiveTab(id, true);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 1200);

      scrollTo(element, { offset: -(getStickyOffset() + GAP_BELOW_BARS) });
    },
    [centerActiveTab, getStickyOffset, scrollTo]
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

  // Pause auto-centering while the user swipes the tab strip
  const handleStripTouchStart = () => {
    isTouchingStripRef.current = true;
    if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current);
  };
  const handleStripTouchEnd = () => {
    if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current);
    touchEndTimerRef.current = setTimeout(() => {
      isTouchingStripRef.current = false;
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="appointgem-subnav-sticky"
      aria-label="AppointGem Page Navigation"
    >
      <div className="appointgem-subnav-container">
        <div
          className="appointgem-subnav-index"
          ref={stripRef}
          onTouchStart={handleStripTouchStart}
          onTouchEnd={handleStripTouchEnd}
          onTouchCancel={handleStripTouchEnd}
        >
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