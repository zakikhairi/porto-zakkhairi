import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
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
      // Smooth linear interpolation for outer magnetic aura
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * 0.22;
      currentPos.current.y += dy * 0.22;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Keep loop running if there's noticeable motion or mouse is active
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
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

      // Throttle hover DOM query to once every 60ms
      const now = performance.now();
      if (now - hoverCheckThrottle > 60) {
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
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Outer Fluid Magnetic Aura Ring */}
      <div
        ref={auraRef}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform, width, height',
          transition: 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1), height 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s ease, background-color 0.2s ease',
        }}
        className={`fixed rounded-full pointer-events-none ${
          isHovered
            ? 'w-12 h-12 bg-cyan-400/20 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.45)]'
            : 'w-7 h-7 bg-pink-500/15 border border-pink-400/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
        }`}
      />

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform',
        }}
        className={`fixed rounded-full pointer-events-none transition-colors duration-150 ${
          isHovered ? 'w-2 h-2 bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]'
        }`}
      />
    </div>
  );
};
