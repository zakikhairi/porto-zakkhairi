import React, { useState } from 'react';
import { Star, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ProfileData } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';

interface AboutSectionTwoProps {
  profile: ProfileData;
}

export const AboutSectionTwo: React.FC<AboutSectionTwoProps> = ({ profile }) => {
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
      // Fallback
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

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 max-w-6xl mx-auto z-20">
      {/* Comic Background Ornaments */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Side: Comic Photo Card */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative group">
            {/* Corner Star Badge */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#e62429] border-[3px] border-[#050a1c] shadow-[3px_3px_0px_#050a1c] flex items-center justify-center z-20">
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
            </div>

            {/* Photo Container */}
            <div className="w-64 sm:w-72 aspect-[3/4] rounded-xl overflow-hidden border-[4px] border-[#050a1c] shadow-[8px_8px_0px_#050a1c] bg-[#0a59ba] transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-[10px_10px_0px_#050a1c]">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Photo Caption */}
            <div className="mt-3.5 text-center">
              <h3 className="font-anton text-xl tracking-wider text-white uppercase">
                {profile.name}
              </h3>
              <p className="font-mono text-xs text-red-400 font-bold tracking-widest uppercase mt-0.5">
                DIRECTOR &bull; PRODUCER &bull; S1 SI
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Comic Bio & Narrative */}
        <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/90 border-2 border-[#0B1440] text-cyan-300 text-xs font-mono shadow-[2px_2px_0px_#0B1440]">
            <span>// ORIGIN &amp; DOSSIER</span>
          </div>

          <h2 className="font-bungee text-3xl sm:text-5xl text-white spidey-text-3d leading-tight">
            M. ZAKI KHAIRI
          </h2>

          <p className="font-bungee text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl">
            Kekuatan sejati bukan datang dari gigitan laba-laba, tapi dari{' '}
            <strong className="text-red-400 font-bold">konsistensi</strong> dan{' '}
            <strong className="text-yellow-300 font-bold">kemauan berkarya</strong> untuk terus berkembang dan menginspirasi.
          </p>

          <p className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            Halo, saya Muhammad Zaki Khairi, mahasiswa aktif S1 Sistem Informasi Universitas Gunadarma dengan performa akademik unggul (IPK 3,75). Saya memadukan keahlian arsitektur sistem informasi &amp; web modern dengan passion mendalam di bidang penyutradaraan film dan media kreatif visual. Sebagai Sutradara film &apos;TANAH JAWARA&apos;, Produser film peraih Juara 1 Provinsi &apos;PLUS MINUS&apos;, dan Wakil Ketua Creative Media Lebak Expo University, saya selalu merangkai setiap karya bagaikan jaring laba-laba: terstruktur, kokoh, dan berkarakter kuat.
          </p>

          {/* 3 Comic Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-2">
            <div className="p-3.5 rounded-lg bg-[#0a59ba] border-[3px] border-[#050a1c] shadow-[4px_4px_0px_#050a1c] hover:-translate-y-1 transition-transform">
              <span className="font-mono text-[11px] font-bold text-cyan-300 uppercase tracking-widest block">
                ASAL DOMISILI
              </span>
              <span className="font-anton text-lg text-white tracking-wider block mt-1">
                Lebak, Banten 🇮🇩
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0a59ba] border-[3px] border-[#050a1c] shadow-[4px_4px_0px_#050a1c] hover:-translate-y-1 transition-transform">
              <span className="font-mono text-[11px] font-bold text-cyan-300 uppercase tracking-widest block">
                AKADEMIK RESMI
              </span>
              <span className="font-anton text-lg text-white tracking-wider block mt-1">
                Gunadarma (IPK 3.75)
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0a59ba] border-[3px] border-[#050a1c] shadow-[4px_4px_0px_#050a1c] hover:-translate-y-1 transition-transform">
              <span className="font-mono text-[11px] font-bold text-cyan-300 uppercase tracking-widest block">
                PRESTASI UTAMA
              </span>
              <span className="font-anton text-lg text-white tracking-wider block mt-1">
                Juara 1 Sinematografi
              </span>
            </div>
          </div>

          {/* Comic Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
            <a
              href="#contact"
              onClick={() => sounds.playWebThwip()}
              className="comic-btn-red"
            >
              <span>HUBUNGI SAYA</span>
              <ArrowRight className="w-4 h-4" />
            </a>

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
                  <span>UNDUH CV RESMI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
