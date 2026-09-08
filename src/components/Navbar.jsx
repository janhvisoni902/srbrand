import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../lib/router';

export default function Navbar() {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Close menus on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  const primaryNavLinks = [
    { label: 'Home', target: '/' },
    { label: 'About Us', target: '/about' },
    { label: 'Services', target: '/services' },
    { label: 'Our Work', target: '/work' },
    { label: 'Case Studies', target: '/case-studies' },
  ];

  const secondaryNavLinks = [
    { label: 'Industries We Serve', target: '/industries' },
    { label: 'Our Clients', target: '/clients' },
    { label: 'Insights / Blog', target: '/blog' },
    { label: 'Media & PR', target: '/media-pr' },
  ];

  const allNavLinks = [
    ...primaryNavLinks,
    ...secondaryNavLinks,
    { label: 'Contact Us', target: '/contact' },
    { label: 'Privacy Policy', target: '/privacy-policy' },
    { label: 'Terms & Conditions', target: '/terms' },
  ];

  const isLinkActive = (target) => {
    return pathname === target;
  };

  const isMoreActive = secondaryNavLinks.some(link => link.target === pathname);

  return (
    <header>
      <nav
        id="main-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '1.25rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(16, 17, 38, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(243, 235, 221, 0.1)',
          color: '#F3EBDD',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand logo wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            color: 'var(--color-accent-gold, #B08D57)'
          }}
        >
          SR BRAND SOLUTIONS
        </Link>

        {/* Desktop Nav Menu */}
        <ul
          className="desktop-nav-menu"
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '1.8rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: 0,
            padding: 0,
            alignItems: 'center'
          }}
        >
          {primaryNavLinks.map((link) => {
            const active = isLinkActive(link.target);
            return (
              <li key={link.label} style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                  href={link.target}
                  style={{
                    textDecoration: 'none',
                    color: active ? 'var(--color-accent-gold, #B08D57)' : '#F3EBDD',
                    transition: 'opacity 0.3s ease',
                    borderBottom: active ? '2px solid var(--color-accent-gold, #B08D57)' : '2px solid transparent',
                    paddingBottom: '4px',
                    fontWeight: active ? '700' : '500'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--color-accent-gold)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = '#F3EBDD';
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          {/* More Dropdown for Desktop */}
          <li
            style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
            onMouseEnter={() => setMoreDropdownOpen(true)}
            onMouseLeave={() => setMoreDropdownOpen(false)}
          >
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: isMoreActive || moreDropdownOpen ? 'var(--color-accent-gold)' : '#F3EBDD',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                fontWeight: isMoreActive || moreDropdownOpen ? '700' : '500',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                paddingBottom: '4px',
                borderBottom: isMoreActive ? '2px solid var(--color-accent-gold)' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>More</span>
              <span style={{ fontSize: '0.65rem', transform: moreDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▾</span>
            </button>

            {moreDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '8px', // Bridge area so hover doesn't break when moving cursor down
                  zIndex: 1001
                }}
              >
                <div
                  style={{
                    backgroundColor: '#101126',
                    border: '1px solid rgba(176, 141, 87, 0.3)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    padding: '0.8rem 0',
                    minWidth: '220px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {secondaryNavLinks.map((item) => {
                    const active = isLinkActive(item.target);
                    return (
                      <Link
                        key={item.label}
                        href={item.target}
                        onClick={() => setMoreDropdownOpen(false)}
                        style={{
                          padding: '0.65rem 1.4rem',
                          color: active ? 'var(--color-accent-gold)' : '#F3EBDD',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          fontWeight: active ? 700 : 500,
                          transition: 'background 0.2s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </li>

          {/* Contact Button */}
          <li>
            <Link href="/contact" className="nav-cta-btn">
              <svg
                className="cta-phone-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '13px', height: '13px', marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Get in Touch</span>
              <svg className="cta-arrow" viewBox="0 0 10 10">
                <path d="M2 1 h5 v5 M7 1 L1 7" />
              </svg>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Hamburger Button */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#F3EBDD',
            fontSize: '1.6rem',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 70px)',
            backgroundColor: '#101126',
            color: '#F3EBDD',
            zIndex: 999,
            padding: '2rem 2.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent-gold)', marginBottom: '0.5rem', fontWeight: 700 }}>
            Navigation Menu
          </div>
          {allNavLinks.map((link) => {
            const active = isLinkActive(link.target);
            return (
              <Link
                key={link.label}
                href={link.target}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: active ? 'var(--color-accent-gold)' : '#F3EBDD',
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: active ? 700 : 400,
                  borderBottom: '1px solid rgba(243, 235, 221, 0.08)',
                  paddingBottom: '0.6rem'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* CSS Rule for Hamburger Visibility */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
