
import React from 'react';
import { Calendar, Video, Clock, CheckCircle2, MoreHorizontal, User, Link as LinkIcon, Plus } from 'lucide-react';

export default function Meetings() {
  const upcomingMeetings = [
    { id: '1', title: 'Seed Round Intro', contact: 'Jane VC (Sequoia)', date: 'June 12, 2025', time: '10:00 AM', status: 'Confirmed', link: 'https://zoom.us/j/12345' },
    { id: '2', title: 'Pitch Feedback', contact: 'Mike Angel', date: 'June 14, 2025', time: '2:30 PM', status: 'Pending', link: '#' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Unicorn Meetings</h1>
          <p className="text-slate-500 mt-1">Direct scheduling with high-intent investors.</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2">
          <Plus size={20} /> Schedule New
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <Clock size={22} className="text-indigo-600" /> Upcoming Sessions
          </h2>
          
          {upcomingMeetings.map(meeting => (
            <div key={meeting.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 flex-shrink-0">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{meeting.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                    <User size={14} /> {meeting.contact}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {meeting.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {meeting.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${meeting.status === 'Confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {meeting.status}
                </span>
                <a 
                  href={meeting.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${meeting.status === 'Confirmed' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  <Video size={16} /> Join Meeting
                </a>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition"><MoreHorizontal size={20} /></button>
              </div>
            </div>
          ))}

          <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-sm hover:border-indigo-300 hover:bg-indigo-50/20 transition">
            View Past Meetings History
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Availability</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Your Booking Link</p>
                  <p className="text-xs text-slate-500 mt-0.5">vc.com/johndoe</p>
                </div>
                <button className="p-2 text-indigo-600 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-slate-100"><LinkIcon size={18} /></button>
              </div>
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Sync Calendar</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition">Google</button>
                  <button className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition">Outlook</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Unicorn Insights</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">Investors are 40% more likely to meet with startups that have a pitch score of 85+.</p>
              <button className="w-full py-2.5 bg-white text-indigo-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition">Get More Advice</button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
