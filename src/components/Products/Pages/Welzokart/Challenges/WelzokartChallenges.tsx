"use client";
import React from "react";
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
  return (
    <section id="challenges-lc" className="welzokart-challenges-lc">
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
                <div key={idx} className="lc-challenge-card" style={{ backgroundColor: item.bgColor }}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="challenge-image">
               <Image src="/shots/Welzokart 2.jpg" alt="Welzokart Challenges Part 1" width={600} height={400} />
            </div>
          </div>

          {/* Second part */}
          <div className="challenge-part">
            <div className="challenge-image">
               <Image src="/shots/Welzokart 2.jpg" alt="Welzokart Challenges Part 2" width={600} height={400} />
            </div>
            <div className="challenge-group">
              {CHALLENGES.slice(3, 6).map((item, idx) => (
                <div key={idx} className="lc-challenge-card" style={{ backgroundColor: item.bgColor }}>
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