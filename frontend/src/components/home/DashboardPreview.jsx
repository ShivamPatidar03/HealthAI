import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/Shared';
import { Activity, Bell, Search, User, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

const DashboardPreview = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0f1c]/0 to-[#0a0f1c] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <SectionHeading 
          preTitle="Inside the Platform"
          title={<span>Experience the <span className="text-gradient">Dashboard</span></span>}
          description="A powerful, intuitive interface providing real-time physiological analytics and historical health tracking."
        />

        <motion.div 
          style={{ y, rotateX }}
          className="mt-10 w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] border border-white/10 bg-[#0a0f1c] flex flex-col transform-gpu"
        >
          {/* Mock App Header */}
          <div className="h-14 border-b border-white/10 bg-white/5 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 max-w-md mx-6">
               <div className="w-full h-8 bg-black/40 rounded-full flex items-center px-4 border border-white/5">
                 <Search className="w-4 h-4 text-slate-500 mr-2" />
                 <span className="text-xs text-slate-500">Search patient records or models...</span>
               </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Bell className="w-5 h-5" />
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">AJ</div>
            </div>
          </div>

          {/* Mock App Body */}
          <div className="flex flex-1 h-[400px] md:h-[600px] bg-[#0a0f1c]">
            {/* Sidebar */}
            <div className="w-20 md:w-64 border-r border-white/10 bg-white/[0.02] p-4 flex flex-col gap-2">
              <div className="w-full py-2 px-3 rounded-lg bg-blue-600/20 text-cyan-400 font-medium text-sm flex items-center gap-3">
                 <Activity className="w-5 h-5" />
                 <span className="hidden md:block">Analytics</span>
              </div>
              <div className="w-full py-2 px-3 rounded-lg hover:bg-white/5 text-slate-400 font-medium text-sm flex items-center gap-3 transition-colors">
                 <User className="w-5 h-5" />
                 <span className="hidden md:block">Patients</span>
              </div>
              <div className="w-full py-2 px-3 rounded-lg hover:bg-white/5 text-slate-400 font-medium text-sm flex items-center gap-3 transition-colors mt-auto">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <span className="hidden md:block">Settings</span>
              </div>
            </div>

            {/* Main view area */}
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">
              {/* Blur gradient under the UI */}
              <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white">System Overview</h3>
                  <p className="text-xs text-slate-400">Live predictive data feed</p>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live
                </div>
              </div>

              {/* Cards row */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-slate-400">Diabetes Risk</span>
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">Low</div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-cyan-400 w-1/4 h-full" /></div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-slate-400">Heart Condition</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1 tracking-tight">Moderate</div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-yellow-400 w-1/2 h-full" /></div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors hidden lg:flex">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-slate-400">Stress Monitor</span>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">Optimal</div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-green-400 w-1/5 h-full" /></div>
                  </div>
                </div>
              </div>

              {/* Big Chart Area Mockup */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl mt-2 relative p-4 flex flex-col">
                 <div className="text-sm text-slate-400 mb-4">Historical Accuracy</div>
                 
                 {/* Fake SVG Chart lines */}
                 <div className="flex-1 relative w-full h-full border-b border-l border-white/10">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                       {/* Grid lines */}
                       <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                       <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                       <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                       
                       <path d="M0 80 Q 20 70, 40 50 T 70 30 T 100 10" fill="none" stroke="#38bdf8" strokeWidth="2" />
                       <path d="M0 80 Q 20 70, 40 50 T 70 30 T 100 10 L 100 100 L 0 100 Z" fill="url(#grad)" opacity="0.3" />
                       
                       <defs>
                          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                             <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                          </linearGradient>
                       </defs>
                    </svg>
                 </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
