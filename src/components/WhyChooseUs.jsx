import React, { useRef } from 'react';
import { whyChooseUs } from '../data/whyChooseUs';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.reason-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
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
      id="whychooseus"
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          
          {/* Left Large Statement */}
          <div>
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
              Why Choose Us
            </span>
            <h2
              style={{
                fontSize: 'var(--fs-h2)',
                lineHeight: 1.1,
                color: '#F3EBDD',
                marginBottom: '2rem',
                fontWeight: 300
              }}
            >
              A different perspective on brand activations.
            </h2>
            <p style={{ opacity: 0.8, fontSize: 'var(--fs-body)', lineHeight: 1.7 }}>
              We understand that brand activations are not just about setting up stalls. It is about creating sensations, building trust, and driving actual business conversions through honest, strategic campaign planning.
            </p>
          </div>

          {/* Right Detailed Narrative (Grid of points) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {whyChooseUs.map((reason, index) => (
              <div
                key={reason.id}
                className="reason-item"
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(243, 235, 221, 0.1)',
                  paddingBottom: '1.5rem'
                }}
              >
                {/* Visual Number Label */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: 'var(--color-accent-gold)',
                    fontWeight: 500,
                    lineHeight: 1
                  }}
                >
                  0{index + 1}
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#F3EBDD',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p style={{ opacity: 0.75, fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
