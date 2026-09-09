import React, { useRef } from 'react';
import { howWeWork } from '../data/howWeWork';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export default function HowWeWork() {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const panels = gsap.utils.toArray('.process-panel');
      
      // Horizontal translation timeline
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.5,
          start: 'top top',
          end: () => `+=${scrollSectionRef.current.scrollWidth - window.innerWidth}`,
          anticipatePin: 1
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="howwework" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Horizontal Panels Wrapper */}
      <div
        ref={scrollSectionRef}
        className="horizontal-scroll-container"
        style={{
          display: 'flex',
          width: `${howWeWork.length * 100}vw`,
          height: '100vh',
          backgroundColor: 'var(--color-bg)'
        }}
      >
        {howWeWork.map((step, index) => (
          <div
            key={step.id}
            className="process-panel"
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              
              {/* Image side */}
              <div style={{ position: 'relative', height: '55vh', overflow: 'hidden' }}>
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(15%)'
                  }}
                />
                {/* Large Background Step Number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    fontSize: 'clamp(5rem, 12vw, 10rem)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    color: 'rgba(16, 17, 38, 0.08)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {step.id}
                </div>
              </div>

              {/* Text side */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-small)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-accent-burgundy)',
                    fontWeight: 600,
                    marginBottom: '1rem'
                  }}
                >
                  Methodology / Step {step.id}
                </div>
                
                <h3
                  style={{
                    fontSize: 'var(--fs-h2)',
                    color: 'var(--color-text)',
                    marginBottom: '1.5rem',
                    fontWeight: 300
                  }}
                >
                  {step.title}
                </h3>
                
                <p
                  style={{
                    fontSize: 'var(--fs-body)',
                    opacity: 0.8,
                    lineHeight: 1.7,
                    maxWidth: '460px'
                  }}
                >
                  {step.description}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Mobile custom layout to fall back to sequential vertical scroll */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .horizontal-scroll-container {
            width: 100% !important;
            height: auto !important;
            flex-direction: column !important;
          }
          .process-panel {
            width: 100% !important;
            height: auto !important;
            padding: 5rem 0 !important;
          }
          .process-panel img {
            height: 35vh !important;
          }
        }
      `}} />
    </div>
  );
}
