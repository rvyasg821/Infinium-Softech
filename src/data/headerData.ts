import type { ElementType } from "react";
import { BrainCircuit, Code, Monitor, Smartphone, Building2, Cloud } from "lucide-react";

export type ProductItem = {
  id: string;
  n: string;
  name: string;
  mark: string;
  tag: string;
  tint: string;
  desc: string;
  shot: string;
  wash: string;
  logo?: string;
  link?: string;
};

export type GenericMenuItem = {
  name: string;
  desc: string;
  tint: string;
  product: string;
  href?: string;
  icon?: string;
  LucideIcon?: ElementType;
  previewImage?: string;
  link?: string;
  tag?: string;
  previewTitle?: string;
  previewDesc?: string;
};

export type MenuDef = {
  key: string;
  label: string;
  eyebrow: string;
  isProducts?: boolean;
  productItems?: ProductItem[];
  items?: GenericMenuItem[];
};

export const ECOSYSTEM_PRODUCTS: ProductItem[] = [
  {
    id: "welzokart",
    n: "01",
    name: "WelzoKart",
    mark: "WK",
    tag: "QUICK COMMERCE",
    tint: "#1E9E5A",
    desc: "Quick commerce marketplace combining grocery and restaurant delivery.",
    shot: "/shots/Welzokart 2.jpg",
    wash: "rgba(30, 158, 90, 0.16)",
    logo: "/logos/welzokart-logo.png",
    link: "/products/welzokart"
  },
  {
    id: "slota",
    n: "02",
    name: "slota",
    mark: "sl",
    tag: "BOOKINGS",
    tint: "#1F31E8",
    desc: "Business booking and management platform for appointment-led teams.",
    shot: "/shots/slota.png",
    wash: "rgba(31, 49, 232, 0.16)",
    logo: "/logos/slota-logo.png",
    link: "/products/slota"
  },
  {
    id: "needly",
    n: "03",
    name: "Needly",
    mark: "ND",
    tag: "MARKETPLACE",
    tint: "#E0452F",
    desc: "Daily needs buy and sell marketplace with verified neighbourhood listings.",
    shot: "/shots/Needly.png",
    wash: "rgba(224, 69, 47, 0.16)",
    logo: "/logos/Needly-logo.png",
    link: "/products/needly"
  },

  {
    id: "loadgo",
    n: "04",
    name: "LoadGo",
    mark: "LG",
    tag: "LOGISTICS",
    tint: "#E8A21F",
    desc: "Transport and truck booking ecosystem across long-haul and regional lanes.",
    shot: "/shots/LoadGo.png",
    wash: "rgba(232, 162, 31, 0.16)",
    link: "/products/loadgo",
    logo: "/logos/LoadGo-logo.png",
  },
  {
    id: "dishly",
    n: "05",
    name: "Dishly",
    mark: "DI",
    tag: "KITCHEN AI",
    tint: "#0F8F87",
    desc: "AI-powered cooking and menu instruction platform for multi-outlet kitchens.",
    shot: "/shots/Dishly.png",
    wash: "rgba(15, 143, 135, 0.16)",
    logo: "/logos/Dishly-logo.png",
    link: "/products/dishly"
  },
  {
    id: "trekvano",
    n: "06",
    name: "Trekvano",
    mark: "TV",
    tag: "EDUCATION",
    tint: "#2AA8C4",
    desc: "School van and student tracking system with live parent notifications.",
    shot: "/shots/Trekvano.jpg",
    wash: "rgba(42, 168, 196, 0.16)",
    logo: "/logos/Trekvano.png",
    link: "/products/trekvano"
  },
  {
    id: "purespace",
    n: "07",
    name: "PureSpace",
    mark: "PS",
    tag: "HOME SERVICES",
    tint: "#4338CA",
    desc: "Cleaning and home service booking platform with route-optimised crews.",
    shot: "/shots/PureSpace.png",
    wash: "rgba(67, 56, 202, 0.16)",
    logo: "/logos/pureSpace-logo.png",
    link: "/products/purespace"
  },
  {
    id: "Textora",
    n: "08",
    name: "Textora",
    mark: "TT",
    tag: "COMMUNICATION",
    tint: "#0C0C0D",
    desc: "Bulk SMS and business communication platform with delivery analytics.",
    shot: "/shots/textgem.jpg",
    wash: "rgba(241, 240, 236, 0.08)",
    link: "/products/Textora"
  },
];

export const MENU_DEFS: Record<string, MenuDef> = {
  products: {
    key: "products",
    label: "Products",
    eyebrow: "Nine products, one platform",
    isProducts: true,
    productItems: ECOSYSTEM_PRODUCTS,
  },
  solutions: {
    key: "solutions",
    label: "Solutions",
    eyebrow: "How we build and ship",
    items: [
      {
        name: "AI Solutions",
        desc: "Forecasting, routing and instructions",
        tint: "#0F8F87",
        product: "AI Solutions",
        href: "/solutions/ai-solutions",
        link: "/solutions/ai-solutions",
        LucideIcon: BrainCircuit,
        previewImage: "/solutions/AI%20%26%20Automation.png",
        tag: "AI & AUTOMATION",
        previewTitle: "AI Solutions",
        previewDesc:
          "Forecasting, routing and instruction models sit inside the workflow rather than beside it. Every prediction is written back to the record it affects, with a human able to override.",
      },
      {
        name: "Custom Software",
        desc: "Workflows shaped to your operation",
        tint: "#1E9E5A",
        product: "Custom Software",
        href: "/solutions/custom-software",
        link: "/solutions/custom-software",
        LucideIcon: Code,
        previewImage: "/solutions/Custom%20Software.png",
        tag: "CUSTOM SOFTWARE",
        previewTitle: "Custom Software",
        previewDesc:
          "When the process is the differentiator, we model it directly: your states, approvals and exceptions, with the platform layer handling identity, billing and reporting underneath.",
      },
      {
        name: "Web Applications",
        desc: "Dashboards on one component system",
        tint: "#1F31E8",
        product: "Web Applications",
        href: "/solutions/web-applications",
        link: "/solutions/web-applications",
        LucideIcon: Monitor,
        previewImage: "/solutions/Web%20Development.png",
        tag: "WEB DEVELOPMENT",
        previewTitle: "Web Applications",
        previewDesc:
          "Operations consoles, admin panels and customer portals drawn from a single design system. A pattern proven in one product arrives in the next without a redesign.",
      },
      {
        name: "Mobile Apps",
        desc: "Customer, rider, crew and field apps",
        tint: "#2AA8C4",
        product: "Mobile Apps",
        href: "/solutions/mobile-applications",
        link: "/solutions/mobile-applications",
        LucideIcon: Smartphone,
        previewImage: "/solutions/Mobile%20Applications.png",
        tag: "MOBILE APPLICATIONS",
        previewTitle: "Mobile Apps",
        previewDesc:
          "Native-feel iOS and Android apps for customer, rider, crew and field roles. They share the component system and APIs of the web products, so one release ships to both.",
      },
      {
        name: "Enterprise Systems",
        desc: "SSO, roles, audit trails, compliance",
        tint: "#8B3FE8",
        product: "Enterprise Systems",
        href: "/solutions/enterprise-systems",
        link: "/solutions/enterprise-systems",
        LucideIcon: Building2,
        previewImage: "/solutions/Enterprise%20Solutions.png",
        tag: "ENTERPRISE SOLUTIONS",
        previewTitle: "Enterprise Systems",
        previewDesc:
          "The platform layer every product inherits: single sign-on, granular roles, full audit history and encryption in transit and at rest, configured per entity and per branch.",
      },
      {
        name: "Cloud Infrastructure",
        desc: "Multi-region AWS with autoscaling",
        tint: "#E8A21F",
        product: "Cloud Infrastructure",
        href: "/solutions/cloud-infrastructure",
        link: "/solutions/cloud-infrastructure",
        LucideIcon: Cloud,
        previewImage: "/solutions/Cloud%20Infrastructure.png",
        tag: "CLOUD INFRASTRUCTURE",
        previewTitle: "Cloud Infrastructure",
        previewDesc:
          "Every product runs on the same infrastructure: managed backups, blue-green deploys and observability wired in from the first commit. Scale becomes a configuration change.",
      },
    ],
  },
  technology: {
    key: "technology",
    label: "Technologies",
    eyebrow: "One toolchain across all nine products",
    items: [
      { name: "React", desc: "Component system for every dashboard", tint: "#1F31E8", product: "Slota", href: "/technologies/react-js", icon: "/technology/reactjs.png" },
      { name: "Next.js", desc: "Marketing and portal surfaces", tint: "#0C0C0D", product: "Textora", href: "/technologies/next-js", icon: "/technology/nextjs.svg" },
      { name: "React Native", desc: "Shared iOS and Android codebase", tint: "#2AA8C4", product: "Trekvano", href: "/technologies/react-native", icon: "/technology/React-Native.png" },
      { name: "Node.js", desc: "Realtime services and APIs", tint: "#1E9E5A", product: "WelzoKart", href: "/technologies/node-js", icon: "/technology/nodejs.png" },
      { name: "Laravel", desc: "Billing, admin and back office", tint: "#E0452F", product: "Needly", href: "/technologies/php-laravel", icon: "/technology/Laravel.png" },
      { name: "AWS", desc: "Infrastructure as code, staged rollouts", tint: "#E8A21F", product: "LoadGo", href: "/technologies/aws", icon: "/technology/aws.svg" },
      { name: "AI/ML", desc: "Intelligent automation and data-driven insights", tint: "#8B3FE8", product: "", href: "/technologies/python", icon: "/technology/ai-ml.svg" },
      { name: "View More", desc: "Discover more tools behind our products", tint: "#8B3FE8", product: "NurseWorth", href: "/technologies" },
    ],
  },
};

export const MENU_KEYS = ["products", "solutions", "technology"] as const;
