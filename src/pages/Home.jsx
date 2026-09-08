import React from 'react';
import Hero from '../components/Hero';
import GalleryStrip from '../components/GalleryStrip';
import About from '../components/About';
import EventGallery from '../components/EventGallery';
import HowWeWork from '../components/HowWeWork';
import CaseStudies from '../components/CaseStudies';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import OurWork from '../components/OurWork';
import Clients from '../components/Clients';
import CoreValues from '../components/CoreValues';
import ParticleTypography from '../components/ParticleTypography';
import Contact from '../components/Contact';

export default function Home({ sequenceState, setSequenceState, handleGlobalSkip }) {
  return (
    <>
      <Hero
        active={sequenceState === 'hero-animating'}
        completed={sequenceState === 'completed'}
        onComplete={() => setSequenceState('completed')}
        onSkip={handleGlobalSkip}
        showSkipControl={sequenceState !== 'completed'}
      />
      <GalleryStrip />
      <About />
      <EventGallery />
      <HowWeWork />
      <CaseStudies />
      <WhyChooseUs />
      <Testimonials />
      <OurWork />
      <Clients />
      <CoreValues />
      <ParticleTypography />
      <Contact />
    </>
  );
}
