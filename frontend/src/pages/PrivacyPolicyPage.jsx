import React, { useEffect } from 'react';
import { Link } from '../lib/router';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | SR Brand Solutions";
  }, []);

  return (
    <div className="privacy-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* Header Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-burgundy)',
            fontWeight: 700,
            display: 'block',
            marginBottom: 'var(--space-label-heading)'
          }}>
            LEGAL & COMPLIANCE
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Privacy Policy
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(16, 17, 38, 0.65)'
          }}>
            Effective Date: January 1, 2026 • Last Updated: August 2026
          </p>
        </div>
      </section>

      {/* Main Document Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '850px', backgroundColor: '#fff', padding: '3.5rem', borderRadius: '16px', border: '1px solid rgba(16,17,38,0.08)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(16, 17, 38, 0.85)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                1. Overview & Commitment
              </h2>
              <p>
                At SR Brand Solutions ("we", "us", or "our"), respecting the privacy and data security of our clients, website visitors, and activation participants is fundamental. This Privacy Policy outlines how we collect, store, process, and protect your personal information when you interact with our website, request strategy consultations, or participate in live brand activations.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                2. Information We Collect
              </h2>
              <p>We may collect personal information through direct submission or automated technologies:</p>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                <li><strong>Contact Inquiry Information:</strong> Full name, corporate email address, telephone number, company name, and service project details submitted via our contact forms.</li>
                <li><strong>Activation Event Data:</strong> Registration details, badge scans, or contest entries gathered at live booths with your explicit consent.</li>
                <li><strong>Technical & Analytics Data:</strong> IP address, browser type, device metadata, operating system, and browsing behavior gathered via cookies and analytics trackers.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                3. How We Use Your Information
              </h2>
              <p>Your information is used strictly to fulfill legitimate business interests:</p>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                <li>Responding to project proposals, service inquiries, and client communication.</li>
                <li>Delivering activation logistics, event access badges, and campaign reporting.</li>
                <li>Improving our digital experiences, website performance, and service offerings.</li>
                <li>Complying with legal, regulatory, and corporate audit obligations.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                4. Data Protection & Confidentiality
              </h2>
              <p>
                We enforce enterprise-grade security protocols, database encryption standards, and strict access controls to prevent unauthorized access, alteration, or disclosure of data. We do NOT sell, rent, or trade your personal data to third-party advertisers.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                5. Third-Party Integrations & Service Providers
              </h2>
              <p>
                We may share data with vetted third-party vendors strictly necessary for service delivery—including secure cloud hosting providers (e.g., Supabase Postgres), CRM infrastructure, and email communications. All partners adhere to non-disclosure agreements and strict privacy frameworks.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                6. Your Rights & Data Preferences
              </h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal information stored in our systems at any time. To exercise your privacy rights, please submit a written request to <a href="mailto:privacy@srbrandsolutions.com" style={{ color: 'var(--color-accent-burgundy)', fontWeight: 600 }}>privacy@srbrandsolutions.com</a>.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(16,17,38,0.1)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                SR Brand Solutions reserves the right to update this policy periodically. Changes will be published on this page with an updated revision date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
