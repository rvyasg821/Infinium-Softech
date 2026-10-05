"use client";

import Image from "next/image";
import Link from "next/link";
import { useAboutCarousel } from "@/components/About/useAboutCarousel";
import type { SolutionsProject, SolutionsSectionIntro } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsWorks.scss";

const defaultContent: SolutionsSectionIntro & { items: SolutionsProject[] } = {
  eyebrow: "Our works",
  titleStart: "Projects that speak",
  titleEnd: "for themselves.",
  description: "A selection of products and platforms shaped around real user and business needs.",
  items: [
  {
    name: "NurseWorth",
    mark: "NW",
    category: "Healthcare · AI logic",
    tint: "#8B3FE8",
    description:
      "Salary, cost-of-living, and shift intelligence help nurses compare opportunities and plan their next career move.",
    image: "/shots/mapmypay.jpg",
    imageAlt: "NurseWorth AI insights platform",
    href: "/products/NurseWorth",
    result: "Web & mobile platform",
  },
  {
    name: "Slota",
    mark: "SL",
    category: "AI · Workforce scheduling",
    tint: "#1F31E8",
    description:
      "An intelligent workforce platform that brings task management, smart scheduling, and behavioral insights into one workspace.",
    image: "/shots/slota.png",
    imageAlt: "Slota AI scheduling interface",
    href: "/products/slota",
    result: "AI-powered SaaS platform",
    logo: "/logos/slota-logo.png",
  },
  {
    name: "Dishly",
    mark: "DI",
    category: "Kitchen AI · Food operations",
    tint: "#0F8F87",
    description:
      "AI-powered cooking and menu guidance helps multi-outlet kitchens standardize prep, control portions, and reduce waste.",
    image: "/shots/welzokart.jpg",
    imageAlt: "Dishly AI kitchen operations screen",
    href: "/products/dishly",
    result: "Kitchen AI platform",
  },
  ],
};

function ProjectCard({ project, isClone = false }: { project: SolutionsProject; isClone?: boolean }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-reveal={isClone ? undefined : ""}
      data-carousel-item
      tabIndex={isClone ? -1 : undefined}
      aria-hidden={isClone ? "true" : undefined}
      className={`ai-work-card ${isClone ? "ai-work-card--clone" : ""}`}
    >
      <div className="ai-work-image-box">
        <Image
          src={project.image}
          alt={isClone ? "" : project.imageAlt}
          width={720}
          height={480}
          unoptimized
          className="ai-work-image"
        />
      </div>

      <div className="ai-work-body">
        <div className="ai-work-identity">
          <span className="ai-work-badge" style={{ backgroundColor: project.logo ? "transparent" : project.tint }}>
            {project.logo ? (
              <Image src={project.logo} alt={`${project.name} Logo`} width={40} height={40} className="ai-work-badge-logo" />
            ) : (
              project.mark
            )}
          </span>
          <div>
            <h3 className="ai-work-name" style={{ color: project.tint }}>{project.name}</h3>
            <span className="ai-work-category">{project.category}</span>
          </div>
        </div>
        <p className="ai-work-description">{project.description}</p>
      </div>

      <div className="ai-work-footer">
        <span className="ai-work-result">{project.result}</span>
        <span className="ai-work-link" style={{ color: project.tint }}>
          View project <span aria-hidden="true">›</span>
        </span>
      </div>
    </a>
  );
}

export function AiSolutionsWorks({ content = defaultContent }: { content?: SolutionsSectionIntro & { items: SolutionsProject[] } } = {}) {
  const projects = content.items;
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(projects.length, 1024);

  return (
    <section className="ai-solutions-works" aria-labelledby="ai-solutions-works-title">
      <div className="ai-solutions-container">
        <div className="ai-solutions-works-header">
          <div className="ai-solutions-works-header-left">
            <span data-reveal="" className="ai-solutions-works-eyebrow">{content.eyebrow}</span>
            <h2 data-reveal="" id="ai-solutions-works-title" className="ai-solutions-works-title">
              {content.titleStart}
              <br />
              {content.titleEnd}
            </h2>
          </div>
          <div className="ai-solutions-works-header-right">
            <p data-reveal="" className="ai-solutions-works-intro">{content.description}</p>
            <Link data-reveal="" href="/products" className="btn-secondary">
              View all projects
            </Link>
          </div>
        </div>

        <div data-reveal="" className="ai-solutions-works-wrap">
          <div className="ai-solutions-works-track">
            <div className="ai-solutions-works-grid" ref={scrollRef}>
              <ProjectCard project={projects[projects.length - 1]} isClone />
              {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
              <ProjectCard project={projects[0]} isClone />
            </div>

            <button
              type="button"
              className="ai-solutions-works-arrow ai-solutions-works-arrow--previous"
              aria-label="Previous project"
              onClick={handlePrev}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="ai-solutions-works-arrow ai-solutions-works-arrow--next"
              aria-label="Next project"
              onClick={handleNext}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="ai-solutions-works-dots" aria-label="Project navigation">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                className={`ai-solutions-works-dot ${activeIndex === index ? "is-active" : ""}`}
                aria-label={`Go to project ${index + 1}: ${project.name}`}
                onClick={() => scrollToIndex(index)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}