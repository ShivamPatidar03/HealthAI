import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionHeading, GlowCard } from '../ui/Shared';
import { Activity, Heart, Brain, ArrowRight } from 'lucide-react';

const models = [
  {
    id: 'diabetes',
    title: 'Diabetes Prediction',
    desc: 'Analyzes glucose, BMI, age, and insulin levels to predict the onset of diabetes with high precision.',
    icon: Activity,
    color: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
    path: '/models/diabetes'
  },
  {
    id: 'heart',
    title: 'Heart Disease',
    desc: 'Evaluates cardiovascular metrics including ECG results, cholesterol, and blood pressure for early diagnostics.',
    icon: Heart,
    color: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-400',
    path: '/models/heart'
  },
  {
    id: 'stress',
    title: 'Stress Level',
    desc: 'Measures physiological and psychological markers to categorize current occupational or ambient stress states.',
    icon: Brain,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    path: '/models/stress'
  }
];

const ModelsSection = () => {
  return (
    <section className="py-24 relative z-10 w-full overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          preTitle="Diagnostic Tools"
          title={<span>Advanced <span className="text-gradient">Prediction Models</span></span>}
          description="Select from our trio of specialized clinical prediction engines. Each model utilizes a distinct dataset and feature set to deliver immediate insights."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <GlowCard 
                key={model.id} 
                delay={index * 0.15} 
                className="flex flex-col h-full bg-black/40 group relative"
              >
                {/* Floating decor */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${model.color} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${model.color} border border-white/5 mb-6 shadow-inner`}>
                  <Icon className={`w-7 h-7 ${model.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{model.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8 flex-grow text-sm">
                  {model.desc}
                </p>
                
                <Link 
                  to={model.path}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group/btn"
                >
                  <span className="border-b border-transparent group-hover/btn:border-cyan-400 pb-0.5 transition-colors">Launch Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:text-cyan-400 transition-all" />
                </Link>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
