import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PieChart, Settings, LogOut, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: PieChart, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="text-xl font-bold text-white tracking-tight">AdminPro</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${isActive
                      ? 'bg-indigo-600/10 text-indigo-400 font-medium'
                      : 'hover:bg-slate-800 hover:text-white'
                    }`}
                >
                  <item.icon size={22} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
                  <span className="text-base">{item.label}</span>
                </motion.div>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-800">
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-red-400" />
            <span>Logout</span>
          </motion.button>
        </div>

      </div>
    </>
  );
}
