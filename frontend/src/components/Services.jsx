import React, { useState, useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from '../lib/router';

export default function Services() {
  const [activePanel, setActivePanel] = useState(null); // Collapsed by default
  const containerRef = useRef(null);
  const ambientCanvasRef = useRef(null);

  // ScrollTrigger layout refresh and Page Metadata update on mount
  useEffect(() => {
    document.title = "Services | SR Brand Solutions";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Integrated marketing solutions built around your brand. Explore our events, promotions, retail activations, digital marketing, and direct engagement services.');

    // Wait for all content to resolve
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    });
  }, []);

  // Refs for accordion panels to animate height dynamically
  const panelRefs = useRef([]);
  const itemRefs = useRef([]);
  const iconRefs = useRef([]);
  const numberRefs = useRef([]);

  // Process flow section references
  const flowSectionRef = useRef(null);
  const svgPathRef = useRef(null);
  const svgPathMobileRef = useRef(null);
  const stepNodesRef = useRef([]);

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
      ctx.fillStyle = '#B08D57';

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

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

  // GSAP scroll trigger reveals and interactive line-draw animations
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Scroll triggered scale+fade for accordion panel numbers
    const activeNumbers = numberRefs.current.filter(Boolean);
    activeNumbers.forEach((num) => {
      gsap.fromTo(
        num,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: num,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 2. Section 3: Process Flow SVG Self-Drawing Path synchronized to ScrollTrigger Scrub
    const desktopPath = svgPathRef.current;
    const mobilePath = svgPathMobileRef.current;
    const steps = stepNodesRef.current.filter(Boolean);

    const isMobile = window.innerWidth <= 768;
    const activePath = isMobile ? mobilePath : desktopPath;

    if (desktopPath) {
      const len = desktopPath.getTotalLength();
      gsap.set(desktopPath, { strokeDasharray: len, strokeDashoffset: len });
    }
    if (mobilePath) {
      const len = mobilePath.getTotalLength();
      gsap.set(mobilePath, { strokeDasharray: len, strokeDashoffset: len });
    }

    if (activePath) {
      const flowTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: flowSectionRef.current,
          start: isMobile ? 'top 75%' : 'top top',
          end: isMobile ? 'bottom 85%' : '+=1000',
          pin: !isMobile, // Pinned scroll-lock ONLY on desktop layout
          scrub: 0.3 // Snappy tracking response
        }
      });

      // Animate active path line drawing over the full timeline (duration 1.0)
      flowTimeline.to(activePath, { strokeDashoffset: 0, duration: 1.0, ease: 'none' }, 0);

      // Stagger steps reveal synced to the progress line
      steps.forEach((step, idx) => {
        // Map 6 steps proportionally across the 1.0 timeline (0.0 to 1.0)
        const revealTime = idx * 0.2;
        flowTimeline.fromTo(
          step,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
          revealTime
        );
      });
    }

    // 3. Section 4: Why Choose Us grid staggered reveals
    const gridItems = gsap.utils.toArray('.why-grid-item');
    gsap.fromTo(
      gridItems,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-grid-container',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  // Handle Accordion Panels dynamic height transitions
  const handlePanelClick = (index) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prevIndex = activePanel;
    const isOpening = activePanel !== index;

    // 1. Collapsed panel height resets
    if (prevIndex !== null) {
      const prevEl = panelRefs.current[prevIndex];
      const prevIcon = iconRefs.current[prevIndex];
      
      if (prefersReducedMotion) {
        if (prevEl) prevEl.style.height = '0px';
        if (prevIcon) prevIcon.style.transform = 'rotate(0deg)';
      } else {
        gsap.to(prevEl, {
          height: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => ScrollTrigger.refresh()
        });
        gsap.to(prevIcon, {
          rotate: 0,
          duration: 0.5,
          ease: 'power3.inOut'
        });
      }
    }

    // 2. Set new active index
    setActivePanel(isOpening ? index : null);

    // 3. Expanding panel height GSAP transition
    if (isOpening) {
      const activeEl = panelRefs.current[index];
      const activeIcon = iconRefs.current[index];
      const subItems = itemRefs.current[index]?.querySelectorAll('.sub-service-item');

      if (prefersReducedMotion) {
        if (activeEl) activeEl.style.height = 'auto';
        if (activeIcon) activeIcon.style.transform = 'rotate(45deg)';
        ScrollTrigger.refresh();
      } else {
        // Animate height against scrollHeight properties
        gsap.fromTo(
          activeEl,
          { height: 0 },
          {
            height: activeEl.scrollHeight,
            duration: 0.55,
            ease: 'power3.out', // cubic-bezier(0.25, 1, 0.5, 1) equivalent
            onComplete: () => {
              activeEl.style.height = 'auto';
              ScrollTrigger.refresh();
            }
          }
        );

        gsap.to(activeIcon, {
          rotate: 45,
          duration: 0.55,
          ease: 'power3.out'
        });

        // Stagger sub-services elements in
        if (subItems) {
          gsap.fromTo(
            Array.from(subItems),
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.05,
              ease: 'power2.out',
              delay: 0.1
            }
          );
        }
      }
    } else {
      setTimeout(() => ScrollTrigger.refresh(), 600);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePanelClick(index);
    }
  };

  const { navigate } = useRouter();

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

  // Content Categories Data
  const categories = [
    {
      num: '01',
      title: 'Events & Experiential Marketing',
      intro: 'We create experiences that bring brands to life. From large-format events and product launches to conferences, exhibitions and community activations, our event solutions are designed to create visibility, participation and lasting brand recall.',
      subServices: [
        {
          title: 'Large Format Events',
          desc: 'End-to-end conceptualisation and execution of large-scale events designed to engage audiences and create high-impact brand experiences. We manage everything from planning and venue coordination to production, branding, entertainment, logistics and on-ground execution.'
        },
        {
          title: 'Launch Events',
          desc: 'Create the right first impression for your new product, service or brand. We design and execute launch experiences that build anticipation, generate engagement and put your brand at the centre of attention.'
        },
        {
          title: 'Channel Meets',
          desc: 'Strengthen relationships with dealers, distributors, retailers and channel partners through professionally managed channel meets. From concept and communication to venue management and execution, we create experiences that encourage engagement and strengthen partner relationships.'
        },
        {
          title: 'Seminars & Conferences',
          desc: 'Professional planning and execution of seminars, conferences, business forums and knowledge-sharing events. We manage the complete event experience while ensuring that the event reflects your brand identity and objectives.'
        },
        {
          title: 'Exhibition Promotions',
          desc: 'Make your brand stand out in crowded exhibition environments. We create promotional and engagement strategies that attract visitors, encourage interaction and maximise the value of your exhibition presence.'
        },
        {
          title: 'School Outreach',
          desc: 'Connect with young audiences through engaging and purpose-driven school outreach programs. Our activations can combine education, awareness, interaction and brand engagement to create positive experiences.'
        },
        {
          title: 'College Activations',
          desc: 'Reach the youth through creative and interactive campus experiences. From contests and sampling to entertainment and experiential campaigns, we create activations designed to generate participation and brand recall.'
        },
        {
          title: 'RWA Activations',
          desc: 'Take your brand directly into residential communities. Our RWA activations enable brands to engage consumers in a familiar environment through demonstrations, sampling, awareness programs and interactive experiences.'
        },
        {
          title: 'Mobile Van Activations',
          desc: 'Take your campaign wherever your consumers are. Our mobile van activations combine mobility, branding, product demonstrations, sampling and consumer interaction to create visibility across multiple markets.'
        },
        {
          title: 'Market Activations',
          desc: 'Create a strong presence in targeted markets through customized on-ground campaigns. We identify relevant consumer touchpoints and execute activations that drive awareness, interaction and product engagement.'
        },
        {
          title: 'Corporate Events',
          desc: 'From employee engagement and annual celebrations to award functions, business gatherings and corporate meets, we manage corporate events with professional planning, creative execution and attention to every detail.'
        }
      ]
    },
    {
      num: '02',
      title: 'Retail & BTL Activations',
      intro: 'We help brands create stronger visibility and consumer engagement at the point of purchase. Our retail and BTL solutions combine strategy, manpower, merchandising and execution to influence consumer decisions and strengthen market presence.',
      subServices: [
        {
          title: 'ISD Programs',
          desc: 'Create direct product experiences through in-store demonstration and engagement programs. Our teams help consumers understand product features, benefits and usage while creating meaningful brand interactions.'
        },
        {
          title: 'Trade Promotions',
          desc: 'Drive channel participation and sales through targeted trade promotion programs. We create initiatives that motivate dealers, distributors and retailers while supporting your broader business objectives.'
        },
        {
          title: 'Merchandising',
          desc: 'Improve product visibility and strengthen retail presence through effective merchandising. We focus on display execution, POSM placement, branding, product presentation and maintaining consistent visibility across outlets.'
        },
        {
          title: 'Field Force Management',
          desc: 'Build an effective on-ground presence with professionally managed field teams. We handle manpower deployment, coordination, supervision, monitoring and reporting to ensure consistent campaign execution across locations.'
        },
        {
          title: 'Loyalty Programs',
          desc: 'Build stronger relationships with customers and channel partners through customized loyalty initiatives. Our programs are designed to encourage participation, reward engagement and create long-term brand relationships.'
        }
      ]
    },
    {
      num: '03',
      title: 'Digital Marketing',
      intro: 'Extend your brand experience beyond the physical world with integrated digital marketing solutions. We combine content, communication and digital engagement to help brands build visibility and maintain meaningful connections with their audiences.',
      subServices: [
        {
          title: 'SEO',
          desc: 'Build long-term online visibility through strategic search engine optimisation. Our approach focuses on relevant keywords, content, on-page optimisation and digital visibility to help brands attract the right audience organically.'
        },
        {
          title: 'Social Media Marketing',
          desc: 'Build an active and engaging presence across social platforms. We develop content strategies, creative campaigns, audience engagement initiatives and social communication aligned with your brand identity and objectives.'
        },
        {
          title: 'EDMs',
          desc: 'Reach your audience directly through targeted Email Direct Marketing campaigns. From creative development and messaging to audience targeting and execution, we help brands communicate effectively through email.'
        },
        {
          title: 'Online Properties',
          desc: 'Build and manage digital touchpoints that support your brand\'s communication and marketing objectives. We help brands strengthen their online ecosystem through relevant digital properties and platforms.'
        },
        {
          title: 'SMS Campaigns',
          desc: 'Reach audiences instantly with targeted SMS campaigns. From promotions and announcements to reminders, invitations and customer communication, we create concise campaigns designed for direct engagement.'
        },
        {
          title: 'Blogs',
          desc: 'Create informative and engaging content that supports brand communication and digital visibility. Our blog solutions combine relevant topics, brand storytelling and search-focused content to build authority and audience interest.'
        }
      ]
    },
    {
      num: '04',
      title: 'Direct Marketing',
      intro: 'Personalised communication can create stronger relationships. Our direct marketing solutions help brands reach specific audiences with relevant messages through carefully planned and creatively executed communication.',
      subServices: [
        {
          title: 'Designer Mailers',
          desc: 'Create impactful communication through professionally designed digital mailers. We combine strong visual design with clear messaging to communicate promotions, announcements, launches and brand stories.'
        },
        {
          title: 'Drip Marketing',
          desc: 'Nurture prospects and customers through structured communication journeys. Our drip marketing solutions deliver relevant messages at different stages of the customer journey, helping brands maintain engagement and encourage action.'
        },
        {
          title: 'White Glove Services',
          desc: 'For high-value customers, clients and stakeholders, we provide highly personalised engagement solutions. Our white glove approach focuses on attention to detail, personalized communication and seamless execution.'
        },
        {
          title: 'Corporate Gifts',
          desc: 'Build stronger relationships with clients, employees, partners and stakeholders through thoughtfully curated corporate gifting solutions. We provide gifting options for corporate occasions, festivals, events, employee programs and relationship-building initiatives.'
        }
      ]
    }
  ];

  // Section 3 Steps
  const processSteps = ['Understand', 'Strategise', 'Create', 'Execute', 'Engage', 'Measure'];

  const whyChooseUsItems = [
    {
      title: "Experience-led thinking",
      desc: "Backed by nearly two decades of industry experience through our leadership, we bring practical market understanding to every project."
    },
    {
      title: "Execution-driven approach",
      desc: "We believe great ideas only create value when they are executed effectively. Our hands-on approach ensures attention to detail at every stage."
    },
    {
      title: "Integrated capabilities",
      desc: "Events, activations, retail, BTL, digital, promotions, production and consumer engagement — our capabilities allow us to build solutions across multiple touchpoints."
    },
    {
      title: "Customised solutions",
      desc: "Every brand has different objectives, audiences and market challenges. We develop solutions based on what your business actually needs."
    },
    {
      title: "Consumer-first thinking",
      desc: "We focus on creating meaningful interactions between brands and consumers rather than simply creating visibility."
    },
    {
      title: "Result-oriented execution",
      desc: "Our objective is to create campaigns that contribute to stronger visibility, engagement, relationships and ultimately business impact."
    }
  ];

  return (
    <div
      id="services"
      ref={containerRef}
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6.5rem'
      }}
    >
      {/* Background Showreel Video overlay for Services section */}
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
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <source src="/videos/showreel.mp4" type="video/mp4" />
      </video>

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

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* SECTION 1 — INTRO */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)', textAlign: 'left' }}>
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
            SERVICES
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h2)',
              lineHeight: '1.15',
              maxWidth: '900px',
              margin: '0 0 var(--space-heading-body) 0',
              fontWeight: 400
            }}
          >
            Integrated Marketing Solutions Built Around Your Brand
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                lineHeight: '1.7',
                color: 'var(--color-text)',
                opacity: 0.85,
                margin: 0
              }}
            >
              At SR Brand Solutions, we bring together strategy, creativity and execution to help brands connect with their consumers in meaningful and measurable ways. From large-scale events and experiential campaigns to retail activations, digital marketing and direct engagement, our integrated solutions are designed around your business objectives, audience and market requirements.
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  lineHeight: '1.6',
                  color: 'var(--color-accent-gold)',
                  fontStyle: 'italic',
                  margin: 0
                }}
              >
                "With experienced leadership and strong on-ground execution capabilities, we help brands move seamlessly from idea to execution."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — SERVICE CATEGORIES (accordion) */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)', textAlign: 'left' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {categories.map((cat, idx) => {
              const isExpanded = activePanel === idx;
              const panelId = `services-panel-${idx}`;
              const headerId = `services-header-${idx}`;

              return (
                <div
                  key={cat.num}
                  className="services-panel-row"
                  style={{
                    borderBottom: '1px solid rgba(16, 17, 38, 0.1)',
                    padding: '2rem 0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    borderLeft: '4px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    // Desktop hover background left-border shift
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.borderLeftColor = 'var(--color-accent-gold)';
                      e.currentTarget.style.paddingLeft = '1.5rem';
                      e.currentTarget.style.backgroundColor = 'rgba(176, 141, 87, 0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.borderLeftColor = 'transparent';
                      e.currentTarget.style.paddingLeft = '0px';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <button
                    id={headerId}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => handlePanelClick(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'baseline',
                      color: 'var(--color-text)',
                      gap: '2rem',
                      outlineOffset: '8px'
                    }}
                  >
                    {/* Number label scale+fade animated via GSAP scroll */}
                    <span
                      ref={(el) => (numberRefs.current[idx] = el)}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        color: 'var(--color-accent-gold)',
                        fontWeight: 600,
                        minWidth: '40px',
                        display: 'inline-block'
                      }}
                    >
                      {cat.num}.
                    </span>
                    
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.8rem',
                          margin: '0 0 var(--space-label-heading) 0',
                          lineHeight: '1.15',
                          fontWeight: 400
                        }}
                      >
                        {cat.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          opacity: 0.7,
                          margin: 0,
                          lineHeight: '1.5',
                          display: isExpanded ? 'none' : 'block'
                        }}
                      >
                        {cat.intro.substring(0, 110)}...
                      </p>
                    </div>

                    {/* Expand Indicator icon (plus rotates 45deg to X) */}
                    <span
                      ref={(el) => (iconRefs.current[idx] = el)}
                      style={{
                        fontSize: '1.6rem',
                        fontFamily: 'monospace',
                        color: 'var(--color-accent-gold)',
                        marginLeft: 'auto',
                        display: 'inline-block',
                        transformOrigin: 'center center'
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Collapsible Panel */}
                  <div
                    ref={(el) => (panelRefs.current[idx] = el)}
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    style={{
                      height: 0,
                      overflow: 'hidden'
                    }}
                  >
                    <div ref={(el) => (itemRefs.current[idx] = el)} style={{ paddingTop: '1.5rem' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '1.05rem',
                          lineHeight: '1.65',
                          opacity: 0.9,
                          marginBottom: '2rem',
                          maxWidth: '720px'
                        }}
                      >
                        {cat.intro}
                      </p>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                          gap: '2.5rem',
                          borderTop: '1px solid rgba(16,17,38,0.06)',
                          paddingTop: '2rem'
                        }}
                      >
                        {cat.subServices.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="sub-service-item"
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', opacity: 0 }}
                          >
                            <h4
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.15rem',
                                color: 'var(--color-accent-gold)',
                                margin: 0,
                                fontWeight: 600
                              }}
                            >
                              {sub.title}
                            </h4>
                            <p
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.9rem',
                                lineHeight: '1.55',
                                opacity: 0.75,
                                margin: 0
                              }}
                            >
                              {sub.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3 — OUR INTEGRATED APPROACH */}
        <section
          ref={flowSectionRef}
          className="section-padding container"
          style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)', textAlign: 'left' }}
        >
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
            METHODOLOGY
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
            Our Integrated Approach
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              opacity: 0.8,
              maxWidth: '680px',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}
          >
            At SR Brand Solutions, our strength lies in bringing multiple capabilities together under one roof.
          </p>

          {/* Self-drawing responsive SVG process flow */}
          <div style={{ position: 'relative', padding: '2rem 0' }}>
            {/* Desktop Horizontal Line */}
            <svg
              className="desktop-flow-line"
              viewBox="0 0 100 4"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: '40px',
                left: '5%',
                width: '90%',
                height: '4px',
                zIndex: 1,
                overflow: 'visible'
              }}
            >
              <path
                d="M 0,2 L 100,2"
                stroke="rgba(16, 17, 38, 0.08)"
                strokeWidth="2"
                fill="none"
              />
              <path
                ref={svgPathRef}
                d="M 0,2 L 100,2"
                stroke="var(--color-accent-gold)"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Mobile Vertical Line */}
            <svg
              className="mobile-flow-line"
              viewBox="0 0 4 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: '22px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: 'calc(100% - 44px)',
                zIndex: 1,
                overflow: 'visible'
              }}
            >
              <path
                d="M 2,0 L 2,100"
                stroke="rgba(16, 17, 38, 0.08)"
                strokeWidth="2"
                fill="none"
              />
              <path
                ref={svgPathMobileRef}
                d="M 2,0 L 2,100"
                stroke="var(--color-accent-gold)"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Step Nodes container */}
            <div
              className="process-flow-nodes-wrapper"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 3,
                flexWrap: 'wrap',
                gap: '2.5rem'
              }}
            >
              {processSteps.map((step, idx) => (
                <div
                  key={step}
                  ref={(el) => (stepNodesRef.current[idx] = el)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: '1 1 120px'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-bg)',
                      border: '2px solid var(--color-accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-accent-gold)',
                      marginBottom: '1rem',
                      boxShadow: '0 0 0 5px var(--color-bg)'
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: '1.7',
              opacity: 0.85,
              maxWidth: '680px',
              margin: '3.5rem 0 0 0',
              borderLeft: '2px solid var(--color-accent-gold)',
              paddingLeft: '1.5rem'
            }}
          >
            We begin by understanding your business, audience and market. We then develop a solution that goes beyond the brief, combining creative thinking with practical execution. Whether it is an on-ground activation, corporate event, retail campaign, consumer engagement program, digital campaign or integrated marketing initiative, our team works closely with clients to ensure every execution delivers against the intended objective.
          </p>
        </section>

        {/* SECTION 4 — WHY SR BRAND SOLUTIONS */}
        <section className="section-padding container" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.08)', textAlign: 'left' }}>
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
            CAPABILITIES
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h2)',
              lineHeight: '1.15',
              marginBottom: '3.5rem',
              fontWeight: 400
            }}
          >
            Why SR Brand Solutions?
          </h2>

          <div
            className="why-grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem 3rem'
            }}
          >
            {whyChooseUsItems.map((item, idx) => (
              <div
                key={idx}
                className="why-grid-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  padding: '1.5rem',
                  border: '1px solid rgba(16, 17, 38, 0.05)',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(16,17,38,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(176,141,87,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 768) {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(16,17,38,0.05)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent-burgundy)'
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 400,
                      margin: 0
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    opacity: 0.75,
                    margin: 0
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — CLOSING */}
        <section className="section-padding container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-h2)',
                margin: 0,
                fontWeight: 400
              }}
            >
              From Brief to Brand Impact
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--color-accent-gold)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}
            >
              Your objective. Our thinking. One integrated execution.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                opacity: 0.8,
                maxWidth: '650px',
                margin: '0 0 1.5rem 0'
              }}
            >
              At SR Brand Solutions, we don't just execute campaigns — we create experiences, build connections and help brands move closer to their consumers.
            </p>
            
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
              Start a Project
            </a>
          </div>
        </section>

        {/* Responsive CSS stylesheets */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .desktop-flow-line {
              display: none !important;
            }
            .process-flow-nodes-wrapper {
              flex-direction: column !important;
              align-items: flex-start !important;
              padding-left: 2rem !important;
              position: relative !important;
            }
            .process-flow-nodes-wrapper::before {
              content: '' !important;
              position: absolute !important;
              left: 22px !important;
              top: 10px !important;
              bottom: 10px !important;
              width: 1px !important;
              background-color: var(--color-accent-gold) !important;
              z-index: 1 !important;
            }
            .process-flow-nodes-wrapper > div {
              flex-direction: row !important;
              align-items: center !important;
              gap: 1.5rem !important;
              flex: 1 1 auto !important;
            }
            .process-flow-nodes-wrapper > div > div {
              margin-bottom: 0 !important;
            }
          }
        `}} />

      </div>
    </div>
  );
}
