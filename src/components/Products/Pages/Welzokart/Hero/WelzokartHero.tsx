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
  MessageSquare
} from "lucide-react";
import "./WelzokartHero.scss";

const SLIDES = [
  {
    id: "home",
    title: "Home & Discovery",
    desc: "Browse fresh groceries & daily essentials with AI search",
    img: "/shots/Welzokart 2.jpg",
    callout: "⚡ 15-Min Express Delivery"
  },
  {
    id: "cart",
    title: "Smart Cart & Checkout",
    desc: "Instant coupon application, multi-address & quick payment",
    img: "/shots/Welzokart_ui-1.jpg",
    callout: "🔒 100% Secure Instant Payments"
  },
  {
    id: "tracking",
    title: "Real-Time GPS Tracking",
    desc: "Live rider location tracking with estimated arrival timer",
    img: "/shots/Welzokart_ui-2.jpg",
    callout: "📍 Real-Time Live Order Tracking"
  },
  {
    id: "express",
    title: "Driver & Partner App",
    desc: "Instant dispatch, route optimization and delivery proof",
    img: "/shots/Welzokart_ui-3.jpg",
    callout: "⭐ 4.9 Rating Across 150K+ Reviews"
  }
];

export function WelzokartHero({ product }: { product: ProductItem }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Count-up stats animation
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);

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

  // Animated counter effect on load
  useEffect(() => {
    let step = 0;
    const duration = 2000;
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setOrdersCount(Math.floor(easeProgress * 250));
      setUsersCount(Math.floor(easeProgress * 150));
      setCitiesCount(Math.floor(easeProgress * 45));

      if (progress >= 1) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

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
              <span className="current">WelzoKart</span>
            </nav>

            {/* Identity Badge */}
            <div className="identity-top">
              <Image
                src="/logos/welzokart-logo.png"
                alt="WelzoKart Logo"
                width={180}
                height={50}
                className="identity-logo"
                priority
              />
              <div className="identity-meta">
                <strong className="identity-name">WelzoKart</strong>
                <span className="identity-sub">
                  <i className="pulse-dot" /> GROCERY DELIVERY · LIVE IN PRODUCTION
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="hero-lc-title">
              Fresh groceries, easy shopping and delivery at your doorstep.
            </h1>

            {/* Chips / Badges under Title */}
            <div className="hero-chips-bar" aria-label="Platform tags">
              <span className="chip-badge">eCommerce</span>
              <span className="chip-sep">·</span>
              <span className="chip-badge">Web &amp; Mobile</span>
              <span className="chip-sep">·</span>
              <span className="chip-badge">Commerce Ops</span>
              <span className="chip-sep">·</span>
              <span className="chip-badge">Global</span>
            </div>

            {/* High-Legibility Description */}
            <p className="hero-lc-desc">
              WelzoKart is an online grocery delivery platform designed to make everyday shopping simple and convenient. Users can explore products, manage their cart, place secure orders, and track deliveries in real time, creating a smooth shopping experience from discovery to doorstep.
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
                <span>15-Min Delivery</span>
              </div>

              <div className="floating-badge badge-bottom-left">
                <MapPin size={15} className="icon-map" />
                <span>Real-Time Tracking</span>
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
                <ShoppingBag size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">{ordersCount}K+</span>
                <span className="stat-text">Orders Completed</span>
              </div>
            </div>

            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <Users size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">{usersCount}K+</span>
                <span className="stat-text">Active App Users</span>
              </div>
            </div>

            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <Building2 size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">{citiesCount}+</span>
                <span className="stat-text">Cities Operating</span>
              </div>
            </div>

            <div className="stat-live-card">
              <div className="stat-icon-wrap">
                <CheckCircle2 size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-num">99.9%</span>
                <span className="stat-text">Platform Uptime</span>
              </div>
            </div>
          </div>

          <div className="trust-proof-strip">
            <span className="trust-label">
              Trusted by 50+ regional retail chains &amp; quick-commerce operators
            </span>
            <div className="trust-badges">
              <span className="proof-pill">✓ Multi-Vendor Support</span>
              <span className="proof-pill">✓ Live GPS Tracking</span>
              <span className="proof-pill">✓ PCI-DSS Secure Payments</span>
            </div>
          </div>
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
                <h3>WelzoKart 60-Second Walkthrough</h3>
                <p>See how orders move seamlessly from mobile discovery to live rider delivery.</p>
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