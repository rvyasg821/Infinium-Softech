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
    const container = navContainerRef.current;
    if (!container) return;
    const activeCard = container.querySelector(
      `[data-nav-id="${sectionId}"]`
    ) as HTMLElement;
    if (activeCard) {
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      const containerWidth = container.clientWidth;
      container.scrollTo({
        left: cardLeft - containerWidth / 2 + cardWidth / 2,
        behavior: "smooth",
      });
    }
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollPosition = scrollY + ACTIVATION_OFFSET;

    // At the very bottom of the page -> last item active
    const atBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 4;

    if (atBottom && scrollY > 0) {
      const lastId = SECTION_IDS[SECTION_IDS.length - 1];
      if (document.getElementById(lastId)) {
        setActiveSection(lastId);
        scrollActiveTabIntoView(lastId);
        return;
      }
    }

    let current = SECTION_IDS[0];

    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const element = document.getElementById(SECTION_IDS[i]);
      if (!element) continue;

      const sectionTop = element.getBoundingClientRect().top + scrollY;
      if (sectionTop <= scrollPosition) {
        current = SECTION_IDS[i];
        break;
      }
    }

    setActiveSection(current);
    scrollActiveTabIntoView(current);
  }, [scrollActiveTabIntoView]);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    const initialUpdateFrame = window.requestAnimationFrame(updateActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      window.cancelAnimationFrame(initialUpdateFrame);
    };
  }, [updateActiveFromScroll]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.currentTarget.blur(); // remove focus/hover leftovers from clicked link

    const id = href.substring(1);
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);
    scrollActiveTabIntoView(id);

    const y =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      className="appointgem-subnav-sticky"
      aria-label="AppointGem Page Navigation"
    >
      <div className="appointgem-subnav-container" ref={navContainerRef}>
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
              <span
                className="appointgem-index-dot"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav >
  );
}