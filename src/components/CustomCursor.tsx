import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const crosshairRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const isRunning = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsTouchDevice(false);

    const updateLoop = () => {
      // Instant precision tracking with ultra-smooth 60-120fps direct positioning
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * 0.35;
      currentPos.current.y += dy * 0.35;

      if (crosshairRef.current) {
        // Exactly at mouse coordinates, perfectly centered
        crosshairRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        rafId.current = requestAnimationFrame(updateLoop);
        isRunning.current = true;
      } else {
        isRunning.current = false;
      }
    };

    let hoverCheckThrottle = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isRunning.current) {
        isRunning.current = true;
        rafId.current = requestAnimationFrame(updateLoop);
      }

      const now = performance.now();
      if (now - hoverCheckThrottle > 45) {
        hoverCheckThrottle = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          const isInteractive = !!target.closest('a, button, input, textarea, [role="button"], .cursor-pointer, .glass-card, .card-shine-container');
          setIsHovered(prev => (prev !== isInteractive ? isInteractive : prev));
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Precision Cinema Crosshair Cursor (Zero Offset, Centered) */}
      <div
        ref={crosshairRef}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-200 ease-out"
      >
        {/* Outer Focus Reticle Ring / Target Box */}
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
            isHovered
              ? 'w-10 h-10 border border-cyan-400 bg-cyan-400/10 shadow-[0_0_16px_rgba(6,182,212,0.6)] scale-110'
              : 'w-6 h-6 border border-white/40 bg-white/5 scale-90'
          }`}
        >
          {/* Top Reticle Tick */}
          <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 transition-colors ${
            isHovered ? 'bg-cyan-400' : 'bg-white/60'
          }`} />

          {/* Bottom Reticle Tick */}
          <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 transition-colors ${
            isHovered ? 'bg-cyan-400' : 'bg-white/60'
          }`} />

          {/* Left Reticle Tick */}
          <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 h-[1.5px] w-1.5 transition-colors ${
            isHovered ? 'bg-cyan-400' : 'bg-white/60'
          }`} />

          {/* Right Reticle Tick */}
          <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 h-[1.5px] w-1.5 transition-colors ${
            isHovered ? 'bg-cyan-400' : 'bg-white/60'
          }`} />

          {/* Center Precision Aim Dot */}
          <div className={`rounded-full transition-all duration-150 ${
            isHovered 
              ? 'w-2 h-2 bg-pink-400 shadow-[0_0_8px_#f43f5e]' 
              : 'w-1.5 h-1.5 bg-white shadow-[0_0_5px_#ffffff]'
          }`} />
        </div>
      </div>
    </div>
  );
};
