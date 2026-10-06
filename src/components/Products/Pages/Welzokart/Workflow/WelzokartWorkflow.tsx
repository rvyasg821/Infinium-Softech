"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Search, ShoppingBag, CreditCard, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import "./WelzokartWorkflow.scss";

const WORKFLOW_STEPS = [
  {
    step: "01",
    id: "browse",
    title: "1. Browse Groceries",
    shortTitle: "Browse",
    icon: Search,
    headline: "Explore 5,000+ Fresh Items & AI Recommendations",
    desc: "Customers open the app, search fresh produce, daily dairy, or household essentials with instant smart search and category filters.",
    img: "/shots/Welzokart 2.jpg",
    actionNote: "Smart Auto-Suggest & Filter by Dietary Preferences"
  },
  {
    step: "02",
    id: "cart",
    title: "2. Smart Cart & Discounts",
    shortTitle: "Cart",
    icon: ShoppingBag,
    headline: "Add Items, Apply Coupons & Select Delivery Window",
    desc: "Review selected items, apply promo codes, choose scheduled or 15-minute express delivery slots, and split payments if needed.",
    img: "/shots/Welzokart_ui-1.jpg",
    actionNote: "Automated Best-Coupon Match & Instant Discounts"
  },
  {
    step: "03",
    id: "order",
    title: "3. Instant Secure Order",
    shortTitle: "Order",
    icon: CreditCard,
    headline: "Instant Dispatch & Dark-Store Packing",
    desc: "Order is confirmed and instantly transmitted to the nearest fulfillment hub or merchant store. Staff picks and packs items in under 3 minutes.",
    img: "/shots/Welzokart_ui-3.jpg",
    actionNote: "100% Encrypted Payment with Instant Merchant Sound Alert"
  },
  {
    step: "04",
    id: "track",
    title: "4. Live GPS Delivery",
    shortTitle: "Track",
    icon: MapPin,
    headline: "Real-time Rider Tracking & Doorstep Handover",
    desc: "Rider picks up the order and navigates via turn-by-turn GPS. Customer receives live map updates, rider contact, and OTP handover.",
    img: "/shots/Welzokart_ui-2.jpg",
    actionNote: "Live GPS Map Tracking with Contactless OTP Confirmation"
  }
];

export function WelzokartWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = WORKFLOW_STEPS[activeStep];

  // 3D Mouse Tilt Parallax Effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -12,
      y: (x / rect.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="workflow" className="welzokart-workflow-section" aria-labelledby="workflow-title">
      <div className="welzokart-workflow-container">
        
        {/* Header */}
        <div className="workflow-section-header">
          <span className="lc-eyebrow">INTERACTIVE WALKTHROUGH</span>
          <h2 id="workflow-title" className="lc-headline">
            "Try It" Stepper: How WelzoKart Works
          </h2>
          <p className="lc-desc">
            Click through the 4-step ordering stepper below to experience how seamlessly orders move from initial item discovery to live doorstep delivery.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="stepper-nav-bar" role="tablist">
          {WORKFLOW_STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveStep(idx)}
                className={`stepper-nav-item ${isActive ? "is-active" : ""} ${isCompleted ? "is-completed" : ""}`}
              >
                <div className="step-num-circle">
                  {isCompleted ? <CheckCircle2 size={16} /> : <span>{s.step}</span>}
                </div>
                <div className="step-label-wrap">
                  <Icon size={16} className="step-icon" />
                  <span className="step-title-text">{s.shortTitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stepper Interactive Display Card */}
        <div className="stepper-interactive-card">
          <div className="stepper-details-col">
            <span className="step-badge">Step {currentStep.step} of 04</span>
            <h3 className="stepper-headline">{currentStep.headline}</h3>
            <p className="stepper-desc">{currentStep.desc}</p>

            <div className="stepper-note-box">
              <CheckCircle2 size={18} className="note-check-icon" />
              <span>{currentStep.actionNote}</span>
            </div>

            <div className="stepper-controls">
              <button
                type="button"
                className="btn-step-prev"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                ← Previous Step
              </button>

              <button
                type="button"
                className="btn-step-next"
                disabled={activeStep === WORKFLOW_STEPS.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1))}
              >
                <span>Next Step</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="stepper-visual-col">
            <div
              ref={frameRef}
              className="visual-frame 3d-tilt-frame"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out"
              }}
            >
              <Image
                key={currentStep.id}
                src={currentStep.img}
                alt={currentStep.headline}
                width={650}
                height={500}
                className="visual-step-img"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
