import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  SkipBack, 
  SkipForward, 
  Maximize2, 
  LayoutGrid, 
  Film, 
  Camera, 
  Globe
} from 'lucide-react';
import type { Project } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';

interface GlassyProjectsCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onToggleViewMode?: () => void;
}

export const GlassyProjectsCarousel: React.FC<GlassyProjectsCarouselProps> = ({
  projects,
  onSelectProject,
  onToggleViewMode,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // High-performance pointer swipe tracking (zero re-render during dragging)
  const pointerStartX = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);

  const total = projects.length;
  const activeProject = projects[activeIndex] || projects[0];

  // Track window resize with debouncing
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Wrap-around activeIndex if projects change
  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [total, activeIndex]);

  const handleNext = useCallback(() => {
    sounds.playClick();
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    sounds.playClick();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay Reel Timer
  useEffect(() => {
    if (isAutoplay && total > 1) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % total);
      }, 4000);
    } else if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, total]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Smooth swipe gestures using Pointer Events (Hardware Accelerated, no intermediate re-renders)
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    const deltaX = e.clientX - pointerStartX.current;
    if (deltaX < -50) {
      handleNext();
    } else if (deltaX > 50) {
      handlePrev();
    }
  };

  // Helper to extract year, star rating/achievement, and formatted category
  const getProjectMeta = (proj: Project) => {
    let year = '2024';
    if (proj.title.includes('2022') || proj.description.includes('2022')) year = '2022';
    if (proj.title.includes('2023') || proj.description.includes('2023')) year = '2023';

    let categoryLabel = 'Web App';
    let categoryIcon = <Globe className="w-3 h-3 text-cyan-400" />;
    let trailerLabel = 'Buka Web App';

    if (proj.category === 'film') {
      categoryLabel = 'Film & Sinema';
      categoryIcon = <Film className="w-3 h-3 text-rose-400" />;
      trailerLabel = 'Watch Trailer';
    } else if (proj.category === 'fotografi') {
      categoryLabel = 'Fotografi';
      categoryIcon = <Camera className="w-3 h-3 text-pink-400" />;
      trailerLabel = 'Lihat Galeri';
    } else if (proj.category === 'fullstack') {
      categoryLabel = 'Fullstack App';
      categoryIcon = <Globe className="w-3 h-3 text-emerald-400" />;
      trailerLabel = 'Buka Aplikasi';
    }

    let starBadge = '⭐ 9.8';
    if (proj.stats && proj.stats.length > 0) {
      const prest = proj.stats.find(s => s.label.toLowerCase().includes('prestasi') || s.label.toLowerCase().includes('deploy'));
      if (prest) starBadge = `⭐ ${prest.value}`;
    } else if (proj.tagline.includes('Juara')) {
      starBadge = '⭐ Juara 1';
    } else if (proj.demoUrl?.includes('vercel.app')) {
      starBadge = '⭐ Live Vercel';
    }

    return { year, categoryLabel, categoryIcon, trailerLabel, starBadge };
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  const isMobile = windowWidth < 640;
  const spacing = isMobile ? 130 : 220;

  return (
    <div className="relative w-full py-6 select-none">
      {/* Background Soft Glow - GPU-friendly, pure opacity */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full pointer-events-none opacity-25 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)'
        }}
      />

      {/* 3D Glassy Deck / Coverflow Area (Hardware-Accelerated 3D Transform) */}
      <div 
        className="relative h-[480px] sm:h-[530px] w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ 
          perspective: '1200px',
          WebkitPerspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => { isPointerDown.current = false; }}
      >
        {projects.map((project, index) => {
          // Calculate relative circular diff
          let diff = index - activeIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isCenter = diff === 0;
          const absDiff = Math.abs(diff);

          // Only render visible adjacent cards in the deck (maximum 5 cards in DOM)
          if (absDiff > 2) return null;

          const translateX = diff * spacing;
          const translateZ = isCenter ? 50 : -Math.min(absDiff * 90, 190);
          const rotateY = diff * (isMobile ? -14 : -18);
          const scale = isCenter ? 1 : Math.max(0.74, 1 - absDiff * 0.14);
          const opacity = isCenter ? 1 : Math.max(0.28, 0.9 - absDiff * 0.35);
          const zIndex = 30 - absDiff * 10;

          const { year, categoryLabel, categoryIcon, trailerLabel, starBadge } = getProjectMeta(project);

          return (
            <div
              key={project.id}
              onClick={() => {
                if (isCenter) {
                  onSelectProject(project);
                } else {
                  sounds.playPop(540);
                  setActiveIndex(index);
                }
              }}
              style={{
                transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'transform, opacity',
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className={`absolute cursor-pointer select-none ${
                isCenter 
                  ? 'w-[290px] sm:w-[350px] md:w-[380px]' 
                  : 'w-[280px] sm:w-[340px] md:w-[360px] pointer-events-auto'
              }`}
            >
              {/* Glassmorphic Card Shell - Butter Smooth: High-contrast Dark Glass with zero GPU blur-lag */}
              <div className={`relative rounded-3xl p-4 sm:p-5 transition-colors duration-300 ${
                isCenter
                  ? 'bg-slate-900/95 border border-red-500/30 shadow-[0_20px_50px_-10px_rgba(239,68,68,0.2)] ring-1 ring-red-500/40'
                  : 'bg-[#0a0f1d]/90 border border-white/10 shadow-xl'
              }`}>
                {/* Poster Container */}
                <div className="relative h-[230px] sm:h-[260px] w-full rounded-2xl overflow-hidden bg-slate-950 group">
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Bar on Poster */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] font-semibold text-white tracking-wide shadow-sm">
                      {categoryIcon}
                      <span>{categoryLabel}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-300 shadow-sm">
                      {starBadge}
                    </span>
                  </div>

                  {/* Center Glassy Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`w-14 h-14 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shadow-xl ring-4 ring-white/10 transition-all duration-300 ${
                      isCenter ? 'group-hover:scale-115 group-hover:bg-white/30' : 'opacity-70'
                    }`}>
                      <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom "Watch Trailer / Buka Demo" Pill Button (Direct TikTok Match) */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/80 hover:bg-white text-white hover:text-slate-950 text-xs font-bold border border-white/30 hover:border-white transition-all shadow-lg hover:scale-105 cursor-pointer active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{trailerLabel}</span>
                    </button>
                  </div>
                </div>

                {/* Card Information Section */}
                <div className="mt-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    
                    {/* Metadata line: Year • Category • Rating (TikTok match) */}
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-300 font-medium">
                      <span>{year}</span>
                      <span className="text-slate-500">•</span>
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{categoryLabel}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-amber-400 font-semibold">{starBadge}</span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Tags / Action */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[180px] sm:max-w-[220px]">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-cyan-300 hover:text-white transition cursor-pointer active:scale-95"
                      title="Lihat Detail Lengkap"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Floating Side Arrow Chevrons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/85 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 z-40 cursor-pointer shadow-xl active:scale-95"
          title="Karya Sebelumnya (←)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/85 hover:bg-red-600 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 z-40 cursor-pointer shadow-xl active:scale-95"
          title="Karya Berikutnya (→)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING GLASSY DOCK / MEDIA PLAYER BAR (Identical to TikTok Reference)   */}
      {/* ========================================================================= */}
      <div className="mt-4 flex justify-center px-4">
        <div className="w-full max-w-xl rounded-full bg-slate-900/90 backdrop-blur-xl border border-red-500/30 shadow-[0_15px_40px_-10px_rgba(239,68,68,0.2)] px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left Media Controls: Prev, Play/Pause Autoplay, Next */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-90"
              title="Karya Sebelumnya (Keyboard: ←)"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setIsAutoplay(!isAutoplay);
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-md cursor-pointer active:scale-90 ${
                isAutoplay
                  ? 'bg-red-600 ring-2 ring-red-400/60 scale-105 shadow-red-500/40'
                  : 'bg-white/15 hover:bg-white/25 border border-white/20 hover:scale-105'
              }`}
              title={isAutoplay ? 'Jeda Putar Otomatis' : 'Putar Otomatis (Reel Mode)'}
            >
              {isAutoplay ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-90"
              title="Karya Berikutnya (Keyboard: →)"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Center Info: Mini Thumbnail + Title + Animated Equalizer Bars */}
          <div 
            onClick={() => onSelectProject(activeProject)}
            className="flex items-center gap-2.5 min-w-0 flex-1 max-w-[220px] sm:max-w-[260px] px-2 py-1 rounded-xl hover:bg-white/5 transition cursor-pointer"
            title="Klik untuk membuka detail proyek"
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover border border-white/20 shrink-0 shadow-sm"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate leading-tight">
                {activeProject.title}
              </span>
              <span className="text-[10px] text-slate-400 truncate mt-0.5">
                {activeProject.category === 'film' 
                  ? '🎬 Film & Sinema' 
                  : activeProject.category === 'fotografi' 
                  ? '📷 Fotografi' 
                  : '🌐 Web Project'}
              </span>
            </div>

            {/* GPU-Accelerated Equalizer Bars (Zero reflows, Pure CSS scaleY) */}
            <div className="hidden sm:flex items-end gap-0.5 h-4 ml-auto pr-1 shrink-0">
              {['animate-eq-1', 'animate-eq-2', 'animate-eq-3', 'animate-eq-4', 'animate-eq-5', 'animate-eq-6'].map((animClass, i) => (
                <div
                  key={i}
                  className={`w-0.5 h-3.5 rounded-full ${
                    isAutoplay 
                      ? `${animClass} bg-gradient-to-t from-red-500 to-blue-400` 
                      : 'bg-slate-600 scale-y-25'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Controls: Index Counter + Toggle View Mode + Inspect */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Slide Index Badge */}
            <span className="text-[11px] font-mono font-bold text-slate-400 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hidden sm:inline">
              {activeIndex + 1}/{total}
            </span>

            {/* Toggle View Mode Button */}
            {onToggleViewMode && (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onToggleViewMode();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white text-xs font-semibold transition cursor-pointer active:scale-95"
                title="Beralih ke Tampilan Grid Galeri"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Grid</span>
              </button>
            )}

            {/* Open Fullscreen Modal */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onSelectProject(activeProject);
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition cursor-pointer active:scale-95"
              title="Perbesar Layar / Tonton"
            >
              <Maximize2 className="w-4 h-4 text-pink-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
