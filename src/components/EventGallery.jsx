import React, { useRef } from 'react';
import { eventGallery } from '../data/events';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export default function EventGallery() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.gallery-item-inner',
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        stagger: 0.1,
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="section-padding"
      style={{ backgroundColor: '#101126', color: '#F3EBDD', overflow: 'hidden' }}
    >
      <div className="container">
        
        {/* Editorial Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            Creative Spaces
          </span>
          <h2 style={{ fontSize: 'var(--fs-h2)', color: '#F3EBDD' }}>
            Events & Experiences Gallery
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="editorial-grid">
          {eventGallery.map((item) => (
            <div
              key={item.id}
              className="gallery-item"
              style={{
                gridColumn: `span ${item.cols}`,
                gridRow: `span ${item.rows}`,
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: item.cols === 2 ? '16/9' : '4/5',
              }}
            >
              <div
                className="gallery-item-inner"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'var(--transition-smooth)',
                  }}
                />
                
                {/* Elegant overlay panel showing title on hover */}
                <div
                  className="gallery-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(16, 17, 38, 0.75)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                    opacity: 0,
                    transition: 'var(--transition-fast)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: 'var(--color-accent-gold)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      opacity: 0.8,
                    }}
                  >
                    SR Brand Solutions
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Styled overrides for the custom editorial layout */}
      <style dangerouslySetInnerHTML={{ __html: `
        .editorial-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          width: 100%;
        }

        .gallery-item-inner:hover .gallery-overlay {
          opacity: 1 !important;
        }

        .gallery-item-inner:hover img {
          transform: scale(1.05) !important;
        }

        @media (max-width: 1024px) {
          .editorial-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .gallery-item {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            aspect-ratio: 1/1 !important;
          }
        }

        @media (max-width: 480px) {
          .editorial-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}} />
    </section>
  );
}
