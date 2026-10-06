import React from "react";
import Image from "next/image";
import "./WelzokartOverview.scss";

export function WelzokartOverview() {
  return (
    <section id="overview" className="welzokart-overview-lc" aria-labelledby="overview-title">
      <div className="overview-lc-container">

        <div className="overview-lc-grid">
          {/* Left Images */}
          <div className="overview-lc-images">
            <div className="img-frame img-main">
              <Image src="/shots/welzokart.jpg" alt="Welzokart App Display" width={500} height={400} />
            </div>
            <div className="img-frame img-sub">
              <Image src="/shots/Welzokart_ui-1.jpg" alt="Welzokart Ui" width={300} height={250} />
            </div>
          </div>

          {/* Right Content */}
          <div className="overview-lc-content">
            <span className="lc-eyebrow">OVERVIEW</span>
            <h2 id="overview-title" className="lc-headline">
              Overcoming barriers in building a scalable delivery app
            </h2>
            <p className="lc-desc">
              WelzoKart is an on-demand grocery delivery platform enabling users to order essentials with ease, offering secure payments, real-time scheduling, and reliability. It ships as its own platform and inherits the shared Infinium layer for seamless scalability.
            </p>

            <div className="lc-check-list">
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
