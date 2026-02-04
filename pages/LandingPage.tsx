
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, BrainCircuit, Users, Target, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = Array.from({ length: 5 }).map((_, i) => ({
    url: `https://picsum.photos/seed/vc${i}/1200/600`,
    title: i === 0 ? "Empowering Youth" : i === 1 ? "Seamless VC Connection" : "AI Powered Insights"
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-slate-50 scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Rocket size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900">VentureConnect</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#opportunities" className="hover:text-indigo-600 transition">Opportunities</a>
            <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <TrendingUp size={14} />
              Youth startup sector growing 300%
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Talk to VC – Direct Bridge Between <span className="text-indigo-600">Youth</span> and <span className="text-purple-600">Investors</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              VentureConnect is the ecosystem where young founders refine their ideas, master their pitch, and connect directly with world-class investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup?role=FOUNDER" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 group">
                Apply as Founder <ArrowRight className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/signup?role=INVESTOR" className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition text-center">
                Join as Investor
              </Link>
            </div>
          </div>
          <div className="relative animate-in zoom-in duration-1000">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
              {slides.map((slide, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={slide.url} alt={slide.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <p className="text-white font-bold text-2xl">{slide.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Funded</p>
                  <p className="text-2xl font-bold">$12M+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-2">500+</p>
            <p className="text-indigo-200 text-sm">Verified VCs</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">2.5k+</p>
            <p className="text-indigo-200 text-sm">Active Founders</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">300%</p>
            <p className="text-indigo-200 text-sm">Youth Sector Growth</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-2">15 min</p>
            <p className="text-indigo-200 text-sm">Avg Response Time</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Revolutionizing Startup Funding</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to go from a dormitory idea to a unicorn valuation.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield className="text-indigo-600" />, title: "Secure Idea Vault", desc: "Protect your IP while collaborating with team members and receiving feedback." },
            { icon: <BrainCircuit className="text-purple-600" />, title: "AI Pitch Coach", desc: "Get real-time feedback on your deck and speech using advanced GenAI." },
            { icon: <Users className="text-blue-600" />, title: "Direct VC Access", desc: "Skip the gatekeepers. Pitch directly to decision-makers at top firms." },
            { icon: <Target className="text-red-600" />, title: "Growth Opportunities", desc: "Access curated hackathons, incubators, and student-run accelerators." },
            { icon: <CheckCircle2 className="text-green-600" />, title: "Unicorn Meetings", desc: "Automatic scheduling with VCs whose investment focus matches your startup." },
            { icon: <Rocket className="text-orange-600" />, title: "Pitch Room", desc: "Fully functional live pitch simulations with real-time investor feedback." },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition group">
              <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-vc text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Ready to Build the Future?</h2>
          <p className="text-xl mb-12 text-indigo-100">Join the movement and start your entrepreneurial journey today.</p>
          <Link to="/signup" className="bg-white text-indigo-700 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-slate-50 transition shadow-2xl inline-block transform hover:scale-105">
            Join the Movement 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Rocket className="text-indigo-600" />
            <span className="font-bold text-xl">VentureConnect</span>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Contact Us</a>
          </div>
          <p className="text-slate-400 text-sm">© 2025 VentureConnect Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
