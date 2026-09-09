import React, { useState, useRef, useEffect } from 'react';
import { testimonials } from '../data/testimonials';
import { gsap } from '../lib/gsap';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const quoteContainerRef = useRef(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Trigger GSAP fade-in transition whenever activeIndex changes
  useEffect(() => {
    if (quoteContainerRef.current) {
      gsap.fromTo(
        quoteContainerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Accent Tag */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-small)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-accent-burgundy)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '2rem'
          }}
        >
          Testimonials
        </span>

        {/* Quote slide wrapper */}
        <div ref={quoteContainerRef} style={{ minHeight: '220px', marginBottom: '3rem' }}>
          {/* Quote Icon */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4.5rem',
              color: 'var(--color-accent-gold)',
              lineHeight: 1,
              marginBottom: '1rem',
              opacity: 0.5
            }}
          >
            “
          </div>

          {/* Quote Text */}
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              lineHeight: 1.5,
              fontWeight: 300,
              marginBottom: '2rem',
              color: 'var(--color-text)',
              fontStyle: 'italic'
            }}
          >
            {current.text}
          </blockquote>

          {/* Client Name & Rating */}
          <div>
            <cite
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-accent-burgundy)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontStyle: 'normal'
              }}
            >
              {current.name}
            </cite>
            
            {/* Rating Stars */}
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '4px', color: 'var(--color-accent-gold)' }}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <span key={i} style={{ fontSize: '1.1rem' }}>★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            style={{
              background: 'transparent',
              border: '1px solid rgba(16, 17, 38, 0.2)',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'var(--transition-fast)',
              color: 'var(--color-text)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-burgundy)';
              e.currentTarget.style.color = 'var(--color-accent-burgundy)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(16, 17, 38, 0.2)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            ←
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            style={{
              background: 'transparent',
              border: '1px solid rgba(16, 17, 38, 0.2)',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'var(--transition-fast)',
              color: 'var(--color-text)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-burgundy)';
              e.currentTarget.style.color = 'var(--color-accent-burgundy)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(16, 17, 38, 0.2)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}
