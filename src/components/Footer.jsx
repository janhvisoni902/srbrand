import React from 'react';
import { Link, useRouter } from '../lib/router';
import { contactInfo } from '../data/contact';

export default function Footer() {
  const { pathname } = useRouter();

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#101126',
        color: '#F3EBDD',
        padding: '5rem 0 2.5rem',
        borderTop: '1px solid rgba(243, 235, 221, 0.1)'
      }}
    >
      <div className="container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
                color: 'var(--color-accent-gold)'
              }}
            >
              SR BRAND SOLUTIONS
            </h3>
            <p style={{ opacity: 0.7, fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Experiential marketing, activations, spatial architecture, and large-format events planned strategically and executed flawlessly.
            </p>
            <a
              href="https://www.instagram.com/srbrandsolutions"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-accent-gold)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '14px', height: '14px', display: 'inline-block' }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Follow Us on Instagram</span>
            </a>
          </div>

          {/* Column 1: Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#F3EBDD', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <Link href="/" style={{ color: pathname === '/' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Home</Link>
              </li>
              <li>
                <Link href="/about" style={{ color: pathname === '/about' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>About Us</Link>
              </li>
              <li>
                <Link href="/clients" style={{ color: pathname === '/clients' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Our Clients</Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: pathname === '/contact' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#F3EBDD', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Services & Work
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <Link href="/services" style={{ color: pathname === '/services' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Services</Link>
              </li>
              <li>
                <Link href="/work" style={{ color: pathname === '/work' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Our Work</Link>
              </li>
              <li>
                <Link href="/case-studies" style={{ color: pathname === '/case-studies' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Case Studies</Link>
              </li>
              <li>
                <Link href="/industries" style={{ color: pathname === '/industries' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Industries We Serve</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Media & Insights */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#F3EBDD', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Media & Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <Link href="/blog" style={{ color: pathname === '/blog' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Insights / Blog</Link>
              </li>
              <li>
                <Link href="/media-pr" style={{ color: pathname === '/media-pr' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Media & PR</Link>
              </li>
              <li>
                <Link href="/privacy-policy" style={{ color: pathname === '/privacy-policy' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: pathname === '/terms' ? 'var(--color-accent-gold)' : 'rgba(243,235,221,0.7)', textDecoration: 'none' }}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to top button & Divider */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(243, 235, 221, 0.08)', paddingTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
          <div>
            {contactInfo.copyright}
          </div>
          <div>
            <a
              href="#"
              onClick={handleBackToTop}
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent-gold)',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
