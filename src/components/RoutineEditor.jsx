import React, { useState } from 'react';
import { X, Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { DEFAULT_TEMPLATE, JEE_MAINS_TEMPLATE, STAGE_COLORS } from '../utils/defaults';

export default function RoutineEditor({ isOpen, onClose, onSave }) {
  const [template, setTemplate] = useState(() => {
    try {
      const saved = localStorage.getItem('studyPlan_routine_template');
      return saved ? JSON.parse(saved) : DEFAULT_TEMPLATE;
    } catch {
      return DEFAULT_TEMPLATE;
    }
  });

  if (!isOpen) return null;

  const handleStageTitleChange = (stageId, newTitle) => {
    setTemplate(prev => prev.map(s => s.id === stageId ? { ...s, title: newTitle } : s));
  };

  const handleTaskTitleChange = (stageId, taskId, newTitle) => {
    setTemplate(prev => prev.map(s => {
      if (s.id !== stageId) return s;
      return {
        ...s,
        tasks: s.tasks.map(t => t.id === taskId ? { ...t, title: newTitle } : t)
      };
    }));
  };

  const handleAddTask = (stageId) => {
    setTemplate(prev => prev.map(s => {
      if (s.id !== stageId) return s;
      const newTaskId = `task_${Date.now()}`;
      return {
        ...s,
        tasks: [...s.tasks, { id: newTaskId, title: 'New Task', completed: false }]
      };
    }));
  };

  const handleDeleteTask = (stageId, taskId) => {
    setTemplate(prev => prev.map(s => {
      if (s.id !== stageId) return s;
      return {
        ...s,
        tasks: s.tasks.filter(t => t.id !== taskId)
      };
    }));
  };

  const handleAddStage = () => {
    setTemplate(prev => {
      // Rotate colors automatically for new stages
      const colorScore = prev.length % STAGE_COLORS.length;
      const assignedColor = STAGE_COLORS[colorScore];
      
      const newStage = {
        id: Date.now(),
        title: `Stage ${prev.length + 1}: New Subject`,
        color: assignedColor,
        tasks: []
      };
      return [...prev, newStage];
    });
  };

  const handleDeleteStage = (stageId) => {
    setTemplate(prev => prev.filter(s => s.id !== stageId));
  };

  const handleSave = () => {
    localStorage.setItem('studyPlan_routine_template', JSON.stringify(template));
    // Provide callback to parent to refresh the live dashboard if needed
    if (onSave) onSave(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Routine Template Editor</h2>
            <p className="text-xs text-slate-500">Edit the structure of your Mon-Sat daily routines.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Presets */}
        <div className="px-5 pt-4 pb-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Pre-built Templates</div>
          <div className="flex gap-2 relative">
            <button 
              onClick={() => setTemplate(JSON.parse(JSON.stringify(DEFAULT_TEMPLATE)))}
              className="px-3 py-1.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
            >
              Standard Setup
            </button>
             <button 
              onClick={() => setTemplate(JSON.parse(JSON.stringify(JEE_MAINS_TEMPLATE)))}
              className="px-3 py-1.5 text-sm font-medium bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg transition-colors"
            >
              JEE Mains Plan
            </button>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {template.map((stage, idx) => (
            <div key={stage.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              
              <div className={`px-4 py-3 flex flex-col gap-2 border-b border-slate-200 dark:border-slate-700/50 ${stage.color}`}>
                <div className="flex items-center justify-between">
                  <input 
                    type="text" 
                    value={stage.title} 
                    onChange={(e) => handleStageTitleChange(stage.id, e.target.value)}
                    placeholder="Stage Title"
                    className="font-semibold text-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 rounded px-2 w-full max-w-[80%]"
                  />
                  <button 
                    onClick={() => handleDeleteStage(stage.id)}
                    className="p-1.5 text-black/40 hover:text-red-500 dark:text-white/40 dark:hover:text-red-400 rounded-md transition-colors"
                    title="Delete Stage"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <input 
                    type="text" 
                    value={stage.time || ''} 
                    onChange={(e) => setTemplate(prev => prev.map(s => s.id === stage.id ? { ...s, time: e.target.value } : s))}
                    placeholder="Time Frame (e.g. 08:00 AM - 10:00 AM)"
                    className="text-sm bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 rounded px-2 w-full opacity-80"
                  />
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 space-y-2">
                {stage.tasks.map((task, tIdx) => (
                  <div key={task.id} className="flex items-center gap-2 group">
                    <GripVertical size={16} className="text-slate-300 dark:text-slate-600 cursor-grab opacity-30" />
                    <input 
                      type="text"
                      value={task.title}
                      onChange={(e) => handleTaskTitleChange(stage.id, task.id, e.target.value)}
                      className="flex-1 p-2 text-sm bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300 transition-colors"
                    />
                    <button 
                      onClick={() => handleDeleteTask(stage.id, task.id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 dark:text-red-400/70 dark:hover:bg-red-900/30 rounded-lg transition-colors shadow-sm bg-red-50/50 dark:bg-red-900/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={() => handleAddTask(stage.id)}
                  className="mt-2 ml-6 flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-2 py-1 rounded"
                >
                  <Plus size={14} /> Add new subject/task
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={handleAddStage}
            className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <Plus size={18} /> Add New Stage
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30"
          >
            <Save size={18} /> Save Global Template
          </button>
        </div>
      </div>
    </div>
  );
}
