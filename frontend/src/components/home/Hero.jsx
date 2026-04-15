import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingCards from './FloatingCards';
import SparklesCore from '../ui/SparklesCore';

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] w-full bg-[#0a0f1c] overflow-hidden flex items-center pt-24 pb-12">
      
      {/* Background Enhancements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          className="w-full h-full"
          particleColor="bg-cyan-500/30"
        />
        {/* Animated Gradient Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-40">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] animate-pulse-slow" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(34,211,238,0.1)]"
          >
            <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            <span className="text-sm font-bold tracking-wide text-cyan-400/90 uppercase">Autonomous Intelligence V2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1]"
          >
            Predict the future <br className="hidden md:block"/>
            of your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 drop-shadow-xl">health today.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-400/80 mb-12 max-w-xl leading-relaxed font-medium"
          >
            Harnessing advanced machine learning for sub-clinical detection of chronic risks. Private-first diagnostics at the speed of thought.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto"
          >
            <Link 
              to="/dashboard"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 rounded-full overflow-hidden shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:scale-105 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Launch Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              to="/models/diabetes"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 font-bold text-slate-300 transition-all duration-300 glass rounded-full hover:bg-white/10 hover:text-white border-white/20"
            >
              Explore Models
            </Link>
          </motion.div>

          {/* Added back a subtle stat badge to ground the design */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-black">99.4%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Accuracy</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-black">2.4M</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Analyzed</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Interactive Floating Cards */}
        <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center z-20">
          <FloatingCards />
        </div>

      </div>

      {/* Hero Bottom Parallax Transition Trigger Card */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0f1c] to-transparent z-30" />
    </section>
  );
};

export default Hero;
