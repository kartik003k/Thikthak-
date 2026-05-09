import { Mail, MessageSquare, Heart, UserPlus, Search, Send, Plus, AtSign, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const MESSAGES = [
  { id: 1, user: 'Amit_Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', lastMsg: 'Bhai, check this viral video!', time: '2m', unread: true, online: true },
  { id: 2, user: 'Sanjana_Dance', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana', lastMsg: 'Loved your last dance move! 🔥', time: '1h', unread: false, online: true },
  { id: 3, user: 'Raj_Vibes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raj', lastMsg: 'Collab soon?', time: '3h', unread: false, online: false },
  { id: 4, user: 'Deepika_Cooks', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepika', lastMsg: 'Sent you a heart', time: '1d', unread: false, online: false },
];

const NOTES = [
  { id: 'me', user: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik', note: 'Feeling viral ✨' },
  { id: '1', user: 'Sanjana', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana', note: 'New edit out!' },
  { id: '2', user: 'Amit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', note: 'Listening to Phonk' },
  { id: '3', user: 'Priya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', note: 'Busy 📽️' },
];

export default function InboxView() {
  const [activeTab, setActiveTab] = useState('Primary');

  return (
    <div className="h-screen w-full bg-charcoal pt-16 pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center bg-charcoal/95 backdrop-blur-md sticky top-0 z-20">
        <h2 className="text-2xl font-display text-white uppercase italic tracking-tighter">Connect</h2>
        <div className="flex gap-4">
           <button className="text-white/60 hover:text-white transition-colors"><AtSign className="w-5 h-5" /></button>
           <button className="text-white/60 hover:text-white transition-colors"><Send className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-white/20" />
          <input 
            type="text" 
            placeholder="Search connections..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-saffron/30 transition-colors"
          />
        </div>
      </div>

      {/* Notes Bar */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 mb-8">
        {NOTES.map((note) => (
          <div key={note.id} className="flex flex-col items-center gap-2 shrink-0 group">
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-charcoal px-2 py-1 rounded-bl-none rounded-2xl text-[8px] font-black whitespace-nowrap shadow-xl border border-black/10 group-hover:scale-110 transition-transform">
                {note.note}
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-white/5 p-1">
                <img src={note.avatar} alt={note.user} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-80" />
              </div>
              {note.id === 'me' && (
                <div className="absolute bottom-1 right-1 bg-charcoal rounded-full p-1 border border-white/10 shadow-lg">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{note.user}</span>
          </div>
        ))}
      </div>

      {/* Notifications Grid */}
      <div className="px-6 mb-10 grid grid-cols-3 gap-3">
        {[
          { icon: Heart, label: 'Likes', count: 12, color: 'text-saffron' },
          { icon: UserPlus, label: 'Followers', count: 5, color: 'text-indian-green' },
          { icon: MessageSquare, label: 'Mentions', count: 2, color: 'text-white' }
        ].map((notif, i) => (
          <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors relative overflow-hidden">
            <notif.icon className={`w-5 h-5 ${notif.color} group-hover:scale-110 transition-transform relative z-10`} />
            <span className="text-[9px] font-black text-white uppercase tracking-widest relative z-10">{notif.label}</span>
            <div className="absolute -bottom-2 -right-2 text-[40px] font-display text-white/5 italic select-none">
              {notif.count}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 px-6 mb-6 border-b border-white/5">
        {['Primary', 'General', 'Requests'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
          >
            {tab}
            {activeTab === tab && <motion.div layoutId="activeMsgTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron" />}
          </button>
        ))}
      </div>

      {/* Direct Messages */}
      <div className="px-6 space-y-1">
        {MESSAGES.map((msg, i) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between py-4 group cursor-pointer hover:bg-white/5 -mx-6 px-6 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-charcoal">
                  <img src={msg.avatar} alt={msg.user} className="w-full h-full object-cover" />
                </div>
                {msg.online && <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-indian-green border-2 border-charcoal rounded-full" />}
              </div>
              <div>
                 <h4 className={`text-sm font-bold tracking-tight ${msg.unread ? 'text-white' : 'text-white/60'}`}>@{msg.user}</h4>
                 <p className={`text-[11px] line-clamp-1 ${msg.unread ? 'text-white font-medium' : 'text-white/30'}`}>{msg.lastMsg}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
               <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{msg.time}</span>
               {msg.unread && <div className="w-2.5 h-2.5 bg-saffron rounded-full shadow-[0_0_10px_rgba(255,153,51,0.5)]" />}
               {!msg.unread && <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-white/30 transition-transform" />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
