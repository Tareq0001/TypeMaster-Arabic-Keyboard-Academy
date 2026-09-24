/**
 * TypeMaster Academy | Core Typing Engine, Countdown Timer, Finger Tracker & Weakness Radar
 * =========================================================================================
 * Real-time keystroke evaluation, WPM/CPM calculations, countdown timer,
 * finger ergonomic locator, error telemetry per key, and adaptive drill generator.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

const KEY_TO_FINGER = {
  // Left Hand
  'Backquote': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'Digit1': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'KeyQ': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'KeyA': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'KeyZ': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'Tab': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'CapsLock': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },
  'ShiftLeft': { id: 'l-pinky', nameAr: 'الخنصر الأيسر', nameEn: 'Left Pinky', hand: 'left', color: '#ec4899' },

  'Digit2': { id: 'l-ring', nameAr: 'البنصر الأيسر', nameEn: 'Left Ring', hand: 'left', color: '#8b5cf6' },
  'KeyW': { id: 'l-ring', nameAr: 'البنصر الأيسر', nameEn: 'Left Ring', hand: 'left', color: '#8b5cf6' },
  'KeyS': { id: 'l-ring', nameAr: 'البنصر الأيسر', nameEn: 'Left Ring', hand: 'left', color: '#8b5cf6' },
  'KeyX': { id: 'l-ring', nameAr: 'البنصر الأيسر', nameEn: 'Left Ring', hand: 'left', color: '#8b5cf6' },

  'Digit3': { id: 'l-middle', nameAr: 'الوسطى اليسرى', nameEn: 'Left Middle', hand: 'left', color: '#0ea5e9' },
  'KeyE': { id: 'l-middle', nameAr: 'الوسطى اليسرى', nameEn: 'Left Middle', hand: 'left', color: '#0ea5e9' },
  'KeyD': { id: 'l-middle', nameAr: 'الوسطى اليسرى', nameEn: 'Left Middle', hand: 'left', color: '#0ea5e9' },
  'KeyC': { id: 'l-middle', nameAr: 'الوسطى اليسرى', nameEn: 'Left Middle', hand: 'left', color: '#0ea5e9' },

  'Digit4': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },
  'Digit5': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },
  'KeyR': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },
  'KeyT': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },
  'KeyF': { id: 'l-index', nameAr: 'السبابة اليسرى (نتوء الارتكاز)', nameEn: 'Left Index (Home Bump)', hand: 'left', color: '#10b981' },
  'KeyG': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },
  'KeyV': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },
  'KeyB': { id: 'l-index', nameAr: 'السبابة اليسرى', nameEn: 'Left Index', hand: 'left', color: '#10b981' },

  // Space / Thumbs
  'Space': { id: 'thumb', nameAr: 'أحد الإبهامين (مسافة)', nameEn: 'Thumbs (Space Bar)', hand: 'both', color: '#f59e0b' },

  // Right Hand
  'Digit6': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },
  'Digit7': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },
  'KeyY': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },
  'KeyU': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },
  'KeyH': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },
  'KeyJ': { id: 'r-index', nameAr: 'السبابة اليمنى (نتوء الارتكاز)', nameEn: 'Right Index (Home Bump)', hand: 'right', color: '#10b981' },
  'KeyN': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },
  'KeyM': { id: 'r-index', nameAr: 'السبابة اليمنى', nameEn: 'Right Index', hand: 'right', color: '#10b981' },

  'Digit8': { id: 'r-middle', nameAr: 'الوسطى اليمنى', nameEn: 'Right Middle', hand: 'right', color: '#0ea5e9' },
  'KeyI': { id: 'r-middle', nameAr: 'الوسطى اليمنى', nameEn: 'Right Middle', hand: 'right', color: '#0ea5e9' },
  'KeyK': { id: 'r-middle', nameAr: 'الوسطى اليمنى', nameEn: 'Right Middle', hand: 'right', color: '#0ea5e9' },
  'Comma': { id: 'r-middle', nameAr: 'الوسطى اليمنى', nameEn: 'Right Middle', hand: 'right', color: '#0ea5e9' },

  'Digit9': { id: 'r-ring', nameAr: 'البنصر الأيمن', nameEn: 'Right Ring', hand: 'right', color: '#8b5cf6' },
  'KeyO': { id: 'r-ring', nameAr: 'البنصر الأيمن', nameEn: 'Right Ring', hand: 'right', color: '#8b5cf6' },
  'KeyL': { id: 'r-ring', nameAr: 'البنصر الأيمن', nameEn: 'Right Ring', hand: 'right', color: '#8b5cf6' },
  'Period': { id: 'r-ring', nameAr: 'البنصر الأيمن', nameEn: 'Right Ring', hand: 'right', color: '#8b5cf6' },

  'Digit0': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Minus': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Equal': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'KeyP': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'BracketLeft': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'BracketRight': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Semicolon': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Quote': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Slash': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Backspace': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'Enter': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' },
  'ShiftRight': { id: 'r-pinky', nameAr: 'الخنصر الأيمن', nameEn: 'Right Pinky', hand: 'right', color: '#ec4899' }
};

class TypingEngine {
  constructor(soundEngine, onUpdateUI, onFinishLesson) {
    this.sound = soundEngine;
    this.onUpdateUI = onUpdateUI;
    this.onFinishLesson = onFinishLesson;

    this.text = '';
    this.currentIndex = 0;
    this.charStates = []; // 'pending', 'correct', 'incorrect'

    this.correctCount = 0;
    this.incorrectCount = 0;
    this.totalKeystrokes = 0;

    this.startTime = null;
    this.timerInterval = null;
    this.isFinished = false;

    // Stage Time Management
    this.timeLimitSeconds = 60;
    this.isTimeExpired = false;

    // Current targeted key and finger
    this.currentFinger = null;
    this.currentKeyCode = null;

    // Key Telemetry for Adaptive Weakness Tracking
    this.keyTelemetry = {}; // char -> { correct: 0, incorrect: 0 }

    // Character to Key code mapping
    this.charToKeyMap = {
      ' ': 'Space',
      // Arabic Home Row
      'ش': 'KeyA', 'س': 'KeyS', 'ي': 'KeyD', 'ب': 'KeyF',
      'ل': 'KeyG', 'ا': 'KeyH', 'ت': 'KeyJ', 'ن': 'KeyK',
      'م': 'KeyL', 'ك': 'Semicolon', 'ط': 'Quote',
      // Arabic Top Row
      'ض': 'KeyQ', 'ص': 'KeyW', 'ث': 'KeyE', 'ق': 'KeyR',
      'ف': 'KeyT', 'غ': 'KeyY', 'ع': 'KeyU', 'ه': 'KeyI', 'هـ': 'KeyI',
      'خ': 'KeyO', 'ح': 'KeyP', 'ج': 'BracketLeft', 'د': 'BracketRight',
      // Arabic Bottom Row
      'ئ': 'KeyZ', 'ء': 'KeyX', 'ؤ': 'KeyC', 'ر': 'KeyV',
      'لا': 'KeyB', 'ى': 'KeyN', 'ة': 'KeyM', 'و': 'Comma',
      'ز': 'Period', 'ظ': 'Slash',
      // Arabic Digits
      'ذ': 'Backquote',
      '١': 'Digit1', '٢': 'Digit2', '٣': 'Digit3', '٤': 'Digit4', '٥': 'Digit5',
      '٦': 'Digit6', '٧': 'Digit7', '٨': 'Digit8', '٩': 'Digit9', '٠': 'Digit0',
      // English Alphabet
      'a': 'KeyA', 'b': 'KeyB', 'c': 'KeyC', 'd': 'KeyD',
      'e': 'KeyE', 'f': 'KeyF', 'g': 'KeyG', 'h': 'KeyH',
      'i': 'KeyI', 'j': 'KeyJ', 'k': 'KeyK', 'l': 'KeyL',
      'm': 'KeyM', 'n': 'KeyN', 'o': 'KeyO', 'p': 'KeyP',
      'q': 'KeyQ', 'r': 'KeyR', 's': 'KeyS', 't': 'KeyT',
      'u': 'KeyU', 'v': 'KeyV', 'w': 'KeyW', 'x': 'KeyX',
      'y': 'KeyY', 'z': 'KeyZ',
      // Standard Numbers & Symbols
      '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3', '4': 'Digit4',
      '5': 'Digit5', '6': 'Digit6', '7': 'Digit7', '8': 'Digit8', '9': 'Digit9',
      ';': 'Semicolon', ':': 'Semicolon', '=': 'Equal', '+': 'Equal',
      '-': 'Minus', '_': 'Minus', '[': 'BracketLeft', ']': 'BracketRight',
      '{': 'BracketLeft', '}': 'BracketRight',
      '(': 'Digit9', ')': 'Digit0', '>': 'Period', '<': 'Comma',
      '.': 'Period', ',': 'Comma', '/': 'Slash', '?': 'Slash',
      '"': 'Quote', "'": 'Quote', '`': 'Backquote', '~': 'Backquote',
      '؛': 'Semicolon', '،': 'Comma', '؟': 'Slash'
    };
  }

  loadLesson(lessonText, timeLimit = 60) {
    this.reset();
    this.text = lessonText.trim();
    this.timeLimitSeconds = timeLimit;
    this.charStates = new Array(this.text.length).fill('pending');
    this.updateTargetKeyHighlight();
    if (this.onUpdateUI) this.onUpdateUI(this.getMetrics());
  }

  reset() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.totalKeystrokes = 0;
    this.startTime = null;
    this.isFinished = false;
    this.isTimeExpired = false;
    this.charStates = [];
    this.currentFinger = null;
    this.currentKeyCode = null;
  }

  handleKeystroke(charPressed) {
    if (this.isFinished || this.currentIndex >= this.text.length) return;

    // Start timer on first keystroke
    if (!this.startTime) {
      this.startTime = Date.now();
      this.timerInterval = setInterval(() => {
        const metrics = this.getMetrics();
        if (metrics.remainingSeconds <= 0 && !this.isTimeExpired) {
          this.isTimeExpired = true;
        }
        if (this.onUpdateUI) this.onUpdateUI(metrics);
      }, 500);
    }

    this.totalKeystrokes++;
    const expectedChar = this.text[this.currentIndex];

    // Track Key Telemetry
    if (!this.keyTelemetry[expectedChar]) {
      this.keyTelemetry[expectedChar] = { correct: 0, incorrect: 0 };
    }

    if (charPressed === expectedChar) {
      // Correct keystroke
      this.keyTelemetry[expectedChar].correct++;
      this.sound.playKeyClick();
      this.correctCount++;
      this.charStates[this.currentIndex] = 'correct';
      this.currentIndex++;
    } else {
      // Incorrect keystroke
      this.keyTelemetry[expectedChar].incorrect++;
      this.sound.playErrorSound();
      this.incorrectCount++;
      this.charStates[this.currentIndex] = 'incorrect';
      this.currentIndex++;
    }

    // Check if lesson completed
    if (this.currentIndex >= this.text.length) {
      this.finish();
    } else {
      this.updateTargetKeyHighlight();
    }

    if (this.onUpdateUI) this.onUpdateUI(this.getMetrics());
  }

  handleBackspace() {
    if (this.currentIndex > 0 && !this.isFinished) {
      this.currentIndex--;
      if (this.charStates[this.currentIndex] === 'correct') {
        this.correctCount = Math.max(0, this.correctCount - 1);
      } else if (this.charStates[this.currentIndex] === 'incorrect') {
        this.incorrectCount = Math.max(0, this.incorrectCount - 1);
      }
      this.charStates[this.currentIndex] = 'pending';
      this.updateTargetKeyHighlight();
      if (this.onUpdateUI) this.onUpdateUI(this.getMetrics());
    }
  }

  finish() {
    this.isFinished = true;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.sound.playFinishChime();
    this.clearTargetKeyHighlight();
    if (this.onFinishLesson) {
      this.onFinishLesson(this.getMetrics());
    }
  }

  getMetrics() {
    const elapsedSeconds = this.startTime ? Math.max(1, Math.round((Date.now() - this.startTime) / 1000)) : 0;
    const remainingSeconds = Math.max(0, this.timeLimitSeconds - elapsedSeconds);
    const elapsedMinutes = elapsedSeconds / 60.0;

    // Standard Typing Standard: 1 word = 5 characters
    const wpm = elapsedMinutes > 0 ? Math.round((this.correctCount / 5) / elapsedMinutes) : 0;
    const cpm = elapsedMinutes > 0 ? Math.round(this.correctCount / elapsedMinutes) : 0;
    const accuracy = this.totalKeystrokes > 0 ? Math.round((this.correctCount / this.totalKeystrokes) * 100) : 100;
    const progressPercent = this.text.length > 0 ? Math.round((this.currentIndex / this.text.length) * 100) : 0;

    // Pedagogical Rating
    let rating = 'مبتدئ';
    if (wpm >= 60) rating = 'طابع نفاث (خبير)';
    else if (wpm >= 40) rating = 'محترف';
    else if (wpm >= 25) rating = 'متقدم';
    else if (wpm >= 15) rating = 'متوسط';

    return {
      wpm,
      cpm,
      accuracy,
      elapsedSeconds,
      remainingSeconds,
      timeLimitSeconds: this.timeLimitSeconds,
      progressPercent,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      totalKeystrokes: this.totalKeystrokes,
      currentIndex: this.currentIndex,
      totalChars: this.text.length,
      rating,
      finger: this.currentFinger,
      targetKey: this.currentKeyCode,
      weakKeys: this.getWeakKeys(),
      isFinished: this.isFinished,
      isTimeExpired: this.isTimeExpired
    };
  }

  updateTargetKeyHighlight() {
    this.clearTargetKeyHighlight();
    if (this.currentIndex >= this.text.length) {
      this.currentFinger = null;
      this.currentKeyCode = null;
      return;
    }

    const currentChar = this.text[this.currentIndex];
    const lookupKey = currentChar.toLowerCase();
    const targetKeyCode = this.charToKeyMap[currentChar] || this.charToKeyMap[lookupKey] || 'Space';

    this.currentKeyCode = targetKeyCode;
    this.currentFinger = KEY_TO_FINGER[targetKeyCode] || { id: 'thumb', nameAr: 'الإبهام', nameEn: 'Thumb', hand: 'both', color: '#f59e0b' };

    if (targetKeyCode) {
      const keyEl = document.querySelector(`.key-cap[data-code="${targetKeyCode}"]`);
      if (keyEl) keyEl.classList.add('active-target');
    }
  }

  clearTargetKeyHighlight() {
    document.querySelectorAll('.key-cap.active-target').forEach(el => el.classList.remove('active-target'));
  }

  /**
   * Identifies user's weakest keys (highest error rates)
   */
  getWeakKeys() {
    const list = [];
    for (const char in this.keyTelemetry) {
      if (char === ' ') continue;
      const stat = this.keyTelemetry[char];
      const total = stat.correct + stat.incorrect;
      if (total >= 2) {
        const errorRate = stat.incorrect / total;
        if (errorRate > 0.15 || stat.incorrect >= 2) {
          list.push({
            char,
            accuracy: Math.round((stat.correct / total) * 100),
            errors: stat.incorrect
          });
        }
      }
    }
    list.sort((a, b) => b.errors - a.errors);
    return list.slice(0, 4);
  }

  /**
   * Generates intelligent adaptive drill focusing on weak keys
   */
  generateAdaptiveDrill(lang = 'ar') {
    const weak = this.getWeakKeys();
    const weakChars = weak.map(w => w.char);

    if (lang === 'ar') {
      const anchors = ['ت', 'ن', 'م', 'ك', 'ب', 'ي', 'س', 'ش'];
      const targetKeys = weakChars.length > 0 ? weakChars : ['ص', 'ع', 'ق', 'غ'];
      const drillWords = [];

      for (let i = 0; i < 14; i++) {
        const k = targetKeys[i % targetKeys.length];
        const a1 = anchors[Math.floor(Math.random() * anchors.length)];
        const a2 = anchors[Math.floor(Math.random() * anchors.length)];
        drillWords.push(`${k}${a1}${k} ${a2}${k}${a1}`);
      }
      return drillWords.join(' ');
    } else {
      const anchors = ['a', 's', 'd', 'f', 'j', 'k', 'l'];
      const targetKeys = weakChars.length > 0 ? weakChars : ['e', 'r', 'u', 'o'];
      const drillWords = [];

      for (let i = 0; i < 14; i++) {
        const k = targetKeys[i % targetKeys.length];
        const a1 = anchors[Math.floor(Math.random() * anchors.length)];
        const a2 = anchors[Math.floor(Math.random() * anchors.length)];
        drillWords.push(`${k}${a1}${k} ${a2}${k}${a1}`);
      }
      return drillWords.join(' ');
    }
  }
}
