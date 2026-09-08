import React from 'react';
import { clients } from '../data/clients';

export default function Clients() {
  // Duplicate list to make seamless scrolling marquee loop
  const marqueeList = [...clients, ...clients];

  return (
    <section
      id="clients"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(16, 17, 38, 0.05)'
      }}
    >
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-small)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            Credibility
          </span>
          <h2 style={{ fontSize: 'var(--fs-h3)', color: 'var(--color-text)' }}>
            Trusted by Industry Leading Brands
          </h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="marquee-wrapper" style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
          <div
            className="marquee-track"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4rem',
              width: 'max-content',
              animation: 'scroll-marquee 35s linear infinite'
            }}
          >
            {marqueeList.map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                style={{
                  width: '140px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.65,
                  filter: 'grayscale(100%) contrast(1.2)',
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.filter = 'grayscale(0%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.65';
                  e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2)';
                }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Styled Keyframes for Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}} />
    </section>
  );
}
