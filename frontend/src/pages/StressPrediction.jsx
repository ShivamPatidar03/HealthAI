import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Waves, Sparkles, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { predictStress } from '../services/api';

const StressPrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    sleep_hours: 7,
    daily_steps: '',
    resting_hr: '',
    bmi: '',
    cholesterol: '',
    water_intake_l: 2,
    diastolic_bp: '',
    systolic_bp: '',
    smoker: 0,
    alcohol: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? parseInt(value) : value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const dataToSubmit = {
        sleep_hours: parseFloat(formData.sleep_hours),
        daily_steps: parseFloat(formData.daily_steps),
        resting_hr: parseFloat(formData.resting_hr),
        bmi: parseFloat(formData.bmi),
        cholesterol: parseFloat(formData.cholesterol),
        water_intake_l: parseFloat(formData.water_intake_l),
        diastolic_bp: parseFloat(formData.diastolic_bp),
        systolic_bp: parseFloat(formData.systolic_bp),
        smoker: parseFloat(formData.smoker),
        alcohol: parseFloat(formData.alcohol)
      };

      const response = await predictStress(dataToSubmit);
      
      setResult({
        level: response.stress_level,
        confidence: response.confidence !== null ? `${response.confidence.toFixed(1)}%` : 'N/A',
        description: `Our neural analysis categorizes your physiological markers in the "${response.stress_level}" stress tier.`,
        tips: response.wellness_tips
      });
      
    } catch (err) {
      setError(err.message || 'Failed to process mental wellness analysis.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative min-h-screen">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent blur-[80px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <Brain className="w-8 h-8 text-purple-400" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Mental Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Analysis</span></motion.h1>
         <p className="text-slate-400 max-w-xl mx-auto">Evaluating 10 core physiological and lifestyle vectors to predict systemic stress loading.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
        
        <motion.div className={clsx("transition-all duration-500", result ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3")} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card rounded-[2rem] p-8 border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Sleep (Hours)</label>
                    <input type="number" step="0.5" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Daily Steps</label>
                    <input type="number" name="daily_steps" value={formData.daily_steps} onChange={handleChange} required placeholder="e.g. 5000" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Resting HR (bpm)</label>
                    <input type="number" name="resting_hr" value={formData.resting_hr} onChange={handleChange} required placeholder="60-100" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">BMI</label>
                    <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} required placeholder="e.g. 23.5" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Cholesterol</label>
                    <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} required placeholder="mg/dL" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2 text-nowrap">Water Intake (Liters)</label>
                    <input type="number" step="0.1" name="water_intake_l" value={formData.water_intake_l} onChange={handleChange} required placeholder="e.g. 2.5" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
              </div>

               <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Systolic BP</label>
                    <input type="number" name="systolic_bp" value={formData.systolic_bp} onChange={handleChange} required placeholder="e.g. 120" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Diastolic BP</label>
                    <input type="number" name="diastolic_bp" value={formData.diastolic_bp} onChange={handleChange} required placeholder="e.g. 80" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Smoker</label>
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                         <input type="radio" name="smoker" value={0} checked={formData.smoker === 0} onChange={handleChange} className="peer sr-only" />
                         <div className="w-full text-center py-2.5 rounded-lg border border-white/10 bg-black/20 text-slate-400 peer-checked:bg-purple-500/20 peer-checked:border-purple-500/50 peer-checked:text-purple-400 transition-colors text-sm">No</div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                         <input type="radio" name="smoker" value={1} checked={formData.smoker === 1} onChange={handleChange} className="peer sr-only" />
                         <div className="w-full text-center py-2.5 rounded-lg border border-white/10 bg-black/20 text-slate-400 peer-checked:bg-purple-500/20 peer-checked:border-purple-500/50 peer-checked:text-purple-400 transition-colors text-sm">Yes</div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Alcohol Frequency</label>
                    <select name="alcohol" value={formData.alcohol} onChange={handleSelectChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none text-sm">
                        <option value={0}>Rarely/Never</option>
                        <option value={1}>Occasionally</option>
                        <option value={2}>Frequently</option>
                     </select>
                  </div>
               </div>

              {error && (
                <div className="text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-purple-600/80 border border-purple-500/50 rounded-xl hover:bg-purple-500 disabled:opacity-50 mt-8 relative overflow-hidden"
              >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Evaluating...' : 'Begin Analysis'}
                  </span>
                  {!isSubmitting && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
              </button>
            </form>
          </div>
        </motion.div>

        <AnimatePresence>
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="lg:col-span-5 flex flex-col gap-6 h-full"
            >
              <div className="glass-card rounded-[2rem] p-8 border border-purple-500/30 flex-grow relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/20 blur-3xl rounded-full" />
                 
                 <div className="text-center mb-8 relative z-10">
                    <div className="text-purple-400 font-semibold mb-2 uppercase tracking-widest text-xs">Stress Assessment</div>
                    <div className="text-5xl font-bold text-white mb-2">{result.level}</div>
                    <div className="text-sm opacity-80 mb-4 text-purple-200">AI Confidence: {result.confidence}</div>
                    <p className="text-slate-400 text-sm mx-auto">{result.description}</p>
                 </div>

                 {result.tips && result.tips.length > 0 && (
                   <div className="space-y-3 relative z-10">
                     <div className="text-xs font-semibold text-white/50 uppercase mb-4 text-center">Wellness Protocol</div>
                     {result.tips.map((tip, i) => (
                       <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                          <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0" />
                          <span className="text-sm text-slate-200">{tip}</span>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </motion.div>
          ) : (
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center space-y-4 opacity-30 h-full border border-dashed border-white/20 rounded-[2rem]">
               <Waves className="w-16 h-16 text-slate-400" />
               <div className="text-slate-500 font-medium">Awaiting Data Input</div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default StressPrediction;
