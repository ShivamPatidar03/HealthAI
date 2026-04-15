import React, { useEffect } from 'react';
import Hero from '../components/home/Hero.jsx';
import StatsStrip from '../components/home/StatsStrip.jsx';
import About from '../components/home/About.jsx';
import ModelsSection from '../components/home/ModelsSection.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import Features from '../components/home/Features.jsx';
import DashboardPreview from '../components/home/DashboardPreview.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import CTA from '../components/home/CTA.jsx';

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
