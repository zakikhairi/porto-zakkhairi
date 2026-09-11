import React from 'react';

export const DoubleMarqueeDivider: React.FC = () => {
  return (
    <div className="marquee-divider select-none">
      {/* Top Strip (Spidey Red, Angled +2.2deg) */}
      <div className="marquee-strip marquee-top">
        <div className="animate-marquee flex items-center gap-6">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-yellow-300">★</span>
              <span>KARYA TERPILIH</span>
              <span className="text-yellow-300">★</span>
              <span>SUTRADARA &apos;TANAH JAWARA&apos;</span>
              <span className="text-yellow-300">★</span>
              <span>PRODUSER JUARA 1 &apos;PLUS MINUS&apos;</span>
              <span className="text-yellow-300">★</span>
              <span>SMANTINEMA CINEMA</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Strip (Comic Dark Blue, Angled -2.8deg) */}
      <div className="marquee-strip marquee-bottom">
        <div className="animate-marquee flex items-center gap-6" style={{ animationDirection: 'reverse' }}>
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-red-500">🕷️</span>
              <span>S1 SISTEM INFORMASI GUNADARMA</span>
              <span className="text-yellow-300 font-mono">IPK 3.75</span>
              <span className="text-red-500">🕸️</span>
              <span>WAKIL KETUA CREATIVE MEDIA LEU</span>
              <span className="text-cyan-400">★</span>
              <span>JUARA HARAPAN 1 FOTOGRAFI BADUY</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
