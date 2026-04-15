import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Activity, Heart, Brain, ShieldCheck } from 'lucide-react';

const FloatingCards = () => {
  const containerRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax configuration
  const x = useSpring(0, { stiffness: 400, damping: 90 });
  const y = useSpring(0, { stiffness: 400, damping: 90 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize -1 to 1
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Transformation for different layers
  const tX1 = useTransform(x, [-1, 1], [-15, 15]);
  const tY1 = useTransform(y, [-1, 1], [-15, 15]);
  
  const tX2 = useTransform(x, [-1, 1], [10, -10]);
  const tY2 = useTransform(y, [-1, 1], [10, -10]);

  const tX3 = useTransform(x, [-1, 1], [-25, 25]);
  const tY3 = useTransform(y, [-1, 1], [-25, 25]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[500px] lg:h-[650px] flex items-center justify-center perspective-[1000px] mt-10 lg:mt-0"
    >
      {/* Background radial glow specifically for the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-full max-w-[500px]"
      >
        {/* Card 1: Main Analysis (Center) */}
        <motion.div 
          style={{ x: isMobile ? 0 : tX1, y: isMobile ? 0 : tY1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] glass-card p-6 rounded-2xl shadow-2xl z-20 border border-white/10 glow-border"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg">Live Analysis</h3>
            </div>
            <div className="flex gap-1.5 object-center">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-pulse delay-75" />
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/20 animate-pulse delay-150" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Neural Network Sync</span>
                <span className="text-cyan-400">100%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-full rounded-full" />
              </div>
            </div>
            
            {/* Mock Waveform */}
            <div className="h-16 w-full flex items-end gap-1 opacity-60">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 40 + 20}%`] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                  className="flex-1 bg-cyan-500/40 rounded-t-sm"
                />
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between items-center mt-2">
              <span className="text-xs text-slate-400 font-medium">System Status</span>
              <span className="text-xs text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-md">Optimal</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Heart Status (Top Right) */}
        <motion.div
           style={{ x: isMobile ? 0 : tX2, y: isMobile ? 0 : tY2 }}
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute top-[10%] -right-[5%] sm:-right-[15%] w-[180px] glass p-4 rounded-xl shadow-xl z-30 border border-white/10 bg-[#0a0f1c]/80 backdrop-blur-xl hidden sm:block"
        >
          <div className="flex items-center gap-3 mb-3">
             <div className="p-1.5 bg-red-500/20 rounded-lg text-red-400">
                <Heart className="w-4 h-4" />
             </div>
             <span className="text-sm font-bold text-slate-200">Heart Risk</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-white leading-none">2.4</span>
            <span className="text-sm text-slate-400 leading-snug pb-1">%</span>
          </div>
          <div className="text-[10px] text-green-400 mt-1">Below average threshold</div>
        </motion.div>

        {/* Card 3: Brain/Stress Level (Bottom Left) */}
        <motion.div
           style={{ x: isMobile ? 0 : tX3, y: isMobile ? 0 : tY3 }}
           animate={{ y: [0, -12, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
           className="absolute bottom-[10%] -left-[5%] sm:-left-[15%] w-[190px] glass p-4 rounded-xl shadow-xl z-30 border border-white/10 bg-[#0a0f1c]/80 backdrop-blur-xl hidden sm:block"
        >
           <div className="flex items-center gap-3 mb-3">
             <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400">
                <Brain className="w-4 h-4" />
             </div>
             <span className="text-sm font-bold text-slate-200">Stress Level</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative w-12 h-12 rounded-full border-4 border-white/10 flex items-center justify-center">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle cx="20" cy="20" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-purple-500" strokeDasharray="125" strokeDashoffset="45" />
                 </svg>
                 <span className="text-xs font-bold text-white relative z-10">Low</span>
             </div>
             <div className="flex flex-col">
               <span className="text-lg font-bold text-white">Focus</span>
               <span className="text-[10px] text-slate-400">Stable patterns</span>
             </div>
          </div>
        </motion.div>

        {/* Card 4: Security Badge (Bottom Right) */}
         <motion.div
           style={{ x: isMobile ? 0 : tX1, y: isMobile ? 0 : tY2 }}
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-[2%] right-[5%] w-auto px-4 py-3 glass flex items-center gap-3 rounded-full shadow-lg z-10 border border-white/10"
        >
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-slate-300">End-to-End Encrypted</span>
        </motion.div>

        {/* Decorative Grid Lines within container */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,white_10%,transparent_70%)]" />
      </motion.div>
    </div>
  );
};

export default FloatingCards;
