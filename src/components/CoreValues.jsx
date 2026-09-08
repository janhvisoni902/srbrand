import React, { useRef } from 'react';
import { coreValues } from '../data/coreValues';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export default function CoreValues() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.value-card',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="corevalues"
      ref={containerRef}
      className="section-padding"
      style={{
        backgroundColor: '#101126',
        color: '#F3EBDD',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-small)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent-gold)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            Our Core Values
          </span>
          <h2 style={{ fontSize: 'var(--fs-h2)', color: '#F3EBDD', fontWeight: 300 }}>
            The Pillars of SR Brand Solutions
          </h2>
        </div>

        {/* Values Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem'
          }}
        >
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="value-card"
              style={{
                borderLeft: '1px solid var(--color-accent-gold)',
                paddingLeft: '2rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-accent-gold)',
                  fontWeight: 500
                }}
              >
                {val.title}
              </div>
              <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6 }}>
                {val.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
