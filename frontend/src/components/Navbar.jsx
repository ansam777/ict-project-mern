import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarPlus, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 px-4 py-3 border-b border-white/15 bg-black/40 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-widest text-white">
              CHRONO<span className="text-slate-400 font-light">ADMIN</span>
            </h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">
              Event Control Portal
            </p>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center space-x-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/add-event"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Add Event</span>
          </NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;