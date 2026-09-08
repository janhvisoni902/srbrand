import React, { useEffect, useState } from 'react';
import Contact from '../components/Contact';

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | SR Brand Solutions";
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What regions and cities do you execute activations in?",
      a: "We operate pan-India across 25+ metro and Tier-1/2 cities including Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune, Kolkata, and Chennai. We also execute international activations across the UAE and GCC."
    },
    {
      q: "How early should we initiate planning for a major event or expo?",
      a: "For large-scale trade show pavilions or multi-city mall activations, we recommend starting 4 to 8 weeks in advance for optimal 3D spatial design, fabrication, and venue permissions. Quick-turnaround popups can be mobilized in 10-14 days."
    },
    {
      q: "Do you handle complete fabrication and turn-key setup on site?",
      a: "Yes, SR Brand Solutions provides 100% turn-key execution—from 3D conceptualization, structural engineering, fabrication, tech integration, staffing, to post-event teardown and data analytics reporting."
    },
    {
      q: "Can you customize activation tech like AR screens and RFID lead capture?",
      a: "Absolutely. Our in-house tech team builds custom software interfaces, RFID check-in kiosks, digital gamification wheels, and live lead-capture dashboards tailored to your campaign requirements."
    }
  ];

  return (
    <div className="contact-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* Page Header */}
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
            GET IN TOUCH
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Let's Bring Your Brand Vision To Life
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            Have an upcoming project, trade show requirement, or campaign brief? Fill out the inquiry form below or reach out directly to our team.
          </p>
        </div>
      </section>

      {/* Main Interactive Contact Component (Connected to Prisma & Supabase Postgres API) */}
      <Contact />

      {/* Office Locations */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent-gold)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
              GLOBAL PRESENCE
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)' }}>
              Our Office Locations
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(176, 141, 87, 0.2)', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '0.8rem' }}>
                Mumbai (HQ)
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                Suite 402, Signature Towers, BKC Commercial Complex, Bandra East, Mumbai 400051
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-gold)', display: 'block', marginTop: '1rem' }}>+91 98200 12345</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(176, 141, 87, 0.2)', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '0.8rem' }}>
                Delhi NCR
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                Level 7, Cyber City Tower B, DLF Phase 2, Gurugram, Delhi NCR 122002
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-gold)', display: 'block', marginTop: '1rem' }}>+91 98110 54321</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(176, 141, 87, 0.2)', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '0.8rem' }}>
                Bengaluru
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                Prestige Meridian Towers, MG Road, Executive Hub, Bengaluru 560001
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-gold)', display: 'block', marginTop: '1rem' }}>+91 98450 67890</span>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(176, 141, 87, 0.2)', padding: '2rem', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-accent-gold)', marginBottom: '0.8rem' }}>
                Dubai (GCC)
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                One Central Tower, Dubai World Trade Centre District, Dubai, UAE
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-gold)', display: 'block', marginTop: '1rem' }}>+971 4 300 9876</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent-burgundy)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)' }}>
              Everything You Need To Know
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                border: '1px solid rgba(16, 17, 38, 0.08)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-accent-gold)' }}>
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', fontSize: '0.95rem', color: 'rgba(16, 17, 38, 0.8)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
