export interface SolutionItem {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  color: string;
  checklist: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  statusLabel: string;
  productsTag: string;
  tintClass: string;
  reverse?: boolean;
}

export interface HeroIndexItem {
  num: string;
  title: string;
  color: string;
  href: string;
}

export interface CtaStepItem {
  badgeColor: string;
  title: string;
  description: string;
}

export const HERO_INDEX_ITEMS: HeroIndexItem[] = [
  { num: "01", title: "AI Solutions", color: "#0F8F87", href: "#ai-solutions" },
  { num: "02", title: "Custom Software", color: "#1E9E5A", href: "#custom-software" },
  { num: "03", title: "Web Applications", color: "#1F31E8", href: "#web-applications" },
  { num: "04", title: "Mobile Applications", color: "#2AA8C4", href: "#mobile-applications" },
  { num: "05", title: "Enterprise Systems", color: "#8B3FE8", href: "#enterprise-systems" },
  { num: "06", title: "Cloud Infrastructure", color: "#E8A21F", href: "#cloud-infrastructure" },
];

export const SOLUTIONS_LIST_DATA: SolutionItem[] = [
  {
    id: "ai-solutions",
    num: "01",
    category: "AI & Automation",
    title: "Models where they change the outcome.",
    description:
      "Forecasting, routing and instruction models sit inside the workflow rather than beside it. Every prediction is written back to the record it affects, with a human able to override.",
    color: "#0F8F87",
    checklist: [
      "Demand and utilisation forecasting",
      "Route, roster and schedule optimisation",
      "Instruction and content generation for staff",
      "Review and override paths on every suggestion",
      "Monitoring for accuracy and model drift",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/solutions/ai-solutions",
    image: "/solutions/AI & Automation.png",
    imageAlt: "Strivedge AI Solutions & Intelligence Dashboard",
    statusLabel: "In production",
    productsTag: "Dishly · LoadGo",
    tintClass: "teal-tint",
    reverse: false,
  },
  {
    id: "custom-software",
    num: "02",
    category: "Custom Software",
    title: "Workflows shaped to your operation.",
    description:
      "When the process is the differentiator, we model it directly: your states, approvals and exceptions, with the platform layer handling identity, billing and reporting underneath.",
    color: "#1E9E5A",
    checklist: [
      "Process and data modelling with your team",
      "Custom state machines and approval chains",
      "Migration off spreadsheets and legacy tools",
      "Integrations with existing ERP and accounting",
      "Handover with documentation and team training",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/solutions/custom-software",
    image: "/solutions/Custom Software.png",
    imageAlt: "Strivedge Custom Software Workflow Interface",
    statusLabel: "In production",
    productsTag: "WelzoKart · Needly",
    tintClass: "green-tint",
    reverse: true,
  },
  {
    id: "web-applications",
    num: "03",
    category: "Web Development",
    title: "Dashboards on one component system.",
    description:
      "Operations consoles, admin panels and customer portals drawn from a single design system. A pattern proven in one product arrives in the next without a redesign.",
    color: "#1F31E8",
    checklist: [
      "Multi-tenant admin consoles with branch scoping",
      "Role-aware dashboards and scheduled reporting",
      "Bulk actions, saved filters and audit views",
      "Accessible components with performance budgets",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/solutions/web-applications",
    image: "/solutions/Web Development.png",
    imageAlt: "Strivedge Web Application & Healthcare Platform Console",
    statusLabel: "In production",
    productsTag: "Slota · NurseWorth",
    tintClass: "blue-tint",
    reverse: false,
  },
  {
    id: "mobile-applications",
    num: "04",
    category: "Mobile Applications",
    title: "Apps the crew keeps open all shift.",
    description:
      "Native-feel iOS and Android apps for customer, rider, crew and field roles. They share the component system and APIs of the web products, so one release ships to both.",
    color: "#2AA8C4",
    checklist: [
      "Offline-tolerant workflows for field and depot use",
      "Live location, route and status tracking",
      "Push and SMS notification journeys",
      "Separate app shells per role: crew, rider, customer",
      "Store submissions and staged rollout managed for you",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/solutions/mobile-applications",
    image: "/solutions/Mobile Applications.png",
    imageAlt: "Strivedge Mobile App Development & Portfolio UI",
    statusLabel: "In production",
    productsTag: "Trekvano · LoadGo",
    tintClass: "cyan-tint",
    reverse: true,
  },
  {
    id: "enterprise-systems",
    num: "05",
    category: "Enterprise Solutions",
    title: "SSO, roles, audit trails, compliance.",
    description:
      "The platform layer every product inherits: single sign-on, granular roles, full audit history and encryption in transit and at rest, configured per entity and per branch.",
    color: "#8B3FE8",
    checklist: [
      "SSO with SAML and OIDC providers",
      "Role and permission matrices per branch",
      "Immutable audit trails on every record",
      "Data residency and retention controls",
      "SLA-backed support with quarterly reviews",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/solutions/enterprise-systems",
    image: "/solutions/Enterprise Solutions.png",
    imageAlt: "Strivedge Enterprise Systems & Security Management",
    statusLabel: "In production",
    productsTag: "NurseWorth · Slota",
    tintClass: "purple-tint",
    reverse: false,
  },
  {
    id: "cloud-infrastructure",
    num: "06",
    category: "Cloud Infrastructure",
    title: "Multi-region AWS with autoscaling.",
    description:
      "Every product runs on the same infrastructure: managed backups, blue-green deploys and observability wired in from the first commit. Scale becomes a configuration change.",
    color: "#E8A21F",
    checklist: [
      "Multi-region deployment with autoscaling",
      "Managed backups with point-in-time restore",
      "Blue-green and canary release pipelines",
      "Metrics, tracing, alerting and capacity reviews",
    ],
    ctaText: "Explore Solution",
    ctaLink: "/solutions/cloud-infrastructure",
    image: "/solutions/Cloud Infrastructure.png",
    imageAlt: "Strivedge Cloud Infrastructure & AWS Architecture",
    statusLabel: "In production",
    productsTag: "All nine products",
    tintClass: "amber-tint",
    reverse: true,
  },
];

export const CTA_STEP_ITEMS: CtaStepItem[] = [
  {
    badgeColor: "#1F31E8",
    title: "Scoping call",
    description: "Thirty minutes on your process, volumes and current tools.",
  },
  {
    badgeColor: "#1E9E5A",
    title: "Fixed-scope pilot",
    description: "One team or branch live in four to six weeks.",
  },
  {
    badgeColor: "#8B3FE8",
    title: "Full rollout",
    description: "Multi-branch migration, training and SLA-backed support.",
  },
];
