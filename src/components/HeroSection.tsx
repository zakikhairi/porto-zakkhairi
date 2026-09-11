import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
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
    bio: "\"With great code and cinematography comes great storytelling.\" Sutradara film 'TANAH JAWARA' dan Produser film peraih Juara 1 Tingkat Provinsi 'PLUS MINUS' (SMANTINEMA)."
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

  // Photo Reveal Interaction
  const photoRef = useRef<HTMLDivElement>(null);
  const [isHoveringFace, setIsHoveringFace] = useState(false);

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

  const updateReveal = (clientX: number, clientY: number) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const px = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const py = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    photoRef.current.style.setProperty('--reveal-x', `${px}%`);
    photoRef.current.style.setProperty('--reveal-y', `${py}%`);
    setIsHoveringFace(true);
  };

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateReveal(e.clientX, e.clientY);
  };

  const handlePhotoTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    updateReveal(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Logo Letters Interactive Hover Lighting
  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const letters = document.querySelectorAll<HTMLElement>('.spidey-logo__bottom span');
    letters.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 55) {
        span.classList.add('is-lit');
      } else {
        span.classList.remove('is-lit');
      }
    });
  };

  const handleLogoMouseLeave = () => {
    const letters = document.querySelectorAll<HTMLElement>('.spidey-logo__bottom span');
    letters.forEach((span) => span.classList.remove('is-lit'));
  };

  return (
    <section id="home" className="relative w-full min-h-[100dvh] lg:h-screen lg:h-[100dvh] lg:max-h-screen pt-16 sm:pt-20 pb-0 flex flex-col justify-between overflow-x-hidden overflow-y-visible lg:overflow-hidden">
      {/* Dynamic Animated Spider-Verse Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-red-600/30 via-blue-600/25 to-yellow-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-4 w-[280px] h-[280px] bg-blue-700/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-4 w-[320px] h-[320px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container: Authentic 3-Column Spidey Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 flex-1 min-h-0 flex items-center justify-center py-2 sm:py-3">
        <div className="spidey-hero-grid h-full items-center">
          {/* Column 1: Left Intro */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2.5 sm:space-y-3 order-1">
            <p className="font-mono text-xs sm:text-sm text-[#a9bcec] tracking-widest uppercase flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>// hello, saya</span>
            </p>

            <h1 className="font-bungee text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] text-white spidey-text-3d leading-[1.05] tracking-wide my-1 transition-all">
              M.<br />
              ZAKI<br />
              KHAIRI
            </h1>

            {/* Role & Bio Caption Box */}
            <div className="border-l-4 border-[#e62429] bg-gradient-to-r from-red-600/25 via-blue-900/25 to-slate-900/40 p-2.5 sm:p-3 rounded-r-lg max-w-xs sm:max-w-sm border-y border-r border-[#0B1440] shadow-[3px_3px_0px_#0B1440] backdrop-blur-md">
              <p className="font-mono text-[11px] sm:text-xs text-yellow-300 font-bold mb-1 flex items-center justify-center lg:justify-start gap-1">
                <span>🕷️</span>
                <span>{ROLE_ITEMS[roleIndex].title}</span>
              </p>
              <p className={`text-xs text-slate-200 leading-relaxed transition-all duration-300 ${
                isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}>
                {ROLE_ITEMS[roleIndex].bio}
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <a
                href="#about"
                onClick={() => sounds.playWebThwip()}
                className="comic-btn-red py-2 px-4 text-xs sm:text-sm"
              >
                <span>TENTANG SAYA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                onClick={() => sounds.playWebThwip()}
                className="comic-btn-blue py-2 px-4 text-xs sm:text-sm"
              >
                <span>PROYEK</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Center Stage (Arched Marvel Logo + Interactive Spidey Mask Reveal) */}
          <div 
            className="flex flex-col items-center justify-center relative min-h-0 py-2 order-2 select-none"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
          >
            {/* Arched Marvel Spider-Man Logo */}
            <div className="spidey-logo pointer-events-none mb-1 sm:mb-2">
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

            {/* Interactive Spider-Man Mask Reveal Photo */}
            <div
              ref={photoRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={() => setIsHoveringFace(false)}
              onTouchMove={handlePhotoTouchMove}
              onTouchStart={handlePhotoTouchMove}
              onTouchEnd={() => setIsHoveringFace(false)}
              onClick={() => {
                sounds.playWebThwip();
                setIsHoveringFace(prev => !prev);
              }}
              className={`stage__photo ${isHoveringFace ? 'is-hovering-face' : ''}`}
              title="Sorot foto untuk X-Ray Topeng Spider-Man"
            >
              {/* Spider-Man Suit / Mask on bottom */}
              <img
                src="/spidey/topeng-spiderman.png"
                alt="Topeng Spider-Man"
                className="mask-img"
              />
              {/* Real face on top with radial mask reveal */}
              <img
                src="/spidey/zaki-face-aligned.png"
                alt="Muhammad Zaki Khairi"
                className="real-img"
              />
            </div>

            {/* Interactive Functional Hint */}
            <p className="font-mono text-[11px] text-[#8b9bc4] mt-2 text-center flex items-center gap-1.5">
              <span className="text-yellow-400 font-bold">⚡</span>
              <span className="hidden sm:inline">// Arahkan kursor ke foto untuk X-Ray identitas</span>
              <span className="sm:hidden">// Sentuh foto untuk X-Ray identitas</span>
            </p>
          </div>

          {/* Column 3: Right About Me & Socials */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 order-3">
            <p className="font-mono text-xs sm:text-sm text-[#a9bcec] font-bold tracking-[0.15em] uppercase">
              // ABOUT ME
            </p>

            <p className="font-mono text-xs sm:text-sm text-[#e9dfc9] leading-relaxed max-w-xs sm:max-w-sm">
              Mahasiswa S1 Sistem Informasi Universitas Gunadarma (IPK 3,75). Sutradara film &apos;TANAH JAWARA&apos; &amp; Produser Juara 1 &apos;PLUS MINUS&apos; (SMANTINEMA). Berpengalaman dalam visual storytelling, penyutradaraan sinematik, dan rekayasa web interaktif.
            </p>

            {/* Status & University Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-300">
                  {profile.status}
                </span>
              </div>

              <a
                href="#experience"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-950/90 hover:bg-blue-900 border-2 border-[#0B1440] text-cyan-300 text-[11px] font-mono shadow-[2px_2px_0px_#0B1440] transition"
              >
                <span>🎓 Gunadarma • IPK 3.75</span>
              </a>
            </div>

            {/* Find Me On with Round Icons */}
            <div className="pt-1">
              <p className="font-mono text-xs text-white uppercase tracking-wider mb-2 flex items-center justify-center lg:justify-start gap-1">
                <span>Find me on</span>
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="Instagram: @zakkhairi_"
                  className="w-9 h-9 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-pink-600 hover:-translate-y-0.5 transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                <a
                  href={profile.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="TikTok: @_iniizaki"
                  className="w-9 h-9 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-cyan-600 hover:-translate-y-0.5 transition-all"
                >
                  <TiktokIcon className="w-4 h-4" />
                </a>

                <a
                  href={profile.socials.youtube || "https://www.youtube.com/@zakkhairi"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="YouTube: @zakkhairi"
                  className="w-9 h-9 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-red-600 hover:-translate-y-0.5 transition-all"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>

                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  title="GitHub: @zakikhairi"
                  className="w-9 h-9 rounded-full bg-[#0a4aa3] border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] flex items-center justify-center text-white hover:bg-purple-600 hover:-translate-y-0.5 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Comic Marquee Ticker locked at bottom of hero */}
      <div className="relative w-full h-11 sm:h-12 bg-[#e62429] border-t-[4px] border-[#ff7b00] overflow-hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-20 flex items-center shrink-0">
        <div className="comic-halftone-bg absolute inset-0 opacity-20 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap select-none font-anton text-xs sm:text-sm text-white uppercase italic tracking-widest px-4">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">
                <img src="/spidey/asset-spiderman.png" alt="Spider-Man" className="w-6 h-6 object-contain inline-block" />
                <span>SUTRADARA FILM TANAH JAWARA</span>
              </span>
              <span className="text-yellow-300 font-black text-sm">★</span>
              <span>PRODUSER JUARA 1 PLUS MINUS</span>
              <span className="text-yellow-300 font-black text-sm">★</span>
              <span>S1 SISTEM INFORMASI GUNADARMA (IPK 3.75)</span>
              <span className="text-yellow-300 font-black text-sm">★</span>
              <span>WAKIL KETUA CREATIVE MEDIA LEU</span>
              <span className="text-yellow-300 font-black text-sm">★</span>
              <span>JUARA HARAPAN 1 FOTOGRAFI BADUY</span>
              <span className="text-yellow-300 font-black text-sm">★</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
