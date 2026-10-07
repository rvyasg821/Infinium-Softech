"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/productsData";
import "./ProductPlaceholder.scss";

export function ProductPlaceholder({ product }: { product: ProductItem }) {
  return (
    <main className="product-placeholder">
      <div className="placeholder-hero" style={{ backgroundColor: product.wash }}>
        <div className="placeholder-container">
          <div className="hero-glow-layer" aria-hidden="true">
            <div 
              className="hero-glow-center" 
              style={{ background: `radial-gradient(circle, ${product.tint}33 0%, transparent 70%)` }} 
            />
          </div>

          <div className="placeholder-content">
            <div className="placeholder-identity">
              <span 
                className="placeholder-mark" 
                style={{ backgroundColor: product.tint }}
                title={`${product.name} mark`}
              >
                {product.mark}
              </span>
              <span className="placeholder-tag" style={{ color: product.tint }}>
                {product.tag} Platform
              </span>
            </div>

            <h1 className="placeholder-title">{product.name}</h1>
            <p className="placeholder-desc">{product.desc}</p>

            <div className="placeholder-status">
              <div className="status-pill">
                <span className="status-dot" style={{ backgroundColor: product.tint }} />
                Coming Soon
              </div>
              <Link href="/products" className="status-link">
                Explore full ecosystem <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {product.shot && (
            <div className="placeholder-image-wrapper">
              <Image
                src={product.shot}
                alt={`${product.name} Interface`}
                width={1200}
                height={800}
                className="placeholder-image"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
