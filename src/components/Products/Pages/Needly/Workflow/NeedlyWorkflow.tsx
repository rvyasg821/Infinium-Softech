"use client";

import React, { useEffect, useRef } from "react";
import "./NeedlyWorkflow.scss";

const STEPS = [
  {
    key: "Request",
    title: "Customer builds the list",
    desc: "Type or speak the groceries you need; Needly sends it to verified shops nearby.",
  },
  {
    key: "Response",
    title: "Shops reply with items and prices",
    desc: "Local owners receive the list, confirm what is in stock, and send back precise quotes.",
  },
  {
    key: "Confirm",
    title: "Compare quotes and confirm",
    desc: "Review the responses, select the best quote, and lock in the exact total before payment.",
  },
  {
    key: "Deliver",
    title: "Order preparation and doorstep handoff",
    desc: "The shop packs your order immediately, and it gets delivered with live GPS tracking and secure OTP handoff.",
  }
];

export function NeedlyWorkflow() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Stop the page-level smooth scroller from hijacking the wheel
    const stopWheel = (e: Event) => e.stopPropagation();

    el.addEventListener("wheel", stopWheel, { passive: true });
    el.addEventListener("touchmove", stopWheel, { passive: true });

    return () => {
      el.removeEventListener("wheel", stopWheel);
      el.removeEventListener("touchmove", stopWheel);
    };
  }, []);

  return (
    <section id="workflow" className="needly-workflow-section">
      <div className="needly-workflow-container">
        <div className="workflow-grid">
          <div className="workflow-left-col">
            <div className="workflow-header-sticky">
              <span className="section-eyebrow" data-reveal="">Workflow</span>
              <h2 data-reveal="" className="workflow-headline">A Structured, Direct Process</h2>
              <p data-reveal="" className="workflow-desc">
                We've designed a clear, user-centered approach focused on empowering direct communication between customers and shop owners. By combining fast quote generation and an intuitive interface, we ensure every grocery order is handled efficiently and transparently.
              </p>
            </div>
          </div>

          <div className="workflow-right-col">
            <div
              className="workflow-timeline-card"
              ref={cardRef}
              data-lenis-prevent
              tabIndex={0}
            >
              <div className="vertical-timeline-line"></div>
              <div className="timeline-items">
                {STEPS.map((step, idx) => (
                  <div data-reveal="" className="timeline-item" key={idx}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}