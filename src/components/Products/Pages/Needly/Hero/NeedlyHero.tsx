"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
  ShoppingBag,
  Building2,
  X,
  MessageSquare,
  Smartphone,
  Globe
} from "lucide-react";
import "./NeedlyHero.scss";

const SLIDES = [
  {
    id: "request",
    title: "Request Groceries",
    desc: "Send your product list directly to nearby local shops.",
    img: "/shots/Welzokart_ui-1.png",
    callout: "📝 Seamless Order Requests"
  },
  {
    id: "response",
    title: "Shop Response",
    desc: "Shops confirm what is available and reply with clear prices.",
    img: "/shots/Welzokart_ui-2.png",
    callout: "✅ Real-Time Availability"
  },
  {
    id: "confirm",
    title: "Review & Confirm",
    desc: "Review the shop's offer and securely confirm your purchase.",
    img: "/shots/Welzokart_ui-3.png",
    callout: "💳 Easy Secure Confirmation"
  },
  {
    id: "delivery",
    title: "Local Delivery",
    desc: "Groceries are packed and delivered straight to your door.",
    img: "/shots/Welzokart_ui-4.png",
    callout: "📍 Transparent Delivery"
  }
];

export function NeedlyHero({ product }: { product: ProductItem }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Parallax tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
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
    <section className="welzokart-hero-lc">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
      </div>

      <div className="welzokart-hero-lc-container">
        {/* Top Split Section */}
        <div className="hero-split-top">
          {/* Left Text Column */}
          <div className="hero-lc-content">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="hero-crumbs">
              <Link href="/products">Products</Link>
              <span className="crumb-sep">/</span>
              <span className="current">Needly</span>
            </nav>

            {/* Identity Badge */}
            <div className="identity-top">
              <Image
                src="/logos/Needly-logo.png"
                alt="WelzoKart Logo"
                width={180}
                height={50}
                className="identity-logo"
                priority
              />
              <div className="identity-meta">
                <strong className="identity-name">Needly</strong>
                <span className="identity-sub">
                  <i className="pulse-dot" /> GROCERY REQUEST PLATFORM · LIVE IN PRODUCTION
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="hero-lc-title">
              Order groceries from nearby shops, with real-time availability and pricing.
            </h1>

            {/* Chips / Badges under Title */}
            <div className="hero-chips-bar" aria-label="Platform tags">
              <span className="chip-badge">Request-Based</span>
              <span className="chip-sep">·</span>
              <span className="chip-badge">Web &amp; Mobile</span>
              <span className="chip-sep">·</span>
              <span className="chip-badge">Local Shopping</span>
              <span className="chip-sep">·</span>
              <span className="chip-badge">Global</span>
            </div>

            {/* High-Legibility Description */}
            <p className="hero-lc-desc">
              Needly connects customers with nearby grocery shops, making local shopping easier through direct product requests, shop responses, and simple order confirmation.
            </p>

            {/* Hero CTA Action Buttons */}
            <div className="hero-cta-actions">
              <Link href="/contact" className="btn-hero-primary">
                <span>Book a Demo</span>
                <ArrowRight size={18} className="arrow-icon" />
              </Link>

              <Link href="/contact" className="btn-hero-secondary">
                <div className="play-icon-circle">
                  <MessageSquare size={14} />
                </div>
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <div className="hero-lc-visual">
            <div
              ref={phoneRef}
              className="phone-mockup-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsPaused(true)}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              }}
            >
              {/* Floating Callout Badges */}
              <div className="floating-badge badge-top-left">
                <Zap size={15} className="icon-zap" />
                <span>Quick Shop Replies</span>
              </div>

              <div className="floating-badge badge-bottom-left">
                <MapPin size={15} className="icon-map" />
                <span>Nearby Local Shops</span>
              </div>

              <div className="floating-badge badge-top-right">
                <ShieldCheck size={15} className="icon-shield" />
                <span>Secure Payments</span>
              </div>

              <div className="floating-badge badge-bottom-right">
                <Star size={15} className="icon-star" />
                <span>4.9 App Rating</span>
              </div>

              {/* Smartphone Outer Frame */}
              <div className="phone-device-frame">
                <div className="phone-notch">
                  <div className="camera-lens" />
                  <div className="speaker-grille" />
                </div>

                {/* Sliding Phone Screen Display */}
                <div className="phone-screen-viewport">
                  {SLIDES.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`phone-screen-slide ${index === activeSlide ? "is-active" : ""}`}
                    >
                      <Image
                        src={slide.img}
                        alt={slide.title}
                        width={600}
                        height={1000}
                        className="phone-screen-img"
                        priority={index === 0}
                      />
                      <div className="slide-overlay-info">
                        <span className="slide-tag">{slide.callout}</span>
                        <h4 className="slide-title">{slide.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrow Controls */}
                <button
                  type="button"
                  aria-label="Previous slide"
                  className="mockup-nav-arrow arrow-left"
                  onClick={() =>
                    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
                  }
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  aria-label="Next slide"
                  className="mockup-nav-arrow arrow-right"
                  onClick={() =>
                    setActiveSlide((prev) => (prev + 1) % SLIDES.length)
                  }
                >
                  <ChevronRight size={20} />
                </button>

                {/* Pagination Dots */}
                <div className="phone-screen-dots">
                  {SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Go to ${slide.title}`}
                      className={`screen-dot ${idx === activeSlide ? "is-active" : ""}`}
                      onClick={() => setActiveSlide(idx)}
                    >
                      <span className="dot-tooltip">{slide.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Production Stats & Social Proof Bar */}
        <div className="hero-social-proof-bar">
          <div className="stats-live-grid">
            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <Building2 size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">Industry</span>
                <span className="stat-text">Local Groceries</span>
              </div>
            </div>

            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <Smartphone size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">Platform</span>
                <span className="stat-text">Mobile application</span>
              </div>
            </div>

            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <Zap size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">Solutions</span>
                <span className="stat-text">Request-to-Delivery</span>
              </div>
            </div>

            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <Globe size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">Country</span>
                <span className="stat-text">India</span>
              </div>
            </div>
          </div>

          {/* <div className="trust-proof-strip">
            <span className="trust-label">
              Trusted by 50+ regional retail chains &amp; quick-commerce operators
            </span>
            <div className="trust-badges">
              <span className="proof-pill">✓ Multi-Vendor Support</span>
              <span className="proof-pill">✓ Live GPS Tracking</span>
              <span className="proof-pill">✓ PCI-DSS Secure Payments</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className="hero-video-modal-backdrop" onClick={() => setIsVideoOpen(false)}>
          <div className="hero-video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video modal"
            >
              <X size={24} />
            </button>
            <div className="video-container">
              <div className="video-placeholder-card">
                <div className="play-pulse-ring">
                  <Play size={48} className="icon-play-big" />
                </div>
                <h3>Needly 60-Second Walkthrough</h3>
                <p>See how smoothly requests flow from the customer to the local shop owner.</p>
                <Link href="/contact" className="btn-modal-action" onClick={() => setIsVideoOpen(false)}>
                  Request Full Product Demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}