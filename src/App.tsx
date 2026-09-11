import { useState, useEffect, useRef, memo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { ProjectsSection } from './components/ProjectsSection';
import { GuestbookSection } from './components/GuestbookSection';
import { ContactSection } from './components/ContactSection';
import { ResumeSection } from './components/ResumeSection';
import { CmsStudioModal } from './components/CmsStudioModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CustomCursor } from './components/CustomCursor';
import { IntroLoadingScreen } from './components/IntroLoadingScreen';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DirectorsViewfinder } from './components/DirectorsViewfinder';
import { initialProfile, initialProjects, initialSkills, initialGuestbook, themes } from './data/initialData';
import type { ProfileData, Project, Skill, GuestbookEntry, ThemeKey } from './types/portfolio';
import { sounds } from './utils/soundEffects';
import { Sliders, Sparkles } from 'lucide-react';

// Isolated GPU-accelerated spotlight glow (moves hardware texture via translate3d, zero paint cost)
const SpotlightGlow = memo(({ glowColor }: { glowColor: string }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.transform = `translate3d(${e.clientX - 325}px, ${e.clientY - 325}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [glowColor]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed top-0 left-0 w-[650px] h-[650px] rounded-full z-30 opacity-35 transition-opacity duration-300 will-change-transform"
      style={{
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        transform: 'translate3d(-325px, -325px, 0)'
      }}
    />
  );
});

export function App() {
  // Local storage state initialization with fallbacks
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.avatarUrl = '/profile.jpg?v=2';
        if (parsed.name && (parsed.name.toLowerCase().includes('ikky') || !parsed.name.includes('Zaki'))) {
          parsed.name = 'Muhammad Zaki Khairi';
          parsed.handle = '@zakikhairi';
        }
        parsed.email = 'muhammadzakikhairi19@gmail.com';
        parsed.phone = '081919200602';
        parsed.location = 'Rangkasbitung - Lebak, Banten 🇮🇩';
        if (!parsed.socials || parsed.socials.tiktok !== 'https://www.tiktok.com/@_iniizaki' || parsed.socials.youtube !== 'https://www.youtube.com/@zakkhairi') {
          parsed.socials = {
            ...parsed.socials,
            tiktok: 'https://www.tiktok.com/@_iniizaki',
            instagram: 'https://www.instagram.com/zakkhairi_/',
            github: 'https://github.com/zakikhairi',
            youtube: 'https://www.youtube.com/@zakkhairi'
          };
        }
        if (!parsed.role || parsed.role.includes('Fullstack Developer')) {
          parsed.role = initialProfile.role;
          parsed.bio = initialProfile.bio;
          parsed.headline = initialProfile.headline;
          parsed.status = initialProfile.status;
        }
        return parsed;
      } catch {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      try {
        const parsed: Project[] = JSON.parse(saved);
        const hasFilms = parsed.some(p => p.id && p.id.startsWith('film-'));
        const hasRepos = parsed.some(p => p.id && p.id.startsWith('repo-'));
        const hasPhoto = parsed.some(p => p.category === 'fotografi' || p.id === 'foto-history-fair-2022');
        const hasVercel = parsed.some(p => p.demoUrl && p.demoUrl.includes('vercel.app'));
        if (!hasFilms || !hasRepos || !hasPhoto || !hasVercel) {
          return initialProjects;
        }
        return parsed.map(p => {
          const init = initialProjects.find(ip => ip.id === p.id);
          if (init && (init.id === 'repo-kai-finder' || init.id === 'repo-ppdb1' || init.id === 'repo-ticzi')) {
            return {
              ...p,
              title: init.title,
              tagline: init.tagline,
              demoUrl: init.demoUrl,
              githubUrl: init.githubUrl,
              stats: init.stats,
              tags: init.tags
            };
          }
          return p;
        });
      } catch {
        return initialProjects;
      }
    }
    return initialProjects;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() => {
    const saved = localStorage.getItem('portfolio_guestbook');
    return saved ? JSON.parse(saved) : initialGuestbook;
  });

  const [themeKey, setThemeKey] = useState<ThemeKey>(() => {
    const saved = localStorage.getItem('portfolio_theme') as ThemeKey;
    return saved && themes[saved] ? saved : 'cyberpunk';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Cinematic Intro & Loading Screen on site opening
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);

  // Secret Admin Mode (Hidden from public visitors by default)
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('cms') === 'true' || params.get('edit') === 'true') {
        localStorage.setItem('portfolio_admin_mode', 'true');
        return true;
      }
      return localStorage.getItem('portfolio_admin_mode') === 'true';
    }
    return false;
  });

  // Director's Viewfinder Mode State
  const [isViewfinderOpen, setIsViewfinderOpen] = useState(false);

  // Secret Keyboard Shortcut (Ctrl + Shift + E) to toggle Admin Mode, and 'V' for Viewfinder
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsAdminMode(prev => {
          const next = !prev;
          if (next) {
            localStorage.setItem('portfolio_admin_mode', 'true');
            sounds.playSuccess();
            setIsCmsOpen(true);
          } else {
            localStorage.removeItem('portfolio_admin_mode');
            sounds.playPop(300);
            setIsCmsOpen(false);
          }
          return next;
        });
      } else if (e.code === 'KeyV' && !e.metaKey && !e.ctrlKey && !(e.target as HTMLElement)?.closest('input, textarea')) {
        setIsViewfinderOpen(prev => {
          const next = !prev;
          if (next) sounds.playCameraShutter();
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_guestbook', JSON.stringify(guestbook));
  }, [guestbook]);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', themeKey);
  }, [themeKey]);

  useEffect(() => {
    localStorage.setItem('portfolio_sound', JSON.stringify(soundEnabled));
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handlers
  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const handleSelectTheme = (newTheme: ThemeKey) => {
    setThemeKey(newTheme);
  };

  const handleAddGuestbookEntry = (entry: Omit<GuestbookEntry, 'id' | 'timestamp' | 'likes' | 'likedByMe'>) => {
    const newEntry: GuestbookEntry = {
      ...entry,
      id: `gb-${Date.now()}`,
      timestamp: 'Baru saja',
      likes: 1,
      likedByMe: true
    };
    setGuestbook([newEntry, ...guestbook]);
  };

  const handleLikeGuestbookEntry = (id: string) => {
    setGuestbook(prev =>
      prev.map(item => {
        if (item.id === id) {
          const isLiked = item.likedByMe;
          return {
            ...item,
            likes: isLiked ? item.likes - 1 : item.likes + 1,
            likedByMe: !isLiked
          };
        }
        return item;
      })
    );
  };

  const handleDeleteGuestbookEntry = (id: string) => {
    setGuestbook(prev => prev.filter(item => item.id !== id));
  };

  const handleResetData = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setSkills(initialSkills);
    setGuestbook(initialGuestbook);
    setThemeKey('cyberpunk');
    localStorage.clear();
  };

  const currentTheme = themes[themeKey];

  return (
    <div
      style={{
        background: currentTheme.bgGradient,
        minHeight: '100vh',
        transition: 'background 0.8s ease'
      }}
      className="relative text-slate-100 select-none cursor-default"
    >
      {/* Cinematic Director & Tech Intro Loading Screen */}
      {showIntro && (
        <IntroLoadingScreen
          name={profile.name}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* Interactive Cursor Ambient Glow Spotlight */}
      <SpotlightGlow glowColor={currentTheme.glowColor} />

      {/* Grid Pattern Background Layer */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Navbar */}
      <Navbar
        currentTheme={themeKey}
        onSelectTheme={handleSelectTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenCms={() => setIsCmsOpen(true)}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => {
          setIsAdminMode(prev => {
            const next = !prev;
            if (next) {
              localStorage.setItem('portfolio_admin_mode', 'true');
              sounds.playSuccess();
              setIsCmsOpen(true);
            } else {
              localStorage.removeItem('portfolio_admin_mode');
              sounds.playPop(300);
              setIsCmsOpen(false);
            }
            return next;
          });
        }}
        onOpenViewfinder={() => setIsViewfinderOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          profile={profile}
          onOpenViewfinder={() => setIsViewfinderOpen(true)}
        />

        <BentoGrid
          skills={skills}
          profile={profile}
        />

        <ResumeSection
          profile={profile}
        />

        <ProjectsSection
          projects={projects}
        />

        <GuestbookSection
          entries={guestbook}
          onAddEntry={handleAddGuestbookEntry}
          onLikeEntry={handleLikeGuestbookEntry}
          onDeleteEntry={handleDeleteGuestbookEntry}
          isAdmin={true}
        />

        <ContactSection
          profile={profile}
          onReplayIntro={() => {
            setShowIntro(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      {/* Floating Quick WhatsApp Online Badge (Tahap 3) */}
      <FloatingWhatsApp phone={profile.phone} name={profile.name} />

      {/* Modern Custom Interactive Cursor Glow (Tahap 6) */}
      <CustomCursor />

      {/* Floating Bottom Navigation Bar for Mobile Phones */}
      <MobileBottomNav />

      {/* Floating Quick CMS Access Button (Only visible in secret Admin Mode) */}
      {isAdminMode && (
        <div className="fixed bottom-18 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
          <button
            onClick={() => {
              setIsCmsOpen(true);
              sounds.playSuccess();
            }}
            className="group flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-xs shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <Sliders className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Edit via CMS</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          </button>

          <button
            onClick={() => {
              setIsAdminMode(false);
              localStorage.removeItem('portfolio_admin_mode');
              sounds.playPop(300);
            }}
            title="Kunci & Sembunyikan CMS (Kembali ke Mode Publik)"
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-slate-400 hover:text-white shadow-xl transition cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* In-Browser CMS Studio Modal */}
      <CmsStudioModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        profile={profile}
        onUpdateProfile={setProfile}
        projects={projects}
        onUpdateProjects={setProjects}
        skills={skills}
        onUpdateSkills={setSkills}
        guestbook={guestbook}
        onUpdateGuestbook={setGuestbook}
        onResetData={handleResetData}
        onExitAdmin={() => {
          setIsAdminMode(false);
          localStorage.removeItem('portfolio_admin_mode');
        }}
      />

      {/* Professional Cinema Director's Viewfinder Mode */}
      <DirectorsViewfinder
        isOpen={isViewfinderOpen}
        onClose={() => setIsViewfinderOpen(false)}
        currentTheme={themeKey}
        onSelectTheme={handleSelectTheme}
      />
    </div>
  );
}

export default App;
