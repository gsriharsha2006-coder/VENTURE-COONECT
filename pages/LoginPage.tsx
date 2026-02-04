
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Rocket, Mail, Lock, Loader2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden font-inter selection:bg-indigo-500/30">
      
      {/* Visual / Graphic Section */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-slate-900 relative items-center justify-center p-12 lg:p-24 border-r border-slate-800">
        
        {/* Animated Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4f46e520,transparent_70%)]"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[150px] rounded-full"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={12} />
            The Future of VC
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
            BRIDGING <span className="text-indigo-500 italic">YOUTH</span> <br />
            AND <span className="text-slate-400 underline decoration-indigo-500 underline-offset-[12px]">CAPITAL.</span>
          </h1>

          <div className="grid grid-cols-2 gap-8 mt-20">
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl">
              <p className="text-3xl font-black text-white mb-1">$1.2B+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Liquidity</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl">
              <p className="text-3xl font-black text-white mb-1">4.8k</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Startups</p>
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-slate-500">
             <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src={`https://picsum.photos/seed/user${i}/100`} />
              ))}
             </div>
             <p className="text-xs font-medium">Joined by 120+ top-tier VCs this month</p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition duration-300">
                <Rocket size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">VentureConnect</span>
            </Link>
            <h2 className="text-3xl font-black text-white tracking-tight">Access Dashboard</h2>
            <p className="text-slate-500 mt-2 font-medium">Enter your credentials to manage your ecosystem.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-sm"
                  placeholder="name@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secret Key</label>
                <a href="#" className="text-[10px] font-black text-indigo-500 uppercase hover:text-indigo-400 tracking-widest">Recovery</a>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group shadow-xl shadow-indigo-600/10 disabled:opacity-50 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Verify & Enter
                  <ArrowRight className="group-hover:translate-x-1 transition duration-300" size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex flex-col gap-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-slate-950 px-4 text-slate-600">Quick Access Profiles</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {setEmail('founder@demo.com'); setPassword('12345678');}}
                className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-left hover:border-indigo-500/50 transition-all group"
              >
                <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Founder Portal</p>
                <p className="text-[10px] text-slate-600 font-bold group-hover:text-slate-400 transition">Sample Workspace</p>
              </button>
              <button 
                onClick={() => {setEmail('vc@demo.com'); setPassword('12345678');}}
                className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-left hover:border-purple-500/50 transition-all group"
              >
                <p className="text-[10px] font-black text-purple-400 uppercase mb-1">Investor Portal</p>
                <p className="text-[10px] text-slate-600 font-bold group-hover:text-slate-400 transition">Sample Portfolio</p>
              </button>
            </div>

            <p className="text-center text-xs font-medium text-slate-600">
              New to VentureConnect? <Link to="/signup" className="text-white font-black hover:text-indigo-400 transition ml-1 underline underline-offset-4">Register Hub</Link>
            </p>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-2 text-slate-700 font-bold text-[10px] uppercase tracking-widest">
            <ShieldCheck size={14} />
            End-to-End Encrypted Ecosystem
          </div>
        </div>
      </div>
    </div>
  );
}
