import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleTextEffect from '../components/ui/ParticleTextEffect';

const MainLayout = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro has already been played in this session
    const hasPlayed = sessionStorage.getItem('healthAI_intro_played');
    if (!hasPlayed) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('healthAI_intro_played', 'true');
    setShowIntro(false);
  };

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0f1c] text-white">
      {/* Global Background Grid overlay */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-40 z-0 mix-blend-screen" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0f1c]/0 to-purple-900/10 pointer-events-none z-0" />

      {/* Loading Intro Overlay */}
      <AnimatePresence>
        {showIntro && <ParticleTextEffect onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col flex-grow transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Navbar />
        <main className="flex-grow pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
