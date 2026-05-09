import { useState } from 'react';
import { Upload, Camera, Film, Lock, CheckCircle2, Music, Users, MapPin, BarChart3, Settings, Plus, Scissors, Trash2, ChevronRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type UploadMode = 'POST' | 'STORY' | 'REEL' | 'LIVE';

interface VideoClip {
  id: string;
  duration: number;
  start: number;
  end: number;
  thumbnail: string;
}

export default function UploadView() {
  const [step, setStep] = useState<'options' | 'permission' | 'editor' | 'details' | 'success'>('options');
  const [mode, setMode] = useState<UploadMode>('REEL');
  const [isUploading, setIsUploading] = useState(false);
  const [clips, setClips] = useState<VideoClip[]>([
    { id: '1', duration: 15, start: 0, end: 15, thumbnail: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' }
  ]);
  const [activeClipId, setActiveClipId] = useState<string | null>('1');

  const activeClip = clips.find(c => c.id === activeClipId);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep('success');
    }, 2000);
  };

  const startNewRecording = () => {
    setStep('permission');
    setTimeout(() => setStep('editor'), 1500);
  };

  const startFromGallery = () => {
    setStep('editor');
  };

  const addClip = () => {
    const newId = (clips.length + 1).toString();
    const newClip: VideoClip = {
      id: newId,
      duration: 10,
      start: 0,
      end: 10,
      thumbnail: `https://images.pexels.com/photos/${1000 + clips.length}/pexels-photo-${1000 + clips.length}.jpeg?auto=compress&cs=tinysrgb&w=200`
    };
    setClips([...clips, newClip]);
    setActiveClipId(newId);
  };

  const removeClip = (id: string) => {
    const newClips = clips.filter(c => c.id !== id);
    setClips(newClips);
    if (activeClipId === id && newClips.length > 0) {
      setActiveClipId(newClips[0].id);
    } else if (newClips.length === 0) {
      setStep('options');
    }
  };

  const updateTrim = (id: string, start: number, end: number) => {
    setClips(clips.map(c => c.id === id ? { ...c, start, end } : c));
  };

  return (
    <div className="h-screen w-full bg-charcoal flex flex-col relative overflow-hidden">
      {/* Top Navbar */}
      <div className="p-6 flex justify-between items-center z-50 bg-charcoal/80 backdrop-blur-sm">
        <button 
          onClick={() => {
            if (step === 'editor') setStep('options');
            else if (step === 'details') setStep('editor');
            else if (step === 'permission') setStep('options');
            else setStep('options');
          }} 
          className="text-white/60 font-bold uppercase tracking-widest text-[10px]"
        >
          {step === 'options' ? 'Cancel' : 'Back'}
        </button>
        <h3 className="text-sm font-display text-white uppercase italic tracking-tighter">
          {step === 'editor' ? 'Edit Swag' : `New ${mode}`}
        </h3>
        <button className="text-indian-green font-black uppercase tracking-widest text-[10px]">
          {step === 'editor' ? 'Clip Count: ' + clips.length : 'Drafts'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center p-8 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          {step === 'options' && (
            <motion.div 
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md flex flex-col gap-4 mt-20"
            >
              <h2 className="text-3xl font-display uppercase italic text-white text-center mb-8">
                Create <span className="text-saffron">Trending</span> Swags
              </h2>

              <button 
                onClick={startFromGallery}
                className="flex items-center gap-4 p-5 bg-white text-charcoal border-b-4 border-r-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-b-0 hover:border-r-0 transition-all group"
              >
                <div className="p-3 bg-charcoal text-white rounded-lg group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold uppercase tracking-tighter text-sm">Gallery</p>
                  <p className="text-[9px] text-charcoal/60 uppercase font-accent">Select from your phone</p>
                </div>
              </button>

              <button 
                onClick={startNewRecording}
                className="flex items-center gap-4 p-5 bg-saffron text-charcoal border-b-4 border-r-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-b-0 hover:border-r-0 transition-all group"
              >
                <div className="p-3 bg-white text-charcoal rounded-lg group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold uppercase tracking-tighter text-sm">Camera</p>
                  <p className="text-[9px] text-charcoal/40 uppercase font-accent">Record something new</p>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl grayscale hover:grayscale-0 transition-all">
                   <Film className="w-6 h-6 text-indian-green" />
                   <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Tutorials</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl grayscale hover:grayscale-0 transition-all">
                   <BarChart3 className="w-6 h-6 text-saffron" />
                   <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Analytics</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'editor' && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col gap-6"
            >
              <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-black rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                {activeClip && (
                  <img src={activeClip.thumbnail} className="w-full h-full object-cover opacity-50" />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Scissors className="w-12 h-12 text-white/20 mb-4" />
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Previewing Clip {clips.indexOf(activeClip!) + 1}</p>
                </div>
                
                {/* Trim HUD */}
                <div className="absolute bottom-6 left-0 right-0 px-4">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10">
                    <div className="flex justify-between text-[8px] font-bold text-white/40 uppercase mb-2">
                      <span>{activeClip?.start.toFixed(1)}s</span>
                      <span className="text-saffron">{(activeClip!.end - activeClip!.start).toFixed(1)}s Selected</span>
                      <span>{activeClip?.duration.toFixed(1)}s</span>
                    </div>
                    <div className="relative h-8 bg-white/5 rounded overflow-hidden">
                      <div className="flex gap-0.5 opacity-30 h-full">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="flex-1 bg-white/20 h-full" />
                        ))}
                      </div>
                      <div 
                        className="absolute top-0 bottom-0 bg-saffron/40 border-x-4 border-saffron"
                        style={{ 
                          left: `${(activeClip!.start / activeClip!.duration) * 100}%`,
                          right: `${100 - (activeClip!.end / activeClip!.duration) * 100}%`
                        }}
                      >
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0.5 h-4 bg-white rounded-full mx-auto" />
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0.5 h-4 bg-white rounded-full mx-auto" />
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={activeClip!.duration}
                      step="0.1"
                      value={activeClip!.start}
                      onChange={(e) => updateTrim(activeClipId!, parseFloat(e.target.value), activeClip!.end)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Clip Sequence / Merging UI */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indian-green" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Merge Sequence</span>
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase">
                    Total: {clips.reduce((acc, c) => acc + (c.end - c.start), 0).toFixed(1)}s
                  </span>
                </div>
                
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {clips.map((clip, index) => (
                    <div 
                      key={clip.id}
                      onClick={() => setActiveClipId(clip.id)}
                      className={`relative shrink-0 w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${activeClipId === clip.id ? 'border-saffron scale-105' : 'border-white/10 opacity-60'}`}
                    >
                      <img src={clip.thumbnail} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-black/60 rounded px-1 py-0.5 text-[8px] font-bold text-white">
                        {index + 1}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeClip(clip.id);
                        }}
                        className="absolute top-1 right-1 bg-charcoal text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center">
                         <span className="text-[8px] font-black text-white">{(clip.end - clip.start).toFixed(1)}s</span>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={addClip}
                    className="shrink-0 w-20 aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-1 hover:border-white/40 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-white/30" />
                    <span className="text-[8px] font-black text-white/20 uppercase">Add clip</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setStep('details')}
                className="w-full py-5 bg-saffron text-charcoal font-black uppercase italic tracking-tighter border-b-4 border-r-4 border-black active:translate-y-px mt-4 flex items-center justify-center gap-2"
              >
                Proceed to Details <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 'details' && (
             <motion.div 
               key="details"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="w-full h-full flex flex-col gap-6 pt-4"
             >
                <div className="flex gap-4 items-start">
                  <div className="w-20 aspect-square bg-white/5 rounded-lg border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                    {clips.length > 0 ? (
                      <img src={clips[0].thumbnail} className="w-full h-full object-cover opacity-60" />
                    ) : (
                      <Film className="w-6 h-6 text-white/20" />
                    )}
                  </div>
                  <textarea 
                    placeholder="Write a caption for your swag..." 
                    className="flex-1 bg-transparent border-none text-sm text-white resize-none focus:outline-none placeholder:text-white/20"
                    rows={4}
                  />
                </div>

                <div className="space-y-1">
                  {[
                    { icon: Music, label: 'Add Music', color: 'text-saffron' },
                    { icon: Users, label: 'Tag People', color: 'text-white/60' },
                    { icon: MapPin, label: 'Add Location', color: 'text-indian-green' },
                    { icon: Settings, label: 'Advanced Settings', color: 'text-white/40' }
                  ].map((opt, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group">
                      <div className="flex items-center gap-4">
                        <opt.icon className={`w-5 h-5 ${opt.color} group-active:scale-110 transition-transform`} />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">{opt.label}</span>
                      </div>
                      <Plus className="w-4 h-4 text-white/20" />
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleUpload}
                  className="mt-auto w-full py-5 bg-indian-green text-white font-black uppercase italic tracking-tighter border-b-4 border-r-4 border-black active:translate-y-px"
                >
                  Post Internationally
                </button>
             </motion.div>
          )}

          {step === 'permission' && (
            <motion.div 
              key="permission"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center text-center max-w-xs h-full justify-center"
            >
              <div className="w-20 h-20 bg-saffron/20 border-2 border-saffron rounded-full flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-saffron" />
              </div>
              <h3 className="text-xl font-display text-white uppercase italic mb-2">Initialising Lens</h3>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-saffron rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center h-full justify-center"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <CheckCircle2 className="w-12 h-12 text-indian-green" />
              </div>
              <h3 className="text-3xl font-display text-white uppercase italic mb-1 tracking-tighter leading-none">Your Swag is <span className="text-saffron">Viral</span>!</h3>
              <p className="text-[10px] text-white/40 mb-10 font-accent uppercase tracking-[0.2em]">Check it out in your profile</p>
              <button 
                onClick={() => setStep('options')}
                className="px-12 py-4 bg-white text-charcoal font-black uppercase italic tracking-tighter border-b-4 border-r-4 border-black"
              >
                Create More
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode Selector - Bottom Bar */}
      {step === 'options' && (
        <div className="absolute bottom-24 left-0 right-0 flex justify-center pb-2 z-20">
          <div className="flex gap-6 bg-black/60 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10">
            {(['POST', 'STORY', 'REEL', 'LIVE'] as UploadMode[]).map((m) => (
              <button 
                key={m}
                onClick={() => setMode(m)}
                className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all px-2 ${mode === m ? 'text-saffron scale-110' : 'text-white/30 hover:text-white/60'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
