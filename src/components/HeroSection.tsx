import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, Terminal } from 'lucide-react';
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

// Synchronized Role & Narrative Pairs (Spider-Verse Multiverse Style)
const ROLE_ITEMS = [
  {
    title: "🕷️ Friendly Neighborhood Director",
    bio: "\"With great code and cinematography comes great storytelling.\" Sutradara film 'TANAH JAWARA' dan Produser film peraih Juara 1 Tingkat Provinsi 'PLUS MINUS' (SMANTINEMA). Berpengalaman dalam visual storytelling, penyutradaraan, dan media digital kreatif."
  },
  {
    title: "🕸️ S1 Sistem Informasi Gunadarma",
    bio: "Mahasiswa aktif S1 Sistem Informasi Universitas Gunadarma dengan IPK 3,75. Mendalami arsitektur sistem informasi, rekayasa web modern, basis data cerdas, dan komputasi artificial intelligence."
  },
  {
    title: "🎬 Film Director & Producer",
    bio: "Sutradara film 'TANAH JAWARA' & Produser film Juara 1 Tingkat Provinsi 'PLUS MINUS' (SMANTINEMA). Mengombinasikan estetika sinematik berkarakter kuat dengan manajemen produksi profesional."
  },
  {
    title: "⚡ Wakil Ketua Creative Media",
    bio: "Wakil Ketua Creative Media Lebak Expo University. Memimpin strategi komunikasi visual, visual branding terpadu, kampanye promosi digital, dan supervisi konten kreatif lintas divisi."
  },
  {
    title: "📷 National Award Photographer",
    bio: "Peraih Juara Harapan 1 Tingkat Nasional Fotografi Baduy. Mengabadikan jiwa, emosi, dan kearifan lokal Nusantara melalui lensa fotografi analog dan modern."
  }
];

export const HeroSection: React.FC<HeroProps> = ({ profile }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);

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

  const toggleMusic = () => {
    setIsPlayingLofi(!isPlayingLofi);
    sounds.playPop(isPlayingLofi ? 400 : 750);
  };

  return (
    <section id="home" className="relative h-screen h-[100dvh] max-h-screen pt-14 sm:pt-16 pb-0 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Animated Spider-Verse Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-red-600/30 via-blue-600/25 to-yellow-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-4 w-[280px] h-[280px] bg-blue-700/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-[320px] h-[320px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container: Authentic 3-Column Spidey Grid (Fits 100% inside viewport) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-3 sm:px-6 flex-1 min-h-0 flex items-center justify-center py-1 sm:py-2">
        <div className="spidey-hero-grid h-full items-center">
          {/* Column 1: Left Intro */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 sm:space-y-2.5 order-1">
            <p className="font-mono text-[11px] sm:text-xs text-[#a9bcec] tracking-widest uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>// hello, saya</span>
            </p>

            <h1 className="font-bungee text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] text-white spidey-text-3d leading-[1.04] tracking-wide my-0.5 transition-all">
              M.<br />
              ZAKI<br />
              KHAIRI
            </h1>

            {/* Role & Bio Caption Box */}
            <div className="border-l-4 border-[#e62429] bg-gradient-to-r from-red-600/25 via-blue-900/25 to-slate-900/40 p-2 sm:p-2.5 rounded-r-lg max-w-xs sm:max-w-sm border-y border-r border-[#0B1440] shadow-[2px_2px_0px_#0B1440] backdrop-blur-md">
              <p className="font-mono text-[10px] sm:text-[11px] text-yellow-300 font-bold mb-0.5 flex items-center justify-center lg:justify-start gap-1">
                <span>🕷️</span>
                <span>{ROLE_ITEMS[roleIndex].title}</span>
              </p>
              <p className={`text-[11px] sm:text-xs text-slate-200 leading-snug transition-all duration-300 ${
                isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}>
                {ROLE_ITEMS[roleIndex].bio}
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
              <a
                href="#about"
                onClick={() => sounds.playWebThwip()}
                className="comic-btn-red py-1.5 px-3.5 text-xs"
              >
                <span>TENTANG SAYA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#projects"
                onClick={() => sounds.playWebThwip()}
                className="comic-btn-blue py-1.5 px-3.5 text-xs"
              >
                <span>PROYEK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Center Stage (Arched Logo Framing Over 3D Lanyard) */}
          <div className="flex flex-col items-center justify-center relative min-h-0 h-full py-1 order-2">
            {/* Arched Marvel Logo */}
            <div className="spidey-logo select-none pointer-events-none transform scale-[0.8] sm:scale-[0.88] lg:scale-[0.95] xl:scale-100 origin-center mb-0">
              <div className="spidey-logo__top">MY</div>
              <div className="spidey-logo__bottom">
                <span className="spidey-l-1">P</span>
                <span className="spidey-l-2">O</span>
                <span className="spidey-l-3">R</span>
                <span className="spidey-l-4">T</span>
                <span className="spidey-l-5">O</span>
                <span className="spidey-l-dash">-</span>
                <span className="spidey-l-6">F</span>
                <span className="spidey-l-7">O</span>
                <span className="spidey-l-8">L</span>
                <span className="spidey-l-9">I</span>
                <span className="spidey-l-10">O</span>
              </div>
            </div>

            {/* Floating Satellite Badges */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e62429] text-white text-[10px] font-anton tracking-wide border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] absolute top-10 -left-2 z-20 animate-float-slow select-none pointer-events-none">
              <span>🕷️ SPIDER-SENSE 100%</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1e5fb0] text-white text-[10px] font-anton tracking-wide border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] absolute top-14 -right-2 z-20 animate-float-reverse select-none pointer-events-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-300"></span>
              </span>
              <span>🕸️ VERCEL READY</span>
            </div>

            {/* Interactive Lanyard Badge Scaled for 100vh viewport */}
            <div className="transform scale-[0.72] sm:scale-[0.8] lg:scale-[0.85] xl:scale-[0.92] origin-center -my-3 sm:-my-1">
              <InteractiveLanyard profile={profile} />
            </div>
          </div>

          {/* Column 3: Right About Me, Socials & Lo-Fi */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2.5 order-3">
            <p className="font-mono text-[11px] sm:text-xs text-[#a9bcec] font-bold tracking-[0.15em] uppercase">
              // ABOUT ME
            </p>

            <p className="font-mono text-[11px] sm:text-xs text-[#e9dfc9] leading-relaxed max-w-xs">
              Mahasiswa S1 Sistem Informasi Universitas Gunadarma (IPK 3,75). Sutradara film &apos;TANAH JAWARA&apos; &amp; Produser Juara 1 &apos;PLUS MINUS&apos; (SMANTINEMA). Berpengalaman dalam visual storytelling, penyutradaraan, dan rekayasa web interaktif.
            </p>

            {/* Status & University Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-300">
                  {profile.status}
                </span>
              </div>

              <a
                href="#experience"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/90 hover:bg-blue-900 border-2 border-[#0B1440] text-cyan-300 text-[10px] font-mono shadow-[2px_2px_0px_#0B1440] transition"
              >
                <span>🎓 Gunadarma • IPK 3.75</span>
              </a>
            </div>

            {/* Find Me On with Round Icons */}
            <div className="pt-0.5">
              <p className="font-mono text-[10px] sm:text-[11px] text-white uppercase tracking-wider mb-1.5 flex items-center justify-center lg:justify-start gap-1">
                <span>Find me on</span>
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="Instagram: @zakkhairi_"
                  className="w-8 h-8 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-pink-600 hover:-translate-y-0.5 transition-all"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profile.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="TikTok: @_iniizaki"
                  className="w-8 h-8 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-cyan-600 hover:-translate-y-0.5 transition-all"
                >
                  <TiktokIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profile.socials.youtube || "https://www.youtube.com/@zakkhairi"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="YouTube: @zakkhairi"
                  className="w-8 h-8 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-red-600 hover:-translate-y-0.5 transition-all"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="GitHub: @zakikhairi"
                  className="w-8 h-8 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-purple-600 hover:-translate-y-0.5 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Mini Lo-Fi Beat Widget */}
            <div className="w-full max-w-[240px] pt-0.5">
              <div className="rounded-lg p-1.5 bg-slate-950/80 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMusic}
                    className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition"
                  >
                    {isPlayingLofi ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold text-white block leading-none">Lo-Fi Coding Beat</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{isPlayingLofi ? '84 BPM • Fokus' : 'Klik musik'}</span>
                  </div>
                </div>
                <div className="flex items-end gap-0.5 h-3.5 pr-1">
                  {['animate-eq-1', 'animate-eq-2', 'animate-eq-3', 'animate-eq-4', 'animate-eq-2'].map((animClass, i) => (
                    <div
                      key={i}
                      className={`w-0.5 rounded-full ${
                        isPlayingLofi
                          ? `${animClass} bg-gradient-to-t from-red-500 to-yellow-400`
                          : 'bg-slate-700 h-1.5'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Comic Marquee Ticker locked at bottom of hero */}
      <div className="relative w-full h-10 sm:h-12 bg-[#e62429] border-t-[3px] border-[#ff7b00] overflow-hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-20 flex items-center shrink-0">
        <div className="comic-halftone-bg absolute inset-0 opacity-15 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap select-none font-anton text-xs sm:text-sm text-white uppercase italic tracking-widest px-4">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-1.5">
                <span>🕷️</span> SUTRADARA FILM TANAH JAWARA
              </span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>PRODUSER JUARA 1 PLUS MINUS</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>S1 SISTEM INFORMASI GUNADARMA (IPK 3.75)</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>WAKIL KETUA CREATIVE MEDIA LEU</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>JUARA HARAPAN 1 FOTOGRAFI BADUY</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
