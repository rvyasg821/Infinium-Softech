"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import "./WelzokartChallenges.scss";

const CHALLENGES = [
  {
    title: "Finding Products Quickly",
    desc: "Customers need a simple way to discover groceries without navigating through complicated shopping flows.",
    bgColor: "#a0dbd6"
  },
  {
    title: "Managing Large Variety",
    desc: "Fresh products and household essentials need clear categorization for easy browsing.",
    bgColor: "#969fdb"
  },
  {
    title: "Checkout Friction",
    desc: "The ordering journey must remain simple and efficient for immediate purchases.",
    bgColor: "#e5fdac"
  },
  {
    title: "Service Reliability",
    desc: "Ensuring accurate packaging and timely delivery to maintain customer trust.",
    bgColor: "#bbc3f7"
  },
  {
    title: "Cleaner Verification",
    desc: "Delivery partner backgrounds need strict vetting to guarantee user safety.",
    bgColor: "#ebc1bc"
  },
  {
    title: "Scalable Infrastructure",
    desc: "Building a system capable of handling growing demand and unexpected surges.",
    bgColor: "#a0dbd6"
  },
];

export function WelzokartChallenges() {
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
            Overcoming hurdles to build a secure, scalable, and reliable platform.
          </h2>
          <p className="lc-desc">
            Developing WelzoKart demanded addressing performance, real-time inventory, and scalability while maintaining smooth user experiences across all devices.
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
              <Image src="/shots/Welzokart_KC-1.png" alt="Welzokart Challenges Part 1" width={600} height={400} />
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
              <Image src="/shots/Welzokart_KC-2.jpg" alt="Welzokart Challenges Part 2" width={600} height={400} />
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