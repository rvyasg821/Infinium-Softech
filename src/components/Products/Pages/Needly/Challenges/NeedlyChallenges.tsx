"use client";

import React from "react";
import "./NeedlyChallenges.scss";

const CHALLENGES = [
  {
    title: "Fast shop responses",
    desc: "Shops must reply quickly to prevent customer drop-offs."
  },
  {
    title: "Accurate pricing quotes",
    desc: "Ensuring local owners provide transparent and fair prices for requested items."
  },
  {
    title: "Real-time stock handling",
    desc: "Managing fluctuating store inventory without disappointing nearby shoppers."
  },
  {
    title: "Simple list creation",
    desc: "Customers need a frictionless way to draft and send grocery requirements."
  },
  {
    title: "Busy owner management",
    desc: "Organizing incoming requests efficiently so shop owners can easily respond."
  },
  {
    title: "Reliable last-mile delivery",
    desc: "Executing confirmed orders quickly and tracking handoffs effectively."
  }
];

export function NeedlyChallenges() {
  return (
    <section id="challenges" className="needly-challenges-section">
      <div className="needly-challenges-container">
        <div className="challenges-left-col">
          <div className="challenges-header">
            <span className="section-eyebrow" data-reveal="">Key challenges</span>
            <h2 className="challenges-headline">
              Why Local Grocery Needs More
            </h2>
            <p className="challenges-desc">
              Developing Needly meant addressing fast response times, accurate price quoting, and simple list creation for both customers and shop owners.
            </p>
            <div className="challenges-image-wrap">
              <img src="/shots/Needly.png" alt="Needly Infrastructure Challenges" className="challenges-image" />
            </div>
          </div>
        </div>

        <div className="challenges-right-col">
          <div className="challenges-grid">
            {CHALLENGES.map((item, idx) => (
              <div key={idx} className="challenge-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}