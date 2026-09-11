import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const crosshairRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // 100% Realtime direct GPU transform - zero latency, exact 1:1 hardware mouse tracking
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        crosshairRef.current.style.opacity = '1';
      }

      // Fast check for interactive elements without triggering unnecessary React renders
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, [role="button"], .cursor-pointer, .glass-card, .card-shine-container')
        );
        if (isInteractive !== isHoveredRef.current) {
          isHoveredRef.current = isInteractive;
          setIsHovered(isInteractive);
        }
      }
    };

    const onMouseLeave = () => {
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Precision Cinema Crosshair Cursor (Zero Offset, 100% Realtime Hardware Tracking) */}
      <div
        ref={crosshairRef}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 150ms ease-out',
        }}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
      >
        {/* Outer Focus Reticle Ring / Target Box */}
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-150 ease-out ${
            isHovered
              ? 'w-10 h-10 border border-cyan-400 bg-cyan-400/10 shadow-[0_0_16px_rgba(6,182,212,0.6)] scale-110'
              : 'w-6 h-6 border border-white/40 bg-white/5 scale-90'
          }`}
        >
          {/* Top Reticle Tick */}
          <div
            className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 transition-colors duration-150 ${
              isHovered ? 'bg-cyan-400' : 'bg-white/60'
            }`}
          />

          {/* Bottom Reticle Tick */}
          <div
            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[1.5px] h-1.5 transition-colors duration-150 ${
              isHovered ? 'bg-cyan-400' : 'bg-white/60'
            }`}
          />

          {/* Left Reticle Tick */}
          <div
            className={`absolute -left-1.5 top-1/2 -translate-y-1/2 h-[1.5px] w-1.5 transition-colors duration-150 ${
              isHovered ? 'bg-cyan-400' : 'bg-white/60'
            }`}
          />

          {/* Right Reticle Tick */}
          <div
            className={`absolute -right-1.5 top-1/2 -translate-y-1/2 h-[1.5px] w-1.5 transition-colors duration-150 ${
              isHovered ? 'bg-cyan-400' : 'bg-white/60'
            }`}
          />

          {/* Center Precision Aim Dot */}
          <div
            className={`rounded-full transition-all duration-150 ${
              isHovered
                ? 'w-2 h-2 bg-pink-400 shadow-[0_0_8px_#f43f5e]'
                : 'w-1.5 h-1.5 bg-white shadow-[0_0_5px_#ffffff]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
