import React, { useState, useEffect } from 'react';
import { PenTool } from 'lucide-react';

export default function DailyNotes({ todayStr }) {
  const [note, setNote] = useState('');

  // Load note on mount or when todayStr changes
  useEffect(() => {
    try {
      const savedNote = localStorage.getItem(`studyPlan_note_${todayStr}`);
      setNote(savedNote || '');
    } catch {
      setNote('');
    }
  }, [todayStr]);

  const handleChange = (e) => {
    const val = e.target.value;
    setNote(val);
    localStorage.setItem(`studyPlan_note_${todayStr}`, val);
  };

  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/30 shadow-sm mt-8">
      <div className="flex items-center gap-2 mb-3">
        <PenTool size={18} className="text-amber-600 dark:text-amber-500" />
        <h3 className="font-semibold text-amber-900 dark:text-amber-400">Daily Notes</h3>
      </div>
      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Write down any quick thoughts, reminders, or blockers for today..."
        className="w-full h-32 p-3 bg-white/60 dark:bg-slate-900/50 border border-amber-200 dark:border-amber-800/50 rounded-xl text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-700/40 dark:placeholder-amber-200/40 resize-none"
      />
    </div>
  );
}
