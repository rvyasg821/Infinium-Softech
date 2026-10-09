import Link from "next/link";
import type { WebApplicationsPageContent } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsConsultation.scss";

const defaultContent: WebApplicationsPageContent["consultation"] = {
  titleStart: "Tell us the workflow.",
  titleEnd: "We’ll shape the AI.",
  description: "A 30-minute session with our team to map your use case, data, and product goals.",
  paths: [
    { title: "AI strategy", fit: "Prioritise a workflow and define measurable outcomes.", tint: "#1F31E8" },
    { title: "Pilot to production", fit: "Connect models to your products, data, and teams.", tint: "#1E9E5A" },
    { title: "Responsible AI", fit: "Plan for human review, privacy, and monitoring.", tint: "#8B3FE8" },
  ],
};

export function AiSolutionsConsultation({ content = defaultContent }: { content?: WebApplicationsPageContent["consultation"] } = {}) {
  return (
    <section className="ai-solutions-consultation" aria-label="Book an AI consultation">
      <div className="ai-solutions-container">
        <div data-reveal="" className="ai-consultation-card">
          <div className="ai-consultation-glow" aria-hidden="true" />

          <div className="ai-consultation-content-wrap">
            <div className="ai-consultation-info">
              <span className="ai-consultation-badge">Book consultation</span>

              <h2 className="ai-consultation-title">
                Tell us the operation.
                <br />
                We&apos;ll bring the products.
              </h2>

              <p className="ai-consultation-desc">
                A 30-minute session with an implementation lead, mapped to your industry and current stack.
              </p>

              <div className="ai-consultation-actions">
                <Link href="/book-a-demo" className="ai-consultation-primary">
                  Book Live Demo <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className="ai-consultation-secondary">
                  Talk to sales
                </Link>
              </div>
            </div>

            <div className="ai-consultation-paths">
              {content.paths.map((path) => (
                <div key={path.title} className="ai-consultation-path">
                  <span
                    className="ai-consultation-dot"
                    style={{ backgroundColor: path.tint }}
                    aria-hidden="true"
                  />
                  <div className="ai-consultation-path-copy">
                    <span className="ai-consultation-path-title">{path.title}</span>
                    <span className="ai-consultation-path-fit">{path.fit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-consultation-wave" aria-hidden="true">
              <div className="wave-inner">
                <svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" className="wave-svg">
                  <defs>
                    <linearGradient id="aiConsultBand" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                      <stop offset="34%" stopColor="#4B5CF5" stopOpacity="0.85" />
                      <stop offset="62%" stopColor="#8B3FE8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1F31E8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="aiConsultBandSoft" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1F31E8" stopOpacity="0" />
                      <stop offset="46%" stopColor="#6E7BFF" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8B3FE8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#aiConsultBandSoft)" strokeWidth="1">
                    <path d="M-40 296 C 150 246 250 176 420 158 C 560 143 660 176 840 138" />
                    <path d="M-40 308 C 150 258 250 188 420 170 C 560 155 660 188 840 150" />
                    <path d="M-40 320 C 150 270 250 200 420 182 C 560 167 660 200 840 162" />
                    <path d="M-40 332 C 150 282 250 212 420 194 C 560 179 660 212 840 174" />
                    <path d="M-40 344 C 150 294 250 224 420 206 C 560 191 660 224 840 186" />
                    <path d="M-40 356 C 150 306 250 236 420 218 C 560 203 660 236 840 198" />
                  </g>
                  <g fill="none" stroke="url(#aiConsultBand)" strokeWidth="1.4">
                    <path d="M-40 268 C 160 214 260 150 430 132 C 570 117 670 152 840 112" />
                    <path d="M-40 282 C 160 228 260 164 430 146 C 570 131 670 166 840 126" />
                    <path d="M-40 368 C 150 318 250 248 420 230 C 560 215 660 248 840 210" />
                  </g>
                  <g fill="none" stroke="url(#aiConsultBandSoft)" strokeWidth="1">
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