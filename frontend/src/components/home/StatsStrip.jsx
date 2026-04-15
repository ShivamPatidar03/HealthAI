import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Users } from 'lucide-react';

const stats = [
  { id: 1, name: 'Active Models', value: '3+', icon: Activity },
  { id: 2, name: 'Prediction Accuracy', value: '98.5%', icon: ShieldCheck },
  { id: 3, name: 'Processing Time', value: '<0.5s', icon: Zap },
  { id: 4, name: 'Simulated Users', value: '10k+', icon: Users },
];

const StatsStrip = () => {
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl backdrop-blur-2xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 text-cyan-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-white mb-1 flex items-center gap-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {stat.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsStrip;
