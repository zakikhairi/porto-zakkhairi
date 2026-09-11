import React, { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, FolderGit2, X, CheckCircle2, Play, Clapperboard, Camera, ChevronLeft, ChevronRight, LayoutGrid, Film } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { GithubIcon } from './icons/GithubIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { sounds } from '../utils/soundEffects';
import { GlassyProjectsCarousel } from './GlassyProjectsCarousel';

interface ProjectsProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'film' | 'fotografi' | 'web' | 'mobile' | 'ai' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cardSlideIndex, setCardSlideIndex] = useState<{ [projectId: string]: number }>({});
  const [modalSlideIndex, setModalSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Keyboard Escape listener & body scroll lock when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
        sounds.playClick();
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filters = [
    { id: 'all', label: 'Semua Karya' },
    { id: 'film', label: '🎬 Film & Sinema' },
    { id: 'fotografi', label: '📷 Fotografi' },
    { id: 'web', label: 'Web Applications' },
    { id: 'ai', label: 'AI & 3D' },
    { id: 'fullstack', label: 'Fullstack' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const getProjectImages = (proj: Project): string[] => {
    if (proj.images && proj.images.length > 0) return proj.images;
    if (proj.slides && proj.slides.length > 0) return proj.slides.map(s => s.image);
    return [proj.image];
  };

  const handleCardClick = (proj: Project) => {
    if (proj.category === 'film' || proj.youtubeId) {
      sounds.playCinema();
    } else if (proj.category === 'fotografi') {
      sounds.playCameraShutter();
    } else {
      sounds.playPop(580);
    }
    setModalSlideIndex(cardSlideIndex[proj.id] || 0);
    setSelectedProject(proj);
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Showcase Unggulan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Proyek Terpilih & Eksperimen
        </h2>
        <p className="text-slate-400 text-sm">
          Koleksi karya film sinematik, karya fotografi peraih juara, web aplikasi interaktif, dan sistem TI.
        </p>

        {/* Filter Buttons & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id as typeof activeFilter);
                  sounds.playClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* View Mode Switcher: 3D Deck (TikTok Style) vs Grid */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-md shadow-lg shrink-0">
            <button
              type="button"
              onClick={() => {
                setViewMode('carousel');
                sounds.playClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan 3D Glassy Deck (ala TikTok UI)"
            >
              <Film className="w-3.5 h-3.5" />
              <span>3D Deck</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('grid');
                sounds.playClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan Grid Galeri Klasik"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Showcase View: 3D Glassy Deck (Default) vs Classic Grid */}
      {viewMode === 'carousel' ? (
        <GlassyProjectsCarousel
          projects={filteredProjects}
          onSelectProject={handleCardClick}
          onToggleViewMode={() => setViewMode('grid')}
        />
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const images = getProjectImages(project);
          const currentSlide = cardSlideIndex[project.id] || 0;
          const isMultiSlide = images.length > 1;

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group relative rounded-3xl glass-card card-shine-container border border-white/10 overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-500/40 transition-all duration-300 shadow-xl"
            >
              {/* Top Image Banner with Gradient Overlay */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={images[currentSlide] || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Multi-Slide Navigation Arrows for Card */}
                {isMultiSlide && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        setCardSlideIndex(prev => ({
                          ...prev,
                          [project.id]: (currentSlide - 1 + images.length) % images.length
                        }));
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-pink-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition hover:scale-110 z-20 cursor-pointer shadow-lg"
                      title="Slide Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        setCardSlideIndex(prev => ({
                          ...prev,
                          [project.id]: (currentSlide + 1) % images.length
                        }));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-pink-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition hover:scale-110 z-20 cursor-pointer shadow-lg"
                      title="Slide Berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Slide Dots Indicator */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 z-10 pointer-events-none">
                      {images.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === currentSlide ? 'bg-pink-400 w-4' : 'bg-white/40 w-1.5'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] font-mono text-slate-300 font-bold ml-1">
                        {currentSlide + 1}/{images.length}
                      </span>
                    </div>
                  </>
                )}

                {/* Play Badge Overlay for Videos */}
                {project.youtubeId && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform backdrop-blur-sm border border-white/40 ring-4 ring-red-600/30 animate-pulse">
                      <Play className="w-6 h-6 ml-0.5 fill-white text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/80 border border-white/20 text-white text-[11px] font-bold tracking-wide backdrop-blur-md flex items-center gap-1.5 shadow-lg group-hover:border-red-500/60 transition">
                      <Clapperboard className="w-3 h-3 text-red-400" />
                      <span>Mode Bioskop</span>
                    </span>
                  </div>
                )}

                {/* Category Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 border shadow-sm ${
                    project.category === 'film'
                      ? 'bg-red-950/85 border-red-500/40 text-red-300'
                      : project.category === 'fotografi'
                      ? 'bg-pink-950/85 border-pink-500/40 text-pink-300'
                      : 'bg-slate-900/85 border-white/20 text-white'
                  }`}>
                    {project.category === 'film' && <Clapperboard className="w-3 h-3 text-red-400" />}
                    {project.category === 'fotografi' && <Camera className="w-3 h-3 text-pink-400" />}
                    {project.category}
                  </span>
                </div>

                {/* Action / Multi-slide / Vercel Live Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  {/* Glowing Live on Vercel badge */}
                  {project.demoUrl?.includes('vercel.app') && (
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span>Vercel Live</span>
                    </span>
                  )}
                  {isMultiSlide && (
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-300 text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                      <Camera className="w-3 h-3 text-pink-400" />
                      <span>2 Slide</span>
                    </span>
                  )}
                  {project.youtubeId ? (
                    <span className="p-1.5 rounded-lg bg-red-600 text-white shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </span>
                  ) : project.demoUrl ? (
                    <span className="p-1.5 rounded-lg bg-slate-900/80 text-cyan-400 hover:text-white border border-cyan-500/30 group-hover:scale-110 transition-transform" title={project.demoUrl.includes('vercel.app') ? 'Buka Vercel Web App' : 'Buka Live Demo'}>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  ) : null}
                  {project.githubUrl && (
                    <span className="p-1.5 rounded-lg bg-slate-900/80 text-purple-400 hover:text-white border border-purple-500/30 group-hover:scale-110 transition-transform" title="Source Code GitHub">
                      <GithubIcon className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white group-hover:text-pink-400 transition">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Quick Stats or Info */}
                {project.stats && (
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      {project.stats.map((st, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="text-white font-bold">{st.value}</span>
                          <span className="text-[10px] text-slate-500">{st.label}</span>
                        </div>
                      ))}
                    </div>

                    {project.category === 'film' && (
                      <span className="text-[11px] font-bold text-red-400 flex items-center gap-1 group-hover:text-red-300 transition">
                        <span>Nonton</span>
                        <Play className="w-3 h-3 fill-red-400 text-red-400" />
                      </span>
                    )}
                    {project.category === 'fotografi' && (
                      <span className="text-[11px] font-bold text-pink-400 flex items-center gap-1 group-hover:text-pink-300 transition">
                        <span>Lihat Slide</span>
                        <Camera className="w-3 h-3 text-pink-400" />
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Glowing bottom accent line that slides in on hover */}
              <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
        </div>
      )}

      {/* Mini Cinema Player / Project Detail Modal */}
      {selectedProject && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProject(null);
              sounds.playClick();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-fadeIn"
        >
          {/* Ambient Glow */}
          <div className={`absolute inset-0 pointer-events-none opacity-40 blur-[130px] ${
            selectedProject.category === 'film'
              ? 'bg-gradient-to-b from-red-600 via-amber-600 to-purple-900'
              : selectedProject.category === 'fotografi'
              ? 'bg-gradient-to-b from-pink-600 via-rose-600 to-amber-900'
              : 'bg-gradient-to-b from-cyan-600 via-purple-600 to-pink-900'
          }`} />

          {/* Floating Close Button for easy access on any device */}
          <button
            type="button"
            onClick={() => {
              setSelectedProject(null);
              sounds.playClick();
            }}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[70] p-2.5 rounded-full bg-slate-900/90 hover:bg-rose-600 text-white border border-white/20 shadow-2xl transition hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md flex items-center justify-center group"
            title="Tutup Modal (Esc)"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>

          {/* Modal Dialog Card: structured with Fixed Header + Scrollable Body */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10 bg-[#090d16]/98"
          >
            {/* Sticky/Fixed Modal Header: Always visible at the top, never scrolls away! */}
            <div className="shrink-0 px-4 sm:px-6 py-3 bg-slate-900/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20">
              <div className="flex items-center gap-2 min-w-0 pr-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 border shrink-0 ${
                  selectedProject.category === 'film'
                    ? 'bg-red-950/85 border-red-500/40 text-red-300'
                    : selectedProject.category === 'fotografi'
                    ? 'bg-pink-950/85 border-pink-500/40 text-pink-300'
                    : 'bg-slate-800 border-white/20 text-white'
                }`}>
                  {selectedProject.category === 'film' && <Clapperboard className="w-3 h-3 text-red-400" />}
                  {selectedProject.category === 'fotografi' && <Camera className="w-3 h-3 text-pink-400" />}
                  {selectedProject.category}
                </span>
                <span className="text-sm sm:text-base font-bold text-white truncate">
                  {selectedProject.title}
                </span>
              </div>

              {/* Prominent Close Button in Header */}
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  sounds.playClick();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold transition cursor-pointer shadow-md shrink-0 active:scale-95"
                title="Tutup (Esc)"
              >
                <X className="w-4 h-4" />
                <span>Tutup</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Cinema Header for films */}
              {selectedProject.category === 'film' && (
                <div className="flex items-center gap-2 pb-1 text-xs font-mono text-red-300">
                  <Clapperboard className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="uppercase tracking-widest font-bold">Cinema Mode • SMANTINEMA Productions</span>
                </div>
              )}

              {/* Modal Media: Responsive YouTube Player Embed OR Multi-Slide Viewer OR Image */}
              {selectedProject.youtubeId ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.25)]">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0`}
                    title={selectedProject.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : selectedProject.slides && selectedProject.slides.length > 1 ? (
                <div className="space-y-3">
                  {/* Main Slide Stage: Compact & Perfectly proportioned for Mobile */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.2)] flex items-center justify-center min-h-[220px] max-h-[300px] sm:max-h-[380px]">
                    <img
                      src={selectedProject.slides[modalSlideIndex].image}
                      alt={selectedProject.slides[modalSlideIndex].caption || selectedProject.title}
                      className="max-h-[280px] sm:max-h-[360px] w-full object-contain mx-auto transition-all duration-300 select-none"
                    />

                    {/* Prev / Next Slide Buttons */}
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setModalSlideIndex(prev => (prev - 1 + selectedProject.slides!.length) % selectedProject.slides!.length);
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-pink-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-xl cursor-pointer z-20"
                      title="Slide Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setModalSlideIndex(prev => (prev + 1) % selectedProject.slides!.length);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-pink-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition hover:scale-110 shadow-xl cursor-pointer z-20"
                      title="Slide Berikutnya"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Slide Indicator Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/40 text-pink-300 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg z-20">
                      <Camera className="w-3.5 h-3.5 text-pink-400" />
                      <span>Slide {modalSlideIndex + 1}/{selectedProject.slides.length}</span>
                    </div>

                    {/* Quick Link to Instagram on current slide */}
                    {selectedProject.slides[modalSlideIndex].instagramUrl && (
                      <a
                        href={selectedProject.slides[modalSlideIndex].instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sounds.playClick()}
                        className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:scale-105 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md transition z-20"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        <span>Instagram</span>
                      </a>
                    )}

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {selectedProject.slides[modalSlideIndex].caption}
                      </p>
                      {selectedProject.slides[modalSlideIndex].subtitle && (
                        <p className="text-[10px] sm:text-xs text-pink-300 font-mono mt-0.5 truncate">
                          {selectedProject.slides[modalSlideIndex].subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2 Slide Selectors / Tabs */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {selectedProject.slides.map((slide, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setModalSlideIndex(idx);
                        }}
                        className={`p-2 sm:p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                          modalSlideIndex === idx
                            ? 'bg-pink-500/20 border-pink-500/60 shadow-lg shadow-pink-500/10 scale-[1.01]'
                            : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.caption}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-xl shrink-0 border border-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <span className={`text-[11px] sm:text-xs font-bold block truncate ${
                            modalSlideIndex === idx ? 'text-pink-300' : 'text-slate-200'
                          }`}>
                            {idx === 0 ? 'Foto 1: Juara Harapan' : 'Foto 2: Penenun Baduy'}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate mt-0.5">
                            {idx === 0 ? 'Pengumuman Resmi Lomba' : 'Karya Peserta No. 23'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-52 sm:h-64 rounded-2xl overflow-hidden relative border border-white/10">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600 text-white">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="space-y-3.5 pt-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {selectedProject.title}
                    </h3>
                    <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-amber-500/20 border border-pink-500/30 text-pink-300">
                      {selectedProject.tagline}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {selectedProject.category === 'film' 
                      ? '🎬 Kredit & Peran Produksi' 
                      : selectedProject.category === 'fotografi'
                      ? '📸 Informasi & Kategori'
                      : '⚡ Teknologi yang Digunakan'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-white/10 text-cyan-300 font-mono text-xs border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Sorotan Karya
                  </h4>
                  <div className="space-y-2 text-xs text-slate-300 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                    {selectedProject.category === 'film' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Karya Sinematik Original diproduksi bersama SMANTINEMA SMAN 3 Rangkasbitung</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                          <span>Disutradarai / Diproduseri langsung oleh Muhammad Zaki Khairi</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Pemutaran video YouTube interaktif kualitas Full HD langsung di website</span>
                        </div>
                      </>
                    ) : selectedProject.category === 'fotografi' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                          <span>Juara Harapan 1 Lomba Fotografi Tingkat Nasional History Fair 2022 (UNSRI)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Karya orisinal mengangkat budaya lokal penenun kain tradisional suku Baduy, Lebak - Banten</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Terdokumentasi dan diumumkan resmi melalui akun Instagram @historyfairunsri & @himapes_fkipunsri</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Arsitektur kode terstruktur dan performa optimal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Antarmuka responsif ramah mobile & tablet</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons in Modal (with wide Tutup button!) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/10">
                  {selectedProject.youtubeId ? (
                    <a
                      href={selectedProject.demoUrl || `https://youtu.be/${selectedProject.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClick()}
                      className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/25 hover:scale-105 active:scale-95 transition"
                    >
                      <Play className="w-4 h-4 fill-white text-white" />
                      <span>Buka Tautan YouTube Asli</span>
                    </a>
                  ) : selectedProject.category === 'fotografi' && selectedProject.slides ? (
                    <>
                      <a
                        href={selectedProject.slides[0].instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sounds.playClick()}
                        className="flex-1 min-w-[170px] flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition"
                      >
                        <InstagramIcon className="w-4 h-4" />
                        <span>IG: Pengumuman Juara</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={selectedProject.slides[1].instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sounds.playClick()}
                        className="flex-1 min-w-[170px] flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition"
                      >
                        <InstagramIcon className="w-4 h-4" />
                        <span>IG: Foto Baduy</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </>
                  ) : selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClick()}
                      className="flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition"
                    >
                      <span>
                        {selectedProject.demoUrl.includes('vercel.app')
                          ? 'Buka Web App (Vercel)'
                          : 'Buka Live Demo'}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playClick()}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {/* Dedicated Close Button at bottom so user doesn't have to scroll back up */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(null);
                      sounds.playClick();
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-rose-600 hover:text-white text-slate-300 font-bold text-xs border border-white/10 transition cursor-pointer active:scale-95"
                    title="Tutup Jendela (Esc)"
                  >
                    <X className="w-4 h-4" />
                    <span>Tutup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
