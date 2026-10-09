import Link from "next/link";
import { ArrowRight, BrainCircuit, ChevronRight, type LucideIcon } from "lucide-react";
import type { SolutionsHeroContent } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsHero.scss";

const defaultContent: SolutionsHeroContent = {
  category: "AI Solutions",
  name: "AI Solutions",
  subtitle: "Practical intelligence for business",
  titleStart: "AI built for your",
  titleEnd: "real-world operations.",
  description:
    "From predictive insights to intelligent automation, we build AI around the way your teams work. Improve decisions, streamline operations, and put your data to work with solutions designed for measurable outcomes.",
  primaryAction: "Book an AI consultation",
  secondaryAction: "Contact our AI team",
};

export function AiSolutionsHero({ 
  content = defaultContent,
  icon: Icon = BrainCircuit
}: { 
  content?: SolutionsHeroContent,
  icon?: LucideIcon
} = {}) {
  return (
    <section className="ai-solutions-hero" aria-labelledby="ai-solutions-title">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
          <div className="hero-orbs">
            <div className="orb-bl" />
            <div className="orb-tr" />
          </div>
      </div>

      <div className="ai-solutions-hero-container">
        <nav data-reveal="" className="ai-solutions-hero-crumbs" aria-label="Breadcrumb">
          <Link href="/solutions">Solutions</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{content.category}</span>
        </nav>

        <div data-reveal="" className="ai-solutions-hero-identity">
          <span className="ai-solutions-hero-mark" aria-hidden="true">
            <Icon size={27} strokeWidth={1.8} />
          </span>
          <div>
            <strong>{content.name}</strong>
            <span className="ai-solutions-hero-subtitle">
              <i className="ai-solutions-hero-pulse" /> {content.subtitle}
            </span>
          </div>
        </div>

        <div className="ai-solutions-hero-intro">
          <h1 data-reveal="" id="ai-solutions-title" className="ai-solutions-hero-title">
            {content.titleStart}<br />
            <span className="highlight">{content.titleEnd}</span>
          </h1>

          <div className="ai-solutions-hero-right">
            <p data-reveal="" className="ai-solutions-hero-copy">
              {content.description}
            </p>

            <div data-reveal="" className="ai-solutions-hero-actions">
              <Link href="/book-a-demo" className="btn-primary">
                {content.primaryAction} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                {content.secondaryAction} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
