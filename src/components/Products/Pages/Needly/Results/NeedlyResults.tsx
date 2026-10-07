"use client";
import React from "react";
import "./NeedlyResults.scss";

const RESULTS = [
  {
    title: "Faster Request Matching",
    desc: "Customers get connected to available local shops in seconds for quick order processing."
  },
  {
    title: "Simple List Building",
    desc: "Easy text or voice list creation eliminated the friction of manually browsing large catalogs."
  },
  {
    title: "Local Shop Connectivity",
    desc: "Bridged the gap between neighborhood shops and digital customers seamlessly."
  },
  {
    title: "Transparent Price Quoting",
    desc: "Eliminated hidden fees by letting users review exact shop quotes before paying."
  },
  {
    title: "Instant Availability Checks",
    desc: "Reduced cancellations by verifying stock with the shop owner before order confirmation."
  },
  {
    title: "Dedicated Shop Ecosystem",
    desc: "Platform designed to help small grocery owners manage digital requests effortlessly."
  },
  {
    title: "Secure Order Confirmations",
    desc: "Simple, highly secure payment flows implemented right after the customer approves the quote."
  },
  {
    title: "Minimized Stock Errors",
    desc: "Direct communication between customer and owner severely reduced missing item complaints."
  }
];

export function NeedlyResults() {
  return (
    <section id="results" className="welzokart-results-lc">
      <div className="results-lc-container">
        <div className="results-lc-header">
          <span className="lc-eyebrow">KEY RESULTS</span>
          <h2 className="lc-headline">
            Delivering real value by connecting customers with local shop owners.
          </h2>
        </div>

        <div className="results-lc-grid">
          {RESULTS.map((item, idx) => (
            <div key={idx} className="lc-result-card">
              <div className="card-check"></div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
