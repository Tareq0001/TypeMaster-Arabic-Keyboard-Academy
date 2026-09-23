/**
 * TypeMaster Academy | Main Application Controller & UI Orchestrator
 * ===================================================================
 * Binds virtual keyboard DOM events, text display spans, category tabs,
 * sound toggle, HUD telemetry, and completion modals.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

document.addEventListener('DOMContentLoaded', () => {
  const sound = new SoundEffectsEngine();
  let currentCategory = 'home_row_ar';
  let currentLessonIndex = 0;

  // DOM Elements
  const textDisplayBox = document.getElementById('text-display-box');
  const hudWpm = document.getElementById('hud-wpm');
  const hudAccuracy = document.getElementById('hud-accuracy');
  const hudTime = document.getElementById('hud-time');
  const hudErrors = document.getElementById('hud-errors');

  // Modal Elements
  const modalOverlay = document.getElementById('modal-overlay');
  const modalWpm = document.getElementById('modal-wpm');
  const modalAccuracy = document.getElementById('modal-accuracy');
  const modalKeystrokes = document.getElementById('modal-keystrokes');
  const modalRating = document.getElementById('modal-rating');
  const btnNextLesson = document.getElementById('btn-next-lesson');
  const btnRetryLesson = document.getElementById('btn-retry-lesson');

  // Controls
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const btnResetTyping = document.getElementById('btn-reset-typing');
  const categoryPills = document.querySelectorAll('.category-pill');

  // Toast Helper
  const toastEl = document.getElementById('academy-toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  // Update UI callback from TypingEngine
  const onUpdateUI = (metrics) => {
    // 1. Update HUD
    if (hudWpm) hudWpm.innerHTML = `${metrics.wpm} <span>WPM</span>`;
    if (hudAccuracy) hudAccuracy.innerHTML = `${metrics.accuracy}%`;
    if (hudTime) hudTime.innerHTML = `${metrics.elapsedSeconds} <span>ث</span>`;
    if (hudErrors) hudErrors.innerHTML = `${metrics.incorrectCount}`;

    // 2. Render Text Box Spans
    renderTextSpans();
  };

  // Lesson Finished callback
  const onFinishLesson = (metrics) => {
    if (modalWpm) modalWpm.textContent = `${metrics.wpm} WPM`;
    if (modalAccuracy) modalAccuracy.textContent = `${metrics.accuracy}%`;
    if (modalKeystrokes) modalKeystrokes.textContent = `${metrics.totalKeystrokes}`;
    if (modalRating) modalRating.textContent = metrics.rating;

    if (modalOverlay) modalOverlay.classList.add('show');
  };

  const engine = new TypingEngine(sound, onUpdateUI, onFinishLesson);

  // Render character spans inside #text-display-box
  function renderTextSpans() {
    if (!textDisplayBox) return;
    textDisplayBox.innerHTML = '';

    for (let i = 0; i < engine.text.length; i++) {
      const span = document.createElement('span');
      const char = engine.text[i];
      span.textContent = char;

      if (i < engine.currentIndex) {
        span.className = engine.charStates[i] === 'correct' ? 'char-correct' : 'char-incorrect';
      } else if (i === engine.currentIndex) {
        span.className = 'char-current';
      } else {
        span.className = 'char-pending';
      }

      textDisplayBox.appendChild(span);
    }
  }

  // Load lesson
  function loadCurrentLesson() {
    const list = LESSON_DATABASE[currentCategory] || LESSON_DATABASE.home_row_ar;
    const lesson = list[currentLessonIndex % list.length];
    
    // Update active category pill
    categoryPills.forEach(p => {
      if (p.getAttribute('data-category') === currentCategory) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    engine.loadLesson(lesson.text);
    renderTextSpans();
    if (textDisplayBox) textDisplayBox.focus();
  }

  // Category Pill Listeners
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      currentCategory = pill.getAttribute('data-category');
      currentLessonIndex = 0;
      loadCurrentLesson();
      showToast(`تم اختيار درس: ${pill.textContent}`);
    });
  });

  // Global Keyboard Keystroke Handler
  window.addEventListener('keydown', (e) => {
    // Ignore function keys, alt, ctrl, meta
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === 'F5' || e.key === 'F12' || e.key === 'Tab') return;

    // Handle physical keypress animation on virtual keyboard
    const keyEl = document.querySelector(`.key-cap[data-code="${e.code}"]`);
    if (keyEl) {
      keyEl.classList.add('pressed');
      setTimeout(() => keyEl.classList.remove('pressed'), 120);
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      engine.handleBackspace();
      return;
    }

    // Only process single printable characters
    if (e.key.length === 1) {
      e.preventDefault();
      engine.handleKeystroke(e.key);
    }
  });

  // Sound Toggle
  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      btnToggleSound.classList.toggle('active', !isMuted);
      showToast(isMuted ? 'تم كتم المؤثرات الصوتية' : 'تم تفعيل نقرات الكيبورد الميكانيكية');
    });
  }

  // Reset Button
  if (btnResetTyping) {
    btnResetTyping.addEventListener('click', () => {
      loadCurrentLesson();
      showToast('تمت إعادة ضبط الدرس');
    });
  }

  // Modal Buttons
  if (btnNextLesson) {
    btnNextLesson.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('show');
      currentLessonIndex++;
      loadCurrentLesson();
      showToast('الانتقال إلى التمرين التالي!');
    });
  }

  if (btnRetryLesson) {
    btnRetryLesson.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('show');
      loadCurrentLesson();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('show');
    });
  }

  // Virtual key clicks support (for mouse tapping)
  document.querySelectorAll('.key-cap').forEach(keyEl => {
    keyEl.addEventListener('click', () => {
      const mainAr = keyEl.querySelector('.key-main-ar');
      const char = mainAr ? mainAr.textContent.trim() : '';
      if (char && char.length === 1) {
        engine.handleKeystroke(char);
      } else if (keyEl.getAttribute('data-code') === 'Space') {
        engine.handleKeystroke(' ');
      }
    });
  });

  // Initial load
  loadCurrentLesson();
});
