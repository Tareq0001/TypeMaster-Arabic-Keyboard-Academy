/**
 * TypeMaster Academy | Main Application Controller & UI Orchestrator
 * ===================================================================
 * Binds virtual keyboard DOM events, text display spans, category tabs,
 * language switcher, full Dark Mode theming, HUD telemetry, and modals.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

document.addEventListener('DOMContentLoaded', () => {
  const sound = new SoundEffectsEngine();
  let currentLang = 'ar'; // 'ar' or 'en'
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

  // Controls & Toggles
  const btnToggleTheme = document.getElementById('btn-toggle-theme');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');
  const themeLabel = document.getElementById('theme-label');

  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const btnResetTyping = document.getElementById('btn-reset-typing');

  // Language Tabs
  const tabLangAr = document.getElementById('tab-lang-ar');
  const tabLangEn = document.getElementById('tab-lang-en');
  const categoryPillsContainer = document.getElementById('lesson-category-pills');

  // Keyboard toolbar & elements
  const virtualKeyboard = document.getElementById('virtual-keyboard');
  const kbdStatusIcon = document.getElementById('kbd-status-icon');
  const kbdStatusText = document.getElementById('kbd-status-text');
  const btnKbdAr = document.getElementById('btn-kbd-ar');
  const btnKbdEn = document.getElementById('btn-kbd-en');

  // Toast Helper
  const toastEl = document.getElementById('academy-toast');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // ==========================================================
  // 1. DARK MODE / THEME ENGINE
  // ==========================================================
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('typemaster_theme', theme);

    if (theme === 'dark') {
      if (iconMoon) iconMoon.style.display = 'none';
      if (iconSun) iconSun.style.display = 'block';
      if (themeLabel) themeLabel.textContent = 'الوضع الفاتح';
      if (btnToggleTheme) btnToggleTheme.classList.add('active');
    } else {
      if (iconMoon) iconMoon.style.display = 'block';
      if (iconSun) iconSun.style.display = 'none';
      if (themeLabel) themeLabel.textContent = 'الوضع الداكن';
      if (btnToggleTheme) btnToggleTheme.classList.remove('active');
    }
  }

  // Initial Theme Load
  const savedTheme = localStorage.getItem('typemaster_theme') || 'light';
  applyTheme(savedTheme);

  if (btnToggleTheme) {
    btnToggleTheme.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(nextTheme === 'dark' ? 'تم تفعيل الوضع الداكن 🌙' : 'تم تفعيل الوضع الفاتح ☀️');
    });
  }

  // ==========================================================
  // 2. DEDICATED KEYBOARD LANGUAGE SWITCHER
  // ==========================================================
  function setKeyboardLanguage(lang) {
    if (!virtualKeyboard) return;
    virtualKeyboard.setAttribute('data-keyboard-lang', lang);

    if (lang === 'ar') {
      if (kbdStatusIcon) kbdStatusIcon.textContent = '🇸🇦';
      if (kbdStatusText) kbdStatusText.textContent = 'لوحة المفاتيح: عربية بالكامل';
      if (btnKbdAr) btnKbdAr.classList.add('active');
      if (btnKbdEn) btnKbdEn.classList.remove('active');
      if (textDisplayBox) textDisplayBox.style.direction = 'rtl';
    } else {
      if (kbdStatusIcon) kbdStatusIcon.textContent = '🇬🇧';
      if (kbdStatusText) kbdStatusText.textContent = 'Keyboard: English Only (QWERTY)';
      if (btnKbdAr) btnKbdAr.classList.remove('active');
      if (btnKbdEn) btnKbdEn.classList.add('active');
      if (textDisplayBox) textDisplayBox.style.direction = 'ltr';
    }
  }

  if (btnKbdAr) {
    btnKbdAr.addEventListener('click', () => {
      setKeyboardLanguage('ar');
      showToast('تم ضبط لوحة المفاتيح: عربية بالكامل 🇸🇦');
    });
  }

  if (btnKbdEn) {
    btnKbdEn.addEventListener('click', () => {
      setKeyboardLanguage('en');
      showToast('Keyboard mode: English Only 🇬🇧');
    });
  }

  // ==========================================================
  // 3. TYPING ENGINE BINDINGS
  // ==========================================================
  const onUpdateUI = (metrics) => {
    if (hudWpm) hudWpm.innerHTML = `${metrics.wpm} <span>WPM</span>`;
    if (hudAccuracy) hudAccuracy.innerHTML = `${metrics.accuracy}%`;
    if (hudTime) hudTime.innerHTML = `${metrics.elapsedSeconds} <span>ث</span>`;
    if (hudErrors) hudErrors.innerHTML = `${metrics.incorrectCount}`;

    renderTextSpans();
  };

  const onFinishLesson = (metrics) => {
    if (modalWpm) modalWpm.textContent = `${metrics.wpm} WPM`;
    if (modalAccuracy) modalAccuracy.textContent = `${metrics.accuracy}%`;
    if (modalKeystrokes) modalKeystrokes.textContent = `${metrics.totalKeystrokes}`;
    if (modalRating) modalRating.textContent = metrics.rating;

    if (modalOverlay) modalOverlay.classList.add('show');
  };

  const engine = new TypingEngine(sound, onUpdateUI, onFinishLesson);

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

  // ==========================================================
  // 4. LESSONS & CATEGORIES MANAGEMENT
  // ==========================================================
  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    categoryPillsContainer.innerHTML = '';

    // Filter categories matching current language
    const relevantKeys = Object.keys(LESSON_DATABASE).filter(key => {
      return LESSON_DATABASE[key].lang === currentLang;
    });

    if (!relevantKeys.includes(currentCategory)) {
      currentCategory = relevantKeys[0] || 'home_row_ar';
      currentLessonIndex = 0;
    }

    relevantKeys.forEach(catKey => {
      const catData = LESSON_DATABASE[catKey];
      const btn = document.createElement('button');
      btn.className = `category-pill ${catKey === currentCategory ? 'active' : ''}`;
      btn.setAttribute('data-category', catKey);
      btn.textContent = catData.title;

      btn.addEventListener('click', () => {
        currentCategory = catKey;
        currentLessonIndex = 0;
        
        // Ensure keyboard matches lesson language
        setKeyboardLanguage(catData.lang);
        renderCategoryPills();
        loadCurrentLesson();
        showToast(`تم اختيار: ${catData.title}`);
      });

      categoryPillsContainer.appendChild(btn);
    });
  }

  function loadCurrentLesson() {
    const catData = LESSON_DATABASE[currentCategory] || LESSON_DATABASE.home_row_ar;
    const lessonList = catData.lessons || [];
    const lesson = lessonList[currentLessonIndex % lessonList.length];

    if (!lesson) return;

    // Automatically sync keyboard to lesson language
    setKeyboardLanguage(catData.lang);

    engine.loadLesson(lesson.text);
    renderTextSpans();
    if (textDisplayBox) textDisplayBox.focus();
  }

  // Language Tabs Click Listeners
  if (tabLangAr) {
    tabLangAr.addEventListener('click', () => {
      currentLang = 'ar';
      tabLangAr.classList.add('active');
      if (tabLangEn) tabLangEn.classList.remove('active');
      currentCategory = 'home_row_ar';
      currentLessonIndex = 0;
      setKeyboardLanguage('ar');
      renderCategoryPills();
      loadCurrentLesson();
      showToast('تم التبديل إلى: التدريب العربي 🇸🇦');
    });
  }

  if (tabLangEn) {
    tabLangEn.addEventListener('click', () => {
      currentLang = 'en';
      tabLangEn.classList.add('active');
      if (tabLangAr) tabLangAr.classList.remove('active');
      currentCategory = 'home_row_en';
      currentLessonIndex = 0;
      setKeyboardLanguage('en');
      renderCategoryPills();
      loadCurrentLesson();
      showToast('Switched to: English Training 🇬🇧');
    });
  }

  // ==========================================================
  // 5. KEYBOARD KEYSTROKE CAPTURE
  // ==========================================================
  window.addEventListener('keydown', (e) => {
    // Ignore function keys, alt, ctrl, meta
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === 'F5' || e.key === 'F12' || e.key === 'Tab') return;

    // Physical keypress animation on virtual keyboard
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
      showToast(isMuted ? 'تم كتم المؤثرات الصوتية' : 'تم تفعيل نقرات الكيبورد الميكانيكية 🔊');
    });
  }

  // Reset Button
  if (btnResetTyping) {
    btnResetTyping.addEventListener('click', () => {
      loadCurrentLesson();
      showToast('تمت إعادة تشغيل التمرين الحالي');
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
      const currentKbdLang = virtualKeyboard ? virtualKeyboard.getAttribute('data-keyboard-lang') : 'ar';
      let char = '';
      if (currentKbdLang === 'ar') {
        const arSpan = keyEl.querySelector('.key-char-ar');
        char = arSpan ? arSpan.textContent.trim() : '';
      } else {
        const enSpan = keyEl.querySelector('.key-char-en');
        char = enSpan ? enSpan.textContent.trim().toLowerCase() : '';
      }

      if (char && char.length === 1) {
        engine.handleKeystroke(char);
      } else if (keyEl.getAttribute('data-code') === 'Space') {
        engine.handleKeystroke(' ');
      }
    });
  });

  // Initial Setup
  renderCategoryPills();
  loadCurrentLesson();
});
