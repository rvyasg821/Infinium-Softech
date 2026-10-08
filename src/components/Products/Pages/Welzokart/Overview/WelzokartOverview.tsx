"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import "./WelzokartOverview.scss";

export function WelzokartOverview() {
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
          <div data-reveal="" className="overview-lc-images">
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
              <Image src="/shots/welzokart_overview.png" alt="Welzokart App Display" width={800} height={600} priority />
            </div>
          </div>

          {/* Right Content */}
          <div className="overview-lc-content">
            <span data-reveal="" className="lc-eyebrow">OVERVIEW</span>
            <h2 data-reveal="" id="overview-title" className="lc-headline">
              Overcoming barriers in building a scalable delivery app
            </h2>
            <p data-reveal="" className="lc-desc">
              WelzoKart is an on-demand grocery delivery platform enabling users to order essentials with ease, offering secure payments, real-time scheduling, and reliability. It ships as its own platform and inherits the shared Infinium layer for seamless scalability.
            </p>

            <div data-reveal="" className="lc-check-list">
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Easy Grocery Shopping</span>
              </div>
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Fast &amp; Reliable Delivery</span>
              </div>
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Real-Time Order Tracking</span>
              </div>
              <div className="check-item">
                <div className="check-icon">✓</div>
                <span>Secure Online Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
