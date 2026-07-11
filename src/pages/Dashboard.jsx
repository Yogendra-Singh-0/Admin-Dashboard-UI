import React from 'react';
import { Users, DollarSign, Activity, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '../components/StatsCard';
import { RevenueChart, ActivityChart } from '../components/Charts';
import ActivityTable from '../components/ActivityTable';
import QuickActions from '../components/QuickActions';

export default function Dashboard({ isDarkMode, searchQuery, userProfile }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back, {userProfile.firstName}. Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value="84,254" change="12.5%" icon={Users} trend="up" delay={0.1} isDarkMode={isDarkMode} />
        <StatsCard title="Revenue" value="$42,390" change="8.2%" icon={DollarSign} trend="up" delay={0.2} isDarkMode={isDarkMode} />
        <StatsCard title="Active Sessions" value="1,245" change="3.1%" icon={Activity} trend="down" delay={0.3} isDarkMode={isDarkMode} />
        <StatsCard title="Tasks Completed" value="89%" change="14.2%" icon={CheckCircle} trend="up" delay={0.4} isDarkMode={isDarkMode} />
      </div>

      {/* Charts Row */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <RevenueChart isDarkMode={isDarkMode} />
        <ActivityChart isDarkMode={isDarkMode} />
      </motion.div>

      {/* Bottom Row */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 min-w-0">
          <ActivityTable searchQuery={searchQuery} userProfile={userProfile} isDarkMode={isDarkMode} />
        </div>
        <div className="lg:col-span-1 min-w-0">
          <QuickActions isDarkMode={isDarkMode} />
        </div>
      </motion.div>
    </motion.div>
  );
}
