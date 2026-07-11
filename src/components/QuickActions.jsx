import React, { useState } from 'react';
import { UserPlus, BarChart3, ArrowRight, FileText, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import BorderGlow from './BorderGlow';

const actions = [
  { id: 'add-user', icon: UserPlus, label: 'Add User', desc: 'Create a new account', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { id: 'view-analytics', icon: BarChart3, label: 'View Analytics', desc: 'Detailed statistics', path: '/analytics', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  { id: 'generate-report', icon: FileText, label: 'Generate Report', desc: 'Create custom reports', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
];

export default function QuickActions({ isDarkMode }) {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleActionClick = (action) => {
    if (action.path) {
      navigate(action.path);
    } else {
      setActiveModal(action.id);
      setIsSuccess(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitting(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call or form submission
    setTimeout(() => {
      if (activeModal === 'add-user') {
        const formData = new FormData(e.target);
        const name = formData.get('fullName') || 'New User';
        const email = formData.get('email') || 'new@example.com';
        
        const saved = localStorage.getItem('activities');
        const activities = saved ? JSON.parse(saved) : [
          { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', status: 'Active', date: '2023-10-24' },
          { id: 2, name: 'Priya Singh', email: 'priya@example.com', status: 'Pending', date: '2023-10-23' },
          { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', status: 'Completed', date: '2023-10-21' },
          { id: 4, name: 'Sneha Desai', email: 'sneha@example.com', status: 'Active', date: '2023-10-20' },
          { id: 5, name: 'Vikram Reddy', email: 'vikram@example.com', status: 'Failed', date: '2023-10-18' },
        ];
        
        const newId = Math.max(...activities.map(a => a.id), 0) + 1;
        const newUser = {
          id: newId,
          name: name,
          email: email,
          status: 'Active',
          date: new Date().toISOString().split('T')[0]
        };
        
        activities.unshift(newUser);
        localStorage.setItem('activities', JSON.stringify(activities));
        window.dispatchEvent(new Event('activitiesUpdated'));
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 1500);
    }, 800);
  };

  return (
    <>
      <BorderGlow
        backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
        className="w-full h-full rounded-2xl"
        borderRadius={16}
      >
        <div className="bg-transparent rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Quick Actions</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Common tasks and shortcuts</p>
          </div>
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            {actions.map((action, index) => (
              <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.1} glareColor="white" glarePosition="all">
                <button 
                  onClick={() => handleActionClick(action)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white transition-colors">{action.label}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{action.desc}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </Tilt>
            ))}
          </div>
        </div>
      </BorderGlow>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeModal === 'add-user' ? 'Add New User' : 'Generate Report'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {activeModal === 'add-user' ? 'User Added Successfully!' : 'Report Generated!'}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {activeModal === 'add-user' 
                      ? 'The new user account has been created and invitations sent.' 
                      : 'Your report is ready and will be downloaded shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeModal === 'add-user' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input name="fullName" type="text" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input name="email" type="email" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                          <option>User</option>
                          <option>Admin</option>
                          <option>Editor</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Report Type</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                          <option>User Activity</option>
                          <option>Financial Summary</option>
                          <option>System Performance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date Range</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                          <option>Last 7 Days</option>
                          <option>Last 30 Days</option>
                          <option>This Month</option>
                          <option>This Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Format</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                            <input type="radio" name="format" defaultChecked className="text-indigo-500 w-4 h-4" /> PDF
                          </label>
                          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                            <input type="radio" name="format" className="text-indigo-500 w-4 h-4" /> CSV
                          </label>
                          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                            <input type="radio" name="format" className="text-indigo-500 w-4 h-4" /> Excel
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      {activeModal === 'add-user' ? 'Add User' : 'Generate'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
