import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlowCard } from '../ui/Shared';
import { Database, ShieldAlert, Sparkles, LayoutDashboard, Globe, Infinity as InfinityIcon } from 'lucide-react';

const features = [
  { icon: Sparkles, title: "Precision AI", desc: "Trained on millions of data points for high accuracy clinical diagnostics." },
  { icon: LayoutDashboard, title: "Immersive Dashboard", desc: "A premium analytical interface for viewing and comparing personal health trends." },
  { icon: ShieldAlert, title: "Early Warning", desc: "Identify potential health risks months before physical symptoms appear." },
  { icon: Database, title: "Data Secure", desc: "Enterprise-grade encryption ensures your health data remains completely private." },
  { icon: Globe, title: "Accessible UX", desc: "Beautifully designed to be fully functional on desktop, tablet, and mobile." },
  { icon: InfinityIcon, title: "Endless Scalability", desc: "Built on Vite + React. Ready to integrate with any backend API instantly." }
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          preTitle="Capabilities"
          title={<span>Why Choose <span className="text-gradient">HealthAI</span></span>}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlowCard 
                key={index} 
                delay={index * 0.1}
                className="bg-black/40 flex flex-col items-start hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
