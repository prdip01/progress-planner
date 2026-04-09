import React from 'react';
import { Send } from 'lucide-react';

export default function WhatsAppShare({ progress, streak, waNumber, todayStr }) {
  if (!waNumber) return null;

  const handleShare = () => {
    let message = `✅ *Daily Study Output*\n\n`;
    message += `📊 Completion: *${Math.round(progress)}%*\n`;
    message += `🔥 Streak: *${streak} Days*\n\n`;
    
    // Grab notes from localStorage directly
    const todayNote = localStorage.getItem(`studyPlan_note_${todayStr}`);
    if (todayNote && todayNote.trim() !== '') {
      message += `📝 *Notes/Key Takeaways:*\n${todayNote.trim()}\n\n`;
    }
    
    message += `_Consistency creates success._`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = waNumber.replace(/[^0-9+]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="mt-6 flex justify-center">
      <button 
        onClick={handleShare}
        className="bg-[#25D366] hover:bg-[#1ebd5a] text-white flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all shadow-md shadow-[#25D366]/20 hover:shadow-lg hover:-translate-y-0.5"
      >
        <Send size={18} />
        Share Progress to WhatsApp
      </button>
    </div>
  );
}
