import React from 'react';
import { BookOpen, Calendar, Settings } from 'lucide-react';

export default function Header({ toggleMenu, openSettings }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMenu}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            aria-label="Open Tracker"
          >
            <Calendar size={20} />
            <span className="hidden sm:inline font-medium text-sm">Tracker</span>
          </button>
          
          <div className="bg-blue-600 p-2 rounded-lg text-white ml-2">
            <BookOpen size={20} />
          </div>
          <h1 className="font-bold text-lg text-slate-800 dark:text-slate-100">
            Daily Dashboard
          </h1>
        </div>
        
        <button
          onClick={openSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-sm transition-colors"
        >
          <span>More</span>
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
