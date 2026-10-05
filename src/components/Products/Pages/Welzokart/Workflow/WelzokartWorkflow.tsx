"use client";

import React from "react";
import { User, ShieldCheck, Truck, Settings } from "lucide-react";
import "./WelzokartWorkflow.scss";

const ACCOUNT_ROLES = [
  { icon: <User size={16} />, name: "Customer" },
  { icon: <ShieldCheck size={16} />, name: "Admin" },
  { icon: <Truck size={16} />, name: "Delivery Partner" },
  { icon: <Settings size={16} />, name: "Operations" },
];

export function WelzokartWorkflow() {
  return (
    <section id="workflow" className="welzokart-workflow-section" aria-labelledby="workflow-title">
      <div className="welzokart-workflow-container">
        <div className="workflow-lc-grid">

          {/* Left Column */}
          <div className="workflow-lc-left">
            <span className="lc-eyebrow">OUR APPROACH</span>
            <h2 id="workflow-title" className="lc-headline">
              A Structured, Insightful Process
            </h2>
            <p className="lc-desc">
              WelzoKart connects customers, orders, subscriptions, and delivery partners through a simple end-to-end workflow focused on a clean, intuitive user journey and visually consistent UI elements.
            </p>

            <div className="lc-roles-bar">
              <span className="roles-label">Roles on the account</span>
              <div className="roles-pills">
                {ACCOUNT_ROLES.map((role) => (
                  <span key={role.name} className="role-pill">
                    <span className="role-mark">{role.icon}</span>
                    <span className="role-name">{role.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Explicit 3x3 Flow Grid */}
          <div className="workflow-lc-right">
            <div className="lc-workflow-flow-grid">

              {/* ── Row 1 ── */}
              <div className="lc-workflow-card">
                <span className="lc-step-num">01</span>
                <h3 className="lc-step-title">Customer Explores Products</h3>
                <p className="lc-step-desc">Users browse grocery categories, search for products, and select the items they need.</p>
              </div>

              <div className="lc-flow-arrow lc-flow-arrow--h">→</div>

              <div className="lc-workflow-card">
                <span className="lc-step-num">02</span>
                <h3 className="lc-step-title">Order Is Placed</h3>
                <p className="lc-step-desc">Selected products are added to the cart and the customer completes the checkout process.</p>
              </div>

              {/* ── Arrow Row ── */}
              <div className="lc-flow-spacer" />
              <div className="lc-flow-spacer" />
              <div className="lc-flow-arrow lc-flow-arrow--v">↓</div>

              {/* ── Row 2 ── */}
              <div className="lc-workflow-card">
                <span className="lc-step-num">04</span>
                <h3 className="lc-step-title">Order Is Delivered</h3>
                <p className="lc-step-desc">The delivery partner navigates to the customer while real-time updates keep the customer informed until delivery is completed.</p>
              </div>

              <div className="lc-flow-arrow lc-flow-arrow--h lc-flow-arrow--left">←</div>

              <div className="lc-workflow-card">
                <span className="lc-step-num">03</span>
                <h3 className="lc-step-title">Order Is Assigned</h3>
                <p className="lc-step-desc">The order is processed and assigned to an appropriate delivery partner for fulfillment.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
