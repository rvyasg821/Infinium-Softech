import "./PrivacyPolicy.scss";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { ClientScrollSpy } from "@/components/ClientScrollSpy/ClientScrollSpy";

export const metadata: Metadata = getPageMetadata("/privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-policy-page">
      <ClientScrollSpy />
      {/* Hero Section */}
      <section className="privacy-hero-section">
        <div className="hero-glow-layer" aria-hidden="true">
          <div className="hero-glow-tr" />
          <div className="hero-glow-bl" />
          <div className="hero-glow-center" />
          <div className="hero-orbs">
            <div className="orb-bl" />
            <div className="orb-tr" />
          </div>
        </div>

        <div className="privacy-hero-container">
          <div className="privacy-hero-content">
            <span className="privacy-eyebrow">Trust & Transparency</span>
            <h1 className="privacy-headline">Privacy Policy</h1>
            <p className="privacy-lead">
              At <strong>Infinium Softech</strong>, we respect your privacy and are committed to protecting the personal information you provide when you interact with our digital platforms.
            </p>
            <p className="last-updated">
              Last Updated: <strong>October 9, 2026</strong>
            </p>
          </div>
          
          <div className="privacy-hero-visual">
            <img src="/shots/privacy-hero-light.png" alt="Privacy and Data Security illustration" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="privacy-content-section">
        <div className="privacy-container">
            
          {/* Sidebar Menu */}
          <aside className="privacy-sidebar">
            <nav className="privacy-nav">
              <a href="#about" className="sidebar-link">1. About Us</a>
              <a href="#collect" className="sidebar-link">2. Info We Collect</a>
              <a href="#products" className="sidebar-link">3. Product Info & Use</a>
              <a href="#analytics" className="sidebar-link">4. Cookies & Analytics</a>
              <a href="#sharing" className="sidebar-link">5. Data Sharing & Third-Party</a>
              <a href="#security" className="sidebar-link">6. Security & Retention</a>
              <a href="#rights" className="sidebar-link">7. Privacy Rights</a>
              <a href="#international" className="sidebar-link">8. Updates & International</a>
              <a href="#contact" className="sidebar-link">9. Contact Us</a>
            </nav>
          </aside>

          {/* Privacy Content Data */}
          <div className="privacy-data">
            <p>
              By accessing or using the Infinium Softech website and related product platforms, you acknowledge the practices described in this Privacy Policy.
            </p>

            <h2 id="about">1. About Infinium Softech</h2>
            <p>
              Infinium Softech is a product-focused technology company that provides software products, digital solutions, and technology platforms for businesses and users.
            </p>
            <p>
              In this Privacy Policy, <strong>"Infinium Softech," "we," "us," and "our"</strong> refer to Infinium Softech and its applicable websites, products, and digital platforms.
            </p>

            <h2 id="collect">2. Information We Collect</h2>
            <p>
              We may collect information that you provide voluntarily and technical information collected when you use our website or products.
            </p>
            <p><strong>Information you provide may include:</strong></p>
            <ul>
              <li>Full name, email address, and phone number</li>
              <li>Company name, job title, or professional information</li>
              <li>Contact form submissions and consultation requests</li>
              <li>Product interests, messages, questions, and feedback</li>
            </ul>
            <p><strong>Automatically collected information may include:</strong></p>
            <ul>
              <li>IP address, browser type, and operating system</li>
              <li>Device information and approximate location</li>
              <li>Pages visited, visit times, and referring websites</li>
              <li>Website interaction and usage information</li>
            </ul>
            <p>
              The information collected depends on how you interact with our website and services.
            </p>

            <h2 id="products">3. Product Information and How We Use It</h2>
            <p>
              When you use our products or platforms, we may process information necessary to provide, maintain, secure, and improve the relevant services. The information collected may vary depending on the product and its functionality.
            </p>
            <p>We may use collected information to:</p>
            <ul>
              <li>Respond to enquiries and provide requested information</li>
              <li>Arrange product demonstrations and consultations</li>
              <li>Deliver customer and technical support</li>
              <li>Operate and improve our website, products, and platforms</li>
              <li>Monitor performance and understand user interactions</li>
              <li>Detect fraud, security issues, and unauthorized activities</li>
              <li>Send important product and service communications</li>
              <li>Meet legal obligations and protect our legal rights</li>
            </ul>
            <p>
              Where we process information on behalf of a business or organization, applicable customer agreements and product-specific privacy terms may also apply.
            </p>

            <h2 id="analytics">4. Communication, Cookies, and Analytics</h2>
            <p>
              We may use your contact details to respond to enquiries, share requested product information, arrange demonstrations, and provide relevant service updates.
            </p>
            <p>
              Where permitted by applicable law, we may also send promotional communications. You can request to stop receiving these communications by contacting us or using an available unsubscribe option.
            </p>
            <p>
              Our website may use cookies and similar technologies to maintain functionality, remember preferences, measure traffic, analyze website performance, and support marketing activities where applicable.
            </p>
            <p>
              We may also use analytics providers and other website technologies to understand visitor behavior. You can manage cookies through your browser settings, although disabling certain cookies may affect website functionality.
            </p>

            <h2 id="sharing">5. Information Sharing and Third-Party Services</h2>
            <p>We do not sell or rent your personal information.</p>
            <p>
              We may share information with trusted service providers when necessary to operate our business, including hosting providers, email services, analytics providers, security services, customer support providers, and professional advisors.
            </p>
            <p>
              We may also disclose information when required by law or to protect our legal rights.
            </p>
            <p>
              Our website or products may link to third-party websites, applications, APIs, or services. These third parties may have their own privacy policies and practices. We are not responsible for their independent handling of your information.
            </p>

            <h2 id="security">6. Data Security and Retention</h2>
            <p>
              We take reasonable technical and organizational measures to protect personal information against unauthorized access, disclosure, alteration, loss, or misuse.
            </p>
            <p>
              However, no internet transmission or electronic storage method can be guaranteed to be completely secure.
            </p>
            <p>
              We retain personal information only for as long as reasonably necessary to provide services, respond to enquiries, maintain business records, resolve disputes, and comply with legal obligations. Retention periods may vary depending on the information and its purpose.
            </p>

            <h2 id="rights">7. Your Privacy Rights and Children's Privacy</h2>
            <p>Depending on applicable law, you may have the right to:</p>
            <ul>
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of personal information</li>
              <li>Request restrictions on certain processing activities</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Object to certain uses of your information</li>
              <li>Request information about how your data is processed</li>
            </ul>
            <p>
              You can contact us to exercise applicable privacy rights. We may need to verify your identity before processing your request.
            </p>
            <p>
              Our website and products are primarily intended for businesses, professionals, and general users. We do not knowingly collect children's personal information where prohibited by applicable law. If you believe a child has provided personal information to us inappropriately, please contact us.
            </p>

            <h2 id="international">8. International Processing, Product Privacy, and Policy Updates</h2>
            <p>
              Your information may be processed or stored in countries other than your own, depending on the technologies and service providers we use. Where required by law, we take appropriate measures to protect information transferred across jurisdictions.
            </p>
            <p>
              Some Infinium Softech products may have additional privacy requirements depending on their features, integrations, and the information they process. Separate product-specific privacy notices or agreements may apply alongside this policy.
            </p>
            <p>
              We may update this Privacy Policy to reflect changes in our products, website, business practices, technology, or legal requirements. Updates will be published on this page with a revised <strong>"Last Updated"</strong> date. We encourage you to review this page periodically.
            </p>

            <h2 id="contact">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, your personal information, or our privacy practices, please contact us:
            </p>

            <div className="contact-details">
              <p><strong>Company:</strong> Infinium Softech</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@yourdomain.com">privacy@yourdomain.com</a></p>
              <p><strong>Website:</strong> https://infiniumsoftech.com</p>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
