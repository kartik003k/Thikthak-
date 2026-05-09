import { Settings, Grid, Bookmark, Users, Heart, MapPin, ExternalLink, Link as LinkIcon, Lock, ChevronRight, BarChart3, Plus, Play, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_VIDEOS } from '../constants';
import { useState } from 'react';

const HIGHLIGHTS = [
  { id: 1, title: 'Mumbai', cover: 'https://api.dicebear.com/7.x/initials/svg?seed=M' },
  { id: 2, title: 'Swag', cover: 'https://api.dicebear.com/7.x/initials/svg?seed=S' },
  { id: 3, title: 'Food', cover: 'https://api.dicebear.com/7.x/initials/svg?seed=F' },
  { id: 4, title: 'New', isNew: true },
];

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState('swags');
  
  const user = {
    username: 'kartik_dancer',
    name: 'Kartik Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik',
    bio: 'Delhi boy with moves 🕺 | Content Creator @ThikThak | Chai is life ☕️',
    stats: {
      posts: 42,
      followers: '1.2M',
      following: '482',
      likes: '15.4M'
    }
  };

  return (
    <div className="h-screen w-full bg-charcoal pt-16 pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-white/40" />
            <h2 className="text-xl font-display uppercase italic text-white tracking-widest">{user.username}</h2>
          </div>
          <div className="flex gap-4">
            <Plus className="w-6 h-6 text-white/60" />
            <Settings className="w-6 h-6 text-white/60" />
          </div>
        </div>

        <div className="flex items-center gap-8 mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-saffron via-white to-indian-green rounded-full opacity-70 group-hover:opacity-100 transition-opacity blur-sm" />
            <div className="relative w-24 h-24 rounded-full border-4 border-charcoal overflow-hidden bg-charcoal shadow-2xl">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-2 bg-saffron text-charcoal rounded-full border-2 border-charcoal shadow-xl">
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
          
          <div className="flex-1 flex justify-between gap-2 text-center">
            <div>
              <p className="text-base font-display text-white uppercase italic">{user.stats.posts}</p>
              <p className="text-[10px] text-white/40 font-accent uppercase tracking-widest leading-tight">Posts</p>
            </div>
            <div>
              <p className="text-base font-display text-white uppercase italic">{user.stats.followers}</p>
              <p className="text-[10px] text-white/40 font-accent uppercase tracking-widest leading-tight">Followers</p>
            </div>
            <div>
              <p className="text-base font-display text-white uppercase italic">{user.stats.following}</p>
              <p className="text-[10px] text-white/40 font-accent uppercase tracking-widest leading-tight">Following</p>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-1">
          <h3 className="font-display uppercase text-white/90 text-sm italic">{user.name}</h3>
          <p className="text-xs text-white/60 leading-relaxed font-accent">{user.bio}</p>
          <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-1 text-white/40">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">New Delhi, GLBL</span>
            </div>
            <div className="flex items-center gap-1 text-indian-green">
              <LinkIcon className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider underline">linktr.ee/kartik</span>
            </div>
          </div>
        </div>

        {/* Professional Dashboard */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 hover:bg-white/10 transition-colors cursor-pointer group">
           <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                 <BarChart3 className="w-4 h-4 text-indian-green" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Creator Dashboard</span>
              </div>
              <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-white transition-transform" />
           </div>
           <p className="text-[9px] text-white/30 uppercase tracking-wider font-accent">Reach: 1.2M swags in 30 days.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button className="py-2.5 bg-white text-charcoal font-black uppercase text-[10px] italic tracking-tighter border-b-2 border-r-2 border-black active:translate-y-px transition-all">
            Edit Swag
          </button>
          <button className="py-2.5 bg-white/10 text-white font-black uppercase text-[10px] italic tracking-tighter border-b-2 border-r-2 border-white/10 active:translate-y-px transition-all hover:bg-white/20">
            Share Swag
          </button>
        </div>

        {/* Highlights */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 border-b border-white/5">
          {HIGHLIGHTS.map((h) => (
             <div key={h.id} className="flex flex-col items-center gap-2 shrink-0 group">
                <div className={`w-16 h-16 rounded-full border-2 border-white/5 p-1 flex items-center justify-center ${h.isNew ? 'bg-white/5 border-dashed border-white/20' : ''}`}>
                   {h.isNew ? (
                      <Plus className="w-6 h-6 text-white/20" />
                   ) : (
                      <div className="w-full h-full rounded-full overflow-hidden bg-charcoal ring-2 ring-transparent group-hover:ring-saffron/50 transition-all">
                        <img src={h.cover} className="w-full h-full object-cover" />
                      </div>
                   )}
                </div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{h.isNew ? 'New' : h.title}</span>
             </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 sticky top-0 bg-charcoal/95 backdrop-blur-md z-30">
        {[
          { id: 'swags', icon: Grid },
          { id: 'reels', icon: Play },
          { id: 'saved', icon: Bookmark },
          { id: 'tagged', icon: Users }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 flex flex-col items-center gap-1 transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`} />
            {activeTab === tab.id && <motion.div layoutId="profileTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-saffron" />}
          </button>
        ))}
      </div>

      {/* Feed Grid */}
      <div className="grid grid-cols-3 gap-0.5 pt-0.5">
        {MOCK_VIDEOS.map((video, i) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative aspect-square bg-white/5 group cursor-pointer overflow-hidden"
          >
            <img 
              src={video.thumbnail} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
               <div className="flex items-center gap-1">
                 <Heart className="w-4 h-4 text-white fill-current" />
                 <span className="text-[10px] font-black text-white">{(video.likes / 1000).toFixed(0)}k</span>
               </div>
               <div className="flex items-center gap-1">
                 <Star className="w-4 h-4 text-saffron fill-current" />
                 <span className="text-[10px] font-black text-white">4.9</span>
               </div>
            </div>
            {i === 0 && <div className="absolute top-2 right-2 text-white"><Bookmark className="w-3 h-3 fill-current" /></div>}
          </motion.div>
        ))}
        {/* Placeholder entries */}
        {[...Array(6)].map((_, i) => (
          <div key={i+10} className="aspect-square bg-white/5 border border-white/5 flex items-center justify-center opacity-10">
             <Grid className="w-4 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
