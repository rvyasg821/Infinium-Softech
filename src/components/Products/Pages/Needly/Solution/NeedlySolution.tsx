"use client";

import React from "react";
import "./NeedlySolution.scss";

export function NeedlySolution() {
  return (
    <section id="solution" className="needly-solution-section">
      <div className="needly-solution-container">
        
        <div className="solution-header">
          <span className="section-eyebrow" data-reveal="">Our solution</span>
          <h2 className="solution-headline">
            Smart, fast, and transparent tools for local request matching.
          </h2>
          <p className="solution-desc">
            Needly's custom solutions ensure smooth list creation, rapid shop replies, secure confirmations, and effortless local coordination.
          </p>
        </div>

        <div className="solution-bento-grid">
          <div className="bento-card span-2 bg-orange-gradient dark-text">
            <h3>Quick Request Builder</h3>
            <p>Our simple list maker lets customers effortlessly draft and send grocery requests to nearby shops.</p>
          </div>
          <div className="bento-card">
            <h3>Shop Verification</h3>
            <p>A rigorous vetting system ensures shoppers connect only with legitimate, trusted local grocery stores.</p>
          </div>
          <div className="bento-card">
            <h3>Transparent Confirmation</h3>
            <p>Users review exact quotes directly from shop owners before securely confirming. No hidden fees.</p>
          </div>
          <div className="bento-card span-2 bg-solid-green white-text">
            <h3>Any-Device Sync</h3>
            <p>The request-and-response loop works seamlessly across both mobile apps and web browsers for everyone.</p>
          </div>
          <div className="bento-card span-1-5">
            <h3>Live Notification Cloud</h3>
            <p>A specialized architecture manages real-time pings reliably between customers and busy shops.</p>
          </div>
          <div className="bento-card span-1-5">
            <h3>Platform Insights</h3>
            <p>Integrated dashboards help admins track request volumes, shop reply rates, and successful drop-offs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}