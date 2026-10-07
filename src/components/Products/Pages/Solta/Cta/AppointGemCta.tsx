import React from "react";
import Link from "next/link";
import { ABOUT_ENGAGEMENTS } from "@/data/aboutData";
import "./AppointGemCta.scss";

export function AppointGemCta() {
  return (
    <section className="appointgem-cta-section" aria-labelledby="cta-title">
      <div className="appointgem-cta-container">
        <div data-reveal="" className="consultation-card">
          <div className="consultation-glow" aria-hidden="true" />

          <div className="consultation-content-wrap">
            <div className="consultation-info">
              <span className="consultation-badge">Book consultation</span>

              <h2 id="cta-title" className="consultation-title">
                See Slota <br className="mobile-title-break" />
                against your own calendar
              </h2>

              <p className="consultation-desc">
                Bring one week of real bookings. An implementation lead maps it
                into the product live and shows you where the gaps are.
              </p>

              <div className="consultation-actions">
                <Link href="/book-a-demo" className="btn-primary-consult">
                  Book Live Demo{" "}
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>

                <Link href="/contact" className="btn-secondary-consult">
                  Talk to sales
                </Link>
              </div>
            </div>

            {/* Right Side Engagement List */}
            <div className="consultation-right">
              {ABOUT_ENGAGEMENTS.map((engagement, idx) => (
                <div key={idx} className="engagement-item">
                  <span
                    className="engagement-dot"
                    style={{ backgroundColor: engagement.tint }}
                    aria-hidden="true"
                  />
                  <div className="engagement-content">
                    <span className="engagement-title">{engagement.title}</span>
                    <span className="engagement-fit">{engagement.fit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Animated Wave Band */}
            <div className="consultation-wave-wrap" aria-hidden="true">
              <div className="wave-inner">
                <svg
                  viewBox="0 0 800 420"
                  preserveAspectRatio="xMidYMid slice"
                  className="wave-svg"
                >
                  <defs>
                    <linearGradient id="ctaBand" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                      <stop
                        offset="34%"
                        stopColor="#4B5CF5"
                        stopOpacity="0.85"
                      />
                      <stop offset="62%" stopColor="#8B3FE8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1F31E8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="ctaBandSoft"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                      <stop
                        offset="46%"
                        stopColor="#6E7BFF"
                        stopOpacity="0.4"
                      />
                      <stop offset="100%" stopColor="#8B3FE8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#ctaBandSoft)" strokeWidth="1">
                    <path d="M-40 296 C 150 246 250 176 420 158 C 560 143 660 176 840 138" />
                    <path d="M-40 308 C 150 258 250 188 420 170 C 560 155 660 188 840 150" />
                    <path d="M-40 320 C 150 270 250 200 420 182 C 560 167 660 200 840 162" />
                    <path d="M-40 332 C 150 282 250 212 420 194 C 560 179 660 212 840 174" />
                    <path d="M-40 344 C 150 294 250 224 420 206 C 560 191 660 224 840 186" />
                    <path d="M-40 356 C 150 306 250 236 420 218 C 560 203 660 236 840 198" />
                  </g>
                  <g fill="none" stroke="url(#ctaBand)" strokeWidth="1.4">
                    <path d="M-40 268 C 160 214 260 150 430 132 C 570 117 670 152 840 112" />
                    <path d="M-40 282 C 160 228 260 164 430 146 C 570 131 670 166 840 126" />
                    <path d="M-40 368 C 150 318 250 248 420 230 C 560 215 660 248 840 210" />
                  </g>
                  <g fill="none" stroke="url(#ctaBandSoft)" strokeWidth="1">
                    <path d="M-40 208 C 170 158 280 104 450 96 C 590 90 690 118 840 84" />
                    <path d="M-40 226 C 170 176 280 122 450 114 C 590 108 690 136 840 102" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
