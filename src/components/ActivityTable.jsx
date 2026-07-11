import React, { useState, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BorderGlow from './BorderGlow';

const initialActivities = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', status: 'Active', date: '2023-10-24' },
  { id: 2, name: 'Priya Singh', email: 'priya@example.com', status: 'Pending', date: '2023-10-23' },
  { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', status: 'Completed', date: '2023-10-21' },
  { id: 4, name: 'Sneha Desai', email: 'sneha@example.com', status: 'Active', date: '2023-10-20' },
  { id: 5, name: 'Vikram Reddy', email: 'vikram@example.com', status: 'Failed', date: '2023-10-18' },
];

export default function ActivityTable({ searchQuery = "", userProfile, isDarkMode }) {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('activities');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialActivities;
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', status: '' });

  // Sync first user with global userProfile if provided
  useEffect(() => {
    if (userProfile) {
      setActivities(prev => prev.map(activity => 
        activity.id === 1 
          ? { ...activity, name: `${userProfile.firstName} ${userProfile.lastName}`, email: userProfile.email } 
          : activity
      ));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    const handleActivitiesUpdate = () => {
      const saved = localStorage.getItem('activities');
      if (saved) {
        setActivities(JSON.parse(saved));
      }
    };
    window.addEventListener('activitiesUpdated', handleActivitiesUpdate);
    return () => window.removeEventListener('activitiesUpdated', handleActivitiesUpdate);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
      case 'Pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      case 'Failed':
        return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const handleEditClick = (activity) => {
    setEditingId(activity.id);
    setEditForm({ name: activity.name, email: activity.email, status: activity.status });
  };

  const handleSaveEdit = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, ...editForm } : activity
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const filteredActivities = activities.filter(activity => 
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    activity.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BorderGlow
      backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
      className="w-full h-full rounded-2xl"
      borderRadius={16}
    >
      <div className="bg-transparent rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Recent Activity</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Latest transactions and user updates</p>
          </div>
          <button 
            onClick={() => setActivities(initialActivities)}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            Reset Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 transition-colors">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right transition-colors">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
              <AnimatePresence>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, index) => (
                  <motion.tr 
                    key={activity.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    
                    {/* User Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                          {getInitials(activity.name)}
                        </div>
                        <div>
                          {editingId === activity.id ? (
                            <div className="flex flex-col gap-1">
                              <input 
                                type="text" 
                                value={editForm.name} 
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="px-2 py-1 text-sm border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:border-indigo-500"
                              />
                              <input 
                                type="text" 
                                value={editForm.email} 
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                className="px-2 py-1 text-xs border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="font-medium text-slate-900 dark:text-white transition-colors">{activity.name}</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{activity.email}</div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === activity.id ? (
                        <select 
                          value={editForm.status} 
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="px-2 py-1 text-sm border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:border-indigo-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Failed">Failed</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      )}
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 transition-colors">
                      {activity.date}
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === activity.id ? (
                          <>
                            <button 
                              onClick={() => handleSaveEdit(activity.id)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEditClick(activity)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(activity.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button 
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg transition-colors"
                              title="More options"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </motion.tr>
                ))
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors">
                    No users found matching "{searchQuery}"
                  </td>
                </motion.tr>
              )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </BorderGlow>
  );
}
