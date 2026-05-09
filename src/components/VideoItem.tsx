import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Music2, Plus, Bookmark, MoreHorizontal } from 'lucide-react';
import { Video } from '../types';

interface VideoItemProps {
  video: Video;
  isActive: boolean;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, isActive }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastClickTime = useRef<number>(0);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const toggleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
    } else {
      setLikesCount(prev => prev - 1);
    }
    setIsLiked(!isLiked);
  };

  const handleVideoClick = (e: MouseEvent) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime.current;

    // Double-click detected (click within 300ms of the last one)
    if (timeDiff < 300) {
      // Clear the single-click timeout to prevent play/pause toggle
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }

      // Calculate relative position for the heart animation
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add a new heart effect at the click location
      const newHeart = { id: Date.now(), x, y };
      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation finishes
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 1000);

      // Automatically like the video on double-click if not already liked
      if (!isLiked) {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } else {
      // Single click: Schedule play/pause toggle if no second click follows within 300ms
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 300);
    }

    lastClickTime.current = currentTime;
  };

  /**
   * Toggles the video play/pause state and updates the UI state accordingly.
   */
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen w-full snap-start overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        loop
        playsInline
        onClick={handleVideoClick}
        poster={video.thumbnail}
        onError={(e) => {
          const error = (e.target as HTMLVideoElement).error;
          console.error("Video loading error:", error?.message || "Failed to load video");
        }}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ 
              scale: [0, 1.5, 1.2, 1], 
              opacity: [0, 1, 1, 0],
              y: -100,
              rotate: (Math.random() - 0.5) * 40
            }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'absolute', 
              left: heart.x - 40, 
              top: heart.y - 40,
              zIndex: 100
            }}
            className="pointer-events-none"
          >
            <Heart className="w-20 h-20 text-saffron fill-current drop-shadow-[0_0_10px_rgba(255,153,51,0.5)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/40 p-6 rounded-full backdrop-blur-sm">
              <Plus className="w-12 h-12 text-white rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-4 z-10">
        <div className="relative mb-1">
          <div className="w-10 h-10 rounded-full border border-white/40 overflow-hidden bg-charcoal">
            <img src={video.author.avatar} alt={video.author.username} className="w-full h-full object-cover" />
          </div>
          {!isFollowing && (
            <button 
              onClick={() => setIsFollowing(true)}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-saffron text-white rounded-full p-0.5 border border-charcoal scale-75"
            >
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>

        <button onClick={toggleLike} className="flex flex-col items-center gap-0.5 group cursor-pointer">
          <div className={`p-1 rounded-full transition-all duration-300 ${isLiked ? 'text-saffron scale-110' : 'text-white group-active:scale-90'}`}>
            <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''} drop-shadow-md`} />
          </div>
          <span className="text-[9px] font-black text-white tracking-tighter uppercase">{(likesCount / 1000).toFixed(1)}k</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 group cursor-pointer">
          <div className="p-1 text-white group-active:scale-90 transition-transform">
            <MessageCircle className="w-7 h-7 drop-shadow-md" />
          </div>
          <span className="text-[9px] font-black text-white tracking-tighter uppercase">{(video.comments / 1000).toFixed(1)}k</span>
        </button>

        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <div className={`p-1 transition-all ${isSaved ? 'text-indian-green scale-110' : 'text-white group-active:scale-90'}`}>
            <Bookmark className={`w-7 h-7 ${isSaved ? 'fill-current' : ''} drop-shadow-md`} />
          </div>
          <span className="text-[9px] font-black text-white tracking-tighter uppercase">Save</span>
        </button>

        <button className="flex flex-col items-center gap-0.5 group cursor-pointer">
          <div className="p-1 text-white group-active:scale-90 transition-transform">
            <Share2 className="w-7 h-7 drop-shadow-md" />
          </div>
          <span className="text-[9px] font-black text-white tracking-tighter uppercase">{video.shares}</span>
        </button>

        <button className="flex items-center justify-center p-1 text-white opacity-60">
          <MoreHorizontal className="w-5 h-5" />
        </button>

        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="mt-1 p-1 bg-black/40 rounded-full border border-white/10"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={video.author.avatar} alt="music" className="w-full h-full object-cover opacity-80" />
          </div>
        </motion.div>
      </div>

      <div className="absolute left-0 right-12 bottom-[72px] p-4 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display text-sm tracking-tight text-white uppercase italic">
            @{video.author.username}
          </h3>
          {isFollowing && (
            <span className="text-[7px] font-bold text-white/50 uppercase tracking-widest">• Following</span>
          )}
          <div className="w-px h-3 bg-white/20"></div>
          <span className="text-[7px] font-bold bg-saffron text-charcoal px-1 py-0.5 rounded-sm tracking-widest uppercase">GLBL</span>
        </div>
        
        <p className="text-xs text-white/90 mb-2 line-clamp-2 font-medium leading-relaxed max-w-[90%]">
          {video.caption}
        </p>

        <button className="text-[10px] text-white/40 font-bold uppercase mb-3 hover:text-white/60 transition-colors">
          View all {(video.comments / 1000).toFixed(0)}k comments
        </button>

        <div className="flex items-center gap-2 bg-charcoal/40 self-start px-2 py-1 rounded border border-white/5 w-fit backdrop-blur-sm">
          <Music2 className="w-2.5 h-2.5 text-saffron shrink-0" />
          <div className="overflow-hidden whitespace-nowrap max-w-[120px]">
            <motion.p
              animate={{ x: [0, -100] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-[9px] text-white/60 font-accent uppercase tracking-tighter"
            >
              {video.music} • {video.music}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
