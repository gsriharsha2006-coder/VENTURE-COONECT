
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../App';
import { Camera, Mic, Timer, Trophy, Star, MessageSquare, Send, StopCircle, RefreshCw, XCircle } from 'lucide-react';

export default function PitchRoom() {
  const { user } = useAuth();
  const [isPitching, setIsPitching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPitching && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isPitching) {
      handleEndPitch();
    }
    return () => clearInterval(timer);
  }, [isPitching, timeLeft]);

  const handleStartPitch = async () => {
    setIsPitching(true);
    setIsFinished(false);
    setTimeLeft(90);
    setMessages([]);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const handleEndPitch = () => {
    setIsPitching(false);
    setIsFinished(true);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages([...messages, { role: 'Investor', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold">90-Second Pitch Room</h1>
            <p className="text-xs text-slate-500 font-medium">Session ID: #VC-8291</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-lg font-mono font-bold ${timeLeft < 10 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-900'}`}>
            <Timer size={20} />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          {!isPitching ? (
            <button 
              onClick={handleStartPitch}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Start Live Pitch
            </button>
          ) : (
            <button 
              onClick={handleEndPitch}
              className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition flex items-center gap-2"
            >
              <StopCircle size={20} /> Stop Pitch
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Main Video View */}
        <div className="lg:col-span-2 relative bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
          {isPitching ? (
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : isFinished ? (
            <div className="text-center p-12 bg-indigo-900/40 backdrop-blur-md rounded-3xl border border-white/10 w-4/5 animate-in zoom-in duration-300">
              <Trophy size={80} className="text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black text-white mb-2">Pitch Completed!</h2>
              <p className="text-indigo-100 mb-8">Excellent delivery. Your recording is being analyzed by investors and the AI Coach.</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold">Pacing</p>
                  <p className="text-2xl font-bold text-white">Optimal</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold">Confidence</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl">
                  <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold">Rating</p>
                  <div className="flex justify-center text-amber-400 mt-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} /></div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={handleStartPitch} className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition">
                  <RefreshCw size={18} /> Retry Pitch
                </button>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition">
                  Save Recording
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-white/40 space-y-4">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <Camera size={40} />
              </div>
              <p className="text-lg font-medium">Camera Feed Standby</p>
              <p className="text-sm max-w-xs mx-auto">Click "Start Live Pitch" to begin your session. Your 90-second countdown will start immediately.</p>
            </div>
          )}

          {/* Overlay Stats while pitching */}
          {isPitching && (
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center gap-1.5 w-fit">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
              </div>
              <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-medium flex items-center gap-2 w-fit">
                <Mic size={14} className="text-green-400" /> Audio Synchronized
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Interactions */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" /> Live Feedback
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3 Investors Watching</span>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 opacity-30">
                <div className="p-3 rounded-full bg-slate-100">
                  <MessageSquare size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest">Chat Room Empty</p>
                <p className="text-[10px]">Real-time feedback from investors will appear here.</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className="animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{m.role}</span>
                    <span className="text-[10px] text-slate-400">{m.time}</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm text-sm text-slate-700">
                    {m.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-slate-50 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">Only Investors can send messages during the pitch.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rocket(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.71-2.5.71-2.5l-3.71-3.71s-1.79 0-2.5.71Z"></path><path d="M12 10 3 19"></path><path d="m7 7 4-4 8 8 2 9s-1.29-1.39-4.38-4.06a2.26 2.26 0 0 1-3.12-3.12l-4.5-4.5Z"></path><path d="m15 7 1 1"></path></svg>
  );
}
