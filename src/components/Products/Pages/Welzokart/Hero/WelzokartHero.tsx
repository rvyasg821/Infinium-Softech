"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import { Factory, MonitorSmartphone, Lightbulb, Globe } from "lucide-react";
import "./WelzokartHero.scss";

export function WelzokartHero({ product }: { product: ProductItem }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <section className="welzokart-hero-lc">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="welzokart-hero-lc-container">

        <div className="hero-split-top">
          <div className="hero-lc-content">

            {/* Breadcrumb */}
            <div className="hero-crumbs">
              <Link href="/products">Products</Link>
              <span>/</span>
              <span className="current">WelzoKart</span>
            </div>

            {/* Logo */}
            <div className="identity-top">
              <Image
                src="/logos/welzokart-logo.png"
                alt="WelzoKart"
                width={180}
                height={50}
                className="identity-logo"
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

            {/* Paragraph */}
            <p className="hero-lc-desc">
              WelzoKart is an online grocery delivery platform designed to make everyday shopping simple and convenient. Users can explore products, manage their cart, place secure orders, and track deliveries in real time, creating a smooth shopping experience from discovery to doorstep.
            </p>
          </div>

          <div className="hero-lc-visual">
            <div className="visual-wrapper">
              <Image
                src="/shots/Welzokart 2.jpg"
                alt="WelzoKart App Display"
                width={800}
                height={600}
                className="hero-main-image"
                priority
              />
            </div>
          </div>
        </div>

        <div className="hero-lc-stats-row">
          <div className="stat-card">
            <div className="stat-icon">
              <Factory size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Industry</span>
              <span className="stat-val">eCommerce</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <MonitorSmartphone size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Platform</span>
              <span className="stat-val">Web & Mobile</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Lightbulb size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Solution</span>
              <span className="stat-val">Commerce Ops</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Globe size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Country</span>
              <span className="stat-val">Global</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}