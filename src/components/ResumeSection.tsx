import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  ChevronRight,
  Star,
  Layers,
  HeartHandshake,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialEducation, initialExperience } from '../data/initialData';
import type { EducationItem, ExperienceItem, ProfileData } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';

interface ResumeSectionProps {
  profile: ProfileData;
  education?: EducationItem[];
  experience?: ExperienceItem[];
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  profile,
  education = initialEducation,
  experience = initialExperience
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'experience' | 'skills'>('all');
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.preventDefault();
    sounds.playSuccess();

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }

    setCvDownloaded(true);

    const link = document.createElement('a');
    link.href = '/Muhammad_Zaki_Khairi_CV.pdf';
    link.download = 'CV_Muhammad_Zaki_Khairi.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setCvDownloaded(false);
    }, 3500);
  };

  const technicalSkills = [
    "Microsoft Office",
    "Google Workspace",
    "Canva",
    "Zoom Meeting Management",
    "Social Media Management",
    "Sistem Basis Data (SQL)",
    "Komputasi Big Data",
    "Teknologi Kecerdasan Artifisial",
    "Teknik Pemrograman Terstruktur",
    "Python & JavaScript"
  ];

  const softSkills = [
    "Team Coordinator",
    "Administrative Support",
    "Problem Solving",
    "Leadership",
    "Communication",
    "Creative Direction",
    "Content Strategy"
  ];

  return (
    <section id="experience" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/90 border-2 border-[#0B1440] text-cyan-300 text-xs font-mono shadow-[2px_2px_0px_#0B1440]">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>// DOSSIER & TRACK RECORD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-anton text-white tracking-wide uppercase spidey-text-3d">
          PENDIDIKAN, ORGANISASI & KEAHLIAN
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Dedikasi akademik di Universitas Gunadarma (IPK 3.75), kepemimpinan Creative Media Lebak Expo University, dan keahlian media sinematik.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: 'all', label: '★ SEMUA RINGKASAN' },
          { id: 'education', label: '🎓 PENDIDIKAN RESMI' },
          { id: 'experience', label: '💼 PENGALAMAN & ORGANISASI' },
          { id: 'skills', label: '⚡ KEAHLIAN & TOOLS' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              sounds.playClick();
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-anton uppercase italic tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#e62429] text-white border-2 border-[#0B1440] shadow-[3px_3px_0px_#0B1440] scale-105'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-2 border-[#0B1440]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline Cards (Education & Experience) */}
        <div className={`${activeTab === 'skills' ? 'hidden' : 'lg:col-span-8'} space-y-8`}>
          {/* EDUCATION BLOCK */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span>Riwayat Pendidikan Resmi</span>
              </div>

              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition shadow-xl"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase block">
                        {edu.institution}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                        {edu.degree}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {edu.score && (
                        <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1 shadow-sm shadow-emerald-500/20">
                          <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                          <span>{edu.scoreLabel || 'Skor'}: {edu.score}</span>
                        </div>
                      )}
                      <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {edu.description}
                    </p>
                  )}

                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="pt-3 border-t border-white/10">
                      <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                        Mata Kuliah Relevan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.relevantCourses.map((course, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EXPERIENCE BLOCK */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span>Pengalaman Organisasi & Kepemimpinan</span>
              </div>

              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-pink-500/40 transition shadow-xl"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-pink-400" />
                        <span className="text-[11px] font-mono text-pink-400 tracking-wider uppercase">
                          {exp.organization}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition mt-0.5">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {exp.badge && (
                        <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold">
                          {exp.badge}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  )}

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block">
                      Tanggung Jawab Utama:
                    </span>
                    {exp.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Skills Matrix & Quick Contact */}
        <div className={`${activeTab === 'skills' ? 'lg:col-span-12' : 'lg:col-span-4'} space-y-6`}>
          {/* Technical Skills Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-base">Technical Skills</h3>
            </div>
            <p className="text-xs text-slate-400">
              Keahlian teknis dan perangkat lunak yang dikuasai untuk mendukung manajemen informasi dan produksi kreatif.
            </p>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 text-xs font-medium transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-base">Soft Skills & Leadership</h3>
            </div>
            <p className="text-xs text-slate-400">
              Kapasitas koordinasi tim, pemecahan masalah adaptif, dan komunikasi lintas divisi.
            </p>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((soft) => (
                <span
                  key={soft}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-medium transition"
                >
                  {soft}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Fast-Track Card (WhatsApp & Email from CV) */}
          <div className="glass-panel p-6 rounded-3xl border border-pink-500/30 bg-gradient-to-br from-pink-950/30 to-purple-950/20 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <h3 className="font-bold text-white text-base">Hubungi Langsung</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tertarik untuk berkolaborasi, proyek kreatif, maupun peluang profesional?
            </p>

            <div className="space-y-2 pt-1">
              {/* Interactive Download CV Button */}
              <button
                onClick={handleDownloadCv}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition group cursor-pointer border ${
                  cvDownloaded
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 hover:from-pink-500/30 hover:to-cyan-500/30 border-pink-500/40 text-pink-200 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {cvDownloaded ? (
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  ) : (
                    <Download className="w-4 h-4 text-pink-400 animate-bounce" />
                  )}
                  <span>{cvDownloaded ? 'CV Berhasil Diunduh!' : 'Unduh CV Lengkap (PDF)'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </button>

              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/${(profile.phone || '081919200602').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo ${profile.name}, saya melihat portofolio Anda dan tertarik untuk berdiskusi.`)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {profile.phone || '081919200602'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </a>

              {/* Email direct */}
              <a
                href={`mailto:${profile.email}`}
                onClick={() => sounds.playClick()}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition shrink-0" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 font-mono">
              📍 {profile.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
