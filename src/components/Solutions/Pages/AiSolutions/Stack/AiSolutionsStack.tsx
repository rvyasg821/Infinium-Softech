import Image from "next/image";
import type { SolutionsSectionIntro, SolutionsTechnology } from "@/data/solutions/webApplicationsPageData";
import "./AiSolutionsStack.scss";

const defaultContent: SolutionsSectionIntro & { items: SolutionsTechnology[] } = {
  eyebrow: "Tools & systems",
  titleStart: "Proven tools for",
  titleEnd: "practical AI.",
  description: "We choose dependable technologies to build, integrate, and scale AI around your products and workflows.",
  items: [
    { name: "Python", logo: "/technology/Python.png" },
    { name: "AI / ML", logo: "/technology/ai-ml.svg" },
    { name: "AWS", logo: "/technology/cloudfront.svg" },
    { name: "Azure", logo: "/technology/Azure.png" },
    { name: "Docker", logo: "/technology/docker.png" },
    { name: "Kubernetes", logo: "/technology/kubernetes.png" },
    { name: "MongoDB", logo: "/technology/MongoDB.png" },
    { name: "PostgreSQL", logo: "/technology/Postgre-SQL.png" },
    { name: "MySQL", logo: "/technology/mysql.png" },
    { name: "Node.js", logo: "/technology/nodejs.png" },
    { name: "OpenShift", logo: "/technology/OpenShift.png" },
  ],
};

export function AiSolutionsStack({ content = defaultContent }: { content?: SolutionsSectionIntro & { items: SolutionsTechnology[] } } = {}) {
  const technologyStack = content.items;
  const marqueeItems = [...technologyStack, ...technologyStack];

  return (
    <section className="ai-solutions-stack" aria-label="AI tools and systems">
      <div className="ai-solutions-container">
        <div className="ai-solutions-stack-header">
          <span data-reveal="" className="ai-solutions-stack-eyebrow">{content.eyebrow}</span>
          <h2 data-reveal="" className="ai-solutions-stack-title">
            {content.titleStart}
            <br />
            {content.titleEnd}
          </h2>
          <p data-reveal="" className="ai-solutions-stack-description">
            {content.description}
          </p>
        </div>

        <div data-reveal="" className="ai-solutions-stack-marquee-viewport">
          <div className="ai-solutions-stack-marquee" aria-label="Technology logos">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="ai-solutions-stack-pill"
                aria-hidden={index >= technologyStack.length ? "true" : undefined}
              >
                <Image
                  src={item.logo}
                  alt={index < technologyStack.length ? item.name : ""}
                  width={28}
                  height={28}
                  unoptimized
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
