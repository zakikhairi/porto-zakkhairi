import React, { useState } from 'react';
import { ExternalLink, Sparkles, FolderGit2, X, CheckCircle2, Play, Clapperboard } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { GithubIcon } from './icons/GithubIcon';
import { sounds } from '../utils/soundEffects';

interface ProjectsProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'film' | 'web' | 'mobile' | 'ai' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = [
    { id: 'all', label: 'Semua Karya' },
    { id: 'film', label: '🎬 Film & Sinema' },
    { id: 'web', label: 'Web Applications' },
    { id: 'ai', label: 'AI & 3D' },
    { id: 'fullstack', label: 'Fullstack' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleCardClick = (proj: Project) => {
    if (proj.category === 'film' || proj.youtubeId) {
      sounds.playCinema();
    } else {
      sounds.playPop(580);
    }
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
          Koleksi karya film sinematik peraih penghargaan, web aplikasi, visualisasi interaktif, dan sistem TI.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id as typeof activeFilter);
                sounds.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleCardClick(project)}
            className="group relative rounded-3xl glass-card border border-white/10 overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
          >
            {/* Top Image Banner with Gradient Overlay */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

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
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 border ${
                  project.category === 'film'
                    ? 'bg-red-950/80 border-red-500/40 text-red-300'
                    : 'bg-slate-900/80 border-white/20 text-white'
                }`}>
                  {project.category === 'film' && <Clapperboard className="w-3 h-3 text-red-400" />}
                  {project.category}
                </span>
              </div>

              {/* Action Icons */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.youtubeId ? (
                  <span className="p-1.5 rounded-lg bg-red-600 text-white shadow-md">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </span>
                ) : project.demoUrl ? (
                  <span className="p-1.5 rounded-lg bg-slate-900/80 text-cyan-400 hover:text-white">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                ) : null}
                {project.githubUrl && (
                  <span className="p-1.5 rounded-lg bg-slate-900/80 text-purple-400 hover:text-white">
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
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mini Cinema Player / Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          {/* Ambient Cinema Theater Glow */}
          <div className={`absolute inset-0 pointer-events-none opacity-40 blur-[130px] ${
            selectedProject.category === 'film'
              ? 'bg-gradient-to-b from-red-600 via-amber-600 to-purple-900'
              : 'bg-gradient-to-b from-cyan-600 via-purple-600 to-pink-900'
          }`} />

          <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/20 p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto z-10 bg-[#090d16]/95">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedProject(null);
                sounds.playClick();
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cinema Header */}
            {selectedProject.category === 'film' && (
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 text-xs font-mono text-red-300">
                <Clapperboard className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="uppercase tracking-widest font-bold">Cinema Mode • SMANTINEMA Productions</span>
              </div>
            )}

            {/* Modal Media: Responsive YouTube Player Embed or Image */}
            {selectedProject.youtubeId ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-black border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.25)]">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0`}
                  title={selectedProject.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="h-60 rounded-2xl overflow-hidden mb-5 relative border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600 text-white">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-2xl font-extrabold text-white">
                    {selectedProject.title}
                  </h3>
                  <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-amber-500/30 text-amber-300">
                    {selectedProject.tagline}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {selectedProject.category === 'film' ? '🎬 Kredit & Peran Produksi' : '⚡ Teknologi yang Digunakan'}
                </h4>
                <div className="flex flex-wrap gap-2">
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

              {/* Action Buttons in Modal */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {selectedProject.youtubeId ? (
                  <a
                    href={selectedProject.demoUrl || `https://youtu.be/${selectedProject.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/25 hover:scale-105 active:scale-95 transition"
                  >
                    <Play className="w-4 h-4 fill-white text-white" />
                    <span>Buka Tautan YouTube Asli</span>
                  </a>
                ) : selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    <span>Buka Live Demo</span>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
