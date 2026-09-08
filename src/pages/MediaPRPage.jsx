import React, { useEffect } from 'react';
import { Link } from '../lib/router';

export default function MediaPRPage() {
  useEffect(() => {
    document.title = "Media & PR | SR Brand Solutions";
  }, []);

  const pressReleases = [
    {
      date: "August 15, 2026",
      title: "SR Brand Solutions Expands Middle East Footprint With New Regional Hub in Dubai",
      summary: "SR Brand Solutions announces the official launch of its Dubai regional headquarters to deliver experiential marketing and corporate event builds across the GCC region."
    },
    {
      date: "June 02, 2026",
      title: "SR Brand Solutions Wins 'Best Experiential Agency of the Year' at Experiential Marketing Summit",
      summary: "Recognized for creative spatial architecture, zero-waste sustainable pavilions, and data-driven activation metrics across 50+ major brand campaigns."
    },
    {
      date: "March 18, 2026",
      title: "SR Brand Solutions Unveils AI-Powered Real-Time Audience Analytics for Live Activations",
      summary: "Introducing an integrated sensor & camera analytics stack that measures footfall velocity, dwell time, and emotional engagement without violating attendee privacy."
    }
  ];

  const mediaCoverage = [
    {
      publication: "Economic Times",
      title: "How Experiential Marketing Is Taking Over B2B Tech Expos in 2026",
      quote: "SR Brand Solutions is redefining traditional trade booths into high-tech interactive brand ecosystems.",
      logoText: "ET BRAND EQUITY"
    },
    {
      publication: "Financial Express",
      title: "The Rise of Zero-Waste Experiential Event Architecture",
      quote: "Leading the charge in sustainable event production with modular recyclable pavilion designs.",
      logoText: "FINANCIAL EXPRESS"
    },
    {
      publication: "Marketing Mind",
      title: "Top 10 Agencies Driving Pan-India Brand Activations",
      quote: "From metro popups to multi-city car launches, SR Brand Solutions sets the gold standard for execution.",
      logoText: "MARKETING MIND"
    }
  ];

  return (
    <div className="media-pr-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
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
            PRESS & RECOGNITION
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Media Features, News & Press Releases
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            Stay updated with official company announcements, industry features, press coverage, and downloadable brand assets.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)' }}>
              Official Press Releases
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {pressReleases.map((pr, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '2.5rem',
                border: '1px solid rgba(16, 17, 38, 0.08)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {pr.date}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)' }}>
                  {pr.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(16, 17, 38, 0.8)', lineHeight: 1.6 }}>
                  {pr.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Coverage */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent-gold)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
              IN THE NEWS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)' }}>
              What The Media Says About Us
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {mediaCoverage.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(176, 141, 87, 0.2)',
                padding: '2.5rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-accent-gold)', display: 'block', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                    {item.logoText}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#F3EBDD', marginBottom: '1rem' }}>
                    "{item.title}"
                  </h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                    {item.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Media Kit */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '900px', backgroundColor: '#fff', borderRadius: '16px', padding: '3.5rem', border: '1px solid rgba(16,17,38,0.1)', boxShadow: '0 12px 36px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)', marginBottom: '1rem' }}>
            Official Media Kit & Assets
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(16, 17, 38, 0.8)', marginBottom: '2.5rem' }}>
            Download vector brand logos, high-resolution executive portraits, company factsheet, and brand guidelines for press publications.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Media Kit download zip package initiated."); }}
              className="nav-cta-btn"
              style={{
                padding: '0.9rem 2rem',
                backgroundColor: 'var(--color-text)',
                color: '#F3EBDD',
                borderColor: 'var(--color-text)'
              }}
            >
              Download Press Kit (.ZIP)
            </a>
            <Link
              href="/contact"
              className="nav-cta-btn"
              style={{
                padding: '0.9rem 2rem',
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
                borderColor: 'var(--color-text)'
              }}
            >
              Contact PR Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
