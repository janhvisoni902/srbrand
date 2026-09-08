import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import { RouterProvider, useRouter } from './lib/router';

// Navigation & Structure
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Intro from './components/Intro';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import OurWorkPage from './pages/OurWorkPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import IndustriesPage from './pages/IndustriesPage';
import ClientsPage from './pages/ClientsPage';
import BlogPage from './pages/BlogPage';
import MediaPRPage from './pages/MediaPRPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

function AppContent() {
  const { pathname } = useRouter();
  const [sequenceState, setSequenceState] = useState(() => {
    // Landing directly on inner pages bypasses the intro animation sequence
    return window.location.pathname === '/' ? 'loading' : 'completed';
  });

  const [displayPath, setDisplayPath] = useState(pathname);
  const [transitionState, setTransitionState] = useState('entering'); // 'entering' | 'exiting'
  const lenisRef = useRef(null);

  // 1. Initialize Lenis exactly once for the lifetime of the application
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Synchronize Lenis scrolling with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Ticker integration
    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.lenis = null;
      document.body.style.overflow = '';
    };
  }, []);

  // 2. Separate Scroll Lock / Unlock lifecycle from Lenis instance recreation
  useEffect(() => {
    const lenis = lenisRef.current;
    
    if (sequenceState !== 'completed') {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
        lenis.resize();
      }

      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (lenis) lenis.resize();
            ScrollTrigger.refresh();
          });
        });
      });
    }
  }, [sequenceState]);

  // 3. Page Transition Route Handler with dynamic scroll-to-top
  useEffect(() => {
    if (pathname !== displayPath) {
      setTransitionState('exiting');
      const timer = setTimeout(() => {
        setDisplayPath(pathname);
        setTransitionState('entering');
        
        // Scroll to top instantly
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath]);

  // 4. Layout stabilization checks on route changes
  useEffect(() => {
    if (transitionState === 'entering') {
      setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [displayPath, transitionState]);

  const handleGlobalSkip = () => {
    setSequenceState('completed');
  };

  const renderActivePage = (path) => {
    switch (path) {
      case '/about':
        return <AboutUs />;
      case '/services':
        return <ServicesPage />;
      case '/work':
        return <OurWorkPage />;
      case '/case-studies':
        return <CaseStudiesPage />;
      case '/industries':
        return <IndustriesPage />;
      case '/clients':
        return <ClientsPage />;
      case '/blog':
        return <BlogPage />;
      case '/media-pr':
        return <MediaPRPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/':
      default:
        return (
          <Home
            sequenceState={sequenceState}
            setSequenceState={setSequenceState}
            handleGlobalSkip={handleGlobalSkip}
          />
        );
    }
  };

  return (
    <div className="app-container" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Intro loader plays only on the Home page loading sequence */}
      {sequenceState === 'loading' && pathname === '/' && (
        <Intro onFinished={() => setSequenceState('hero-animating')} />
      )}

      <Navbar />
      
      {/* Hardware-accelerated CSS Page transitions wrapper */}
      <main
        style={{
          opacity: transitionState === 'entering' ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        {renderActivePage(displayPath)}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
