"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ECOSYSTEM_PRODUCTS, EcosystemProduct } from "@/data/ecosystemData";
import "./Ecosystem.scss";

gsap.registerPlugin(ScrollTrigger);

function EcosystemVisualCol({ prod }: { prod: EcosystemProduct & { wash: string, shot: string } | any }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -8,
      y: (x / rect.width) * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="card-visual"
      style={{
        backgroundColor: prod.wash,
      }}
    >
      <div className="visual-glow" aria-hidden="true" />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="preview-img-wrapper"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease"
        }}
      >
        <Image
          src={prod.shot}
          alt={`${prod.name} product screen preview`}
          width={960}
          height={600}
          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 55vw, 100vw"
          className="preview-shot"
          loading="eager"
        />
      </div>
    </div>
  );
}

export function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeRail, setActiveRail] = useState<string>("01");

  const railTriggersRef = useRef<ScrollTrigger[]>([]);
  const stickyTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    /*
     * Only run the stacking animation on desktop.
     * Mobile/tablet behavior remains unchanged.
     */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => card !== null,
      );

      if (!cards.length) return;

      /*
       * Set initial state
       */
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".card-inner");

        if (!inner) return;

        gsap.set(inner, {
          scale: 1,
          opacity: 1,
          transformOrigin: "center center",
        });
      });

      /*
       * Create ScrollTrigger for every card.
       *
       * As the next card approaches and covers the previous card,
       * the previous card scales down and fades to 0.
       */
      cards.forEach((card, index) => {
        const inner = card.querySelector<HTMLElement>(".card-inner");

        if (!inner) return;

        const nextCard = cards[index + 1];

        /*
         * Last card has nothing covering it.
         */
        if (!nextCard) return;

        gsap.fromTo(
          inner,
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
          },
          {
            scale: 0.95,
            opacity: 0.75,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: "top 96px",
              scrub: true,
            },
          },
        );
      });

      /*
       * Active rail item:
       * In CSS sticky stacking, Card i is active when it reaches top 120px
       * until the next card reaches top 120px and stacks over it.
       * This gives perfect synchronization across all screen widths including 1200px+.
       */
      railTriggersRef.current = [];
      stickyTriggersRef.current = [];

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        const isFirst = index === 0;
        const isLast = index === cards.length - 1;

        // Sticky trigger for click-to-scroll navigation
        const stickySt = ScrollTrigger.create({
          trigger: card,
          start: "top 96px",
        });
        stickyTriggersRef.current.push(stickySt);

        // Rail active indicator trigger
        const railSt = ScrollTrigger.create({
          trigger: card,
          start: isFirst ? "top 75%" : "top 120px",
          endTrigger: isLast ? section : nextCard,
          end: isLast ? "bottom 60%" : "top 120px",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveRail(ECOSYSTEM_PRODUCTS[index].n);
            }
          },
        });

        railTriggersRef.current.push(railSt);
      });

      /*
       * Refresh ScrollTrigger after everything is created.
       */
      ScrollTrigger.refresh();

      /*
       * Cleanup for this media query.
       */
      return () => {
        railTriggersRef.current = [];
        stickyTriggersRef.current = [];
        cards.forEach((card) => {
          const inner = card.querySelector<HTMLElement>(".card-inner");
          if (inner) {
            gsap.killTweensOf(inner);
            gsap.set(inner, {
              clearProps: "transform,opacity,visibility",
            });
          }
        });

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger && section.contains(trigger.trigger)) {
            trigger.kill();
          }
        });
      };
    });

    /*
     * Mobile/tablet:
     *
     * GSAP does not run below 1024px.
     * Clear any inline styles so your existing
     * responsive SCSS controls the design.
     */
    mm.add("(max-width: 1023px)", () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const inner = card.querySelector<HTMLElement>(".card-inner");

        if (!inner) return;

        gsap.set(inner, {
          clearProps: "transform,opacity,visibility",
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  // Mobile horizontal scroll active card observer & seamless wrapping
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    let jumpTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (window.innerWidth >= 1024) return;
      const children = Array.from(container.children) as HTMLElement[];
      if (children.length < 3) return;

      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      children.forEach((el, idx) => {
        const elCenter = el.offsetLeft - container.offsetLeft + el.offsetWidth / 2;
        const diff = Math.abs(containerCenter - elCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      const totalReal = ECOSYSTEM_PRODUCTS.length;
      let resolvedRealIdx = 0;
      if (closestIdx === 0) {
        resolvedRealIdx = totalReal - 1;
      } else if (closestIdx === totalReal + 1) {
        resolvedRealIdx = 0;
      } else {
        resolvedRealIdx = closestIdx - 1;
      }

      if (resolvedRealIdx >= 0 && resolvedRealIdx < totalReal) {
        setActiveRail(ECOSYSTEM_PRODUCTS[resolvedRealIdx].n);
      }

      // Silent wrap after user manual swipe finishes
      if (jumpTimer) clearTimeout(jumpTimer);
      jumpTimer = setTimeout(() => {
        if (window.innerWidth >= 1024) return;
        if (closestIdx === 0) {
          const realLast = cardRefs.current[totalReal - 1];
          if (realLast && container) {
            container.scrollTo({
              left: realLast.offsetLeft - container.offsetLeft,
              behavior: "instant" as ScrollBehavior,
            });
          }
        } else if (closestIdx === totalReal + 1) {
          const realFirst = cardRefs.current[0];
          if (realFirst && container) {
            container.scrollTo({
              left: realFirst.offsetLeft - container.offsetLeft,
              behavior: "instant" as ScrollBehavior,
            });
          }
        }
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (jumpTimer) clearTimeout(jumpTimer);
    };
  }, []);

  // Initial scroll position to first real card on mobile
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const setInitialPos = () => {
      if (window.innerWidth < 1024) {
        const realFirst = cardRefs.current[0];
        if (realFirst && container.scrollLeft === 0) {
          container.scrollLeft = realFirst.offsetLeft - container.offsetLeft;
        }
      }
    };

    const timer = setTimeout(setInitialPos, 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCard = (index: number, scrollWindow: boolean = true) => {
    if (index < 0 || index >= ECOSYSTEM_PRODUCTS.length) return;
    setActiveRail(ECOSYSTEM_PRODUCTS[index].n);

    if (window.innerWidth >= 1024) {
      if (!scrollWindow) return;

      const section = sectionRef.current;
      const sectionDocTop = section
        ? section.getBoundingClientRect().top + window.scrollY
        : 0;

      // Special handling for first card (Slota / 01)
      if (index === 0) {
        const firstSt = stickyTriggersRef.current[0];
        const targetTop =
          firstSt && typeof firstSt.start === "number" && !isNaN(firstSt.start)
            ? Math.max(0, firstSt.start - 80)
            : Math.max(0, sectionDocTop - 70);

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
        return;
      }

      // Sticky trigger for card index
      const st = stickyTriggersRef.current[index];
      if (st && typeof st.start === "number" && !isNaN(st.start)) {
        window.scrollTo({
          top: st.start + 2,
          behavior: "smooth",
        });
        return;
      }

      // Safe fallback using cumulative card heights from section top
      const cards = cardRefs.current;
      let cumulativeOffset = 0;
      for (let i = 0; i < index; i++) {
        const c = cards[i];
        cumulativeOffset += (c?.offsetHeight || 500) + 26;
      }
      const headerOffset = 240; // Height of ecosystem header and margins
      const targetScrollTop = Math.max(0, sectionDocTop + headerOffset + cumulativeOffset - 96 + 2);

      window.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    } else {
      // Mobile & Tablet: scroll window to section only if requested (e.g. from header nav/hash link)
      if (scrollWindow) {
        const section = sectionRef.current;
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({
            top: Math.max(0, sectionTop),
            behavior: "smooth",
          });
        }
      }

      const container = cardsContainerRef.current;
      const card = cardRefs.current[index];
      if (container && card) {
        const left = card.offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: left,
          behavior: "smooth",
        });
      }
    }
  };

  // Listen for navigation requests from Header or external links
  useEffect(() => {
    const handleProductNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string; index?: number }>;
      const { id, index } = customEvent.detail || {};
      let targetIdx = -1;
      if (typeof index === "number" && index >= 0 && index < ECOSYSTEM_PRODUCTS.length) {
        targetIdx = index;
      } else if (id) {
        targetIdx = ECOSYSTEM_PRODUCTS.findIndex(
          (p) =>
            p.id.toLowerCase() === id.toLowerCase() ||
            p.n === id ||
            p.name.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
        );
      }
      if (targetIdx !== -1) {
        scrollToCard(targetIdx, true);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (!hash) return;
      const targetIdx = ECOSYSTEM_PRODUCTS.findIndex(
        (p) =>
          p.id.toLowerCase() === hash ||
          p.name.toLowerCase().replace(/\s+/g, "-") === hash ||
          p.n === hash
      );
      if (targetIdx !== -1) {
        scrollToCard(targetIdx, true);
      }
    };

    window.addEventListener("scroll-to-ecosystem-product", handleProductNavigate);
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      setTimeout(handleHashChange, 350);
    }

    return () => {
      window.removeEventListener("scroll-to-ecosystem-product", handleProductNavigate);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollPrevMobile = () => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const currentIdx = ECOSYSTEM_PRODUCTS.findIndex((p) => p.n === activeRail);

    if (currentIdx <= 0) {
      // Smoothly scroll to the prepended clone of the last card (DOM index 0)
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        container.scrollTo({
          left: firstChild.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
      setActiveRail(ECOSYSTEM_PRODUCTS[ECOSYSTEM_PRODUCTS.length - 1].n);

      // Silently snap to the real last card after transition
      setTimeout(() => {
        const realLast = cardRefs.current[ECOSYSTEM_PRODUCTS.length - 1];
        if (realLast && container) {
          container.scrollTo({
            left: realLast.offsetLeft - container.offsetLeft,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }, 420);
    } else {
      scrollToCard(currentIdx - 1, false);
    }
  };

  const scrollNextMobile = () => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const currentIdx = ECOSYSTEM_PRODUCTS.findIndex((p) => p.n === activeRail);

    if (currentIdx >= ECOSYSTEM_PRODUCTS.length - 1) {
      // Smoothly scroll to the appended clone of the first card (last DOM child)
      const lastChild = container.lastElementChild as HTMLElement;
      if (lastChild) {
        container.scrollTo({
          left: lastChild.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
      setActiveRail(ECOSYSTEM_PRODUCTS[0].n);

      // Silently snap to the real first card after transition
      setTimeout(() => {
        const realFirst = cardRefs.current[0];
        if (realFirst && container) {
          container.scrollTo({
            left: realFirst.offsetLeft - container.offsetLeft,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }, 420);
    } else {
      scrollToCard(currentIdx + 1, false);
    }
  };

  // Prepare display items with clone wrappers for infinite mobile looping
  const displayCards = [
    {
      ...ECOSYSTEM_PRODUCTS[ECOSYSTEM_PRODUCTS.length - 1],
      uniqueKey: `clone-prev-${ECOSYSTEM_PRODUCTS[ECOSYSTEM_PRODUCTS.length - 1].n}`,
      isClone: true,
      realIndex: ECOSYSTEM_PRODUCTS.length - 1,
    },
    ...ECOSYSTEM_PRODUCTS.map((prod, idx) => ({
      ...prod,
      uniqueKey: prod.n,
      isClone: false,
      realIndex: idx,
    })),
    {
      ...ECOSYSTEM_PRODUCTS[0],
      uniqueKey: `clone-next-${ECOSYSTEM_PRODUCTS[0].n}`,
      isClone: true,
      realIndex: 0,
    },
  ];

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="ecosystem-section content-padding"
      aria-label="Product Ecosystem"
    >
      <div className="ecosystem-container">
        {/* Section Header */}
        <div className="ecosystem-header">
          <div data-reveal="" className="ecosystem-eyebrow">The ecosystem</div>

          <h2 data-reveal="" className="ecosystem-headline">
            Built Independently.
            <br />
            Connected Seamlessly.
          </h2>

          <p data-reveal="" className="ecosystem-intro">
            Each product works as a standalone platform while sharing
            a unified foundation for identity, billing, analytics, and
            automation. Choose the solutions you need today and
            expand your ecosystem as your business evolves
          </p>
        </div>

        {/* Section Main Content Grid */}
        <div className="ecosystem-body">


          {/* Cards Area with Mobile Navigation Arrows & Bottom Dots */}
          <div className="ecosystem-cards-wrapper">
            {/* Mobile Left Arrow Button (Middle of Card) */}
            <button
              type="button"
              className="ecosystem-mobile-arrow prev-btn"
              onClick={scrollPrevMobile}
              aria-label="Previous ecosystem product card"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Stacking Cards List (Horizontal on Mobile, Sticky on Desktop) */}
            <div ref={cardsContainerRef} className="ecosystem-cards">
              {displayCards.map((prod) => (
                <div
                  key={prod.uniqueKey}
                  id={!prod.isClone ? prod.id : undefined}
                  ref={(el) => {
                    if (!prod.isClone) {
                      cardRefs.current[prod.realIndex] = el;
                    }
                  }}
                  className={`ecosystem-card ${prod.isClone ? "is-clone" : ""}`}
                  data-card={prod.n}
                  data-product-id={prod.id}
                  style={{ zIndex: prod.isClone ? 1 : prod.realIndex + 1 }}
                >
                  <div className="card-inner">
                    {/* Left Column: Content & Metadata */}
                    <div className="card-content">
                      {/* Left Accent Color Strip */}
                      <div
                        className="card-accent-bar"
                        style={{
                          backgroundColor: prod.tint,
                        }}
                        aria-hidden="true"
                      />

                      {/* Header Row: Category Badge & Giant Number */}
                      <div className="card-header-row">
                        <div className="card-tag-pill">
                          {prod.logo ? (
                            <Image
                              src={prod.logo}
                              alt={`${prod.name} Logo`}
                              width={48}
                              height={22}
                              className="tag-logo"
                            />
                          ) : (
                            <span
                              className="tag-mark"
                              style={{
                                backgroundColor: prod.tint,
                              }}
                            >
                              {prod.mark}
                            </span>
                          )}

                          <span className="tag-label">{prod.tag}</span>
                        </div>

                        <div className="card-number" aria-hidden="true">
                          {prod.n}
                        </div>
                      </div>

                      {/* Product Name & Description */}
                      <h3 className="card-title">{prod.name}</h3>

                      <p className="card-desc">{prod.desc}</p>

                      {/* Bullet Features */}
                      <div className="card-features">
                        {prod.features.map((feature, fIdx) => (
                          <div key={fIdx} className="feature-item">
                            <span
                              className="feature-dot"
                              style={{
                                backgroundColor: prod.tint,
                              }}
                              aria-hidden="true"
                            />

                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Metrics Chips */}
                      <div className="card-metrics">
                        {/* Metric 1 (Dark Theme) */}
                        <div className="metric-chip metric-primary">
                          <div className="chip-label">{prod.metricLabel}</div>

                          <div className="chip-value">{prod.metric}</div>
                        </div>

                        {/* Metric 2: Growth Delta */}
                        <div className="metric-chip metric-secondary">
                          <div className="chip-label">Growth</div>

                          <div className="chip-value">{prod.metricDelta}</div>
                        </div>

                        {/* Metric 3: Realtime App Stat */}
                        <div className="metric-chip metric-secondary">
                          <div className="chip-label">{prod.appLabel}</div>

                          <div className="chip-value">{prod.appValue}</div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="card-actions">
                        <Link href="/book-a-demo" className="btn-card-primary">
                          Launch demo{" "}
                          <span className="btn-arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>

                        <Link href={`/products/${prod.id}`} className="btn-card-secondary">
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Screenshot Visual */}
                    <EcosystemVisualCol prod={prod} />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Right Arrow Button (Middle of Card) */}
            <button
              type="button"
              className="ecosystem-mobile-arrow next-btn"
              onClick={scrollNextMobile}
              aria-label="Next ecosystem product card"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Mobile Bottom Pagination Dots (No text, no numbers) */}
            <div className="ecosystem-mobile-dots" aria-label="Product pagination dots">
              {ECOSYSTEM_PRODUCTS.map((prod, idx) => (
                <button
                  key={prod.n}
                  type="button"
                  className={`ecosystem-dot ${activeRail === prod.n ? "is-active" : ""}`}
                  onClick={() => scrollToCard(idx, false)}
                  aria-label={`Go to slide ${idx + 1}: ${prod.name}`}
                >
                  <span
                    className="dot-fill"
                    style={{
                      backgroundColor: activeRail === prod.n ? prod.tint : undefined,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}