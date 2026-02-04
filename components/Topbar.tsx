
import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { Bell, Search, Menu, User, Settings, Crown, Zap, ShieldCheck } from 'lucide-react';

export default function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [status, setStatus] = useState('SYNCED');

  // Simulated status fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'SYNCED' ? 'ROUTING' : 'SYNCED');
      setTimeout(() => setStatus('SYNCED'), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="p-3 hover:bg-slate-50 rounded-2xl md:hidden text-slate-400">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center bg-slate-50 px-5 py-3 rounded-2xl w-80 shadow-inner group focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search size={18} className="text-slate-300 mr-3 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search ecosystem..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-bold text-slate-600 placeholder:text-slate-300"
          />
        </div>
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-green-50 border border-green-100 rounded-xl">
           <div className={`w-2 h-2 rounded-full ${status === 'SYNCED' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
           <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">{status}: DEAL-NET #882</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {user?.isPremium && (
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10">
            <Crown size={14} className="text-amber-400" />
            Venture Pro
          </div>
        )}
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 text-slate-400 hover:bg-slate-50 rounded-2xl relative transition-all active:scale-90"
          >
            <Bell size={22} />
            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-indigo-600 rounded-full border-[3px] border-white shadow-sm"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <span className="font-black text-slate-900 uppercase text-xs tracking-widest">Global Activity</span>
                <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">2 NEW</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                <div className="p-6 hover:bg-slate-50 transition border-b border-slate-50 cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0"><Zap size={18} /></div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-tight">Investor Interest High</p>
                      <p className="text-slate-400 text-xs mt-1 font-medium leading-relaxed">Sequoia Capital just engaged with your latest slide revision on "EcoStream".</p>
                      <span className="text-[9px] font-black text-slate-300 mt-3 block uppercase tracking-widest">2 Minutes Ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 hover:bg-slate-50 transition border-b border-slate-50 cursor-pointer">
                   <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0"><ShieldCheck size={18} /></div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-tight">IP Securely Indexed</p>
                      <p className="text-slate-400 text-xs mt-1 font-medium leading-relaxed">Your "FinForge" documents have been encrypted and stored in the Idea Vault.</p>
                      <span className="text-[9px] font-black text-slate-300 mt-3 block uppercase tracking-widest">1 Hour Ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full p-4 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition">Mark all as read</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 tracking-tighter leading-none">{user?.name}</p>
            <p className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-widest">{user?.role}</p>
          </div>
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} 
            className="w-11 h-11 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm transition-transform hover:scale-105 cursor-pointer"
            alt="Profile"
            onClick={() => alert("Identity panel initiated...")}
          />
        </div>
      </div>
    </header>
  );
}
