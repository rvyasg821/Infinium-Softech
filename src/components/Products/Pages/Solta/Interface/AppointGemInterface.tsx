"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AppointGemInterface.scss";

gsap.registerPlugin(ScrollTrigger);

interface FeatureShot {
  id: string;
  num: string;
  title: string;
  badge: string;
  image: string;
  alt: string;
}

const FEATURE_SHOTS: FeatureShot[] = [
  {
    id: "shot-1",
    num: "01",
    title: "Day view — every slot tied to a named practitioner and room.",
    badge: "Live Calendar Grid",
    image: "/shots/slota-ui1.png",
    alt: "Slota Day View Interface",
  },
  {
    id: "shot-2",
    num: "02",
    title: "Booking detail — deposit, balance and reminder history in one panel.",
    badge: "Unified Booking Rail",
    image: "/shots/slota-ui-2.png",
    alt: "Slota Booking Detail Interface",
  },
  {
    id: "shot-3",
    num: "03",
    title: "Reporting — utilisation and revenue per practitioner and branch.",
    badge: "Real-Time Analytics",
    image: "/shots/slota-ui-1.png",
    alt: "AppointGem Reporting & Analytics Interface",
  },
];

export function AppointGemInterface() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => card !== null,
      );

      if (!cards.length) return;

      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".interface-card-inner");
        if (inner) {
          gsap.set(inner, {
            scale: 1,
            opacity: 1,
            transformOrigin: "center center",
          });
        }
      });

      cards.forEach((card, index) => {
        const inner = card.querySelector<HTMLElement>(".interface-card-inner");
        const nextCard = cards[index + 1];
        if (!inner || !nextCard) return;

        gsap.fromTo(
          inner,
          { scale: 1, opacity: 1, visibility: "visible" },
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
          }
        );
      });

      const triggers = cards.map((card, index) => {
        const nextCard = cards[index + 1];
        return ScrollTrigger.create({
          trigger: card,
          start: index === 0 ? "top 75%" : "top 120px",
          endTrigger: nextCard || section,
          end: nextCard ? "top 120px" : "bottom 60%",
          onEnter: () => setActiveTab(index),
          onEnterBack: () => setActiveTab(index),
        });
      });

      ScrollTrigger.refresh();

      return () => {
        cards.forEach((card) => {
          const inner = card.querySelector<HTMLElement>(".interface-card-inner");
          if (inner) {
            gsap.killTweensOf(inner);
            gsap.set(inner, { clearProps: "transform,opacity,visibility" });
          }
        });
        triggers.forEach((trigger) => trigger.kill());
      };
    });

    return () => mediaQuery.revert();
  }, []);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (window.innerWidth >= 1024) return;

      const center = container.scrollLeft + container.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveTab(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    setActiveTab(index);
    if (window.innerWidth < 1024) {
      cardsContainerRef.current?.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
      return;
    }

    const cardsContainer = cardsContainerRef.current;
    const cardsTop = cardsContainer
      ? cardsContainer.getBoundingClientRect().top + window.scrollY
      : card.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: cardsTop + card.offsetTop - 96,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="interface1" className="appointgem-interface-section" aria-labelledby="interface-title">
      <div className="appointgem-interface-container">
        <div className="interface-header">
          <div>
            <span data-reveal="" className="appointgem-eyebrow">Interface</span>
            <h2 data-reveal="" id="interface-title" className="interface-headline">
              Built for the <br className="mobile-title-break" />front desk first
            </h2>
          </div>
          <p data-reveal="" className="interface-subtitle">
            Day view, practitioner rail and payment state on one screen. Real-time availability, clear booking states and instant actions for seamless operations.
          </p>
        </div>

        <div className="interface-body">
          <div className="interface-cards-wrapper">
            <button
              type="button"
              className="interface-carousel-button prev"
              onClick={() => scrollToCard((activeTab - 1 + FEATURE_SHOTS.length) % FEATURE_SHOTS.length)}
              aria-label="Previous interface image"
            >
              <svg
                width="18"
                height="18"
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

            <div ref={cardsContainerRef} className="interface-cards-stack">
              {FEATURE_SHOTS.map((shot, idx) => (
                <div
                  key={shot.id}
                  ref={(element) => {
                    cardRefs.current[idx] = element;
                  }}
                  className="interface-card"
                >
                  <div className="interface-card-inner">
                    <div className="interface-card-visual">
                      <div className="visual-glow" aria-hidden="true" />
                      <div className="shot-img-wrapper">
                        <Image
                          src={shot.image}
                          alt={shot.alt}
                          width={1280}
                          height={720}
                          className="interface-shot-image"
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="interface-carousel-button next"
              onClick={() => scrollToCard((activeTab + 1) % FEATURE_SHOTS.length)}
              aria-label="Next interface image"
            >
              <svg
                width="18"
                height="18"
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
        </div>
      </div>
    </section>
  );
}
