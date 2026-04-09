import React from 'react';
import { Target } from 'lucide-react';

export default function HeroSection({ progress, isSunday }) {
  return (
    <div className="mb-8 pt-6">
      <div className="flex flex-col items-center text-center space-y-3 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-2">
          <Target size={16} /> Routine Plan
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Master Your Day
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {isSunday ? "Today is a rest day. Enjoy and recharge!" : "Discipline beats motivation"}
        </p>
      </div>

      {!isSunday && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Daily Progress</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Keep it up!</p>
            </div>
            <div className="text-2xl font-bold flex items-baseline gap-1 text-slate-800 dark:text-white">
              {Math.round(progress)}<span className="text-sm text-slate-500">%</span>
            </div>
          </div>
          
          <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
