import React, { useState, useEffect } from 'react';
import { User, Layers, Film, GraduationCap, Mail } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'Profil', href: '#about', icon: User },
  { id: 'bento', label: 'Playground', href: '#bento', icon: Layers },
  { id: 'projects', label: 'Karya', href: '#projects', icon: Film },
  { id: 'experience', label: 'Resume', href: '#experience', icon: GraduationCap },
  { id: 'contact', label: 'Kontak', href: '#contact', icon: Mail },
];

export const MobileBottomNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1
      }
    );

    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    sounds.playClick();
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      aria-label="Navigasi Mobile"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 pointer-events-auto select-none"
    >
      <div className="max-w-md mx-auto rounded-2xl glass-panel border border-white/15 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.href, item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-white bg-white/10 shadow-sm scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-400 stroke-[2.5]' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,1)]" />
                )}
              </div>
              <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isActive ? 'font-bold text-white' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
