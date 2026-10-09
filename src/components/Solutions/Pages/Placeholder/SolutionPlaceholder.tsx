"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SolutionItem } from "@/data/solutions/solutionsData";
import "./SolutionPlaceholder.scss";

export function SolutionPlaceholder({ solution }: { solution: SolutionItem }) {
  return (
    <main className="solution-placeholder">
      <div className="placeholder-hero" style={{ backgroundColor: `${solution.color}16` }}>
        <div className="placeholder-container">
          <div className="hero-glow-layer" aria-hidden="true">
            <div 
              className="hero-glow-center" 
              style={{ background: `radial-gradient(circle, ${solution.color}33 0%, transparent 70%)` }} 
            />
          </div>

          <div className="placeholder-content">
            <div className="placeholder-identity">
              <span 
                className="placeholder-mark" 
                style={{ backgroundColor: solution.color }}
                title={`${solution.category} mark`}
              >
                {solution.num}
              </span>
              <span className="placeholder-tag" style={{ color: solution.color }}>
                {solution.category}
              </span>
            </div>

            <h1 className="placeholder-title">{titleFallback(solution.title)}</h1>
            <p className="placeholder-desc">{solution.description}</p>

            <div className="placeholder-actions">
              <Link href="#contact" className="btn-primary">
                Talk to Sales
              </Link>
              <Link href="/solutions" className="btn-secondary">
                Explore all solutions <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {solution.image && (
            <div className="placeholder-image-wrapper">
              <Image
                src={solution.image}
                alt={solution.imageAlt || `${solution.category} Interface`}
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

function titleFallback(title: string) {
  return title || "Solution Details";
}
