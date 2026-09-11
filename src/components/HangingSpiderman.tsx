import React from 'react';
import { sounds } from '../utils/soundEffects';

export const HangingSpiderman: React.FC = () => {
  const handleClick = () => {
    sounds.playWebThwip();
  };

  return (
    <div
      onClick={handleClick}
      title="Spider-Man (Klik untuk THWIP!)"
      className="hidden md:block fixed top-0 right-6 lg:right-16 z-40 cursor-pointer select-none pointer-events-auto group animate-spidey-swing"
    >
      <svg
        width="80"
        height="160"
        viewBox="0 0 90 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_8px_15px_rgba(5,10,30,0.8)] group-hover:scale-110 transition-transform"
      >
        {/* Web line from top ceiling */}
        <line
          x1="45"
          y1="0"
          x2="45"
          y2="75"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="45"
          y1="0"
          x2="45"
          y2="75"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Hanging Spider-Man Body (Upside down) */}
        <g transform="translate(15, 70)">
          {/* Web thread held by hand */}
          <circle cx="30" cy="5" r="4" fill="#e62429" stroke="#050a1c" strokeWidth="2" />

          {/* Arms holding web */}
          <path
            d="M 30 5 L 20 22 L 26 34"
            stroke="#1e5fb0"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 30 5 L 40 22 L 34 34"
            stroke="#1e5fb0"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Torso */}
          <path
            d="M 22 28 Q 30 25 38 28 L 40 50 Q 30 56 20 50 Z"
            fill="#e62429"
            stroke="#050a1c"
            strokeWidth="2.5"
          />
          {/* Blue Torso Sides */}
          <path
            d="M 21 32 Q 26 38 21 48 L 19 47 Z"
            fill="#1e5fb0"
          />
          <path
            d="M 39 32 Q 34 38 39 48 L 41 47 Z"
            fill="#1e5fb0"
          />

          {/* Spider Symbol on Chest */}
          <path
            d="M 30 38 L 30 46 M 27 40 L 33 44 M 27 44 L 33 40"
            stroke="#050a1c"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Legs bent upwards */}
          <path
            d="M 23 28 L 12 12 L 18 2"
            stroke="#e62429"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 37 28 L 48 12 L 42 2"
            stroke="#e62429"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Blue thighs */}
          <path
            d="M 23 26 L 16 16"
            stroke="#1e5fb0"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 37 26 L 44 16"
            stroke="#1e5fb0"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Spider-Man Head (at the bottom) */}
          <ellipse
            cx="30"
            cy="66"
            rx="12"
            ry="14"
            fill="#e62429"
            stroke="#050a1c"
            strokeWidth="2.5"
          />

          {/* Head Webbing */}
          <path
            d="M 30 52 L 30 80 M 18 66 L 42 66"
            stroke="#050a1c"
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Big Comic Eyes */}
          <path
            d="M 22 62 Q 28 64 28 72 Q 22 70 20 64 Z"
            fill="#ffffff"
            stroke="#050a1c"
            strokeWidth="2"
          />
          <path
            d="M 38 62 Q 32 64 32 72 Q 38 70 40 64 Z"
            fill="#ffffff"
            stroke="#050a1c"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};
