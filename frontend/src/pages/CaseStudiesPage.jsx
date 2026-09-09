import React, { useEffect } from 'react';
import { Link } from '../lib/router';
import CaseStudies from '../components/CaseStudies';

export default function CaseStudiesPage() {
  useEffect(() => {
    document.title = "Case Studies | SR Brand Solutions";
  }, []);

  const processSteps = [
    { num: "01", title: "Understand the Challenge", desc: "Uncover core business goals, target audience insights, and market barriers." },
    { num: "02", title: "Develop the Strategy", desc: "Design a high-impact roadmap tailored to consumer touchpoints and brand metrics." },
    { num: "03", title: "Create the Experience", desc: "Build creative concepts, spatial designs, and interactive elements." },
    { num: "04", title: "Execute at Scale", desc: "Flawless pan-India on-ground production, staffing, and logistical execution." },
    { num: "05", title: "Measure the Impact", desc: "Track audience engagement, retail uplift, brand recall, and ROI." }
  ];

  const featuredCaseStudies = [
    {
      id: "01",
      title: "Product Launch & Experiential Activation",
      challenge: "The brand wanted to create awareness around its new product and generate meaningful interaction with its target consumers.",
      approach: "SR Brand Solutions developed an experiential activation combining strategic location planning, consumer engagement, product demonstration, branding, and on-ground execution.",
      delivered: [
        "Campaign strategy and planning",
        "Experiential concept development",
        "On-ground branding",
        "Consumer engagement activities",
        "Product demonstrations",
        "Promotional manpower",
        "End-to-end execution"
      ],
      impact: "A high-engagement brand experience designed to increase product awareness, encourage consumer interaction, and strengthen brand recall."
    },
    {
      id: "02",
      title: "Retail & Market Activation",
      challenge: "The brand wanted to strengthen its presence at retail touchpoints and create greater visibility among consumers in key markets.",
      approach: "We developed a targeted retail and market activation program focused on visibility, consumer interaction, merchandising, and promotional engagement.",
      delivered: [
        "Market mapping and planning",
        "Retail activation",
        "Merchandising",
        "POSM execution",
        "Consumer engagement",
        "Field force deployment",
        "Campaign monitoring and reporting"
      ],
      impact: "A consistent on-ground brand presence designed to improve visibility, consumer engagement, and retail-level interaction."
    },
    {
      id: "03",
      title: "Channel Partner Engagement",
      challenge: "The brand wanted to strengthen relationships with its dealers, distributors, and channel partners while communicating key business priorities.",
      approach: "We planned and executed a customised channel meet that combined professional event management with engaging brand communication.",
      delivered: [
        "Event conceptualisation",
        "Venue and logistics management",
        "Branding and production",
        "Partner communication",
        "Engagement activities",
        "Hospitality management",
        "Complete event execution"
      ],
      impact: "A professionally managed partner experience focused on stronger engagement, relationship building, and effective communication."
    },
    {
      id: "04",
      title: "Consumer Engagement Campaign",
      challenge: "The brand needed to connect directly with consumers and create a more memorable interaction beyond traditional advertising.",
      approach: "We designed an on-ground consumer engagement campaign built around relevant locations, interactive experiences, promotional communication, and direct brand interaction.",
      delivered: [
        "Consumer activation strategy",
        "Location planning",
        "Interactive engagement",
        "Sampling/promotional activities",
        "Branding and visibility",
        "Field team management",
        "On-ground execution"
      ],
      impact: "A consumer-focused campaign designed to create direct interaction, increase visibility, and build stronger brand recall."
    },
    {
      id: "05",
      title: "Corporate Event",
      challenge: "The organisation wanted to create a professionally managed corporate experience that reflected its brand identity while delivering a seamless experience for attendees.",
      approach: "SR Brand Solutions managed the event from concept to execution, combining creative planning with detailed production and event management.",
      delivered: [
        "Event concept and planning",
        "Venue coordination",
        "Event branding",
        "Production management",
        "Guest management",
        "Entertainment and engagement",
        "On-ground coordination"
      ],
      impact: "A seamless corporate experience delivered with attention to detail, brand consistency, and audience engagement."
    }
  ];

  const capabilities = [
    { title: "Brand Activations", desc: "Creating direct and meaningful consumer interactions." },
    { title: "Experiential Marketing", desc: "Turning brand messages into memorable experiences." },
    { title: "Events & Corporate Experiences", desc: "Planning and executing events that bring people and brands together." },
    { title: "Retail & BTL Marketing", desc: "Creating visibility and engagement at critical consumer touchpoints." },
    { title: "Consumer Engagement", desc: "Building meaningful interactions that encourage participation and recall." },
    { title: "Rural & On-Ground Activations", desc: "Taking brands closer to consumers across diverse markets." },
    { title: "Digital Marketing", desc: "Extending campaign communication across relevant digital channels." },
    { title: "Production & Execution", desc: "Bringing concepts to life with disciplined, scalable, and reliable execution." }
  ];

  return (
    <div className="case-studies-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* 1. Page Hero Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)' }}>
        <div className="container" style={{ maxWidth: '950px', textAlign: 'center' }}>
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
            IDEAS THAT CREATE IMPACT. EXECUTION THAT DELIVERS.
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Case Studies
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.9,
            lineHeight: 1.8,
            marginBottom: '1.2rem'
          }}>
            At SR Brand Solutions, every campaign begins with a business objective and ends with an experience designed to create meaningful impact.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(16, 17, 38, 0.8)',
            lineHeight: 1.7,
            marginBottom: '1.2rem'
          }}>
            Our case studies showcase how we bring together strategic thinking, creative ideation, on-ground execution, experiential marketing, events, retail activations, BTL, digital communication, and consumer engagement to solve real business challenges.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(16, 17, 38, 0.8)',
            lineHeight: 1.7
          }}>
            From creating awareness and driving footfall to strengthening channel relationships and engaging consumers, we build customised solutions around what each brand wants to achieve.
          </p>
        </div>
      </section>

      {/* 2. Our Work in Action */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-gold)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              OUR WORK IN ACTION
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1rem' }}>
              Turning Brand Objectives Into Real-World Experiences
            </h2>
            <p style={{ fontSize: '1.05rem', opacity: 0.85, lineHeight: 1.7, marginBottom: '1rem' }}>
              Every market is different. Every audience is different. That's why we believe successful marketing requires more than a standard execution.
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>
              Explore some of the campaigns and projects delivered by our team across different industries and marketing requirements.
            </p>
          </div>

          {/* 5-step approach cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {processSteps.map((step, idx) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(176, 141, 87, 0.2)',
                borderRadius: '12px',
                padding: '2rem 1.5rem',
                position: 'relative'
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-accent-gold)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#F3EBDD', marginBottom: '0.8rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Case Studies */}
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
              SUCCESS STORIES
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)' }}>
              Featured Case Studies
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {featuredCaseStudies.map((item) => (
              <div key={item.id} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(16, 17, 38, 0.08)',
                boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
                padding: '3rem 2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start'
              }}>
                {/* Left Column: Challenge, Approach & Impact */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.8rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--color-accent-gold)'
                    }}>
                      {item.id}.
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.7rem',
                      color: 'var(--color-text)'
                    }}>
                      {item.title}
                    </h3>
                  </div>

                  <div style={{ marginBottom: '1.5rem', marginTop: '1.2rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-burgundy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      The Challenge
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(16, 17, 38, 0.85)', lineHeight: 1.7 }}>
                      {item.challenge}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-burgundy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      Our Approach
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(16, 17, 38, 0.85)', lineHeight: 1.7 }}>
                      {item.approach}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(176, 141, 87, 0.12)',
                    borderLeft: '4px solid var(--color-accent-gold)',
                    padding: '1.2rem 1.5rem',
                    borderRadius: '4px'
                  }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                      The Impact
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.6, fontWeight: 500 }}>
                      {item.impact}
                    </p>
                  </div>
                </div>

                {/* Right Column: Deliverables Box */}
                <div style={{
                  backgroundColor: '#101126',
                  color: '#F3EBDD',
                  padding: '2.5rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(176, 141, 87, 0.3)'
                }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    color: 'var(--color-accent-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1.2rem',
                    borderBottom: '1px solid rgba(243, 235, 221, 0.1)',
                    paddingBottom: '0.8rem'
                  }}>
                    What We Delivered
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {item.delivered.map((del, dIdx) => (
                      <li key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', opacity: 0.9 }}>
                        <span style={{ color: 'var(--color-accent-gold)', fontWeight: 'bold' }}>✓</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Capabilities Behind Every Case Study */}
      <section className="section-padding" style={{ backgroundColor: '#fff', borderTop: '1px solid rgba(16,17,38,0.08)', borderBottom: '1px solid rgba(16,17,38,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-accent-burgundy)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              INTEGRATED SOLUTIONS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)', marginBottom: '1rem' }}>
              Our Capabilities Behind Every Case Study
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(16, 17, 38, 0.8)' }}>
              Our projects are powered by an integrated set of capabilities:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            {capabilities.map((cap, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--color-bg)',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid rgba(16, 17, 38, 0.06)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.8rem' }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(16, 17, 38, 0.75)', lineHeight: 1.6 }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. From Brief to Impact */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-accent-burgundy)',
            fontWeight: 700,
            display: 'block',
            marginBottom: '1rem'
          }}>
            OUR PHILOSOPHY
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            From Brief to Impact
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(16, 17, 38, 0.85)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Behind every successful campaign is a combination of understanding, creativity, planning and execution. At SR Brand Solutions, we work closely with our clients to understand their business objectives, identify the right consumer touchpoints, develop a customised approach and execute campaigns with precision.
          </p>

          <div style={{
            backgroundColor: '#101126',
            color: '#F3EBDD',
            padding: '3rem 2.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(176, 141, 87, 0.3)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.1)'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
              color: 'var(--color-accent-gold)',
              lineHeight: 1.5,
              fontStyle: 'italic',
              marginBottom: '1rem'
            }}>
              "We don't just ask, 'What should we execute?' We ask, 'What does the brand need to achieve?'"
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>
              That's how we turn marketing briefs into experiences that create meaningful connections.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Slider Showcase */}
      <CaseStudies />

      {/* 6. CTA Banner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-accent-burgundy)', color: '#F3EBDD', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1.2rem' }}>
            Have a Challenge? Let's Build the Solution.
          </h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Whether you are planning a product launch, retail activation, consumer engagement campaign, corporate event, channel meet, market activation or integrated marketing campaign, our team is ready to develop a solution around your objective.
          </p>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--color-accent-gold)',
            display: 'block',
            marginBottom: '2.5rem',
            fontWeight: 700
          }}>
            Let's Create Something That Matters.
          </span>
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
            <span>Start Your Campaign Brief</span>
            <svg className="cta-arrow" viewBox="0 0 10 10" style={{ stroke: '#101126' }}>
              <path d="M2 1 h5 v5 M7 1 L1 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
