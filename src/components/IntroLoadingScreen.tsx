import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import { Sparkles, FastForward, Film, Terminal } from 'lucide-react';

interface IntroLoadingScreenProps {
  onComplete: () => void;
  name?: string;
}

const STATUS_STEPS = [
  { threshold: 0, text: 'MEMUAT ENGINE AUDIO & GRAFIS...' },
  { threshold: 25, text: 'MENYIAPKAN LENSA & STORYTELLING...' },
  { threshold: 55, text: 'MENGHUBUNGKAN SISTEM INFORMASI GUNADARMA...' },
  { threshold: 82, text: 'FINALISASI RENDER & SINEMATOGRAFI...' },
  { threshold: 98, text: 'ACTION! MEMBUKA PORTOFOLIO' }
];

export const IntroLoadingScreen: React.FC<IntroLoadingScreenProps> = ({
  onComplete,
  name = 'MUHAMMAD ZAKI KHAIRI'
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>(STATUS_STEPS[0].text);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth loading increment
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds duration for snappy yet cinematic feel

    let animationFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const linearRatio = Math.min(1, elapsed / duration);
      // Ease-out cubic curve
      const easeRatio = 1 - Math.pow(1 - linearRatio, 2.5);
      const currentPct = Math.min(100, Math.round(easeRatio * 100));

      setProgress(currentPct);

      // Update matching status text
      for (let i = STATUS_STEPS.length - 1; i >= 0; i--) {
        if (currentPct >= STATUS_STEPS[i].threshold) {
          setStatusText(STATUS_STEPS[i].text);
          break;
        }
      }

      if (linearRatio < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Complete!
        finishIntro();
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const finishIntro = () => {
    setProgress(100);
    setStatusText('ACTION! MEMBUKA PORTOFOLIO');
    sounds.playIntroChime();

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 280);
  };

  const handleSkip = () => {
    sounds.playPop(700);
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      aria-label="Layar Intro Portofolio"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white select-none transition-all duration-700 ease-out overflow-hidden ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.85)_100%)] pointer-events-none" />

      {/* Grid Texture Layer */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Viewfinder Camera Brackets (Corners) */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-start gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400/70" />
        <div className="flex items-center gap-2 pt-0.5 sm:pt-1 font-mono text-[11px] sm:text-xs text-slate-400 tracking-wider">
          <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-rose-500"></span>
          </span>
          <span className="text-rose-400 font-bold">REC ●</span>
          <span className="hidden sm:inline text-slate-400">4K DCI • 24FPS</span>
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-start gap-2 sm:gap-3">
        <button
          onClick={handleSkip}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white font-mono text-[11px] sm:text-xs transition cursor-pointer backdrop-blur-md shadow-lg"
          title="Lewati Intro (Tekan ESC)"
        >
          <span>LEWATI</span>
          <FastForward className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
          <span className="text-[10px] text-slate-400 hidden sm:inline">[ESC]</span>
        </button>
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400/70" />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-end gap-2">
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-cyan-400/70" />
        <div className="pb-1 font-mono text-[11px] text-slate-400 tracking-wider hidden sm:block">
          <span>ISO 400 • F/1.8 • 1/50s</span>
        </div>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-end gap-2">
        <div className="pb-1 font-mono text-[11px] text-slate-400 tracking-wider hidden sm:block">
          <span>GUNADARMA IT • SMANTINEMA</span>
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-cyan-400/70" />
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
        {/* Monogram Badge */}
        <div className="relative mb-5 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-2xl shadow-purple-500/30 animate-pulse">
            <div className="w-full h-full bg-slate-950/95 rounded-[22px] flex flex-col items-center justify-center p-3.5">
              <img
                src="/custom-logo.png"
                alt="Logo ZK"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(0,118,254,0.85)]"
              />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 text-cyan-400">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>

        {/* Name with Modern Tracking */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-white font-mono flex items-center justify-center gap-2">
          <span>{name}</span>
        </h1>

        {/* Cinematic Subtitles */}
        <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-300 font-mono tracking-wider">
          <Film className="w-3.5 h-3.5 text-pink-400" />
          <span>DIRECTOR</span>
          <span className="text-slate-600">•</span>
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCER</span>
          <span className="text-slate-600">•</span>
          <span>TECH CREATIVE</span>
        </div>

        {/* Progress Section */}
        <div className="w-full mt-8 space-y-3">
          {/* Percentage & Status Display */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400 px-1">
            <div className="flex items-center gap-2 overflow-hidden text-left">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs text-slate-300 truncate">
                {statusText}
              </span>
            </div>
            <span className="text-sm sm:text-base font-bold text-cyan-300 ml-2 font-mono">
              {progress}%
            </span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10 p-[1px] shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-lg shadow-cyan-500/50 transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Timecode Footer */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
            <span>SCENE 01 / TAKE 01</span>
            <span>ROLLING SOUND & CAMERA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
