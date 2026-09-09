import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Play, Pause, Music2, Terminal, Download, CheckCircle2, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ProfileData } from '../types/portfolio';
import { InteractiveLanyard } from './InteractiveLanyard';
import { InstagramIcon } from './icons/InstagramIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { GithubIcon } from './icons/GithubIcon';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  profile: ProfileData;
}

// Synchronized Role & Narrative Pairs
const ROLE_ITEMS = [
  {
    title: "Film Director & Producer",
    bio: "Sutradara film 'TANAH JAWARA' dan Produser film peraih Juara 1 Tingkat Provinsi 'PLUS MINUS' (SMANTINEMA). Berpengalaman dalam penyutradaraan, manajemen produksi film, visual storytelling, dan media digital kreatif."
  },
  {
    title: "S1 Sistem Informasi Gunadarma",
    bio: "Mahasiswa aktif S1 Sistem Informasi Universitas Gunadarma dengan IPK 3,75. Mendalami teknologi informasi, arsitektur basis data, komputasi big data, dan rekayasa kecerdasan artifisial."
  },
  {
    title: "Wakil Ketua Creative Media",
    bio: "Wakil Ketua Creative Media Lebak Expo University. Memimpin strategi komunikasi visual, visual branding terpadu, kampanye promosi digital, dan supervisi konten kreatif lintas divisi."
  },
  {
    title: "Visual Storyteller & Brand Designer",
    bio: "Mengombinasikan kepekaan sinematografi, estetika visual modern, dan narasi cerita untuk menghasilkan karya multimedia yang berkarakter kuat serta memikat audiens."
  },
  {
    title: "SMANTINEMA Creative Leader",
    bio: "Pemimpin dan penggerak komunitas sinematografi SMANTINEMA SMAN 3 Rangkasbitung. Berpengalaman memproduksi film fiksi dan dokumenter berkualitas tinggi peraih penghargaan."
  }
];

export const HeroSection: React.FC<HeroProps> = ({ profile }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);
  const [cvDownloaded, setCvDownloaded] = useState(false);

  // Reliable interval for role & bio synchronization
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLE_ITEMS.length);
        setIsFading(false);
      }, 250);
    }, 3500);

    return () => clearInterval(interval);
  }, [ROLE_ITEMS.length]);

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

    // Trigger actual download of the real uploaded CV
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

  const toggleMusic = () => {
    setIsPlayingLofi(!isPlayingLofi);
    sounds.playPop(isPlayingLofi ? 400 : 750);
  };

  return (
    <section id="about" className="relative min-h-[calc(100vh-4.5rem)] pt-20 pb-6 px-4 flex items-center justify-center overflow-hidden">
      {/* Dynamic Animated Color Glows in the background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-pink-600/25 via-purple-600/25 to-cyan-500/25 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-10 w-[260px] h-[260px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Introduction & Interactive CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-4.5">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-300">
                {profile.status}
              </span>
            </div>

            <a
              href="#experience"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition"
            >
              <span>🎓 Gunadarma • IPK 3.75</span>
            </a>
          </div>

          {/* Main Headline (Prominent, Bold & Balanced) */}
          <div className="space-y-1.5 w-full select-none cursor-default">
            <h2 className="text-slate-400 font-mono text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Halo Semua, Saya {profile.name}</span>
            </h2>
            <div className="min-h-[3.25rem] sm:min-h-[4rem] flex items-center justify-center lg:justify-start overflow-hidden">
              <h1 className={`text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-tight transition-all duration-300 ${
                isFading ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
              }`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
                  {ROLE_ITEMS[roleIndex].title}
                </span>
              </h1>
            </div>
          </div>

          {/* Subtext (Dynamically Synchronized with Headline Above) */}
          <div className={`transition-all duration-300 min-h-[3.5rem] sm:min-h-[3.75rem] flex items-center select-none cursor-default ${
            isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
          }`}>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {ROLE_ITEMS[roleIndex].bio}
            </p>
          </div>

          {/* Action Buttons (Responsive 2x2 Grid on Mobile, Flex on Desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1 w-full max-w-sm sm:max-w-none">
            <a
              href="#projects"
              onClick={() => sounds.playClick()}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition cursor-pointer text-center"
            >
              <span>Jelajahi Proyek</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            {/* Interactive CV Download Button */}
            <button
              onClick={handleDownloadCv}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md text-center ${
                cvDownloaded
                  ? 'bg-emerald-500 text-slate-950 scale-105 shadow-emerald-500/30'
                  : 'bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-white hover:scale-105'
              }`}
            >
              {cvDownloaded ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                  <span>Diunduh!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-bounce" />
                  <span>Unduh CV</span>
                </>
              )}
            </button>

            <a
              href="#experience"
              onClick={() => sounds.playClick()}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl glass-card text-white font-semibold text-xs sm:text-sm hover:border-cyan-500/40 hover:scale-105 transition text-center"
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>Resume</span>
            </a>

            <a
              href="#guestbook"
              onClick={() => sounds.playClick()}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl glass-card text-white font-semibold text-xs sm:text-sm hover:border-pink-500/40 hover:scale-105 transition text-center"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
              <span>Buku Tamu</span>
            </a>
          </div>

          {/* Official Social Media Channels (with Official Logos) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center">
              Sosmed:
            </span>

            {/* Instagram */}
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              title="Instagram: @zakkhairi_"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-pink-500/20 hover:border-pink-500/60 hover:bg-pink-500/10 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition">
                @zakkhairi_
              </span>
            </a>

            {/* TikTok */}
            <a
              href={profile.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              title="TikTok: @_iniizaki"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-cyan-500/10 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <TiktokIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition">
                @_iniizaki
              </span>
            </a>

            {/* YouTube */}
            <a
              href={profile.socials.youtube || "https://www.youtube.com/@zakkhairi"}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              title="YouTube: @zakkhairi"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-red-500/20 hover:border-red-500/60 hover:bg-red-500/10 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <YoutubeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition">
                YouTube
              </span>
            </a>

            {/* GitHub */}
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              title="GitHub: @zakikhairi"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-purple-500/20 hover:border-purple-500/60 hover:bg-purple-500/10 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition">
                GitHub
              </span>
            </a>
          </div>

          {/* Mini Lo-Fi Beat Widget */}
          <div className="pt-1 w-full max-w-sm">
            <div className="glass-card rounded-2xl p-2.5 border border-white/10 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMusic}
                  className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md hover:scale-105 transition cursor-pointer"
                >
                  {isPlayingLofi ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Music2 className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-xs font-bold text-white">Lo-Fi Coding Vibe</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isPlayingLofi ? 'Memutar Suasana Fokus • 84 BPM' : 'Putar musik fokus'}
                  </p>
                </div>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-6 pr-2">
                {[12, 18, 14, 22, 13, 17, 10].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlayingLofi ? `${Math.floor(Math.random() * 16 + 6)}px` : '4px',
                      transition: 'height 0.2s ease-in-out'
                    }}
                    className={`w-1 rounded-full ${
                      isPlayingLofi
                        ? 'bg-gradient-to-t from-cyan-400 to-pink-400'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Lanyard Interactive Badge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <InteractiveLanyard profile={profile} />
        </div>
      </div>
    </section>
  );
};
