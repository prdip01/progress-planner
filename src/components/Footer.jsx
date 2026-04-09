import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 relative">
      <p className="text-lg font-medium italic mb-2 tracking-wide text-slate-700 dark:text-slate-300">
        "Consistency creates success"
      </p>
      <p className="text-sm">
        Stay focused. Keep going.
      </p>
      <div className="absolute right-4 bottom-4 md:right-8 text-xs font-semibold text-slate-400 dark:text-slate-500 opacity-60">
        Created by Pradeep Kumar
      </div>
    </footer>
  );
}
