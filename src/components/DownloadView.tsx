import { useState } from 'react';
import { Download, Mail, Smartphone, Globe, Github, FileJson, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DownloadView() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="h-screen w-full bg-charcoal flex flex-col p-6 overflow-y-auto no-scrollbar pb-32">
      {/* Header */}
      <div className="mt-8 mb-10 text-center">
        <h2 className="text-4xl font-display uppercase italic text-white leading-none mb-2">
          Get the <span className="text-saffron">App</span>
        </h2>
        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-accent">Take ThikThak Everywhere</p>
      </div>

      <AnimatePresence mode="wait">
        {formState !== 'success' ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Form Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-saffron text-charcoal rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase text-white tracking-widest">Get Download Link</span>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Your Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-charcoal/50 border-2 border-white/10 rounded-xl px-4 py-4 text-white focus:border-saffron transition-colors outline-none"
                  />
                </div>
                
                <button 
                  disabled={formState === 'submitting'}
                  className="w-full py-4 bg-saffron text-charcoal font-black uppercase italic tracking-tighter border-b-4 border-r-4 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? 'Generating Link...' : 'Send Magic Link'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Developer Export Info */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-4">Developer Tools</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
                   <FileJson className="w-6 h-6 text-indian-green" />
                   <div className="space-y-1">
                     <p className="text-[9px] font-black text-white uppercase">Export ZIP</p>
                     <p className="text-[7px] text-white/40 leading-tight">Download source code from Settings menu</p>
                   </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
                   <Github className="w-6 h-6 text-white" />
                   <div className="space-y-1">
                     <p className="text-[9px] font-black text-white uppercase">Push to Git</p>
                     <p className="text-[7px] text-white/40 leading-tight">Sync directly to your GitHub account</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-12"
          >
            <div className="w-20 h-20 bg-indian-green rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(33,158,188,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-display text-white uppercase italic mb-2 tracking-tighter">Check Your Inbox!</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest max-w-[200px] leading-relaxed mb-10">
              We've sent a unique download link to <span className="text-white">{email}</span>. Use it to install ThikThak on your device.
            </p>
            <button 
              onClick={() => setFormState('idle')}
              className="text-saffron text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4"
            >
              Enter another email
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Badges */}
      <div className="mt-auto pt-10 flex justify-center gap-8 opacity-20">
         <div className="flex items-center gap-2">
           <Smartphone className="w-5 h-5 text-white" />
           <span className="text-[8px] font-black uppercase text-white tracking-widest">Android</span>
         </div>
         <div className="flex items-center gap-2">
           <Globe className="w-5 h-5 text-white" />
           <span className="text-[8px] font-black uppercase text-white tracking-widest">iOS Web</span>
         </div>
      </div>
    </div>
  );
}
