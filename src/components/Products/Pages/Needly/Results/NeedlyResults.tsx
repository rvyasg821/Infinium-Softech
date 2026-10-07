"use client";

import React from "react";
import "./NeedlyResults.scss";

const RESULTS = [
  { color: "orange", title: "Faster request matching", desc: "Customers get connected to available local shops in seconds." },
  { color: "green", title: "Simple list building", desc: "Easy text or voice list creation eliminated the friction." },
  { color: "orange", title: "Local shop connectivity", desc: "Bridged the digital gap for neighborhood shops seamlessly." },
  { color: "green", title: "Transparent price quoting", desc: "Users review exact shop quotes before committing." },
  { color: "orange", title: "Instant availability checks", desc: "Reduced cancellations by verifying stock beforehand." },
  { color: "orange", title: "Secure confirmations", desc: "Simple, highly secure payment flows implemented." },
  { color: "green", title: "Minimized stock errors", desc: "Direct customer and owner chat severely reduced issues." },
  { color: "orange", title: "Smart order management", desc: "Streamlined order processing helps customers place and track grocery orders with ease, reducing delays and improving the overall shopping experience." },
  { color: "green", title: "Dedicated shop ecosystem", desc: "Platform designed explicitly for small grocery owners." },
  { color: "green", title: "Reliable delivery coordination", desc: "Better communication between customers and local shops ensures smooth and timely deliveries." }
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
                  <h3>{item.title}</h3>
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
