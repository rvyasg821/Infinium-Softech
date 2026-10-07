"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Search, ShoppingBag, CreditCard, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import "./NeedlyWorkflow.scss";

const WORKFLOW_STEPS = [
  {
    step: "01",
    id: "request",
    title: "1. Request Grocery List",
    shortTitle: "Request",
    icon: Search,
    headline: "Create and Send Your List to Local Shops",
    desc: "Customers open the app, specify the groceries they need, and send the request to nearby participating shops instantly.",
    img: "/shots/Welzokart_workflow-1.jpg",
    actionNote: "Quick List Builder & Local Shop Radius Matching"
  },
  {
    step: "02",
    id: "response",
    title: "2. Shop Owner Replies",
    shortTitle: "Response",
    icon: ShoppingBag,
    headline: "Shops Check Availability and Quote Prices",
    desc: "The shop owner receives the list, confirms what is currently in stock, and sends back a precise price quote.",
    img: "/shots/Welzokart_workflow-2.jpg",
    actionNote: "Real-Time Stock Checking & Transparent Quoting"
  },
  {
    step: "03",
    id: "confirm",
    title: "3. Review & Confirm",
    shortTitle: "Confirm",
    icon: CreditCard,
    headline: "Customer Approves the Quote Securely",
    desc: "The customer reviews the available items and total cost, then securely confirms and pays for the order.",
    img: "/shots/Welzokart_workflow-3.jpg",
    actionNote: "No Surprises: See Exact Prices Before Paying"
  },
  {
    step: "04",
    id: "deliver",
    title: "4. Fast Local Delivery",
    shortTitle: "Deliver",
    icon: MapPin,
    headline: "Order Preparation and Doorstep Handoff",
    desc: "The shop prepares the confirmed items immediately, and a local rider delivers the fresh groceries to the customer's door.",
    img: "/shots/Welzokart_workflow-4.jpg",
    actionNote: "Live GPS Tracking and Secure OTP Handoff"
  }
];

export function NeedlyWorkflow() {
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
        <div className="workflow-lc-header">
          <span className="lc-eyebrow">INTERACTIVE WALKTHROUGH</span>
          <h2 id="workflow-title" className="lc-headline">
            "Try It" Stepper: How Needly Works
          </h2>
          <p className="lc-desc">
            Click through the 4-step stepper below to see how seamlessly requests move from the customer to the local shop and back.
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
