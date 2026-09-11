import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, ArrowUp, ExternalLink, MessageCircle, MapPin, Clapperboard } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { GithubIcon } from './icons/GithubIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { sounds } from '../utils/soundEffects';

import { ContactDock } from './ContactDock';

interface ContactProps {
  profile: ProfileData;
  onReplayIntro?: () => void;
}

export const ContactSection: React.FC<ContactProps> = ({ profile, onReplayIntro }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    sounds.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playSuccess();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sounds.playClick();
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 px-4 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Interactive 3D CONTACT Mechanical Keycap Dock (TikTok style) */}
        <ContactDock />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Punya Proyek Impian? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
                Mari Kita Wujudkan Bersama.
              </span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Saya selalu terbuka untuk diskusi proyek baru, kolaborasi kreatif, produksi film & multimedia, freelance, atau sekadar bertukar wawasan seputar teknologi informasi.
            </p>

            {/* Direct Contact Cards (Email & WhatsApp) */}
            <div className="space-y-3 max-w-md">
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/6281919200602?text=${encodeURIComponent('Halo Muhammad Zaki Khairi, saya tertarik untuk berdiskusi terkait kolaborasi/proyek.')}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="p-4 rounded-2xl glass-card border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/20 hover:bg-emerald-950/40 flex items-center justify-between gap-3 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-mono">WhatsApp Langsung</span>
                    <span className="text-xs font-bold text-white font-mono truncate block">
                      {profile.phone || '081919200602'}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              {/* Quick Copy Email Card */}
              <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Email Resmi</span>
                    <span className="text-xs font-bold text-white font-mono truncate block">
                      {profile.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 text-xs font-mono">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Rangkasbitung - Lebak, Banten, Indonesia 🇮🇩</span>
              </div>
            </div>

            {/* Official Social Media Cards with Brand Logos */}
            <div className="space-y-2 pt-2 max-w-md">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                Akun Resmi Media Sosial:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Instagram */}
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="group flex items-center justify-between p-3 rounded-2xl glass-card border border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <InstagramIcon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white group-hover:text-pink-300 block transition">
                        Instagram
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        @zakkhairi_
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400 transition" />
                </a>

                {/* TikTok */}
                <a
                  href={profile.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="group flex items-center justify-between p-3 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <TiktokIcon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 block transition">
                        TikTok
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        @_iniizaki
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                </a>

                {/* YouTube */}
                <a
                  href={profile.socials.youtube || "https://www.youtube.com/@zakkhairi"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="group flex items-center justify-between p-3 rounded-2xl glass-card border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <YoutubeIcon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white group-hover:text-red-300 block transition">
                        YouTube
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        @zakkhairi
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 transition" />
                </a>

                {/* GitHub */}
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="group flex items-center justify-between p-3 rounded-2xl glass-card border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <GithubIcon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-white group-hover:text-purple-300 block transition">
                        GitHub
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        @zakikhairi
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Col 6) */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <h3 className="font-bold text-white text-lg mb-4">Kirim Pesan Langsung</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nama</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pesan / Ide Proyek</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ceritakan gambaran proyek atau pertanyaan Anda..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Sekarang</span>
              </button>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-medium animate-fadeIn">
                  🎉 Pesan Anda terkirim! Terima kasih telah menghubungi.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 {profile.name}. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-400 font-mono">zakikhairi.dev</span>
          </div>



          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onReplayIntro();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                title="Putar Ulang Animasi Intro"
              >
                <Clapperboard className="w-3.5 h-3.5 text-pink-400" />
                <span>Putar Ulang Intro</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
