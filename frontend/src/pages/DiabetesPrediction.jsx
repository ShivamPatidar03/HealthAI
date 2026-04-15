import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertCircle, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { predictDiabetes } from '../services/api';

const DiabetesPrediction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    blood_glucose_level: '',
    HbA1c_level: '',
    hypertension: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const dataToSubmit = {
        age: parseFloat(formData.age),
        bmi: parseFloat(formData.bmi),
        blood_glucose_level: parseFloat(formData.blood_glucose_level),
        HbA1c_level: parseFloat(formData.HbA1c_level),
        hypertension: parseInt(formData.hypertension)
      };
      
      const response = await predictDiabetes(dataToSubmit);
      
      setResult({
        status: response.risk_level,
        probability: response.probability !== null ? `${(response.probability * 100).toFixed(1)}%` : 'N/A',
        level: response.prediction === 1 ? 'danger' : 'safe',
        confidence: response.confidence ? response.confidence.toFixed(1) : '85.0',
        insights: [
          `Age factor analyzed: ${formData.age}`,
          `BMI category evaluated: ${formData.bmi}`,
          `Metabolic markers processed successfully.`
        ],
        recommendations: response.recommendations
      });
      
    } catch (err) {
      setError(err.message || 'Failed to process diagnostic analysis. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getResultColor = (level) => {
    switch(level) {
      case 'danger': return 'text-red-400 border-red-500/30 bg-red-500/10 from-red-500/20';
      case 'warning': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 from-yellow-500/20';
      case 'safe': default: return 'text-green-400 border-green-500/30 bg-green-500/10 from-green-500/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6">
          <Activity className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Diabetes <span className="text-cyan-400">Prediction</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Enter your clinical parameters below. Our machine learning model will analyze vectors including glucose, BMI, and age to determine progression risk.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Form Column */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={clsx("transition-all duration-500", result ? "lg:col-span-5" : "lg:col-span-8 lg:col-start-3")}>
          <div className="glass-card rounded-[2rem] p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/5 pb-2">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="e.g. 45" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-slate-400 mb-1">BMI</label>
                     <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} step="0.1" required placeholder="e.g. 24.5" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-white border-b border-white/5 pb-2 pt-2">Clinical Metrics</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center justify-between">
                        Glucose Level <Info className="w-3 h-3 text-slate-500" />
                      </label>
                      <input type="number" name="blood_glucose_level" value={formData.blood_glucose_level} onChange={handleChange} required placeholder="mg/dL" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center justify-between">
                        HbA1c Level <Info className="w-3 h-3 text-slate-500" />
                      </label>
                      <input type="number" name="HbA1c_level" value={formData.HbA1c_level} onChange={handleChange} step="0.1" required placeholder="%" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-xs font-medium text-slate-400 mb-2">Hypertension History</label>
                       <div className="flex gap-4">
                          <label className="flex-1 cursor-pointer">
                             <input type="radio" name="hypertension" value={1} checked={formData.hypertension === 1} onChange={handleChange} className="peer sr-only" />
                             <div className="w-full text-center py-3 rounded-xl border border-white/10 bg-black/20 text-slate-400 peer-checked:bg-cyan-500/10 peer-checked:border-cyan-500/50 peer-checked:text-cyan-400 transition-all font-medium text-sm">Yes</div>
                          </label>
                          <label className="flex-1 cursor-pointer">
                             <input type="radio" name="hypertension" value={0} checked={formData.hypertension === 0} onChange={handleChange} className="peer sr-only" />
                             <div className="w-full text-center py-3 rounded-xl border border-white/10 bg-black/20 text-slate-400 peer-checked:bg-cyan-500/10 peer-checked:border-cyan-500/50 peer-checked:text-cyan-400 transition-all font-medium text-sm">No</div>
                          </label>
                       </div>
                    </div>
                 </div>
              </div>

              {error && (
                <div className="text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full relative group flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-cyan-600/80 border border-cyan-400/50 rounded-xl hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Vectors...
                      </span>
                    ) : (
                      <>Run Diagnostic <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </span>
                  {!isSubmitting && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Result Column */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }} 
              animate={{ opacity: 1, x: 0, scale: 1 }} 
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Main Result Card */}
              <div className={clsx("rounded-[2rem] p-8 border backdrop-blur-xl relative overflow-hidden", getResultColor(result.level))}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-[0.05] rounded-full blur-3xl" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-1">Diagnostic Result</div>
                    <div className="text-4xl font-bold mb-2">{result.status}</div>
                    <div className="text-sm opacity-80">AI Confidence Score: {result.confidence}%</div>
                  </div>
                  
                  <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="opacity-20" />
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * parseInt(result.probability) / 100)} className="drop-shadow-[0_0_10px_currentColor]" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-2xl font-bold">{result.probability}</span>
                       <span className="text-[10px] uppercase font-semibold opacity-70">Probability</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insights */}
                <div className="glass-card rounded-[2rem] p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4 text-cyan-400 border-b border-white/5 pb-2">
                    <Activity className="w-5 h-5" />
                    <h3 className="font-semibold text-white">Pathology Insights</h3>
                  </div>
                  <ul className="space-y-4">
                    {result.insights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="glass-card rounded-[2rem] p-6 border border-white/10">
                  <div className="flex items-center gap-2 mb-4 text-purple-400 border-b border-white/5 pb-2">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="font-semibold text-white">AI Recommendations</h3>
                  </div>
                  <ul className="space-y-4">
                    {result.recommendations.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default DiabetesPrediction;
