"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import "./NeedlyOverview.scss";

export function NeedlyOverview() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
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
    <section id="overview" className="welzokart-overview-lc" aria-labelledby="overview-title">
      <div className="overview-lc-container">

        <div className="overview-lc-grid">
          {/* Left Image */}
          <div className="overview-lc-images">
            <div
              ref={frameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="img-frame img-main 3d-tilt-frame"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out"
              }}
            >
              <Image src="/shots/welzokart_overview.png" alt="Needly App Display" width={800} height={600} priority />
            </div>
          </div>

          {/* Right Content */}
          <div className="overview-lc-content">
            <span className="lc-eyebrow">OVERVIEW</span>
            <h2 id="overview-title" className="lc-headline">
              Connecting customers with nearby shops for smarter grocery ordering.
            </h2>
            <p className="lc-desc">
              Needly creates a direct connection between customers and local grocery shops. Customers can send their grocery requirements to nearby shops, while shop owners can check availability, provide prices, and respond before the order is confirmed.
            </p>

            <div className="lc-check-list">
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Customers send grocery requests</span>
              </div>
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Nearby shop owners receive requests </span>
              </div>
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Shops respond with available items and prices</span>
              </div>
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Customers review and confirm the order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
