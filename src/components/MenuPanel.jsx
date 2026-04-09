import React from 'react';
import { X, CalendarDays, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STANDARD_HABITS = [
  { id: 'e1', label: '1. Grammar' },
  { id: 'e2', label: '2. Vocabulary' },
  { id: 'e3', label: '3. News Reading' },
  { id: 'm1', label: '4. Math Lecture' },
  { id: 'm2', label: '5. Math Practice' },
  { id: 'r1', label: '6. Reasoning Lec' },
  { id: 'r2', label: '7. Reasoning DPP' },
  { id: 'r3', label: '8. Reasoning Notes' },
  { id: 'g1', label: '9. Current Affairs' },
  { id: 'g2', label: '10. Static GK' },
  { id: 'g3', label: '11. Geography' },
  { id: 'g4', label: '12. Polity' },
];

export default function MenuPanel({ isOpen, onClose, history, currentStages = [] }) {
  const date = new Date();
  const currentMonthName = date.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Dynamically extract all tasks from current stages context to act as tracker rows!
  const dynamicHabits = currentStages.flatMap(stage => stage.tasks || []);

  // Generate chart data based on history object
  const chartData = daysArray.map(day => {
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
    const dayData = history[key];
    return {
      day: day.toString(),
      score: dayData ? Math.round(dayData.score) : null
    };
  });

  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" 
          onClick={onClose}
        />
      )}
      
      {/* Sliding Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-2xl bg-white dark:bg-slate-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              JEE Mains Tracker
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-8">
          
          {/* Tracker Matrix */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Subjects & DPPS</h3>
              <span className="text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full">
                {currentMonthName}
              </span>
            </div>
            
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-xs text-left whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2 font-medium sticky left-0 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-10">
                      Standard Daily Habit
                    </th>
                    {daysArray.map(day => (
                      <th key={day} className="px-2 py-2 font-medium text-center border-r border-slate-200 dark:border-slate-700 min-w-[28px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {dynamicHabits.map((habit, idx) => (
                    <tr key={habit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-3 py-2 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] dark:shadow-none">
                        {idx + 1}. {habit.title}
                      </td>
                      {daysArray.map(day => {
                        const key = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
                        const isDone = history[key]?.tasks?.[habit.id] === true;
                        
                        return (
                          <td key={day} className="px-1 py-1 text-center border-r border-slate-200 dark:border-slate-700 last:border-r-0">
                            {isDone ? (
                              <div className="w-4 h-4 mx-auto bg-blue-500 rounded-sm" />
                            ) : (
                              <div className="w-4 h-4 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Score Graph */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-emerald-500" size={18} />
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Daily Score Graph (%)</h3>
            </div>
            
            <div className="h-64 w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
