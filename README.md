# 🎬 Muhammad Zaki Khairi • Creative Tech & Cinema Portfolio

Website portofolio interaktif, modern, dan sinematik milik **Muhammad Zaki Khairi** — Sutradara film *'TANAH JAWARA'*, Produser film peraih Juara 1 Tingkat Provinsi Banten *'PLUS MINUS'* (SMANTINEMA), dan Mahasiswa Sistem Informasi Universitas Gunadarma. Didesain dengan estetika neon glassmorphism, 3D interactive lanyard badge, Bento Grid Matrix, Mini Cinema Player, Arcade Snake Game 8-Bit, Mobile Dock Navigation, dan In-Browser CMS Studio.

---

## 🌟 Fitur Utama

1. **🪪 Interactive 3D Lanyard ID Card (React Bits style)**:
   - Kartu identitas 3D dengan tali lanyard fleksibel yang dapat ditarik (*draggable*) menggunakan mouse atau sentuhan (touch di HP).
   - Efek fisika pegas (*spring physics*) yang membal halus saat dilepas.
   - Efek kilau holografik (*holographic rainbow foil*) yang bergeser mengikuti sudut kartu.
   - Tombol flip untuk memutar kartu 180° menampilkan QR Code & tautan media sosial.
   - Tombol interaktif *Like* kartu.

2. **🎛️ In-Browser CMS Studio (Portofolio CMS)**:
   - Panel admin bawaan tanpa perlu database eksternal yang rumit.
   - Dapat diakses langsung melalui tombol **"CMS Studio"** di navbar atau tombol mengambang di pojok kanan bawah.
   - Fitur CMS mencakup:
     - **Profil**: Mengubah Nama, Bio, Headline, Status, Email, Foto Avatar, dan Tautan Medsos secara real-time.
     - **Proyek**: Menambah, mengedit, atau menghapus portofolio proyek lengkap dengan gambar, tag, dan URL demo.
     - **Skill**: Menambah keahlian baru dengan slider tingkat kecakapan (level %) dan color picker.
     - **Moderasi Buku Tamu**: Menghapus pesan spam atau tidak pantas.
     - **Backup & Restore**: Ekspor seluruh data ke format JSON dan impor kembali kapan saja.

3. **🎨 5 Pilihan Tema Neon & Colorful Glows**:
   - Cyberpunk Neon (Pink / Cyan / Violet)
   - Sunset Vibes (Orange / Rose / Amber)
   - Aurora Emerald (Emerald / Cyan / Lime)
   - Electric Violet (Violet / Fuchsia / Sky)
   - Ocean Breeze (Sky Blue / Teal / Indigo)

4. **🧩 Bento Grid Matrix Showcase**:
   - **Terminal Interaktif CLI**: Console mini yang dapat menerima perintah pengunjung (`help`, `whoami`, `skills`, `projects`, `contact`, `matrix`, `clear`).
   - **GitHub Activity Heatmap**: Simulasi visual grafik kontribusi commit tahunan.
   - **Tech Radar**: Visualisasi keahlian dengan filter kategori dan progress bar bersinar.
   - **Filosofi Kerja**: Prinsip craftmanship & performa web.

5. **💬 Interactive Guestbook & Confetti**:
   - Pengunjung dapat memilih avatar emoji & warna badge.
   - Mengirim pesan dengan animasi ledakan konfeti (*canvas-confetti*).
   - Tombol *Like* pesan dengan feedback suara dan partikel konfeti mikro.

6. **🎵 Lo-Fi Audio Widget & SFX Synthesizer**:
   - Widget musik lo-fi coding dengan visualizer equalizer animasi.
   - Efek suara interaktif (*synthesized Web Audio API*) pada klik, tarikan kartu, like, dan simpan data (dapat dimute melalui tombol speaker).

---

## 🚀 Cara Menjalankan Secara Lokal

1. Buka terminal di folder proyek:
   ```bash
   cd C:\Users\muham\.gemini\antigravity\scratch\interactive-colorful-portfolio
   ```

2. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

3. Buka browser di [http://localhost:5173/](http://localhost:5173/).

---

## 🌐 Cara Deploy ke Vercel (Gratis)

1. Buat repository baru di [GitHub](https://github.com/new).
2. Push proyek ini ke repository Anda:
   ```bash
   git init
   git add .
   git commit -m "feat: initial interactive colorful portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO-NAME.git
   git push -u origin main
   ```
3. Buka [Vercel](https://vercel.com/), pilih **Add New Project**, lalu import repository GitHub Anda.
4. Klik **Deploy**. Website portofolio interaktif Anda langsung live dan dapat diakses publik!
