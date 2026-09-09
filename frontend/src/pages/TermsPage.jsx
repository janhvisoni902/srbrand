import React, { useEffect } from 'react';
import { Link } from '../lib/router';

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions | SR Brand Solutions";
  }, []);

  return (
    <div className="terms-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
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
            SERVICE FRAMEWORK
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Terms & Conditions
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website or engaging SR Brand Solutions ("Agency") for experiential marketing, trade show production, event fabrication, or brand strategy services, you agree to be bound by these Terms & Conditions. If you do not agree, please refrain from using our services.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                2. Scope of Services & Statements of Work (SOW)
              </h2>
              <p>
                All experiential projects, activation builds, and event production deliverables are governed by individual Statements of Work (SOW) or formal client proposals signed by authorized representatives. Specific timelines, fabrication specs, payment milestones, and venue guidelines outlined in signed SOWs take precedence in project execution.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                3. Intellectual Property & Spatial Designs
              </h2>
              <p>
                All 3D architectural renders, event concepts, brand activation strategies, digital assets, and proprietary proposals created by SR Brand Solutions remain the exclusive intellectual property of the Agency until all project fees and final invoices are paid in full. Upon full settlement, usage rights transfer in accordance with the signed SOW.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                4. Client Responsibilities & Approvals
              </h2>
              <p>
                Clients are responsible for providing timely brand assets, high-resolution logos, vector graphics, copy approvals, and designated venue clearances required for project execution. Delays in client approvals may result in revised delivery schedules or expedited fabrication fees.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                5. Payment Terms & Cancellation Policies
              </h2>
              <p>
                Standard billing terms require an advance mobilization deposit prior to fabrication and material procurement, with balance payments tied to key milestone completions. Project cancellations must be submitted in writing. Mobilization expenses, custom fabrication materials, and venue reservation deposits already incurred are non-refundable.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                6. Limitation of Liability & Force Majeure
              </h2>
              <p>
                Neither party shall be held liable for failure or delay in performance resulting from events beyond reasonable control—including natural disasters, extreme weather disruptions, government restrictions, venue access shutdowns, or public emergencies. The Agency's total liability under any claim shall not exceed the total fees paid by the client under the applicable SOW.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                7. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(16,17,38,0.1)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                If you have any questions regarding these Terms & Conditions, please contact legal@srbrandsolutions.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
