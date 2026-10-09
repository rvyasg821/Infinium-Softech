"use client";

import { useEffect } from "react";

export function ClientScrollSpy() {
  useEffect(() => {
    // Select all h2 tags with an id within .privacy-data, .terms-data
    const headings = Array.from(
      document.querySelectorAll(".privacy-data h2[id], .terms-data h2[id]")
    );
    const navLinks = document.querySelectorAll(".sidebar-link");

    if (headings.length === 0 || navLinks.length === 0) return;

    // Use IntersectionObserver to highlight the current section in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove active from all
            navLinks.forEach((link) => link.classList.remove("active"));
            // Add active to the corresponding link
            const id = entry.target.id;
            const activeLink = document.querySelector(`.sidebar-link[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add("active");
            }
          }
        });
      },
      { 
        // Trigger when the element is just past the sticky header (120px) 
        // down to about 60% of the screen height
        rootMargin: "-130px 0px -70% 0px", 
        threshold: 0 
      }
    );

    headings.forEach((h) => observer.observe(h));

    // Handle initial state setup
    setTimeout(() => {
      // Find the first heading that is currently above the bottom of the viewport
      // If we're at the very top, just make the first one active
      if (window.scrollY < 100) {
        if (navLinks.length > 0) {
          navLinks[0].classList.add("active");
        }
      }
    }, 100);

    return () => observer.disconnect();
  }, []);

  return null;
}
