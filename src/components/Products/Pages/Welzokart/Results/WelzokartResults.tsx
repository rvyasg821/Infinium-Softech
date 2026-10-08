"use client";
import React from "react";
import "./WelzokartResults.scss";

const RESULTS = [
  {
    title: "Faster Order Processing",
    desc: "Streamlined checkout and real-time order processing for quicker purchases."
  },
  {
    title: "Improved User Experience",
    desc: "Simple navigation, smart search, and organized product categories made shopping easier."
  },
  {
    title: "Reliable Delivery Operations",
    desc: "Real-time order assignment, tracking, and optimized routes improved delivery efficiency."
  },
  {
    title: "Flexible Subscription Management",
    desc: "Easy milk subscription scheduling, pausing, resuming, and quantity management."
  },
  {
    title: "Real-Time Visibility",
    desc: "Live order tracking and instant notifications improved transparency for customers and delivery partners."
  },
  {
    title: "Scalable & Reliable Platform",
    desc: "Built a flexible architecture capable of supporting growing users, orders, and future features."
  },
  {
    title: "Secure Payments",
    desc: "Multiple payment options enabled convenient and reliable transaction handling."
  },
  {
    title: "Higher Order Accuracy",
    desc: "Improved order handling and delivery coordination helped reduce errors and enhance customer satisfaction."
  }
];

export function WelzokartResults() {
  return (
    <section id="results" className="welzokart-results-lc">
      <div className="results-lc-container">
        <div className="results-lc-header">
          <span data-reveal="" className="lc-eyebrow">KEY RESULTS</span>
          <h2 data-reveal="" className="lc-headline">
            Delivering measurable value across the entire grocery ecosystem.
          </h2>
        </div>
        
        <div className="results-lc-grid">
          {RESULTS.map((item, idx) => (
            <div data-reveal="" key={idx} className="lc-result-card">
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
