import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import CoreValues from '../components/CoreValues';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | SR Brand Solutions";
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.from('.about-hero-sub', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const historyMilestones = [
    {
      year: '2015',
      title: 'The Inception',
      desc: 'Founded with a singular mission: to bridge the gap between creative storytelling and flawless execution in live brand activations.'
    },
    {
      year: '2018',
      title: 'Pan-India Expansion',
      desc: 'Expanded operational footprint to 15+ metro cities across India, delivering high-impact mall popups, corporate galas, and trade expos.'
    },
    {
      year: '2021',
      title: 'Digital & Hybrid Integration',
      desc: 'Pioneered interactive tech-infused brand booths combining projection mapping, AR/VR displays, and real-time social engagement metrics.'
    },
    {
      year: '2024',
      title: 'Global Footprint & AI Analytics',
      desc: 'Scaled operations internationally into UAE & Southeast Asia, integrating smart audience analytics and experiential data tracking.'
    }
  ];

  const leadershipTeam = [
    {
      name: 'Sameer Roy',
      role: 'Founder & Managing Director',
      bio: 'Over 18 years of visionary leadership in brand strategy and experiential event management for Global 500 enterprises.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Rhea Kapoor',
      role: 'Chief Creative Officer',
      bio: 'Architect of immersive brand environments, specializing in spatial design, interactive installations, and brand aesthetics.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Vikramaditya Sharma',
      role: 'Head of Operations & Logistics',
      bio: 'Master of large-scale execution, coordinating multi-city activations, venue management, and complex structural builds.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="about-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* Hero Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-burgundy)',
            fontWeight: 700,
            display: 'block',
            marginBottom: 'var(--space-label-heading)'
          }}>
            WHO WE ARE
          </span>
          <h1 className="about-hero-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Architects of Extraordinary Brand Experiences
          </h1>
          <p className="about-hero-sub" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            SR Brand Solutions is an integrated experiential marketing agency. We design and execute live activations, corporate expos, retail environments, and high-octane brand events that captivate audiences and deliver measurable ROI.
          </p>
        </div>
      </section>

      {/* Story & History */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-gold)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              OUR JOURNEY
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)' }}>
              A Decade of Transformative Growth
            </h2>
          </div>

          <div className="timeline-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            {historyMilestones.map((item, idx) => (
              <div key={idx} className="timeline-item" style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(176, 141, 87, 0.2)',
                padding: '2.5rem 1.5rem',
                borderRadius: '8px',
                position: 'relative'
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-gold)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  {item.year}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: '#F3EBDD',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <CoreValues />

      {/* Leadership & Team */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              LEADERSHIP
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)' }}>
              Meet The Visionaries
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {leadershipTeam.map((person, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1px solid rgba(16, 17, 38, 0.08)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '280px', overflow: 'hidden' }}>
                  <img
                    src={person.image}
                    alt={person.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.3rem' }}>
                    {person.name}
                  </h3>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-gold)', display: 'block', marginBottom: '1rem' }}>
                    {person.role}
                  </span>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(16, 17, 38, 0.75)', lineHeight: 1.6 }}>
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-accent-burgundy)', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.5rem' }}>
            Ready to Elevate Your Brand Strategy?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem' }}>
            Partner with SR Brand Solutions to transform audience engagements into memorable brand equity.
          </p>
          <Link
            href="/contact"
            className="nav-cta-btn"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '0.95rem',
              backgroundColor: '#F3EBDD',
              color: '#101126',
              borderColor: '#F3EBDD',
              display: 'inline-flex'
            }}
          >
            <span>Start a Conversation</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ stroke: '#101126' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
