import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import StatsStrip from '../components/home/StatsStrip';
import About from '../components/home/About';
import ModelsSection from '../components/home/ModelsSection';
import HowItWorks from '../components/home/HowItWorks';
import Features from '../components/home/Features';
import DashboardPreview from '../components/home/DashboardPreview';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

const Home = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />
      <StatsStrip />
      <About />
      <ModelsSection />
      <HowItWorks />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;
