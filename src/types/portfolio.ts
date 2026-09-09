export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: 'film' | 'web' | 'mobile' | 'ai' | 'fullstack';
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  youtubeId?: string;
  featured?: boolean;
  color: string;
  gradient: string;
  stats?: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design/Tools' | 'AI & Cloud';
  level: number; // 1-100
  iconName: string;
  color: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  avatarEmoji: string;
  avatarBg: string;
  timestamp: string;
  likes: number;
  likedByMe?: boolean;
}

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  headline: string;
  bio: string;
  status: string;
  location: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  socials: {
    github: string;
    tiktok: string;
    instagram: string;
    youtube?: string;
    linkedin: string;
    twitter: string;
  };
  stats: {
    projectsCount: number;
    yearsExperience: number;
    satisfiedClients: number;
    codeCommits: number;
    gpa?: string;
  };
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score?: string;
  scoreLabel?: string;
  relevantCourses?: string[];
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  badge?: string;
  description?: string;
  responsibilities: string[];
}

export type ThemeKey = 'cyberpunk' | 'sunset' | 'emerald' | 'violet' | 'ocean';

export interface ThemeConfig {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bgGradient: string;
  glowColor: string;
  badgeBg: string;
}
