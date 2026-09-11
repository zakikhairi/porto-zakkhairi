import React, { useState } from 'react';
import { Volume2, VolumeX, Palette, Menu, X, Sparkles, Sliders } from 'lucide-react';
import type { ThemeKey } from '../types/portfolio';
import { themes } from '../data/initialData';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  currentTheme: ThemeKey;
  onSelectTheme: (t: ThemeKey) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCms: () => void;
  isAdminMode?: boolean;
  onToggleAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onSelectTheme,
  soundEnabled,
  onToggleSound,
  onOpenCms,
  isAdminMode = false,
  onToggleAdmin,
}) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const navLinks = [
    { label: 'Tentang', href: '#about' },
    { label: 'Resume', href: '#experience' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Buku Tamu', href: '#guestbook' },
    { label: 'Kontak', href: '#contact' },
  ];

  const handleNavClick = () => {
    sounds.playWebThwip();
    setMobileMenuOpen(false);
  };

  // Secret 5-click on Brand Logo to unlock CMS on mobile/touch screens
  const handleBrandClick = () => {
    sounds.playWebThwip();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setClickCount(0);
      if (onToggleAdmin) {
        onToggleAdmin();
      }
    }
    setTimeout(() => setClickCount(0), 3000);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-4xl rounded-full glass-panel border border-red-500/20 px-4 sm:px-5 py-2.5 shadow-2xl flex items-center justify-between transition-all backdrop-blur-2xl">
        {/* Sleek Balanced Brand with secret multi-click unlock */}
        <button
          type="button"
          onClick={handleBrandClick}
          title="Muhammad Zaki Khairi • Spider-Tech"
          className="flex items-center gap-2.5 group shrink-0 cursor-pointer bg-transparent border-0 p-0 text-left"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-950/90 border border-red-500/50 p-1 shadow-md shadow-red-500/25 group-hover:scale-105 group-hover:border-red-400 group-hover:shadow-red-500/50 transition-all flex items-center justify-center backdrop-blur-md">
            <img
              src="/custom-logo.png"
              alt="Logo ZK"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,1)] transition-all"
            />
          </div>
          <div className="text-left">
            <span className="font-bold text-sm text-white tracking-wide flex items-center gap-1 group-hover:text-red-400 transition font-mono">
              zakikhairi <span className="text-red-400 text-xs">🕷️</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Balanced Font & Comfortable Spacing) */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls (Theme, Sound, CMS Button) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sounds.playClick();
            }}
            title={soundEnabled ? "Nonaktifkan Efek Suara" : "Aktifkan Efek Suara"}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                sounds.playClick();
              }}
              title="Ganti Atmosfer Warna"
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center cursor-pointer"
            >
              <Palette className="w-4 h-4 text-pink-400" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-2xl glass-panel border border-white/15 p-2.5 shadow-2xl z-50 backdrop-blur-2xl animate-fadeIn">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider font-mono flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                  <span>Atmosfer Sinematik</span>
                  <Sparkles className="w-3 h-3 text-pink-400" />
                </div>
                <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                  {Object.entries(themes).map(([key, t]) => {
                    const isActive = currentTheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onSelectTheme(key as ThemeKey);
                          setThemeDropdownOpen(false);
                          sounds.playClick();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/30 text-white font-bold border border-purple-500/50 shadow-md'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow shrink-0"
                            style={{ backgroundColor: t.primary, boxShadow: `0 0 8px ${t.primary}` }}
                          />
                          <div>
                            <div className="font-semibold text-white">{t.name}</div>
                            {t.subtitle && (
                              <div className="text-[10px] text-slate-400 font-normal">{t.subtitle}</div>
                            )}
                          </div>
                        </div>
                        {isActive && <span className="text-cyan-400 text-xs font-bold ml-1">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CMS Admin Button (Only visible in secret Admin Mode) */}
          {isAdminMode && (
            <button
              onClick={() => {
                onOpenCms();
                sounds.playSuccess();
              }}
              title="Buka CMS Studio untuk Edit Portofolio"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition cursor-pointer animate-fade-in"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>CMS</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sounds.playClick();
            }}
            className="md:hidden p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed top-20 left-4 right-4 rounded-2xl glass-panel border border-white/15 p-4 shadow-2xl backdrop-blur-2xl flex flex-col space-y-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
            >
              {link.label}
            </a>
          ))}

          {isAdminMode && (
            <button
              onClick={() => {
                onOpenCms();
                setMobileMenuOpen(false);
                sounds.playSuccess();
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg"
            >
              <Sliders className="w-4 h-4" />
              <span>Buka CMS Studio</span>
            </button>
          )}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>zakikhairi.dev</span>
            <span className="text-cyan-400 font-mono">Portfolio</span>
          </div>
        </div>
      )}
    </header>
  );
};
