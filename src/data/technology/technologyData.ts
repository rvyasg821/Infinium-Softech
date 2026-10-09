export interface IndividualTechItem {
  id: string;
  category: string;
  categoryName: string;
  title: string;
  description: string;
  image: string | null;
  color: string;
}

export interface CategoryHeader {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  color: string;
}

export interface HeroIndexItem {
  num: string;
  title: string;
  color: string;
  href: string;
}

export const TECHNOLOGY_HERO_INDEX_ITEMS: HeroIndexItem[] = [
  { num: "01", title: "Frontend Tech", color: "#2AA8C4", href: "#frontend" },
  { num: "02", title: "Backend Tech", color: "#1F31E8", href: "#backend" },
  { num: "03", title: "Mobile Tech", color: "#1E9E5A", href: "#mobile" },
  { num: "04", title: "Database Systems", color: "#0F8F87", href: "#database" },
  { num: "05", title: "CMS Solutions", color: "#8B3FE8", href: "#cms" },
  { num: "06", title: "Cloud & DevOps", color: "#E8A21F", href: "#cloud-devops" },
  { num: "07", title: "Design Tools", color: "#E0452F", href: "#design-tools" },
];

export const CATEGORY_HEADERS: Record<string, CategoryHeader> = {
  frontend: {
    id: "frontend",
    num: "01",
    title: "Frontend Tech",
    subtitle: "Frontend Frameworks & Modern Web Interfaces",
    color: "#2AA8C4",
  },
  backend: {
    id: "backend",
    num: "02",
    title: "Backend Tech",
    subtitle: "Scalable Server Architectures & Microservices",
    color: "#1F31E8",
  },
  mobile: {
    id: "mobile",
    num: "03",
    title: "Mobile Tech",
    subtitle: "Native & Cross-Platform Mobile Applications",
    color: "#1E9E5A",
  },
  database: {
    id: "database",
    num: "04",
    title: "Database Systems",
    subtitle: "High-Availability Data & Storage Engines",
    color: "#0F8F87",
  },
  cms: {
    id: "cms",
    num: "05",
    title: "CMS Solutions",
    subtitle: "Content Management & E-Commerce Platforms",
    color: "#8B3FE8",
  },
  "cloud-devops": {
    id: "cloud-devops",
    num: "06",
    title: "Cloud & DevOps",
    subtitle: "Cloud Infrastructure, Containers & Orchestration",
    color: "#E8A21F",
  },
  "design-tools": {
    id: "design-tools",
    num: "07",
    title: "Design Tools",
    subtitle: "UX/UI Design, Wireframing & Prototyping",
    color: "#E0452F",
  },
};

export const INDIVIDUAL_TECH_ITEMS: IndividualTechItem[] = [
  // FRONTEND TECH
  {
    id: "angularjs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Angular.js",
    description:
      "Angular.js is a powerful JavaScript framework developed by Google for building dynamic, single-page web applications. It extends HTML with additional attributes and binds data using a two-way data binding approach. With features like dependency injection, reusable components, and built-in routing, Angular.js simplifies complex front-end development. Our developers use it to deliver structured, maintainable, and enterprise-ready web interfaces.",
    image: "/technology/angularjs-service.png",
    color: "#2AA8C4",
  },
  {
    id: "reactjs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "React.js",
    description:
      "React.js is a fast, flexible JavaScript library developed by Facebook for building interactive user interfaces. It uses a component-based architecture and a virtual DOM, allowing developers to create scalable, high-performing web applications with reusable UI blocks. Combined with state management tools and a rich ecosystem, React helps us build dashboards, portals, and customer-facing products that stay fast as they grow.",
    image: "/technology/reactjs.png",
    color: "#2AA8C4",
  },
  {
    id: "vuejs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Vue.js",
    description:
      "Vue.js is a progressive JavaScript framework used for building interactive and flexible user interfaces. Known for its simplicity and ease of integration, Vue lets developers create responsive single-page applications or enhance existing projects with reusable components. It is lightweight, beginner-friendly, and scalable, making it a popular choice for startups and enterprises that want fast, efficient, and maintainable front-end solutions.",
    image: "/technology/vue.png",
    color: "#2AA8C4",
  },
  {
    id: "javascript",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "JavaScript (ES6+)",
    description:
      "JavaScript is the core scripting language of the modern web, powering interactive elements, asynchronous event handling, API communication, and complex application logic. With modern ES6+ features such as modules, arrow functions, promises, and async/await, our developers write clean, efficient code that runs across browsers and also powers full-stack development on the server through Node.js.",
    image: "/technology/JS.png",
    color: "#2AA8C4",
  },
  {
    id: "html5",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "HTML5",
    description:
      "HTML5 is the standard markup language for structuring web content. It brings semantic elements, native audio and video support, canvas graphics, form validation, and offline capabilities that make websites faster, more accessible, and easier for search engines to understand. We use clean, semantic HTML5 as the foundation of every SEO-friendly and responsive web project we deliver.",
    image: "/technology/HTML5.png",
    color: "#2AA8C4",
  },
  {
    id: "css3",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "CSS3",
    description:
      "CSS3 is the latest evolution of Cascading Style Sheets, used to style and format HTML elements with modern layouts, transitions, animations, and media queries. With Flexbox, CSS Grid, and custom properties, we craft pixel-perfect, fully responsive designs that look and perform consistently across desktops, tablets, and mobile devices.",
    image: "/technology/css3.png",
    color: "#2AA8C4",
  },
  {
    id: "tailwindcss",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Tailwind CSS",
    description:
      "Tailwind CSS is a utility-first CSS framework that lets developers build custom user interfaces directly in their markup using small, composable classes. It removes the need for large custom stylesheets, keeps designs consistent, and ships only the CSS that is actually used. Our team relies on Tailwind to deliver modern, responsive interfaces quickly without compromising on design flexibility.",
    image: "/technology/Tailwind-CSS.png",
    color: "#2AA8C4",
  },
  {
    id: "bootstrap",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Bootstrap",
    description:
      "Bootstrap is a popular front-end toolkit for building responsive, mobile-first websites. Its flexible grid system and library of ready-made components such as navigation bars, modals, forms, and cards help teams speed up development while keeping the interface consistent. It is an excellent choice for business websites, admin panels, and MVPs that need to go live quickly.",
    image: "/technology/Bootstrap.png",
    color: "#2AA8C4",
  },
  {
    id: "nextjs",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "Next.js",
    description:
      "Next.js is a powerful React-based framework designed for building fast, scalable, and SEO-friendly web applications. It supports server-side rendering, static site generation, automatic routing, image optimization, and API routes out of the box. With Next.js, we simplify complex development tasks and deliver high-performance websites that rank well and load quickly.",
    image: "/technology/nextjs.svg",
    color: "#2AA8C4",
  },
  {
    id: "typescript",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "TypeScript",
    description:
      "TypeScript is a strongly typed superset of JavaScript developed by Microsoft. It adds static typing, interfaces, and advanced tooling that catch errors early and make large codebases easier to read, refactor, and maintain. It integrates seamlessly with frameworks like Angular, React, Vue, and Node.js, making it ideal for scalable, enterprise-grade applications.",
    image: "/technology/typescript.png",
    color: "#2AA8C4",
  },
  {
    id: "jquery",
    category: "frontend",
    categoryName: "Frontend Tech",
    title: "jQuery",
    description:
      "jQuery is a lightweight, fast JavaScript library that simplifies HTML DOM manipulation, event handling, animations, and Ajax requests. While newer frameworks now dominate, jQuery remains widely used in existing websites and legacy platforms. Our developers maintain, upgrade, and extend jQuery-based projects, and help migrate them to modern frameworks when the time is right.",
    image: "/technology/jquery.svg",
    color: "#2AA8C4",
  },

  // BACKEND TECH
  {
    id: "nodejs",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Node.js",
    description:
      "Node.js is an open-source JavaScript runtime built on Chrome's V8 engine, designed for building fast and scalable server-side applications. Its event-driven, non-blocking architecture handles thousands of concurrent connections efficiently, making it ideal for real-time apps, REST and GraphQL APIs, and microservices. With frameworks like Express and Nest.js, we build secure, high-performance back-end systems.",
    image: "/technology/nodejs.png",
    color: "#1F31E8",
  },
  {
    id: "python",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Python",
    description:
      "Python is a versatile, easy-to-read programming language used for web back ends, APIs, automation, data processing, and machine learning. With frameworks such as Django, Flask, and FastAPI, it enables rapid development of secure and scalable applications. Our Python developers deliver everything from enterprise platforms to data-driven and AI-powered solutions.",
    image: "/technology/Python.png",
    color: "#1F31E8",
  },
  {
    id: "java",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Java",
    description:
      "Java is a secure, object-oriented programming language known for its platform independence, stability, and strong performance. With Spring Boot and a mature ecosystem, it is a trusted choice for large-scale enterprise applications, banking systems, and microservice architectures. Our Java team builds robust, multithreaded back ends designed for reliability and long-term maintainability.",
    image: "/technology/java.svg",
    color: "#1F31E8",
  },
  {
    id: "php",
    category: "backend",
    categoryName: "Backend Tech",
    title: "PHP & Laravel",
    description:
      "PHP is a widely used server-side scripting language that powers a large share of the web. Paired with Laravel, it offers elegant routing, a powerful ORM, built-in authentication, queues, and a clean MVC structure. We use PHP and Laravel to build secure, scalable web applications, custom CMS platforms, and API back ends with faster time to market.",
    image: "/technology/php.png",
    color: "#1F31E8",
  },
  {
    id: "nestjs",
    category: "backend",
    categoryName: "Backend Tech",
    title: "Nest.js",
    description:
      "Nest.js is a progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications. Inspired by Angular's architecture, it promotes a modular structure and clean code organization, with first-class TypeScript support. It is well suited to microservices, REST and GraphQL APIs, and large teams that need consistent, testable code.",
    image: "/technology/nodejs.png",
    color: "#1F31E8",
  },

  // MOBILE TECH
  {
    id: "android",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Android Native",
    description:
      "Android native development uses Java and Kotlin with Android Studio and Jetpack libraries to build fast, reliable apps that make full use of device features such as camera, GPS, sensors, and notifications. We design Android apps that run smoothly across a wide range of devices and screen sizes, from consumer apps to enterprise mobility solutions.",
    image: "/technology/android.png",
    color: "#1E9E5A",
  },
  {
    id: "ios",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "iOS & Swift",
    description:
      "iOS native development with Swift, SwiftUI, and Apple's SDKs allows us to craft smooth, secure, and intuitive apps for iPhone and iPad. We follow Apple's Human Interface Guidelines and App Store standards so your app delivers a polished experience, integrates with Apple services, and passes review with confidence.",
    image: "/technology/IOS.png",
    color: "#1E9E5A",
  },
  {
    id: "kotlin",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Kotlin",
    description:
      "Kotlin is a modern, concise, and type-safe programming language that is Google's preferred choice for Android development. It reduces boilerplate, prevents common null-pointer errors, and works seamlessly with existing Java code. With Kotlin and Kotlin Multiplatform, we build cleaner, more maintainable mobile apps and share logic across platforms.",
    image: "/technology/Kotlin.png",
    color: "#1E9E5A",
  },
  {
    id: "flutter",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Flutter",
    description:
      "Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Dart. Its rich widget library and fast rendering deliver near-native performance and consistent visuals on iOS and Android, helping you launch faster and reduce development and maintenance costs.",
    image: "/technology/Flutter.png",
    color: "#1E9E5A",
  },
  {
    id: "react-native",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "React Native",
    description:
      "React Native lets developers build native iOS and Android apps using JavaScript and React, sharing most of the code between platforms while rendering true native components. It offers faster development cycles, hot reloading, and a large ecosystem of libraries, making it a cost-effective way to bring your product to both app stores.",
    image: "/technology/React-Native.png",
    color: "#1E9E5A",
  },
  {
    id: "ionic",
    category: "mobile",
    categoryName: "Mobile Tech",
    title: "Ionic Framework",
    description:
      "Built on top of Angular, with support for React and Vue, Ionic offers a library of pre-built UI components and native plugins for building cross-platform apps using standard web technologies. It is ideal for fast, responsive, and cost-effective app development, allowing one codebase to serve iOS, Android, and the web.",
    image: "/technology/android.png",
    color: "#1E9E5A",
  },

  // DATABASE SYSTEMS
  {
    id: "mongodb",
    category: "database",
    categoryName: "Database Systems",
    title: "MongoDB",
    description:
      "MongoDB is a leading NoSQL document database that stores data in flexible, JSON-like documents. Its dynamic schema, automatic sharding, and horizontal scaling make it a great fit for fast-changing data, real-time analytics, and high-traffic applications. We use MongoDB to build responsive back ends that grow smoothly with your business.",
    image: "/technology/MongoDB.png",
    color: "#0F8F87",
  },
  {
    id: "mysql",
    category: "database",
    categoryName: "Database Systems",
    title: "MySQL",
    description:
      "MySQL is an open-source relational database management system trusted worldwide for its speed, reliability, and ease of use. It supports ACID transactions, indexing, replication, and powerful SQL querying, making it a dependable choice for web applications, e-commerce platforms, and business systems of every size.",
    image: "/technology/mysql.svg",
    color: "#0F8F87",
  },
  {
    id: "mssql",
    category: "database",
    categoryName: "Database Systems",
    title: "MS SQL Server",
    description:
      "MS SQL Server is Microsoft's enterprise-grade relational database platform, offering strong security, T-SQL programming, business intelligence, and data warehousing tools. It integrates smoothly with the .NET and Azure ecosystems, and we use it to build reliable, high-performing data solutions for mission-critical business applications.",
    image: "/technology/mssql.png",
    color: "#0F8F87",
  },
  {
    id: "postgresql",
    category: "database",
    categoryName: "Database Systems",
    title: "PostgreSQL",
    description:
      "PostgreSQL is a powerful open-source object-relational database known for its reliability, extensibility, and standards compliance. It handles complex queries, large datasets, JSON data, and geospatial workloads with ease. We choose PostgreSQL for applications that demand data integrity, advanced features, and long-term scalability.",
    image: "/technology/Postgre-SQL.png",
    color: "#0F8F87",
  },
  {
    id: "oracle",
    category: "database",
    categoryName: "Database Systems",
    title: "Oracle Database",
    description:
      "Oracle Database is a multi-model, enterprise-grade database system built for high availability, security, and mission-critical workloads. With advanced features such as partitioning, clustering, and robust backup and recovery, it supports large-scale transaction processing and analytics for demanding organizations.",
    image: "/technology/Oracle.png",
    color: "#0F8F87",
  },

  // CMS SOLUTIONS
  {
    id: "wordpress",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "WordPress",
    description:
      "WordPress is the world's most popular content management system, powering everything from blogs to large corporate websites. Its flexible theme and plugin architecture lets us build fully customized, SEO-friendly, and easy-to-manage sites, so your team can update content without any technical help.",
    image: "/technology/WordPress.png",
    color: "#8B3FE8",
  },
  {
    id: "woocommerce",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "WooCommerce",
    description:
      "WooCommerce turns a WordPress website into a fully functional online store. It supports flexible product catalogs, secure payment gateways, shipping options, coupons, and inventory management. We customize WooCommerce to create smooth shopping experiences that scale with your product range and sales volume.",
    image: "/technology/woocommerce.png",
    color: "#8B3FE8",
  },
  {
    id: "shopify",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Shopify",
    description:
      "Shopify is an all-in-one e-commerce platform that handles hosting, checkout, payments, and store management. Our team builds custom themes, integrates apps, and optimizes storefronts for speed and conversions, helping merchants launch and grow online stores with minimal technical overhead.",
    image: "/technology/Shopify.png",
    color: "#8B3FE8",
  },
  {
    id: "magento",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Magento (Adobe Commerce)",
    description:
      "Magento, now Adobe Commerce, is an open-source enterprise e-commerce platform known for its flexibility and scalability. It supports multi-store setups, complex catalogs, B2B features, and deep customization. We build and extend Magento stores for businesses that need advanced commerce capabilities.",
    image: "/technology/Magento.png",
    color: "#8B3FE8",
  },
  {
    id: "drupal",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Drupal",
    description:
      "Drupal is an open-source CMS built for complex, secure, and content-heavy websites. With fine-grained user permissions, multilingual support, and a highly modular architecture, it is a strong choice for enterprises, government portals, and organizations with demanding content workflows.",
    image: "/technology/drupal.png",
    color: "#8B3FE8",
  },
  {
    id: "strapi",
    category: "cms",
    categoryName: "CMS Solutions",
    title: "Strapi Headless CMS",
    description:
      "Strapi is an open-source headless CMS that lets developers build customizable REST and GraphQL APIs and deliver content to any front end, including React and Next.js. Editors get an intuitive admin panel, while developers keep full control, giving you flexible content delivery across web and mobile channels.",
    image: "/technology/Squarespace-.png",
    color: "#8B3FE8",
  },

  // CLOUD & DEVOPS
  {
    id: "aws",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "AWS (Amazon Web Services)",
    description:
      "AWS provides a broad set of cloud services including EC2, S3, RDS, Lambda, and CloudFront. We design, deploy, and manage secure, highly available cloud architectures on AWS that scale automatically with demand, while keeping infrastructure costs under control.",
    image: "/technology/AWS_black.png",
    color: "#E8A21F",
  },
  {
    id: "azure",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Microsoft Azure",
    description:
      "Microsoft Azure is a comprehensive cloud platform for building, testing, deploying, and managing applications across global data centers. With strong hybrid cloud support and tight integration with Microsoft tools, we use Azure to deliver secure, compliant, and scalable solutions for enterprises.",
    image: "/technology/Azure.png",
    color: "#E8A21F",
  },
  {
    id: "gcp",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Google Cloud Platform",
    description:
      "Google Cloud Platform offers scalable infrastructure, BigQuery analytics, Firebase, and managed Kubernetes services. We leverage GCP for data-driven applications, real-time backends, and containerized workloads that need performance, reliability, and global reach.",
    image: "/technology/googlecloude.png",
    color: "#E8A21F",
  },
  {
    id: "docker",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Docker",
    description:
      "Docker packages applications and their dependencies into lightweight containers, so they run the same way in development, testing, and production. It speeds up deployments, simplifies environment setup, and makes microservice architectures easier to build and maintain.",
    image: "/technology/docker.png",
    color: "#E8A21F",
  },
  {
    id: "kubernetes",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Kubernetes",
    description:
      "Kubernetes automates the deployment, scaling, load balancing, and self-healing of containerized applications across hybrid and multi-cloud environments. We use it to run resilient, production-grade workloads with zero-downtime releases and efficient resource usage.",
    image: "/technology/kubernetes.png",
    color: "#E8A21F",
  },
  {
    id: "openshift",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Red Hat OpenShift",
    description:
      "OpenShift is Red Hat's enterprise Kubernetes platform, adding developer automation, built-in CI/CD, and strong security policies on top of container orchestration. It helps organizations manage applications consistently across on-premise and multi-cloud environments.",
    image: "/technology/OpenShift.png",
    color: "#E8A21F",
  },
  {
    id: "terraform",
    category: "cloud-devops",
    categoryName: "Cloud & DevOps",
    title: "Terraform",
    description:
      "Terraform by HashiCorp is an Infrastructure as Code tool that provisions and manages cloud resources through declarative configuration files. It makes infrastructure repeatable, version-controlled, and easy to replicate across AWS, Azure, and Google Cloud, reducing manual errors and setup time.",
    image: "/technology/terraform.png",
    color: "#E8A21F",
  },

  // DESIGN TOOLS
  {
    id: "figma",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Figma",
    description:
      "Figma is a collaborative, browser-based design tool for interface design, prototyping, and design systems. Teams and clients can work together in real time, leave feedback directly on designs, and hand off assets smoothly to developers, which shortens the path from idea to final product.",
    image: "/technology/Figma.png",
    color: "#E0452F",
  },
  {
    id: "sketch",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Sketch",
    description:
      "Sketch is a macOS design platform focused on vector editing, reusable symbols, and UI design for web and mobile. Its clean workflow and large plugin ecosystem help our designers create consistent, scalable design systems and polished interface mockups.",
    image: "/technology/Sketch.png",
    color: "#E0452F",
  },
  {
    id: "canva",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Canva",
    description:
      "Canva is a versatile graphic design platform for creating branding assets, marketing collateral, presentations, and social media content quickly. We use it to produce on-brand visuals and editable templates that your team can reuse and update on its own.",
    image: "/technology/Canva.png",
    color: "#E0452F",
  },
  {
    id: "illustrator",
    category: "design-tools",
    categoryName: "Design Tools",
    title: "Adobe Illustrator & Photoshop",
    description:
      "Adobe Illustrator and Photoshop are industry-standard tools for vector illustration, logo and brand identity design, photo editing, and digital artwork. Our creative team uses them to produce high-quality visual assets that give your website, app, and marketing materials a distinctive look.",
    image: "/technology/Adobe-Illustrator.png",
    color: "#E0452F",
  },
];