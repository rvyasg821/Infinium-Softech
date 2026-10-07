"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Banner.scss";

const SPARK_BARS = ["40%", "65%", "45%", "80%", "60%", "92%", "72%", "100%"];

export function Banner() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const section = sectionRef.current;
      const text = textRef.current;
      const deck = deckRef.current;
      const sticky = stickyRef.current;
      if (!section || !text || !deck || !sticky) return;

      // On mobile / tablet (< 1024px), keep natural responsive layout completely intact
      if (window.innerWidth < 1024) {
        text.style.transform = "";
        text.style.opacity = "";
        text.style.filter = "";
        deck.style.transform = "";
        const parallaxEls = deck.querySelectorAll<HTMLElement>("[data-parallax]");
        parallaxEls.forEach((el) => {
          el.style.marginTop = "";
        });
        return;
      }

      // 1024px+ desktop scroll & zoom animation
      const vh = window.innerHeight || 1;
      const y = window.scrollY || window.pageYOffset || 0;
      const scrollTrack = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      const p = Math.max(0, Math.min(1, y / (scrollTrack * 0.88)));
      const e = 1 - Math.pow(1 - p, 2); // Quad ease-out

      // Text animation: smoothly shift up, fade out, scale down and blur
      text.style.transform = `translate3d(0, ${(-e * 110).toFixed(1)}px, 0) scale(${(1 - e * 0.14).toFixed(4)})`;
      text.style.opacity = String(Math.max(0, 1 - e * 1.45));
      text.style.filter = `blur(${(e * 4).toFixed(2)}px)`;

      // Hero Deck & Image: smoothly scale from 0.88 to 1.00 and glide upwards
      const padTop = parseFloat(getComputedStyle(sticky).paddingTop) || 0;
      const textH = text.offsetHeight || 0;
      const startTop = padTop + textH + 20;
      const endTop = Math.min(60, Math.max(36, vh * 0.065));
      const top = startTop + (endTop - startTop) * e;
      const scale = 0.88 + e * 0.12;

      deck.style.transform = `translate3d(-50%, ${top.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;

      // Parallax effect on floating cards
      const parallaxEls = deck.querySelectorAll<HTMLElement>("[data-parallax]");
      parallaxEls.forEach((el) => {
        const rate = parseFloat(el.getAttribute("data-parallax") || "0");
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2 - vh / 2;
        const off = Math.max(-14, Math.min(14, mid * rate * -0.12));
        el.style.marginTop = `${off.toFixed(1)}px`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="banner content-padding" aria-label="Hero Banner">
      <div ref={stickyRef} className="banner-sticky-frame">
        {/* Background Ambient Glows */}
        <div className="hero-glow-layer" aria-hidden="true">
          <div className="hero-glow-tr" />
          <div className="hero-glow-bl" />
          <div className="hero-glow-center" />
          <div className="hero-orbs">
            <div className="orb-bl" />
            <div className="orb-tr" />
          </div>
        </div>

        {/* Background Animated SVG Waves */}
        <div className="banner-waves-layer" aria-hidden="true">
          <div className="banner-wave-track wave-track-a">
            <svg
              viewBox="0 0 3200 420"
              preserveAspectRatio="none"
              className="banner-wave-svg"
            >
              <defs>
                <linearGradient id="waveInk" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                  <stop offset="22%" stopColor="#1F31E8" stopOpacity="0.42" />
                  <stop offset="52%" stopColor="#4F46E5" stopOpacity="0.5" />
                  <stop offset="80%" stopColor="#1F31E8" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#1F31E8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="waveSoft" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                  <stop offset="40%" stopColor="#1F31E8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1F31E8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 236 C 260 150 420 322 680 236 C 940 150 1100 322 1360 236 C 1620 150 1780 322 2040 236 C 2300 150 2460 322 2720 236 C 2980 150 3060 292 3200 236"
                fill="none"
                stroke="url(#waveInk)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M0 268 C 260 182 420 354 680 268 C 940 182 1100 354 1360 268 C 1620 182 1780 354 2040 268 C 2300 182 2460 354 2720 268 C 2980 182 3060 324 3200 268"
                fill="none"
                stroke="url(#waveSoft)"
                strokeWidth="1.2"
              />
              <path
                d="M0 300 C 260 214 420 386 680 300 C 940 214 1100 386 1360 300 C 1620 214 1780 386 2040 300 C 2300 214 2460 356 2720 300 C 2980 214 3060 356 3200 300"
                fill="none"
                stroke="url(#waveSoft)"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="banner-wave-track wave-track-b">
            <svg
              viewBox="0 0 3200 420"
              preserveAspectRatio="none"
              className="banner-wave-svg"
            >
              <defs>
                <linearGradient id="waveGhost" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0C0C0D" stopOpacity="0" />
                  <stop offset="46%" stopColor="#0C0C0D" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#0C0C0D" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 196 C 320 96 520 300 840 200 C 1160 100 1360 304 1680 204 C 2000 104 2200 308 2520 208 C 2840 108 3000 268 3200 208"
                fill="none"
                stroke="url(#waveGhost)"
                strokeWidth="1.1"
              />
              <path
                d="M0 344 C 320 244 520 448 840 348 C 1160 248 1360 452 1680 352 C 2000 252 2200 456 2520 356 C 2840 256 3000 416 3200 356"
                fill="none"
                stroke="url(#waveGhost)"
                strokeWidth="1.1"
              />
            </svg>
          </div>
        </div>

        {/* Main Content Area */}
        <div ref={textRef} className="banner-content">
          <div className="banner-eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span className="eyebrow-text">Powerful Products</span>
            <span className="eyebrow-pill">One Unified Platform.</span>
          </div>

          <div className="banner-grid">
            <h1 className="banner-headline">
              One Platform.
              <br />
              Multiple Industries.
              <br />
              <span className="accent">Infinite Possibilities.</span>
            </h1>

            <div className="banner-side">
              <p className="banner-lede">
                From logistics and healthcare to commerce and education, Infinium Softech powers businesses
                with intelligent digital products designed to scale.
              </p>

              <div className="banner-actions">
                <Link href="/book-a-demo" className="btn-primary">
                  Book Live Demo <span aria-hidden="true">→</span>
                </Link>
                <Link href="/products" className="btn-secondary">
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Platform Deck with Dynamic Cards */}
        <div ref={deckRef} className="banner-deck">
          <div className="deck-container">
            {/* Hero Platform Preview Image */}
            <div className="deck-preview">
              <Image
                src="/brand/hero-platform.png"
                alt="Infinium Softech platform dashboard"
                width={1976}
                height={962}
                sizes="(min-width: 1280px) 1240px, (min-width: 1024px) 90vw, 100vw"
                priority
                className="preview-img"
              />
            </div>

            {/* Cards Container: On desktop floats over image with parallax; on mobile/tablet displays as full cards below image */}
            <div className="deck-cards-wrapper">
              {/* Card 1: AppointGem */}
              <div
                data-parallax="-0.09"
                className="stat-card card-appointgem"
                aria-hidden="true"
              >
                <div className="card-glass">
                  <div className="card-head">
                    <div className="card-mark mark-blue">
                      <Image
                        src="/logos/slota-logo.png"
                        alt="Slota Logo"
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="card-title">Slota</div>
                  </div>
                  <div className="card-metric">18,412</div>
                  <div className="card-caption">bookings this month</div>
                </div>
              </div>

              {/* Card 2: LoadGo */}
              <div
                data-parallax="0.07"
                className="stat-card card-truckguru"
                aria-hidden="true"
              >
                <div className="card-glass">
                  <div className="card-head">
                    <div className="card-mark mark-amber">TG</div>
                    <div className="card-title">LoadGo</div>
                  </div>
                  <div className="card-metric">482</div>
                  <div className="card-caption">trucks on road now</div>
                </div>
              </div>

              {/* Card 3: WelzoKart Spark Chart */}
              <div
                data-parallax="0.11"
                className="stat-card card-welzokart"
                aria-hidden="true"
              >
                <div className="card-glass">
                  <div className="card-head">
                    <div className="card-mark mark-green">
                      <Image
                        src="/logos/welzokart-logo.png"
                        alt="WelzoKart Logo"
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="card-title">WelzoKart</div>
                  </div>
                  <div className="card-spark-bars">
                    {SPARK_BARS.map((height, idx) => (
                      <div
                        key={idx}
                        className="spark-bar"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}