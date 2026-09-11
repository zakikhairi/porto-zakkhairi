import React, { useEffect, useState } from 'react';
import { sounds } from '../utils/soundEffects';

export const HangingSpiderman: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionTwo = document.getElementById('about');

      if (!sectionTwo) {
        setIsVisible(scrollY > 70);
        return;
      }

      const rect = sectionTwo.getBoundingClientRect();
      // When user starts scrolling past the hero towards section two, Spidey pulls down!
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    sounds.playWebThwip();
  };

  return (
    <div
      id="spidey-puller"
      onClick={handleClick}
      title="Spider-Man (Klik untuk THWIP!)"
      className={`spidey-puller hidden md:flex cursor-pointer select-none pointer-events-auto ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <img
        src="/spidey/spiderman-hanging-upside-down.png"
        alt="Spider-Man Hanging Upside Down"
        className="hover:scale-105 transition-transform"
      />
    </div>
  );
};
