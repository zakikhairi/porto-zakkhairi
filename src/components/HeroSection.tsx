import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Play, Pause, Music2, Terminal, Download, CheckCircle2 } from 'lucide-react';
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
    <section id="about" className="relative min-h-[calc(100vh-4rem)] pt-16 pb-0 flex flex-col justify-between overflow-hidden">
      {/* Dynamic Animated Spider-Verse Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-red-600/30 via-blue-600/25 to-yellow-500/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-10 w-[280px] h-[280px] bg-blue-700/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 flex flex-col items-center flex-1 justify-center">
        {/* Marvel Spider-Man Arched Display Logo */}
        <div className="w-full flex flex-col items-center justify-center pt-2 pb-5 sm:pb-7 select-none">
          <div className="spidey-logo">
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
        </div>

        {/* Hero Two Columns Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Comic Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4">
            {/* Status & Uni Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-300">
                  {profile.status}
                </span>
              </div>

              <a
                href="#experience"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/90 hover:bg-blue-900 border-2 border-[#0B1440] text-cyan-300 text-[11px] font-mono shadow-[2px_2px_0px_#0B1440] transition"
              >
                <span>🎓 Gunadarma • IPK 3.75</span>
              </a>
            </div>

            {/* Intro Eyebrow & Hero Comic Name */}
            <div className="space-y-1 w-full select-none cursor-default">
              <p className="font-mono text-xs sm:text-sm text-cyan-300 tracking-widest uppercase flex items-center justify-center lg:justify-start gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>// hello, saya</span>
              </p>
              
              <h1 className="font-bungee text-4xl sm:text-5xl lg:text-[54px] text-white spidey-text-3d leading-[1.08] tracking-wide my-1 transition-all duration-300">
                M.<br />
                ZAKI<br />
                KHAIRI
              </h1>
            </div>

            {/* Dynamic Role & Narrative Caption Box */}
            <div className="border-l-4 border-[#e62429] bg-gradient-to-r from-red-600/25 via-blue-900/25 to-slate-900/40 p-3 sm:p-3.5 rounded-r-xl max-w-xl my-1 border-y border-r border-[#0B1440] shadow-[3px_3px_0px_#0B1440] backdrop-blur-md">
              <p className="font-mono text-xs sm:text-sm text-yellow-300 font-bold mb-1 flex items-center justify-center lg:justify-start gap-2">
                <span>{ROLE_ITEMS[roleIndex].title}</span>
              </p>
              <p className={`text-xs sm:text-sm text-slate-200 leading-relaxed transition-all duration-300 ${
                isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}>
                {ROLE_ITEMS[roleIndex].bio}
              </p>
            </div>

            {/* Comic Neo-Brutalist Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 w-full max-w-sm sm:max-w-none">
              <a
                href="#projects"
                onClick={() => sounds.playWebThwip()}
                className="comic-btn-red"
              >
                <span>PROYEK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#experience"
                onClick={() => sounds.playClick()}
                className="comic-btn-blue"
              >
                <span>TENTANG SAYA</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Interactive CV Download Button */}
              <button
                onClick={handleDownloadCv}
                className="comic-btn-dark cursor-pointer"
              >
                {cvDownloaded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">DIUNDUH!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-cyan-400 animate-bounce" />
                    <span>UNDUH CV</span>
                  </>
                )}
              </button>

              <a
                href="#guestbook"
                onClick={() => sounds.playClick()}
                className="comic-btn-dark"
              >
                <MessageSquare className="w-4 h-4 text-pink-400" />
                <span>BUKU TAMU</span>
              </a>
            </div>

            {/* Official Social Media Channels */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-xs font-mono text-slate-300 mr-1 flex items-center">
                Sosmed:
              </span>

              {/* Instagram */}
              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                title="Instagram: @zakkhairi_"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] hover:border-pink-500 hover:bg-pink-500/20 hover:scale-105 active:scale-95 transition-all"
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
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] hover:border-cyan-500 hover:bg-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
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
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] hover:border-red-500 hover:bg-red-500/20 hover:scale-105 active:scale-95 transition-all"
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
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border-2 border-[#0B1440] shadow-[2px_2px_0px_#0B1440] hover:border-purple-500 hover:bg-purple-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition">
                  GitHub
                </span>
              </a>
            </div>

            {/* Mini Lo-Fi Beat Widget */}
            <div className="pt-1 w-full max-w-sm">
              <div className="rounded-xl p-2.5 bg-slate-900/90 border-2 border-[#0B1440] shadow-[3px_3px_0px_#0B1440] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMusic}
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-blue-600 border border-white/20 flex items-center justify-center text-white shadow hover:scale-105 transition cursor-pointer"
                  >
                    {isPlayingLofi ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Music2 className="w-3.5 h-3.5 text-pink-400" />
                      <span className="text-xs font-bold text-white">Lo-Fi Coding Vibe</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      {isPlayingLofi ? 'Memutar Suasana Fokus • 84 BPM' : 'Putar musik fokus'}
                    </p>
                  </div>
                </div>

                {/* Animated Equalizer Bars */}
                <div className="flex items-end gap-1 h-5 pr-2">
                  {['animate-eq-1', 'animate-eq-2', 'animate-eq-3', 'animate-eq-4', 'animate-eq-5', 'animate-eq-6', 'animate-eq-2'].map((animClass, i) => (
                    <div
                      key={i}
                      className={`w-1 h-4 rounded-full ${
                        isPlayingLofi
                          ? `${animClass} bg-gradient-to-t from-red-500 to-yellow-400`
                          : 'bg-slate-700 scale-y-25'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Lanyard Interactive Badge with Comic Badges */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Top Left Floating Satellite Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e62429] text-white text-xs font-anton tracking-wide border-2 border-[#0B1440] shadow-[3px_3px_0px_#0B1440] absolute -top-4 -left-6 z-20 animate-float-slow select-none pointer-events-none">
              <span className="text-sm">🕷️</span>
              <span>SPIDER-SENSE</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-yellow-300 font-mono font-bold">100%</span>
            </div>

            {/* Top Right Floating Satellite Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1e5fb0] text-white text-xs font-anton tracking-wide border-2 border-[#0B1440] shadow-[3px_3px_0px_#0B1440] absolute top-12 -right-6 z-20 animate-float-reverse select-none pointer-events-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
              </span>
              <span>🕸️ WEB-SLINGER VERCEL</span>
            </div>

            {/* Bottom Left Floating Satellite Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ff7b00] text-slate-950 text-xs font-anton tracking-wide border-2 border-[#0B1440] shadow-[3px_3px_0px_#0B1440] absolute bottom-8 -left-8 z-20 animate-float-reverse select-none pointer-events-none">
              <span className="text-sm">🏆</span>
              <span>JUARA 1 TINGKAT PROVINSI</span>
            </div>

            {/* Bottom Right Floating Satellite Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d1a45] text-cyan-300 text-xs font-anton tracking-wide border-2 border-[#0B1440] shadow-[3px_3px_0px_#0B1440] absolute -bottom-2 -right-4 z-20 animate-float-slow select-none pointer-events-none">
              <span className="text-sm">⚡</span>
              <span>IPK 3.75 GUNADARMA</span>
            </div>

            <InteractiveLanyard profile={profile} />
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Comic Marquee Ticker at bottom */}
      <div className="relative w-full mt-10 h-13 sm:h-15 bg-[#e62429] border-y-[3px] border-[#ff7b00] overflow-hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-20 flex items-center">
        {/* Halftone texture overlay */}
        <div className="comic-halftone-bg absolute inset-0 opacity-15 pointer-events-none" />
        
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap select-none font-anton text-sm sm:text-base text-white uppercase italic tracking-widest px-4">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-1.5">
                <span>🕷️</span> FRIENDLY NEIGHBORHOOD TECH
              </span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>SUTRADARA FILM TANAH JAWARA</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>PRODUSER JUARA 1 PLUS MINUS</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>S1 SISTEM INFORMASI GUNADARMA (IPK 3.75)</span>
              <span className="text-yellow-300 font-black text-xs">★</span>
              <span>WAKIL KETUA CREATIVE MEDIA</span>
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
