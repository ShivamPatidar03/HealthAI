import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      {/* Background massive glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-[3rem] p-12 md:p-20 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle grid pattern inside card */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-8 border border-blue-500/30">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Ready to analyze your <span className="text-gradient">health?</span>
            </h2>
            
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Access the dashboard instantly. No registration required for the demonstration environment.
            </p>
            
            <Link 
              to="/dashboard"
              className="relative group inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-blue-600 border border-blue-400 rounded-full hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 text-lg">
                Launch Platform <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
