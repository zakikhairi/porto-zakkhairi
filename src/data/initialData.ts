import type { ProfileData, Project, Skill, GuestbookEntry, ThemeConfig, ThemeKey, EducationItem, ExperienceItem } from '../types/portfolio';

export const initialProfile: ProfileData = {
  name: "Muhammad Zaki Khairi",
  handle: "@zakikhairi",
  role: "S1 Sistem Informasi Gunadarma • Film Director & Creative Media",
  headline: "🕷️ Friendly Neighborhood Tech & Director • S1 SI Gunadarma • Film Producer",
  bio: "Mahasiswa S1 Sistem Informasi Universitas Gunadarma (IPK 3,75) dengan fokus pada teknologi informasi, media kreatif, dan visual branding. Sutradara film 'TANAH JAWARA', Produser Juara 1 'PLUS MINUS' (SMANTINEMA), serta Wakil Ketua Creative Media Lebak Expo University.",
  status: "🕸️ Available for Tech, Film & Creative Missions",
  location: "Rangkasbitung - Lebak, Banten 🇮🇩",
  email: "muhammadzakikhairi19@gmail.com",
  phone: "081919200602",
  avatarUrl: "/profile.jpg?v=2",
  socials: {
    github: "https://github.com/zakikhairi",
    tiktok: "https://www.tiktok.com/@_iniizaki",
    instagram: "https://www.instagram.com/zakkhairi_/",
    youtube: "https://www.youtube.com/@zakkhairi",
    linkedin: "https://linkedin.com/in/zakikhairi",
    twitter: "https://x.com/zakikhairi"
  },
  stats: {
    projectsCount: 18,
    yearsExperience: 3,
    satisfiedClients: 25,
    codeCommits: 850,
    gpa: "3.75"
  }
};

export const initialEducation: EducationItem[] = [
  {
    id: "edu-gunadarma",
    institution: "Universitas Gunadarma",
    degree: "S1 Sistem Informasi",
    period: "Jan 2024 - Sekarang",
    score: "3,75",
    scoreLabel: "IPK",
    description: "Mendalami teknologi informasi, arsitektur sistem informasi, rekayasa data cerdas, dan pemrograman terstruktur dengan performa akademik unggul.",
    relevantCourses: [
      "Komputasi Big Data",
      "Teknologi Kecerdasan Artifisial",
      "Sistem Basis Data 1",
      "Teknik Pemrograman Terstruktur",
      "Konsep Sistem dan Teknologi Sistem Informasi"
    ]
  },
  {
    id: "edu-sman3",
    institution: "SMAN 3 Rangkasbitung",
    degree: "Jurusan MIPA (Ilmu Pengetahuan Alam)",
    period: "2021 - 2024",
    score: "88",
    scoreLabel: "Nilai Rata-rata",
    description: "Lulusan MIPA berprestasi, aktif memimpin komunitas sinematografi SMANTINEMA, memproduksi karya film fiksi dan dokumenter peraih Juara 1 Tingkat Provinsi."
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: "exp-lebak-wakil",
    role: "Wakil Ketua Creative Media",
    organization: "Lebak Expo University",
    period: "Agu 2025 - Jan 2026",
    badge: "Leadership & Branding",
    description: "Memimpin strategi komunikasi visual, kampanye digital terpadu, dan supervisi produksi konten kreatif acara expo universitas terbesar di Kabupaten Lebak.",
    responsibilities: [
      "Bertanggung jawab dalam merancang konsep kreatif, visual branding, dan aset desain untuk kebutuhan publikasi cetak maupun digital di media sosial.",
      "Memproduksi konten multimedia kreatif seperti video promosi, reels, dan materi visual interaktif guna mendongkrak jangkauan (reach) informasi acara.",
      "Menyusun strategi konten penyiaran dan berkolaborasi secara intensif bersama divisi lain untuk menyelaraskan publikasi kampanye kreatif."
    ]
  },
  {
    id: "exp-lebak-anggota",
    role: "Anggota Creative Media",
    organization: "Lebak Expo University",
    period: "Sep 2024 - Jan 2025",
    badge: "Content Strategy & Design",
    description: "Berperan aktif dalam perencanaan publikasi terstruktur, kurasi materi visual, serta eksekusi desain grafis sosial media.",
    responsibilities: [
      "Bertanggung jawab dalam merancang konsep kreatif, visual branding, dan aset desain untuk kebutuhan publikasi cetak maupun digital di media sosial Lebak Expo University.",
      "Menyusun strategi konten dan mengelola aset media sosial resmi, termasuk pembuatan content planner bulanan agar publikasi berjalan secara konsisten dan terstruktur.",
      "Bekerjasama dengan divisi internal (seperti Humas atau Acara) untuk menyelaraskan pesan komunikasi korporat ke dalam bentuk media visual yang interaktif dan mudah dipahami publik."
    ]
  }
];

export const initialProjects: Project[] = [
  {
    id: "film-plus-minus",
    title: "PLUS MINUS",
    tagline: "Juara 1 Film Pendek Tingkat Provinsi • Producer",
    description: "Juara 1 Film Pendek Bertema Pendidikan Siswa SMA tingkat Provinsi. Menampilkan narasi mendalam tentang dinamika dunia pendidikan, perjuangan belajar, dan persahabatan generasi muda. Diproduseri langsung oleh Muhammad Zaki Khairi bersama tim SMANTINEMA.",
    tags: ["Producer", "Juara 1 Provinsi", "Short Film", "SMANTINEMA", "Education"],
    category: "film",
    image: "https://i.ytimg.com/vi/pmeBmZwUYU0/hqdefault.jpg",
    demoUrl: "https://youtu.be/pmeBmZwUYU0",
    youtubeId: "pmeBmZwUYU0",
    featured: true,
    color: "#eab308",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    stats: [
      { label: "Prestasi", value: "Juara 1" },
      { label: "Peran", value: "Producer" }
    ]
  },
  {
    id: "film-tanah-jawara",
    title: "TANAH JAWARA",
    tagline: "Film Pendek Sutradara • Director",
    description: "Karya film pendek fiksi penuh ketegangan dan kearifan lokal Banten yang diproduksi bersama SMANTINEMA SMAN 3 Rangkasbitung. Disutradarai langsung oleh Muhammad Zaki Khairi dengan fokus pada dinamika karakter, sinematografi atmosferik, dan pesan moral yang kuat.",
    tags: ["Director", "Short Film", "SMANTINEMA", "Cinematography", "Action/Drama"],
    category: "film",
    image: "https://i.ytimg.com/vi/02M2IBbGUXU/hqdefault.jpg",
    demoUrl: "https://youtu.be/02M2IBbGUXU",
    youtubeId: "02M2IBbGUXU",
    featured: true,
    color: "#f43f5e",
    gradient: "from-red-600 via-rose-500 to-amber-500",
    stats: [
      { label: "Peran", value: "Director" },
      { label: "Format", value: "Short Film" }
    ]
  },
  {
    id: "film-dokumentasi-terakhir",
    title: "Dokumentasi Terakhir - Anderpati 30",
    tagline: "Film Dokumenter & Sinema Perpisahan • Producer",
    description: "Karya sinematik dokumenter emosional yang mengabadikan memori, kebersamaan, dan momentum bersejarah generasi Anderpati 30 SMAN 3 Rangkasbitung. Muhammad Zaki Khairi memimpin jalannya seluruh manajemen pra hingga pasca produksi sebagai Produser.",
    tags: ["Producer", "Dokumenter", "Anderpati 30", "SMANTINEMA", "Production"],
    category: "film",
    image: "https://i.ytimg.com/vi/UzfRLkaq93E/hqdefault.jpg",
    demoUrl: "https://youtu.be/UzfRLkaq93E",
    youtubeId: "UzfRLkaq93E",
    featured: true,
    color: "#8b5cf6",
    gradient: "from-purple-600 via-indigo-500 to-pink-500",
    stats: [
      { label: "Peran", value: "Producer" },
      { label: "Genre", value: "Dokumenter" }
    ]
  },
  {
    id: "foto-history-fair-2022",
    title: "Penenun Baduy - History Fair 2022",
    tagline: "Juara Harapan 1 Lomba Fotografi Nasional",
    description: "Karya fotografi dokumenter budaya yang mengabadikan potret autentik seorang wanita adat Baduy yang sedang menenun kain tradisional di rumah panggung khas Baduy. Berhasil meraih Juara Harapan 1 pada Lomba Fotografi Tingkat Nasional History Fair 2022 yang diselenggarakan oleh HIMAPES FKIP Universitas Sriwijaya (UNSRI).",
    tags: ["Juara Harapan 1", "Fotografi Nasional", "Budaya Baduy", "Kearifan Lokal", "Tenun Baduy", "UNSRI"],
    category: "fotografi",
    image: "/projects/lomba-fotografi-award.png",
    images: [
      "/projects/lomba-fotografi-award.png",
      "/projects/lomba-fotografi-baduy.jpg"
    ],
    slides: [
      {
        image: "/projects/lomba-fotografi-award.png",
        caption: "Pengumuman Juara Harapan 1 Lomba Fotografi",
        subtitle: "History Fair 2022 • HIMAPES FKIP Universitas Sriwijaya",
        instagramUrl: "https://www.instagram.com/p/CkzfRmevkCT/?img_index=4&stkn=MXF5a2pnZ2N1YW1seQ=="
      },
      {
        image: "/projects/lomba-fotografi-baduy.jpg",
        caption: "Karya Fotografi Peserta No. 23: Penenun Tradisional Baduy",
        subtitle: "Karya M. Zaki Khairi (SMAN 3 Rangkasbitung)",
        instagramUrl: "https://www.instagram.com/p/Ckaiz1hv_EU/?stkn=MXJqODJhc2V3Z2RsMA=="
      }
    ],
    demoUrl: "https://www.instagram.com/p/CkzfRmevkCT/?img_index=4&stkn=MXF5a2pnZ2N1YW1seQ==",
    instagramUrl: "https://www.instagram.com/p/CkzfRmevkCT/?img_index=4&stkn=MXF5a2pnZ2N1YW1seQ==",
    featured: true,
    color: "#ec4899",
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    stats: [
      { label: "Prestasi", value: "Juara Harapan 1" },
      { label: "Tingkat", value: "Nasional" },
      { label: "Slide", value: "2 Foto" }
    ]
  },
  {
    id: "repo-kai-finder",
    title: "KAI Recruitment",
    tagline: "Portal Rekrutmen & Karier KAI",
    description: "Aplikasi penelusuran informasi lowongan dan rekrutmen Kereta Api Indonesia (KAI) yang responsif, cepat, dan terintegrasi.",
    tags: ["JavaScript", "Web App", "Recruitment", "KAI", "Vercel"],
    category: "web",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://kai-recruitment.vercel.app/",
    githubUrl: "https://github.com/zakikhairi/kai-finder",
    featured: true,
    color: "#0284c7",
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    stats: [
      { label: "Deploy", value: "Vercel" },
      { label: "Platform", value: "Web App" }
    ]
  },
  {
    id: "repo-ppdb1",
    title: "PPDB Online System",
    tagline: "Sistem Penerimaan Peserta Didik Baru",
    description: "Platform pendaftaran dan seleksi peserta didik baru berbasis TypeScript dengan validasi formulir, tracking berkas, dan dashboard administrasi sekolah.",
    tags: ["TypeScript", "Fullstack", "School Admission", "Web App", "Vercel"],
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://ppdb1.vercel.app/",
    githubUrl: "https://github.com/zakikhairi/ppdb1",
    featured: true,
    color: "#10b981",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
    stats: [
      { label: "Deploy", value: "Vercel" },
      { label: "Stack", value: "TypeScript" }
    ]
  },
  {
    id: "repo-ticzi",
    title: "Ticzi",
    tagline: "Interactive TypeScript Application",
    description: "Aplikasi web interaktif modern yang dibangun dengan TypeScript, mengutamakan performa kilat, animasi dinamis, modularitas komponen, dan antarmuka responsif.",
    tags: ["TypeScript", "Interactive UI", "State Management", "Vercel"],
    category: "web",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://ticzi.vercel.app/",
    githubUrl: "https://github.com/zakikhairi/Ticzi",
    featured: true,
    color: "#8b5cf6",
    gradient: "from-purple-600 via-pink-500 to-indigo-600",
    stats: [
      { label: "Deploy", value: "Vercel" },
      { label: "Stack", value: "TypeScript" }
    ]
  },
  {
    id: "repo-analisis-grafik",
    title: "Analisis Grafik & Data",
    tagline: "Data Analytics & Chart Visualizer",
    description: "Program pemrosesan data statistik dan pembuatan visualisasi grafik menggunakan Python untuk analisis tren, agregasi metrik, dan penyajian data informatif.",
    tags: ["Python", "Data Analysis", "Matplotlib", "Data Science"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://github.com/zakikhairi/AnalisisGrafik",
    githubUrl: "https://github.com/zakikhairi/AnalisisGrafik",
    featured: false,
    color: "#f59e0b",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    stats: [
      { label: "Core", value: "Python" },
      { label: "Data", value: "Analytics" }
    ]
  },
  {
    id: "repo-recipe-menu",
    title: "Recipe Menu App",
    tagline: "Katalog Resep & Rekomendasi Kuliner",
    description: "Aplikasi katalog menu makanan dan rekomendasi resep masakan berbasis Python untuk mempermudah pencarian resep, panduan memasak, dan inspirasi menu harian.",
    tags: ["Python", "Catalog", "Food Tech", "Menu System"],
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://github.com/zakikhairi/recipe-menu",
    githubUrl: "https://github.com/zakikhairi/recipe-menu",
    featured: false,
    color: "#ec4899",
    gradient: "from-pink-500 via-rose-500 to-yellow-500",
    stats: [
      { label: "Language", value: "Python" },
      { label: "Kategori", value: "Culinary" }
    ]
  },
  {
    id: "proj-5",
    title: "OmniPay Mobile Experience",
    tagline: "Fintech App with Micro-animations",
    description: "Konsep aplikasi dompet digital modern dengan interaksi gestur mulus, kartu virtual 3D hologram, dan analitik pengeluaran warna-warni.",
    tags: ["React Native", "Expo", "TypeScript", "Reanimated"],
    category: "mobile",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/omnipay",
    githubUrl: "https://github.com",
    featured: false,
    color: "#10b981",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    stats: [
      { label: "Downloads", value: "50k+" },
      { label: "Rating", value: "4.9 ★" }
    ]
  },
  {
    id: "proj-6",
    title: "HyperTune Audio Visualizer",
    tagline: "Lo-Fi Web Player with Spectrum Shader",
    description: "Music player web interaktif dengan visualisasi gelombang spektrum frekuensi audio 3D, preset equalizer, dan ambient background.",
    tags: ["Web Audio API", "Canvas", "React", "CSS Houdini"],
    category: "web",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/hypertune",
    githubUrl: "https://github.com",
    featured: false,
    color: "#6366f1",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    stats: [
      { label: "Tracks", value: "500+" },
      { label: "Audio", value: "Hi-Res" }
    ]
  }
];

export const initialSkills: Skill[] = [
  { name: "Canva & Visual Branding", category: "Design/Tools", level: 95, iconName: "Palette", color: "#ec4899" },
  { name: "Social Media Management", category: "Design/Tools", level: 94, iconName: "Sparkles", color: "#f43f5e" },
  { name: "Python / Data Science", category: "AI & Cloud", level: 86, iconName: "Cpu", color: "#eab308" },
  { name: "Big Data & Artificial Intelligence", category: "AI & Cloud", level: 84, iconName: "Cpu", color: "#a855f7" },
  { name: "Sistem Basis Data (SQL)", category: "Backend", level: 88, iconName: "Database", color: "#6366f1" },
  { name: "Pemrograman Terstruktur", category: "Backend", level: 87, iconName: "Server", color: "#22c55e" },
  { name: "React & TypeScript", category: "Frontend", level: 92, iconName: "Code2", color: "#06b6d4" },
  { name: "Tailwind CSS & UI Web", category: "Frontend", level: 95, iconName: "Layout", color: "#38bdf8" },
  { name: "Microsoft Office & Google Workspace", category: "Design/Tools", level: 92, iconName: "Layers", color: "#0ea5e9" },
  { name: "Team Coordination & Leadership", category: "Design/Tools", level: 96, iconName: "Award", color: "#10b981" }
];

export const initialGuestbook: GuestbookEntry[] = [
  {
    id: "gb-1",
    name: "Alex Dev",
    role: "Frontend Engineer",
    message: "Keren banget kartunya bisa ditarik membal gitu! Animasi dan warnanya juara 🔥",
    avatarEmoji: "🚀",
    avatarBg: "bg-purple-500",
    timestamp: "2 jam yang lalu",
    likes: 24,
    likedByMe: true
  },
  {
    id: "gb-2",
    name: "Sarah L.",
    role: "Product Designer",
    message: "Desain bento grid dan perpaduan neon glassmorphism-nya sangat estetik! Sangat inspiratif ✨",
    avatarEmoji: "🎨",
    avatarBg: "bg-pink-500",
    timestamp: "5 jam yang lalu",
    likes: 18,
    likedByMe: false
  },
  {
    id: "gb-3",
    name: "Budi Santoso",
    role: "Fullstack Dev",
    message: "Portofolio paling colorful & interaktif yang pernah gw lihat minggu ini. Good job bang!",
    avatarEmoji: "⚡",
    avatarBg: "bg-cyan-500",
    timestamp: "1 hari yang lalu",
    likes: 42,
    likedByMe: true
  },
  {
    id: "gb-4",
    name: "Rian Tech",
    role: "Student & Explorer",
    message: "Tutor lanyard 3D-nya dong bang! Smooth banget di mobile maupun desktop 👏",
    avatarEmoji: "💻",
    avatarBg: "bg-emerald-500",
    timestamp: "2 hari yang lalu",
    likes: 31,
    likedByMe: false
  }
];

export const themes: Record<ThemeKey, ThemeConfig> = {
  spiderman: {
    name: "Spider-Man Comic (Classic)",
    subtitle: "Royal Comic Blue, Marvel Red & Ben-Day Dots",
    primary: "#e62429",
    secondary: "#1e5fb0",
    accent: "#ff7b00",
    bgGradient: "linear-gradient(180deg, #0d52b3 0%, #0a4394 50%, #072d66 100%)",
    glowColor: "rgba(230, 36, 41, 0.45)",
    badgeBg: "from-red-600 via-rose-600 to-blue-700"
  },
  cyberpunk: {
    name: "Cyberpunk Neon",
    subtitle: "Sci-Fi & Modern Tech",
    primary: "#ec4899",
    secondary: "#06b6d4",
    accent: "#a855f7",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(236,72,153,0.25), rgba(6,182,212,0.15), rgba(10,12,22,1))",
    glowColor: "rgba(236,72,153,0.4)",
    badgeBg: "from-pink-500 to-cyan-500"
  },
  noir: {
    name: "Cinema Noir 35mm",
    subtitle: "Monokrom Sinematik Kontras Tinggi",
    primary: "#f8fafc",
    secondary: "#94a3b8",
    accent: "#fbbf24",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255,255,255,0.12), rgba(148,163,184,0.06), rgba(8,9,14,1))",
    glowColor: "rgba(255,255,255,0.22)",
    badgeBg: "from-slate-200 via-slate-400 to-amber-400"
  },
  baduy: {
    name: "Baduy Heritage",
    subtitle: "Kearifan Lokal & Tenun Tradisional",
    primary: "#f97316",
    secondary: "#d97706",
    accent: "#ec4899",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(249,115,22,0.24), rgba(217,119,6,0.15), rgba(18,12,14,1))",
    glowColor: "rgba(249,115,22,0.35)",
    badgeBg: "from-amber-600 via-orange-500 to-rose-600"
  },
  vercel: {
    name: "Vercel Modern",
    subtitle: "Silicon Valley Tech Minimalist",
    primary: "#10b981",
    secondary: "#38bdf8",
    accent: "#ffffff",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16,185,129,0.2), rgba(56,189,248,0.12), rgba(6,8,15,1))",
    glowColor: "rgba(16,185,129,0.35)",
    badgeBg: "from-emerald-400 to-cyan-400"
  },
  sunset: {
    name: "Golden Hour Sinema",
    subtitle: "Magic Hour & Warm Sunset Glow",
    primary: "#f59e0b",
    secondary: "#f43f5e",
    accent: "#fbbf24",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(245,158,11,0.25), rgba(244,63,94,0.18), rgba(14,10,18,1))",
    glowColor: "rgba(245,158,11,0.4)",
    badgeBg: "from-amber-500 to-rose-500"
  },
  emerald: {
    name: "Aurora Emerald",
    subtitle: "Hutan Tropis & Neon Hijau",
    primary: "#10b981",
    secondary: "#06b6d4",
    accent: "#84cc16",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16,185,129,0.25), rgba(6,182,212,0.18), rgba(8,16,16,1))",
    glowColor: "rgba(16,185,129,0.4)",
    badgeBg: "from-emerald-500 to-cyan-500"
  },
  violet: {
    name: "Electric Violet",
    subtitle: "Sinema Fantasi & Synthwave",
    primary: "#8b5cf6",
    secondary: "#d946ef",
    accent: "#3b82f6",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139,92,246,0.3), rgba(217,70,239,0.18), rgba(12,10,24,1))",
    glowColor: "rgba(139,92,246,0.4)",
    badgeBg: "from-violet-500 to-fuchsia-500"
  },
  ocean: {
    name: "Deep Pacific",
    subtitle: "Kedalaman Samudra & Langit Biru",
    primary: "#0284c7",
    secondary: "#14b8a6",
    accent: "#6366f1",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(2,132,199,0.25), rgba(20,184,166,0.18), rgba(8,14,26,1))",
    glowColor: "rgba(2,132,199,0.4)",
    badgeBg: "from-sky-500 to-teal-500"
  }
};
