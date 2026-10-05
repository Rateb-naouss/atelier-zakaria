import React, { useState } from 'react';
import { useWorkshop } from '../context/WorkshopContext';
import { Menu, X, Wrench, Image as ImageIcon, Info, Settings as SettingsIcon, Hammer } from 'lucide-react';

export const Header: React.FC = () => {
  const { settings, currentView, setCurrentView, messages } = useWorkshop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = messages.filter(m => !m.is_read).length;

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Wrench },
    { id: 'services', label: 'خدماتنا', icon: Hammer },
    { id: 'gallery', label: 'معرض الأعمال', icon: ImageIcon },
    { id: 'about', label: 'من نحن', icon: Info },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1c1917]/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md transition-all duration-300">
      {/* Main navigation bar - clean, no address, no phone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Workshop Master */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#1c1917] rounded-[10px] flex items-center justify-center text-amber-400 font-bold text-xl">
                <Hammer className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {settings.site_name}
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-400 flex items-center gap-1.5">
                <span>بإدارة {settings.owner_name}</span>
                <span className="text-stone-600">•</span>
                <span className="text-amber-400 font-semibold hidden sm:inline">خبرة وإتقان هندسي</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links & Admin tools */}
          <div className="hidden lg:flex items-center gap-3">
            <nav className="flex items-center gap-1.5">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 shadow-sm border border-amber-500/40'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="h-6 w-px bg-stone-800 mx-1" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-white transition py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                title="لوحة تحكم المعلم زكريا"
              >
                <SettingsIcon className="w-3.5 h-3.5" />
                <span>لوحة الإدارة</span>
                {unreadCount > 0 && (
                  <span className="bg-amber-400 text-stone-950 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleNavClick('laravel-hub')}
                className="flex items-center gap-1 text-xs text-stone-300 hover:text-white transition py-2 px-3 rounded-xl bg-stone-800/80 hover:bg-stone-700 border border-stone-700/60"
                title="استعراض كود مشروع Laravel 11"
              >
                <span className="font-mono font-bold text-[11px]">Laravel 11</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-200 hover:text-white hover:bg-stone-700 focus:outline-none"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141211] border-b border-stone-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Icon className="w-5 h-5 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-amber-400 text-sm font-semibold"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>لوحة الإدارة</span>
              </button>
              <button
                onClick={() => handleNavClick('laravel-hub')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-300 text-sm font-semibold"
              >
                <span className="font-mono text-xs">Laravel Code</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
