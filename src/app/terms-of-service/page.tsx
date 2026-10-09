import "./TermsOfService.scss";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { ClientScrollSpy } from "@/components/ClientScrollSpy/ClientScrollSpy";

export const metadata: Metadata = getPageMetadata("/terms-of-service");

export default function TermsOfServicePage() {
  return (
    <main className="terms-of-service-page">
      <ClientScrollSpy />
      {/* Hero Section */}
      <section className="terms-hero-section">
        <div className="hero-glow-layer" aria-hidden="true">
          <div className="hero-glow-tr" />
          <div className="hero-glow-bl" />
          <div className="hero-glow-center" />
          <div className="hero-orbs">
            <div className="orb-bl" />
            <div className="orb-tr" />
          </div>
        </div>

        <div className="terms-hero-container">
          <div className="terms-hero-content">
            <span className="terms-eyebrow">Agreements</span>
            <h1 className="terms-headline">Terms of Service</h1>
            <p className="terms-lead">
              Welcome to <strong>Infinium Softech</strong>. These Terms govern your access to and use of our website, software products, applications, and technology solutions.
            </p>
            <p className="last-updated">
              Last Updated: <strong>October 9, 2026</strong>
            </p>
          </div>
          <div className="terms-hero-visual">
            <img src="/shots/terms-hero-light.png" alt="Terms of Service Legal Document" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="terms-content-section">
        <div className="terms-container">

          {/* Sidebar Menu */}
          <aside className="terms-sidebar">
            <nav className="terms-nav">
              <a href="#about" className="sidebar-link">1. About Us and Acceptance</a>
              <a href="#usage" className="sidebar-link">2. Website and Product Usage</a>
              <a href="#accounts" className="sidebar-link">3. User Accounts and Security</a>
              <a href="#ip" className="sidebar-link">4. IP and User Content</a>
              <a href="#payments" className="sidebar-link">5. Payments and Third-Party</a>
              <a href="#disclaimer" className="sidebar-link">6. Availability and Disclaimer</a>
              <a href="#liability" className="sidebar-link">7. Liability & Indemnification</a>
              <a href="#privacy" className="sidebar-link">8. Privacy, Updates, & Terms</a>
              <a href="#contact" className="sidebar-link">9. Governing Law & Contact</a>
            </nav>
          </aside>

          {/* Terms Content Data */}
          <div className="terms-data">
            <h2 id="about">1. About Infinium Softech and Acceptance of Terms</h2>
            <p>
              Infinium Softech is a product-focused technology company that provides software products, digital platforms, and technology solutions.
            </p>
            <p>
              By accessing or using our website, products, or services, you agree to these Terms of Service. You confirm that you understand these terms and will use our services lawfully. If you use our services on behalf of a company or organization, you confirm that you are authorized to accept these terms on its behalf.
            </p>

            <h2 id="usage">2. Website and Product Usage</h2>
            <p>
              You may use our website and products for legitimate business and personal purposes, including exploring our services, requesting information, and contacting our team.
            </p>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for illegal or fraudulent activities.</li>
              <li>Attempt unauthorized access to our systems or other users' accounts.</li>
              <li>Disrupt our website, products, or security systems.</li>
              <li>Upload viruses, malicious code, or harmful content.</li>
              <li>Copy or distribute our content without permission.</li>
              <li>Misuse our products or violate the rights of others.</li>
            </ul>
            <p>We reserve the right to restrict access when these terms are violated.</p>

            <h2 id="accounts">3. User Accounts and Security</h2>
            <p>
              Some products or services may require you to create an account. You are responsible for providing accurate information, protecting your login credentials, and maintaining your account security.
            </p>
            <p>
              You must notify us promptly if you suspect unauthorized access to your account. You are responsible for activities conducted through your account, subject to applicable law.
            </p>
            <p>
              You must not share account credentials with unauthorized individuals where sharing is not permitted.
            </p>

            <h2 id="ip">4. Intellectual Property and User Content</h2>
            <p>
              All software, designs, logos, graphics, text, images, interfaces, documentation, and other materials provided by Infinium Softech are owned by or licensed to us unless otherwise stated.
            </p>
            <p>
              You may not reproduce, modify, distribute, sell, or commercially use our intellectual property without appropriate authorization.
            </p>
            <p>
              You retain ownership of content you submit, where applicable. However, you must have the necessary rights to share that content with us. You permit us to process and use submitted content as reasonably necessary to provide, maintain, secure, and improve our services, subject to applicable agreements and our Privacy Policy.
            </p>

            <h2 id="payments">5. Payments and Third-Party Services</h2>
            <p>
              Certain products and services may require subscription fees, licensing fees, or other payments. Applicable pricing, taxes, renewals, cancellations, and refund conditions will be communicated through the relevant product or service.
            </p>
            <p>
              Our website and products may also connect to third-party platforms, APIs, payment providers, hosting services, or other external technologies. These services may have their own terms and privacy policies.
            </p>
            <p>
              Infinium Softech is not responsible for the independent operation, availability, content, or policies of third-party services.
            </p>

            <h2 id="disclaimer">6. Service Availability and Disclaimer</h2>
            <p>
              We aim to provide reliable and useful products and services. However, we do not guarantee uninterrupted access, error-free operation, compatibility with every device, or complete freedom from security vulnerabilities.
            </p>
            <p>
              We may update, modify, suspend, or discontinue features when necessary for technical, business, security, or legal reasons.
            </p>
            <p>
              To the maximum extent permitted by applicable law, our website and services are provided on an "as available" basis. Website information is for general informational purposes and should not be treated as professional, legal, financial, or other specialized advice.
            </p>

            <h2 id="liability">7. Limitation of Liability and Indemnification</h2>
            <p>
              To the maximum extent permitted by applicable law, Infinium Softech and its directors, employees, affiliates, partners, and service providers will not be liable for indirect, incidental, special, or consequential damages arising from your use of our website or products. This may include loss of data, profits, business opportunities, or business interruptions.
            </p>
            <p>
              You agree, to the extent permitted by applicable law, to indemnify and hold Infinium Softech harmless from claims, losses, damages, and expenses arising from your violation of these terms, misuse of our services, unlawful activities, infringement of others' rights, or content you submit.
            </p>
            <p>
              Nothing in these terms excludes liability that cannot legally be excluded.
            </p>

            <h2 id="privacy">8. Privacy, Updates, and General Terms</h2>
            <p>
              Your use of our website and products may involve the collection and processing of personal information. Please review our <strong>Privacy Policy</strong> to understand how we handle your information.
            </p>
            <p>
              We may update these Terms of Service to reflect changes in our business, products, technology, or legal requirements. The latest version will be published on this page with an updated date.
            </p>
            <p>
              If any provision is found to be invalid or unenforceable, the remaining provisions will continue to apply. These terms, together with applicable product-specific agreements and referenced policies, form the agreement governing your use of our website and services.
            </p>

            <h2 id="contact">9. Governing Law and Contact Information</h2>
            <p>
              These Terms of Service are governed by the applicable laws of India, unless otherwise required by law or a separate written agreement. Disputes will be subject to the jurisdiction of the applicable courts, subject to mandatory legal requirements.
            </p>
            <p>If you have questions about these terms, please contact us:</p>

            <div className="contact-details">
              <p><strong>Company:</strong> Infinium Softech</p>
              <p><strong>Email:</strong> <a>contact@yourdomain.com</a></p>
              <p><strong>Website:</strong> Your Website URL</p>
              <p><strong>Address:</strong> Company Address</p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}