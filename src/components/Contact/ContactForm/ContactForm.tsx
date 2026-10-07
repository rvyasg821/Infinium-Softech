"use client";

import { useState, useRef, useEffect } from "react";
import { sendContactEmail } from "@/actions/sendEmail";
import {
  CONTACT_SERVICES,
  CONTACT_APP_STAGES,
  CONTACT_START_TIMES,
  CONTACT_DESKS,
  CONTACT_STEPS,
} from "@/data/contactData";
import "./ContactForm.scss";

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");
  const [stage, setStage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSent && sectionRef.current) {
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [isSent]);

  // Big screen (>= 768px): 2-grid mouse scrollable & draggable carousel (no arrows, no dots)
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [isDesktopDeskPaused, setIsDesktopDeskPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // Auto-play timer for big screen carousel (4.5s)
  useEffect(() => {
    if (isDesktopDeskPaused || isDragging) return;
    const timer = setInterval(() => {
      const el = desktopScrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 5) return;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: el.scrollLeft + el.clientWidth, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isDesktopDeskPaused, isDragging]);

  // Mouse wheel scroll handler
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDesktopWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    setIsDesktopDeskPaused(true);
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    } else {
      el.scrollLeft += e.deltaX;
    }

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      setIsDesktopDeskPaused(false);
    }, 2500);
  };

  // Mouse drag handlers
  const handleDesktopMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    setIsDesktopDeskPaused(true);
  };

  const handleDesktopMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return;
    const el = desktopScrollRef.current;
    if (!el) return;
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    el.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleDesktopMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
  };

  const handleDesktopMouseLeave = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
    setIsDesktopDeskPaused(false);
  };

  // Touch handlers for big screen touch devices
  const desktopTouchStartXRef = useRef<number | null>(null);
  const desktopTouchStartScrollLeftRef = useRef<number>(0);

  const handleDesktopTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    setIsDesktopDeskPaused(true);
    desktopTouchStartXRef.current = e.touches[0].clientX;
    desktopTouchStartScrollLeftRef.current = el.scrollLeft;
  };

  const handleDesktopTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (desktopTouchStartXRef.current === null) return;
    const el = desktopScrollRef.current;
    if (!el) return;
    const diff = e.touches[0].clientX - desktopTouchStartXRef.current;
    el.scrollLeft = desktopTouchStartScrollLeftRef.current - diff;
  };

  const handleDesktopTouchEnd = () => {
    desktopTouchStartXRef.current = null;
    setIsDesktopDeskPaused(false);
  };

  // Small screen (< 768px) carousel state
  const [deskActiveIndex, setDeskActiveIndex] = useState(0);
  const [deskDirection, setDeskDirection] = useState<"next" | "prev">("next");
  const totalDesks = CONTACT_DESKS.length;
  const deskTouchStartXRef = useRef<number | null>(null);
  const deskTouchEndXRef = useRef<number | null>(null);

  const handleDeskNext = () => {
    setDeskDirection("next");
    setDeskActiveIndex((prev) => (prev + 1) % totalDesks);
  };

  const handleDeskPrev = () => {
    setDeskDirection("prev");
    setDeskActiveIndex((prev) => (prev - 1 + totalDesks) % totalDesks);
  };

  const handleDeskIndex = (idx: number) => {
    setDeskDirection(idx > deskActiveIndex ? "next" : "prev");
    setDeskActiveIndex(idx);
  };

  const handleDeskTouchStart = (e: React.TouchEvent) => {
    deskTouchStartXRef.current = e.touches[0].clientX;
    deskTouchEndXRef.current = null;
  };

  const handleDeskTouchMove = (e: React.TouchEvent) => {
    deskTouchEndXRef.current = e.touches[0].clientX;
  };

  const handleDeskTouchEnd = () => {
    if (deskTouchStartXRef.current !== null && deskTouchEndXRef.current !== null) {
      const diff = deskTouchStartXRef.current - deskTouchEndXRef.current;
      if (diff > 45) {
        handleDeskNext();
      } else if (diff < -45) {
        handleDeskPrev();
      }
    }
    deskTouchStartXRef.current = null;
    deskTouchEndXRef.current = null;
  };

  const currentDesk = CONTACT_DESKS[deskActiveIndex];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !mobile.trim()) return;
    
    setIsSubmitting(true);
    const result = await sendContactEmail({
      name,
      email,
      mobile,
      service,
      stage,
      startTime,
      message,
    });
    setIsSubmitting(false);

    if (result.success) {
      setIsSent(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setIsSent(false);
    setName("");
    setEmail("");
    setMobile("");
    setService("");
    setStage("");
    setStartTime("");
    setMessage("");
  };

  const sentMessageNote = service
    ? `Routed to the ${service} team. Expect a reply within one working day, usually with two or three questions and a time for a walkthrough.`
    : "Our team will read this and get back to you. Expect a reply within one working day, usually with two or three questions and a time for a walkthrough.";

  return (
    <section ref={sectionRef} id="form" className="contact-form-section content-padding" aria-label="Send Brief & Contacts">
      <div className="contact-form-container">
        {/* Left Column: Interactive Form Box */}
        <div data-reveal="" className="contact-form-card">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="form-inner">
              <h2 className="form-title">Send us a brief</h2>
              <p className="form-subtitle">
                Tell us about your project and we will get back to you with the right next steps.
              </p>

              <div className="form-grid">
                <label className="form-field">
                  <span className="field-label">Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Email Address</span>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Mobile No</span>
                  <input
                    type="tel"
                    required
                    placeholder="Your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Select a service</span>
                  <div className="select-wrap">
                    <select
                      required
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="field-select"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {CONTACT_SERVICES.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <span className="select-caret" aria-hidden="true">▾</span>
                  </div>
                </label>

                <label className="form-field">
                  <span className="field-label">At what stage is your app?</span>
                  <div className="select-wrap">
                    <select
                      required
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="field-select"
                    >
                      <option value="" disabled>
                        Select stage
                      </option>
                      {CONTACT_APP_STAGES.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <span className="select-caret" aria-hidden="true">▾</span>
                  </div>
                </label>

                <label className="form-field">
                  <span className="field-label">When do you want to start</span>
                  <div className="select-wrap">
                    <select
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="field-select"
                    >
                      <option value="" disabled>
                        Select timeline
                      </option>
                      {CONTACT_START_TIMES.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <span className="select-caret" aria-hidden="true">▾</span>
                  </div>
                </label>
              </div>

              {/* Message Textarea */}
              <label className="form-field form-field--full">
                <span className="field-label">How can we help you?</span>
                <textarea
                  rows={4}
                  placeholder="Tell us a little about your project or requirement."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-textarea"
                />
              </label>

              {/* Form Actions */}
              <div className="form-footer">
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send enquiry"}
                  {!isSubmitting && <span aria-hidden="true">→</span>}
                </button>
                <span className="form-note">We reply within one working day.</span>
              </div>
            </form>
          ) : (
            <div className="form-success-state">
              <div className="success-badge" aria-hidden="true">
                ✓
              </div>
              <h3 className="success-title">Brief received.</h3>
              <p className="success-note">{sentMessageNote}</p>
              <button type="button" onClick={handleReset} className="btn-reset">
                Send another
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Desks & Steps */}
        <div className="contact-sidebar">
          {/* Top Box: Reach the right desk */}
          <div data-reveal="" className="desks-card">
            <div className="desks-eyebrow">Reach the right desk</div>

            {/* Big Screen: 2-Grid Carousel (>= 768px) */}
            <div
              ref={desktopScrollRef}
              className={`desks-desktop-track ${isDragging ? "is-dragging" : ""}`}
              onMouseEnter={() => setIsDesktopDeskPaused(true)}
              onMouseLeave={handleDesktopMouseLeave}
              onWheel={handleDesktopWheel}
              onMouseDown={handleDesktopMouseDown}
              onMouseMove={handleDesktopMouseMove}
              onMouseUp={handleDesktopMouseUp}
              onTouchStart={handleDesktopTouchStart}
              onTouchMove={handleDesktopTouchMove}
              onTouchEnd={handleDesktopTouchEnd}
              aria-label="Reach the right desk carousel"
            >
              {CONTACT_DESKS.map((desk, idx) => (
                <div key={idx} className="desk-item">
                  <div
                    className="desk-indicator"
                    style={{ backgroundColor: desk.tint }}
                    aria-hidden="true"
                  />
                  <h3 className="desk-name">{desk.name}</h3>
                  <p className="desk-desc">{desk.desc}</p>
                  <div className="desk-sla">{desk.sla}</div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Slider (< 768px) */}
            <div className="desks-carousel" aria-label="Reach the right desk carousel">
              <div
                className="desks-carousel-wrapper"
                onTouchStart={handleDeskTouchStart}
                onTouchMove={handleDeskTouchMove}
                onTouchEnd={handleDeskTouchEnd}
              >
                <button
                  type="button"
                  className="carousel-arrow-btn prev-btn"
                  onClick={handleDeskPrev}
                  aria-label="Previous desk"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div
                  key={deskActiveIndex}
                  className={`desk-carousel-card slide-${deskDirection}`}
                >
                  <div className="desk-carousel-header">
                    <div
                      className="desk-indicator"
                      style={{ backgroundColor: currentDesk.tint }}
                      aria-hidden="true"
                    />
                    <span className="desk-counter">
                      0{deskActiveIndex + 1} / 0{totalDesks}
                    </span>
                  </div>
                  <h3 className="desk-name">{currentDesk.name}</h3>
                  <p className="desk-desc">{currentDesk.desc}</p>
                  <div className="desk-sla">{currentDesk.sla}</div>
                </div>

                <button
                  type="button"
                  className="carousel-arrow-btn next-btn"
                  onClick={handleDeskNext}
                  aria-label="Next desk"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="desks-carousel-dots" aria-label="Desk navigation dots">
                {CONTACT_DESKS.map((desk, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`desks-dot ${deskActiveIndex === idx ? "is-active" : ""}`}
                    onClick={() => handleDeskIndex(idx)}
                    aria-label={`Go to desk ${idx + 1}: ${desk.name}`}
                  >
                    <span
                      className="dot-fill"
                      style={{
                        backgroundColor: deskActiveIndex === idx ? desk.tint : undefined,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Box: What happens next (Dark) */}
          <div data-reveal="" className="steps-card">
            <div className="steps-eyebrow">What happens next</div>
            <div className="steps-list">
              {CONTACT_STEPS.map((step, idx) => (
                <div key={idx} className="step-item">
                  <span className="step-num">{step.n}</span>
                  <div className="step-content">
                    <span className="step-title">{step.title}</span>
                    <span className="step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}