import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Models', path: '/models/diabetes' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className={clsx(
        'px-6 mx-auto max-w-7xl transition-all duration-300 rounded-2xl mx-4',
        isScrolled ? 'glass shadow-lg shadow-blue-900/20' : 'bg-transparent'
      )}>
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
              <Activity className="w-5 h-5" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-md group-hover:bg-cyan-400/40 transition-all" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Health<span className="text-cyan-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-cyan-400',
                  location.pathname === link.path ? 'text-cyan-400' : 'text-slate-300'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/dashboard" className="relative group inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-blue-500 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900">
              <span className="relative z-10 flex items-center gap-2">
                Use Platform <ChevronRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 blur opacity-40 group-hover:opacity-70 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 p-4 glass rounded-2xl md:hidden border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl"
                >
                  Use Platform
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
