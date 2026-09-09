import React, { useState, useEffect } from 'react';
import { Link } from '../lib/router';

export default function BlogPage() {
  useEffect(() => {
    document.title = "Insights & Blog | SR Brand Solutions";
  }, []);

  const [activeTag, setActiveTag] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Experiential Trends', 'Event Technology', 'Retail Innovation', 'Brand Strategy'];

  const articles = [
    {
      id: 1,
      title: "The Architecture of Engagement: Designing High-Impact Brand Pop-Ups in 2026",
      tag: "Experiential Trends",
      author: "Sameer Roy",
      date: "August 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      excerpt: "Physical brand spaces are no longer just places to hand out flyers—they are immersive narrative engines that turn spectators into brand advocates.",
      content: `
        Physical brand spaces are no longer just places to hand out flyers—they are immersive narrative engines. In 2026, the brands achieving the highest ROI in live events focus heavily on spatial psychology and multi-sensory triggers.

        ### Key Principles for Modern Pop-Ups:
        1. **Spatial Storytelling:** Every meter of space should communicate a core brand value. From scent diffusion at the entrance to dynamic lighting cues as visitors move through zones.
        2. **Seamless Frictionless Tech:** Passive RFID badges and non-intrusive camera analytics allow measuring dwell times without disrupting the attendee experience.
        3. **Social Currency Amplifiers:** Build photogenic architecture specifically designed to encourage organic sharing across social platforms.
      `
    },
    {
      id: 2,
      title: "Holograms, AR & AI: Integrating Immersive Tech Into B2B Expos",
      tag: "Event Technology",
      author: "Rhea Kapoor",
      date: "August 14, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      excerpt: "How emerging technologies like spatial audio, interactive projection mapping, and real-time AI analytics are transforming traditional trade show booths.",
      content: `
        Trade show pavilions used to rely solely on printed banners and brochure counters. Today, technology allows presenting complex product suites through interactive 3D holograms and spatial AR layers.

        ### Technology Stacks Transforming B2B Events:
        - **Generative AI Lead Assistance:** Instant sentiment mapping and AI bot assistants tailored to specific booth visitors.
        - **Spatial Audio Projection:** Sound zones that deliver localized voiceovers without spilling noise into adjacent booths.
        - **Kinetic LED Displays:** Motorized screens that shift shape in sync with keynote presentations.
      `
    },
    {
      id: 3,
      title: "Measuring Experiential ROI: Beyond Footfall and Impression Counts",
      tag: "Brand Strategy",
      author: "Vikramaditya Sharma",
      date: "July 30, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      excerpt: "A practical framework for brand managers to calculate real business return on experiential activations, lead velocity, and long-term customer LTV.",
      content: `
        Chief Marketing Officers frequently ask: "How do we measure the true ROI of a physical activation?" Relying solely on estimated footfall is no longer sufficient for enterprise budgets.

        ### The Tri-Metric ROI Framework:
        1. **Direct Lead Velocity:** Immediate app downloads, QR scans, and form submissions collected on site.
        2. **Earned Media Value (EMV):** Social impressions, press mentions, and organic user-generated content calculated using standard CPM equivalencies.
        3. **Post-Event Brand Uplift:** Retargeted digital campaigns targeting event attendees to measure conversion rate improvements versus non-attendees.
      `
    },
    {
      id: 4,
      title: "Sustainable Event Production: Zero-Waste Booths & Eco Materials",
      tag: "Retail Innovation",
      author: "Rhea Kapoor",
      date: "July 12, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      excerpt: "How SR Brand Solutions constructs recyclable modular pavilions without sacrificing luxury aesthetics or structural integrity.",
      content: `
        Sustainability is no longer optional in corporate event planning—it is a core demand from eco-conscious consumers and corporate sustainability mandates.

        ### Modular & Circular Design Strategies:
        - Reusable aluminum framework systems covered with biodegradable organic fabrics.
        - Energy-efficient LED light rigs reducing power consumption by up to 70%.
        - Zero single-use plastic signage replaced by digital e-ink panels and projection mapping.
      `
    }
  ];

  const filtered = activeTag === 'All' ? articles : articles.filter(a => a.tag === activeTag);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="blog-page" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg)' }}>
      {/* Header Banner */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(16, 17, 38, 0.1)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
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
            KNOWLEDGE & PERSPECTIVES
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-h2)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-heading-body)'
          }}>
            Insights, Trends & Experiential Strategy
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'var(--color-text)',
            opacity: 0.85,
            lineHeight: 1.8
          }}>
            Thought leadership and strategic breakdowns from our team of spatial architects, event producers, and experiential marketers.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Articles */}
      <section className="section-padding">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3.5rem'
          }}>
            {categories.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  border: activeTag === tag ? '2px solid var(--color-accent-burgundy)' : '1px solid rgba(16, 17, 38, 0.2)',
                  backgroundColor: activeTag === tag ? 'var(--color-accent-burgundy)' : 'transparent',
                  color: activeTag === tag ? '#F3EBDD' : 'var(--color-text)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}>
            {filtered.map((item) => (
              <article key={item.id} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                border: '1px solid rgba(16,17,38,0.08)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent-gold)', textTransform: 'uppercase' }}>
                    <span>{item.tag}</span>
                    <span style={{ color: 'rgba(16, 17, 38, 0.5)' }}>{item.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.8rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(16, 17, 38, 0.75)', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
                    {item.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(16,17,38,0.08)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>By {item.author} • {item.date}</span>
                    <button
                      onClick={() => setSelectedArticle(item)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent-burgundy)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Read Article →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="section-padding" style={{ backgroundColor: '#101126', color: '#F3EBDD' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent-gold)', fontWeight: 700, display: 'block', marginBottom: '0.8rem' }}>
            THE BRAND EDGE NEWSLETTER
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', marginBottom: '1rem' }}>
            Stay Ahead of Experiential Marketing Trends
          </h2>
          <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '2rem' }}>
            Get monthly strategic breakdowns, event technology reviews, and experiential case studies delivered directly to your inbox.
          </p>

          {subscribed ? (
            <div style={{ backgroundColor: 'rgba(176, 141, 87, 0.2)', border: '1px solid var(--color-accent-gold)', padding: '1rem 2rem', borderRadius: '8px', color: '#F3EBDD' }}>
              ✓ Thank you for subscribing to The Brand Edge!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your corporate email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{
                  flexGrow: 1,
                  minWidth: '260px',
                  padding: '0.9rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(243, 235, 221, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#F3EBDD',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="nav-cta-btn"
                style={{
                  padding: '0.9rem 2rem',
                  backgroundColor: 'var(--color-accent-gold)',
                  borderColor: 'var(--color-accent-gold)',
                  color: '#101126',
                  fontWeight: 700
                }}
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(16, 17, 38, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}
        onClick={() => setSelectedArticle(null)}
        >
          <div style={{
            backgroundColor: '#F3EBDD',
            color: '#101126',
            borderRadius: '16px',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '3rem',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                fontSize: '1.8rem',
                cursor: 'pointer',
                color: '#101126'
              }}
            >
              ✕
            </button>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-burgundy)', textTransform: 'uppercase' }}>
              {selectedArticle.tag} • {selectedArticle.date}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedArticle.title}
            </h2>
            <div style={{ whiteSpace: 'pre-line', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(16, 17, 38, 0.9)' }}>
              {selectedArticle.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
