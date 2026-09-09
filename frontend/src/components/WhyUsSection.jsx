import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

// Tunable autoplay interval in milliseconds (default: 2000ms / 2 seconds)
const AUTOPLAY_INTERVAL_MS = 2000;

// Existing project asset images used for the carousel
const carouselImages = [
  {
    id: 1,
    src: '/images/frame1.jpg',
    alt: 'Apple WWDC and tech brand event showcase setup by SR Brand Solutions',
    caption: 'Tech Brand Experience'
  },
  {
    id: 2,
    src: '/images/frame2.jpg',
    alt: 'Grand lighting and stage design for brand launch activation',
    caption: 'Stage & Lighting Production'
  },
  {
    id: 3,
    src: '/images/frame3.jpg',
    alt: 'Fashion and lifestyle brand activation setup',
    caption: 'Creative Direction & Styling'
  },
  {
    id: 4,
    src: '/images/frame4.jpg',
    alt: 'Experiential event setup with audience engagement',
    caption: 'Experiential Event Activation'
  },
  {
    id: 5,
    src: '/images/frame5.jpg',
    alt: 'Concert venue lighting and stage spectacle for product unveiling',
    caption: 'Product Unveiling Spectacle'
  },
  {
    id: 6,
    src: '/images/frame6.jpg',
    alt: 'Retail mobile store launch and consumer engagement activation',
    caption: 'BTL Retail Activation'
  },
  {
    id: 7,
    src: '/images/frame7.jpg',
    alt: 'Outdoor retail presence and experiential brand space',
    caption: 'Outdoor Retail Presence'
  },
  {
    id: 8,
    src: '/images/frame8.jpg',
    alt: 'Customized premium stage and corporate event decor',
    caption: 'Corporate Event Decor'
  }
];

export default function WhyUsSection() {
  const containerRef = useRef(null);
  const carouselCardRef = useRef(null);
  const timerRef = useRef(null);

  // Check prefers-reduced-motion setting
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);

  // Touch tracking refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detect reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
    const handleChange = (e) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  // IntersectionObserver to pause autoplay when offscreen
  useEffect(() => {
    const target = containerRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Page Visibility API to pause autoplay when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Reset timer on manual navigation
  const handleManualNav = useCallback((action) => {
    action();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Autoplay effect loop
  useEffect(() => {
    if (isReducedMotion || !isPlaying || isHovered || !isInView || !isTabActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, isHovered, isInView, isTabActive, isReducedMotion, nextSlide]);

  // Touch gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSwipeLeft = distance > 50;
    const isSwipeRight = distance < -50;

    if (isSwipeLeft) {
      handleManualNav(nextSlide);
    } else if (isSwipeRight) {
      handleManualNav(prevSlide);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard support when focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleManualNav(prevSlide);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleManualNav(nextSlide);
    } else if (e.key === ' ' || e.key === 'KeyP') {
      e.preventDefault();
      setIsPlaying((prev) => !prev);
    }
  };

  // GSAP scroll reveal sequence for section elements
  useGSAP(() => {
    if (isReducedMotion) return;

    gsap.fromTo(
      '.why-us-reveal',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(16, 17, 38, 0.08)'
      }}
    >
      <div className="container">
        
        {/* 1. Centered Small Eyebrow Label */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            className="why-us-reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-small)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.75rem'
            }}
          >
            WHY US?
          </span>

          {/* 2. Centered Large Headline */}
          <h2
            className="why-us-reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              lineHeight: 1.12,
              fontWeight: 800,
              color: 'var(--color-text)',
              maxWidth: '850px',
              margin: '0 auto 1rem',
              letterSpacing: '-0.03em'
            }}
          >
            Not just marketing.{' '}
            <br />
            <span style={{ color: 'var(--color-accent-burgundy)', fontWeight: 800 }}>
              It's SR Brand Solutions.
            </span>
          </h2>

          {/* 3. Centered Subheading */}
          <p
            className="why-us-reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'var(--color-text)',
              opacity: 0.75,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            From flagship events to BTL retail activations, find solutions that tell a story.
          </p>
        </div>

        {/* 4. Three-Column Layout (Vertically Centered, Stacking on Mobile) */}
        <div
          className="why-us-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* LEFT COLUMN: 2 text blocks + 1 stat card */}
          <div className="why-us-reveal why-us-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: '0.6rem',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em'
                }}
              >
                Aesthetic is a language & we speak <i style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>beautiful</i>
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  opacity: 0.8,
                  margin: 0
                }}
              >
                Every space here isn't just a location, a stage for your story.
              </p>
            </div>

            {/* Orange/Tan Highlight Stat Box matching Reference */}
            <div
              style={{
                backgroundColor: 'var(--color-accent-burgundy)',
                color: '#F3EBDD',
                borderRadius: '20px',
                padding: '2rem 1.75rem',
                boxShadow: '0 10px 30px rgba(122, 35, 49, 0.15)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '3rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  color: '#ffffff'
                }}
              >
                50+
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  opacity: 0.92,
                  margin: 0,
                  fontWeight: 400
                }}
              >
                Curated activations. Unexpected. Intentional. Never boring. Each one handcrafted for brands that think different.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: '0.6rem',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em'
                }}
              >
                Execute like a pro in 60 seconds
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  opacity: 0.8,
                  margin: 0
                }}
              >
                Browse, plan, execute. From hourly shoots to full day activations - We've got this, so you go - Create magic!
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: Image Carousel with EXACT ASYMMETRIC ARCH FRAME SHAPE */}
          <div className="why-us-reveal why-us-carousel-col">
            {/* Screen Reader Live Region for Slide Announcements */}
            <div className="sr-only" aria-live="polite">
              {`Slide ${currentIndex + 1} of ${carouselImages.length}: ${carouselImages[currentIndex].caption}. ${carouselImages[currentIndex].alt}`}
            </div>

            <div
              ref={carouselCardRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              role="region"
              aria-label="Why Us Project Image Carousel"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5.4',
                // EXACT ARCHED FRAME SHAPE: Large curved arches on top-left and bottom-left!
                borderRadius: '160px 24px 24px 160px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(16, 17, 38, 0.16)',
                outline: 'none',
                backgroundColor: '#EAE3D5'
              }}
            >
              {/* Sliding Track for Images */}
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: isReducedMotion ? 'none' : 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {carouselImages.map((img, idx) => (
                  <div
                    key={img.id}
                    style={{
                      minWidth: '100%',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={idx <= 1 ? 'eager' : 'lazy'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />

                    {/* Gradient Overlay for Caption Readability */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: '3rem 1.8rem 3.5rem',
                        background: 'linear-gradient(to top, rgba(16, 17, 38, 0.85) 0%, rgba(16, 17, 38, 0) 100%)',
                        color: '#F3EBDD',
                        boxSizing: 'border-box',
                        pointerEvents: 'none'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          fontWeight: 600,
                          color: 'var(--color-accent-gold)',
                          display: 'block',
                          marginBottom: '0.2rem'
                        }}
                      >
                        SR BRAND SOLUTIONS
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          margin: 0,
                          fontWeight: 500,
                          color: '#F3EBDD'
                        }}
                      >
                        {img.caption}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* OVERLAID PREV / NEXT ARROW BUTTONS (Always Visible) */}
              <button
                type="button"
                onClick={() => handleManualNav(prevSlide)}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '16px',
                  transform: 'translateY(-50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  transition: 'transform 0.2s ease, background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.color = '#101126';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft size={22} strokeWidth={2.2} />
              </button>

              <button
                type="button"
                onClick={() => handleManualNav(nextSlide)}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '16px',
                  transform: 'translateY(-50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10,
                  transition: 'transform 0.2s ease, background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.color = '#101126';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight size={22} strokeWidth={2.2} />
              </button>

              {/* OVERLAID DOT INDICATORS PILL ROW (Centered at bottom) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 10,
                  padding: '7px 16px',
                  borderRadius: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {carouselImages.map((_, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleManualNav(() => goToSlide(idx))}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: isActive ? '10px' : '8px',
                        height: isActive ? '10px' : '8px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                    />
                  );
                })}
              </div>

              {/* ACCESSIBLE PLAY/PAUSE TOGGLE BUTTON (Hidden if prefers-reduced-motion) */}
              {!isReducedMotion && (
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? 'Pause slide show' : 'Play slide show'}
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 17, 38, 0.65)',
                    color: '#F3EBDD',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    backdropFilter: 'blur(4px)',
                    transition: 'background-color 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(16, 17, 38, 0.88)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(16, 17, 38, 0.65)';
                  }}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 1 text block + 1 stat card matching reference */}
          <div className="why-us-reveal why-us-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  marginBottom: '0.6rem',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em'
                }}
              >
                For dreamers who make realities
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  opacity: 0.8,
                  margin: 0
                }}
              >
                We exist for visionaries - creators, brands, influencers, artists - if you see a blank space and imagine infinite possibilities, you belong here!
              </p>
            </div>

            {/* Green/Gold Stat Card with Starburst Icon matching Reference */}
            <div
              style={{
                backgroundColor: 'var(--color-accent-gold)',
                color: '#101126',
                borderRadius: '20px',
                padding: '2rem 1.75rem',
                boxShadow: '0 10px 30px rgba(176, 141, 87, 0.2)',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '3rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  color: '#101126'
                }}
              >
                150+
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  fontWeight: 500,
                  margin: '0 0 1.25rem 0',
                  color: 'rgba(16, 17, 38, 0.9)'
                }}
              >
                Dreamers, Brands and Partners trust SR Brand Solutions with their ideas
              </p>
              
              <Sparkles size={28} style={{ color: '#101126' }} />
            </div>
          </div>
        </div>

      </div>

      {/* Responsive layout styles for mobile column stacking */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .why-us-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .why-us-carousel-col {
            order: 1 !important; /* Image carousel is ALWAYS FIRST on mobile */
          }
          .why-us-left-col {
            order: 2 !important;
          }
          .why-us-right-col {
            order: 3 !important;
          }
        }
      `}} />
    </section>
  );
}
