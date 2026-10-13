"use client";

import { useState, useRef, useEffect } from "react";
import { sendDemoEmail } from "@/actions/sendEmail";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./BookDemoForm.scss";

const DEMO_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

const DEMO_PRODUCTS = [
  "Slota",
  "WelzoKart",
  "NurseWorth",
  "LoadGo",
  "Dishly",
  "Trekvano",
  "Needly",
  "PureSpace",
  "Textora",
  "Not sure yet",
];

const DEMO_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DEMO_TIMES = ["Morning", "Midday", "Afternoon", "Evening"];

const DEMO_DESKS = [
  {
    name: "Your data, not a demo account",
    desc: "A workspace configured with your branches, roles and rough volumes before the call starts.",
    tint: "#1F31E8",
  },
  {
    name: "The exact workflow you run",
    desc: "We walk the booking, order or job through every state it passes through today.",
    tint: "#1E9E5A",
  },
  {
    name: "What connects to what",
    desc: "How it sits alongside your existing tools, and what migrates over on day one.",
    tint: "#E8A21F",
  },
  {
    name: "Pricing for your scale",
    desc: "A number based on your team size and modules, not a generic price list.",
    tint: "#8B3FE8",
  },
];

const DEMO_STEPS = [
  {
    n: "01",
    title: "Confirmation email",
    desc: "Calendar invite and a join link, usually within one working day.",
  },
  {
    n: "02",
    title: "The call",
    desc: "Thirty minutes, screen-share, questions welcome throughout.",
  },
  {
    n: "03",
    title: "Scope in writing",
    desc: "Timeline and cost follow within two working days if you want to proceed.",
  },
];

export function BookDemoForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("1–10");
  const [product, setProduct] = useState("Not sure yet");
  const [day, setDay] = useState("Tue");
  const [time, setTime] = useState("Afternoon");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateName = (val: string) => {
    if (!val.trim()) return "Please fill out this field.";
    if (!/^[a-zA-Z\s]+$/.test(val.trim()))
      return "Please enter letters and spaces only.";
    return undefined;
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return "Please fill out this field.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()))
      return "Please enter a valid email address.";
    return undefined;
  };

  const showSweetAlert = (
    title: string,
    text: string,
    icon: "warning" | "error" | "info" | "success" = "warning"
  ) => {
    if (typeof window !== "undefined" && !Swal.isVisible()) {
      Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: "OK",
        confirmButtonColor: "#0c0c0d",
        background: "#ffffff",
        color: "#0c0c0d",
        customClass: {
          popup: "infinium-swal-popup",
          confirmButton: "infinium-swal-btn",
        },
      });
    }
  };

  useEffect(() => {
    if (isSent && sectionRef.current) {
      const y =
        sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [isSent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);

    const newErrors = {
      name: nameErr,
      email: emailErr,
    };

    setTouched({
      name: true,
      email: true,
    });
    setErrors(newErrors);

    if (nameErr || emailErr) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendDemoEmail({
        name,
        email,
        company,
        size,
        product,
        day,
        time,
        message,
      });

      if (result.success) {
        setIsSent(true);
      } else {
        showSweetAlert(
          "Submission Error",
          result.error ||
            "Something went wrong while booking your demo. Please try again.",
          "error"
        );
      }
    } catch {
      showSweetAlert(
        "Network Error",
        "A network error occurred. Please check your connection and try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSent(false);
    setName("");
    setEmail("");
    setCompany("");
    setSize("1–10");
    setProduct("Not sure yet");
    setDay("Tue");
    setTime("Afternoon");
    setMessage("");
    setErrors({});
    setTouched({});
  };

  const productChipsRef = useRef<HTMLDivElement>(null);
  const [isChipsDragging, setIsChipsDragging] = useState(false);
  const chipsMouseDownRef = useRef(false);
  const chipsStartXRef = useRef(0);
  const chipsStartScrollLeftRef = useRef(0);

  const handleChipsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = productChipsRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    } else {
      el.scrollLeft += e.deltaX;
    }
  };

  const handleChipsMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = productChipsRef.current;
    if (!el) return;
    chipsMouseDownRef.current = true;
    chipsStartXRef.current = e.pageX - el.offsetLeft;
    chipsStartScrollLeftRef.current = el.scrollLeft;
  };

  const handleChipsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chipsMouseDownRef.current) return;
    const el = productChipsRef.current;
    if (!el) return;
    e.preventDefault();
    setIsChipsDragging(true);
    const x = e.pageX - el.offsetLeft;
    const walk = (x - chipsStartXRef.current) * 1.3;
    el.scrollLeft = chipsStartScrollLeftRef.current - walk;
  };

  const handleChipsMouseUp = () => {
    chipsMouseDownRef.current = false;
    setTimeout(() => {
      setIsChipsDragging(false);
    }, 50);
  };

  const handleChipsMouseLeave = () => {
    chipsMouseDownRef.current = false;
    setIsChipsDragging(false);
  };

  const scrollChipsLeft = () => {
    if (productChipsRef.current) {
      productChipsRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollChipsRight = () => {
    if (productChipsRef.current) {
      productChipsRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const handleProductSelect = (
    prodName: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isChipsDragging) return;
    setProduct(prodName);
    if (e.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="form"
      className="contact-form-section content-padding"
      aria-label="Book a Demo Request Form"
    >
      <div className="contact-form-container">
        {/* Left Column: Interactive Form Card */}
        <div data-reveal="" className="contact-form-card">
          {!isSent ? (
            <form onSubmit={handleSubmit} noValidate className="form-inner">
              <h2 className="form-title">Pick a time</h2>
              <p className="form-subtitle">
                Tell us who&apos;s joining and roughly when works. We&apos;ll
                confirm the exact slot by email.
              </p>

              <div className="form-grid">
                <label className="form-field">
                  <span className="field-label">Full name*</span>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setName(val);
                      if (touched.name) {
                        setErrors((prev) => ({
                          ...prev,
                          name: validateName(val),
                        }));
                      }
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, name: true }));
                      setErrors((prev) => ({
                        ...prev,
                        name: validateName(name),
                      }));
                    }}
                    className={`field-input ${
                      touched.name && errors.name ? "field-input--error" : ""
                    }`}
                  />
                  {touched.name && errors.name && (
                    <span className="field-error-msg">{errors.name}</span>
                  )}
                </label>

                <label className="form-field">
                  <span className="field-label">Work email*</span>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEmail(val);
                      if (touched.email) {
                        setErrors((prev) => ({
                          ...prev,
                          email: validateEmail(val),
                        }));
                      }
                    }}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, email: true }));
                      setErrors((prev) => ({
                        ...prev,
                        email: validateEmail(email),
                      }));
                    }}
                    className={`field-input ${
                      touched.email && errors.email ? "field-input--error" : ""
                    }`}
                  />
                  {touched.email && errors.email && (
                    <span className="field-error-msg">{errors.email}</span>
                  )}
                </label>

                <label className="form-field">
                  <span className="field-label">Company</span>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Team size</span>
                  <div className="select-wrap">
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="field-select"
                    >
                      {DEMO_SIZES.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <span className="select-caret" aria-hidden="true">
                      ▾
                    </span>
                  </div>
                </label>
              </div>

              {/* Product Chips Selection */}
              <div className="form-products-group">
                <div className="form-products-header">
                  <span className="field-label">
                    Which product do you want to see
                  </span>
                  <div className="chips-nav-controls">
                    <button
                      type="button"
                      className="chips-scroll-btn"
                      onClick={scrollChipsLeft}
                      aria-label="Scroll products left"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="chips-scroll-btn"
                      onClick={scrollChipsRight}
                      aria-label="Scroll products right"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  ref={productChipsRef}
                  className={`product-chips-wrap ${
                    isChipsDragging ? "is-dragging" : ""
                  }`}
                  onWheel={handleChipsWheel}
                  onMouseDown={handleChipsMouseDown}
                  onMouseMove={handleChipsMouseMove}
                  onMouseUp={handleChipsMouseUp}
                  onMouseLeave={handleChipsMouseLeave}
                  role="group"
                  aria-label="Select product"
                >
                  {DEMO_PRODUCTS.map((prodName, idx) => {
                    const isSelected = product === prodName;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`chip-btn ${isSelected ? "is-selected" : ""}`}
                        onClick={(e) => handleProductSelect(prodName, e)}
                        aria-pressed={isSelected}
                      >
                        {prodName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Day Chips */}
              <div className="form-chips-section">
                <span className="field-label">Preferred day</span>
                <div className="option-chips-row">
                  {DEMO_DAYS.map((dName, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`option-chip-btn ${
                        day === dName ? "is-active" : ""
                      }`}
                      onClick={() => setDay(dName)}
                    >
                      {dName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Time Chips */}
              <div className="form-chips-section">
                <span className="field-label">Preferred time</span>
                <div className="option-chips-row">
                  {DEMO_TIMES.map((tName, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`option-chip-btn ${
                        time === tName ? "is-active" : ""
                      }`}
                      onClick={() => setTime(tName)}
                    >
                      {tName}
                    </button>
                  ))}
                </div>
                <div className="time-subnote">
                  Times shown in your local timezone. We&apos;ll confirm by
                  email.
                </div>
              </div>

              {/* Message Textarea */}
              <label className="form-field form-field--full">
                <span className="field-label">
                  Anything we should know before the call
                </span>
                <textarea
                  rows={4}
                  placeholder="Current process, rough volumes, the tools you run today."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-textarea"
                />
              </label>

              {/* Form Actions */}
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Requesting..." : "Request this slot"}
                  {!isSubmitting && <span aria-hidden="true">→</span>}
                </button>
                <span className="form-note">No cost, no obligation.</span>
              </div>
            </form>
          ) : (
            <div className="form-success-state">
              <div className="success-badge" aria-hidden="true">
                ✓
              </div>
              <h3 className="success-title">Request sent.</h3>
              <p className="success-note">
                We&apos;ll confirm {day} · {time} by email within one working
                day, with a calendar invite and a link to join.
              </p>
              <button type="button" onClick={handleReset} className="btn-reset">
                Book another
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Desks & Steps */}
        <div className="contact-sidebar">
          {/* Top Box: What you'll see (4 stacked rows in 1 column) */}
          <div data-reveal="" className="desks-card">
            <div className="desks-eyebrow">What you&apos;ll see</div>
            <div className="desks-list">
              {DEMO_DESKS.map((desk, idx) => (
                <div key={idx} className="desk-row-item">
                  <span
                    className="desk-indicator-dot"
                    style={{ backgroundColor: desk.tint }}
                    aria-hidden="true"
                  />
                  <div className="desk-row-content">
                    <h3 className="desk-row-title">{desk.name}</h3>
                    <p className="desk-row-desc">{desk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Box: After the call (Dark) */}
          <div data-reveal="" className="steps-card">
            <div className="steps-eyebrow">After the call</div>
            <div className="steps-list">
              {DEMO_STEPS.map((step, idx) => (
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
