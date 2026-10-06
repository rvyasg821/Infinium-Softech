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
};

export type GenericMenuItem = {
  name: string;
  desc: string;
  tint: string;
  product: string;
  href?: string;
  icon?: string;
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
    id: "slota",
    n: "01",
    name: "slota",
    mark: "sl",
    tag: "BOOKINGS",
    tint: "#1F31E8",
    desc: "Business booking and management platform for appointment-led teams.",
    shot: "/shots/welzokart.jpg",
    wash: "rgba(31, 49, 232, 0.16)",
    logo: "/logos/slota-logo.png",
  },
  {
    id: "welzokart",
    n: "02",
    name: "WelzoKart",
    mark: "WK",
    tag: "QUICK COMMERCE",
    tint: "#1E9E5A",
    desc: "Quick commerce marketplace combining grocery and restaurant delivery.",
    shot: "/shots/welzokart.jpg",
    wash: "rgba(30, 158, 90, 0.16)",
    logo: "/logos/welzokart-logo.png",
  },
  {
    id: "needly",
    n: "03",
    name: "Needly",
    mark: "ND",
    tag: "MARKETPLACE",
    tint: "#E0452F",
    desc: "Daily needs buy and sell marketplace with verified neighbourhood listings.",
    shot: "/shots/textgem.jpg",
    wash: "rgba(224, 69, 47, 0.16)",
    logo: "/logos/needly-logo.png",
  },

  {
    id: "loadgo",
    n: "04",
    name: "LoadGo",
    mark: "LG",
    tag: "LOGISTICS",
    tint: "#E8A21F",
    desc: "Transport and truck booking ecosystem across long-haul and regional lanes.",
    shot: "/shots/truckguru.jpg",
    wash: "rgba(232, 162, 31, 0.16)",
  },
  {
    id: "dishly",
    n: "05",
    name: "Dishly",
    mark: "DI",
    tag: "KITCHEN AI",
    tint: "#0F8F87",
    desc: "AI-powered cooking and menu instruction platform for multi-outlet kitchens.",
    shot: "/shots/localeeclean.jpg",
    wash: "rgba(15, 143, 135, 0.16)",
  },
  {
    id: "trekvano",
    n: "06",
    name: "Trekvano",
    mark: "TV",
    tag: "EDUCATION",
    tint: "#2AA8C4",
    desc: "School van and student tracking system with live parent notifications.",
    shot: "/shots/trekvano.jpg",
    wash: "rgba(42, 168, 196, 0.16)",
  },
  {
    id: "NurseWorth",
    n: "07",
    name: "NurseWorth",
    mark: "NW",
    tag: "HEALTHCARE",
    tint: "#8B3FE8",
    desc: "Healthcare and nursing recruitment platform with shift-based payouts.",
    shot: "/shots/mapmypay.jpg",
    wash: "rgba(139, 63, 232, 0.16)",
  },
  {
    id: "purespace",
    n: "08",
    name: "PureSpace",
    mark: "PS",
    tag: "HOME SERVICES",
    tint: "#4338CA",
    desc: "Cleaning and home service booking platform with route-optimised crews.",
    shot: "/shots/localeeclean.jpg",
    wash: "rgba(67, 56, 202, 0.16)",
  },
  {
    id: "Textora",
    n: "09",
    name: "Textora",
    mark: "TT",
    tag: "COMMUNICATION",
    tint: "#0C0C0D",
    desc: "Bulk SMS and business communication platform with delivery analytics.",
    shot: "/shots/textgem.jpg",
    wash: "rgba(241, 240, 236, 0.08)",
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
      { name: "AI Solutions", desc: "Forecasting, routing and instructions", tint: "#0F8F87", product: "Dishly", href: "/solutions/ai-solutions" },
      { name: "Custom Software", desc: "Workflows shaped to your operation", tint: "#1E9E5A", product: "WelzoKart", href: "/solutions/custom-software" },
      { name: "Web Applications", desc: "Dashboards on one component system", tint: "#1F31E8", product: "Slota", href: "/solutions/web-applications" },
      { name: "Mobile Apps", desc: "Customer, rider, crew and field apps", tint: "#2AA8C4", product: "Trekvano", href: "/solutions/mobile-applications" },
      { name: "Enterprise Systems", desc: "SSO, roles, audit trails, compliance", tint: "#8B3FE8", product: "NurseWorth", href: "/solutions/enterprise-systems" },
      { name: "Cloud Infrastructure", desc: "Multi-region AWS with autoscaling", tint: "#E8A21F", product: "LoadGo", href: "/solutions/cloud-infrastructure" },
    ],
  },
  technology: {
    key: "technology",
    label: "Technology",
    eyebrow: "One toolchain across all nine products",
    items: [
      { name: "React", desc: "Component system for every dashboard", tint: "#1F31E8", product: "Slota", href: "/technology#tech-reactjs", icon: "/technology/reactjs.png" },
      { name: "Next.js", desc: "Marketing and portal surfaces", tint: "#0C0C0D", product: "Textora", href: "/technology#tech-nextjs", icon: "/technology/nextjs.svg" },
      { name: "React Native", desc: "Shared iOS and Android codebase", tint: "#2AA8C4", product: "Trekvano", href: "/technology#tech-react-native", icon: "/technology/React-Native.png" },
      { name: "Node.js", desc: "Realtime services and APIs", tint: "#1E9E5A", product: "WelzoKart", href: "/technology#tech-nodejs", icon: "/technology/nodejs.png" },
      { name: "Laravel", desc: "Billing, admin and back office", tint: "#E0452F", product: "Needly", href: "/technology#tech-php", icon: "/technology/Laravel.png" },
      { name: "AWS", desc: "Infrastructure as code, staged rollouts", tint: "#E8A21F", product: "LoadGo", href: "/technology#tech-aws", icon: "/technology/aws.svg" },
      { name: "AI/ML", desc: "Intelligent automation and data-driven insights", tint: "#8B3FE8", product: "", href: "/technology#tech-python", icon: "/technology/ai-ml.svg" },
      { name: "View More", desc: "Discover more tools behind our products", tint: "#8B3FE8", product: "NurseWorth", href: "/technology#frontend" },
    ],
  },
};

export const MENU_KEYS = ["products", "solutions", "technology"] as const;
