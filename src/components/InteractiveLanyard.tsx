import React, { useState, useRef, useEffect } from 'react';
import { QrCode, RotateCw, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { InstagramIcon } from './icons/InstagramIcon';
import { GithubIcon } from './icons/GithubIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { sounds } from '../utils/soundEffects';

interface LanyardProps {
  profile: ProfileData;
}

export const InteractiveLanyard: React.FC<LanyardProps> = ({ profile }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rot, setRot] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSpringing, setIsSpringing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);
  const moveRafRef = useRef<number | null>(null);
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const lastMoveTimeRef = useRef(0);

  // Smooth, lively spring-back animation with release inertia and oscillations
  useEffect(() => {
    if (!isDragging) {
      setIsSpringing(true);
      // Inherit user's drag fling velocity for realistic inertia
      let vx = Math.max(-24, Math.min(24, velocityRef.current.vx));
      let vy = Math.max(-24, Math.min(24, velocityRef.current.vy));
      velocityRef.current = { vx: 0, vy: 0 };

      // Tuned spring and damping for a delightful, bouncy pendulum swing
      const spring = 0.09;
      const damping = 0.84;

      const step = () => {
        const dx = 0 - currentPosRef.current.x;
        const dy = 0 - currentPosRef.current.y;

        vx += dx * spring;
        vy += dy * spring;
        vx *= damping;
        vy *= damping;

        currentPosRef.current.x += vx;
        currentPosRef.current.y += vy;

        setPos({ x: currentPosRef.current.x, y: currentPosRef.current.y });
        setRot({
          x: -currentPosRef.current.y * 0.14 - vy * 0.35,
          y: currentPosRef.current.x * 0.16 + vx * 0.35,
          z: currentPosRef.current.x * 0.07 + vx * 0.2
        });

        if (Math.abs(vx) > 0.08 || Math.abs(vy) > 0.08 || Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          setPos({ x: 0, y: 0 });
          setRot({ x: 0, y: 0, z: 0 });
          currentPosRef.current = { x: 0, y: 0 };
          setIsSpringing(false);
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (moveRafRef.current) cancelAnimationFrame(moveRafRef.current);
      };
    }
  }, [isDragging]);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    velocityRef.current = { vx: 0, vy: 0 };
    lastMoveTimeRef.current = performance.now();
    sounds.playPop(480);
    dragStartRef.current = { x: clientX - currentPosRef.current.x, y: clientY - currentPosRef.current.y };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const rawX = clientX - dragStartRef.current.x;
    const rawY = clientY - dragStartRef.current.y;

    // Fluid and generous unconstrained movement with soft organic elasticity
    const applyElastic = (val: number, limit: number) => {
      if (Math.abs(val) <= limit) return val;
      const sign = Math.sign(val);
      const excess = Math.abs(val) - limit;
      return sign * (limit + Math.tanh(excess / 320) * 180);
    };

    const nx = applyElastic(rawX, 300);
    const ny = rawY < 0 ? Math.max(-180, applyElastic(rawY, 120)) : applyElastic(rawY, 340);

    const now = performance.now();
    const dt = Math.max(1, now - lastMoveTimeRef.current);
    const vx = (nx - currentPosRef.current.x) / (dt / 16.6);
    const vy = (ny - currentPosRef.current.y) / (dt / 16.6);
    velocityRef.current = { vx, vy };
    lastMoveTimeRef.current = now;

    currentPosRef.current = { x: nx, y: ny };

    if (!moveRafRef.current) {
      moveRafRef.current = requestAnimationFrame(() => {
        setPos({ x: currentPosRef.current.x, y: currentPosRef.current.y });
        setRot({
          x: -currentPosRef.current.y * 0.16 + velocityRef.current.vy * 0.35,
          y: currentPosRef.current.x * 0.16 + velocityRef.current.vx * 0.35,
          z: currentPosRef.current.x * 0.07 + velocityRef.current.vx * 0.2
        });
        moveRafRef.current = null;
      });
    }
  };

  const handleEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      const stretchDist = Math.hypot(currentPosRef.current.x, currentPosRef.current.y);
      if (stretchDist > 30) {
        sounds.playWebThwip();
      } else {
        sounds.playPop(Math.min(850, 420 + stretchDist * 0.8));
      }
    }
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input, textarea')) {
      return;
    }
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  // Touch events for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      if ((e.target as HTMLElement).closest('button, a, input, textarea')) {
        return;
      }
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      if (isDragging) handleEnd();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      if (isDragging) handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsFlipped(prev => !prev);
    sounds.playClick();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      sounds.playSuccess();
    }
  };

  // String physics curve calculation - 1:1 synchronized with card translation
  const anchorX = 140;
  const cardTopX = anchorX + pos.x;
  const cardTopY = 68 + pos.y;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-[280px] mx-auto py-1">
      {/* SVG Lanyard Strap & Clasp (Exact 1:1 pixel coordinate alignment) */}
      <svg className="w-[280px] h-[75px] overflow-visible pointer-events-none z-20 relative" viewBox="0 0 280 75">
        <defs>
          <linearGradient id="spiderLanyardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="45%" stopColor="#b91c1c" />
            <stop offset="55%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        {/* Lanyard Top Anchor Loop */}
        <circle cx={anchorX} cy="4" r="6" fill="#1e1b4b" stroke="#ef4444" strokeWidth="2" />
        
        {/* Dynamic Curved Spider-Suit Ribbon Left */}
        <path
          d={`M ${anchorX - 12} 4 Q ${anchorX - 6 + pos.x * 0.35} ${32 + pos.y * 0.35} ${cardTopX - 6} ${cardTopY - 14}`}
          fill="none"
          stroke="url(#spiderLanyardGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
        />
        {/* White Inner Web Core Strand Left */}
        <path
          d={`M ${anchorX - 12} 4 Q ${anchorX - 6 + pos.x * 0.35} ${32 + pos.y * 0.35} ${cardTopX - 6} ${cardTopY - 14}`}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          strokeLinecap="round"
        />

        {/* Dynamic Curved Spider-Suit Ribbon Right */}
        <path
          d={`M ${anchorX + 12} 4 Q ${anchorX + 6 + pos.x * 0.35} ${32 + pos.y * 0.35} ${cardTopX + 6} ${cardTopY - 14}`}
          fill="none"
          stroke="url(#spiderLanyardGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(2,132,199,0.5)]"
        />
        {/* White Inner Web Core Strand Right */}
        <path
          d={`M ${anchorX + 12} 4 Q ${anchorX + 6 + pos.x * 0.35} ${32 + pos.y * 0.35} ${cardTopX + 6} ${cardTopY - 14}`}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          strokeLinecap="round"
        />

        {/* Metallic Spider Web Buckle */}
        <rect
          x={cardTopX - 10}
          y={cardTopY - 15}
          width="20"
          height="7"
          rx="2"
          fill="#0f172a"
          stroke="#ef4444"
          strokeWidth="1.2"
        />
        {/* Red Spider Core Dot on Buckle */}
        <circle cx={cardTopX} cy={cardTopY - 11.5} r="2" fill="#ef4444" />

        {/* Swivel Ring */}
        <circle
          cx={cardTopX}
          cy={cardTopY - 5}
          r="4.5"
          fill="#090d16"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />

        {/* Metallic Lobster Claw / Clasp Hook */}
        <rect
          x={cardTopX - 6}
          y={cardTopY - 1}
          width="12"
          height="16"
          rx="3"
          fill="#1e293b"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        {/* Clasp Tongue Red Accent */}
        <rect
          x={cardTopX - 2}
          y={cardTopY + 3}
          width="4"
          height="8"
          rx="1"
          fill="#ef4444"
        />
      </svg>

      {/* 3D Draggable Card Container - Clamped seamlessly into the lanyard clasp */}
      <div
        ref={cardRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onDragStart={(e) => e.preventDefault()}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) rotateX(${rot.x}deg) rotateY(${rot.y + (isFlipped ? 180 : 0)}deg) rotateZ(${rot.z}deg)`,
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          transition: isDragging || isSpringing ? 'none' : 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          willChange: 'transform',
          cursor: isDragging ? 'grabbing' : 'grab',
          WebkitUserDrag: 'none',
          userSelect: 'none'
        } as React.CSSProperties}
        className="relative -mt-4 w-[280px] h-[400px] rounded-3xl p-1 shadow-2xl transition-shadow select-none touch-none z-10"
      >
        {/* Physical 3D Badge Attachment Tab & Hole - molded into top center of the card */}
        <div 
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 rounded-t-xl bg-gradient-to-b from-slate-700 to-slate-800 border-t border-x border-slate-500/60 shadow-md flex items-center justify-center z-30 pointer-events-none"
          style={{ transform: 'translateZ(3px)' }}
        >
          <div className="w-7 h-1.5 rounded-full bg-slate-950 border border-slate-700 shadow-inner" />
        </div>

        {/* Glowing Ambient Halo (pointer-events-none, calmed when flipped for readability) */}
        <div 
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 ${
            isFlipped ? 'opacity-15' : 'opacity-65'
          } blur-lg pointer-events-none transition duration-500 group-hover:opacity-100`}
          style={{ transform: 'translateZ(-10px)' }}
        />

        {/* ================= FRONT SIDE ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(2px)',
            pointerEvents: isFlipped ? 'none' : 'auto',
            zIndex: isFlipped ? 1 : 20,
            opacity: isFlipped ? 0 : 1,
            transition: 'opacity 0.25s ease'
          }}
          className="absolute inset-0 rounded-2xl bg-slate-900/90 border border-red-500/30 p-5 flex flex-col justify-between backdrop-blur-xl shadow-inner overflow-hidden select-none"
        >
          {/* Holographic Shimmer Foil Overlay */}
          <div 
            className="absolute inset-0 holographic-foil opacity-30 pointer-events-none"
            style={{
              transform: `translate(${pos.x * 0.5}px, ${pos.y * 0.5}px)`
            }}
          />

          {/* Top Header of Card */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 pointer-events-none select-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase font-mono">
                SPIDER-TECH // PASS
              </span>
            </div>

            {/* Badge Punch Slot Hole */}
            <div className="w-8 h-2 rounded-full bg-slate-950/90 border border-red-500/30 shadow-inner flex items-center justify-center pointer-events-none">
              <div className="w-3.5 h-0.5 rounded-full bg-red-500/60" />
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleFlip}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                title="Putar Kartu (Lihat Sisi Belakang)"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-slate-200 hover:text-white text-[11px] font-medium transition cursor-pointer z-30"
              >
                <RotateCw className="w-3 h-3 text-cyan-400" />
                <span>Balik</span>
              </button>
            </div>
          </div>

          {/* Avatar & Main Info (pointer-events-none ensures drag clicks pass straight to the card container) */}
          <div className="relative z-10 flex flex-col items-center text-center mt-1 pointer-events-none select-none">
            <div className="relative group pointer-events-none select-none">
              <div className="w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-red-600 via-rose-500 to-blue-600 shadow-xl shadow-red-500/25 pointer-events-none select-none">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover rounded-xl pointer-events-none select-none"
                  style={{ WebkitUserDrag: 'none', userSelect: 'none' } as React.CSSProperties}
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 bg-slate-950 border border-red-500/60 rounded-full p-1.5 shadow-lg text-red-400 pointer-events-none select-none text-xs">
                🕷️
              </div>
            </div>

            <h3 className="mt-2.5 text-lg font-bold text-white tracking-tight flex items-center gap-1.5 pointer-events-none select-none">
              {profile.name}
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs font-semibold text-cyan-400 font-mono pointer-events-none select-none">{profile.handle}</p>
            <p className="text-xs text-slate-200 mt-0.5 max-w-[240px] leading-tight line-clamp-1 pointer-events-none select-none font-medium">
              🕸️ Web-Slinger & Film Director
            </p>
          </div>

          {/* Quick Social Logos Row on Front of Card */}
          <div className="relative z-10 flex items-center justify-center gap-2.5 py-1">
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              title="Instagram: @zakkhairi_"
              className="p-1 rounded-lg bg-white/5 hover:bg-white/15 hover:scale-110 transition cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              title="TikTok: @_iniizaki"
              className="p-1 rounded-lg bg-white/5 hover:bg-white/15 hover:scale-110 transition cursor-pointer"
            >
              <TiktokIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.youtube || "https://www.youtube.com/@zakkhairi"}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              title="YouTube: @zakkhairi"
              className="p-1 rounded-lg bg-white/5 hover:bg-white/15 hover:scale-110 transition cursor-pointer"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              title="GitHub: @zakikhairi"
              className="p-1 rounded-lg bg-white/5 hover:bg-white/15 hover:scale-110 transition cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Card Footer: Barcode & Interactive Like */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2">
            {/* Simulated Barcode */}
            <div className="flex items-center space-x-[2px] opacity-75 pointer-events-none select-none">
              {[6, 14, 8, 12, 16, 4, 12, 8, 14, 6, 10, 16, 8].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-[2px] bg-red-400/80 rounded-sm"
                />
              ))}
              <span className="text-[9px] text-red-400 ml-1 font-mono font-bold">#EARTH-1610 // BUGLE</span>
            </div>

            <button
              type="button"
              onClick={handleLike}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                hasLiked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likes}</span>
            </button>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(2px)',
            pointerEvents: isFlipped ? 'auto' : 'none',
            zIndex: isFlipped ? 20 : 1,
            opacity: isFlipped ? 1 : 0,
            transition: 'opacity 0.25s ease'
          }}
          className="absolute inset-0 rounded-2xl bg-[#070a14] border border-red-500/30 p-4 flex flex-col justify-between shadow-2xl overflow-hidden text-left select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-red-500/20 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-bold flex items-center gap-1">
                <span>🕷️</span>
                <span>DAILY BUGLE PRESS</span>
              </span>
            </div>

            {/* Badge Punch Slot Hole */}
            <div className="w-8 h-2 rounded-full bg-slate-950/90 border border-red-500/30 shadow-inner flex items-center justify-center pointer-events-none">
              <div className="w-3.5 h-0.5 rounded-full bg-red-500/60" />
            </div>

            <button
              type="button"
              onClick={handleFlip}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              title="Kembali ke Depan"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-200 text-xs font-medium transition cursor-pointer z-30"
            >
              <RotateCw className="w-3 h-3 text-cyan-400" />
              <span>Depan</span>
            </button>
          </div>

          {/* User Profile & QR Code Row */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/20 border border-red-500/20 pointer-events-none select-none">
            <div className="p-1.5 bg-white rounded-xl shadow-md shrink-0">
              <QrCode className="w-14 h-14 text-slate-950" />
            </div>
            <div className="overflow-hidden min-w-0 flex-1">
              <span className="text-sm font-extrabold text-white block truncate">
                {profile.name}
              </span>
              <span className="text-xs text-red-400 font-mono font-semibold block truncate">
                {profile.handle} • SECTOR BANTEN
              </span>
              <span className="text-[11px] text-cyan-300 font-mono font-bold block truncate mt-0.5">
                S1 Sistem Informasi Gunadarma (3,75)
              </span>
              <span className="text-[11px] text-slate-300 font-mono block truncate">
                Sutradara TANAH JAWARA • PLUS MINUS
              </span>
            </div>
          </div>

          {/* Quick Links with Official Logos - Clean High-Contrast Dark Style */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-red-300/80 block px-1">
              Kanal Resmi:
            </span>

            {/* Instagram */}
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <InstagramIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold text-white">Instagram</span>
                <span className="text-[11px] text-slate-400 font-mono truncate">@zakkhairi_</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 transition shrink-0" />
            </a>

            {/* TikTok */}
            <a
              href={profile.socials.tiktok}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-white transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <TiktokIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold text-white">TikTok</span>
                <span className="text-[11px] text-slate-400 font-mono truncate">@_iniizaki</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition shrink-0" />
            </a>

            {/* YouTube */}
            <a
              href={profile.socials.youtube || "https://www.youtube.com/@zakkhairi"}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <YoutubeIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold text-white">YouTube</span>
                <span className="text-[11px] text-slate-400 font-mono truncate">@zakkhairi</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 transition shrink-0" />
            </a>

            {/* GitHub */}
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); sounds.playClick(); }}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-white transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <GithubIcon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold text-white">GitHub</span>
                <span className="text-[11px] text-slate-400 font-mono truncate">@zakikhairi</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition shrink-0" />
            </a>
          </div>

          {/* Footer of Back Card */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-red-500/20">
            <span>MULTIVERSE AGENT PASS</span>
            <span className="text-red-400 font-bold">#SPIDER-TECH</span>
          </div>
        </div>
      </div>

      {/* User Drag Hint */}
      <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-[11px] text-red-200 shadow-md">
        <span className="hidden sm:inline">🕸️ Tarik jaring untuk membal (THWIP!)</span>
        <span className="sm:hidden inline">🕸️ Sentuh & geser kartu ID Spider-Man</span>
        <span className="text-red-400">⚡</span>
      </div>
    </div>
  );
};
