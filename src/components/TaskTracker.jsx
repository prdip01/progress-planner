import React from 'react';
import { Calendar, Flame } from 'lucide-react';

export default function TaskTracker({ streak }) {
  const today = new Date();
  
  // Generate an array of 7 days representing this week (Sunday to Saturday)
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday ...
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - currentDay + i);
    return d;
  });

  return (
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Streak Card */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-900/20 p-5 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-500">
          <Flame size={24} className="fill-orange-500 dark:fill-orange-600" />
        </div>
        <div>
          <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">Current Streak</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {streak} {streak === 1 ? 'Day' : 'Days'}
          </p>
        </div>
      </div>

      {/* Weekly Outlook */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={18} className="text-slate-400" />
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">This Week</h3>
        </div>
        <div className="flex justify-between items-center gap-1">
          {weekDays.map((date, i) => {
            const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
            
            return (
              <div 
                key={i} 
                className={`flex flex-col items-center justify-center w-8 h-10 rounded-lg text-xs font-medium transition-colors ${
                  isToday 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span className="opacity-70">{dayName}</span>
                <span>{date.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
