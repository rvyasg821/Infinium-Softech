"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Smartphone, Bike, Store, LayoutDashboard, CheckCircle, ArrowRight } from "lucide-react";
import "./NeedlyInterface.scss";

const TABS = [
  {
    id: "customer",
    label: "Customer App",
    icon: Smartphone,
    img: "/shots/Welzokart_interface-1.jpg",
    badge: "For Shoppers",
    title: "Easy Request Submission Builder",
    desc: "Create and send grocery requests to nearby shops in seconds.",
    features: [
      "Send custom grocery lists",
      "Receive live shop responses",
      "Review prices and availability",
      "One-tap secure order confirmation"
    ]
  },
  {
    id: "vendor",
    label: "Shop Owner App",
    icon: Store,
    img: "/shots/Welzokart_ui-1.jpg",
    badge: "For Local Shops",
    title: "Streamlined Order Response System",
    desc: "Easily manage incoming customer requests, check stock, and send quick quotes back.",
    features: [
      "Real-time request notifications",
      "Quick availability marking",
      "Custom price quoting",
      "Simple order preparation tracking"
    ]
  },
  {
    id: "delivery",
    label: "Delivery Partner App",
    icon: Bike,
    img: "/shots/Welzokart_interface-2.jpg",
    badge: "For Riders",
    title: "Optimized Dispatch & Routing",
    desc: "Connects riders to confirmed orders for fast and reliable local fulfillment.",
    features: [
      "Instant confirmed order alerts",
      "Turn-by-turn shop directions",
      "Customer location tracking",
      "Digital proof of delivery"
    ]
  },
  {
    id: "admin",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    img: "/shots/Welzokart_ui-2.jpg",
    badge: "Central Ops",
    title: "Complete Platform Governance",
    desc: "Monitor request volumes, shop response times, and delivery performance.",
    features: [
      "Live request and response monitoring",
      "Shop onboarding and verification",
      "Delivery zone management",
      "Financial settlement analytics"
    ]
  }
];

export function NeedlyInterface() {
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
              Purpose-Built Interfaces for Every Local Shopping Need
            </h2>
            <p className="lc-desc">
              From sending grocery requests to managing shop responses, Needly provides simple interfaces designed for both customers and shop owners.
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
