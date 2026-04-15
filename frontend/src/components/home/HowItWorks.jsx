import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../ui/Shared';
import { ListChecks, UserPlus, Cpu, Activity, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 1, title: 'Select Module', desc: 'Choose between advanced predictive models, trained on millions of clinical data points for Diabetes, Heart Disease, or Stress.', icon: ListChecks, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 2, title: 'Input Health Data', desc: 'Securely enter your current vital signs, blood work, or lifestyle metrics into our encrypted vault. Your data never leaves your device unencrypted.', icon: UserPlus, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 3, title: 'AI Analysis', desc: 'Our proprietary machine learning models process the vectors in real-time, matching patterns against vast medical databases.', icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 4, title: 'Get Insights', desc: 'Receive instant risk probabilities, predictive trajectories, and highly actionable wellness recommendations tailored just for you.', icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10' },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // A robust, standard GSAP setup for pinning horizontal sections without overlap
    let ctx = gsap.context(() => {
      const slider = scrollContainerRef.current;
      
      // Calculate exactly how far to translate X to show everything
      const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth + 100);

      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${slider.scrollWidth}`, // Scroll exactly the width of the cards
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        pinSpacing: true, // Prevents overlap with next section
        anticipatePin: 1
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-[#0a0f1c] relative flex flex-col justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="pl-6 md:pl-12 relative z-10">
        <div className="mb-12">
          <SectionHeading 
            preTitle="Workflow"
            title={<span>Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Integration</span></span>}
          />
          <p className="text-slate-400 max-w-xl mt-4">Scroll to explore the high-performance pipeline powering HealthAI's predictive capabilities.</p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-8 md:gap-12 w-max items-center pr-12 min-w-full" ref={scrollContainerRef}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="w-[85vw] md:w-[450px] shrink-0 h-[450px] flex flex-col glass border border-white/5 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
              >
                {/* Glow layer behind card */}
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[2rem]" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10", step.bg)}>
                    <Icon className={clsx("w-8 h-8", step.color)} />
                  </div>
                  <div className="text-[6rem] font-black text-white/5 leading-none absolute top-4 right-8 tracking-tighter pointer-events-none select-none">
                    0{step.id}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 z-10">{step.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed z-10">
                  {step.desc}
                </p>

                {/* Mock UI Element at the bottom of the card */}
                <div className="mt-auto h-24 w-full rounded-xl bg-black/40 border border-white/5 p-4 flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
                  {index === 0 && (
                     <>
                       <div className="flex-1 space-y-3">
                         <div className="h-2.5 w-full bg-white/10 rounded-full" />
                         <div className="h-2.5 w-3/4 bg-white/10 rounded-full" />
                       </div>
                       <div className="w-10 h-10 rounded-full border border-blue-500/50 flex flex-shrink-0 items-center justify-center bg-blue-500/10">
                         <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                       </div>
                     </>
                  )}
                  {index === 1 && (
                     <div className="w-full flex gap-3">
                       <div className="flex-1 h-12 border border-white/10 rounded-xl bg-white/5 flex items-center px-4">
                         <div className="w-1.5 h-6 bg-purple-400 rounded-full animate-pulse" />
                       </div>
                       <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                         <ArrowRight className="w-5 h-5 text-white" />
                       </div>
                     </div>
                  )}
                  {index === 2 && (
                     <div className="w-full flex justify-between items-end h-full pt-2">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className="w-[6%] bg-cyan-500/30 rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%` }} />
                       ))}
                     </div>
                  )}
                  {index === 3 && (
                     <div className="w-full flex items-center gap-4">
                       <div className="w-12 h-12 relative flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-4 border-green-500/20" />
                          <div className="absolute inset-0 rounded-full border-4 border-t-green-400 border-l-transparent border-b-transparent border-r-transparent animate-spin" />
                       </div>
                       <div>
                         <div className="text-green-400 font-bold tracking-wide">Scanning Data...</div>
                         <div className="text-xs text-slate-500 mt-1">Estimating risk vector</div>
                       </div>
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
