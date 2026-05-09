import { MOCK_VIDEOS } from '../constants';
import { Play, Search, Filter, Camera } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = [
  'For You', 'Trending', 'Reels', 'Design', 'Music', 'Tech', 'Food', 'Travel', 'Art'
];

export default function ExploreView() {
  const sortedVideos = [...MOCK_VIDEOS].sort((a, b) => b.views - a.views);

  return (
    <div className="h-screen w-full bg-charcoal pt-16 pb-24 overflow-y-auto no-scrollbar">
      {/* Search Header */}
      <div className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <div className="flex-1 relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search swags, users, sounds..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-saffron/50 transition-colors"
          />
        </div>
        <button className="p-2 text-white/60 hover:text-white active:scale-95 transition-transform">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
        {CATEGORIES.map((cat, i) => (
          <button 
            key={i}
            className={`whitespace-nowrap px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${i === 0 ? 'bg-white text-charcoal' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-0.5 px-0.5">
        {/* Mixed Grid - Some large items */}
        {sortedVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group cursor-pointer aspect-[9/16] ${index === 1 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img 
              src={video.thumbnail} 
              alt={video.caption} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
            />
            {index === 1 && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                  <img src={video.author.avatar} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-display text-white uppercase italic drop-shadow-md">@{video.author.username}</span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <Play className="w-2.5 h-2.5 text-white fill-current" />
              <span className="text-[9px] font-black text-white drop-shadow-md">
                {(video.views / 1000000).toFixed(1)}M
              </span>
            </div>
            {index === 0 && (
              <div className="absolute top-2 right-2 bg-saffron text-charcoal text-[7px] font-black px-1.5 py-0.5 rounded-sm italic uppercase tracking-tighter">
                VIRAL
              </div>
            )}
          </motion.div>
        ))}
        {/* Filler Grid Items */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="relative aspect-[9/16] bg-white/5 flex items-center justify-center">
            <Play className="w-4 h-4 text-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
