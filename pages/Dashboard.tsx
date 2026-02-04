
import React, { useState } from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { 
  Plus, 
  TrendingUp, 
  Calendar, 
  Lock,
  Filter,
  Search,
  Bookmark,
  FileText,
  Heart,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const MOCK_DATA = [
  { name: 'Mon', views: 400, interest: 240 },
  { name: 'Tue', views: 300, interest: 139 },
  { name: 'Wed', views: 200, interest: 980 },
  { name: 'Thu', views: 278, interest: 390 },
  { name: 'Fri', views: 189, interest: 480 },
  { name: 'Sat', views: 239, interest: 380 },
  { name: 'Sun', views: 349, interest: 430 },
];

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === UserRole.INVESTOR) {
    return <InvestorDashboard />;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ecosystem Hub</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring your venture growth and capital connections.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/vault" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20 active:scale-95">
            <Plus size={18} /> New Project
          </Link>
          <Link to="/apply" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-50 transition shadow-sm active:scale-95">
            <TrendingUp size={18} /> Seek Funding
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Ideas', value: '4', icon: <FileText className="text-blue-600" size={16} />, bg: 'bg-blue-50' },
          { label: 'Startup Inquiries', value: '124', icon: <MessageSquare className="text-indigo-600" size={16} />, bg: 'bg-indigo-50' },
          { label: 'Investor Interest', value: '12', icon: <TrendingUp className="text-green-600" />, bg: 'bg-green-50' },
          { label: 'Meetings Scheduled', value: '2', icon: <Calendar className="text-purple-600" />, bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>{stat.icon}</div>
              <span className="text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-widest">+12%</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-xl text-slate-900 tracking-tight">Growth Analytics</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black uppercase text-slate-500">7D</button>
              <button className="px-3 py-1.5 bg-indigo-600 rounded-xl text-[10px] font-black uppercase text-white shadow-lg shadow-indigo-200">30D</button>
            </div>
          </div>
          
          <div className="relative h-72 w-full">
            {!user?.isPremium && (
              <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-8">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-amber-200/20">
                  <Lock size={24} />
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">Advanced Insights Locked</h4>
                <p className="text-sm text-slate-500 max-w-xs mb-6 font-medium">Upgrade to Pro for heatmaps, investor personas, and real-time deck retention stats.</p>
                <Link to="/profile" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/30">
                  Unlock Premium
                </Link>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 800 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '15px' }}
                />
                <Bar dataKey="views" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="interest" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <TrendingUp size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-xl mb-4 tracking-tight">AI Coach</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">
                Our GenAI just analyzed your "EcoStream" summary. Click to see how to improve your value prop.
              </p>
              <Link to="/coach" className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition uppercase tracking-widest text-[10px]">
                View Analysis <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <h3 className="font-black text-slate-900 tracking-tight">Network Activity</h3>
               <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Clear All</button>
             </div>
             <div className="space-y-6">
                {[
                  { user: 'Sarah VC', action: 'Reviewed Deck', time: '12m' },
                  { user: 'SeedFund', action: 'Expressed Interest', time: '1h' },
                  { user: 'GenAI Hack', action: 'New Opportunity', time: '3h' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex-shrink-0 flex items-center justify-center font-black text-slate-300 text-xs">
                      {act.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate tracking-tight">{act.user}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.action}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-300">{act.time}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestorDashboard() {
  const [interested, setInterested] = useState<string[]>([]);

  const startups = [
    { id: '1', name: 'EcoStream', founder: 'Alice Chen', industry: 'Sustainability', stage: 'Seed', score: 94, summary: 'Decentralized carbon credit tracking for SMBs using L2 blockchain infrastructure.' },
    { id: '2', name: 'HealthSync', founder: 'Bob Smith', industry: 'HealthTech', stage: 'Pre-seed', score: 88, summary: 'AI-driven patient data interoperability layer for modern clinics.' },
    { id: '3', name: 'FinForge', founder: 'Sarah Jay', industry: 'FinTech', stage: 'Series A', score: 91, summary: 'Revolutionizing cross-border B2B payments with instant settlement.' },
    { id: '4', name: 'EduPulse', founder: 'David Wu', industry: 'EdTech', stage: 'Seed', score: 85, summary: 'Gamified learning platform for K-12 robotics and engineering.' },
  ];

  const toggleInterest = (id: string) => {
    setInterested(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Deal Discover</h1>
          <p className="text-slate-500 mt-2 font-medium text-lg">Curated high-growth ventures vetted by AI-Connect protocol.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
          <ShieldCheck className="text-indigo-600" size={20} />
          <span className="text-xs font-black text-indigo-700 uppercase tracking-widest">Verified Hub</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex-1 min-w-[280px] relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search sectors, founders, or tags..." 
            className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/30 transition text-sm font-bold placeholder:text-slate-400"
          />
        </div>
        <button className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-slate-50 text-slate-900 hover:bg-slate-100 transition font-black text-[10px] uppercase tracking-widest border border-slate-100">
          <Filter size={18} /> Sector Filters
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {startups.map(startup => (
          <div key={startup.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden group flex flex-col relative">
            <div className="h-56 bg-slate-100 relative overflow-hidden">
              <img src={`https://picsum.photos/seed/${startup.id}/800/600`} alt={startup.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 grayscale-[0.2] group-hover:grayscale-0" />
              
              <div className="absolute top-6 left-6">
                 <div className="bg-indigo-600/90 backdrop-blur text-white px-5 py-2 rounded-2xl text-[10px] font-black shadow-2xl tracking-[0.1em] uppercase">
                   AI-SCORE: <span className="ml-1 text-white">{startup.score}</span>
                 </div>
              </div>

              <div className="absolute bottom-6 right-6">
                 <button className="bg-white/95 backdrop-blur p-3 rounded-2xl text-slate-400 hover:text-indigo-600 transition shadow-2xl active:scale-90">
                   <Bookmark size={20} />
                 </button>
              </div>

              <div className="absolute top-6 right-6">
                <span className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-widest">
                  {startup.stage}
                </span>
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="font-black text-3xl text-slate-900 group-hover:text-indigo-600 transition tracking-tighter leading-none">{startup.name}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-3">Founder: {startup.founder} • {startup.industry}</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1 mb-8">
                {startup.summary}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button className="flex items-center justify-center gap-2 bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-xl shadow-slate-200 active:scale-95">
                  <FileText size={16} /> Review Deck
                </button>
                <button 
                  onClick={() => toggleInterest(startup.id)}
                  className={`flex items-center justify-center gap-2 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition active:scale-95 border ${
                    interested.includes(startup.id) 
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xl shadow-rose-200' 
                    : 'bg-white text-slate-400 hover:text-rose-500 border-slate-100 hover:border-rose-100 hover:bg-rose-50'
                  }`}
                >
                  <Heart size={16} fill={interested.includes(startup.id) ? "currentColor" : "none"} /> 
                  {interested.includes(startup.id) ? 'Interested' : 'Mark Interest'}
                </button>
              </div>

              <Link to="/messages" className="w-full px-6 py-5 rounded-2xl bg-slate-50 text-slate-900 hover:bg-white hover:border-slate-200 border border-transparent transition font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <MessageSquare size={18} /> Contact Founder
              </Link>
            </div>

            {interested.includes(startup.id) && (
              <div className="absolute top-0 right-0 p-4 animate-in zoom-in duration-300 pointer-events-none">
                 <div className="bg-rose-500 text-white p-2 rounded-full shadow-2xl">
                   <CheckCircle2 size={16} />
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
