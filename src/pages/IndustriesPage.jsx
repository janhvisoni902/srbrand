import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import { industriesData } from '../data/industries';
import {
  ShoppingCart,
  Tv,
  Car,
  Landmark,
  Building2,
  GraduationCap,
  HeartPulse,
  Store,
  Cpu,
  Plane,
  Film,
  Factory,
  Pill,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  ShoppingCart: ShoppingCart,
  Tv: Tv,
  Car: Car,
  Landmark: Landmark,
  Building2: Building2,
  GraduationCap: GraduationCap,
  HeartPulse: HeartPulse,
  Store: Store,
  Cpu: Cpu,
  Plane: Plane,
  Film: Film,
  Factory: Factory,
  Pill: Pill,
  Sparkles: Sparkles
};

export default function IndustriesPage() {
  useEffect(() => {
    document.title = "Industries We Serve | SR Brand Solutions";
  }, []);

  const flowNodes = [
    "Your Business",
    "Your Audience",
    "Your Market",
    "Your Objective",
    "Your Opportunity"
  ];

  return (
    <div className="industries-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* 1. Hero / Intro Block */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
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
            Industries We Serve
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Diverse Industries. Distinct Challenges. Tailored Solutions.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.9,
            lineHeight: 1.8,
            marginBottom: '1.2rem'
          }}>
            Every industry has a different audience, business environment, and set of challenges. At SR Brand Solutions, we understand that effective marketing cannot follow a one-size-fits-all approach.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(16, 17, 38, 0.8)',
            lineHeight: 1.7,
            marginBottom: '1.2rem'
          }}>
            Our integrated marketing expertise enables us to develop industry-specific brand activation, experiential marketing, events, retail, BTL, digital and consumer engagement solutions based on your business objectives and target audience.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(16, 17, 38, 0.8)',
            lineHeight: 1.7
          }}>
            From creating awareness and driving consumer engagement to strengthening channel relationships and supporting market expansion, we bring the right strategy and execution approach to every industry we serve.
          </p>
        </div>
      </section>

      {/* 2. Our Industry Expertise Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              SECTOR SPECIALIZATION
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)' }}>
              Our Industry Expertise
            </h2>
          </div>

          {/* 3 col desktop / 2 col tablet / 1 col mobile */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {industriesData.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || ShoppingCart;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '2.2rem 2rem',
                    border: '1px solid rgba(16, 17, 38, 0.08)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(176, 141, 87, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(16, 17, 38, 0.08)';
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(176, 141, 87, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent-gold)',
                    marginBottom: '1.5rem'
                  }}>
                    <IconComponent size={26} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    color: 'var(--color-text)',
                    marginBottom: '0.8rem',
                    lineHeight: 1.3
                  }}>
                    {item.name}
                  </h3>
                  <p style={{
                    fontSize: '0.92rem',
                    color: 'rgba(16, 17, 38, 0.8)',
                    lineHeight: 1.6,
                    flexGrow: 1
                  }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. "One Partner. Multiple Industry Solutions." section */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '950px' }}>
          <span style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-gold)',
            fontWeight: 700,
            display: 'block',
            marginBottom: '1rem'
          }}>
            CROSS-INDUSTRY INSIGHTS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem', color: '#F3EBDD' }}>
            One Partner. Multiple Industry Solutions.
          </h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.85, lineHeight: 1.8, marginBottom: '2rem' }}>
            Our cross-industry experience allows us to bring fresh ideas, proven execution practices, and consumer insights from one sector to another while ensuring that every campaign remains relevant to the brand and its audience.
          </p>

          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>
            We work closely with our clients to understand:
          </p>

          {/* Connected Flow Visual */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.8rem',
            marginBottom: '2.5rem'
          }}>
            {flowNodes.map((node, index) => (
              <React.Fragment key={index}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(176, 141, 87, 0.4)',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: '#F3EBDD',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}>
                  {node}
                </div>
                {index < flowNodes.length - 1 && (
                  <ArrowRight size={18} style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>

          <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '800px', margin: '0 auto' }}>
            We then translate these insights into customised marketing solutions that are creative, practical, scalable, and execution-ready.
          </p>
        </div>
      </section>

      {/* 4. Closing CTA Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-accent-burgundy)', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem' }}>
            Let's Create an Impactful Brand Experience
          </h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Whether you are looking to launch a product, enter a new market, increase retail visibility, engage consumers, strengthen channel relationships, or build brand awareness, SR Brand Solutions can help turn your marketing objectives into meaningful on-ground and digital experiences.
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
            <span>Get In Touch</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ stroke: '#101126' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
