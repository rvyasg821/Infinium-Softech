"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import { ArrowRight, MessageSquare, Store, Smartphone, Globe, Briefcase } from "lucide-react";
import "./NeedlyHero.scss";

export function NeedlyHero({ product }: { product: ProductItem }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const blockRef = useRef<HTMLDivElement>(null);

  // Parallax float handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!blockRef.current) return;
    const rect = blockRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -3,
      y: (x / rect.width) * 3
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="needly-hero-section">
      <div className="needly-hero-container">

        {/* Top Split Section */}
        <div className="hero-split-top">
          <div className="hero-left-col">
            <nav aria-label="Breadcrumb" className="hero-crumbs">
              <Link href="/products">Products</Link>
              <span className="crumb-sep">/</span>
              <span className="current">Needly</span>
            </nav>

            <div className="identity-top">
              <Image
                src="/logos/Needly-logo.png"
                alt="Needly Logo"
                width={80}
                height={80}
                className="identity-logo"
                priority
              />
              <div className="identity-meta">
                <strong className="identity-name">Needly</strong>
                <span className="identity-sub">
                  Order groceries from nearby shops with live pricing.
                </span>
              </div>
            </div>

            <div className="hero-handwritten">
              Har Dukaan. Har Zaroorat.
            </div>

            <h1 className="hero-headline">
              Nearby Groceries, <br />
              Real-Time Prices
            </h1>

            <div className="hero-tags" aria-label="Platform tags">
              <span className="tag-pill">Request-Based</span>
              <span className="tag-pill">Web &amp; Mobile</span>
              <span className="tag-pill">Local Shopping</span>
              <span className="tag-pill">Global</span>
            </div>

            <p className="hero-description">
              Needly connects customers with nearby local grocery shops, making local shopping easier through direct product requests, shop responses, and simple order confirmation.
            </p>

            <div className="hero-cta-group">
              <Link href="/contact" className="needly-btn-primary">
                <span>Book a Demo</span>
                <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              </Link>

              <Link href="/contact" className="needly-btn-secondary">
                <MessageSquare size={16} style={{ marginRight: "8px" }} />
                <span>Talk to Our Team</span>
              </Link>
            </div>

          </div>

          <div className="hero-right-col">
            <div
              ref={blockRef}
              className="blob-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              }}
            >
              <div className="blob-shape"></div>
              <div className="blob-orange-circle"></div>

              <Image
                src="/shots/Welzokart_ui-1.png"
                alt="Shop catalog screen"
                width={250}
                height={520}
                className="phone-screen phone-back"
                priority
              />
              <Image
                src="/shots/Welzokart_ui-4.png"
                alt="Request screen"
                width={250}
                height={520}
                className="phone-screen phone-front"
                priority
              />
            </div>
          </div>
        </div>

        {/* Live Production Stats & Social Proof Bar (Moved below split layout) */}
        <div className="hero-pinned-info">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon"><Briefcase size={22} /></div>
              <div className="info-text">
                <strong>Industry</strong>
                <span>Local Groceries</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><Smartphone size={22} /></div>
              <div className="info-text">
                <strong>Platform</strong>
                <span>Mobile application</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><Store size={22} /></div>
              <div className="info-text">
                <strong>Solutions</strong>
                <span>Request-to-Delivery</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><Globe size={22} /></div>
              <div className="info-text">
                <strong>Country</strong>
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}