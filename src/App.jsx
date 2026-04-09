import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TaskTracker from './components/TaskTracker';
import StageCard from './components/StageCard';
import MenuPanel from './components/MenuPanel';
import SettingsModal from './components/SettingsModal';
import RoutineEditor from './components/RoutineEditor';
import DailyNotes from './components/DailyNotes';
import WhatsAppShare from './components/WhatsAppShare';
import Footer from './components/Footer';
import { DEFAULT_TEMPLATE } from './utils/defaults';
import { Coffee } from 'lucide-react';

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getDayOfWeek() {
  return new Date().getDay(); // 0 is Sunday, 1 is Mon, 6 is Sat
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRoutineEditorOpen, setIsRoutineEditorOpen] = useState(false);
  
  const isSunday = getDayOfWeek() === 0;

  // Settings State 
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('studyPlan_settings');
      return saved ? JSON.parse(saved) : { waNumber: '' };
    } catch {
      return { waNumber: '' };
    }
  });

  // History State
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('studyPlan_history');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load stages. If not today, copy from routine_template.
  const [stages, setStages] = useState(() => {
    try {
      const savedToday = localStorage.getItem('studyPlan_date');
      const savedData = localStorage.getItem('studyPlan_stages');
      const todayStr = getTodayString();
      
      if (savedToday === todayStr && savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.warn("Storage error", e);
    }
    
    // Otherwise, clone the routine template!
    try {
      const savedTemplate = localStorage.getItem('studyPlan_routine_template');
      return savedTemplate ? JSON.parse(savedTemplate) : DEFAULT_TEMPLATE;
    } catch {
      return DEFAULT_TEMPLATE;
    }
  });

  // Keep template state in memory to allow re-syncing manually if needed
  // For now, if they edit routine template, we can auto-apply it to today if they haven't completed anything.
  const handleRoutineSaved = (newTemplate) => {
    // Force update today's stages to the new template immediately
    setStages(newTemplate);
  };

  useEffect(() => {
    const isDark = localStorage.getItem('studyPlan_darkMode') === 'true';
    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedStreak = parseInt(localStorage.getItem('studyPlan_streak') || '0', 10);
    setStreak(savedStreak);
  }, []);

  const allTasks = stages.flatMap(s => s.tasks);
  const completedTasks = allTasks.filter(t => t.completed).length;
  // If it's Sunday, progress is effectively 100% implicitly or 0. Let's make it 100 to not break streak if they load on Sunday, 
  // but strictly we should probably freeze streak on Sunday. Let's just track it as is for Mon-Sat.
  const progressPercentage = (isSunday || allTasks.length === 0) ? 0 : (completedTasks / allTasks.length) * 100;

  useEffect(() => {
    const todayStr = getTodayString();
    
    // Only save stages if it's not Sunday (we don't track progress on Sunday)
    if (!isSunday) {
      localStorage.setItem('studyPlan_date', todayStr);
      localStorage.setItem('studyPlan_stages', JSON.stringify(stages));

      const currentTasksMap = {};
      allTasks.forEach(t => { currentTasksMap[t.id] = t.completed; });

      setHistory(prev => {
        const updatedHistory = {
          ...prev,
          [todayStr]: { score: progressPercentage, tasks: currentTasksMap }
        };
        localStorage.setItem('studyPlan_history', JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    }
  }, [stages, progressPercentage, isSunday]);

  useEffect(() => {
    if (isSunday) return;

    const todayStr = getTodayString();
    const lastActive = localStorage.getItem('studyPlan_lastActiveDate');
    
    if (progressPercentage === 100 && lastActive !== todayStr) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('studyPlan_streak', newStreak);
      localStorage.setItem('studyPlan_lastActiveDate', todayStr);
    }
  }, [progressPercentage, streak, isSunday]);

  const toggleDarkMode = () => {
    const val = !darkMode;
    setDarkMode(val);
    localStorage.setItem('studyPlan_darkMode', val);
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const saveSettings = (newSettings) => {
    // Keep 'openRoutineEditor' from being saved to localstorage by isolating it
    const { openRoutineEditor, ...pureSettings } = newSettings;
    setSettings(pureSettings);
    localStorage.setItem('studyPlan_settings', JSON.stringify(pureSettings));
  };

  const toggleTask = (stageId, taskId) => {
    setStages(prevStages => 
      prevStages.map(stage => {
        if (stage.id !== stageId) return stage;
        return {
          ...stage,
          tasks: stage.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      })
    );
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <Header 
        toggleMenu={() => setIsMenuOpen(true)} 
        openSettings={() => setIsSettingsOpen(true)}
      />
      
      <MenuPanel 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        history={history}
        currentStages={stages}
        darkMode={darkMode}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={{ ...settings, openRoutineEditor: () => setIsRoutineEditorOpen(true) }}
        saveSettings={saveSettings}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <RoutineEditor 
        isOpen={isRoutineEditorOpen}
        onClose={() => setIsRoutineEditorOpen(false)}
        onSave={handleRoutineSaved}
      />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6">
        <HeroSection progress={isSunday ? 100 : progressPercentage} isSunday={isSunday} />
        <TaskTracker streak={streak} />
        
        {isSunday ? (
          <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/40 text-blue-500 rounded-full flex items-center justify-center mb-2">
              <Coffee size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Sunday Rest Day</h2>
            <p className="text-slate-500 max-w-md">Take a break! Recharging is just as important as studying. See you on Monday for a fresh start.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stages.map(stage => (
              <StageCard 
                key={stage.id} 
                stage={stage} 
                toggleTask={toggleTask} 
              />
            ))}
          </div>
        )}

        {!isSunday && (
          <WhatsAppShare 
            progress={progressPercentage} 
            streak={streak} 
            waNumber={settings.waNumber} 
            todayStr={getTodayString()} 
          />
        )}
        
        <DailyNotes todayStr={getTodayString()} />
      </main>

      <Footer />
    </div>
  );
}
