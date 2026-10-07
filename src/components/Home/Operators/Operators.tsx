"use client";

import { CLIENTS_ROW_A, OperatorClient } from "@/data/operatorsData";
import "./Operators.scss";

export function Operators() {
  return (
    <section
      id="operators"
      className="operators-section content-padding"
      aria-label="Trusted by operators"
    >
      <div className="operators-container">
        {/* Section Header */}
        <div className="operators-header">
          <div className="operators-title-wrap">
            <span data-reveal="" className="operators-eyebrow">
              Industry Solutions
            </span>
            <h2 data-reveal="" className="operators-headline">
              Technology for
              <br />
              Every Industry
            </h2>
          </div>

          <p data-reveal="" className="operators-intro">
            Flexible, scalable solutions designed to simplify operations,
            improve efficiency, and solve real-world challenges across diverse
            industries.
          </p>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="operators-marquee-container">
        <div className="marquee-row-wrapper">
          <div className="marquee-track marquee-left">
            {[0, 1, 2, 3].map((copyIdx) => (
              <div
                key={copyIdx}
                className="marquee-group"
                aria-hidden={copyIdx > 0 ? "true" : undefined}
              >
                {CLIENTS_ROW_A.map((client: OperatorClient, idx: number) => (
                  <div key={idx} className="operator-pill">
                    <span
                      className="operator-dot"
                      style={{ backgroundColor: client.tint }}
                      aria-hidden="true"
                    />
                    <span className="operator-name">{client.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}