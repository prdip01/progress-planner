import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function StageCard({ stage, toggleTask }) {
  const allCompleted = stage.tasks.every(t => t.completed);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-slate-100 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${stage.color}`}>
        <div>
          <h3 className="font-semibold text-lg">{stage.title}</h3>
          {stage.time && (
            <div className="flex items-center gap-1.5 mt-1 text-sm opacity-80 font-medium">
              <Clock size={14} />
              <span>{stage.time}</span>
            </div>
          )}
        </div>
        
        {allCompleted && (
          <span className="self-start sm:self-auto text-sm font-medium bg-white/40 dark:bg-black/30 px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={14} /> Done
          </span>
        )}
      </div>
      
      <div className="px-3 py-2">
        <ul className="space-y-1">
          {stage.tasks.map((task) => (
            <li key={task.id}>
              <button
                onClick={() => toggleTask(stage.id, task.id)}
                className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group"
              >
                <div className="mt-0.5 text-slate-400 group-hover:text-blue-500 dark:text-slate-500 transition-colors shrink-0">
                  {task.completed ? (
                    <CheckCircle2 size={20} className="text-blue-500 dark:text-blue-400" />
                  ) : (
                    <Circle size={20} />
                  )}
                </div>
                <span
                  className={`flex-1 leading-tight text-slate-700 dark:text-slate-200 transition-all duration-300 ${
                    task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}
                >
                  {task.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
