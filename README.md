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

### 1. 🏎️ Interactive Real-Time Race Track (Player vs Target Ghost)
- **Real-Time Dual-Lane Raceway:** Race against a dynamic **"Ghost Pacer"** calibrated to the stage's target WPM.
- **Dynamic Speed Leads:** Live lead differential tracker calculating whether you are leading by `+X` words or trailing the target pacer.
- **Visual Status Badges:** Color-coded race telemetry (`status-leading`, `status-tied`, `status-trailing`) to drive competitive motivation.

### 2. 🔊 Multi-Soundpack Procedural Synthesizer
- Pure **Web Audio API** physical sound modeling with **Zero Audio Files / Zero Latency**:
  - **Cherry MX Blue:** Crisp tactile click and sharp bottom-out ping.
  - **Vintage Typewriter:** Heavy mechanical strike with spacebar carriage return bell chime!
  - **Apple Magic (Chiclet):** Cushioned, modern low-profile membrane thud.
  - **Bubble Pop:** Harmonic ascending water bubble pop.
  - **Mute Mode:** Complete distraction-free typing.

### 3. 🎵 Web Audio Metronome Cadence Pacer
- Periodic rhythmic audio pulse pacer (`60 BPM` / `90 BPM` / `120 BPM` / `180 BPM`).
- Visual synchronizing beat dot indicator with accent beats to train regular, steady finger cadence and prevent erratic pauses.

### 4. ⚡ Speed Sprints & 💀 Sudden Death Mode (Survival)
- **Speed Sprint Presets:** Rapid burst tests for `15 seconds`, `30 seconds`, and international benchmark `60 seconds`.
- **Sudden Death Mode (نمط البقاء):** Absolute 100% precision challenge where a single keystroke mistake instantly terminates the run, forcing students to prioritize accuracy before raw speed.

### 5. 📜 Official Printable Student Achievement Certificate
- **Official Endorsement:** High-fidelity ornamental parchment certificate with royal gold double borders, security watermark, and official seal.
- **Live Verification:** Custom student name input, verified Net WPM, accuracy percentage, completed stage, and issuance date.
- **Official Signatures:** Endorsed by **أ. طارق ابوعشي** (Digital Skills Teacher & Platform Architect) and **متوسطة أبها الأهلية (بنين)**.
- **Print & PDF Export:** Integrated `@media print` CSS engine for landscape A4 printing with zero margins and crisp vector styling.

### 6. 🎯 Smart Focus Mode & Inline Caret HUD
- **Zero Visual Distraction:** Keeps the student's eyes 100% anchored on upcoming words.
- **Traveling Finger Caret:** Animated finger indicator travels directly above each target character, removing the need to glance down at the keyboard.
- **Intelligent Word-Chunking:** Visual token boundaries that train peripheral reading and word-level cognitive planning.
- **Weakness Radar & Adaptive Practice:** Real-time character error telemetry that auto-generates custom remediation drills for struggling keys.

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
