export interface AboutBelief {
  name: string;
  tint: string;
  desc: string;
}

export interface AboutProduct {
  n: string;
  name: string;
  mark: string;
  tag: string;
  tint: string;
  desc: string;
}

export interface AboutDeliveryStep {
  n: string;
  time: string;
  title: string;
  desc: string;
  owner: string;
  tint: string;
}

export interface AboutIndustry {
  name: string;
  tint: string;
}

export interface AboutEngagement {
  title: string;
  fit: string;
  tint: string;
}

export const ABOUT_TINTS = {
  blue: "#1F31E8",
  green: "#1E9E5A",
  amber: "#E8A21F",
  violet: "#8B3FE8",
  teal: "#0F8F87",
  cyan: "#2AA8C4",
  rose: "#E0452F",
  indigo: "#4338CA",
  ink: "#0C0C0D",
};

export const ABOUT_BELIEFS: AboutBelief[] = [
  {
    name: "Products, not projects",
    tint: ABOUT_TINTS.blue,
    desc: "We build, launch, and continuously improve products designed to solve real business challenges.",
  },
  {
    name: "One Foundation. Consistent Standards.",
    tint: ABOUT_TINTS.green,
    desc: "Shared technology, security, and engineering standards create consistency across our growing product ecosystem.",
  },
  {
    name: "Built Around Real Work",
    tint: ABOUT_TINTS.amber,
    desc: "Real workflows and customer feedback shape products that solve practical challenges across diverse industries.",
  },
  {
    name: "From Build to Business",
    tint: ABOUT_TINTS.violet,
    desc: "We support implementation, migration, training, and rollout to help businesses achieve meaningful product adoption.",
  },
];

export const ABOUT_PRODUCTS: AboutProduct[] = [
  {
    n: "01",
    name: "Slota",
    mark: "SL",
    tag: "Bookings",
    tint: ABOUT_TINTS.blue,
    desc: "Business booking and management platform for appointment-led teams.",
  },
  {
    n: "02",
    name: "WelzoKart",
    mark: "WK",
    tag: "Quick commerce",
    tint: ABOUT_TINTS.green,
    desc: "Quick commerce marketplace combining grocery and restaurant delivery.",
  },
  {
    n: "03",
    name: "Needly",
    mark: "ND",
    tag: "Marketplace",
    tint: ABOUT_TINTS.rose,
    desc: "Daily needs buy and sell marketplace with verified neighbourhood listings.",
  },
  {
    n: "04",
    name: "LoadGo",
    mark: "TG",
    tag: "Logistics",
    tint: ABOUT_TINTS.amber,
    desc: "Transport and truck booking ecosystem across long-haul and regional lanes.",
  },
  {
    n: "05",
    name: "Dishly",
    mark: "MM",
    tag: "Kitchen AI",
    tint: ABOUT_TINTS.teal,
    desc: "AI-powered cooking and menu instruction platform for multi-outlet kitchens.",
  },
  {
    n: "06",
    name: "Trekvano",
    mark: "TV",
    tag: "Education",
    tint: ABOUT_TINTS.cyan,
    desc: "School van and student tracking system with live parent notifications.",
  },
  {
    n: "07",
    name: "NurseWorth",
    mark: "MP",
    tag: "Healthcare",
    tint: ABOUT_TINTS.violet,
    desc: "Healthcare and nursing recruitment platform with shift-based payouts.",
  },
  {
    n: "08",
    name: "PureSpace",
    mark: "LE",
    tag: "Home services",
    tint: ABOUT_TINTS.indigo,
    desc: "Cleaning and home service booking platform with route-optimised crews.",
  },
  {
    n: "09",
    name: "Textora",
    mark: "TX",
    tag: "Communication",
    tint: ABOUT_TINTS.ink,
    desc: "Bulk SMS and business communication platform with delivery analytics.",
  },
];

export const ABOUT_DELIVERY_STEPS: AboutDeliveryStep[] = [
  {
    n: "01",
    time: "Week 1",
    title: "Discovery",
    desc: "We map your current process, data and volumes, then agree the scope in writing.",
    owner: "Implementation lead",
    tint: ABOUT_TINTS.blue,
  },
  {
    n: "02",
    time: "Week 2",
    title: "Configure",
    desc: "Roles, branches, tax rules and workflows set up on your own workspace.",
    owner: "Product specialist",
    tint: ABOUT_TINTS.green,
  },
  {
    n: "03",
    time: "Weeks 3–4",
    title: "Migrate & integrate",
    desc: "Historic data imported and your existing tools connected through APIs.",
    owner: "Integration engineer",
    tint: ABOUT_TINTS.amber,
  },
  {
    n: "04",
    time: "Week 5",
    title: "Train & launch",
    desc: "Team training, parallel run, then go-live with a named point of contact.",
    owner: "Delivery manager",
    tint: ABOUT_TINTS.violet,
  },
  {
    n: "05",
    time: "Ongoing",
    title: "Support & scale",
    desc: "SLA-backed support, quarterly reviews and new modules as you grow.",
    owner: "Account team",
    tint: ABOUT_TINTS.blue,
  },
];

export const ABOUT_INDUSTRIES: AboutIndustry[] = [
  { name: "Logistics", tint: ABOUT_TINTS.amber },
  { name: "Healthcare", tint: ABOUT_TINTS.violet },
  { name: "Quick commerce", tint: ABOUT_TINTS.green },
  { name: "Education", tint: ABOUT_TINTS.cyan },
  { name: "Home services", tint: ABOUT_TINTS.indigo },
  { name: "Communication", tint: ABOUT_TINTS.ink },
  { name: "Cloud kitchens", tint: ABOUT_TINTS.teal },
  { name: "Marketplaces", tint: ABOUT_TINTS.rose },
  { name: "Appointments", tint: ABOUT_TINTS.blue },
];

export const ABOUT_ENGAGEMENTS: AboutEngagement[] = [
  {
    title: "Single product",
    fit: "One team or branch. Live in 4–6 weeks.",
    tint: ABOUT_TINTS.blue,
  },
  {
    title: "Connected suite",
    fit: "Multi-team operations sharing identity and reporting.",
    tint: ABOUT_TINTS.green,
  },
  {
    title: "Custom build",
    fit: "Regulated or national rollouts, deployed in your cloud.",
    tint: ABOUT_TINTS.violet,
  },
];
