import React, { useEffect } from 'react';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import { Link } from '../lib/router';

export default function ClientsPage() {
  useEffect(() => {
    document.title = "Our Clients & Partners | SR Brand Solutions";
  }, []);

  const stats = [
    { number: "150+", label: "Fortune 500 & Global Brands" },
    { number: "500+", label: "Successful Activations Executed" },
    { number: "98%", label: "Client Retention & Repeat Contracts" },
    { number: "25+", label: "Cities Across India & Overseas" }
  ];

  return (
    <div className="clients-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
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
            TRUST & ALLIANCES
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Trusted By Global Industry Pioneers
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            From market leaders to high-growth tech innovators, we partner with visionary organizations to turn brand goals into live physical experiences.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section style={{ backgroundColor: '#101126', color: '#F3EBDD', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {stats.map((s, idx) => (
              <div key={idx}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-gold)',
                  display: 'block'
                }}>
                  {s.number}
                </span>
                <span style={{ fontSize: '0.85rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Clients Grid Component */}
      <Clients />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to action */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-accent-burgundy)', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem' }}>
            Join Our Roster of Industry Leaders
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem' }}>
            Let's build a long-term partnership focused on creative breakthroughs and execution excellence.
          </p>
          <Link
            href="/contact"
            className="nav-cta-btn"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.95rem',
              backgroundColor: '#F3EBDD',
              color: '#101126',
              borderColor: '#F3EBDD',
              display: 'inline-flex'
            }}
          >
            <span>Become a Client Partner</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ stroke: '#101126' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
