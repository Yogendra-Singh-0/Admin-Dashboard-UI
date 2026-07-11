import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 19000 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 28000 },
  { name: 'May', value: 22000 },
  { name: 'Jun', value: 34000 },
  { name: 'Jul', value: 30000 },
];

const activityData = [
  { name: 'Mon', users: 400, sessions: 240 },
  { name: 'Tue', users: 300, sessions: 139 },
  { name: 'Wed', users: 550, sessions: 380 },
  { name: 'Thu', users: 470, sessions: 290 },
  { name: 'Fri', users: 600, sessions: 480 },
  { name: 'Sat', users: 200, sessions: 120 },
  { name: 'Sun', users: 150, sessions: 90 },
];

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-xl shadow-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <p className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {entry.name}: <span className="font-medium text-slate-900 dark:text-white">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

import BorderGlow from './BorderGlow';

export function RevenueChart({ isDarkMode }) {
  const primaryColor = '#4f46e5';
  
  return (
    <BorderGlow
      backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
      className="w-full h-full rounded-2xl"
      borderRadius={16}
    >
      <div className="bg-transparent rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Overview</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monthly revenue for the current year</p>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                name="Revenue"
                stroke={primaryColor} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BorderGlow>
  );
}

export function ActivityChart({ isDarkMode }) {
  return (
    <BorderGlow
      backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
      className="w-full h-full rounded-2xl"
      borderRadius={16}
    >
      <div className="bg-transparent rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Weekly Activity</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">User sessions and new signups</p>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
              />
              <Tooltip cursor={{ fill: isDarkMode ? '#1e293b' : '#f8fafc' }} content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Bar dataKey="users" name="New Users" fill="#4f46e5" radius={[4, 4, 0, 0]} animationDuration={1500} />
              <Bar dataKey="sessions" name="Sessions" fill="#38bdf8" radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BorderGlow>
  );
}
