import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react';

export type TabType = 'home' | 'explore' | 'upload' | 'inbox' | 'profile';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs: { type: TabType; icon: typeof Home; label: string }[] = [
    { type: 'home', icon: Home, label: 'Home' },
    { type: 'explore', icon: Compass, label: 'Explore' },
    { type: 'upload', icon: Plus, label: 'Post' },
    { type: 'inbox', icon: MessageCircle, label: 'Inbox' },
    { type: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-around px-2 py-3 bg-charcoal/95 backdrop-blur-md border-t border-white/5 safe-area-bottom">
      {tabs.map((tab) => {
        if (tab.type === 'upload') {
          return (
            <button 
              key={tab.type}
              onClick={() => onTabChange(tab.type)}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-saffron/20 blur-md rounded-lg group-active:scale-110 transition-transform ${activeTab === 'upload' ? 'bg-saffron/40' : ''}`}></div>
              <div className={`relative bg-white text-charcoal p-2.5 rounded-lg border-b-2 border-r-2 border-charcoal group-active:translate-y-px transition-all ${activeTab === 'upload' ? 'scale-110' : ''}`}>
                <Plus className="w-5 h-5" />
              </div>
            </button>
          );
        }

        const isActive = activeTab === tab.type;
        return (
          <button 
            key={tab.type}
            onClick={() => onTabChange(tab.type)}
            className={`flex flex-col items-center gap-1 group cursor-pointer transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            <tab.icon className={`w-5 h-5 group-active:scale-90 transition-transform ${isActive ? 'fill-current' : ''}`} />
            <span className={`text-[9px] font-semibold uppercase tracking-wider ${isActive ? 'font-black' : ''}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
