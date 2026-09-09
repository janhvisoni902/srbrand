import React, { useRef } from 'react';
import { caseStudies } from '../data/caseStudies';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export default function CaseStudies() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal animation for case study titles & blocks
    gsap.fromTo(
      '.case-study-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="casestudies"
      ref={containerRef}
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', position: 'relative' }}
    >
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'left', marginBottom: '5rem', maxWidth: '600px' }}>
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
            Proven Track Record
          </span>
          <h2 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-text)' }}>
            Flagship Brand Case Studies
          </h2>
        </div>

        {/* List of Case Studies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {caseStudies.map((study, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={study.id}
                className="case-study-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '4rem',
                  alignItems: 'center',
                }}
              >
                {/* Image side - Alternate order on desktop */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    position: 'relative',
                    height: '50vh',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(20%) contrast(1.05)'
                    }}
                  />
                  {/* Decorative frame overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      right: '15px',
                      bottom: '15px',
                      border: '1px solid rgba(16, 17, 38, 0.1)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Content side */}
                <div style={{ order: isEven ? 2 : 1, textAlign: 'left' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-gold)',
                      fontWeight: 600,
                      marginBottom: '0.5rem'
                    }}
                  >
                    Client: {study.client}
                  </div>
                  
                  <h3
                    style={{
                      fontSize: 'var(--fs-h3)',
                      color: 'var(--color-text)',
                      marginBottom: '2rem',
                      fontWeight: 300
                    }}
                  >
                    {study.title}
                  </h3>

                  {/* Objective & Execution details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent-burgundy)', marginBottom: '0.3rem' }}>Objective</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{study.objective}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent-burgundy)', marginBottom: '0.3rem' }}>Execution</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>{study.execution}</p>
                    </div>
                    
                    <div>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent-burgundy)', marginBottom: '0.3rem' }}>Outcome</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.95rem', fontWeight: 500 }}>{study.outcome}</p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
