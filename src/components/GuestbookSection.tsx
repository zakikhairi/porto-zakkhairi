import React, { useState } from 'react';
import { MessageSquarePlus, Heart, Send, Sparkles, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { GuestbookEntry } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';

interface GuestbookProps {
  entries: GuestbookEntry[];
  onAddEntry: (entry: Omit<GuestbookEntry, 'id' | 'timestamp' | 'likes' | 'likedByMe'>) => void;
  onLikeEntry: (id: string) => void;
  onDeleteEntry?: (id: string) => void;
  isAdmin?: boolean;
}

export const GuestbookSection: React.FC<GuestbookProps> = ({
  entries,
  onAddEntry,
  onLikeEntry,
  onDeleteEntry,
  isAdmin
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🚀');
  const [selectedColor, setSelectedColor] = useState('bg-purple-500');

  const emojis = ['🚀', '⚡', '🎨', '💻', '🔥', '✨', '👾', '☕', '🧠', '🌟'];
  const colors = [
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddEntry({
      name: name.trim(),
      role: role.trim() || 'Visitor',
      message: message.trim(),
      avatarEmoji: selectedEmoji,
      avatarBg: selectedColor
    });

    // Fire festive confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
    sounds.playSuccess();

    setName('');
    setRole('');
    setMessage('');
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeEntry(id);
    sounds.playPop(650);

    // Micro burst
    confetti({
      particleCount: 25,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
    });
  };

  return (
    <section id="guestbook" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>Community Board</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Buku Tamu & Komentar
        </h2>
        <p className="text-slate-400 text-sm">
          Tinggalkan pesan sapaan, feedback, atau sekadar stiker untuk meramaikan portofolio ini!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Submission (Col 5) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Tulis Pesan Anda
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">Realtime Live</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar & Emoji Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Pilih Karakter & Warna:
              </label>
              <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1">
                {emojis.map((em) => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => {
                      setSelectedEmoji(em);
                      sounds.playClick();
                    }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition ${
                      selectedEmoji === em
                        ? 'bg-purple-600 ring-2 ring-purple-400 scale-110'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c);
                      sounds.playClick();
                    }}
                    className={`w-6 h-6 rounded-full ${c} transition ${
                      selectedColor === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nama Anda *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Rian / Siska"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            {/* Role Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Peran / Pekerjaan (Opsional)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Frontend Dev / Mahasiswa"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pesan Anda *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis salam, kesan, atau saran untuk portofolio ini..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pesan & Ledakkan Konfeti! 🎉</span>
            </button>
          </form>
        </div>

        {/* Entries List (Col 7) */}
        <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {entries.length === 0 ? (
            <div className="glass-panel rounded-3xl p-8 text-center text-slate-400 text-xs">
              Belum ada pesan. Jadilah orang pertama yang mengisi buku tamu ini!
            </div>
          ) : (
            entries.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 border border-white/10 flex items-start justify-between gap-4 group hover:border-purple-500/40 transition"
              >
                <div className="flex items-start gap-3 flex-1">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-xl ${item.avatarBg} flex items-center justify-center text-lg shadow-md shrink-0`}
                  >
                    {item.avatarEmoji}
                  </div>

                  {/* Content */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-white">{item.name}</span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {item.role}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-auto">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed break-words">
                      {item.message}
                    </p>
                  </div>
                </div>

                {/* Like & Admin Actions */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                      item.likedByMe
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        item.likedByMe ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                    <span>{item.likes}</span>
                  </button>

                  {isAdmin && onDeleteEntry && (
                    <button
                      onClick={() => onDeleteEntry(item.id)}
                      title="Hapus Pesan"
                      className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
