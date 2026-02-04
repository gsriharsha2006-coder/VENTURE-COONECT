
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../constants';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { Rocket, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const filteredItems = SIDEBAR_ITEMS.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col sticky top-0 h-screen ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-100">
        <div className={`flex items-center gap-3 overflow-hidden transition-all ${!isOpen && 'scale-0 w-0'}`}>
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Rocket size={20} />
          </div>
          <span className="font-bold text-lg whitespace-nowrap">VentureConnect</span>
        </div>
        <button onClick={toggle} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
              ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}
              ${!isOpen && 'justify-center px-2'}
            `}
            title={!isOpen ? item.label : ''}
          >
            <span className={!isOpen ? 'scale-110' : ''}>{item.icon}</span>
            <span className={`transition-opacity duration-200 ${!isOpen ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <button 
          onClick={logout}
          className={`
            flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors
            ${!isOpen && 'justify-center px-2'}
          `}
        >
          <LogOut size={20} />
          <span className={`transition-opacity ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
