# ⌨️ TypeMaster Academy | Touch Typing & Speed Keyboard Studio

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-4f46e5?style=for-the-badge&logo=github)](https://tareq0001.github.io/TypeMaster-Arabic-Keyboard-Academy/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge)](LICENSE)
[![Bilingual: Arabic & English](https://img.shields.io/badge/Language-Arabic%20%26%20English-0284c7?style=for-the-badge)](https://tareq0001.github.io/TypeMaster-Arabic-Keyboard-Academy/)
[![Python Analytics](https://img.shields.io/badge/Python-3.10+_Ergonomics-3776ab?style=for-the-badge&logo=python)](python/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Types-3178c6?style=for-the-badge&logo=typescript)](types/typemaster.d.ts)
[![SQL Leaderboard](https://img.shields.io/badge/SQL-Curriculum_Schema-336791?style=for-the-badge&logo=postgresql)](sql/)

> **TypeMaster Academy** is a modern, high-performance touch typing platform and keyboard speed training academy designed for both **Arabic and English**. Built with a clean, tactile **Apple & Duolingo-inspired bright aesthetic**, running **100% directly in modern web browsers with zero servers, zero external databases, and zero configuration**.

---

## 🌟 Key Highlights & Features

### 1. ⌨️ Interactive Visual Dual-Language Keyboard
- **Dual Label Keycaps:** Physical QWERTY keyboard with full Arabic letters (top right) and English keys (bottom left).
- **Home Row Tactile Bumps:** Physical visual ridges on the `J` (`ت`) and `F` (`ب`) anchor keys.
- **Finger Color-Coded Zones:** Color guides for all 5 finger types (Pinky, Ring, Middle, Index, Thumbs).
- **Target Key Pulse Guide:** The next key to press glows with an animated target pulse in real-time.
- **Keystroke Press Depression:** Animates tactile key depression upon physical keyboard strikes.

### 2. 📚 Comprehensive Progressive Curriculum
- **Home Row Mastery (Arabic & English):** Fundamental anchor finger positioning drills (`ت ن م ك` / `ب ي س ش` and `ASDF JKL;`).
- **All Rows Reach:** Top and bottom row extensions.
- **Inspiring Wisdom & Quotes:** Full flowing Arabic literature and wisdom sentences.
- **Code & Tech Snippets:** Practice syntax typing for JavaScript and Python.

### 3. 🔊 Synthesized Mechanical Keyboard Sounds
- Pure **Web Audio API** mechanical switch synthesizer (Cherry MX Blue/Brown tactile click emulation) without loading external audio files.
- Error alert thuds for incorrect keys and celebration victory arpeggios upon completing a lesson.
- 1-click sound toggle / mute control.

### 4. 📊 Real-Time Biometric & Speed Telemetry
- **Live Net WPM & CPM:** Continuous calculations updated on every keystroke.
- **Accuracy Percentage:** Precise tracking of correct vs mistyped characters.
- **Visual Character States:** Correct characters turn emerald green, mistakes glow soft red with underline, and the active cursor blinks smoothly.
- **Achievement & Certification Modal:** Summarizes performance tiers (*Novice*, *Intermediate*, *Advanced*, *Jet Typer*).

---

## 🛠️ Multi-Language Tech Stack

| Technology | Purpose & Implementation |
| :--- | :--- |
| **JavaScript (ES6+)** | Core typing engine (`engine.js`), Web Audio mechanical clicks synthesizer (`audio-clicks.js`), lesson database (`lessons.js`), and UI orchestrator (`app.js`). |
| **Python 3.10+** | Typing ergonomics and cadence analytics (`typing_metrics_analytics.py`) measuring Inter-Keystroke Interval (IKI) latency, Coefficient of Variation (CV), and lesson difficulty scoring. |
| **TypeScript** | Strict type definitions (`types/typemaster.d.ts`) guaranteeing typing contracts, key definitions, and score certificates. |
| **SQL (PostgreSQL / SQLite)** | Relational schema (`sql/typing_academy_schema.sql`) for student profiles, progressive lessons, session logs, and leaderboard rankings. |
| **CSS3 & HTML5** | Modern, bright educational design system with CSS Variables, Flexbox, tactile keycaps, and smooth micro-interactions. |

---

## 🚀 Live Demo

Launch and start practicing touch typing directly in your browser:  
👉 **[https://tareq0001.github.io/TypeMaster-Arabic-Keyboard-Academy/](https://tareq0001.github.io/TypeMaster-Arabic-Keyboard-Academy/)**

---

## 💻 Running Locally

### Web Application (Instant Client-Side)
Simply open `index.html` in any modern web browser or serve locally:
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080`.

### Python Biometric Analytics
```bash
python python/typing_metrics_analytics.py
```

---

## 👤 Author

**Tareq Ali**
- GitHub: [@Tareq0001](https://github.com/Tareq0001)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
