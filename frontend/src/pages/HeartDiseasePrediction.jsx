import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ActivitySquare, ChevronRight, TriangleAlert, Info } from 'lucide-react';
import clsx from 'clsx';
import { predictHeart } from '../services/api';

const HeartDiseasePrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    Age: '',
    Sex: 1,
    BMI: '',
    HighBP: 0,
    HighChol: 0,
    Diabetes: 0,
    Stroke: 0,
    Smoker: 0,
    DiffWalk: 0,
    PhysHlth: 0,
    GenHlth: 3,
    Income: 5,
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
        Age: parseFloat(formData.Age),
        GenHlth: parseFloat(formData.GenHlth),
        HighBP: parseFloat(formData.HighBP),
        HighChol: parseFloat(formData.HighChol),
        DiffWalk: parseFloat(formData.DiffWalk),
        PhysHlth: parseFloat(formData.PhysHlth),
        Sex: parseFloat(formData.Sex),
        Stroke: parseFloat(formData.Stroke),
        Diabetes: parseFloat(formData.Diabetes),
        Income: parseFloat(formData.Income),
        BMI: parseFloat(formData.BMI),
        Smoker: parseFloat(formData.Smoker)
      };

      const response = await predictHeart(dataToSubmit);
      
      setResult({
        status: response.risk_level,
        probability: response.probability !== null ? `${(response.probability * 100).toFixed(1)}%` : 'N/A',
        category: response.prediction === 1 ? 'Diagnostic Review Required' : 'Optimal Cardiovascular Profile',
        threshold: response.threshold_used,
        recommendations: response.recommendations
      });
      
    } catch (err) {
      setError(err.message || 'Failed to process cardiovascular assessment.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const RadioGroup = ({ label, name, options }) => (
    <div>
       <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">{label}</label>
       <div className="flex gap-2">
          {options.map((opt, i) => (
            <label key={i} className="flex-1 cursor-pointer">
               <input type="radio" name={name} value={opt.value} checked={formData[name] === opt.value} onChange={handleChange} className="peer sr-only" />
               <div className="w-full text-center py-2 rounded-lg border border-white/10 bg-black/20 text-slate-400 peer-checked:bg-red-500/10 peer-checked:border-red-500/50 peer-checked:text-red-400 transition-all font-medium text-xs">
                 {opt.label}
               </div>
            </label>
          ))}
       </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative min-h-[calc(100vh-6rem)]">
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 mb-6 uppercase tracking-widest text-xs font-bold">
             <Heart className="w-4 h-4" /> Cardiology Model V2
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Heart Disease <span className="text-red-400">Diagnostic</span></h1>
          <p className="text-slate-400 max-w-xl">Advanced cardiovascular risk assessment utilizing 12 key health vectors.</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full">
        
        <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card rounded-[2rem] p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-orange-500/50" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Age</label>
                    <input type="number" name="Age" value={formData.Age} onChange={handleChange} required placeholder="Years" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">BMI</label>
                    <input type="number" step="0.1" name="BMI" value={formData.BMI} onChange={handleChange} required placeholder="e.g. 25.5" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
                  </div>
                  <div>
                     <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Sex</label>
                     <select name="Sex" value={formData.Sex} onChange={handleSelectChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none">
                        <option value={1}>Male</option>
                        <option value={0}>Female</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <RadioGroup label="High Blood Pressure" name="HighBP" options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
                  <RadioGroup label="High Cholesterol" name="HighChol" options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
                  <RadioGroup label="Diabetic History" name="Diabetes" options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
                  <RadioGroup label="Stroke History" name="Stroke" options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
               </div>

               <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <RadioGroup label="Active Smoker" name="Smoker" options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
                  <RadioGroup label="Difficulty Walking" name="DiffWalk" options={[{label: 'No', value: 0}, {label: 'Yes', value: 1}]} />
                  
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1 text-nowrap">Poor Phys. Health (Days/Mo)</label>
                    <input type="number" name="PhysHlth" value={formData.PhysHlth} onChange={handleChange} required min="0" max="30" placeholder="0-30" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-red-500/50 transition-colors" />
                  </div>
                  <div>
                     <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">General Health</label>
                     <select name="GenHlth" value={formData.GenHlth} onChange={handleSelectChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none">
                        <option value={1}>1 - Excellent</option>
                        <option value={2}>2 - Very Good</option>
                        <option value={3}>3 - Good</option>
                        <option value={4}>4 - Fair</option>
                        <option value={5}>5 - Poor</option>
                     </select>
                  </div>
               </div>

               <div className="pt-2 border-t border-white/5">
                 <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Income Level (1-8 Scale)</label>
                 <input type="range" name="Income" value={formData.Income} onChange={handleChange} min="1" max="8" className="w-full accent-red-500" />
                 <div className="flex justify-between text-xs text-slate-500 mt-1"><span>Low (1)</span><span>High (8)</span></div>
               </div>

               {error && (
                <div className="text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
               )}

               <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center px-8 py-4 font-bold text-white transition-all bg-red-600/80 border border-red-500/50 rounded-xl hover:bg-red-500 disabled:opacity-50 mt-4 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Computing Model Graph...' : 'Evaluate Metrics'}
                    {!isSubmitting && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                  {!isSubmitting && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
               </button>
            </form>
          </div>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <div className={clsx("glass-card rounded-[2rem] p-8 border relative overflow-hidden", result.status === 'Elevated Risk' ? "border-red-500/30 bg-red-500/5" : "border-green-500/30 bg-green-500/5")}>
                 <div className="flex items-start justify-between mb-6 relative z-10">
                    <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight mb-1">{result.status}</h2>
                      <div className={clsx("text-sm font-semibold flex items-center gap-2", result.status === 'Elevated Risk' ? 'text-red-400' : 'text-green-400')}>
                         <TriangleAlert className="w-4 h-4" /> {result.category}
                      </div>
                    </div>
                    <div className={clsx("w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg", result.status === 'Elevated Risk' ? "border-red-500/30 bg-red-500/10 shadow-red-500/20" : "border-green-500/30 bg-green-500/10 shadow-green-500/20")}>
                       {result.probability}
                    </div>
                 </div>

                 <div className="space-y-4 mt-8 relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-white border-b border-white/5 pb-2">
                      <ActivitySquare className="w-5 h-5" />
                      <h3 className="font-semibold text-white">AI Recommendations</h3>
                    </div>
                    {result.recommendations.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                         <div className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", result.status === 'Elevated Risk' ? 'bg-red-400' : 'bg-green-400')} />
                         <span className="text-slate-300 text-sm">{m}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeartDiseasePrediction;
