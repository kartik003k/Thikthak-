import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-gradient-to-b from-charcoal/90 to-transparent backdrop-blur-[2px]">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-display uppercase italic tracking-tighter text-white">
          Thik<span className="text-saffron">Thak</span>
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <Search className="w-5 h-5 text-white active:scale-90 transition-transform cursor-pointer" />
        <div className="relative cursor-pointer active:scale-90 transition-transform">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-saffron rounded-full border border-charcoal"></span>
        </div>
      </div>
    </header>
  );
}
