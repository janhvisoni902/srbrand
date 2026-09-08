import React, { useRef } from 'react';
import { workPortfolio } from '../data/work';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export default function OurWork() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.portfolio-item',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
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
      id="work"
      ref={containerRef}
      className="section-padding"
      style={{ backgroundColor: '#101126', color: '#F3EBDD', overflow: 'hidden' }}
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
            Portfolio
          </span>
          <h2 style={{ fontSize: 'var(--fs-h2)', color: '#F3EBDD' }}>
            Featured Campaign Activations
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {workPortfolio.map((item) => (
            <div
              key={item.id}
              className="portfolio-item"
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1/1',
                backgroundColor: 'rgba(243, 235, 221, 0.05)',
                cursor: 'pointer'
              }}
            >
              {/* Inner wrapper to handle zoom + pan hover movement */}
              <div className="portfolio-inner" style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                />

                {/* Dark shade overlay */}
                <div
                  className="portfolio-shade"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(16, 17, 38, 0.9) 0%, rgba(16, 17, 38, 0.1) 80%)',
                    opacity: 0.9,
                    transition: 'var(--transition-smooth)'
                  }}
                />

                {/* Content Panel */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '2.5rem',
                    zIndex: 2,
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: 'var(--color-accent-gold)',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {item.category}
                  </div>
                  
                  <h3
                    className="portfolio-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: '#F3EBDD',
                      fontWeight: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    {item.title}
                    <span className="portfolio-arrow" style={{ transition: 'transform 0.4s ease' }}>
                      →
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Styled custom behaviors for portfolio */}
      <style dangerouslySetInnerHTML={{ __html: `
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
          width: 100%;
        }

        .portfolio-item:hover img {
          transform: scale(1.08) translate(5px, 5px) !important;
        }

        .portfolio-item:hover .portfolio-shade {
          opacity: 1 !important;
          background: linear-gradient(to top, rgba(122, 35, 49, 0.85) 0%, rgba(16, 17, 38, 0.2) 100%) !important;
        }

        .portfolio-item:hover .portfolio-arrow {
          transform: translateX(8px) !important;
        }

        @media (max-width: 480px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}} />
    </section>
  );
}
