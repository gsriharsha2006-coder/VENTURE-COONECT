
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileText, Users, Clock, ArrowUpRight, Grid, List as ListIcon, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IdeaVault() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  
  const ideas = [
    { id: '1', title: 'EcoStream', status: 'Open for Pitch', updated: '2h ago', collaborators: 3, industry: 'Sustainability', score: 94 },
    { id: '2', title: 'HealthSync', status: 'Draft', updated: '1d ago', collaborators: 2, industry: 'HealthTech', score: 68 },
    { id: '3', title: 'FinForge', status: 'Funded', updated: '5d ago', collaborators: 4, industry: 'FinTech', score: 91 },
    { id: '4', title: 'QuantumEdu', status: 'Draft', updated: '1w ago', collaborators: 1, industry: 'EdTech', score: 45 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mission Control</h1>
          <p className="text-slate-500 mt-1 font-medium text-lg">Your vault of innovation, documentation, and IP assets.</p>
        </div>
        <button 
          onClick={() => alert("Initializing Asset Wizard...")}
          className="bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition shadow-2xl shadow-indigo-600/20 active:scale-95 flex items-center gap-3"
        >
          <Plus size={20} /> Create New Asset
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Query assets..." 
              className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/5 transition text-sm font-bold shadow-inner"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-50 border border-transparent text-slate-600 hover:bg-white hover:border-slate-100 transition font-black text-[10px] uppercase tracking-widest">
            <Filter size={18} /> Filters
          </button>
        </div>
        <div className="flex bg-slate-50 p-1.5 rounded-2xl">
          <button onClick={() => setView('grid')} className={`p-3 rounded-xl transition ${view === 'grid' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}><Grid size={20} /></button>
          <button onClick={() => setView('list')} className={`p-3 rounded-xl transition ${view === 'list' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}><ListIcon size={20} /></button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ideas.map(idea => (
            <div key={idea.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col group relative">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                <ShieldCheck size={120} />
              </div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-4 bg-slate-50 text-indigo-600 rounded-[1.5rem] group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                  <FileText size={32} />
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">PITCH SCORE</span>
                   <span className={`text-xl font-black ${idea.score > 80 ? 'text-green-500' : idea.score > 60 ? 'text-amber-500' : 'text-slate-400'}`}>{idea.score}%</span>
                </div>
              </div>

              <h3 className="font-black text-2xl mb-2 text-slate-900 group-hover:text-indigo-600 transition tracking-tighter leading-none">{idea.title}</h3>
              <p className="text-[10px] text-slate-400 mb-8 font-black uppercase tracking-[0.2em]">{idea.industry}</p>
              
              <div className="space-y-4 mb-10 flex-1 relative z-10">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Users size={16} className="text-slate-200" /> {idea.collaborators} Members Active
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Clock size={16} className="text-slate-200" /> Modified {idea.updated}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] border ${
                    idea.status === 'Funded' ? 'bg-green-50 text-green-700 border-green-100' : 
                    idea.status === 'Open for Pitch' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {idea.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => navigate('/coach')}
                    className="flex-1 bg-slate-50 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition border border-transparent hover:border-indigo-100"
                  >
                    AI Coach
                  </button>
                  <button 
                    onClick={() => navigate('/apply')}
                    disabled={idea.status === 'Funded'}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-xl shadow-slate-100 flex items-center justify-center gap-2 disabled:opacity-20"
                  >
                    Launch <Zap size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => alert("Redirecting to New Venture Wizard...")}
            className="border-4 border-dashed border-slate-100 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-6 text-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-700 group cursor-pointer"
          >
            <div className="p-6 bg-slate-50 rounded-[2rem] group-hover:bg-indigo-600 group-hover:text-white transition-all duration-700 group-hover:scale-110 shadow-sm"><Plus size={48} /></div>
            <p className="font-black text-xs uppercase tracking-[0.3em] group-hover:text-indigo-600 transition">Add New Concept</p>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-8 px-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Name</th>
                <th className="text-left py-8 px-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vertical</th>
                <th className="text-left py-8 px-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Index</th>
                <th className="text-left py-8 px-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifecycle</th>
                <th className="py-8 px-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ideas.map(idea => (
                <tr key={idea.id} className="group hover:bg-slate-50/50 transition cursor-pointer" onClick={() => navigate('/apply')}>
                  <td className="py-8 px-12">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                        <FileText size={20} />
                      </div>
                      <span className="font-black text-slate-900 text-lg tracking-tight">{idea.title}</span>
                    </div>
                  </td>
                  <td className="py-8 px-12 text-sm font-bold text-slate-500">{idea.industry}</td>
                  <td className="py-8 px-12">
                    <div className="flex items-center gap-3">
                       <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full ${idea.score > 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${idea.score}%` }}></div>
                       </div>
                       <span className="text-xs font-black text-slate-900">{idea.score}%</span>
                    </div>
                  </td>
                  <td className="py-8 px-12">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border ${
                      idea.status === 'Funded' ? 'bg-green-50 text-green-700 border-green-100' : 
                      idea.status === 'Open for Pitch' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 
                      'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>{idea.status}</span>
                  </td>
                  <td className="py-8 px-12 text-right">
                    <button className="p-4 text-slate-200 group-hover:text-indigo-600 transition-all duration-300 transform group-hover:translate-x-1"><ArrowUpRight size={24} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
