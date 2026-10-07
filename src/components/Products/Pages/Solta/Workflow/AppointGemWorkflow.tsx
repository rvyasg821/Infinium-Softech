"use client";

import React from "react";
import { useAboutCarousel } from "@/components/About/useAboutCarousel";
import "./AppointGemWorkflow.scss";

interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    num: "01",
    title: "Customer picks a slot",
    desc: "Web widget or app shows only genuinely open times per practitioner.",
  },
  {
    num: "02",
    title: "Booking is confirmed",
    desc: "Deposit or full payment taken, reminders scheduled automatically.",
  },
  {
    num: "03",
    title: "Visit is served",
    desc: "Front desk checks the customer in, practitioner closes the appointment.",
  },
  {
    num: "04",
    title: "Invoice and follow-up",
    desc: "Invoice raised against the visit, next appointment offered.",
  },
];

const ACCOUNT_ROLES = [
  { mark: "FD", name: "Front desk" },
  { mark: "PR", name: "Practitioner" },
  { mark: "MG", name: "Branch manager" },
  { mark: "AC", name: "Accounts" },
];

function WorkflowCardView({
  step,
  isClone = false,
}: {
  step: WorkflowStep;
  isClone?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`workflow-step-card ${isClone ? "workflow-step-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <span className="step-num">{step.num}</span>
      <h3 className="step-title">{step.title}</h3>
      <p className="step-desc">{step.desc}</p>
    </div>
  );
}

export function AppointGemWorkflow() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(WORKFLOW_STEPS.length, 1024);

  return (
    <section id="workflow" className="appointgem-workflow-section" aria-labelledby="workflow-title">
      <div className="appointgem-workflow-container">
        <div className="workflow-header-grid">
          <div>
            <span data-reveal="" className="workflow-eyebrow">Workflow</span>
            <h2 data-reveal="" id="workflow-title" className="workflow-headline">
              How a booking <br className="mobile-title-break" />moves
            </h2>
          </div>
          <p data-reveal="" className="workflow-subtitle">
            Four states, four owners. Each hand-off writes to the same record, so the invoice and the follow-up carry the full history of the visit.
          </p>
        </div>

        <div className="workflow-steps-wrap">
          <div className="workflow-steps-track">
            <div className="workflow-steps-grid" ref={scrollRef}>
              {/* Clone of last card placed before first card for seamless reverse scroll */}
              <WorkflowCardView
                step={WORKFLOW_STEPS[WORKFLOW_STEPS.length - 1]}
                isClone={true}
              />

              {/* Real Steps */}
              {WORKFLOW_STEPS.map((step) => (
                <WorkflowCardView key={step.num} step={step} />
              ))}

              {/* Clone of first card placed right next to last card for seamless forward scroll */}
              <WorkflowCardView step={WORKFLOW_STEPS[0]} isClone={true} />
            </div>

            {/* Left Arrow Button */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous step"
              onClick={handlePrev}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next step"
              onClick={handleNext}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="carousel-dots" aria-label="Workflow steps navigation dots">
            {WORKFLOW_STEPS.map((step, idx) => (
              <button
                key={step.num}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to step ${idx + 1}`}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
        </div>

        <div data-reveal="" className="workflow-roles-bar">
          <span className="roles-label">Roles on the account</span>
          <div className="roles-pills">
            {ACCOUNT_ROLES.map((role) => (
              <span key={role.mark} className="role-pill">
                <span className="role-mark">{role.mark}</span>
                <span className="role-name">{role.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}