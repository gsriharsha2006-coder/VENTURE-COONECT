
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../App';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Smile, 
  Phone, 
  Video, 
  X, 
  Mic, 
  MicOff, 
  VideoOff, 
  Maximize2,
  CheckCheck,
  MessageSquare,
  ShieldCheck,
  Zap,
  ChevronLeft,
  User,
  Loader2,
  Signal,
  Info
} from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic message state for the prototype
  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({
    '1': [
      { id: '1-1', sender: 'them', text: 'Hey! I just reviewed the latest V3 pitch deck you uploaded for EcoStream.', time: '2:15 PM' },
      { id: '1-2', sender: 'me', text: 'Great! Any specific thoughts on the go-to-market strategy slide?', time: '2:17 PM' },
      { id: '1-3', sender: 'them', text: 'Actually, it\'s very compelling. I\'d love to jump on a quick video call.', time: '2:18 PM' },
    ],
    '2': [
      { id: '2-1', sender: 'them', text: 'Welcome to the YC community! Have you started working on the demo day prep?', time: 'Yesterday' }
    ]
  });

  const contacts = [
    { id: '1', name: 'Sequoia Capital', lastMsg: 'The technical deck looks solid.', time: '2m', unread: 2, avatar: 'https://picsum.photos/seed/sequoia/200', role: 'Venture Partner' },
    { id: '2', name: 'Y Combinator', lastMsg: 'Interview invitation sent.', time: '1h', unread: 0, avatar: 'https://picsum.photos/seed/yc/200', role: 'Accelerator' },
    { id: '3', name: 'Jane Investor', lastMsg: 'Let\'s talk about the seed round.', time: '5h', unread: 0, avatar: 'https://picsum.photos/seed/jane/200', role: 'Angel Investor' },
    { id: '4', name: 'Accel Hub', lastMsg: 'Updates on Series A?', time: '1d', unread: 0, avatar: 'https://picsum.photos/seed/accel/200', role: 'VC Firm' },
  ];

  // Simulated "Real-time" polling / incoming messages
  useEffect(() => {
    const simulateIncoming = setInterval(() => {
      if (selectedChat && !isTyping && Math.random() > 0.7) {
        setIsTyping(true);
        setTimeout(() => {
          const investorThoughts = [
            "Just saw your Q4 projections, impressive growth.",
            "Are you planning to expand to the APAC market soon?",
            "Partners are asking about the cap table distribution.",
            "Can we schedule a deep-dive session next Tuesday?",
          ];
          const randomMsg = investorThoughts[Math.floor(Math.random() * investorThoughts.length)];
          const reply = {
            id: Date.now().toString(),
            sender: 'them',
            text: randomMsg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setChatHistory(prev => ({
            ...prev,
            [selectedChat.id]: [...(prev[selectedChat.id] || []), reply]
          }));
          setIsTyping(false);
        }, 3000);
      }
    }, 25000);

    return () => clearInterval(simulateIncoming);
  }, [selectedChat, isTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, selectedChat, isTyping]);

  const handleSendMessage = () => {
    if (!inputMsg.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    setInputMsg('');

    // Instant acknowledgement simulation
    setIsTyping(true);
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: 'them',
        text: `Got it. Reviewing this now...`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), reply]
      }));
      setIsTyping(false);
    }, 1500);
  };

  const startVideoCall = async () => {
    setIsVideoCalling(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera/Mic access denied for simulation", err);
    }
  };

  const endVideoCall = () => {
    setIsVideoCalling(false);
    if (localVideoRef.current?.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const activeMessages = selectedChat ? (chatHistory[selectedChat.id] || []) : [];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative font-inter">
      
      {/* Contact Sidebar */}
      <div className={`w-80 md:w-[26rem] border-r border-slate-50 flex flex-col bg-slate-50/20 transition-all ${selectedChat ? 'hidden md:flex' : 'flex w-full md:w-[26rem]'}`}>
        <div className="p-10 pb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Messages</h2>
            <div className="bg-indigo-50 p-2.5 rounded-2xl text-indigo-600 shadow-sm">
              <Zap size={20} />
            </div>
          </div>
          <div className="relative group">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search people, firms..." 
              className="w-full pl-14 pr-4 py-4.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold shadow-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-3">
          <div className="px-4 mb-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Direct Deal Access</span>
          </div>
          {contacts.map(contact => (
            <button 
              key={contact.id} 
              onClick={() => setSelectedChat(contact)}
              className={`w-full p-5 flex gap-5 rounded-[2rem] transition-all duration-500 group relative ${selectedChat?.id === contact.id ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20' : 'hover:bg-white hover:shadow-xl text-slate-600'}`}
            >
              <div className="relative flex-shrink-0">
                <img src={contact.avatar} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white/5 shadow-md" alt={contact.name} />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-[3px] border-white rounded-full shadow-lg"></div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-black text-base tracking-tight truncate ${selectedChat?.id === contact.id ? 'text-white' : 'text-slate-900'}`}>{contact.name}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest flex-shrink-0 ml-2 ${selectedChat?.id === contact.id ? 'text-slate-500' : 'text-slate-300'}`}>{contact.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate font-medium ${selectedChat?.id === contact.id ? 'text-slate-400' : 'text-slate-500'}`}>{contact.lastMsg}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Workspace */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-white animate-in slide-in-from-right duration-500">
          <div className="p-8 md:px-12 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-6">
              <button onClick={() => setSelectedChat(null)} className="md:hidden p-2.5 hover:bg-slate-50 rounded-2xl text-slate-400">
                <ChevronLeft size={24} />
              </button>
              <div className="relative">
                 <img src={selectedChat.avatar} className="w-14 h-14 rounded-[1.5rem] object-cover border border-slate-100 shadow-xl" alt="" />
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-black text-slate-900 text-2xl tracking-tighter leading-none">{selectedChat.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">{selectedChat.role}</span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">End-to-End Encrypted</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={startVideoCall}
                className="p-4 text-white bg-slate-900 hover:bg-indigo-600 rounded-[1.5rem] transition-all duration-500 shadow-2xl shadow-slate-900/10 active:scale-95 group"
              >
                <Video size={22} className="group-hover:scale-110 transition" />
              </button>
              <button className="p-4 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-[1.5rem] transition-all active:scale-95" onClick={() => alert("Direct audio link initiated...")}><Phone size={22} /></button>
              <button className="p-4 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-[1.5rem] transition-all active:scale-95"><MoreVertical size={22} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 p-10 md:px-16 overflow-y-auto space-y-12 bg-[radial-gradient(#f1f5f9_1.2px,transparent_1.2px)] bg-[size:32px_32px] scroll-smooth">
            <div className="flex flex-col items-center gap-4 py-8">
               <div className="bg-slate-100 px-5 py-2 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Room #VC-{selectedChat.id}992</div>
               <div className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-100">
                 <ShieldCheck size={14} /> Direct Connection Secured
               </div>
            </div>

            {activeMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl flex gap-4 ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.sender !== 'me' && <img src={selectedChat.avatar} className="w-10 h-10 rounded-2xl shadow-md mt-auto" alt="" />}
                  <div className={`relative group ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-7 text-sm font-semibold leading-relaxed shadow-sm transition-all duration-300 ${
                      msg.sender === 'me' 
                      ? 'bg-slate-900 text-white rounded-[2.5rem] rounded-tr-none hover:shadow-2xl hover:shadow-slate-900/20' 
                      : 'bg-white text-slate-800 rounded-[2.5rem] rounded-tl-none border border-slate-100 hover:shadow-2xl hover:shadow-slate-100/50'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-2 mt-3 px-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{msg.time}</span>
                      {msg.sender === 'me' && <CheckCheck size={16} className="text-indigo-500" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-4">
                  <img src={selectedChat.avatar} className="w-10 h-10 rounded-2xl shadow-md opacity-50" alt="" />
                  <div className="bg-slate-50 px-6 py-4 rounded-full border border-slate-100 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-indigo-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investor is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-10 bg-white border-t border-slate-50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="bg-slate-50/50 rounded-[2.5rem] p-4 flex items-center gap-4 border border-slate-100 shadow-inner focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-500/20 transition-all duration-500"
            >
              <button type="button" onClick={() => alert("File explorer opened for doc upload...")} className="p-4 text-slate-400 hover:bg-white hover:text-indigo-600 rounded-2xl transition-all shadow-sm active:scale-90"><Paperclip size={22} /></button>
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Message firm..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-800 placeholder:text-slate-400"
              />
              <button type="button" className="p-4 text-slate-400 hover:bg-white hover:text-indigo-600 rounded-2xl transition-all shadow-sm active:scale-90"><Smile size={22} /></button>
              <button type="submit" disabled={!inputMsg.trim()} className="bg-slate-900 text-white p-5 rounded-[1.5rem] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-90 disabled:opacity-30">
                <Send size={22} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative animate-in zoom-in duration-1000">
            <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 mb-10 mx-auto shadow-2xl shadow-slate-100 border border-slate-50">
              <MessageSquare size={64} className="opacity-40" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">Direct Portfolio Hub</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed text-lg">
              Start a direct session with partners to discuss equity, strategy, and Q3 milestones.
            </p>
          </div>
        </div>
      )}

      {/* Cinematic Video Call Overlay */}
      {isVideoCalling && (
        <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-8 animate-in fade-in duration-700">
          <div className="absolute top-12 left-12 flex items-center justify-between w-[calc(100%-6rem)]">
             <div className="flex items-center gap-4">
               <div className="bg-rose-500 w-4 h-4 rounded-full animate-pulse shadow-lg shadow-rose-500/50"></div>
               <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">DIRECT CONNECT ACTIVE</span>
             </div>
             <div className="flex items-center gap-4 text-white/40 text-[9px] font-black uppercase tracking-widest">
               <Signal size={14} className="text-green-500" /> Latency: 12ms
             </div>
          </div>

          <div className="w-full max-w-6xl h-full flex flex-col relative">
            <div className="flex-1 bg-slate-900 rounded-[4rem] overflow-hidden relative shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedChat?.avatar.replace('200', '1200')} 
                  className="w-full h-full object-cover blur-xl opacity-20 scale-110" 
                  alt="" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-12">
                  <div className="w-44 h-44 rounded-[3.5rem] border-[6px] border-white/10 p-2 mb-10">
                     <img src={selectedChat?.avatar} className="w-full h-full rounded-[2.5rem] object-cover shadow-2xl" alt="" />
                  </div>
                  <h4 className="text-6xl font-black tracking-tighter mb-4">{selectedChat?.name}</h4>
                  <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-500/20">Establishing Handshake...</p>
                </div>
              </div>

              <div className="absolute bottom-12 right-12 w-80 h-56 bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-[3px] border-white/10">
                <video ref={localVideoRef} autoPlay muted className={`w-full h-full object-cover scale-x-[-1] ${!isCamOn ? 'hidden' : 'block'}`} />
                {!isCamOn && (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
                    <User size={32} className="text-slate-600 mb-2" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Host Cam Offline</span>
                  </div>
                )}
                <div className="absolute top-5 left-5 bg-black/60 px-4 py-2 rounded-2xl text-[9px] text-white font-black uppercase border border-white/5">Your Stream</div>
              </div>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 bg-black/60 backdrop-blur-3xl px-12 py-7 rounded-[3rem] border border-white/10 shadow-2xl">
                <button 
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'}`}
                >
                  {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>
                <button 
                  onClick={() => setIsCamOn(!isCamOn)}
                  className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all ${isCamOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-rose-500 text-white shadow-xl shadow-rose-500/40'}`}
                >
                  {isCamOn ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
                <button 
                  onClick={endVideoCall}
                  className="w-24 h-16 bg-rose-600 text-white rounded-[2rem] hover:bg-rose-700 transition-all flex items-center justify-center shadow-2xl shadow-rose-600/30 active:scale-95"
                >
                  <X size={28} />
                </button>
                <button className="w-16 h-16 bg-white/10 text-white rounded-[1.8rem] hover:bg-white/20 transition-all">
                  <Maximize2 size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
