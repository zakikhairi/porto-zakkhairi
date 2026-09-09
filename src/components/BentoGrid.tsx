import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal as TerminalIcon, Sparkles, Layers, GitBranch, Code2, Flame, Award, Globe, Send, Gamepad2, RotateCcw, X } from 'lucide-react';
import type { Skill, ProfileData } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';

interface BentoGridProps {
  skills: Skill[];
  profile: ProfileData;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ skills, profile }) => {
  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: `zakikhairi.dev -> ${profile.role}` },
    { cmd: 'help', output: 'Perintah yang tersedia: skills, projects, contact, game (🎮 Play Snake), clear, matrix' }
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  // Snake Game State (Tahap 5 Easter Egg)
  const [isGameActive, setIsGameActive] = useState(false);
  const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 10, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const GRID_COLS = 16;
  const GRID_ROWS = 10;
  const dirRef = useRef(direction);
  dirRef.current = direction;

  const generateFood = useCallback((currentSnake: Array<{ x: number; y: number }>) => {
    let newFood = { x: 0, y: 0 };
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_COLS),
        y: Math.floor(Math.random() * GRID_ROWS)
      };
      const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const startSnakeGame = () => {
    const initialSnake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    setSnake(initialSnake);
    setDirection('RIGHT');
    setFood(generateFood(initialSnake));
    setScore(0);
    setIsGameOver(false);
    setIsGameActive(true);
    sounds.playSuccess();
  };

  const exitGame = () => {
    setIsGameActive(false);
    sounds.playClick();
    setTerminalHistory(prev => [
      ...prev,
      { cmd: 'game', output: `🎮 Game Selesai! Skor: ${score} | Rekor: ${Math.max(score, highScore)}. Ketik 'game' untuk main lagi!` }
    ]);
  };

  // Snake Game Loop
  useEffect(() => {
    if (!isGameActive || isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code) && dirRef.current !== 'DOWN') {
        e.preventDefault();
        setDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code) && dirRef.current !== 'UP') {
        e.preventDefault();
        setDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code) && dirRef.current !== 'RIGHT') {
        e.preventDefault();
        setDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code) && dirRef.current !== 'LEFT') {
        e.preventDefault();
        setDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const nextHead = { ...head };

        switch (dirRef.current) {
          case 'UP': nextHead.y -= 1; break;
          case 'DOWN': nextHead.y += 1; break;
          case 'LEFT': nextHead.x -= 1; break;
          case 'RIGHT': nextHead.x += 1; break;
        }

        // Wall collision
        if (nextHead.x < 0 || nextHead.x >= GRID_COLS || nextHead.y < 0 || nextHead.y >= GRID_ROWS) {
          setIsGameOver(true);
          sounds.playPop(220);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(seg => seg.x === nextHead.x && seg.y === nextHead.y)) {
          setIsGameOver(true);
          sounds.playPop(220);
          return prevSnake;
        }

        // Check eating food
        if (nextHead.x === food.x && nextHead.y === food.y) {
          sounds.playPop(750);
          setScore(s => {
            const newScore = s + 10;
            setHighScore(h => Math.max(h, newScore));
            return newScore;
          });
          setFood(generateFood([nextHead, ...prevSnake]));
          return [nextHead, ...prevSnake];
        }

        return [nextHead, ...prevSnake.slice(0, -1)];
      });
    }, 140);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isGameActive, isGameOver, food, generateFood]);

  // Skill category filter
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Frontend', 'Backend', 'AI & Cloud', 'Design/Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim().toLowerCase();
    if (!trimmed) return;

    sounds.playPop(550);
    let output = '';

    switch (trimmed) {
      case 'game':
      case 'play':
      case 'snake':
        startSnakeGame();
        setTerminalInput('');
        return;
      case 'help':
        output = 'Perintah: whoami, skills, projects, contact, game (🎮 Retro Snake), matrix, clear, date';
        break;
      case 'whoami':
        output = `${profile.name} (${profile.handle}) - ${profile.role} based in ${profile.location}`;
        break;
      case 'skills':
        output = skills.map(s => `${s.name} (${s.level}%)`).join(', ');
        break;
      case 'projects':
        output = 'Jelajahi 6 proyek unggulan di section #projects di bawah ini!';
        break;
      case 'contact':
        output = `Email: ${profile.email} | WhatsApp: ${profile.phone || '081919200602'}`;
        break;
      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        output = !isMatrixMode ? '🟩 Mode Matrix AKTIF: Wake up, Neo...' : 'Mode Matrix Nonaktif.';
        break;
      case 'date':
        output = new Date().toLocaleString('id-ID');
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Perintah '${trimmed}' tidak dikenali. Ketik 'help' atau 'game' untuk main ular!`;
    }

    setTerminalHistory(prev => [...prev, { cmd: terminalInput, output }]);
    setTerminalInput('');
  };

  return (
    <section id="bento" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Bento Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Keahlian, Aktivitas & Playground
        </h2>
        <p className="text-slate-400 text-sm">
          Semua modul di bawah ini dapat berinteraksi langsung. Uji terminal, mainkan game ular retro, dan telusuri keahlian.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Module 1: Interactive Terminal Console / Snake Game (Col 7) */}
        <div className="md:col-span-7 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-cyan-500/40 transition">
          {/* Terminal Window Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                zaki@portfolio:~{isGameActive ? '/snake-arcade' : ''}$
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isGameActive ? (
                <button
                  onClick={startSnakeGame}
                  className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 cursor-pointer transition hover:scale-105"
                  title="Mainkan Snake Game Retro"
                >
                  <Gamepad2 className="w-3 h-3" />
                  <span>Main Game</span>
                </button>
              ) : (
                <button
                  onClick={exitGame}
                  className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer transition"
                >
                  <X className="w-3 h-3" />
                  <span>Keluar Game</span>
                </button>
              )}

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                {isGameActive ? 'Arcade 8-Bit' : 'Interactive Shell'}
              </span>
            </div>
          </div>

          {/* Body: Either Snake Game or Shell Output */}
          {isGameActive ? (
            /* Retro Snake Arcade Display */
            <div className="p-3 rounded-2xl bg-black/70 border border-emerald-500/30 flex flex-col items-center justify-between space-y-3 font-mono">
              {/* Arcade Header Score Bar */}
              <div className="w-full flex items-center justify-between text-xs font-bold border-b border-white/10 pb-2">
                <span className="text-emerald-400">SKOR: {score}</span>
                <span className="text-amber-400">REKOR: {highScore}</span>
                {isGameOver ? (
                  <button
                    onClick={startSnakeGame}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-red-600 text-white text-[11px] animate-pulse cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Main Lagi</span>
                  </button>
                ) : (
                  <span className="text-slate-400 text-[10px]">Gunakan Tombol Panah</span>
                )}
              </div>

              {/* 16x10 Snake Grid */}
              <div
                className="relative w-full max-w-[360px] aspect-[16/10] bg-slate-950/90 rounded-xl border border-emerald-500/20 p-1 grid gap-[1px]"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`
                }}
              >
                {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, idx) => {
                  const x = idx % GRID_COLS;
                  const y = Math.floor(idx / GRID_COLS);
                  const isHead = snake[0].x === x && snake[0].y === y;
                  const isBody = !isHead && snake.some(s => s.x === x && s.y === y);
                  const isFood = food.x === x && food.y === y;

                  return (
                    <div
                      key={idx}
                      className={`rounded-[2px] transition-colors ${
                        isHead
                          ? 'bg-emerald-300 ring-1 ring-white shadow-[0_0_8px_rgba(110,231,183,1)]'
                          : isBody
                          ? 'bg-emerald-500/90'
                          : isFood
                          ? 'bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,1)] animate-ping'
                          : 'bg-white/[0.02]'
                      }`}
                    />
                  );
                })}

                {/* Game Over Banner Overlay */}
                {isGameOver && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center rounded-xl p-2 text-center animate-fadeIn">
                    <span className="text-red-400 font-bold text-sm tracking-wider">GAME OVER!</span>
                    <span className="text-xs text-white mt-1">Skor Akhir: {score}</span>
                    <button
                      onClick={startSnakeGame}
                      className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:scale-105 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Coba Lagi</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Touch Direction Controls (Tactile D-Pad) */}
              <div className="flex flex-col items-center gap-1.5 pt-1 select-none">
                <button
                  type="button"
                  onClick={() => dirRef.current !== 'DOWN' && setDirection('UP')}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:bg-emerald-500 active:scale-90 active:text-slate-950 text-white flex items-center justify-center font-bold text-sm shadow-md transition-all touch-none"
                >
                  ▲
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => dirRef.current !== 'RIGHT' && setDirection('LEFT')}
                    className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:bg-emerald-500 active:scale-90 active:text-slate-950 text-white flex items-center justify-center font-bold text-sm shadow-md transition-all touch-none"
                  >
                    ◄
                  </button>
                  <button
                    type="button"
                    onClick={() => dirRef.current !== 'UP' && setDirection('DOWN')}
                    className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:bg-emerald-500 active:scale-90 active:text-slate-950 text-white flex items-center justify-center font-bold text-sm shadow-md transition-all touch-none"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => dirRef.current !== 'LEFT' && setDirection('RIGHT')}
                    className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:bg-emerald-500 active:scale-90 active:text-slate-950 text-white flex items-center justify-center font-bold text-sm shadow-md transition-all touch-none"
                  >
                    ►
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Normal Terminal Shell */
            <>
              <div className={`font-mono text-xs space-y-2 overflow-y-auto max-h-56 min-h-[160px] p-2 rounded-xl bg-black/40 border border-white/5 ${
                isMatrixMode ? 'text-emerald-400' : 'text-slate-300'
              }`}>
                {terminalHistory.map((item, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex items-center gap-1 text-pink-400">
                      <span className="text-cyan-400">❯</span>
                      <span>{item.cmd}</span>
                    </div>
                    <div className="pl-3 opacity-90 leading-relaxed">{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleTerminalSubmit} className="mt-4 flex items-center gap-2">
                <span className="text-cyan-400 font-mono text-sm">❯</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Ketik 'game', 'skills', 'matrix', 'contact'..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}
        </div>

        {/* Module 2: Tech Radar / Skills (Col 5) */}
        <div className="md:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between shadow-2xl group hover:border-purple-500/40 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Code2 className="w-4 h-4 text-pink-400" />
                Tech Radar & Stack
              </h3>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    sounds.playClick();
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white font-semibold shadow'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills List with Level Bars */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {filteredSkills.map(skill => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                      {skill.name}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module 3: GitHub Activity Heatmap Simulation (Col 8) */}
        <div className="md:col-span-8 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col justify-between group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Aktivitas Kode & Kontribusi</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {profile.stats.codeCommits}+ commits tahun ini
            </span>
          </div>

          {/* Simulated Commit Heatmap Grid */}
          <div className="p-3 rounded-2xl bg-black/30 border border-white/5 overflow-x-auto">
            <div className="flex gap-1 min-w-[500px]">
              {Array.from({ length: 32 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    const intensity = (colIdx * 7 + rowIdx) % 5;
                    const colors = [
                      'bg-slate-800/60',
                      'bg-emerald-950 text-emerald-300',
                      'bg-emerald-700 text-emerald-200',
                      'bg-emerald-500 text-slate-900',
                      'bg-emerald-400 text-slate-950 shadow-sm shadow-emerald-400/50'
                    ];
                    return (
                      <div
                        key={rowIdx}
                        title={`Minggu ${colIdx + 1}: ${intensity * 3} aktivitas`}
                        className={`w-3 h-3 rounded-[3px] ${colors[intensity]} transition-transform hover:scale-125 cursor-pointer`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-white/5">
            <span>Konsistensi setiap minggu</span>
            <div className="flex items-center gap-1.5">
              <span>Kurang</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
              <span>Banyak</span>
            </div>
          </div>
        </div>

        {/* Module 4: Quick Philosophy & Superpowers (Col 4) */}
        <div className="md:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col justify-between group hover:border-pink-500/40 transition">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-pink-400" />
              <h3 className="font-bold text-white text-base">Prinsip Kerja</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Tidak cuma fungsional, website harus menyenangkan saat disentuh dan memukau saat dilihat.&quot;
            </p>
          </div>

          <div className="space-y-2 mt-4">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <Award className="w-4 h-4 text-yellow-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">Micro-Interactions</span>
                <span className="text-[11px] text-slate-400">Detail gerak dan transisi halus</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">Fast & SEO Ready</span>
                <span className="text-[11px] text-slate-400">Optimal di Google & Web Vitals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
