
import React from 'react';
import { useAuth } from '../App';
import { User, Mail, Shield, Crown, ChevronRight, CheckCircle2, Globe, Linkedin, Twitter, Camera, Edit3 } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <div className="relative">
        <div className="h-64 bg-slate-900 rounded-[3rem] overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
           <div className="absolute bottom-8 right-8">
             <button className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl text-white/50 hover:text-white transition active:scale-90 border border-white/5">
               <Camera size={20} />
             </button>
           </div>
        </div>
        <div className="absolute -bottom-16 left-12 flex items-end gap-10">
          <div className="relative group">
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} 
              className="w-44 h-44 rounded-[3.5rem] border-[8px] border-white object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              alt="Profile"
            />
            <button className="absolute bottom-2 right-2 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-white/10 text-white hover:bg-indigo-600 transition active:scale-90">
              <Edit3 size={20} />
            </button>
          </div>
          <div className="mb-8">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{user?.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest">{user?.role}</span>
              <span className="text-slate-400 font-bold text-sm">Joined Ecosystem May 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <User size={120} />
            </div>
            <h3 className="text-2xl font-black mb-10 tracking-tight text-slate-900">Ecosystem Identity</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Designation</label>
                <div className="font-bold text-slate-900 p-5 bg-slate-50 rounded-2xl border border-slate-100">{user?.name}</div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verified Email</label>
                <div className="font-bold text-slate-900 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  {user?.email}
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Narrative</label>
                <textarea 
                  className="w-full p-6 bg-slate-50 border-none rounded-3xl text-sm font-bold text-slate-800 leading-relaxed focus:ring-4 focus:ring-indigo-500/5 transition resize-none h-40" 
                  placeholder="Describe your venture focus or investment thesis..."
                  defaultValue={user?.role === 'INVESTOR' ? "Focusing on Series A ventures in Sustainability and Web3 Infrastructure. Looking for founders with high-conviction and strong technical backgrounds." : "Passionate young founder building the future of sustainability. Looking to connect with investors for Seed round for EcoStream."}
                />
              </div>
            </div>
            
            <div className="mt-12 flex gap-4">
              <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition shadow-xl shadow-slate-200 active:scale-95">Update Identity</button>
              <button className="text-slate-400 font-black text-xs uppercase tracking-widest px-8 py-5 rounded-2xl hover:bg-slate-50 transition">Reset</button>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black mb-10 tracking-tight text-slate-900">Digital Presence</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition group cursor-pointer">
                <Globe size={28} className="text-slate-300 group-hover:text-indigo-600 transition" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Website</span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-blue-600 transition group cursor-pointer">
                <Linkedin size={28} className="text-slate-300 group-hover:text-blue-600 transition" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn</span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-slate-900 transition group cursor-pointer">
                <Twitter size={28} className="text-slate-300 group-hover:text-slate-900 transition" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Twitter</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl group">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] group-hover:scale-125 transition duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-amber-400 mb-8">
                <Crown size={32} />
                <span className="text-xs font-black uppercase tracking-[0.3em]">Pro Hub</span>
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tighter leading-none">Scale Fast.<br/>Connect Smarter.</h3>
              <ul className="space-y-5 mb-10">
                {[
                  "Unlimited AI Insights",
                  "Priority Deal Placement",
                  "Advanced Data Rooms",
                  "Direct Partner DMs"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-400">
                    <CheckCircle2 size={18} className="text-indigo-400" />
                    {text}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => updateUser({ isPremium: !user?.isPremium })}
                className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-white transition active:scale-95 shadow-2xl shadow-black/20"
              >
                {user?.isPremium ? 'Downgrade Account' : 'Upgrade to Premium'}
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Shield size={24} className="text-indigo-600" /> Account Security
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition text-xs font-black uppercase tracking-widest text-slate-600 border border-transparent hover:border-slate-100">
                Access Logs <ChevronRight size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition text-xs font-black uppercase tracking-widest text-slate-600 border border-transparent hover:border-slate-100">
                Auth Settings <span className="text-[9px] bg-rose-50 text-rose-600 px-3 py-1 rounded-full border border-rose-100">DISABLED</span>
              </button>
              <div className="pt-4 border-t border-slate-50">
                <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-rose-50 text-rose-600 transition text-xs font-black uppercase tracking-widest active:scale-95 shadow-sm">
                  Deactivate Hub <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
