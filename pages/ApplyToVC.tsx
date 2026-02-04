
import React, { useState } from 'react';
// Added Paperclip to the lucide-react imports
import { Send, Upload, CheckCircle2, Search, Filter, Rocket, FileText, ChevronRight, Zap, ShieldCheck, Globe, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplyToVC() {
  const [step, setStep] = useState(1);
  const [selectedVC, setSelectedVC] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const vcFirms = [
    { id: '1', name: 'Sequoia Capital', focus: 'AI & SaaS', stage: 'Seed to Series C', rating: 4.9, country: 'USA' },
    { id: '2', name: 'Andreessen Horowitz', focus: 'Consumer & Web3', stage: 'Any', rating: 4.8, country: 'USA' },
    { id: '3', name: 'Accel', focus: 'Enterprise & Fintech', stage: 'Seed to Series B', rating: 4.7, country: 'UK' },
    { id: '4', name: 'Founders Fund', focus: 'DeepTech', stage: 'Series A+', rating: 4.9, country: 'USA' },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5); // Success state
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Venture Transmission</h1>
        <p className="text-slate-500 font-medium text-lg">Direct protocol for routing high-conviction startups to verified partners.</p>
      </div>

      <div className="flex items-center justify-between px-12 py-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        {[
          { num: 1, label: 'Target VC' },
          { num: 2, label: 'Asset Select' },
          { num: 3, label: 'Documentation' },
          { num: 4, label: 'Verification' }
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center gap-3 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base transition-all duration-700 ${step >= s.num ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30' : 'bg-slate-50 text-slate-300'}`}>
                {step > s.num ? <CheckCircle2 size={28} /> : s.num}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${step >= s.num ? 'text-indigo-600' : 'text-slate-300'}`}>{s.label}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-0.5 mx-6 ${step > s.num ? 'bg-indigo-600' : 'bg-slate-100'} transition-all duration-700`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col transition-all relative">
        
        {step === 1 && (
          <div className="p-16 space-y-10 flex-1 animate-in slide-in-from-right duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Verified Venture Firms</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Query firms..." className="w-full md:w-64 pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-xs font-bold shadow-inner" />
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              {vcFirms.map(firm => (
                <div 
                  key={firm.id}
                  onClick={() => setSelectedVC(firm)}
                  className={`p-10 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer flex items-center justify-between group ${selectedVC?.id === firm.id ? 'border-indigo-600 bg-indigo-50/20 shadow-2xl shadow-indigo-100/30' : 'border-slate-50 hover:border-indigo-200 hover:bg-slate-50'}`}
                >
                  <div className="flex gap-8 items-center">
                    <div className="w-20 h-20 bg-white rounded-[1.8rem] flex items-center justify-center shadow-xl border border-slate-100 text-slate-900 font-black text-3xl group-hover:scale-110 transition-transform duration-500 group-hover:bg-slate-900 group-hover:text-white">
                      {firm.name[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-2xl text-slate-900 tracking-tight">{firm.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg">{firm.focus}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Globe size={12} /> {firm.country}</span>
                      </div>
                    </div>
                  </div>
                  {selectedVC?.id === firm.id ? (
                    <div className="bg-indigo-600 text-white p-4 rounded-3xl shadow-2xl animate-in zoom-in duration-300">
                      <CheckCircle2 size={32} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-3xl border-2 border-slate-100 group-hover:border-indigo-200 transition"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-12 flex-1 animate-in zoom-in duration-500">
            <div className="w-32 h-32 bg-indigo-50 text-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-indigo-100 relative group">
              <Rocket size={64} className="group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" />
              <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg"><Zap size={16} /></div>
            </div>
            <div className="max-w-lg">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Venture Asset Selection</h2>
              <p className="text-slate-500 mt-6 font-medium text-lg leading-relaxed px-10">Choose which documentation set from your Idea Vault you would like to route to <b>{selectedVC?.name}</b>.</p>
            </div>
            <div className="w-full max-w-lg space-y-4">
               {['EcoStream (Pitch Score: 94%)', 'HealthSync (Pitch Score: 68%)', 'FinForge (Pitch Score: 91%)'].map((opt, i) => (
                 <button key={i} className="w-full p-6 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100 rounded-3xl text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-between">
                   {opt}
                   <ChevronRight size={18} />
                 </button>
               ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-10 flex-1 animate-in slide-in-from-bottom-10 duration-500">
            <div className="w-40 h-40 bg-slate-50 rounded-[4rem] border-[6px] border-dashed border-slate-100 flex items-center justify-center text-slate-200 hover:text-indigo-200 hover:border-indigo-100 transition-all duration-700 cursor-pointer group shadow-inner">
              <Upload size={72} className="group-hover:scale-110 transition duration-500" />
            </div>
            <div className="max-w-lg">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Asset Upload</h2>
              <p className="text-slate-500 mt-6 font-medium leading-relaxed text-lg">Route your technical whitepapers, financial model, and pitch deck. Files are encrypted instantly.</p>
            </div>
            <label className="bg-slate-900 text-white px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-4">
              <Paperclip size={20} /> Select Encrypted File
              <input type="file" className="hidden" onChange={() => alert("File indexed and encrypted.")} />
            </label>
            <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex gap-6 text-left max-w-xl shadow-sm">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-md flex-shrink-0">
                <FileText size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">PRO-TIP FROM AI COACH</p>
                <p className="text-sm text-indigo-900 leading-relaxed font-bold">
                  Investors spend an average of 3 minutes per deck. Your Q3 growth chart is currently slide #12. Moving it to slide #3 could increase interest by 40%.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-20 flex flex-col items-center justify-center text-center space-y-12 flex-1 animate-in zoom-in-90 duration-700">
            <div className="relative">
              <div className="w-44 h-44 bg-green-50 text-green-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl shadow-green-100">
                <ShieldCheck size={100} />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-3xl shadow-2xl border border-slate-50">
                <CheckCircle2 className="text-indigo-600" size={32} />
              </div>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Final Verification</h2>
              <p className="text-slate-500 mt-8 leading-relaxed text-xl font-medium px-12">
                Transmission pipeline initialized for <b>EcoStream</b> to <b>{selectedVC?.name}</b>.
                <br /><span className="text-indigo-600 font-black mt-4 block text-base uppercase tracking-[0.2em]">Predicted Match Rating: 9.4/10</span>
              </p>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-20 py-8 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.3em] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-6 active:scale-95 disabled:opacity-50 group"
            >
              {isSubmitting ? 'ROUTING ASSETS...' : 'EXECUTE TRANSMISSION'} <Send size={28} className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="p-24 flex flex-col items-center justify-center text-center space-y-12 flex-1 animate-in zoom-in duration-1000">
             <div className="w-56 h-56 bg-slate-900 rounded-[4rem] flex items-center justify-center text-white shadow-2xl relative">
                <Rocket size={120} className="animate-float" />
                <div className="absolute inset-0 bg-indigo-500/20 rounded-[4rem] blur-3xl animate-pulse"></div>
             </div>
             <div>
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter">MISSION DEPLOYED</h2>
                <p className="text-slate-500 mt-8 text-2xl font-medium max-w-xl mx-auto leading-relaxed">
                  Your application for <b>{selectedVC?.name}</b> has been successfully routed. The firm usually responds within 48-72 hours.
                </p>
             </div>
             <div className="flex gap-6">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition shadow-2xl shadow-slate-200"
                >
                  Return to Hub
                </button>
                <button 
                  onClick={() => navigate('/messages')}
                  className="bg-white border-2 border-slate-100 text-slate-900 px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition"
                >
                  View Network
                </button>
             </div>
          </div>
        )}

        {step < 5 && (
          <div className="p-12 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-16">
            <button 
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1 || isSubmitting}
              className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] px-10 py-4 rounded-2xl hover:bg-white hover:text-slate-900 transition disabled:opacity-0 active:scale-95"
            >
              Back
            </button>
            {step < 4 && (
              <button 
                onClick={() => setStep(prev => prev + 1)}
                disabled={step === 1 && !selectedVC}
                className="bg-slate-900 text-white px-14 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 transition flex items-center gap-4 disabled:opacity-50 active:scale-95 shadow-2xl shadow-slate-900/10 group"
              >
                Proceed to Phase {step + 1} <ChevronRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
