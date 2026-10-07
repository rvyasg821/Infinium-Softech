import { ABOUT_INDUSTRIES } from "@/data/aboutData";
import "./AboutOperators.scss";

export function AboutOperators() {
  // Duplicate industries array for smooth continuous marquee scroll
  const marqueeItems = [...ABOUT_INDUSTRIES, ...ABOUT_INDUSTRIES];

  return (
    <section className="about-operators-section" aria-label="Who We Build For">
      <div className="about-operators-container">
        <div data-reveal="" className="about-operators-eyebrow">
          Industry Solutions

        </div>
        <h2 data-reveal="" className="about-operators-headline">
          Technology for <br />
          Every Industry
        </h2>
        <p data-reveal="" className="about-operators-desc">
          Flexible, scalable solutions designed to simplify operations, improve efficiency, and solve real-world challenges across diverse industries.
        </p>
      </div>

      <div className="about-operators-marquee-track">
        <div className="about-operators-marquee">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="industry-pill">
              <span
                className="industry-dot"
                style={{ backgroundColor: item.tint }}
                aria-hidden="true"
              />
              <span className="industry-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
