
import React from 'react';
import { Trophy, Users, Calendar, MapPin, ExternalLink, Sparkles, Target } from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '../constants';

export default function Opportunities() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="relative overflow-hidden bg-gradient-vc rounded-3xl p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black">Growth Opportunities</h1>
            <p className="text-indigo-100 text-lg max-w-xl">Curated hackathons, incubators, and grants designed specifically for youth-led ventures.</p>
          </div>
          <div className="hidden lg:block">
            <Sparkles size={80} className="text-white/20 animate-pulse" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_OPPORTUNITIES.map((opp) => (
          <div key={opp.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition">
            <div className={`p-4 flex items-center gap-3 ${opp.type === 'Hackathon' ? 'bg-orange-50' : opp.type === 'Incubator' ? 'bg-blue-50' : 'bg-emerald-50'}`}>
              <div className={`p-2 rounded-xl ${opp.type === 'Hackathon' ? 'bg-orange-500' : opp.type === 'Incubator' ? 'bg-blue-500' : 'bg-emerald-500'} text-white`}>
                {opp.type === 'Hackathon' ? <Trophy size={18} /> : opp.type === 'Incubator' ? <Target size={18} /> : <Sparkles size={18} />}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${opp.type === 'Hackathon' ? 'text-orange-700' : opp.type === 'Incubator' ? 'text-blue-700' : 'text-emerald-700'}`}>{opp.type}</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-4">{opp.name}</h3>
              
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Calendar size={16} />
                  <span>Deadline: <b>{new Date(opp.deadline).toLocaleDateString()}</b></span>
                </div>
                {opp.prize && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Trophy size={16} />
                    <span>Prize Pool: <b>{opp.prize}</b></span>
                  </div>
                )}
                {opp.location && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <MapPin size={16} />
                    <span>Location: <b>{opp.location}</b></span>
                  </div>
                )}
                {opp.value && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Users size={16} />
                    <span>Value: <b>{opp.value}</b></span>
                  </div>
                )}
              </div>

              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2">
                Apply Now <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
        
        <div className="bg-slate-100 rounded-3xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300">
            <Sparkles size={32} />
          </div>
          <div>
            <p className="font-bold text-slate-600">More coming soon...</p>
            <p className="text-sm text-slate-400 mt-1">We're indexing 50+ new programs every week.</p>
          </div>
          <button className="text-indigo-600 text-sm font-bold hover:underline">Get Notified</button>
        </div>
      </div>
    </div>
  );
}
