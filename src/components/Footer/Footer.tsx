"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Footer.scss";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  items: FooterLinkItem[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    items: [
      { label: "Slota", href: "/products/slota" },
      { label: "WelzoKart", href: "/products/welzokart" },
      { label: "NurseWorth", href: "/products/NurseWorth" },
      { label: "LoadGo", href: "/products/loadgo" },
      { label: "Trekvano", href: "/products/trekvano" },
      { label: "Textora", href: "/products/Textora" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Mobile Apps", href: "/solutions/mobile-applications" },
      { label: "Web Applications", href: "/solutions/web-applications" },
      { label: "Custom Software", href: "/solutions/custom-software" },
      { label: "AI Solutions", href: "/solutions/ai-solutions" },
      { label: "Enterprise Systems", href: "/solutions/enterprise-systems" },
      { label: "Cloud Infrastructure", href: "/solutions/cloud-infrastructure" },
    ],
  },
  {
    title: "Technology",
    items: [
      { label: "React", href: "/technology#tech-reactjs" },
      { label: "Next.js", href: "/technology#tech-nextjs" },
      { label: "Flutter", href: "/technology#tech-flutter" },
      { label: "Node.js", href: "/technology#tech-nodejs" },
      { label: "Laravel", href: "/technology#tech-php" },
      { label: "AWS", href: "/technology#tech-aws" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Demo", href: "/book-a-demo" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Security", href: "/book-a-demo" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { name: "YouTube", icon: YoutubeIcon, href: "https://youtube.com" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const [openColumn, setOpenColumn] = useState<string | null>(null);

  const toggleColumn = (title: string) => {
    setOpenColumn((prev) =>
      prev === title ? null : title
    );
  };

  return (
    <footer className="site-footer">
      <div className="top">

        {/* Brand */}
        <div data-reveal="" className="brand">
          <Image
            src="/brand/logo-light.png"
            alt="Infinium Softech"
            width={154}
            height={35}
          />

          <p>
            Nine proprietary products. One unified platform. Built for
            operators across logistics, healthcare, commerce, education
            and services.
          </p>

          <div className="social-links">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-icon-btn"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer Columns */}
        {FOOTER_COLUMNS.map((col) => {
          const isOpen = openColumn === col.title;

          return (
            <div
              data-reveal=""
              key={col.title}
              className={`column ${isOpen ? "is-open" : ""}`}
            >
              {/* Column Header */}
              <button
                type="button"
                className="column-header-btn"
                onClick={() => toggleColumn(col.title)}
                aria-expanded={isOpen}
              >
                <span className="column-title">
                  {col.title}
                </span>

                <span
                  className="toggle-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* Dropdown Links */}
              <div className="column-list-wrapper">
                <ul className="column-list">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <div data-reveal="" className="bottom">
        <div>
          © {year} Infinium Softech. All rights reserved.
        </div>

        <div className="legal">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}