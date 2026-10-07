"use client";

import React from "react";
import "./NeedlyResults.scss";

import { Zap, ListPlus, Store, Tag, CheckCircle2, ShieldCheck, Box, ArrowRightLeft, Users, Truck } from "lucide-react";

const RESULTS = [
  { icon: Zap, color: "orange", title: "Faster request matching", desc: "Customers get connected to available local shops in seconds." },
  { icon: ListPlus, color: "green", title: "Simple list building", desc: "Easy text or voice list creation eliminated the friction." },
  { icon: Store, color: "orange", title: "Local shop connectivity", desc: "Bridged the digital gap for neighborhood shops seamlessly." },
  { icon: Tag, color: "green", title: "Transparent price quoting", desc: "Users review exact shop quotes before committing." },
  { icon: CheckCircle2, color: "green", title: "Instant availability checks", desc: "Reduced cancellations by verifying stock beforehand." },
  { icon: ShieldCheck, color: "orange", title: "Secure confirmations", desc: "Simple, highly secure payment flows implemented." },
  { icon: Box, color: "orange", title: "Minimized stock errors", desc: "Direct customer and owner chat severely reduced issues." },
  { icon: ArrowRightLeft, color: "green", title: "Smart order management", desc: "Streamlined order processing helps customers place and track grocery orders with ease, reducing delays and improving the overall shopping experience." },
  { icon: Users, color: "orange", title: "Dedicated shop ecosystem", desc: "Platform designed explicitly for small grocery owners." },
  { icon: Truck, color: "green", title: "Reliable delivery coordination", desc: "Better communication between customers and local shops ensures smooth and timely deliveries." }
];

export function NeedlyResults() {
  return (
    <section id="results" className="needly-results-section">
      <div className="needly-results-container">

        <div className="results-header">
          <span className="section-eyebrow" data-reveal="">Key results</span>
          <h2 className="results-headline">
            Real value from connecting customers with local shop owners.
          </h2>
        </div>

        <div className="results-grid">
          {RESULTS.map((item, idx) => {
            const isCenterSpot = idx === 4;
            return (
              <React.Fragment key={idx}>
                {isCenterSpot && (
                  <div className="center-results-image">
                    <img src="/shots/Needly.png" alt="Needly Mobile Interfaces" />
                  </div>
                )}
                <div className={`result-item color-${item.color}`}>
                  <div className="result-item-header">
                    <div className="icon-wrapper">
                      <item.icon size={22} strokeWidth={2.5} />
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
