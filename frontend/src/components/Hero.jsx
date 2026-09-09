import React, { useEffect, useRef } from 'react';
import ThreeHero from './ThreeHero';
import ConfettiBurst from './ConfettiBurst';
import { gsap } from '../lib/gsap';
import { Link } from '../lib/router';

export default function Hero({ active, completed, onComplete, onSkip, showSkipControl }) {
  // Refs for element animation targets
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line2PartRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollCueRef = useRef(null);
  const skipRef = useRef(null);
  
  // Reference to hold GSAP timeline
  const tlRef = useRef(null);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo('#services');
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is active or intro has been skipped/completed
    if (prefersReducedMotion || completed) {
      gsap.set([line1Ref.current, line2Ref.current, line2PartRef.current], { y: '0%' });
      gsap.set([subheadingRef.current, ctaRef.current, scrollCueRef.current], { opacity: 1 });
      if (tlRef.current) {
        tlRef.current.kill();
      }
      return;
    }

    if (!active) {
      // Keep hidden initially (First Paint & during loader overlay phase)
      gsap.set([line1Ref.current, line2Ref.current, line2PartRef.current], { y: '100%' });
      gsap.set([subheadingRef.current, ctaRef.current, scrollCueRef.current], { opacity: 0 });
      return;
    }

    // Build the sequenced animation timeline once component becomes active
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });
    tlRef.current = tl;

    // 1. Headline line 1 reveals first (slides up from below)
    tl.to(line1Ref.current, {
      y: '0%',
      duration: 0.8,
      ease: 'power3.out'
    });

    // 2. Headline line 2 staggered ~0.12s after line 1 starts
    tl.to([line2Ref.current, line2PartRef.current], {
      y: '0%',
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out'
    }, '>-0.68'); // 0.8s - 0.12s = 0.68s delay

    // 3. Subheading & CTA fades up after headline finishes (~0.3s delay)
    tl.to([subheadingRef.current, ctaRef.current], {
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '+=0.3');

    // 4. Scroll cue in the bottom right fades in last
    tl.to(scrollCueRef.current, {
      opacity: 0.5,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Fade in skip button gently at the start
    gsap.fromTo(skipRef.current, { opacity: 0 }, { opacity: 0.35, duration: 0.5, delay: 0.2 });

    // Cleanup timeline on unmount
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [active, completed, onComplete]);

  return (
    <section
      id="home"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* 3D WebGL background */}
      <ThreeHero />

      {/* Confetti Overlay Canvas */}
      {completed && <ConfettiBurst />}

      <div
        className="container"
        style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          paddingTop: '6.5rem'
        }}
      >
        <div style={{ maxWidth: '850px', textAlign: 'left', marginTop: '3.5rem' }}>
          {/* Headline containing masked lines */}
          <h1
            style={{
              fontSize: 'var(--fs-hero)',
              color: 'var(--color-text)',
              marginBottom: '2rem',
              lineHeight: 0.95,
              fontWeight: 300,
            }}
          >
            {/* Mask Line 1 */}
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <span
                ref={line1Ref}
                style={{
                  display: 'inline-block',
                  transform: 'translateY(0%)'
                }}
              >
                We Shape
              </span>
            </div>
            {/* Mask Line 2 */}
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <span
                ref={line2Ref}
                style={{
                  display: 'inline-block',
                  color: 'var(--color-accent-gold)',
                  fontStyle: 'italic',
                  transform: 'translateY(0%)'
                }}
              >
                Captivating
              </span>{' '}
              <span
                ref={line2PartRef}
                style={{
                  display: 'inline-block',
                  transform: 'translateY(0%)'
                }}
              >
                Brands.
              </span>
            </div>
          </h1>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            style={{
              fontSize: 'var(--fs-body)',
              color: 'var(--color-text)',
              opacity: 1,
              maxWidth: '540px',
              marginBottom: '3rem',
              lineHeight: 1.6,
            }}
          >
            SR Brand Solutions crafts high-impact ATL & BTL activation campaigns, large-format corporate launches, and premium brand designs that evoke positive sentiment and drive powerful, measurable return on investment.
          </p>

          {/* CTA */}
          <div ref={ctaRef} style={{ opacity: 1 }}>
            <Link
              href="/services"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                backgroundColor: 'var(--color-text)',
                color: 'var(--color-bg)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                transition: 'var(--transition-fast)',
                border: '1px solid var(--color-text)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-text)';
                e.currentTarget.style.color = 'var(--color-bg)';
              }}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Floating scroll cue indicator */}
      <div
        ref={scrollCueRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          opacity: 0,
          zIndex: 2,
          pointerEvents: 'none',
          color: 'var(--color-text)'
        }}
      >
        Scroll ↓
      </div>

      {/* Skip Intro controls */}
      {showSkipControl && (
        <button
          ref={skipRef}
          onClick={onSkip}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '3rem',
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-text)',
            cursor: 'pointer',
            opacity: 0.35,
            zIndex: 10,
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.35'; }}
        >
          Skip Intro
        </button>
      )}
    </section>
  );
}
