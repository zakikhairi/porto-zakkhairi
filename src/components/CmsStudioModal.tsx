import React, { useState } from 'react';
import { X, User, FolderPlus, Cpu, MessageSquare, Download, Upload, RotateCcw, Check, Plus, Trash2, Save, Lock } from 'lucide-react';
import type { ProfileData, Project, Skill, GuestbookEntry } from '../types/portfolio';
import { sounds } from '../utils/soundEffects';
import { InstagramIcon } from './icons/InstagramIcon';
import { TiktokIcon } from './icons/TiktokIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { GithubIcon } from './icons/GithubIcon';

interface CmsStudioProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onUpdateProfile: (p: ProfileData) => void;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  skills: Skill[];
  onUpdateSkills: (skills: Skill[]) => void;
  guestbook: GuestbookEntry[];
  onUpdateGuestbook: (gb: GuestbookEntry[]) => void;
  onResetData: () => void;
  onExitAdmin?: () => void;
}

export const CmsStudioModal: React.FC<CmsStudioProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  projects,
  onUpdateProjects,
  skills,
  onUpdateSkills,
  guestbook,
  onUpdateGuestbook,
  onResetData,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'guestbook' | 'backup'>('profile');
  const [saveToast, setSaveToast] = useState(false);

  // Profile local form state
  const [profileForm, setProfileForm] = useState<ProfileData>(profile);

  // Project editing state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    tagline: '',
    description: '',
    tags: [],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    demoUrl: '',
    githubUrl: '',
    featured: false,
    color: '#8b5cf6',
    gradient: 'from-pink-500 to-purple-600'
  });
  const [tagsInput, setTagsInput] = useState('');

  // Skill editing state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<Skill['category']>('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  const [newSkillColor, setNewSkillColor] = useState('#06b6d4');

  // JSON backup state
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  const triggerToast = () => {
    setSaveToast(true);
    sounds.playSuccess();
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    triggerToast();
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const proj: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title || 'Proyek Baru',
      tagline: newProject.tagline || '',
      description: newProject.description || '',
      tags: tags.length > 0 ? tags : ['React', 'Web'],
      category: (newProject.category as Project['category']) || 'web',
      image: newProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      demoUrl: newProject.demoUrl,
      githubUrl: newProject.githubUrl,
      featured: Boolean(newProject.featured),
      color: newProject.color || '#ec4899',
      gradient: newProject.gradient || 'from-pink-500 to-purple-600'
    };

    onUpdateProjects([proj, ...projects]);
    setIsAddingProject(false);
    setNewProject({
      title: '',
      tagline: '',
      description: '',
      tags: [],
      category: 'web',
      image: '',
      color: '#8b5cf6'
    });
    setTagsInput('');
    triggerToast();
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Hapus proyek ini?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
      triggerToast();
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const skill: Skill = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel,
      iconName: 'Code2',
      color: newSkillColor
    };

    onUpdateSkills([...skills, skill]);
    setNewSkillName('');
    triggerToast();
  };

  const handleDeleteSkill = (name: string) => {
    onUpdateSkills(skills.filter(s => s.name !== name));
    triggerToast();
  };

  const handleDeleteGuestbookEntry = (id: string) => {
    onUpdateGuestbook(guestbook.filter(g => g.id !== id));
    triggerToast();
  };

  // Export JSON
  const handleExportData = () => {
    const data = {
      profile: profileForm,
      projects,
      skills,
      guestbook
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-cms-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    sounds.playSuccess();
  };

  // Import JSON
  const handleImportData = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.profile) onUpdateProfile(parsed.profile);
      if (parsed.projects) onUpdateProjects(parsed.projects);
      if (parsed.skills) onUpdateSkills(parsed.skills);
      if (parsed.guestbook) onUpdateGuestbook(parsed.guestbook);
      setProfileForm(parsed.profile);
      triggerToast();
      alert('Data portofolio berhasil diimpor!');
      setImportJsonText('');
    } catch {
      alert('Format JSON tidak valid! Pastikan JSON sesuai struktur.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl glass-panel border border-white/20 p-5 sm:p-7 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-black text-xs">
                  CMS
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Portfolio CMS Studio
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Mode
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Kelola data profil, proyek, skill, dan buku tamu tanpa utak-atik kode.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onExitAdmin && (
              <button
                type="button"
                onClick={() => {
                  onExitAdmin();
                  onClose();
                  sounds.playPop(350);
                }}
                title="Kunci & Sembunyikan CMS (Kembali ke Mode Publik)"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-semibold transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Kunci CMS</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                sounds.playClick();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security / Privacy Reassurance Banner */}
        <div className="mt-3 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between gap-2 font-mono">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Mode Pemilik Aktif • Seluruh tombol edit CMS tersembunyi dari publik & pengunjung luar.</span>
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline">Tekan Ctrl+Shift+E kapan saja</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-3 overflow-x-auto border-b border-white/10 text-xs">
          {[
            { id: 'profile', label: 'Profil & Bio', icon: User },
            { id: 'projects', label: `Proyek (${projects.length})`, icon: FolderPlus },
            { id: 'skills', label: `Keahlian (${skills.length})`, icon: Cpu },
            { id: 'guestbook', label: `Buku Tamu (${guestbook.length})`, icon: MessageSquare },
            { id: 'backup', label: 'Backup & Restore', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  sounds.playClick();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium shrink-0 transition ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-6 text-xs text-slate-300">
          {/* ============ TAB 1: PROFIL ============ */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Username / Handle</label>
                  <input
                    type="text"
                    value={profileForm.handle}
                    onChange={e => setProfileForm({ ...profileForm, handle: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Peran Utama (Role)</label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status Ketersediaan</label>
                  <input
                    type="text"
                    value={profileForm.status}
                    onChange={e => setProfileForm({ ...profileForm, status: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bio Ringkas</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Kontak</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Foto Avatar URL</label>
                <input
                  type="text"
                  value={profileForm.avatarUrl}
                  onChange={e => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              {/* Socials */}
              <div className="pt-2">
                <h4 className="font-bold text-white mb-2">Tautan Media Sosial Resmi</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>Instagram URL:</span>
                    </span>
                    <input
                      type="text"
                      value={profileForm.socials.instagram}
                      onChange={e => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, instagram: e.target.value }
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                      <TiktokIcon className="w-3.5 h-3.5" />
                      <span>TikTok URL:</span>
                    </span>
                    <input
                      type="text"
                      value={profileForm.socials.tiktok}
                      onChange={e => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, tiktok: e.target.value }
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                      <YoutubeIcon className="w-3.5 h-3.5" />
                      <span>YouTube URL:</span>
                    </span>
                    <input
                      type="text"
                      value={profileForm.socials.youtube || ''}
                      onChange={e => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, youtube: e.target.value }
                      })}
                      placeholder="https://www.youtube.com/@zakkhairi"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub URL:</span>
                    </span>
                    <input
                      type="text"
                      value={profileForm.socials.github}
                      onChange={e => setProfileForm({
                        ...profileForm,
                        socials: { ...profileForm.socials, github: e.target.value }
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </form>
          )}

          {/* ============ TAB 2: PROYEK ============ */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Daftar Proyek Anda</h4>
                <button
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>

              {/* Form Tambah Proyek */}
              {isAddingProject && (
                <form onSubmit={handleAddProject} className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 space-y-3">
                  <h5 className="font-bold text-purple-300">Tambah Proyek Baru ke Portofolio</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Judul Proyek *"
                      required
                      value={newProject.title}
                      onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Tagline Singkat"
                      value={newProject.tagline}
                      onChange={e => setNewProject({ ...newProject, tagline: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <textarea
                    placeholder="Deskripsi Lengkap *"
                    rows={2}
                    value={newProject.description}
                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white resize-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={newProject.category}
                      onChange={e => setNewProject({ ...newProject, category: e.target.value as Project['category'] })}
                      className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="film">🎬 Film & Sinema</option>
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile App</option>
                      <option value="ai">AI / 3D Graphics</option>
                      <option value="fullstack">Fullstack System</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Tags (pisahkan koma: React, Next)"
                      value={tagsInput}
                      onChange={e => setTagsInput(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={newProject.image}
                      onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Live Demo URL"
                      value={newProject.demoUrl}
                      onChange={e => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      placeholder="GitHub Repository URL"
                      value={newProject.githubUrl}
                      onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-300"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold"
                    >
                      Simpan Proyek
                    </button>
                  </div>
                </form>
              )}

              {/* List of current projects */}
              <div className="space-y-2">
                {projects.map(proj => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-white text-xs">{proj.title}</h5>
                        <p className="text-[11px] text-slate-400">{proj.tagline || proj.description.slice(0, 50)}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                            {proj.category}
                          </span>
                          {proj.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] text-slate-400">#{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ TAB 3: SKILLS ============ */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-bold text-white">Tambah Skill Baru</h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nama Skill (cth: Vue, Rust)"
                    value={newSkillName}
                    onChange={e => setNewSkillName(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                  <select
                    value={newSkillCategory}
                    onChange={e => setNewSkillCategory(e.target.value as Skill['category'])}
                    className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI & Cloud">AI & Cloud</option>
                    <option value="Design/Tools">Design/Tools</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] whitespace-nowrap">Level ({newSkillLevel}%):</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={newSkillLevel}
                      onChange={e => setNewSkillLevel(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">Warna:</span>
                    <input
                      type="color"
                      value={newSkillColor}
                      onChange={e => setNewSkillColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                  >
                    + Tambah
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.map(s => (
                  <div
                    key={s.name}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-white font-medium">{s.name}</span>
                      <span className="text-[10px] text-slate-400">({s.category} - {s.level}%)</span>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(s.name)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ TAB 4: GUESTBOOK MODERATION ============ */}
          {activeTab === 'guestbook' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">Moderasi Buku Tamu</h4>
              <p className="text-slate-400 text-xs">
                Anda dapat menghapus pesan yang tidak pantas atau spam di sini.
              </p>

              <div className="space-y-2">
                {guestbook.map(entry => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{entry.avatarEmoji}</span>
                      <div>
                        <span className="font-bold text-white">{entry.name}</span>
                        <span className="text-slate-400 text-[10px] ml-2">({entry.role})</span>
                        <p className="text-slate-300 text-xs mt-0.5">{entry.message}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteGuestbookEntry(entry.id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============ TAB 5: BACKUP & RESTORE ============ */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm">Ekspor Cadangan Portofolio</h4>
                <p className="text-slate-400 text-xs">
                  Unduh seluruh konfigurasi portofolio Anda (profil, proyek, skill, buku tamu) sebagai berkas JSON.
                </p>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File JSON Cadangan</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-sm">Impor / Restore Data</h4>
                <p className="text-slate-400 text-xs">
                  Tempelkan isi JSON cadangan untuk memperbarui seluruh data portofolio seketika.
                </p>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={e => setImportJsonText(e.target.value)}
                  placeholder='Tempel JSON di sini... {"profile": {...}, "projects": [...]}'
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-cyan-300 font-mono resize-none"
                />
                <button
                  onClick={handleImportData}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Terapkan Impor JSON</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-red-300 text-xs">Kembalikan ke Setelan Semula</h4>
                  <p className="text-red-400/80 text-[11px]">Hapus semua perubahan lokal dan kembali ke default.</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Kembalikan semua data ke setelan awal pabrik?')) {
                      onResetData();
                      triggerToast();
                      onClose();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/30 border border-red-500/40 text-red-200 hover:bg-red-600 text-xs transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save Toast Notification */}
        {saveToast && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl animate-bounce">
            <Check className="w-4 h-4" />
            <span>Perubahan Berhasil Disimpan Secara Real-Time!</span>
          </div>
        )}
      </div>
    </div>
  );
};
