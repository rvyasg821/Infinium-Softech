export interface ProductStat {
  raw: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  display: string;
}

export interface ProductItem {
  id: string;
  n: string;
  name: string;
  mark: string;
  tag: string;
  tint: string;
  wash: string;
  desc: string;
  features: string[];
  metricLabel: string;
  metric: string;
  metricDelta: string;
  shot?: string;
  logo?: string;
  apps: string;
  api: string;
  golive: string;
}

export interface InheritedFeature {
  name: string;
  desc: string;
  tint: string;
}

export interface CompareRow {
  name: string;
  tag: string;
  apps: string;
  api: string;
  golive: string;
  tint: string;
}

export const PRODUCT_STATS: ProductStat[] = [
  {
    raw: 9,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Proprietary products, all in production",
    display: "9",
  },
  {
    raw: 9,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Industries served end to end",
    display: "9",
  },
  {
    raw: 24860,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Businesses onboarded across the platform",
    display: "24,860",
  },
  {
    raw: 99.95,
    decimals: 2,
    prefix: "",
    suffix: "%",
    label: "Platform uptime over the last 12 months",
    display: "99.95%",
  },
];

export const PRODUCT_ITEMS: ProductItem[] = [
  {
    id: "slota",
    n: "01",
    name: "Slota",
    mark: "SL",
    tag: "Bookings",
    tint: "#1F31E8",
    wash: "#EEF0FE",
    desc: "Business booking and management platform for appointment-led teams.",
    features: ["Calendar sync", "Staff rostering", "Payments"],
    metricLabel: "Bookings / month",
    metric: "18,412",
    metricDelta: "▲ 16.4%",
    shot: "/shots/slota.png",
    logo: "/logos/slota-logo.png",
    apps: "Web, staff mobile",
    api: "REST + webhooks",
    golive: "4–6 weeks",
  },
  {
    id: "welzokart",
    n: "02",
    name: "WelzoKart",
    mark: "WK",
    tag: "Quick commerce",
    tint: "#1E9E5A",
    wash: "#ECF7F1",
    desc: "Quick commerce marketplace combining grocery and restaurant delivery.",
    features: ["Live dispatch", "Catalogue", "Rider app"],
    metricLabel: "Orders / month",
    metric: "92,640",
    metricDelta: "▲ 24.8%",
    shot: "/shots/Welzokart 2.jpg",
    logo: "/logos/welzokart-logo.png",
    apps: "Web, customer, rider",
    api: "REST + POS sync",
    golive: "8–10 weeks",
  },
  {
    id: "NurseWorth",
    n: "03",
    name: "NurseWorth",
    mark: "MP",
    tag: "Healthcare",
    tint: "#8B3FE8",
    wash: "#F4EEFE",
    desc: "Healthcare and nursing recruitment platform with shift-based payouts.",
    features: ["Credentialing", "Shift matching", "Payouts"],
    metricLabel: "Shifts filled",
    metric: "6,204",
    metricDelta: "▲ 18.2%",
    shot: "/shots/mapmypay.jpg",
    apps: "Web, nurse mobile",
    api: "HRMS + payroll",
    golive: "6–8 weeks",
  },
  {
    id: "loadgo",
    n: "04",
    name: "LoadGo",
    mark: "TG",
    tag: "Logistics",
    tint: "#E8A21F",
    wash: "#FDF5E7",
    desc: "Transport and truck booking ecosystem across long-haul and regional lanes.",
    features: ["Load matching", "Live tracking", "E-docs"],
    metricLabel: "Loads moved",
    metric: "11,842",
    metricDelta: "▲ 13.9%",
    shot: "/shots/truckguru.jpg",
    apps: "Web, driver, shipper",
    api: "GPS + ERP",
    golive: "8–12 weeks",
  },
  {
    id: "dishly",
    n: "05",
    name: "Dishly",
    mark: "MM",
    tag: "Kitchen AI",
    tint: "#0F8F87",
    wash: "#EAF5F4",
    desc: "AI-powered cooking and menu instruction platform for multi-outlet kitchens.",
    features: ["Recipe steps", "Portion control", "Waste tracking"],
    metricLabel: "Kitchens live",
    metric: "340",
    metricDelta: "▲ 22.6%",
    shot: "/shots/dayView.webp",
    apps: "Web, kitchen tablet",
    api: "Inventory + POS",
    golive: "5–7 weeks",
  },
  {
    id: "trekvano",
    n: "06",
    name: "Trekvano",
    mark: "TV",
    tag: "Education",
    tint: "#2AA8C4",
    wash: "#EAF5F8",
    desc: "School van and student tracking system with live parent notifications.",
    features: ["Route tracking", "Parent alerts", "Attendance"],
    metricLabel: "Vans tracked",
    metric: "2,140",
    metricDelta: "▲ 11.4%",
    shot: "/shots/trekvano.jpg",
    apps: "Web, parent, driver",
    api: "GPS + SIS",
    golive: "4–6 weeks",
  },
  {
    id: "needly",
    n: "07",
    name: "Needly",
    mark: "ND",
    tag: "Marketplace",
    tint: "#E0452F",
    wash: "#FDEFEC",
    desc: "Daily needs buy and sell marketplace with verified neighbourhood listings.",
    features: ["Verified sellers", "Chat", "Escrow"],
    metricLabel: "Active listings",
    metric: "58,020",
    metricDelta: "▲ 26.1%",
    shot: "/shots/Reporting.webp",
    apps: "Web, buyer, seller",
    api: "Payments + KYC",
    golive: "6–8 weeks",
  },
  {
    id: "purespace",
    n: "08",
    name: "PureSpace",
    mark: "LE",
    tag: "Home services",
    tint: "#4338CA",
    wash: "#EEEEFC",
    desc: "Cleaning and home service booking platform with route-optimised crews.",
    features: ["Crew routing", "Recurring jobs", "CSAT"],
    metricLabel: "Jobs completed",
    metric: "7,912",
    metricDelta: "▲ 15.2%",
    shot: "/shots/localeeclean.jpg",
    apps: "Web, crew mobile",
    api: "Maps + payments",
    golive: "5–7 weeks",
  },
  {
    id: "Textora",
    n: "09",
    name: "Textora",
    mark: "TX",
    tag: "Communication",
    tint: "#0C0C0D",
    wash: "#F2F2F1",
    desc: "Bulk SMS and business communication platform with delivery analytics.",
    features: ["Campaigns", "OTP API", "Delivery logs"],
    metricLabel: "Messages / month",
    metric: "3.42 M",
    metricDelta: "▲ 28.6%",
    shot: "/shots/textgem.jpg",
    apps: "Web console",
    api: "SMS + DLT gateways",
    golive: "2–3 weeks",
  },
];

export const INHERITED_FEATURES: InheritedFeature[] = [
  {
    name: "Sign-in & roles",
    desc: "One account model with permissions per role and branch.",
    tint: "#1F31E8",
  },
  {
    name: "Billing & invoicing",
    desc: "Subscriptions, usage and tax handling shared across products.",
    tint: "#1E9E5A",
  },
  {
    name: "Reporting",
    desc: "The same dashboards, exports and scheduled reports everywhere.",
    tint: "#E8A21F",
  },
  {
    name: "Cloud & security",
    desc: "Multi-region AWS, encrypted at rest, audited access logs.",
    tint: "#8B3FE8",
  },
  {
    name: "Support & SLA",
    desc: "One escalation path and a named lead per deployment.",
    tint: "#2AA8C4",
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Bookings",
  "Quick commerce",
  "Healthcare",
  "Logistics",
  "Kitchen AI",
  "Education",
  "Marketplace",
  "Home services",
  "Communication",
] as const;
