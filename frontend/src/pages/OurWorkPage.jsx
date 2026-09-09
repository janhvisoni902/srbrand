import React, { useState, useEffect } from 'react';
import OurWork from '../components/OurWork';
import EventGallery from '../components/EventGallery';
import { Link } from '../lib/router';

export default function OurWorkPage() {
  useEffect(() => {
    document.title = "Our Work & Portfolio | SR Brand Solutions";
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Experiential', 'Exhibitions', 'Retail Activations', 'Corporate Events'];

  const projects = [
    {
      title: "Tech Summit 2025 Experience Zone",
      category: "Experiential",
      metrics: "45,000+ Engagements | 98% CSAT",
      desc: "Immersive 360-degree LED tunnel and interactive touch walls for enterprise tech keynote.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Luxury Mobility Pavilion",
      category: "Exhibitions",
      metrics: "3.2M Impressions | 450+ Qualified Leads",
      desc: "Custom architectural auto booth featuring kinetic light displays and VIP lounge experience.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Nationwide FMCG Mall Activation",
      category: "Retail Activations",
      metrics: "12 Cities | 120k+ Product Samples Distributed",
      desc: "Multi-city interactive sampling hub with real-time digital gamification boards.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Annual Global Leadership Gala",
      category: "Corporate Events",
      metrics: "1,200 Executive Attendees | Pan-Asia Broadcast",
      desc: "High-level corporate award ceremony with holographic stage production and bespoke lighting.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "FinTech Innovation Dome",
      category: "Experiential",
      metrics: "85,000+ App Downloads | 4.9 Star Rating",
      desc: "Geodesic dome setup with multi-user touch screens demonstrating cashless banking solutions.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Sustainable Architecture Expo",
      category: "Exhibitions",
      metrics: "25k+ Visitors | Best Sustainable Booth Award",
      desc: "Zero-waste exhibition booth constructed entirely from recycled eco-composites.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="work-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
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
            PORTFOLIO SHOWCASE
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Extraordinary Executions & Brand Campaigns
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            Explore our curated gallery of pan-India activations, corporate galas, trade pavilions, and interactive experiential environments.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="section-padding">
        <div className="container">
          {/* Filter Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  border: activeCategory === cat ? '2px solid var(--color-accent-burgundy)' : '1px solid rgba(16, 17, 38, 0.2)',
                  backgroundColor: activeCategory === cat ? 'var(--color-accent-burgundy)' : 'transparent',
                  color: activeCategory === cat ? '#F3EBDD' : 'var(--color-text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            {filteredProjects.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                border: '1px solid rgba(16,17,38,0.08)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(16, 17, 38, 0.85)',
                    color: '#F3EBDD',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {item.metrics}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-text)', marginBottom: '0.8rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(16, 17, 38, 0.75)', lineHeight: 1.6, flexGrow: 1 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Works component */}
      <OurWork />

      {/* Event Gallery */}
      <EventGallery />

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem', color: 'var(--color-accent-gold)' }}>
            Have a High-Stakes Event Coming Up?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '2.5rem' }}>
            Let SR Brand Solutions transform your brief into an award-winning experiential showcase.
          </p>
          <Link
            href="/contact"
            className="nav-cta-btn"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.95rem',
              borderColor: 'var(--color-accent-gold)',
              color: '#F3EBDD',
              display: 'inline-flex'
            }}
          >
            <span>Discuss Your Project</span>
            <svg className="cta-arrow" viewBox="0 0 10 10">
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
