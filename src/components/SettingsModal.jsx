import React, { useState } from 'react';
import { X, Save, Moon, Sun, Clock, Phone } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, settings, saveSettings, darkMode, toggleDarkMode }) {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  const handleChange = (field, value, isTime = false) => {
    if (isTime) {
      setLocalSettings(prev => ({
        ...prev,
        times: { ...prev.times, [field]: value }
      }));
    } else {
      setLocalSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    saveSettings(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">More Settings</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="text-blue-500" size={20} /> : <Sun className="text-amber-500" size={20} />}
              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Theme Preference</h3>
                <p className="text-xs text-slate-500">Toggle dark or light mode</p>
              </div>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* WhatsApp Settings */}
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Phone size={18} className="text-green-500" /> WhatsApp Integration
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block">Your Phone Number</label>
              <input 
                type="text" 
                placeholder="e.g. +1234567890" 
                value={localSettings.waNumber || ''}
                onChange={(e) => handleChange('waNumber', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-500">Include country code. Used only for generating the share link.</p>
            </div>
          </div>

          {/* Routine Customization */}
          <div>
             <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Clock size={18} className="text-blue-500" /> Routine Template
            </h3>
            <p className="text-xs text-slate-500 mb-4">Customize your exact Mon-Sat subjects, stages, and time windows.</p>
            <button
               onClick={() => { onClose(); if (settings.openRoutineEditor) settings.openRoutineEditor(); }}
               className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-xl transition-colors"
            >
              Configure Master Routine
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30"
          >
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
