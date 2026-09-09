import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Only enable custom cursor for pointer-fine desktop devices
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer, .glass-card');
        setIsHovered(!!isInteractive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Outer Magnetic Glow Aura */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          transition: 'width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out',
        }}
        className={`fixed rounded-full pointer-events-none mix-blend-screen filter blur-[1px] ${
          isHovered
            ? 'w-12 h-12 bg-cyan-400/30 border border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
            : 'w-7 h-7 bg-pink-500/20 border border-pink-400/30 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
        }`}
      />

      {/* Tiny Core Dot */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
        className={`fixed rounded-full pointer-events-none transition-transform duration-75 ${
          isHovered ? 'w-2 h-2 bg-cyan-300' : 'w-1.5 h-1.5 bg-white'
        }`}
      />
    </div>
  );
};
