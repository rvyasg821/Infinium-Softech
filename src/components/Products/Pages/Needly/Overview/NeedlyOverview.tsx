"use client";

import React from "react";
import Image from "next/image";
import "./NeedlyOverview.scss";

export function NeedlyOverview() {
  return (
    <section id="overview" className="needly-overview-section">
      <div className="needly-overview-container">

        <div className="overview-left-col">
          <span className="section-eyebrow" data-reveal="">Overview</span>
          <h2 className="overview-headline">
            Connecting customers with nearby shops for smarter grocery ordering.
          </h2>
          <p className="overview-desc">
            Needly creates a direct connection between customers and local grocery shops. Customers send their grocery requirements to nearby shops, while shop owners check availability, provide prices, and respond before the order is confirmed.
          </p>

          <div className="overview-meta-list">
            <div className="meta-item">
              <span className="meta-label">Client Name</span>
              <span className="meta-value">Needly</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Country</span>
              <span className="meta-value">India</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Platform</span>
              <span className="meta-value">Application</span>
            </div>
          </div>
        </div>

        <div className="overview-right-col">
          <div className="needly-overview-image-wrapper">
            <Image
              src="/shots/Needly.png"
              alt="Needly Overview"
              width={800}
              height={600}
              className="overview-3d-image"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
