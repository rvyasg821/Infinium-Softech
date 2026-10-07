import React from "react";
import "./AppointGemOverview.scss";

const USE_CASES = [
  "Clinics",
  "Salons & spas",
  "Diagnostics",
  "Professional services",
];

const META_ITEMS = [
  { label: "Product", value: "Slota" },
  { label: "Category", value: "Bookings & management" },
  { label: "Platform", value: "Web + staff mobile" },
  { label: "Integration", value: "REST + webhooks" },
  { label: "Typical go-live", value: "4–6 weeks" },
];

const MODULES = [
  "Calendars",
  "Staff rosters",
  "Payments",
  "Reminders",
  "Customer records",
  "Branch settings",
];

export function AppointGemOverview() {
  return (
    <section id="overview" className="appointgem-overview-section" aria-labelledby="overview-title">
      <div className="appointgem-overview-container">
        <div className="appointgem-overview-grid">
          <div className="overview-left">
            <span data-reveal="" className="appointgem-eyebrow">Overview</span>
            <h2 data-reveal="" id="overview-title" className="overview-headline">
              One calendar the <br className="mobile-title-break" />whole business trusts
            </h2>
            <div data-reveal="" className="use-cases-row">
              {USE_CASES.map((item) => (
                <span key={item} className="use-case-tag">{item}</span>
              ))}
            </div>
          </div>

          <div className="overview-right">
            <p data-reveal="" className="overview-lead-p">
              Appointment businesses lose revenue in the gap between what the calendar says and what staff are actually able to serve. Slota closes that gap: availability is derived from live staff rosters per branch, payment state is attached to the booking, and every reminder, reschedule and invoice is written back to the same customer record.
            </p>
            <p data-reveal="" className="overview-body-p">
              It ships as its own platform and inherits the shared Infinium layer for sign-in, roles, billing, reporting and cloud, so a clinic chain and a single studio run the same product at different scale.
            </p>
          </div>
        </div>

        <div className="appointgem-meta-bar">
          {META_ITEMS.map((item) => (
            <div key={item.label} data-reveal="" className="meta-card">
              <span className="meta-key">{item.label}</span>
              <span className="meta-val">{item.value}</span>
            </div>
          ))}
        </div>

        <div data-reveal="" className="appointgem-modules-row">
          <span className="modules-label">Modules included</span>
          <div className="modules-list">
            {MODULES.map((mod) => (
              <span key={mod} className="module-chip">{mod}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
