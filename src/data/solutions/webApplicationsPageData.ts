export interface SolutionsHeroContent {
  category: string;
  name: string;
  subtitle: string;
  titleStart: string;
  titleEnd: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
}

export interface SolutionsServiceItem {
  number: string;
  tint: string;
  title: string;
  description: string;
}

export interface SolutionsStrengthItem {
  number: string;
  tint?: string;
  title: string;
  description: string;
}

export interface SolutionsSectionIntro {
  eyebrow: string;
  titleStart: string;
  titleEnd: string;
  description: string;
}

export interface SolutionsProcessStep extends SolutionsServiceItem { }

export interface SolutionsConsultationPath {
  title: string;
  fit: string;
  tint: string;
}

export interface SolutionsFaqItem {
  question: string;
  answer: string;
}

export interface SolutionsProject {
  name: string;
  mark: string;
  category: string;
  tint: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  result: string;
  logo?: string;
}

export interface SolutionsTechnology {
  name: string;
  logo: string;
}

export interface WebApplicationsPageContent {
  hero: SolutionsHeroContent;
  offerings: SolutionsSectionIntro & { items: SolutionsServiceItem[] };
  strengths: SolutionsSectionIntro & { items: SolutionsStrengthItem[] };
  process: SolutionsSectionIntro & { items: SolutionsProcessStep[] };
  hire: {
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  consultation: {
    titleStart: string;
    titleEnd: string;
    description: string;
    paths: SolutionsConsultationPath[];
  };
  faq: SolutionsSectionIntro & { items: SolutionsFaqItem[] };
  works: SolutionsSectionIntro & { items: SolutionsProject[] };
  stack: SolutionsSectionIntro & { items: SolutionsTechnology[] };
}

export const WEB_APPLICATIONS_PAGE_CONTENT: WebApplicationsPageContent = {
  hero: {
    category: "Web applications",
    name: "Web Applications",
    subtitle: "Connected tools for everyday operations",
    titleStart: "Web platforms for",
    titleEnd: "how business works.",
    description:
      "We design and build responsive web applications, portals, and dashboards around your users, data, and workflows.",
    primaryAction: "Plan a web project",
    secondaryAction: "Contact our web team",
  },
  offerings: {
    eyebrow: "What we deliver",
    titleStart: "Web applications built",
    titleEnd: "around real work.",
    description:
      "From customer-facing websites to internal platforms, we build secure, scalable web experiences for your business.",
    items: [
      {
        number: "01",
        tint: "#1F31E8",
        title: "Custom Web Platforms",
        description: "Build portals and applications around your specific business workflows.",
      },
      {
        number: "02",
        tint: "#1E9E5A",
        title: "Business Dashboards",
        description: "Give teams clear views of activity, performance, and the next action.",
      },
      {
        number: "03",
        tint: "#E8A21F",
        title: "Frontend Engineering",
        description: "Create responsive interfaces with React, Next.js, and modern web tools.",
      },
      {
        number: "04",
        tint: "#8B3FE8",
        title: "Backend & APIs",
        description: "Develop secure services, APIs, and data layers for dependable applications.",
      },
      {
        number: "05",
        tint: "#0F8F87",
        title: "Commerce Platforms",
        description: "Connect catalogs, orders, payments, and operations in one experience.",
      },
      {
        number: "06",
        tint: "#2AA8C4",
        title: "Content Management",
        description: "Give your team practical tools to manage content and digital journeys.",
      },
      {
        number: "07",
        tint: "#4338CA",
        title: "System Integration",
        description: "Connect web applications to ERP, CRM, payment, and partner systems.",
      },
      {
        number: "08",
        tint: "#0C0C0D",
        title: "Modernisation & Support",
        description: "Improve existing applications with migration, maintenance, and upgrades.",
      },
    ],
  },
  strengths: {
    eyebrow: "Why Infinium Softech",
    titleStart: "Web products built",
    titleEnd: "for everyday work.",
    description:
      "We bring product thinking and engineering discipline to applications teams rely on every day.",
    items: [
      { number: "01", tint: "#1F31E8", title: "Designed around users", description: "Clear journeys for customers, operators, and administrators." },
      { number: "02", tint: "#1E9E5A", title: "Responsive by default", description: "Interfaces that work across desktop, tablet, and mobile screens." },
      { number: "03", tint: "#E8A21F", title: "Connected systems", description: "Integrations that keep business data and workflows in sync." },
      { number: "04", tint: "#8B3FE8", title: "Secure access", description: "Roles and permissions suited to teams, branches, and customers." },
      { number: "05", tint: "#0F8F87", title: "Built for performance", description: "Efficient application architecture that can grow with usage." },
      { number: "06", tint: "#2AA8C4", title: "Supported after launch", description: "Testing, maintenance, and improvements as your needs change." },
    ],
  },
  process: {
    eyebrow: "How we work",
    titleStart: "From first brief",
    titleEnd: "to live web app.",
    description:
      "A clear path from discovery and design through development, launch, and continued support.",
    items: [
      { number: "01", tint: "#1F31E8", title: "Discover & scope", description: "Align on users, business goals, features, and success measures." },
      { number: "02", tint: "#1E9E5A", title: "Plan architecture", description: "Map the experience, data model, integrations, and technical approach." },
      { number: "03", tint: "#E8A21F", title: "Design the experience", description: "Shape page flows and interfaces for real user needs and devices." },
      { number: "04", tint: "#8B3FE8", title: "Build the platform", description: "Develop the frontend, backend, and integrations in focused releases." },
      { number: "05", tint: "#0F8F87", title: "Test & launch", description: "Validate usability, performance, security, and cross-device behavior." },
      { number: "06", tint: "#2AA8C4", title: "Support & improve", description: "Monitor the application and refine it as your business evolves." },
    ],
  },
  hire: {
    eyebrow: "Partner with us",
    title: "Build digital solutions your team can rely on.",
    description:
      "Tell us about your users, workflows, and goals. We’ll help shape a practical web solution and a clear delivery plan.",
    action: "Talk to our team",
  },
  consultation: {
    titleStart: "Tell us the workflow.",
    titleEnd: "We’ll shape the platform.",
    description: "A 30-minute session to map your users, systems, and web application goals.",
    paths: [
      { title: "Web strategy", fit: "Prioritise users, workflows, and first release scope.", tint: "#1F31E8" },
      { title: "Product build", fit: "Connect interfaces, services, data, and integrations.", tint: "#1E9E5A" },
      { title: "Ongoing support", fit: "Plan for launch, maintenance, and future improvements.", tint: "#8B3FE8" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    titleStart: "Web development",
    titleEnd: "questions, answered.",
    description: "Answers about planning, technology, delivery, and support for web projects.",
    items: [
      { question: "What is web development and why does it matter?", answer: "Web development creates the websites and applications people use to access your services, complete tasks, and work with business information. A well-built platform can improve reach, service, and operational efficiency." },
      { question: "What technologies do you use?", answer: "We select technologies to fit the product and your existing systems. Our experience includes React, Next.js, Node.js, PHP and Laravel, Java, and common relational and document databases." },
      { question: "Do you build responsive web applications?", answer: "Yes. We design and test interfaces for desktop, tablet, and mobile so users can work across devices." },
      { question: "How long does a web project take?", answer: "Timing depends on scope, integrations, content, and approvals. We agree on milestones and delivery phases after discovery." },
      { question: "Can you help with hosting and deployment?", answer: "We plan deployment around your infrastructure and operational requirements, and can help configure hosting, domains, and release workflows as part of the project." },
      { question: "Can our team update the application after launch?", answer: "We can build suitable content or administration tools into the application and provide documentation and handover for your team." },
      { question: "Will the website be search-engine friendly?", answer: "For public-facing pages, we account for semantic structure, metadata, responsive behavior, and performance as part of implementation." },
      { question: "Do you provide maintenance after launch?", answer: "Yes. Ongoing support can include updates, bug fixes, security patches, monitoring, and feature improvements." },
      { question: "Can you redesign or modernise an existing website?", answer: "Yes. We can review your current application, preserve essential workflows, and plan a redesign or phased migration." },
    ],
  },
  works: {
    eyebrow: "Our works",
    titleStart: "Web platforms built",
    titleEnd: "for real operations.",
    description: "A selection of Infinium products with web experiences built around everyday workflows.",
    items: [
      { name: "Slota", mark: "SL", category: "Bookings · Web platform", tint: "#1F31E8", description: "A booking and management platform that brings calendars, teams, services, and payments together.", image: "/shots/slota.png", imageAlt: "Slota booking and management platform", href: "/products/slota", result: "Booking operations", logo: "/logos/slota-logo.png" },
      { name: "WelzoKart", mark: "WK", category: "Quick commerce · Web platform", tint: "#1E9E5A", description: "A commerce platform connecting product catalogs, orders, dispatch, and customer experiences.", image: "/shots/Welzokart 2.jpg", imageAlt: "WelzoKart commerce platform", href: "/products/welzokart", result: "Commerce operations", logo: "/logos/welzokart-logo.png" },
      { name: "NurseWorth", mark: "NW", category: "Healthcare · Web platform", tint: "#8B3FE8", description: "A healthcare staffing platform for credentialing, shift matching, and workforce coordination.", image: "/shots/mapmypay.jpg", imageAlt: "NurseWorth staffing platform", href: "/products/NurseWorth", result: "Workforce management" },
    ],
  },
  stack: {
    eyebrow: "Tools & systems",
    titleStart: "Web technology",
    titleEnd: "chosen for the job.",
    description: "A dependable mix of frontend, backend, database, and cloud technologies for secure, scalable web applications.",
    items: [
      { name: "React", logo: "/technology/reactjs.png" },
      { name: "Next.js", logo: "/technology/nextjs.svg" },
      { name: "Vue.js", logo: "/technology/vue.png" },
      { name: "JavaScript", logo: "/technology/JS.png" },
      { name: "TypeScript", logo: "/technology/typescript.png" },
      { name: "Node.js", logo: "/technology/nodejs.png" },
      { name: "Laravel", logo: "/technology/Laravel.png" },
      { name: "Java", logo: "/technology/java.png" },
      { name: "PostgreSQL", logo: "/technology/Postgre-SQL.png" },
      { name: "MySQL", logo: "/technology/mysql.png" },
      { name: "AWS", logo: "/technology/cloudfront.svg" },
    ],
  },
};