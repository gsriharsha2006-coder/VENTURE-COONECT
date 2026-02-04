
import React, { useState } from 'react';
import { analyzePitch } from '../services/geminiService';
import { BrainCircuit, Loader2, CheckCircle2, AlertCircle, Lightbulb, Trophy, History } from 'lucide-react';

export default function AICoach() {
  const [pitchText, setPitchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [history, setHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('vc_coach_history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleAnalyze = async () => {
    if (!pitchText.trim()) return;
    setIsLoading(true);
    try {
      const result = await analyzePitch(pitchText);
      const newEntry = { ...result, pitchText, timestamp: new Date().toISOString() };
      setFeedback(result);
      const updatedHistory = [newEntry, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('vc_coach_history', JSON.stringify(updatedHistory));
    } catch (error) {
      alert("AI Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Pitch Coach</h1>
          <p className="text-slate-500">Refine your narrative with instant AI feedback.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-3">Your Pitch Content</label>
            <textarea 
              className="w-full h-64 p-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition resize-none text-slate-700"
              placeholder="Paste your executive summary, pitch deck script, or problem statement here..."
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">{pitchText.length} characters</span>
              <button 
                onClick={handleAnalyze}
                disabled={isLoading || !pitchText.trim()}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
                {isLoading ? 'Analyzing...' : 'Analyze Pitch'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-700">
              <History size={18} /> Recent Sessions
            </h3>
            {history.length > 0 ? (
              <div className="space-y-3">
                {history.map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      setFeedback(item);
                      setPitchText(item.pitchText);
                    }}
                    className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-100 group"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-slate-900 truncate pr-4">{item.pitchText.substring(0, 40)}...</p>
                      <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-md">Score: {item.score}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-slate-400 text-sm">No analysis history yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {feedback ? (
            <div className="animate-in fade-in slide-in-from-right duration-500 space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-indigo-100 font-bold uppercase tracking-wider text-xs mb-1">Pitch Readiness Score</h3>
                    <div className="text-6xl font-black">{feedback.score}</div>
                  </div>
                  <Trophy size={64} className="text-white/20" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              <div className="grid gap-4">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="flex items-center gap-2 font-bold text-green-800 mb-3">
                    <CheckCircle2 size={18} /> Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {feedback.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-3">
                    <AlertCircle size={18} /> Weak Points
                  </h4>
                  <ul className="space-y-2">
                    {feedback.weaknesses.map((w: string, i: number) => (
                      <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="flex items-center gap-2 font-bold text-blue-800 mb-3">
                    <Lightbulb size={18} /> Improvement Tips
                  </h4>
                  <ul className="space-y-2">
                    {feedback.improvementTips.map((t: string, i: number) => (
                      <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <BrainCircuit size={40} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-400">Analysis Pending</h3>
              <p className="text-slate-400 max-w-xs mt-2">Enter your pitch on the left to receive comprehensive feedback from our AI Coach.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
