import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  
  // Global Profile State
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      firstName: 'Aarav',
      lastName: 'Sharma',
      email: 'admin@adminpro.com',
      role: 'Administrator',
    };
  });
  
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);
  
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 flex flex-col min-h-screen transition-all overflow-x-hidden">
        <Header 
          setIsSidebarOpen={setIsSidebarOpen} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userProfile={userProfile}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard isDarkMode={isDarkMode} searchQuery={searchQuery} userProfile={userProfile} />} />
                <Route path="/users" element={<Users isDarkMode={isDarkMode} searchQuery={searchQuery} userProfile={userProfile} />} />
                <Route path="/analytics" element={<Analytics isDarkMode={isDarkMode} />} />
                <Route path="/settings" element={<Settings isDarkMode={isDarkMode} userProfile={userProfile} setUserProfile={setUserProfile} />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
