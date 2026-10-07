import "./AboutBuilt.scss";
import Image from "next/image";

export function AboutBuilt() {
  return (
    <section className="about-built-section" aria-label="How We're Built">
      <div className="about-built-container">
        <div className="about-built-left">
          <div data-reveal="" className="about-built-eyebrow">
            How we&apos;re built
          </div>
          <h2 data-reveal="" className="about-built-headline">
            We Build Once.<br />We Build Better.
          </h2>

          <p data-reveal="" className="about-built-paragraph">
            Infinium Softech is built around a product-first approach. Instead of creating one-off solutions that start from scratch every time, we build and own digital products designed to solve real business challenges across industries.
          </p>
          <p data-reveal="" className="about-built-paragraph">
            Our products share a common technology foundation for identity, billing, notifications, analytics, reporting, integrations, and security. This shared foundation allows improvements made at the core to benefit products across the ecosystem — making every product more capable, scalable, and connected over time.
          </p>
        </div>

        <div data-reveal="" className="about-built-right">
          <Image
            src="/brand/about.png"
            alt="Infinium Softech team building digital products"
            width={640}
            height={480}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>


      </div>
    </section>
  );
}
