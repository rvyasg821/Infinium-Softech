"use client";

import { useEffect, useState, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import {
  ArrowRight,
  MessageSquare,
  Store,
  Smartphone,
  Globe,
  Briefcase,
  // Groceries
  Apple,
  Carrot,
  Cherry,
  Banana,
  Grape,
  Citrus,
  Milk,
  Egg,
  Wheat,
  Salad,
  Leaf,
  ShoppingBasket,
  ShoppingCart,
  Croissant,
  Beef,
  Fish,
  Drumstick,
  Cookie,
  Candy,
  IceCream,
  Pizza,
  Sandwich,
  Soup,
  Coffee,
  Nut,
  Bean,
  Sprout,
  Popcorn,
  CupSoda,
  Package,
  Cake,
  Wine,
  // New: more groceries / household
  Ham,
  Hamburger,
  Donut,
  Dessert,
  Lollipop,
  Beer,
  GlassWater,
  Bone,
  Baby,
  SprayCan,
  Droplets,
  // New: medicine
  Pill,
  Stethoscope,
  Syringe,
  Thermometer,
  HeartPulse,
  Cross,
  // New: electronics
  Laptop,
  Headphones,
  Tv,
  Camera,
  Watch,
  Lightbulb,
  Plug,
  Battery,
  Speaker,
  Gamepad2,
  Keyboard,
  Printer,
} from "lucide-react";
import "./NeedlyHero.scss";

// Background decorative icons: position (%), size (px), rotation (deg), float delay (s)
const BG_ICONS = [
  // Row 1 (top)
  { Icon: Apple, top: "3%", left: "3%", size: 56, rotate: -15, delay: 0 },
  { Icon: Wheat, top: "4%", left: "14%", size: 42, rotate: -25, delay: 1.0 },
  { Icon: Carrot, top: "6%", left: "26%", size: 48, rotate: 25, delay: 1.2 },
  { Icon: Cookie, top: "3%", left: "38%", size: 40, rotate: 10, delay: 2.2 },
  { Icon: Croissant, top: "7%", left: "52%", size: 44, rotate: 15, delay: 2.0 },
  { Icon: Sprout, top: "4%", left: "64%", size: 42, rotate: -10, delay: 0.8 },
  { Icon: Candy, top: "8%", left: "76%", size: 40, rotate: 20, delay: 1.7 },
  { Icon: Cherry, top: "4%", left: "90%", size: 52, rotate: 12, delay: 0.6 },

  // Row 1.5 (new: medicine + electronics + food)
  { Icon: Pill, top: "15%", left: "9%", size: 42, rotate: -18, delay: 0.5 },
  { Icon: Laptop, top: "14%", left: "20%", size: 46, rotate: 8, delay: 1.9 },
  { Icon: Ham, top: "16%", left: "33%", size: 44, rotate: -22, delay: 0.3 },
  { Icon: Headphones, top: "14%", left: "45%", size: 44, rotate: 14, delay: 2.4 },
  { Icon: Stethoscope, top: "16%", left: "58%", size: 46, rotate: -10, delay: 1.1 },
  { Icon: Donut, top: "14%", left: "71%", size: 42, rotate: 20, delay: 0.7 },
  { Icon: Tv, top: "16%", left: "84%", size: 46, rotate: -8, delay: 1.6 },
  { Icon: Syringe, top: "13%", left: "93%", size: 40, rotate: 30, delay: 2.2 },

  // Row 2
  { Icon: Milk, top: "24%", left: "2%", size: 50, rotate: -8, delay: 1.8 },
  { Icon: Fish, top: "26%", left: "16%", size: 46, rotate: 18, delay: 0.4 },
  { Icon: Banana, top: "22%", left: "47%", size: 54, rotate: 30, delay: 0.3 },
  { Icon: Pizza, top: "27%", left: "60%", size: 44, rotate: -18, delay: 2.5 },
  { Icon: Nut, top: "24%", left: "78%", size: 38, rotate: 22, delay: 1.1 },
  { Icon: Grape, top: "28%", left: "94%", size: 48, rotate: -12, delay: 2.1 },

  // Row 2.5 (new)
  { Icon: Thermometer, top: "36%", left: "9%", size: 42, rotate: 16, delay: 1.4 },
  { Icon: Hamburger, top: "35%", left: "26%", size: 44, rotate: -14, delay: 0.8 },
  { Icon: Camera, top: "37%", left: "40%", size: 44, rotate: 10, delay: 2.0 },
  { Icon: Beer, top: "35%", left: "56%", size: 42, rotate: -20, delay: 0.2 },
  { Icon: HeartPulse, top: "37%", left: "72%", size: 44, rotate: 12, delay: 1.7 },
  { Icon: Watch, top: "35%", left: "88%", size: 42, rotate: -16, delay: 2.6 },

  // Row 3 (middle)
  { Icon: Salad, top: "46%", left: "4%", size: 58, rotate: 10, delay: 0.9 },
  { Icon: Egg, top: "44%", left: "20%", size: 40, rotate: 18, delay: 2.4 },
  { Icon: Soup, top: "48%", left: "34%", size: 46, rotate: -14, delay: 1.4 },
  { Icon: Drumstick, top: "45%", left: "50%", size: 46, rotate: 28, delay: 0.2 },
  { Icon: ShoppingCart, top: "47%", left: "66%", size: 46, rotate: -10, delay: 1.6 },
  { Icon: IceCream, top: "44%", left: "82%", size: 44, rotate: 14, delay: 2.3 },
  { Icon: Bean, top: "50%", left: "95%", size: 38, rotate: -20, delay: 0.5 },

  // Row 3.5 (new)
  { Icon: Dessert, top: "57%", left: "10%", size: 42, rotate: -12, delay: 1.0 },
  { Icon: Lightbulb, top: "56%", left: "23%", size: 42, rotate: 15, delay: 2.1 },
  { Icon: Lollipop, top: "58%", left: "37%", size: 40, rotate: -24, delay: 0.6 },
  { Icon: Plug, top: "56%", left: "52%", size: 40, rotate: 18, delay: 1.3 },
  { Icon: Baby, top: "58%", left: "66%", size: 44, rotate: -8, delay: 2.5 },
  { Icon: GlassWater, top: "56%", left: "80%", size: 42, rotate: 12, delay: 0.4 },

  // Row 4
  { Icon: Beef, top: "66%", left: "2%", size: 50, rotate: -12, delay: 1.3 },
  { Icon: Citrus, top: "68%", left: "14%", size: 50, rotate: -20, delay: 1.5 },
  { Icon: Sandwich, top: "64%", left: "28%", size: 44, rotate: 16, delay: 0.7 },
  { Icon: Coffee, top: "67%", left: "44%", size: 42, rotate: -8, delay: 2.6 },
  { Icon: Package, top: "65%", left: "58%", size: 44, rotate: 12, delay: 1.9 },
  { Icon: CupSoda, top: "68%", left: "72%", size: 42, rotate: -16, delay: 0.1 },
  { Icon: ShoppingBasket, top: "64%", left: "90%", size: 60, rotate: 8, delay: 0.2 },

  // Row 4.5 (new)
  { Icon: Cross, top: "78%", left: "4%", size: 40, rotate: 10, delay: 1.8 },
  { Icon: Battery, top: "77%", left: "18%", size: 42, rotate: -18, delay: 0.9 },
  { Icon: Bone, top: "79%", left: "32%", size: 40, rotate: 24, delay: 2.2 },
  { Icon: Speaker, top: "77%", left: "48%", size: 42, rotate: -10, delay: 0.5 },
  { Icon: SprayCan, top: "79%", left: "62%", size: 42, rotate: 16, delay: 1.5 },
  { Icon: Droplets, top: "77%", left: "77%", size: 40, rotate: -14, delay: 2.4 },
  { Icon: Gamepad2, top: "79%", left: "93%", size: 44, rotate: 12, delay: 0.3 },

  // Row 5 (bottom)
  { Icon: Popcorn, top: "88%", left: "6%", size: 42, rotate: 14, delay: 2.0 },
  { Icon: Cake, top: "90%", left: "22%", size: 44, rotate: -10, delay: 0.9 },
  { Icon: Wine, top: "88%", left: "40%", size: 40, rotate: 20, delay: 1.2 },
  { Icon: Keyboard, top: "90%", left: "55%", size: 44, rotate: -12, delay: 1.7 },
  { Icon: Leaf, top: "91%", left: "70%", size: 38, rotate: 35, delay: 0.7 },
  { Icon: Printer, top: "89%", left: "85%", size: 42, rotate: 10, delay: 2.3 },
];

export function NeedlyHero({ product }: { product: ProductItem }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const blockRef = useRef<HTMLDivElement>(null);

  // Parallax float handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!blockRef.current) return;
    const rect = blockRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -3,
      y: (x / rect.width) * 3,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="needly-hero-section">
      {/* Decorative background icons */}
      <div className="hero-bg-icons" aria-hidden="true">
        {BG_ICONS.map(({ Icon, top, left, size, rotate, delay }, i) => (
          <span
            key={i}
            className="bg-icon"
            style={
              {
                top,
                left,
                "--rotate": `${rotate}deg`,
                animationDelay: `${delay}s`,
              } as CSSProperties
            }
          >
            <Icon size={size} strokeWidth={1.5} />
          </span>
        ))}
      </div>

      <div className="needly-hero-container">
        {/* Top Split Section */}
        <div className="hero-split-top">
          <div className="hero-left-col">
            <nav aria-label="Breadcrumb" className="hero-crumbs">
              <Link href="/products">Products</Link>
              <span className="crumb-sep">/</span>
              <span className="current">Needly</span>
            </nav>

            <div data-reveal="" className="identity-top">
              <Image
                src="/logos/Needly-logo.png"
                alt="Needly Logo"
                width={80}
                height={80}
                className="identity-logo"
                priority
              />
              <div className="identity-meta">
                <strong className="identity-name">Needly</strong>
                <span className="identity-sub">
                  Order groceries from nearby shops with live pricing.
                </span>
              </div>
            </div>

            <div data-reveal="" className="hero-handwritten">Har Dukaan. Har Zaroorat.</div>

            <h1 data-reveal="" className="hero-headline">
              Nearby Groceries, <br />
              Real-Time Prices
            </h1>

            <div data-reveal="" className="hero-tags" aria-label="Platform tags">
              <span className="tag-pill">Request-Based</span>
              <span className="tag-pill">Web &amp; Mobile</span>
              <span className="tag-pill">Local Shopping</span>
              <span className="tag-pill">Global</span>
            </div>

            <p data-reveal="" className="hero-description">
              Needly connects customers with nearby local grocery shops, making
              local shopping easier through direct product requests, shop
              responses, and simple order confirmation.
            </p>

            <div data-reveal="" className="hero-cta-group">
              <Link href="/contact" className="needly-btn-primary">
                <span>Book a Demo</span>
                <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              </Link>

              <Link href="/contact" className="needly-btn-secondary">
                <MessageSquare size={16} style={{ marginRight: "8px" }} />
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>

          <div data-reveal="" className="hero-right-col">
            <div
              ref={blockRef}
              className="blob-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <div className="blob-shape"></div>
              <div className="blob-orange-circle"></div>

              <Image
                src="/shots/Welzokart_ui-1.png"
                alt="Shop catalog screen"
                width={250}
                height={520}
                className="phone-screen phone-back"
                priority
              />
              <Image
                src="/shots/Welzokart_ui-4.png"
                alt="Request screen"
                width={250}
                height={520}
                className="phone-screen phone-front"
                priority
              />
            </div>
          </div>
        </div>

        {/* Live Production Stats & Social Proof Bar */}
        <div className="hero-pinned-info">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <Briefcase size={22} />
              </div>
              <div className="info-text">
                <strong>Industry</strong>
                <span>Local Groceries</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Smartphone size={22} />
              </div>
              <div className="info-text">
                <strong>Platform</strong>
                <span>Mobile application</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Store size={22} />
              </div>
              <div className="info-text">
                <strong>Solutions</strong>
                <span>Request-to-Delivery</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <Globe size={22} />
              </div>
              <div className="info-text">
                <strong>Country</strong>
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}