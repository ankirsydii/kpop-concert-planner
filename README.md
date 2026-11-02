# 💜 K-Pop Concert & Travel Planner Chatbot

> AI-powered multimodal chatbot designed to help K-Pop fans plan their ultimate concert journey, analyze seating plans, estimate budgets, and build custom travel itineraries! 🎶✨

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat&logo=google&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6C37?style=flat&logo=express&logoColor=white)

---

## ✨ Tentang Proyek
**K-Pop Concert & Travel Planner** adalah proyek *chatbot* interaktif berbasis web yang memanfaatkan teknologi kecerdasan buatan (Google Gemini API). Aplikasi ini dibuat khusus untuk para penggemar K-Pop yang ingin merencanakan pengalaman menonton konser dengan matang—mulai dari membedah *seating plan* dan daftar harga tiket (*pricelist*), menghitung rincian *budget*, hingga menyusun kiat-kiat sukses *war* tiket.

## 🚀 Fitur Utama
* **🎨 Aesthetic K-Pop UI/UX:** Antarmuka modern dengan tema warna ungu pastel/lilac, font yang ramah pengguna, serta gelembung obrolan yang interaktif.
* **📷 Multimodal Analysis:** Pengguna dapat mengunggah gambar *seating plan* atau pamflet konser bersamaan dengan pertanyaan teks, dan AI akan menganalisis visual tersebut secara mendalam.
* **⚡ Quick Prompts (Tombol Pintasan):** Menyediakan tombol cepat bagi pengguna untuk langsung menanyakan tips *war* tiket, perhitungan *budget*, atau barang bawaan ke *venue* tanpa harus mengetik manual.
* **💬 Persona Asisten Konser:** Karakter AI dirancang dengan gaya bahasa yang antusias, ramah, dan suportif layaknya sesama *fangirl/fanboy*.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js, Multer (untuk penanganan *file upload* sementara)
* **AI Model:** `@google/genai` (Google Gemini Flash)
* **Frontend:** HTML5, CSS3 (Custom Styling dengan Google Fonts), JavaScript (Vanilla JS)
* **Environment Configuration:** Dotenv

---

## ⚙️ Cara Menjalankan Proyek (Installation Guide)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini secara lokal di komputermu:

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/username/kpop-concert-planner.git](https://github.com/ankirsydii/kpop-concert-planner.git)
   cd kpop-concert-planner
2. **Install dependencies:**
    npm install
3. **Buat file `.env` di root folder:**
   Buat file baru bernama `.env` dan masukkan API Key Google Gemini milikmu di dalamnya:
   ```env
   GEMINI_API_KEY=masukkan_api_key_gemini_disini
   PORT=3000
4. **Jalankan server aplikasi:**
    node index.js
5. **Buka di Browser:**
    http://localhost:3000

## 💡 Author
    Andini Putri Rosyidi (ankirsydii)
