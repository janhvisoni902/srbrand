import React, { useState, useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from '../lib/router';
import WhyUsSection from './WhyUsSection';

export default function About() {
  const [imageError, setImageError] = useState(false);
  
  // Ref handles for GSAP context scoping
  const containerRef = useRef(null);
  const ambientCanvasRef = useRef(null);

  // ScrollTrigger layout refresh and Page Metadata update on mount
  useEffect(() => {
    document.title = "About Us | SR Brand Solutions";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Founded five years ago, SR Brand Solutions is led by Mr. Rajeev Wadhwa, offering nearly two decades of brand activation experience.');

    // Wait for all content (fonts, images, layouts) to resolve
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    });
  }, []);

  // Refs for specific animation elements
  const introHeadlineRef = useRef(null);
  const introParagraphsRef = useRef(null);
  const founderPhotoRef = useRef(null);
  const founderBioRef = useRef(null);
  const growthTimelineRef = useRef(null);
  const storyBlockRef = useRef(null);
  const growthBlockRef = useRef(null);
  const careersBlockRef = useRef(null);

  // Ambient particles background loop (paused under prefers-reduced-motion)
  useEffect(() => {
    const canvas = ambientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial particles setup (30 low-opacity slow drifting dots)
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      opacity: 0.05 + Math.random() * 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#B08D57'; // gold color accent

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap boundaries
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Advanced GSAP animations scoped using useGSAP and gsap.context
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Scoped context cleanup is handled automatically by useGSAP hook
    if (prefersReducedMotion) return; // Skip sequenced reveals if reduced motion is requested

    // 1. SECTION 1: Intro sequence
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: introHeadlineRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
    introTl.fromTo(
      introHeadlineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    const paragraphs = introParagraphsRef.current?.children;
    if (paragraphs) {
      introTl.fromTo(
        Array.from(paragraphs),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // 2. SECTION 2: Founder Profile sequence
    const founderTl = gsap.timeline({
      scrollTrigger: {
        trigger: founderPhotoRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    founderTl.fromTo(
      founderPhotoRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
    );
    founderTl.fromTo(
      founderBioRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.7' // Starts shortly after portrait begins animating
    );

    // 3. SECTION 3: Our Story grouped reveal
    const storyChildren = [];
    if (storyBlockRef.current) {
      const span = storyBlockRef.current.querySelector('span');
      const h2 = storyBlockRef.current.querySelector('h2');
      const div = storyBlockRef.current.querySelector('div');
      if (span) storyChildren.push(span);
      if (h2) storyChildren.push(h2);
      if (div) {
        const paras = div.querySelectorAll('p');
        paras.forEach(p => storyChildren.push(p));
      }
    }

    if (storyChildren.length > 0) {
      gsap.fromTo(
        storyChildren,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyBlockRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 4. SECTION 4: Our Growth Journey text grouped reveal
    if (growthBlockRef.current) {
      const growthChildren = Array.from(growthBlockRef.current.children);
      gsap.fromTo(
        growthChildren,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: growthBlockRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 5. SECTION 5: Careers grouped reveal
    const careersChildren = [];
    if (careersBlockRef.current) {
      const span = careersBlockRef.current.querySelector('span');
      const h2 = careersBlockRef.current.querySelector('h2');
      const div = careersBlockRef.current.querySelector('div');
      const btn = careersBlockRef.current.querySelector('a');
      if (span) careersChildren.push(span);
      if (h2) careersChildren.push(h2);
      if (div) {
        const paras = div.querySelectorAll('p');
        paras.forEach(p => careersChildren.push(p));
      }
      if (btn) careersChildren.push(btn);
    }

    if (careersChildren.length > 0) {
      gsap.fromTo(
        careersChildren,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: careersBlockRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 6. SECTION 4 Path Drawing Trigger
    const growthTl = gsap.timeline({
      scrollTrigger: {
        trigger: growthTimelineRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // Animate timeline path line drawing in
    const pathLine = growthTimelineRef.current?.querySelector('.timeline-growth-line');
    const marker = growthTimelineRef.current?.querySelector('.timeline-marker-dot');
    
    if (pathLine) {
      growthTl.fromTo(
        pathLine,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.2, ease: 'power2.inOut' }
      );
    }
    if (marker) {
      growthTl.fromTo(
        marker,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' },
        '-=0.3'
      );
    }
    // Fade in stats columns alongside
    const statsCols = growthTimelineRef.current?.querySelectorAll('.timeline-stat-col');
    if (statsCols) {
      growthTl.fromTo(
        statsCols,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      );
    }
  }, { scope: containerRef });

  const { pathname, navigate } = useRouter();

  const handleCTAClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const el = document.querySelector('#contact');
      if (el && window.lenis) {
        window.lenis.scrollTo(el);
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div
      id="about"
      ref={containerRef}
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        position: 'relative',
        textAlign: 'left',
        overflow: 'hidden',
        paddingTop: pathname === '/about' ? '6.5rem' : '0'
      }}
    >
      {/* Ambient background particles canvas */}
      <canvas
        ref={ambientCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Content overlays */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* SECTION 1 — INTRO */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)' }}>
          <div style={{ maxWidth: '850px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-small)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent-burgundy)',
                fontWeight: 600,
                display: 'block',
                margin: '0 0 var(--space-label-heading) 0'
              }}
            >
              ABOUT US
            </span>
            <h1
              ref={introHeadlineRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h2)',
                lineHeight: '1.15',
                margin: '0 0 var(--space-heading-body) 0',
                fontWeight: 400
              }}
            >
              Five Years. One Vision. Built for Growth.
            </h1>
            <div ref={introParagraphsRef}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.2rem',
                  lineHeight: '1.7',
                  opacity: 0.9,
                  maxWidth: '680px', // Readable line lengths
                  marginBottom: '1.5rem'
                }}
              >
                Founded five years ago, SR Brand Solutions is a fast-growing integrated marketing services start-up that helps brands create meaningful connections with their consumers through innovative, result-oriented and execution-driven marketing solutions.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--color-accent-gold)',
                  fontWeight: 600,
                  margin: 0
                }}
              >
                Although we are a young organisation, our foundation is backed by nearly two decades of industry experience.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — FOUNDER PROFILE */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Image wrapper with aspect ratio and fallback */}
            <div
              ref={founderPhotoRef}
              style={{ position: 'relative', width: '100%', aspectRatio: '1.2 / 1', overflow: 'hidden' }}
            >
              {!imageError ? (
                <img
                  src="/images/founder-rajeev-wadhwa.jpg"
                  alt="Rajeev Wadhwa, Founder of SR Brand Solutions"
                  onError={() => setImageError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    border: '1px solid rgba(176, 141, 87, 0.2)'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#EAE3D5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-text)',
                    fontSize: '1.2rem',
                    border: '1px solid rgba(176, 141, 87, 0.2)'
                  }}
                >
                  Mr. Rajeev Wadhwa, Founder
                </div>
              )}
            </div>

            {/* Right Column: Founder Bio details */}
            <div ref={founderBioRef}>
              <h2
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-small)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent-burgundy)',
                  fontWeight: 600,
                  margin: '0 0 var(--space-label-heading) 0'
                }}
              >
                LEADERSHIP
              </h2>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  lineHeight: '1.15',
                  margin: '0 0 var(--space-heading-body) 0'
                }}
              >
                Mr. Rajeev Wadhwa — Founder
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  opacity: 0.85,
                  maxWidth: '680px',
                  margin: 0
                }}
              >
                The company is led by Mr. Rajeev Wadhwa, Founder, who brings close to 20 years of experience in the marketing and brand activation industry. Prior to establishing the company, Mr. Wadhwa served as a Director at Grand Brand Solutions Pvt. Ltd., where he gained extensive experience in building brands, managing large-scale marketing initiatives and working with diverse clients and industries.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — OUR STORY */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)' }}>
          <div ref={storyBlockRef} style={{ maxWidth: '800px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-small)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent-burgundy)',
                fontWeight: 600,
                display: 'block',
                margin: '0 0 var(--space-label-heading) 0'
              }}
            >
              HISTORY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h2)',
                lineHeight: '1.15',
                margin: '0 0 var(--space-heading-body) 0',
                fontWeight: 400
              }}
            >
              Our Story
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '680px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, margin: 0 }}>
                Over the last five years, the company has successfully built a diverse clientele across multiple industries, delivering customised marketing solutions based on each brand's business objectives, target audience and market requirements.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, margin: 0 }}>
                Our integrated capabilities span Brand Activations, Experiential Marketing, Events, Retail & BTL Marketing, Consumer Engagement, Rural & On-Ground Activations, Corporate Events, Promotions, Campaign Execution, Production and other customised marketing solutions.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, margin: 0 }}>
                Our approach is simple: understand the business, think beyond the brief and execute with precision. We combine strategic thinking, creative ideas and strong execution capabilities to help brands achieve greater visibility, engagement and business impact.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — OUR GROWTH JOURNEY */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)' }}>
          <div
            ref={growthTimelineRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Left Text Block */}
            <div ref={growthBlockRef}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-small)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--color-accent-burgundy)',
                  fontWeight: 600,
                  display: 'block',
                  margin: '0 0 var(--space-label-heading) 0'
                }}
              >
                EVOLUTION
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-h2)',
                  lineHeight: '1.15',
                  margin: '0 0 var(--space-heading-body) 0',
                  fontWeight: 400
                }}
              >
                Our Growth Journey
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  opacity: 0.85,
                  maxWidth: '680px',
                  margin: 0
                }}
              >
                In just five years, we have evolved from a start-up into a growing integrated marketing services organisation, powered by strong client relationships, experienced leadership and a hands-on execution culture. Our diverse industry exposure has enabled us to understand different consumer segments and develop solutions that are both creative and commercially relevant.
              </p>
            </div>

            {/* Right Visual Stats Callout with SVG line timelines */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '4rem',
                minHeight: '220px'
              }}
            >
              {/* Vertical growth line accent */}
              <div
                className="timeline-growth-line"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '10px',
                  bottom: '10px',
                  width: '2px',
                  backgroundColor: 'var(--color-accent-gold)',
                  transform: 'scaleY(0)',
                  zIndex: 1
                }}
              />
              
              {/* Marker dot */}
              <div
                className="timeline-marker-dot"
                style={{
                  position: 'absolute',
                  left: '17px',
                  top: '50%',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent-burgundy)',
                  transform: 'translateY(-50%) scale(0)',
                  zIndex: 2
                }}
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2.5rem',
                  width: '100%'
                }}
              >
                <div className="timeline-stat-col" style={{ opacity: 0 }}>
                  <div
                    style={{
                      fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-accent-gold)',
                      lineHeight: 1
                    }}
                  >
                    5
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      opacity: 0.8,
                      marginTop: '0.8rem'
                    }}
                  >
                    Years Active
                  </div>
                </div>
                <div className="timeline-stat-col" style={{ opacity: 0 }}>
                  <div
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-accent-gold)',
                      lineHeight: 1,
                      paddingTop: '0.8rem'
                    }}
                  >
                    Multi
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      opacity: 0.8,
                      marginTop: '0.8rem'
                    }}
                  >
                    Clientele Base
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — CAREERS CALLOUT */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)' }}>
          <div ref={careersBlockRef} style={{ maxWidth: '800px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-small)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent-burgundy)',
                fontWeight: 600,
                display: 'block',
                margin: '0 0 var(--space-label-heading) 0'
              }}
            >
              CAREERS
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h2)',
                lineHeight: '1.15',
                margin: '0 0 var(--space-heading-body) 0',
                fontWeight: 400
              }}
            >
              Building the Team for the Next Phase
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '680px', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, margin: 0 }}>
                As we enter our next phase of growth, SR Brand Solutions is expanding its team and is currently hiring for multiple roles across Business Development, Client Servicing, Operations, Project Management, Creative, Production and other functions.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, margin: 0 }}>
                We are particularly looking for ambitious, result-oriented professionals from the integrated marketing, advertising, experiential, events, activation and BTL industry who can contribute to our growth journey and bring new clients, ideas and capabilities to the organisation.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: '1.7', opacity: 0.85, margin: 0 }}>
                For professionals, this is an opportunity to work in a high-growth entrepreneurial environment, interact with leading brands, take ownership of projects and work closely with an experienced industry leader.
              </p>
            </div>
            
            <a
              href="#contact"
              onClick={handleCTAClick}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-accent-burgundy)',
                padding: '1.1rem 2.2rem',
                borderRadius: 0,
                transition: 'transform 0.25s ease, background-color 0.3s ease, color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-text)';
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-burgundy)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Get in Touch
            </a>
          </div>
        </section>

        {/* WHY US SECTION */}
        <WhyUsSection />

        {/* SECTION 6 — CLOSING / VISION */}
        <section className="section-padding container">
          <div className="about-reveal-block" style={{ maxWidth: '800px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h2)',
                marginBottom: '2rem',
                fontWeight: 400
              }}
            >
              Our Vision
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                lineHeight: '1.7',
                opacity: 0.85,
                maxWidth: '680px',
                marginBottom: '2rem'
              }}
            >
              Our vision is to build a contemporary integrated marketing company that combines the agility of a start-up with the experience and discipline of an established organisation.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                lineHeight: '1.5',
                color: 'var(--color-accent-gold)',
                fontWeight: 600,
                maxWidth: '720px',
                margin: 0
              }}
            >
              "We are growing and we are looking for people who want to grow with us."
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
