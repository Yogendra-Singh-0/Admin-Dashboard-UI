import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Sun, Moon, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ setIsSidebarOpen, isDarkMode, toggleDarkMode, searchQuery, setSearchQuery, userProfile }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close notifications on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotifications = 3;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu & Search */}
        <div className="flex items-center flex-1 gap-4 lg:gap-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="max-w-md w-full relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Theme Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border-2 border-white dark:border-slate-900"></span>
              )}
            </motion.button>

            <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transform origin-top-right z-50"
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">{unreadNotifications} new</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-semibold">System Update</span> available. Please refresh.</p>
                    <p className="text-xs text-slate-400 mt-1">2 mins ago</p>
                  </div>
                  <div className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-semibold">Priya Singh</span> signed up.</p>
                    <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <p className="text-sm text-slate-800 dark:text-slate-200">Monthly revenue report generated.</p>
                    <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300">View all notifications</button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200 dark:border-slate-700 ml-2">
            <button className="flex items-center gap-2 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shadow-sm transition-transform"
              >
                {userProfile.firstName?.[0]}{userProfile.lastName?.[0]}
              </motion.div>
              <div className="hidden md:flex flex-col items-start group-hover:opacity-80 transition-opacity">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{userProfile.firstName} {userProfile.lastName}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{userProfile.role}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
