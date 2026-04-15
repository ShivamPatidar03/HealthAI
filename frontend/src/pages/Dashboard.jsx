import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Heart, Brain, Search, Bell, User, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Diabetes', path: '/models/diabetes', icon: Activity },
  { name: 'Heart Disease', path: '/models/heart', icon: Heart },
  { name: 'Stress Level', path: '/models/stress', icon: Brain },
];

const recentPredictions = [
  { id: 1, model: 'Diabetes', date: 'Today, 10:23 AM', status: 'Low Risk', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  { id: 2, model: 'Heart Disease', date: 'Yesterday, 14:45 PM', status: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { id: 3, model: 'Stress Level', date: 'Oct 12, 09:15 AM', status: 'High', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
];

const chartData = [
  { name: 'Mon', score: 82 },
  { name: 'Tue', score: 85 },
  { name: 'Wed', score: 81 },
  { name: 'Thu', score: 86 },
  { name: 'Fri', score: 89 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 92 },
];

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-6rem)] relative w-full max-w-7xl mx-auto px-6 py-8">
      {/* Background glow for dashboard area */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full h-[50vh] max-w-5xl bg-blue-600/5 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />

      {/* Sidebar */}
      <aside className="w-16 md:w-64 flex-shrink-0 relative z-20 hidden sm:flex flex-col gap-6 mr-8">
        <div className="flex flex-col gap-2 sticky top-32">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4 hidden md:block">Menu</div>
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden",
                  isActive 
                    ? "text-white bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                )}
              >
                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent pointer-events-none" />}
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-cyan-400 rounded-r-md" />}
                
                <Icon className={clsx("w-5 h-5 flex-shrink-0 relative z-10 transition-colors", isActive ? "text-cyan-400" : "group-hover:text-cyan-400")} />
                <span className="hidden md:block font-medium relative z-10 tracking-wide">{link.name}</span>
              </Link>
            );
          })}
          
          <div className="mt-10 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 hidden md:block px-4">Account</div>
          <button className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors border border-transparent text-left group">
            <User className="w-5 h-5 flex-shrink-0 group-hover:text-cyan-400 transition-colors" />
            <span className="hidden md:block font-medium tracking-wide">Profile Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full min-w-0 flex flex-col gap-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              Overview <Activity className="w-6 h-6 text-cyan-400" />
            </h1>
            <p className="text-sm text-slate-400 font-medium">Your personalized predictive health analytics.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-black/40 border border-white/10 rounded-full pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 w-full md:w-64 focus:bg-black/60 transition-all font-medium placeholder:text-slate-500 shadow-inner"
              />
            </div>
            <button className="relative w-11 h-11 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all flex-shrink-0">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl p-6 relative overflow-hidden group bg-gradient-to-br from-[#0f172a] to-[#0a0f1c] border border-white/10 hover:border-cyan-500/30 transition-colors shadow-xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Scans</div>
                <div className="text-4xl font-black text-white">12</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Activity className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
               <span className="text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded-md"><TrendingUp className="w-3 h-3"/> +2</span> 
               <span className="text-slate-500">this week</span>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="rounded-3xl p-6 relative overflow-hidden group bg-gradient-to-br from-[#0f172a] to-[#0a0f1c] border border-white/10 hover:border-purple-500/30 transition-colors shadow-xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Health Score</div>
                <div className="text-4xl font-black text-white">85<span className="text-xl text-slate-500 font-medium">/100</span></div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                 <Heart className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mt-4 border border-white/5"><div className="bg-gradient-to-r from-purple-600 to-purple-400 w-[85%] h-full rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" /></div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="rounded-3xl p-6 relative overflow-hidden group bg-gradient-to-br from-[#0f172a] to-[#0a0f1c] border border-white/10 hover:border-green-500/30 transition-colors shadow-xl">
            <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Latest Status</div>
                <div className="text-3xl font-black text-green-400 tracking-tight">Optimal</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                 <Brain className="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
               <Clock className="w-4 h-4"/> Updated 2 hours ago
            </div>
          </motion.div>
        </div>

        {/* Chart & Activity Level */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-[#0f172a]/80 border border-white/10 p-6 shadow-xl backdrop-blur-md">
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">Health Score Trend</h2>
                  <p className="text-sm text-slate-400">Your performance over the last 7 days.</p>
                </div>
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  Weekly
                </div>
             </div>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0f1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} 
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Recent Logs List */}
          <div className="rounded-3xl bg-[#0f172a]/80 border border-white/10 p-6 shadow-xl backdrop-blur-md flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-lg font-bold text-white tracking-wide">Recent Logs</h2>
               <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">View All</button>
            </div>
            
            <div className="space-y-6 flex-grow">
              {recentPredictions.map((item) => (
                <div key={item.id} className="relative pl-6 pb-6 border-l border-white/5 last:border-0 last:pb-0 group">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:scale-150 transition-transform" />
                  <div className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{item.model} Model</div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                    <Clock className="w-3 h-3" /> {item.date}
                  </div>
                  <div className={clsx("inline-flex px-2.5 py-1 rounded-lg text-xs font-bold border tracking-wide", item.color, item.bg)}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Array */}
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide mb-6">Prediction Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sidebarLinks.slice(1).map((model, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }} 
                key={model.name}
                className="group relative rounded-3xl bg-[#0f172a] border border-white/10 hover:border-cyan-500/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0a0f1c] flex items-center justify-center text-cyan-400 border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-inner">
                    <model.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xl font-bold text-white">{model.name}</div>
                </div>
                <p className="relative z-10 text-sm text-slate-400 mb-8 font-medium leading-relaxed flex-grow">
                  Run a new analysis using the latest clinical parameters.
                </p>
                <Link 
                  to={model.path}
                  className="relative z-10 mt-auto w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white text-center transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] tracking-wide"
                >
                  Start Analysis <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
