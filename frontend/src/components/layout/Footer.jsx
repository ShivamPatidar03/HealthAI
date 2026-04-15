import React from 'react';
import { Activity, Globe, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0a0f1c]/80 backdrop-blur-md pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">Health<span className="text-cyan-400">AI</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              AI-powered health prediction models designed for early detection and proactive wellness.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Models</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/models/diabetes" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Diabetes Prediction</Link></li>
              <li><Link to="/models/heart" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Heart Disease</Link></li>
              <li><Link to="/models/stress" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Stress Level</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Platform</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/dashboard" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Dashboard</Link></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">How it works</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">API Access</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} HealthAI Monitoring System. For educational purposes.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-slate-400">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
