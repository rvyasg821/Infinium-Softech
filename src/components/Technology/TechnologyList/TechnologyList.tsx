"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "./TechnologyList.scss";
import {
  CATEGORY_HEADERS,
  INDIVIDUAL_TECH_ITEMS,
  TECHNOLOGY_HERO_INDEX_ITEMS,
  ROUTE_PREFIX,
  findTechBySlug,
  getCategoryFromRouteSlug,
  getCategoryRouteSlug,
  getTechSlug,
} from "@/data/technology/technologyData";

// Section ids are the category keys (frontend, backend, ...)
const SECTION_IDS = TECHNOLOGY_HERO_INDEX_ITEMS.map((item) => item.category);

// URL shown when the user is above the list
const BASE_PATH = "/technologies";

// Ordered list (same order as the page) of everything the scroll-spy tracks:
// each category section, followed by its tech cards.
type SpyEntry = { id: string; url: string; category: string };

const SPY_ENTRIES: SpyEntry[] = Object.keys(CATEGORY_HEADERS).flatMap(
  (catKey) => {
    const catSlug = getCategoryRouteSlug(catKey);
    const categoryEntry: SpyEntry = {
      id: CATEGORY_HEADERS[catKey].id,
      url: `${ROUTE_PREFIX}/${catSlug}`, // /technology/frontendtech
      category: catKey,
    };
    const techEntries: SpyEntry[] = INDIVIDUAL_TECH_ITEMS.filter(
      (t) => t.category === catKey
    ).map((t) => ({
      id: `tech-${t.id}`,
      url: `${ROUTE_PREFIX}/${getTechSlug(t.id)}`, // /technology/react-js
      category: catKey,
    }));
    return [categoryEntry, ...techEntries];
  }
);

function getBarsHeight() {
  const headerHeight =
    document.querySelector<HTMLElement>(".site-header-wrapper")
      ?.getBoundingClientRect().height ?? 0;
  const stickyBarHeight =
    document.querySelector<HTMLElement>(".tech-sticky-bar-section")
      ?.getBoundingClientRect().height ?? 0;
  return headerHeight + stickyBarHeight;
}

// Scroll position that puts `element` just below the header + sticky bar.
function getTargetY(element: HTMLElement) {
  return Math.max(
    0,
    element.getBoundingClientRect().top + window.scrollY - getBarsHeight() - 12
  );
}

// Update the address bar WITHOUT going through Next's patched history,
// so Next / layout effects don't react mid-scroll.
function setBrowserUrl(url: string, mode: "push" | "replace" = "push") {
  if (window.location.pathname === url) return;
  const fn =
    mode === "push"
      ? History.prototype.pushState
      : History.prototype.replaceState;
  fn.call(window.history, window.history.state, "", url);
}

// Pathname -> element to scroll to + its category
// Expected: /technology/<category> or /technology/<tech>
function resolvePath(
  pathname: string
): { elementId: string; category: string } | null {
  const cleanPath = pathname.split("?")[0].split("#")[0];
  const parts = cleanPath.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  if (`/${parts[0]}` !== ROUTE_PREFIX && `/${parts[0]}` !== "/technology") return null;

  const slug = parts[1];
  if (!slug) return null;

  const category = getCategoryFromRouteSlug(slug);
  if (category) {
    return { elementId: category, category };
  }

  const tech = findTechBySlug(slug);
  if (tech) {
    return { elementId: `tech-${tech.id}`, category: tech.category };
  }

  return null;
}

export function TechnologyList({ initialSlug }: { initialSlug?: string }) {
  const categoryKeys = Object.keys(CATEGORY_HEADERS);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // While a click / initial smooth-scroll is running, ignore the scroll-spy
  const isProgrammaticScrollRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Timer for the "did we really land?" correction pass
  const correctionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Last entry the scroll-spy applied (avoids repeating work every frame)
  const lastSpyIdRef = useRef<string | null>(null);

  const lockObserver = useCallback((ms = 1200) => {
    isProgrammaticScrollRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, ms);
  }, []);

  const cancelCorrection = useCallback(() => {
    if (correctionTimerRef.current) {
      clearTimeout(correctionTimerRef.current);
      correctionTimerRef.current = null;
    }
  }, []);

  // Smooth scroll to an element, then verify we landed and fix it if not
  const scrollToElement = useCallback(
    (element: HTMLElement) => {
      cancelCorrection();
      window.scrollTo({ top: getTargetY(element), behavior: "smooth" });

      let attempts = 0;
      const verify = () => {
        const diff = Math.abs(getTargetY(element) - window.scrollY);
        if (diff > 4 && attempts < 3) {
          attempts += 1;
          lockObserver(1200);
          window.scrollTo({ top: getTargetY(element), behavior: "smooth" });
          correctionTimerRef.current = setTimeout(verify, 700);
        } else {
          correctionTimerRef.current = null;
        }
      };

      correctionTimerRef.current = setTimeout(verify, 800);
    },
    [cancelCorrection, lockObserver]
  );

  const scrollActiveTabIntoView = useCallback((sectionId: string) => {
    const container = navContainerRef.current;
    if (!container) return;
    const activeCard = container.querySelector<HTMLElement>(
      `[data-nav-id="${sectionId}"]`
    );
    if (!activeCard) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const scrollTarget =
      container.scrollLeft +
      (cardRect.left - containerRect.left) -
      container.clientWidth / 2 +
      cardRect.width / 2;

    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, []);

  // If the user scrolls by hand, stop any pending correction (don't fight them)
  useEffect(() => {
    window.addEventListener("wheel", cancelCorrection, { passive: true });
    window.addEventListener("touchstart", cancelCorrection, { passive: true });
    window.addEventListener("keydown", cancelCorrection);
    return () => {
      window.removeEventListener("wheel", cancelCorrection);
      window.removeEventListener("touchstart", cancelCorrection);
      window.removeEventListener("keydown", cancelCorrection);
    };
  }, [cancelCorrection]);

  // Scroll-spy: as the user scrolls, update the active tab AND the URL
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      if (isProgrammaticScrollRef.current) return;

      // Line just below the header + sticky bar
      const line = getBarsHeight() + 80;

      let current: SpyEntry | null = null;
      for (const entry of SPY_ENTRIES) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = entry;
        else break;
      }

      // Above the list (still in the hero) -> base URL
      if (!current) {
        if (lastSpyIdRef.current !== "__top__") {
          lastSpyIdRef.current = "__top__";
          setActiveSection(SECTION_IDS[0]);
          setBrowserUrl(BASE_PATH, "replace");
        }
        return;
      }

      if (lastSpyIdRef.current === current.id) return;
      lastSpyIdRef.current = current.id;

      setActiveSection(current.category);
      scrollActiveTabIntoView(current.category);
      setBrowserUrl(current.url, "replace");
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollActiveTabIntoView]);

  // Opened directly on /technology/[slug]: scroll to it
  useEffect(() => {
    const slugToResolve =
      initialSlug ||
      (typeof window !== "undefined"
        ? window.location.pathname.split("/").filter(Boolean)[1]
        : undefined);
    if (!slugToResolve) return;
    const resolved = resolvePath(`${ROUTE_PREFIX}/${slugToResolve}`);
    if (!resolved) return;

    const { elementId, category } = resolved;

    setActiveSection(category);
    scrollActiveTabIntoView(category);
    lastSpyIdRef.current = elementId;
    lockObserver(1800);

    const t = setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) scrollToElement(el);
    }, 150);

    return () => clearTimeout(t);
  }, [
    initialSlug,
    scrollActiveTabIntoView,
    scrollToElement,
    lockObserver,
  ]);

  // Listen for scroll-to-technology custom event from Header or Footer
  useEffect(() => {
    const handleScrollToTech = (e: Event) => {
      const customEvent = e as CustomEvent<{ href?: string; slug?: string }>;
      const targetUrl =
        customEvent.detail?.href ||
        (customEvent.detail?.slug
          ? `${ROUTE_PREFIX}/${customEvent.detail.slug}`
          : ROUTE_PREFIX);

      setBrowserUrl(targetUrl, "push");

      const resolved = resolvePath(targetUrl);
      if (resolved) {
        const { elementId, category } = resolved;
        setActiveSection(category);
        scrollActiveTabIntoView(category);
        lastSpyIdRef.current = elementId;
        lockObserver(1800);

        const t = setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) scrollToElement(el);
        }, 60);

        return () => clearTimeout(t);
      } else if (targetUrl === ROUTE_PREFIX || targetUrl === "/technologies") {
        setActiveSection(SECTION_IDS[0]);
        scrollActiveTabIntoView(SECTION_IDS[0]);
        lastSpyIdRef.current = "__top__";
        lockObserver(1800);

        const t = setTimeout(() => {
          const el = document.getElementById("tech-list");
          if (el) scrollToElement(el);
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 60);

        return () => clearTimeout(t);
      }
    };

    window.addEventListener("scroll-to-technology", handleScrollToTech);
    return () =>
      window.removeEventListener("scroll-to-technology", handleScrollToTech);
  }, [lockObserver, scrollActiveTabIntoView, scrollToElement]);

  // Browser back / forward: follow the URL
  useEffect(() => {
    const onPopState = () => {
      const target = resolvePath(window.location.pathname);
      if (!target) {
        if (
          window.location.pathname === ROUTE_PREFIX ||
          window.location.pathname === "/technology"
        ) {
          setActiveSection(SECTION_IDS[0]);
          scrollActiveTabIntoView(SECTION_IDS[0]);
          lastSpyIdRef.current = "__top__";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      const el = document.getElementById(target.elementId);
      if (!el) return;

      lockObserver(1800);
      lastSpyIdRef.current = target.elementId;
      setActiveSection(target.category);
      scrollActiveTabIntoView(target.category);
      scrollToElement(el);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [lockObserver, scrollActiveTabIntoView, scrollToElement]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      if (correctionTimerRef.current) clearTimeout(correctionTimerRef.current);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    slug: string
  ) => {
    // Let ctrl/cmd/shift/middle-click open the real URL in a new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();
    e.currentTarget.blur();

    const element = document.getElementById(sectionId);
    if (!element) return;

    lockObserver(1500);
    lastSpyIdRef.current = sectionId;
    setActiveSection(sectionId);
    scrollActiveTabIntoView(sectionId);
    scrollToElement(element);

    setBrowserUrl(`${ROUTE_PREFIX}/${slug}`, "push");
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
              const sectionId = item.category;
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.num}
                  href={`${ROUTE_PREFIX}/${item.slug}`}
                  data-nav-id={sectionId}
                  onClick={(e) => handleNavClick(e, sectionId, item.slug)}
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
            className={`technology-category-block ${isWhiteSection ? "theme-white" : "theme-paper"
              }`}
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

            {/* Individual Technology Items */}
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
                          Hire {item.title} Developer{" "}
                          <span className="arrow">→</span>
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
                                src={
                                  item.image.startsWith("/") ||
                                    item.image.startsWith("http")
                                    ? item.image
                                    : `/${item.image}`
                                }
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