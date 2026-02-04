
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../App';
import { Rocket, Mail, Lock, User, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: searchParams.get('role') || 'FOUNDER'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    setIsLoading(true);
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      alert('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8 lg:p-12">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <Rocket size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900">VentureConnect</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900">Create Account</h1>
            <p className="text-slate-500 mt-2 text-sm">Join the ecosystem built for scale.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl mb-6">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'FOUNDER'})}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition ${formData.role === 'FOUNDER' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Founder
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: 'INVESTOR'})}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition ${formData.role === 'INVESTOR' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                Investor
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Min 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold text-base hover:bg-indigo-700 transition flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Sign Up <ArrowRight className="group-hover:translate-x-1 transition" /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-xs">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 underline decoration-2">Log In</Link>
          </div>
        </div>

        <div className="hidden md:flex bg-indigo-600 p-12 flex-col justify-between text-white relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6">Build Something Great</h2>
            <div className="space-y-6">
              {[
                "Direct VC access without gatekeepers",
                "AI powered feedback loop",
                "Pitch simulations and recordings",
                "Unicorn networking events"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-indigo-100 font-medium">
                  <CheckCircle2 size={20} className="text-indigo-300" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-20 pt-10 border-t border-white/10">
            <p className="text-xs text-indigo-200 uppercase tracking-widest font-bold mb-4">Trusted by users at</p>
            <div className="flex flex-wrap gap-4 opacity-40">
              <span className="font-black text-lg">STANFORD</span>
              <span className="font-black text-lg">MIT</span>
              <span className="font-black text-lg">Y-COMBINATOR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
