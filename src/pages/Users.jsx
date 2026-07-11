import React from 'react';
import { motion } from 'framer-motion';
import ActivityTable from '../components/ActivityTable';

export default function Users({ isDarkMode, searchQuery, userProfile }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage users, roles, and permissions.</p>
        </div>
      </div>
      <ActivityTable searchQuery={searchQuery} userProfile={userProfile} isDarkMode={isDarkMode} />
    </motion.div>
  );
}
