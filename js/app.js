/**
 * TypeMaster Academy | Main Educational Controller & Smart Focus Orchestrator
 * ===========================================================================
 * Features:
 * - Smart Focus Mode (Zero visual distraction, 100% eyes on words)
 * - Inline Floating Caret Finger HUD (travels with cursor above target letter)
 * - Intelligent Word-Chunking Typography
 * - Real-time Weakness Radar & Adaptive Practice Generator
 * - 6-Stage Pedagogical Curriculum with Countdown Timers
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

document.addEventListener('DOMContentLoaded', () => {
  const sound = new SoundEffectsEngine();
  let currentTrack = 'ar'; // 'ar' or 'en'
  let currentStageKey = 'stage_ar_1';
  let currentExerciseIndex = 0;
  let currentMode = 'focus'; // 'focus', 'full', 'blind'

  // DOM Elements - Stage Header
  const stageNumBadge = document.getElementById('stage-num-badge');
  const stageTitleText = document.getElementById('stage-title-text');
  const stageTargetTime = document.getElementById('stage-target-time');
  const stageTargetWpm = document.getElementById('stage-target-wpm');
  const stageTargetAcc = document.getElementById('stage-target-acc');
  const stageObjectiveDesc = document.getElementById('stage-objective-desc');

  // DOM Elements - Mode Controls
  const btnModeFocus = document.getElementById('btn-mode-focus');
  const btnModeFull = document.getElementById('btn-mode-full');
  const btnModeBlind = document.getElementById('btn-mode-blind');

  // Weakness Radar Elements
  const weakKeysContainer = document.getElementById('weak-keys-container');
  const btnTriggerAdaptive = document.getElementById('btn-trigger-adaptive');

  // DOM Elements - HUD
  const hudWpm = document.getElementById('hud-wpm');
  const hudAccuracy = document.getElementById('hud-accuracy');
  const hudTime = document.getElementById('hud-time');
  const hudErrors = document.getElementById('hud-errors');
  const hudTimerCard = document.getElementById('hud-timer-card');
  const timeProgressFill = document.getElementById('time-progress-fill');

  // Text & Stage Progress
  const textDisplayBox = document.getElementById('text-display-box');
  const stageCompBar = document.getElementById('stage-comp-bar');
  const stageCompText = document.getElementById('stage-comp-text');

  // Stage Navigation & Exercise pills
  const stagePillsContainer = document.getElementById('lesson-category-pills');
  const exercisePillsRow = document.getElementById('exercise-pills-row');

  // Modal Elements
  const modalOverlay = document.getElementById('modal-overlay');
  const modalWpm = document.getElementById('modal-wpm');
  const modalAccuracy = document.getElementById('modal-accuracy');
  const modalElapsedTime = document.getElementById('modal-elapsed-time');
  const modalRating = document.getElementById('modal-rating');
  const pedagogicalFeedbackBox = document.getElementById('pedagogical-feedback-box');
  const btnNextLesson = document.getElementById('btn-next-lesson');
  const btnRetryLesson = document.getElementById('btn-retry-lesson');

  // Roadmap Modal
  const modalRoadmap = document.getElementById('modal-roadmap');
  const btnOpenRoadmap = document.getElementById('btn-open-roadmap');
  const btnCloseRoadmap = document.getElementById('btn-close-roadmap');
  const roadmapStagesList = document.getElementById('roadmap-stages-list');

  // Header Controls
  const btnToggleTheme = document.getElementById('btn-toggle-theme');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');
  const themeLabel = document.getElementById('theme-label');
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const btnResetTyping = document.getElementById('btn-reset-typing');

  // Language Tabs
  const tabLangAr = document.getElementById('tab-lang-ar');
  const tabLangEn = document.getElementById('tab-lang-en');

  // Keyboard toolbar
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
  // 1. SMART TRAINING MODES (FOCUS / FULL / BLINDFOLD)
  // ==========================================================
  function setTrainingMode(mode) {
    currentMode = mode;
    document.body.classList.remove('focus-mode-active', 'blindfold-mode-active');
    [btnModeFocus, btnModeFull, btnModeBlind].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (mode === 'focus') {
      document.body.classList.add('focus-mode-active');
      if (btnModeFocus) btnModeFocus.classList.add('active');
      showToast('🎯 وضع التركيز الذكي: عينك على الكلمات فقط مع الشارة العائمة!');
    } else if (mode === 'blind') {
      document.body.classList.add('blindfold-mode-active');
      if (btnModeBlind) btnModeBlind.classList.add('active');
      showToast('🙈 وضع التعمية: حروف اللوحة مخفية لتثبيت الذاكرة العضلية!');
    } else {
      if (btnModeFull) btnModeFull.classList.add('active');
      showToast('🖐️ وضع المرشد الكامل: عرض اليدين واللوحة');
    }

    renderTextSpans();
    if (textDisplayBox) textDisplayBox.focus();
  }

  if (btnModeFocus) btnModeFocus.addEventListener('click', () => setTrainingMode('focus'));
  if (btnModeFull) btnModeFull.addEventListener('click', () => setTrainingMode('full'));
  if (btnModeBlind) btnModeBlind.addEventListener('click', () => setTrainingMode('blind'));

  // ==========================================================
  // 2. THEME ENGINE (DARK / LIGHT MODE)
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
  // 3. DEDICATED KEYBOARD MODE
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
      showToast('لوحة المفاتيح: عربية فقط 🇸🇦');
    });
  }

  if (btnKbdEn) {
    btnKbdEn.addEventListener('click', () => {
      setKeyboardLanguage('en');
      showToast('Keyboard: English Only 🇬🇧');
    });
  }

  // ==========================================================
  // 4. VISUAL HANDS UPDATE (For Full Guide mode)
  // ==========================================================
  function updateVisualHands(finger) {
    document.querySelectorAll('.hand-finger').forEach(el => el.classList.remove('active-finger'));
    if (!finger) return;

    if (finger.id === 'thumb') {
      const lThumb = document.getElementById('finger-l-thumb');
      const rThumb = document.getElementById('finger-r-thumb');
      if (lThumb) lThumb.classList.add('active-finger');
      if (rThumb) rThumb.classList.add('active-finger');
    } else {
      const targetFingerEl = document.getElementById(`finger-${finger.id}`);
      if (targetFingerEl) targetFingerEl.classList.add('active-finger');
    }
  }

  // ==========================================================
  // 5. WORD CHUNKING & INLINE FLOATING CARET HUD
  // ==========================================================
  function renderTextSpans() {
    if (!textDisplayBox) return;
    textDisplayBox.innerHTML = '';

    const text = engine.text;
    if (!text) return;

    // Tokenize text into words with preserved spaces
    let globalCharIndex = 0;
    const words = text.split(' ');

    words.forEach((wordText, wordIdx) => {
      const wordContainer = document.createElement('span');
      wordContainer.className = 'word-token';

      const wordStartIndex = globalCharIndex;
      const wordEndIndex = globalCharIndex + wordText.length;

      // Determine word status
      if (engine.currentIndex >= wordStartIndex && engine.currentIndex < wordEndIndex) {
        wordContainer.classList.add('word-current');
      } else if (engine.currentIndex >= wordEndIndex) {
        wordContainer.classList.add('word-completed');
      } else {
        wordContainer.classList.add('word-upcoming');
      }

      // Render individual characters of the word
      for (let i = 0; i < wordText.length; i++) {
        const char = wordText[i];
        const span = document.createElement('span');
        span.className = 'char-span';
        span.textContent = char;

        const charAbsoluteIndex = wordStartIndex + i;

        if (charAbsoluteIndex < engine.currentIndex) {
          span.className += engine.charStates[charAbsoluteIndex] === 'correct' ? ' char-correct' : ' char-incorrect';
        } else if (charAbsoluteIndex === engine.currentIndex) {
          span.className += ' char-current';

          // ATTACH THE FLOATING CARET HUD DIRECTLY ON THIS ACTIVE LETTER!
          const caretEl = document.createElement('span');
          caretEl.className = 'inline-finger-caret';
          const finger = engine.currentFinger || { nameAr: 'السبابة', nameEn: 'Index', color: '#10b981' };
          caretEl.style.setProperty('--caret-color', finger.color);

          const dot = document.createElement('span');
          dot.className = 'caret-dot';

          const label = document.createElement('span');
          label.textContent = currentTrack === 'ar' ? finger.nameAr : finger.nameEn;

          caretEl.appendChild(dot);
          caretEl.appendChild(label);
          span.appendChild(caretEl);
        } else {
          span.className += ' char-pending';
        }

        wordContainer.appendChild(span);
      }

      textDisplayBox.appendChild(wordContainer);
      globalCharIndex += wordText.length;

      // Append Space token if not last word
      if (wordIdx < words.length - 1) {
        const spaceIndex = globalCharIndex;
        const spaceSpan = document.createElement('span');
        spaceSpan.className = 'char-span';
        spaceSpan.innerHTML = '&nbsp;';

        if (spaceIndex < engine.currentIndex) {
          spaceSpan.className += engine.charStates[spaceIndex] === 'correct' ? ' char-correct' : ' char-incorrect';
        } else if (spaceIndex === engine.currentIndex) {
          spaceSpan.className += ' char-current';

          // Floating caret for Space (Thumbs)
          const caretEl = document.createElement('span');
          caretEl.className = 'inline-finger-caret';
          caretEl.style.setProperty('--caret-color', '#f59e0b');

          const dot = document.createElement('span');
          dot.className = 'caret-dot';

          const label = document.createElement('span');
          label.textContent = currentTrack === 'ar' ? 'الإبهام (مسافة)' : 'Thumbs (Space)';

          caretEl.appendChild(dot);
          caretEl.appendChild(label);
          spaceSpan.appendChild(caretEl);
        } else {
          spaceSpan.className += ' char-pending';
        }

        textDisplayBox.appendChild(spaceSpan);
        globalCharIndex += 1;
      }
    });
  }

  // ==========================================================
  // 6. TYPING ENGINE UI INTEGRATION
  // ==========================================================
  const onUpdateUI = (metrics) => {
    // 1. HUD Metrics
    if (hudWpm) hudWpm.innerHTML = `${metrics.wpm} <span>WPM</span>`;
    if (hudAccuracy) hudAccuracy.innerHTML = `${metrics.accuracy}%`;
    if (hudErrors) hudErrors.innerHTML = `${metrics.incorrectCount}`;

    // 2. Countdown Timer
    if (hudTime) {
      hudTime.innerHTML = `${metrics.remainingSeconds} <span>ث</span>`;
    }
    if (timeProgressFill) {
      const timePct = Math.max(0, Math.min(100, (metrics.remainingSeconds / metrics.timeLimitSeconds) * 100));
      timeProgressFill.style.width = `${timePct}%`;
      if (metrics.remainingSeconds <= 15) {
        if (hudTimerCard) hudTimerCard.classList.add('time-urgent');
        timeProgressFill.style.background = 'var(--rose)';
      } else {
        if (hudTimerCard) hudTimerCard.classList.remove('time-urgent');
        timeProgressFill.style.background = 'var(--sky)';
      }
    }

    // 3. Stage Progress %
    if (stageCompBar) stageCompBar.style.width = `${metrics.progressPercent}%`;
    if (stageCompText) stageCompText.textContent = `${metrics.progressPercent}%`;

    // 4. Update Weakness Radar Chips
    if (weakKeysContainer) {
      if (metrics.weakKeys && metrics.weakKeys.length > 0) {
        weakKeysContainer.innerHTML = metrics.weakKeys.map(w => 
          `<span class="weakness-chip-tag" title="نسبة الدقة ${w.accuracy}%">${w.char} (${w.accuracy}%)</span>`
        ).join('');
      } else {
        weakKeysContainer.innerHTML = `<span style="font-size:11px; color:var(--emerald); font-weight:700;">✨ أداؤك متزن ودقيق!</span>`;
      }
    }

    // 5. Update Hands SVG (if visible in Full mode)
    updateVisualHands(metrics.finger);

    // 6. Render Word Chunks and Floating Caret
    renderTextSpans();
  };

  const onFinishLesson = (metrics) => {
    const stage = STAGES_DATABASE[currentStageKey];
    if (modalWpm) modalWpm.textContent = `${metrics.wpm} WPM`;
    if (modalAccuracy) modalAccuracy.textContent = `${metrics.accuracy}%`;
    if (modalElapsedTime) modalElapsedTime.textContent = `${metrics.elapsedSeconds} ث / المستهدف: ${stage ? stage.timeLimitSeconds : 60}ث`;
    if (modalRating) modalRating.textContent = metrics.rating;

    const targetWpm = stage ? stage.targetWpm : 25;
    const targetAcc = stage ? stage.targetAccuracy : 90;
    const passWpm = metrics.wpm >= targetWpm;
    const passAcc = metrics.accuracy >= targetAcc;
    let feedback = '';

    if (passWpm && passAcc) {
      feedback = `🌟 إنجاز متميز! حققت معايير المرحلة بنجاح باهر (دقة ${metrics.accuracy}% وسرعة ${metrics.wpm} WPM). حافظت على تركيز عينيك على الكلمات!`;
    } else if (passAcc) {
      feedback = `👍 دقة أصابعك ممتازة (${metrics.accuracy}%)، ومع تكرار التركيز البصري ستصل لسرعة ${targetWpm} WPM المستهدفة بكل سهولة.`;
    } else {
      feedback = `💡 رائع! تذكر أن الشارة العائمة تتبع الحرف دائماً، لا تنظر للأسفل ودع الذاكرة العضلية تتطور طبيعياً.`;
    }

    if (pedagogicalFeedbackBox) pedagogicalFeedbackBox.textContent = feedback;
    if (modalOverlay) modalOverlay.classList.add('show');
  };

  const engine = new TypingEngine(sound, onUpdateUI, onFinishLesson);

  // Trigger Adaptive Drill Button
  if (btnTriggerAdaptive) {
    btnTriggerAdaptive.addEventListener('click', () => {
      const drillText = engine.generateAdaptiveDrill(currentTrack);
      if (stageNumBadge) stageNumBadge.textContent = '🧠 تدريب تكيفي ذكي';
      if (stageTitleText) stageTitleText.textContent = 'تمرين ذكي مخصص لعلاج الحروف الأكثر تعثراً';
      if (stageObjectiveDesc) {
        stageObjectiveDesc.innerHTML = `<strong>الهدف الذكي:</strong> تم إنشاء هذا التدريب آلياً لمعالجة أخطائك المتكررة في الحروف؛ ركّز على الشارة العائمة فوق الحرف واكتب بهدوء وثبات.`;
      }
      engine.loadLesson(drillText, 60);
      renderTextSpans();
      showToast('🧠 تم توليد تدريب ذكي مخصص لنقاط ضعفك!');
    });
  }

  // ==========================================================
  // 7. STAGES & EXERCISES CONTROLLER
  // ==========================================================
  function renderStagePills() {
    if (!stagePillsContainer) return;
    stagePillsContainer.innerHTML = '';

    const stageKeys = Object.keys(STAGES_DATABASE).filter(k => STAGES_DATABASE[k].lang === currentTrack);

    if (!stageKeys.includes(currentStageKey)) {
      currentStageKey = stageKeys[0];
      currentExerciseIndex = 0;
    }

    stageKeys.forEach(sKey => {
      const sData = STAGES_DATABASE[sKey];
      const btn = document.createElement('button');
      btn.className = `category-pill ${sKey === currentStageKey ? 'active' : ''}`;
      btn.textContent = currentTrack === 'ar' ? `المرحلة ${sData.stageNumber}: ${sData.shortTitle}` : `Stage ${sData.stageNumber}: ${sData.shortTitle}`;

      btn.addEventListener('click', () => {
        currentStageKey = sKey;
        currentExerciseIndex = 0;
        renderStagePills();
        loadCurrentStageExercise();
        showToast(currentTrack === 'ar' ? `بدء: ${sData.title}` : `Started: ${sData.title}`);
      });

      stagePillsContainer.appendChild(btn);
    });
  }

  function renderExerciseSubpills() {
    if (!exercisePillsRow) return;
    exercisePillsRow.innerHTML = '';

    const stage = STAGES_DATABASE[currentStageKey];
    if (!stage || !stage.lessons) return;

    stage.lessons.forEach((ex, idx) => {
      const pill = document.createElement('button');
      pill.className = `exercise-subpill ${idx === currentExerciseIndex ? 'active' : ''}`;
      pill.textContent = currentTrack === 'ar' ? `تمرين ${idx + 1}` : `Ex ${idx + 1}`;
      pill.title = ex.title;

      pill.addEventListener('click', () => {
        currentExerciseIndex = idx;
        renderExerciseSubpills();
        loadCurrentStageExercise();
      });

      exercisePillsRow.appendChild(pill);
    });
  }

  function loadCurrentStageExercise() {
    const stage = STAGES_DATABASE[currentStageKey] || STAGES_DATABASE.stage_ar_1;
    const lesson = stage.lessons[currentExerciseIndex % stage.lessons.length];
    if (!lesson) return;

    // Update Stage Header
    if (stageNumBadge) {
      stageNumBadge.textContent = currentTrack === 'ar' ? `المرحلة ${stage.stageNumber} من 6` : `Stage ${stage.stageNumber} of 6`;
    }
    if (stageTitleText) {
      stageTitleText.textContent = `${stage.title} - (${lesson.title})`;
    }
    if (stageTargetTime) {
      stageTargetTime.textContent = `${stage.timeLimitSeconds} ث`;
    }
    if (stageTargetWpm) {
      stageTargetWpm.textContent = `${stage.targetWpm}+ WPM`;
    }
    if (stageTargetAcc) {
      stageTargetAcc.textContent = `${stage.targetAccuracy}%+`;
    }
    if (stageObjectiveDesc) {
      stageObjectiveDesc.innerHTML = `<strong>الهدف التدريبي:</strong> ${stage.objective} <br><span style="font-size:11.5px; color:var(--text-dim);">🎯 التركيز الحركي: ${stage.fingersFocused}</span>`;
    }

    // Set keyboard language
    setKeyboardLanguage(stage.lang);

    // Load lesson in engine
    engine.loadLesson(lesson.text, stage.timeLimitSeconds);
    renderExerciseSubpills();
    renderTextSpans();
    if (textDisplayBox) textDisplayBox.focus();
  }

  // Language Tabs
  if (tabLangAr) {
    tabLangAr.addEventListener('click', () => {
      currentTrack = 'ar';
      tabLangAr.classList.add('active');
      if (tabLangEn) tabLangEn.classList.remove('active');
      currentStageKey = 'stage_ar_1';
      currentExerciseIndex = 0;
      setKeyboardLanguage('ar');
      renderStagePills();
      loadCurrentStageExercise();
      showToast('المسار العربي: 6 مراحل تدريبية 🇸🇦');
    });
  }

  if (tabLangEn) {
    tabLangEn.addEventListener('click', () => {
      currentTrack = 'en';
      tabLangEn.classList.add('active');
      if (tabLangAr) tabLangAr.classList.remove('active');
      currentStageKey = 'stage_en_1';
      currentExerciseIndex = 0;
      setKeyboardLanguage('en');
      renderStagePills();
      loadCurrentStageExercise();
      showToast('English Track: 6 Progressive Stages 🇬🇧');
    });
  }

  // ==========================================================
  // 8. ROADMAP MODAL
  // ==========================================================
  function renderRoadmapList() {
    if (!roadmapStagesList) return;
    roadmapStagesList.innerHTML = '';

    const stageKeys = Object.keys(STAGES_DATABASE).filter(k => STAGES_DATABASE[k].lang === currentTrack);

    stageKeys.forEach(sKey => {
      const s = STAGES_DATABASE[sKey];
      const isCurrent = sKey === currentStageKey;
      const card = document.createElement('div');
      card.className = `roadmap-stage-item ${isCurrent ? 'current' : ''}`;

      card.innerHTML = `
        <div class="roadmap-stage-top">
          <span class="roadmap-stage-badge">المرحلة ${s.stageNumber}</span>
          <span style="font-size:11px; font-weight:700; color:var(--primary);">${s.badge}</span>
        </div>
        <div class="roadmap-stage-title">${s.title}</div>
        <div class="roadmap-stage-metrics">
          <span>⏱️ ${s.timeLimitSeconds} ثانية</span>
          <span>⚡ ${s.targetWpm}+ WPM</span>
          <span>🎯 دقة ${s.targetAccuracy}%</span>
        </div>
        <div class="roadmap-stage-obj">${s.objective}</div>
        <button class="btn-start-stage-roadmap" data-stage="${sKey}">ابدأ هذه المرحلة الآن</button>
      `;

      card.querySelector('.btn-start-stage-roadmap').addEventListener('click', () => {
        currentStageKey = sKey;
        currentExerciseIndex = 0;
        if (modalRoadmap) modalRoadmap.classList.remove('show');
        renderStagePills();
        loadCurrentStageExercise();
        showToast(`بدء: ${s.title}`);
      });

      roadmapStagesList.appendChild(card);
    });
  }

  if (btnOpenRoadmap) {
    btnOpenRoadmap.addEventListener('click', () => {
      renderRoadmapList();
      if (modalRoadmap) modalRoadmap.classList.add('show');
    });
  }

  if (btnCloseRoadmap) {
    btnCloseRoadmap.addEventListener('click', () => {
      if (modalRoadmap) modalRoadmap.classList.remove('show');
    });
  }

  if (modalRoadmap) {
    modalRoadmap.addEventListener('click', (e) => {
      if (e.target === modalRoadmap) modalRoadmap.classList.remove('show');
    });
  }

  // ==========================================================
  // 9. KEYBOARD EVENT LISTENERS
  // ==========================================================
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key === 'F5' || e.key === 'F12' || e.key === 'Tab') return;

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
      loadCurrentStageExercise();
      showToast('تمت إعادة تشغيل المرحلة');
    });
  }

  // Next & Retry Lesson in Modal
  if (btnNextLesson) {
    btnNextLesson.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('show');
      const stage = STAGES_DATABASE[currentStageKey];
      if (stage && currentExerciseIndex < stage.lessons.length - 1) {
        currentExerciseIndex++;
      } else {
        const stageKeys = Object.keys(STAGES_DATABASE).filter(k => STAGES_DATABASE[k].lang === currentTrack);
        const currIdx = stageKeys.indexOf(currentStageKey);
        if (currIdx < stageKeys.length - 1) {
          currentStageKey = stageKeys[currIdx + 1];
          currentExerciseIndex = 0;
          renderStagePills();
        } else {
          currentExerciseIndex = 0;
        }
      }
      loadCurrentStageExercise();
      showToast('الانتقال للتمرين التالي!');
    });
  }

  if (btnRetryLesson) {
    btnRetryLesson.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('show');
      loadCurrentStageExercise();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('show');
    });
  }

  // Virtual key clicks support
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

  // Initial Load
  renderStagePills();
  loadCurrentStageExercise();
  // Set default mode: focus mode
  setTrainingMode('focus');
});
