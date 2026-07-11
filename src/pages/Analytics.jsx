import React from 'react';
import { motion } from 'framer-motion';
import { RevenueChart, ActivityChart } from '../components/Charts';

export default function Analytics({ isDarkMode }) {
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Detailed performance metrics.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart isDarkMode={isDarkMode} />
        <ActivityChart isDarkMode={isDarkMode} />
      </div>
    </motion.div>
  );
}
