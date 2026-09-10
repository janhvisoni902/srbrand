import React, { useState, useEffect, useRef } from 'react';
import { Link } from '../lib/router';
import { servicesSummaryData } from '../data/services';
import { getServices } from '../lib/sanity';
import { serviceDetailsData } from '../data/service-details';
import { statsData } from '../data/stats';
import { faqsData } from '../data/faqs';
import { gsap, ScrollTrigger } from '../lib/gsap';
import {
  Calendar,
  ShoppingCart,
  Megaphone,
  Send,
  Gift,
  Check,
  ShieldCheck,
  Handshake,
  Users,
  Play,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

// Icon Map for Service Categories & Stats
const categoryIconMap = {
  Calendar: Calendar,
  ShoppingCart: ShoppingCart,
  Megaphone: Megaphone,
  Send: Send,
  Gift: Gift
};

const statIconMap = {
  ShieldCheck: ShieldCheck,
  Handshake: Handshake,
  Megaphone: Megaphone,
  Users: Users
};

// Stat Card Sub-component with GSAP ScrollTrigger Count-Up Animation
function StatCard({ stat, statsSectionRef }) {
  const [displayValue, setDisplayValue] = useState(0);
  const StatIcon = statIconMap[stat.icon] || ShieldCheck;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(stat.target);
      return;
    }

    const counter = { value: 0 };

    const st = ScrollTrigger.create({
      trigger: statsSectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: stat.target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(Math.round(counter.value));
          }
        });
      }
    });

    return () => {
      st.kill();
    };
  }, [stat.target, statsSectionRef]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '1.5px solid rgba(212, 165, 55, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4A537',
          marginBottom: '1rem'
        }}
      >
        <StatIcon size={26} strokeWidth={1.8} />
      </div>

      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '3rem',
          fontWeight: 800,
          color: '#D4A537',
          lineHeight: 1,
          marginBottom: '0.5rem'
        }}
      >
        {displayValue}{stat.suffix}
      </span>

      <span
        style={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.75)',
          fontWeight: 500
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState(servicesSummaryData);

  useEffect(() => {
    let isMounted = true;
    async function loadSanityServices() {
      try {
        const sanityData = await getServices();
        if (isMounted && Array.isArray(sanityData) && sanityData.length > 0) {
          setServicesList(sanityData);
        }
      } catch (err) {
        console.warn('[Sanity CMS] Could not fetch services from Sanity, using default fallback:', err);
      }
    }
    loadSanityServices();
    return () => { isMounted = false; };
  }, []);

  const [activeTabId, setActiveTabId] = useState(serviceDetailsData[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const statsSectionRef = useRef(null);

  const activeDetail = serviceDetailsData.find(tab => tab.id === activeTabId) || serviceDetailsData[0];

  // FAQPage JSON-LD Structured Data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="services-page" style={{ paddingTop: '80px', backgroundColor: '#F7F7F5', color: '#101126' }}>
      
      {/* 1. Hero Section (Dark Navy #0B1220 with Background Showreel Video) */}
      <section
        style={{
          backgroundColor: '#0B1220',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          padding: '7rem 0 5rem'
        }}
      >
        {/* Background Showreel Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(11, 18, 32, 0.92) 0%, rgba(11, 18, 32, 0.65) 50%, rgba(11, 18, 32, 0.95) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '720px' }}>
            {/* Eyebrow */}
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4A537',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              SERVICES
            </span>

            {/* Large White Headline */}
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}
            >
              Integrated Marketing <br /> Solutions
            </h1>

            {/* Description line */}
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                maxWidth: '620px'
              }}
            >
              From strategy to execution, we create experiences that connect brands with people and drive measurable results.
            </p>

            {/* Watch Showreel Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowVideoModal(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.02em'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '2px solid #D4A537',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4A537',
                  transition: 'transform 0.3s ease, background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = 'rgba(212, 165, 55, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Play size={18} fill="#D4A537" style={{ marginLeft: '2px' }} />
              </div>
              <span>Watch Showreel</span>
            </button>
          </div>
        </div>
      </section>

      {/* Showreel Full Video Modal */}
      {showVideoModal && (
        <div
          onClick={() => setShowVideoModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            boxSizing: 'border-box'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              backgroundColor: '#000000',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
            }}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              ✕
            </button>
            <video
              controls
              autoPlay
              style={{ width: '100%', display: 'block', maxHeight: '80vh' }}
            >
              <source src="/videos/showreel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* 2. "What We Do" Intro Section (Off-White #F7F7F5) */}
      <section style={{ padding: '5rem 0 2rem', backgroundColor: '#F7F7F5' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D4A537',
              display: 'block',
              marginBottom: '0.8rem'
            }}
          >
            WHAT WE DO
          </span>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#0B1220',
              marginBottom: '1.2rem',
              letterSpacing: '-0.02em'
            }}
          >
            Our Services
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(11, 18, 32, 0.75)',
              lineHeight: 1.7
            }}
          >
            We offer end-to-end integrated marketing solutions across events, activations, digital and direct marketing to help brands engage, influence and grow.
          </p>
        </div>
      </section>

      {/* 3. Service Category Icon Grid (5 Columns Desktop with vertical line dividers) */}
      <section style={{ padding: '2rem 0 5rem', backgroundColor: '#F7F7F5' }}>
        <div className="container">
          <div
            className="services-icon-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: servicesList.length > 0 ? `repeat(${Math.min(servicesList.length, 5)}, 1fr)` : 'repeat(5, 1fr)',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              border: '1px solid rgba(11, 18, 32, 0.06)',
              overflow: 'hidden'
            }}
          >
            {servicesList.map((service, index) => {
              const IconComponent = categoryIconMap[service.icon] || Calendar;
              const hasBorderRight = index < servicesList.length - 1;

              return (
                <div
                  key={index}
                  style={{
                    padding: '3rem 1.8rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRight: hasBorderRight ? '1px solid rgba(11, 18, 32, 0.08)' : 'none',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(234, 241, 251, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Soft Light Blue Tinted Circle */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#EAF1FB',
                      color: '#0B1220',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <IconComponent size={28} strokeWidth={1.8} style={{ color: '#0B1220' }} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0B1220',
                      marginBottom: '0.8rem',
                      lineHeight: 1.3
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(11, 18, 32, 0.7)',
                      lineHeight: 1.6
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "Explore What We Offer" — Tabbed Detail Section */}
      <section style={{ padding: '4rem 0 6rem', backgroundColor: '#F7F7F5', borderTop: '1px solid rgba(11, 18, 32, 0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4A537',
                display: 'block',
                marginBottom: '0.8rem'
              }}
            >
              DETAILED SERVICES
            </span>
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#0B1220',
                letterSpacing: '-0.02em'
              }}
            >
              Explore What We Offer
            </h2>
          </div>

          {/* Horizontal Tab Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '2rem',
              borderBottom: '2px solid rgba(11, 18, 32, 0.08)',
              marginBottom: '3.5rem'
            }}
          >
            {serviceDetailsData.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0B1220' : 'rgba(11, 18, 32, 0.55)',
                    padding: '0.8rem 0.5rem 1.2rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {tab.tabLabel}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        width: '100%',
                        height: '3px',
                        backgroundColor: '#D4A537',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel (2 Column Layout) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.05)',
              border: '1px solid rgba(11, 18, 32, 0.06)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'
            }}
          >
            {/* Left Column: Image */}
            <div style={{ position: 'relative', minHeight: '380px' }}>
              <img
                src={activeDetail.image}
                alt={activeDetail.panelTitle}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Right Column: Title + Checklist */}
            <div
              style={{
                padding: '3.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#0B1220',
                    marginBottom: '2rem'
                  }}
                >
                  {activeDetail.panelTitle}
                </h3>

                {/* 2 Sub-Columns checklist */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.2rem 1.5rem',
                    marginBottom: '2.5rem'
                  }}
                >
                  {activeDetail.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.95rem',
                        color: 'rgba(11, 18, 32, 0.85)',
                        fontWeight: 500
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(212, 165, 55, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Check size={13} style={{ color: '#D4A537', strokeWidth: 3 }} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View All Services Link */}
              <div style={{ textAlign: 'right' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#0B1220',
                    textDecoration: 'none'
                  }}
                >
                  <span>View All Services</span>
                  <ArrowRight size={16} style={{ color: '#D4A537' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust Strip (Dark Navy #0B1220) with GSAP ScrollTrigger Count-Up Animation */}
      <section ref={statsSectionRef} style={{ backgroundColor: '#0B1220', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2.5rem',
              textAlign: 'center'
            }}
          >
            {statsData.map((stat, idx) => (
              <StatCard key={idx} stat={stat} statsSectionRef={statsSectionRef} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section (Part A — Directly above footer) */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F7F7F5', borderTop: '1px solid rgba(11, 18, 32, 0.06)' }}>
        {/* Inject FAQPage Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4A537',
                display: 'block',
                marginBottom: '0.8rem'
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#0B1220',
                letterSpacing: '-0.02em'
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion Clean List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqsData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(11, 18, 32, 0.1)',
                    padding: '1.4rem 0'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#0B1220',
                      outline: 'none'
                    }}
                  >
                    <span style={{ paddingRight: '1rem', lineHeight: 1.4 }}>
                      {faq.question}
                    </span>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'rgba(212, 165, 55, 0.15)' : 'rgba(11, 18, 32, 0.05)',
                        color: isOpen ? '#D4A537' : '#0B1220',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isOpen ? (
                        <Minus size={16} strokeWidth={2.5} />
                      ) : (
                        <Plus size={16} strokeWidth={2.5} />
                      )}
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease, margin-top 0.3s ease',
                      marginTop: isOpen ? '0.85rem' : '0'
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.98rem',
                        color: 'rgba(11, 18, 32, 0.75)',
                        lineHeight: 1.7,
                        margin: 0
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsive CSS styles for Icon Grid on Mobile */}
      <style>{`
        @media (max-width: 992px) {
          .services-icon-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .services-icon-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(11, 18, 32, 0.08) !important;
          }
        }
        @media (max-width: 576px) {
          .services-icon-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
