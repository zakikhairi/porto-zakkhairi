import React, { useState } from 'react';
import { Mail, MessageCircle, FileText } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { GithubIcon } from './icons/GithubIcon';
import { sounds } from '../utils/soundEffects';

interface ContactKey {
  letter: string;
  label: string;
  detail: string;
  url: string;
  brandColor: string;
  glowColor: string;
  icon: React.ElementType;
}

const CONTACT_KEYS: ContactKey[] = [
  { 
    letter: 'C', 
    label: 'Instagram', 
    detail: '@zakkhairi_', 
    url: 'https://www.instagram.com/zakkhairi_/', 
    brandColor: '#e1306c',
    glowColor: 'rgba(225, 48, 108, 0.4)',
    icon: InstagramIcon 
  },
  { 
    letter: 'O', 
    label: 'TikTok', 
    detail: '@_iniizaki', 
    url: 'https://www.tiktok.com/@_iniizaki', 
    brandColor: '#00f2fe',
    glowColor: 'rgba(0, 242, 254, 0.4)',
    icon: TiktokIcon 
  },
  { 
    letter: 'N', 
    label: 'WhatsApp', 
    detail: '0819-1920-0602', 
    url: 'https://wa.me/6281919200602?text=Halo%20Zaki,%20saya%20tertarik%20berdiskusi.', 
    brandColor: '#25d366',
    glowColor: 'rgba(37, 211, 102, 0.4)',
    icon: MessageCircle 
  },
  { 
    letter: 'T', 
    label: 'Email', 
    detail: 'muhammadzakikhairi19@gmail.com', 
    url: 'mailto:muhammadzakikhairi19@gmail.com', 
    brandColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    icon: Mail 
  },
  { 
    letter: 'A', 
    label: 'YouTube', 
    detail: '@zakkhairi', 
    url: 'https://www.youtube.com/@zakkhairi', 
    brandColor: '#ff0000',
    glowColor: 'rgba(255, 0, 0, 0.4)',
    icon: YoutubeIcon 
  },
  { 
    letter: 'C', 
    label: 'GitHub', 
    detail: '@zakikhairi', 
    url: 'https://github.com/zakikhairi', 
    brandColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    icon: GithubIcon 
  },
  { 
    letter: 'T', 
    label: 'Unduh CV', 
    detail: 'Curriculum Vitae PDF', 
    url: '/Muhammad_Zaki_Khairi_CV.pdf', 
    brandColor: '#0a66c2',
    glowColor: 'rgba(10, 102, 194, 0.4)',
    icon: FileText 
  },
];

export const ContactDock: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
          Interactive Mechanical Keycap Dock:
        </span>
        <p className="text-xs text-slate-300 mt-0.5">
          Arahkan kursor / sentuh huruf <span className="font-mono font-bold text-cyan-400">CONTACT</span> untuk membuka kanal resmi
        </p>
      </div>

      {/* 3D Dock Platform Shell */}
      <div 
        className="relative px-3 sm:px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-center gap-1.5 sm:gap-2.5"
        style={{ perspective: '900px' }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {CONTACT_KEYS.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const dist = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : 999;
          const isNeighbor = dist === 1;

          // Dock dynamics: Lift, scale, and spread
          let translateY = 0;
          let scale = 1;
          let translateX = 0;
          let rotateY = 0;

          if (isHovered) {
            translateY = -18;
            scale = 1.25;
            rotateY = 180;
          } else if (isNeighbor) {
            translateY = -6;
            scale = 1.08;
            translateX = (index < hoveredIndex! ? -6 : 6);
          }

          const IconComponent = item.icon;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: isHovered ? 40 : 20 - dist,
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                sounds.playPop(520 + index * 40);
              }}
            >
              {/* Tooltip on Key Hover */}
              <div
                className={`absolute -top-12 px-3 py-1 rounded-xl bg-slate-950/95 border border-white/20 text-white shadow-2xl backdrop-blur-md flex flex-col items-center transition-all duration-200 pointer-events-none whitespace-nowrap z-50 ${
                  isHovered ? 'opacity-100 -translate-y-1 scale-100' : 'opacity-0 translate-y-2 scale-90'
                }`}
              >
                <span className="text-xs font-bold leading-tight" style={{ color: item.brandColor }}>
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 font-mono leading-none">
                  {item.detail}
                </span>
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 border-b border-r border-white/20 rotate-45" />
              </div>

              {/* 3D Keycap Container */}
              <a
                href={item.url}
                target={item.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                download={item.letter === 'T' && item.label === 'Unduh CV' ? 'CV_Muhammad_Zaki_Khairi.pdf' : undefined}
                onClick={() => sounds.playClick()}
                aria-label={item.label}
                className="relative block w-10 sm:w-12 h-11 sm:h-13 cursor-pointer outline-none touch-manipulation"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translate3d(0, ${translateY}px, ${isHovered ? 30 : 0}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Brand Color Ambient Glow under key */}
                <div
                  className={`absolute -inset-1 rounded-2xl blur-md transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-90' : 'opacity-0'
                  }`}
                  style={{ background: item.glowColor }}
                />

                {/* ================= FRONT FACE: Dark Mechanical Letter ================= */}
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-slate-500/50 shadow-[0_5px_15px_rgba(0,0,0,0.6)] flex items-center justify-center text-white font-mono font-black text-base sm:text-lg select-none"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {item.letter}
                  </span>
                  {/* Keycap bevel highlight */}
                  <div className="absolute inset-0.5 rounded-lg border-t border-white/20 pointer-events-none" />
                </div>

                {/* ================= BACK FACE: Channel Icon & Brand Color ================= */}
                <div
                  className="absolute inset-0 rounded-xl bg-slate-950 border border-white/30 shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center justify-center select-none"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div 
                    className="w-full h-full rounded-xl flex items-center justify-center p-2 transition-transform"
                    style={{
                      backgroundColor: `${item.brandColor}18`,
                      borderColor: item.brandColor
                    }}
                  >
                    <IconComponent className="w-5 sm:w-6 h-5 sm:h-6 drop-shadow-md" style={{ color: item.brandColor }} />
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
