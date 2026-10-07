"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";
import "./WelzokartFloatingActions.scss";

export function WelzokartFloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="welzokart-floating-widget" aria-label="Quick contact actions">
      <Link href="/contact" className="floating-btn btn-demo">
        <Calendar size={18} />
        <span>Book a Demo</span>
      </Link>

      <a
        href="https://wa.me/?text=Hi,%20I%20want%20to%20explore%20the%20WelzoKart%20Grocery%20Delivery%20Platform"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn btn-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={18} />
        <span>Quick Chat</span>
      </a>
    </div>
  );
}
