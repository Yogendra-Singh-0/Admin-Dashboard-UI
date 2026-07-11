import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

export default function StatsCard({ title, value, change, icon: Icon, trend, delay = 0, isDarkMode }) {
  const isPositive = trend === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Tilt 
        tiltMaxAngleX={5} 
        tiltMaxAngleY={5} 
        scale={1.02} 
        transitionSpeed={2500} 
        glareEnable={true} 
        glareMaxOpacity={0.05} 
        glareColor="white" 
        glarePosition="all"
        className="h-full"
      >
        <BorderGlow 
          backgroundColor={isDarkMode ? '#0f172a' : '#ffffff'}
          className="h-full w-full"
          borderRadius={16}
        >
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 transition-colors">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${isPositive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                <Icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} transition-colors`}>
                {isPositive ? '+' : '-'}{change}
              </span>
              <span className="text-slate-500 dark:text-slate-400 ml-2 transition-colors">vs last month</span>
            </div>
          </div>
        </BorderGlow>
      </Tilt>
    </motion.div>
  );
}
