import Link from "next/link";
import type { WebApplicationsPageContent } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsHire.scss";

const defaultContent: WebApplicationsPageContent["hire"] = {
  eyebrow: "Partner with us",
  title: "Build AI that\nyour teams can trust.",
  description:
    "Whether you need a sharper forecasting model, smarter automation, or a complete AI product strategy, we help turn complex technology into reliable operating systems.",
  action: "Talk to our team",
};

export function AiSolutionsHire({ content = defaultContent }: { content?: WebApplicationsPageContent["hire"] } = {}) {
  return (
    <section className="ai-solutions-hire">
      <div className="ai-solutions-container">
        <div data-reveal="" className="hire-panel hire-grid">
          <div className="hire-copy">
            <span className="section-kicker">{content.eyebrow}</span>
            <h3>{content.title}</h3>
          </div>
          <div className="hire-details">
            <p>{content.description}</p>
            <Link href="/contact" className="btn-primary">
              {content.action}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
