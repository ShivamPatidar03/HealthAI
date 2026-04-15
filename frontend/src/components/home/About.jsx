import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, GlowCard } from '../ui/Shared';
import { Network, Cpu, Lock } from 'lucide-react';

const About = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Side */}
          <div>
            <SectionHeading 
              preTitle="The Platform"
              title={<span>Intelligence Meets <span className="text-gradient">Healthcare</span></span>}
              align="left"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-lg leading-relaxed mb-8"
            >
              Early detection is the most powerful tool in modern medicine. HealthAI leverages sophisticated machine learning algorithms to analyze vital signs and lifestyle factors instantly, providing clinical-grade predictive insights without the wait.
            </motion.p>

            <div className="flex flex-col gap-6">
              {[
                { icon: Cpu, title: 'Neural Network Architecture', desc: 'Trained on diverse, anonymized global health datasets.' },
                { icon: Network, title: 'Real-time Processing', desc: 'Sub-second analysis delivery using edge computing.' },
                { icon: Lock, title: 'Privacy First', desc: 'Your data never leaves your secure encrypted session.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Visual Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-[3rem] blur-3xl transform -rotate-6 scale-105" />
            
            <div className="relative grid grid-cols-2 gap-4">
              <GlowCard className="col-span-2 h-48 flex items-center justify-center bg-black/40">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4 animate-pulse-slow">
                    <Cpu className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Analysis Core Active</h3>
                  <p className="text-sm text-cyan-400/80 mt-1">Processing clinical vectors</p>
                </div>
              </GlowCard>
              
              <GlowCard delay={0.2} className="h-40 flex flex-col justify-between bg-black/40">
                <Network className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-xs text-slate-400 uppercase">Uptime</div>
                </div>
              </GlowCard>
              
              <GlowCard delay={0.3} className="h-40 flex flex-col justify-between bg-black/40">
                <Lock className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white mb-1">256-bit</div>
                  <div className="text-xs text-slate-400 uppercase">Encryption</div>
                </div>
              </GlowCard>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
