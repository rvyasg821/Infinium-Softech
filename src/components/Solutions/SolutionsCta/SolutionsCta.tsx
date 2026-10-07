import Link from "next/link";
import "./SolutionsCta.scss";
import { CTA_STEP_ITEMS } from "@/data/solutions/solutionsData";

export function SolutionsCta() {
  return (
    <section id="build" className="solutions-cta-section" aria-label="Build Solution CTA">
      <div className="solutions-cta-container">
        <div className="solutions-cta-card">
          <div className="solutions-cta-left">
            <div data-reveal="" className="cta-eyebrow">
              Next step
            </div>
            <h2 data-reveal="" className="cta-title">
              Let's Build the Solution
            </h2>
            <p data-reveal="" className="cta-desc">
              Bring the process you want to fix. We scope it against what already
              exists in the platform, then quote the part that has to be built.
            </p>

            <div data-reveal="" className="cta-actions">
              <Link href="/contact" className="btn-primary-blue">
                Talk to sales
              </Link>
              <Link href="/book-a-demo" className="btn-outline-light">
                Book a demo
              </Link>
            </div>
          </div>

          <div data-reveal="" className="solutions-cta-right">
            {CTA_STEP_ITEMS.map((step, idx) => (
              <div key={idx} className="step-card-row">
                <span
                  className="step-badge"
                  style={{ backgroundColor: step.badgeColor }}
                />
                <div className="step-info">
                  <span className="step-title">{step.title}</span>
                  <span className="step-desc">{step.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
