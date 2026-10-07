export interface StackItem {
  name: string;
  role: string;
  tint: string;
  icon?: string;
}

export interface StackLayer {
  n: string;
  kicker: string;
  title: string;
  desc: string;
  direction: "normal" | "reverse";
  duration: number; // in seconds
  items: StackItem[];
}

export const STACK_LAYERS: StackLayer[] = [
  {
    n: "01",
    kicker: "Surface",
    title: "Client surfaces",
    desc: "One component system across every dashboard, portal and app screen.",
    direction: "normal",
    duration: 26,
    items: [
      { name: "React", role: "Product dashboards", tint: "#1F31E8", icon: "/technology/reactjs.png" },
      { name: "Next.js", role: "Portals & marketing", tint: "#0C0C0D", icon: "/technology/nextjs.svg" },
      { name: "Flutter", role: "iOS & Android apps", tint: "#2AA8C4", icon: "/technology/Flutter.png" },
      { name: "TypeScript", role: "Type-safe contracts", tint: "#3178C6", icon: "/technology/typescript.png" },
      { name: "Tailwind / SCSS", role: "Design tokens", tint: "#1E9E5A", icon: "/technology/Tailwind-CSS.png" },
    ],
  },
  {
    n: "02",
    kicker: "Services",
    title: "Services & data",
    desc: "Realtime services, billing and reporting on a shared data core.",
    direction: "reverse",
    duration: 30,
    items: [
      { name: "Node.js", role: "Realtime APIs", tint: "#1E9E5A", icon: "/technology/nodejs.png" },
      { name: "Laravel", role: "Billing & back office", tint: "#E0452F", icon: "/technology/php.png" },
      { name: "PostgreSQL", role: "Transactional store", tint: "#4338CA", icon: "/technology/Postgre-SQL.png" },
      { name: "MongoDB", role: "Events & documents", tint: "#0F8F87", icon: "/technology/MongoDB.png" },
      { name: "Redis", role: "Caching & pub/sub", tint: "#E8A21F", icon: "/technology/redis.svg" },
    ],
  },
  {
    n: "03",
    kicker: "Platform",
    title: "Cloud & intelligence",
    desc: "Multi-region infrastructure with security and models built in.",
    direction: "normal",
    duration: 28,
    items: [
      { name: "AWS", role: "Infra as code", tint: "#E8A21F", icon: "/technology/AWS.png" },
      { name: "AI APIs", role: "Forecast & routing", tint: "#8B3FE8", icon: "/technology/ai-ml.svg" },
      { name: "Docker & K8s", role: "Container orchestration", tint: "#2AA8C4", icon: "/technology/docker.png" },
      {
        name: "Security & Scale",
        role: "RBAC, audits, load tests",
        tint: "#1F31E8",
        icon: "/technology/security.svg",
      },
    ],
  },
];

export const STACK_NOTES: string[] = [
  "One component system across web and mobile surfaces",
  "Shared auth, billing and analytics services",
  "Infrastructure as code with staged rollouts",
];
