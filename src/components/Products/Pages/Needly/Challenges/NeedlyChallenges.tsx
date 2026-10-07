"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import "./NeedlyChallenges.scss";

const CHALLENGES = [
  {
    title: "Fast Shop Responses",
    desc: "Shops must review requests and reply quickly to prevent customer drop-offs.",
    bgColor: "#a0dbd6"
  },
  {
    title: "Accurate Pricing Quotes",
    desc: "Ensuring local owners provide transparent and fair prices for requested items.",
    bgColor: "#969fdb"
  },
  {
    title: "Real-Time Stock Handling",
    desc: "Managing fluctuating store inventory without disappointing nearby shoppers.",
    bgColor: "#e5fdac"
  },
  {
    title: "Simple List Creation",
    desc: "Customers need a frictionless way to draft and send grocery requirements.",
    bgColor: "#bbc3f7"
  },
  {
    title: "Busy Owner Management",
    desc: "Organizing incoming requests efficiently so shop owners can easily respond.",
    bgColor: "#ebc1bc"
  },
  {
    title: "Reliable Local Delivery",
    desc: "Executing confirmed orders quickly and tracking handoffs effectively.",
    bgColor: "#a0dbd6"
  },
];

export function NeedlyChallenges() {
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const handleMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref1.current) return;
    const rect = ref1.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt1({ x: (y / rect.height) * -12, y: (x / rect.width) * 12 });
  };

  const handleMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref2.current) return;
    const rect = ref2.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt2({ x: (y / rect.height) * -12, y: (x / rect.width) * 12 });
  };

  return (
    <section id="challenges" className="welzokart-challenges-lc">
      <div className="challenges-lc-container">

        <div className="challenges-lc-header">
          <span className="lc-eyebrow">KEY CHALLENGES</span>
          <h2 className="lc-headline">
            Overcoming hurdles in request-based local shopping.
          </h2>
          <p className="lc-desc">
            Developing Needly meant addressing fast response times, accurate price quoting, and simple list creation for both customers and shop owners.
          </p>
        </div>

        <div className="challenges-lc-layout-parts">
          {/* First part */}
          <div className="challenge-part">
            <div className="challenge-group">
              {CHALLENGES.slice(0, 3).map((item, idx) => (
                <div key={idx} className="lc-challenge-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <div
              ref={ref1}
              className="challenge-image 3d-tilt-frame"
              onMouseMove={handleMove1}
              onMouseLeave={() => setTilt1({ x: 0, y: 0 })}
              style={{
                transform: `perspective(1000px) rotateX(${tilt1.x}deg) rotateY(${tilt1.y}deg)`,
                transition: tilt1.x === 0 && tilt1.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out"
              }}
            >
              <Image src="/shots/Welzokart_KC-1.png" alt="Needly Challenges Part 1" width={600} height={400} />
            </div>
          </div>

          {/* Second part */}
          <div className="challenge-part">
            <div
              ref={ref2}
              className="challenge-image 3d-tilt-frame"
              onMouseMove={handleMove2}
              onMouseLeave={() => setTilt2({ x: 0, y: 0 })}
              style={{
                transform: `perspective(1000px) rotateX(${tilt2.x}deg) rotateY(${tilt2.y}deg)`,
                transition: tilt2.x === 0 && tilt2.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out"
              }}
            >
              <Image src="/shots/Welzokart_KC-2.jpg" alt="Needly Challenges Part 2" width={600} height={400} />
            </div>

            <div className="challenge-group">
              {CHALLENGES.slice(3, 6).map((item, idx) => (
                <div key={idx} className="lc-challenge-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}