"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "./NeedlyInterface.scss";

const IMAGES = Array.from({ length: 12 }, (_, i) => `/shots/Needly/Needly_ui-${i + 1}.png`);

export function NeedlyInterface() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<boolean>(false);

  useEffect(() => {
    let animationFrameId: number;

    const scrollStep = () => {
      const track = trackRef.current;
      if (track && !hoverRef.current) {
        track.scrollLeft += 0.8;

        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="interface" className="needly-interface-section">
      <div className="needly-interface-container">

        <div className="interface-header">
          <span className="section-eyebrow" data-reveal="">Interface</span>
          <h2 className="interface-headline">
            Purpose-built interfaces for every user.
          </h2>
          <p className="interface-desc">
            From sending grocery requests to managing shop responses, Needly provides simple interfaces designed for both customers and shop owners.
          </p>
        </div>

        <div className="interface-carousel-wrapper"
          onMouseEnter={() => hoverRef.current = true}
          onMouseLeave={() => hoverRef.current = false}
        >
          <div className="interface-marquee-viewport" ref={trackRef}>
            <div className="interface-marquee-track">
              {[...IMAGES, ...IMAGES].map((src, idx) => (
                <div key={idx} className="interface-image-card">
                  <Image
                    src={src}
                    alt={`Needly Interface ${idx + 1}`}
                    width={300}
                    height={650}
                    className="grid-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}