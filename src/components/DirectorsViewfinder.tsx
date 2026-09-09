import React, { useState, useEffect } from 'react';
import { Camera, X, Clapperboard, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import type { ThemeKey } from '../types/portfolio';
import { themes } from '../data/initialData';

interface DirectorsViewfinderProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeKey;
  onSelectTheme: (theme: ThemeKey) => void;
}

type FocalLength = '18mm' | '35mm' | '50mm' | '85mm';
type LutFilter = 'rec709' | 'teal-orange' | 'kodak' | 'noir';

export const DirectorsViewfinder: React.FC<DirectorsViewfinderProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme
}) => {
  const [focalLength, setFocalLength] = useState<FocalLength>('35mm');
  const [lut, setLut] = useState<LutFilter>('rec709');
  const [timecode, setTimecode] = useState('01:24:19:04');
  const [isFlashing, setIsFlashing] = useState(false);
  const [clapperActive, setClapperActive] = useState(false);
  const [capturedNotification, setCapturedNotification] = useState<string | null>(null);

  // 24fps Timecode Generator
  useEffect(() => {
    if (!isOpen) return;

    let frame = 4;
    let sec = 19;
    let min = 24;
    const hour = 1;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
        }
      }
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`${pad(hour)}:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Keyboard shortcut listener (Esc to close, C to capture, A to clap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        sounds.playClick();
      } else if (e.code === 'KeyC' && !e.metaKey && !e.ctrlKey) {
        handleCaptureFrame();
      } else if (e.code === 'KeyA' && !e.metaKey && !e.ctrlKey) {
        handleClapperboard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Trigger Camera Mechanical Shutter & Flash
  const handleCaptureFrame = () => {
    sounds.playCameraShutter();
    setIsFlashing(true);
    setCapturedNotification(`FRAME ${timecode} SAVED (4K DCI)`);

    setTimeout(() => {
      setIsFlashing(false);
    }, 140);

    setTimeout(() => {
      setCapturedNotification(null);
    }, 2800);
  };

  // Trigger Clapperboard Snap
  const handleClapperboard = () => {
    sounds.playClapperboard();
    setClapperActive(true);
    setCapturedNotification('ACTION! SCENE 1 TAKE 1 • SMANTINEMA');

    setTimeout(() => {
      setClapperActive(false);
    }, 600);

    setTimeout(() => {
      setCapturedNotification(null);
    }, 2800);
  };

  // Lens Switcher magnification
  const getFocalScale = () => {
    switch (focalLength) {
      case '18mm': return 0.88;
      case '35mm': return 1.0;
      case '50mm': return 1.12;
      case '85mm': return 1.25;
      default: return 1.0;
    }
  };

  // LUT Filter CSS styles
  const getLutFilterStyle = () => {
    switch (lut) {
      case 'teal-orange':
        return 'contrast(1.15) saturate(1.25) hue-rotate(-8deg)';
      case 'kodak':
        return 'sepia(0.2) contrast(1.1) brightness(1.05) saturate(1.15)';
      case 'noir':
        return 'grayscale(1) contrast(1.35) brightness(0.95)';
      case 'rec709':
      default:
        return 'none';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden font-mono">
      {/* Dynamic Screen Flash on Shutter Click */}
      {isFlashing && (
        <div className="absolute inset-0 z-[110] bg-white pointer-events-none animate-ping duration-100" />
      )}

      {/* Clapperboard Animated Graphic on Snap */}
      {clapperActive && (
        <div className="absolute inset-0 z-[105] flex items-center justify-center pointer-events-none">
          <div className="bg-black/90 border-2 border-white/80 p-5 rounded-2xl shadow-2xl flex flex-col items-center gap-2 animate-bounce">
            <Clapperboard className="w-16 h-16 text-yellow-400 animate-pulse" />
            <span className="text-sm font-black tracking-widest text-white uppercase">
              🎬 ACTION! SCENE 1, TAKE 1
            </span>
            <span className="text-xs text-yellow-300 font-mono">DIRECTOR: M. ZAKI KHAIRI</span>
          </div>
        </div>
      )}

      {/* Camera Capture Notification Toast */}
      {capturedNotification && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[108] px-4 py-2 rounded-full bg-black/90 border border-emerald-400 text-emerald-300 text-xs font-bold tracking-wider shadow-2xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{capturedNotification}</span>
        </div>
      )}

      {/* 2.39:1 Cinemascope Letterbox Matte Bars */}
      <div className="absolute top-0 left-0 right-0 h-10 sm:h-14 bg-black z-40 border-b border-white/10 flex items-center justify-between px-3 sm:px-6 text-[11px] text-slate-300">
        {/* Top Left: REC Status & Running Timecode */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600/90 text-white font-black tracking-widest text-[10px]">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            REC
          </span>
          <span className="font-bold text-white text-xs sm:text-sm tracking-widest drop-shadow">
            {timecode}
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 text-[10px] font-bold">
            24.000 FPS
          </span>
        </div>

        {/* Top Center: Camera Model Telemetry */}
        <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400">
          <span className="text-white font-bold">ARRI ALEXA MINI LF</span>
          <span>•</span>
          <span className="text-amber-400 font-semibold">PRORES 4444 XQ</span>
          <span>•</span>
          <span>4K DCI (2.39:1)</span>
        </div>

        {/* Top Right: Sensor Specs & Exit Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-300">
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-300">BAT 14.8V</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-yellow-300">CARD 92%</span>
          </div>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs shadow-lg transition cursor-pointer active:scale-95"
            title="Keluar dari Mode Sutradara (Esc)"
          >
            <X className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Main Viewfinder Optical Frame (Rule of Thirds + Reticle) */}
      <div 
        className="absolute inset-0 top-10 sm:top-14 bottom-24 sm:bottom-28 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${getFocalScale()})`,
          filter: getLutFilterStyle()
        }}
      >
        {/* Rule of Thirds Lines (Framing Grid) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical 1/3 & 2/3 lines */}
          <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-cyan-400/20 border-r border-cyan-400/20" />
          <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-cyan-400/20 border-r border-cyan-400/20" />
          {/* Horizontal 1/3 & 2/3 lines */}
          <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-cyan-400/20 border-b border-cyan-400/20" />
          <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-cyan-400/20 border-b border-cyan-400/20" />
        </div>

        {/* 4 Corner Safe Frame Guides */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/60 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/60 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/60 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/60 pointer-events-none" />

        {/* Center Crosshair / Autofocus Target */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-12 h-12 rounded-lg border-2 border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.4)] flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] text-emerald-300 font-bold bg-black/80 px-2 py-0.5 rounded mt-1 shadow tracking-wider">
            AF-C 1.8m [LOCKED]
          </span>
        </div>

        {/* Real-time Audio VU Meters (Left & Right) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 items-end h-32 bg-black/60 p-1.5 rounded-lg border border-white/10 pointer-events-none">
          <div className="flex flex-col-reverse gap-0.5 h-full w-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-full h-2 rounded-[1px] ${
                  i > 9 ? 'bg-red-500 animate-pulse' : i > 7 ? 'bg-yellow-400' : 'bg-emerald-400'
                }`}
              />
            ))}
          </div>
          <div className="flex flex-col-reverse gap-0.5 h-full w-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-full h-2 rounded-[1px] ${
                  i > 8 ? 'bg-red-500 animate-pulse' : i > 6 ? 'bg-yellow-400' : 'bg-emerald-400'
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] text-slate-400 -rotate-90 absolute -right-3 top-1/2 -translate-y-1/2 origin-center">
            AUDIO CH1/2
          </span>
        </div>
      </div>

      {/* Bottom Cinema Director Control Deck */}
      <div className="absolute bottom-0 left-0 right-0 min-h-[5.5rem] sm:min-h-[6.5rem] bg-black/95 backdrop-blur-xl border-t border-white/15 z-40 p-3 sm:px-6 flex flex-col justify-between space-y-2">
        {/* Row 1: Technical Camera Metas & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Exposure & Optics Telemetry */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs">
            <span className="px-2 py-1 rounded bg-white/10 text-white font-bold">
              SHUTTER 180°
            </span>
            <span className="px-2 py-1 rounded bg-white/10 text-amber-300 font-bold">
              ISO 800
            </span>
            <span className="px-2 py-1 rounded bg-white/10 text-cyan-300 font-bold">
              WB 5600K
            </span>
            <span className="hidden sm:inline-block px-2 py-1 rounded bg-white/10 text-emerald-300 font-bold">
              T1.5 PRIME
            </span>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-2">
            {/* Clapperboard Trigger */}
            <button
              type="button"
              onClick={handleClapperboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
              title="Snap Clapperboard (Tekan A)"
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>Action! (Clap)</span>
            </button>

            {/* Shutter Capture Button */}
            <button
              type="button"
              onClick={handleCaptureFrame}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition cursor-pointer ring-2 ring-white/30"
              title="Capture Frame Foto (Tekan C)"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ambil Frame</span>
            </button>
          </div>
        </div>

        {/* Row 2: Lens Selector (Focal Length) & LUT Color Preset Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
          {/* Focal Length Switcher */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1 hidden sm:inline-block">
              Lensa:
            </span>
            {(['18mm', '35mm', '50mm', '85mm'] as FocalLength[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setFocalLength(f);
                  sounds.playFocusBeep();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  focalLength === f
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* LUT / Color Profile Switcher */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1 hidden sm:inline-block">
              LUT:
            </span>
            {[
              { id: 'rec709' as LutFilter, label: 'Rec.709' },
              { id: 'teal-orange' as LutFilter, label: 'Teal/Orange' },
              { id: 'kodak' as LutFilter, label: 'Kodak 500T' },
              { id: 'noir' as LutFilter, label: 'Noir B&W' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setLut(item.id);
                  sounds.playClick();
                }}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-mono transition cursor-pointer ${
                  lut === item.id
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Atmospheric Theme Switcher Quick Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1 hidden md:inline-block">
              Atmosfer:
            </span>
            <select
              value={currentTheme}
              onChange={(e) => {
                onSelectTheme(e.target.value as ThemeKey);
                sounds.playPop(600);
              }}
              className="bg-slate-900 border border-white/20 text-cyan-300 text-xs rounded-lg px-2 py-1 font-mono cursor-pointer focus:outline-none focus:border-cyan-400"
            >
              {Object.entries(themes).map(([key, config]) => (
                <option key={key} value={key} className="bg-slate-900 text-white">
                  {config.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
