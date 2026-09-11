import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FloatingWhatsAppProps {
  phone?: string;
  name?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone = '081919200602',
  name = 'Muhammad Zaki Khairi'
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isDismissed) return null;

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Halo ${name}, saya melihat portofolio Anda dan tertarik untuk berdiskusi/kolaborasi.`);
  const waUrl = `https://wa.me/62${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}?text=${message}`;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 group animate-fadeIn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => sounds.playClick()}
        className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-[#0c1322]/95 border border-emerald-500/40 hover:border-emerald-400 backdrop-blur-md shadow-[0_8px_25px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all text-white cursor-pointer"
        title="Chat langsung di WhatsApp"
      >
        {/* Pulsing online indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-400 text-emerald-400" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 border-2 border-[#0c1322]" />
          </span>
        </div>

        {/* Text Details */}
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
              WA Chat
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">
              Online
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block -mt-0.5 hidden sm:block">
            Biasanya balas cepat
          </span>
        </div>
      </a>

      {/* Dismiss Button */}
      {isHovered && (
        <button
          onClick={() => {
            sounds.playClick();
            setIsDismissed(true);
          }}
          className="w-6 h-6 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs transition border border-white/10 cursor-pointer animate-fadeIn"
          title="Tutup badge"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
