"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Smartphone, Bike, Store, LayoutDashboard, CheckCircle, ArrowRight } from "lucide-react";
import "./WelzokartInterface.scss";

const TABS = [
  {
    id: "customer",
    label: "Customer App",
    icon: Smartphone,
    img: "/shots/Welzokart_interface-1.jpg",
    badge: "iOS & Android",
    title: "Seamless Everyday Shopping Experience",
    desc: "Designed for speed and simplicity. Users can search fresh produce, manage smart carts, and track deliveries live.",
    features: [
      "AI Smart Search & Category Filters",
      "Real-time Cart Calculations & Multi-Address",
      "Instant Checkout via UPI, Cards, NetBanking & COD",
      "Live Rider GPS Location & Estimated Arrival"
    ]
  },
  {
    id: "delivery",
    label: "Delivery Partner App",
    icon: Bike,
    img: "/shots/Welzokart_interface-2.jpg",
    badge: "Rider Ecosystem",
    title: "Optimized Fleet & Express Dispatch",
    desc: "Empowers riders with live route guidance, instant order acceptance, and earnings tracking.",
    features: [
      "Smart Order Batching & Auto-Dispatch",
      "Turn-by-Turn Route Optimization",
      "OTP-based Secure Handover & Proof",
      "Daily Earning Log, Tips & Performance Rating"
    ]
  },
  {
    id: "vendor",
    label: "Vendor Store Panel",
    icon: Store,
    img: "/shots/Welzokart_ui-1.jpg",
    badge: "Merchant Hub",
    title: "Inventory & Fulfillment Control",
    desc: "Enables grocery store owners to manage live inventory, price updates, and instant order fulfillment.",
    features: [
      "Bulk Catalog & Stock Level Management",
      "Instant Order Loud-Alert & Packing List",
      "Automated Low-Stock Alerts & Auto-Restock",
      "Merchant Settlement & Payout Statements"
    ]
  },
  {
    id: "admin",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    img: "/shots/Welzokart_ui-2.jpg",
    badge: "Central Ops",
    title: "Complete Platform Governance",
    desc: "Central command center for multi-store monitoring, commission settings, surge pricing, and live analytics.",
    features: [
      "Live Interactive Rider & Order Heatmap",
      "Store Onboarding, KYC & Commission Rules",
      "Dynamic Delivery Zone & Surge Control",
      "Comprehensive GST, Sales & Financial Analytics"
    ]
  }
];

export function WelzokartInterface() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = TABS[activeTab];

  // 3D Mouse Tilt Parallax Effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -12,
      y: (x / rect.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="interface" className="welzokart-interface-lc">
      <div className="interface-lc-container">

        {/* Section Header */}
        <div className="interface-lc-header">
          <span className="lc-eyebrow">INTERFACE &amp; ECOSYSTEM</span>
          <div className="header-title-row">
            <h2 className="lc-headline">
              Purpose-Built Interfaces for Every Stakeholder
            </h2>
            <p className="lc-desc">
              WelzoKart connects customers, riders, grocery store vendors, and platform administrators into one synchronized ecosystem. Explore how each interface simplifies operations.
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="interface-tab-buttons" role="tablist">
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(idx)}
                className={`tab-btn ${isActive ? "is-active" : ""}`}
              >
                <Icon size={18} className="tab-icon" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Card */}
        <div className="interface-tab-content">
          <div className="tab-info-col">
            <span className="tab-badge">{currentTab.badge}</span>
            <h3 className="tab-title">{currentTab.title}</h3>
            <p className="tab-desc">{currentTab.desc}</p>

            <div className="tab-features-list">
              {currentTab.features.map((feat, i) => (
                <div key={i} className="tab-feature-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <a href="/contact" className="btn-tab-action">
              <span>Explore {currentTab.label} Details</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="tab-media-col">
            <div
              ref={frameRef}
              className="tab-image-frame 3d-tilt-frame"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out"
              }}
            >
              <Image
                key={currentTab.id}
                src={currentTab.img}
                alt={currentTab.title}
                width={700}
                height={500}
                className="tab-active-img"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
