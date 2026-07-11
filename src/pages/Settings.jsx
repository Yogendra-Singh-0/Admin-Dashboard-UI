import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import BorderGlow from '../components/BorderGlow';

export default function Settings({ isDarkMode, userProfile, setUserProfile }) {
  const [localProfile, setLocalProfile] = useState(userProfile);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
  });

  const handleProfileChange = (e) => {
    setLocalProfile({ ...localProfile, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(localProfile);
    alert('Settings saved successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">Manage your account settings and preferences.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Form */}
        <BorderGlow
          backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
          className="w-full rounded-2xl"
          borderRadius={16}
        >
          <div className="bg-transparent rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 transition-colors w-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 transition-colors">Profile Details</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={localProfile.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={localProfile.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={localProfile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                <input 
                  type="text" 
                  name="role"
                  value={localProfile.role}
                  disabled
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed transition-colors"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
                >
                  <Save size={18} />
                  Save Changes
                </motion.button>
              </div>
            </form>
          </div>
        </BorderGlow>

        {/* Preferences Toggles */}
        <BorderGlow
          backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
          className="w-full rounded-2xl"
          borderRadius={16}
        >
          <div className="bg-transparent rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 transition-colors w-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 transition-colors">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white transition-colors">Email Alerts</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Receive alerts about critical security events.</p>
                </div>
                <button 
                  onClick={() => toggleNotification('emailAlerts')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.emailAlerts ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.emailAlerts ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
              
              <hr className="border-slate-100 dark:border-slate-800 transition-colors" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white transition-colors">Push Notifications</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Get push notifications when someone mentions you.</p>
                </div>
                <button 
                  onClick={() => toggleNotification('pushNotifications')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.pushNotifications ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.pushNotifications ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <hr className="border-slate-100 dark:border-slate-800 transition-colors" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white transition-colors">Weekly Reports</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Receive a weekly email summarizing your activity.</p>
                </div>
                <button 
                  onClick={() => toggleNotification('weeklyReports')}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.weeklyReports ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.weeklyReports ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </motion.div>
  );
}
