import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Intro({ onFinished }) {
  const containerRef = useRef(null);
  const wordRef = useRef([]);
  const wordmarkRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
      onFinished();
      return;
    }

    const words = wordRef.current.filter(Boolean);

    // Initial hidden states
    gsap.set(containerRef.current, { backgroundColor: '#F3EBDD', opacity: 1 });
    gsap.set(wordmarkRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(words, { y: '100%', opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        onFinished();
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          }
        });
      }
    });
    timelineRef.current = tl;

    // 1. Watermark scales in to original size & 0.15 opacity
    tl.to(wordmarkRef.current, {
      opacity: 0.15,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    });

    // 2. Headline words reveal sequentially
    tl.to(words, {
      y: '0%',
      opacity: 1,
      stagger: 0.12,
      duration: 1.0,
      ease: 'power4.out'
    }, '>-0.6');

    // 3. Pause moment before exit
    tl.to({}, { duration: 0.8 });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [onFinished]);

  return (
    <div
      ref={containerRef}
      id="intro-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#F3EBDD',
        color: '#101126',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background low-opacity brand title watermark */}
      <div
        ref={wordmarkRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 15rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          position: 'absolute',
          color: '#101126',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.03em',
          opacity: 0
        }}
      >
        SR BRAND
      </div>

      {/* Main reveal statement */}
      <div style={{ zIndex: 2, textAlign: 'center', overflow: 'hidden' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            lineHeight: 1.2,
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: '#101126'
          }}
        >
          {['Experiencing', 'Brands', 'Through', 'Sensation.'].map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                overflow: 'hidden',
                verticalAlign: 'bottom'
              }}
            >
              <span
                ref={(el) => (wordRef.current[i] = el)}
                style={{ display: 'inline-block' }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
