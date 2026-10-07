export interface ContactDesk {
  name: string;
  tint: string;
  desc: string;
  sla: string;
}

export interface ContactStep {
  n: string;
  title: string;
  desc: string;
}

export interface ContactFaq {
  q: string;
  a: string;
}

export const CONTACT_TINTS = {
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

export const CONTACT_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,000+",
];

export const CONTACT_PRODUCTS = [
  "Slota",
  "WelzoKart",
  "NurseWorth",
  "LoadGo",
  "Dishly",
  "Trekvano",
  "Needly",
  "PureSpace",
  "Textora",
  "Not sure yet",
];
export const CONTACT_SERVICES = [
  "AI/ML Development",
  "Web Development",
  "CMS Development",
  "Mobile App Development",
  "SEO & Digital Marketing",
  "UI/UX Design",
  "Software Development",
  "Other",
];

export const CONTACT_APP_STAGES = [
  "At What Stage is your app?",
  "I need to build a mobile app from scratch",
  "I have propotype and I want to make an app",
  "My existing product needs a mobile component",
  "I am looking to improve my existing product/app",
  "I have an app idea and want to know to build an app",
  "Other"
];

export const CONTACT_START_TIMES = [
  "When do you want to start",
  "As soon as possible",
  "Next week",
  "Next month",
  "Not sure"
]

export const CONTACT_DESKS: ContactDesk[] = [
  {
    name: "Sales",
    tint: CONTACT_TINTS.blue,
    desc: "Scoping, pricing and a walkthrough on your own data.",
    sla: "One working day",
  },
  {
    name: "Support",
    tint: CONTACT_TINTS.green,
    desc: "For teams already live. Routed to the product team that owns your platform.",
    sla: "SLA-backed",
  },
  {
    name: "Partners",
    tint: CONTACT_TINTS.amber,
    desc: "Resellers and implementation partners looking to deploy the suite.",
    sla: "Two working days",
  },
  {
    name: "Careers",
    tint: CONTACT_TINTS.violet,
    desc: "Engineering, design and delivery roles across all nine products.",
    sla: "Rolling",
  },
];

export const CONTACT_STEPS: ContactStep[] = [
  {
    n: "01",
    title: "We read the brief",
    desc: "A product specialist, not a sales development rep, reviews what you sent.",
  },
  {
    n: "02",
    title: "A short reply",
    desc: "Two or three questions on volumes and integrations, plus which platform fits.",
  },
  {
    n: "03",
    title: "Walkthrough",
    desc: "A live session on a workspace configured with your roles and branches.",
  },
  {
    n: "04",
    title: "Scope in writing",
    desc: "Timeline, cost and what week one looks like, before anything is signed.",
  },
];

export const CONTACT_FAQS: ContactFaq[] = [
  {
    q: "Can we start with one product?",
    a: "Yes. Most customers start with a single platform on their own workspace and connect the others later. Identity and billing carry over when they do.",
  },
  {
    q: "How long does go-live take?",
    a: "Five weeks for a standard rollout: discovery, configuration, migration and integration, then training and launch.",
  },
  {
    q: "Do you migrate our existing data?",
    a: "Historic data is imported during weeks three and four, and your current tools are connected through our APIs and webhooks.",
  },
  {
    q: "Can it run in our own cloud?",
    a: "Private and on-premise deployment is available on the custom build engagement, along with custom SLAs and audits.",
  },
  {
    q: "Who trains our team?",
    a: "The same delivery team that configures the workspace. You get a named point of contact from week one and keep it after launch.",
  },
  {
    q: "What does support cover after launch?",
    a: "SLA-backed support, quarterly reviews and new modules as you grow, handled by the account team.",
  },
];
