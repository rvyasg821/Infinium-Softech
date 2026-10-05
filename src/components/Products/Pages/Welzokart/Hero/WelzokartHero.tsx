"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ProductItem } from "@/data/productsData";
import { Factory, MonitorSmartphone, Lightbulb, Globe } from "lucide-react";
import "./WelzokartHero.scss";

export function WelzokartHero({ product }: { product: ProductItem }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <section className="welzokart-hero-lc">
      <div className="welzokart-hero-lc-container">
        
        <div className="hero-split-top">
          <div className="hero-lc-content">
            
            {/* Logo */}
            <div className="identity-top">
              <Image 
                src="/logos/welzokart-logo.png" 
                alt="WelzoKart" 
                width={180} 
                height={50} 
                className="identity-logo"
              />
            </div>

            {/* Title */}
            <h1 className="hero-lc-title">
              WelzoKart Smart Grocery Delivery App
            </h1>

            {/* Split Paragraphs */}
            <p className="hero-lc-desc">
              WelzoKart is a modern grocery delivery application for easy everyday shopping. Users can explore fresh products, daily essentials, and household items. Fast search, smooth navigation, and simple checkout enhance the experience.
            </p>
            <p className="hero-lc-desc">
              The platform focuses on usability, convenience, and customer satisfaction. Built for scalability, WelzoKart provides a reliable on-demand grocery solution.
            </p>
          </div>
          
          <div className="hero-lc-visual">
            <div className="visual-wrapper">
              <Image 
                src="/shots/Welzokart 2.jpg" 
                alt="WelzoKart App Display"
                width={800}
                height={600}
                className="hero-main-image"
                priority
              />
            </div>
          </div>
        </div>

        <div className="hero-lc-stats-row">
          <div className="stat-card">
            <div className="stat-icon">
              <Factory size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Industry</span>
              <span className="stat-val">eCommerce</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <MonitorSmartphone size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Platform</span>
              <span className="stat-val">Web & Mobile</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Lightbulb size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Solution</span>
              <span className="stat-val">Commerce Ops</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Globe size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Country</span>
              <span className="stat-val">Global</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}