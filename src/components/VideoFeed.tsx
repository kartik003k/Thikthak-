import React, { useState, useRef } from 'react';
import VideoItem from './VideoItem';
import { MOCK_VIDEOS } from '../constants';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const STORIES = [
  { id: 'me', name: 'Your Story', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik', isMe: true },
  { id: '1', name: 'Sanjana', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana', seen: false },
  { id: '2', name: 'Amit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit', seen: true },
  { id: '3', name: 'Priya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', seen: false },
  { id: '4', name: 'Rahul', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul', seen: true },
  { id: '5', name: 'Deepika', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepika', seen: false },
];

export default function VideoFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollY = containerRef.current.scrollTop;
      const height = containerRef.current.clientHeight;
      const index = Math.round(scrollY / height);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-black">
      {/* Stories Bar - Overlays on top of the first video */}
      <div className="absolute top-16 left-0 right-0 z-40 px-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 overflow-x-auto no-scrollbar py-2"
        >
          {STORIES.map((story) => (
            <div key={story.id} className="flex flex-col items-center gap-1 shrink-0">
              <div className={`relative p-[2px] rounded-full ${story.isMe ? 'bg-transparent' : story.seen ? 'bg-white/20' : 'bg-gradient-to-tr from-saffron via-white to-indian-green'}`}>
                <div className="w-14 h-14 rounded-full border-2 border-black overflow-hidden bg-charcoal">
                  <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
                </div>
                {story.isMe && (
                  <div className="absolute bottom-0 right-0 bg-saffron text-white rounded-full p-0.5 border-2 border-black">
                    <Plus className="w-3 h-3" />
                  </div>
                )}
              </div>
              <span className="text-[10px] font-medium text-white/80 max-w-[60px] truncate">{story.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {MOCK_VIDEOS.map((video, index) => (
          <VideoItem
            key={video.id}
            video={video}
            isActive={index === activeIndex}
          />
        ))}
        
        <div className="h-20 snap-start bg-charcoal flex items-center justify-center text-ash/30 uppercase text-[10px] tracking-widest font-display italic">
          You've reached the end
        </div>
      </div>
    </div>
  );
}
