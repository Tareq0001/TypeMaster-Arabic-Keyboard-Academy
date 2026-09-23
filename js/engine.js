/**
 * TypeMaster Academy | Core Typing Engine & Keyboard Synchronizer
 * ===============================================================
 * Real-time keystroke evaluation, WPM/CPM mathematical calculations,
 * character highlighting, and virtual keyboard key tracking.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

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

    // Character to Key code mapping (for highlighting virtual keyboard)
    this.charToKeyMap = {
      ' ': 'Space',
      // Arabic Home Row
      'ش': 'KeyA', 'س': 'KeyS', 'ي': 'KeyD', 'ب': 'KeyF',
      'ل': 'KeyG', 'ا': 'KeyH', 'ت': 'KeyJ', 'ن': 'KeyK',
      'م': 'KeyL', 'ك': 'Semicolon', 'ط': 'Quote',
      // Arabic Top Row
      'ض': 'KeyQ', 'ص': 'KeyW', 'ث': 'KeyE', 'ق': 'KeyR',
      'ف': 'KeyT', 'غ': 'KeyY', 'ع': 'KeyU', 'ه': 'KeyI',
      'خ': 'KeyO', 'ح': 'KeyP', 'ج': 'BracketLeft', 'د': 'BracketRight',
      // Arabic Bottom Row
      'ئ': 'KeyZ', 'ء': 'KeyX', 'ؤ': 'KeyC', 'ر': 'KeyV',
      'لا': 'KeyB', 'ى': 'KeyN', 'ة': 'KeyM', 'و': 'Comma',
      'ز': 'Period', 'ظ': 'Slash',
      // English Alphabet
      'a': 'KeyA', 'b': 'KeyB', 'c': 'KeyC', 'd': 'KeyD',
      'e': 'KeyE', 'f': 'KeyF', 'g': 'KeyG', 'h': 'KeyH',
      'i': 'KeyI', 'j': 'KeyJ', 'k': 'KeyK', 'l': 'KeyL',
      'm': 'KeyM', 'n': 'KeyN', 'o': 'KeyO', 'p': 'KeyP',
      'q': 'KeyQ', 'r': 'KeyR', 's': 'KeyS', 't': 'KeyT',
      'u': 'KeyU', 'v': 'KeyV', 'w': 'KeyW', 'x': 'KeyX',
      'y': 'KeyY', 'z': 'KeyZ',
      // Numbers & Symbols
      '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3', '4': 'Digit4',
      '5': 'Digit5', '6': 'Digit6', '7': 'Digit7', '8': 'Digit8', '9': 'Digit9',
      ';': 'Semicolon', ':': 'Semicolon', '=': 'Equal', '+': 'Equal',
      '-': 'Minus', '_': 'Minus', '[': 'BracketLeft', ']': 'BracketRight',
      '{': 'BracketLeft', '}': 'BracketRight',
      '(': 'Digit9', ')': 'Digit0', '>': 'Period', '<': 'Comma',
      '.': 'Period', ',': 'Comma', '/': 'Slash', '?': 'Slash',
      '"': 'Quote', "'": 'Quote', '`': 'Backquote', '~': 'Backquote'
    };
  }

  loadLesson(lessonText) {
    this.reset();
    this.text = lessonText.trim();
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
    this.charStates = [];
  }

  handleKeystroke(charPressed) {
    if (this.isFinished || this.currentIndex >= this.text.length) return;

    // Start timer on first keystroke
    if (!this.startTime) {
      this.startTime = Date.now();
      this.timerInterval = setInterval(() => {
        if (this.onUpdateUI) this.onUpdateUI(this.getMetrics());
      }, 500);
    }

    this.totalKeystrokes++;
    const expectedChar = this.text[this.currentIndex];

    if (charPressed === expectedChar) {
      // Correct keystroke
      this.sound.playKeyClick();
      this.correctCount++;
      this.charStates[this.currentIndex] = 'correct';
      this.currentIndex++;
    } else {
      // Incorrect keystroke
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
    const elapsedMinutes = elapsedSeconds / 60.0;

    // Standard Typing Standard: 1 word = 5 characters
    const wpm = elapsedMinutes > 0 ? Math.round((this.correctCount / 5) / elapsedMinutes) : 0;
    const cpm = elapsedMinutes > 0 ? Math.round(this.correctCount / elapsedMinutes) : 0;
    const accuracy = this.totalKeystrokes > 0 ? Math.round((this.correctCount / this.totalKeystrokes) * 100) : 100;

    // Rating
    let rating = 'مبتدئ';
    if (wpm >= 65) rating = 'طابع نفاث (خبير)';
    else if (wpm >= 45) rating = 'محترف';
    else if (wpm >= 25) rating = 'متوسط ومتقدم';

    return {
      wpm,
      cpm,
      accuracy,
      elapsedSeconds,
      correctCount: this.correctCount,
      incorrectCount: this.incorrectCount,
      totalKeystrokes: this.totalKeystrokes,
      currentIndex: this.currentIndex,
      totalChars: this.text.length,
      rating,
      isFinished: this.isFinished
    };
  }

  updateTargetKeyHighlight() {
    this.clearTargetKeyHighlight();
    if (this.currentIndex >= this.text.length) return;

    const nextChar = this.text[this.currentIndex].toLowerCase();
    const targetKeyCode = this.charToKeyMap[nextChar] || this.charToKeyMap[this.text[this.currentIndex]];

    if (targetKeyCode) {
      const keyEl = document.querySelector(`.key-cap[data-code="${targetKeyCode}"]`);
      if (keyEl) keyEl.classList.add('active-target');
    }
  }

  clearTargetKeyHighlight() {
    document.querySelectorAll('.key-cap.active-target').forEach(el => el.classList.remove('active-target'));
  }
}
