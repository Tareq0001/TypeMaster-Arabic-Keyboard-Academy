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

  // Soundpack & Metronome Controls
  const btnSoundpackMenu = document.getElementById('btn-soundpack-menu');
  const soundpackDropdown = document.getElementById('soundpack-dropdown');
  const soundpackLabel = document.getElementById('soundpack-label');
  const soundpackIcon = document.getElementById('soundpack-icon');
  const soundpackOpts = document.querySelectorAll('.soundpack-opt');

  const btnMetronome = document.getElementById('btn-metronome');
  const metronomeLabel = document.getElementById('metronome-label');
  const metronomeDot = document.getElementById('metronome-dot');

  // Challenge Preset Buttons
  const challengeTabs = document.querySelectorAll('.btn-challenge-tab');
  let currentChallengeMode = 'curriculum'; // 'curriculum', 'sprint15', 'sprint30', 'sprint60', 'survival'

  // Race Track Elements
  const racePlayerWpm = document.getElementById('race-player-wpm');
  const raceGhostWpm = document.getElementById('race-ghost-wpm');
  const racePlayerBar = document.getElementById('race-player-bar');
  const raceGhostBar = document.getElementById('race-ghost-bar');
  const raceStatusBadge = document.getElementById('race-status-badge');
  const raceStatusText = document.getElementById('race-status-text');

  // Sudden Death Modal Elements
  const modalSuddenDeath = document.getElementById('modal-sudden-death');
  const sdScoreChars = document.getElementById('sd-score-chars');
  const sdScoreWpm = document.getElementById('sd-score-wpm');
  const btnRetrySuddenDeath = document.getElementById('btn-retry-sudden-death');
  const btnExitSuddenDeath = document.getElementById('btn-exit-sudden-death');

  // Certificate Modal Elements
  const btnOpenCert = document.getElementById('btn-open-cert');
  const btnCertFromModal = document.getElementById('btn-cert-from-modal');
  const modalCertificate = document.getElementById('modal-certificate');
  const btnCloseCert = document.getElementById('btn-close-cert');
  const btnPrintCert = document.getElementById('btn-print-cert');
  const certInputName = document.getElementById('cert-input-name');
  const certDisplayName = document.getElementById('cert-display-name');
  const certWpmVal = document.getElementById('cert-wpm-val');
  const certAccVal = document.getElementById('cert-acc-val');
  const certStageVal = document.getElementById('cert-stage-val');
  const certDateVal = document.getElementById('cert-date-val');
  let lastFinishMetrics = null;

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
  // 6. TYPING ENGINE UI INTEGRATION & RACE TRACK TELEMETRY
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

    // 4. Interactive Race Track (Player vs Ghost Pacer)
    if (racePlayerWpm) racePlayerWpm.textContent = `${metrics.wpm} WPM`;
    if (raceGhostWpm) raceGhostWpm.textContent = `${metrics.targetWpm} WPM`;
    if (racePlayerBar) racePlayerBar.style.width = `${metrics.progressPercent}%`;
    if (raceGhostBar) raceGhostBar.style.width = `${metrics.ghostProgressPercent}%`;

    if (raceStatusBadge && raceStatusText) {
      raceStatusBadge.classList.remove('status-leading', 'status-tied', 'status-trailing');
      if (metrics.raceStatus === 'leading') {
        raceStatusBadge.classList.add('status-leading');
        const diff = Math.max(1, metrics.leadDiffWords);
        raceStatusText.textContent = currentTrack === 'ar' ? `⚡ متصدر بفارق +${diff} كلمة عن الهدف!` : `⚡ Leading by +${diff} words!`;
      } else if (metrics.raceStatus === 'trailing') {
        raceStatusBadge.classList.add('status-trailing');
        const diff = Math.abs(metrics.leadDiffWords);
        raceStatusText.textContent = currentTrack === 'ar' ? `⚠️ الهدف يتقدم بفارق ${diff} كلمة! زد سرعتك` : `⚠️ Ghost leads by ${diff} words! Pick up speed`;
      } else {
        raceStatusBadge.classList.add('status-tied');
        if (metrics.progressPercent > 0) {
          raceStatusText.textContent = currentTrack === 'ar' ? `🔥 سباق متقارب جداً!` : `🔥 Neck and neck!`;
        } else {
          raceStatusText.textContent = currentTrack === 'ar' ? `جاهز للانطلاق... اكتب للتقدم` : `Ready to race... Type to start`;
        }
      }
    }

    // 5. Update Weakness Radar Chips
    if (weakKeysContainer) {
      if (metrics.weakKeys && metrics.weakKeys.length > 0) {
        weakKeysContainer.innerHTML = metrics.weakKeys.map(w => 
          `<span class="weakness-chip-tag" title="نسبة الدقة ${w.accuracy}%">${w.char} (${w.accuracy}%)</span>`
        ).join('');
      } else {
        weakKeysContainer.innerHTML = `<span style="font-size:11px; color:var(--emerald); font-weight:700;">✨ أداؤك متزن ودقيق!</span>`;
      }
    }

    // 6. Update Hands SVG (if visible in Full mode)
    updateVisualHands(metrics.finger);

    // 7. Render Word Chunks and Floating Caret
    renderTextSpans();
  };

  const onFinishLesson = (metrics) => {
    lastFinishMetrics = metrics;
    const stage = STAGES_DATABASE[currentStageKey];
    if (modalWpm) modalWpm.textContent = `${metrics.wpm} WPM`;
    if (modalAccuracy) modalAccuracy.textContent = `${metrics.accuracy}%`;
    if (modalElapsedTime) modalElapsedTime.textContent = `${metrics.elapsedSeconds} ث / المستهدف: ${metrics.timeLimitSeconds}ث`;
    if (modalRating) modalRating.textContent = metrics.rating;

    const targetWpm = metrics.targetWpm || (stage ? stage.targetWpm : 25);
    const targetAcc = stage ? stage.targetAccuracy : 90;
    const passWpm = metrics.wpm >= targetWpm;
    const passAcc = metrics.accuracy >= targetAcc;
    let feedback = '';

    if (passWpm && passAcc) {
      feedback = `🌟 إنجاز متميز! حققت معايير المرحلة بنجاح باهر (دقة ${metrics.accuracy}% وسرعة ${metrics.wpm} WPM). حافظت على تركيز عينيك على الكلمات وتفوقت على المتسابق الشبح!`;
    } else if (passAcc) {
      feedback = `👍 دقة أصابعك ممتازة (${metrics.accuracy}%)، ومع تكرار التمرين ستصل لسرعة ${targetWpm} WPM المستهدفة وتتجاوز الشبح بكل سهولة.`;
    } else {
      feedback = `💡 رائع! تذكر أن الشارة العائمة تتبع الحرف دائماً، لا تنظر للأسفل ودع الذاكرة العضلية تتطور طبيعياً.`;
    }

    if (pedagogicalFeedbackBox) pedagogicalFeedbackBox.textContent = feedback;
    if (modalOverlay) modalOverlay.classList.add('show');
  };

  const onSuddenDeathFail = (metrics) => {
    if (sdScoreChars) sdScoreChars.textContent = metrics.correctCount;
    if (sdScoreWpm) sdScoreWpm.textContent = `${metrics.wpm} WPM`;
    if (modalSuddenDeath) modalSuddenDeath.classList.add('show');
    showToast('💀 انتهت المحاولة في نمط البقاء بسبب خطأ واحد!');
  };

  const engine = new TypingEngine(sound, onUpdateUI, onFinishLesson, onSuddenDeathFail);

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

    // Load lesson in engine with target WPM
    engine.loadLesson(lesson.text, stage.timeLimitSeconds, stage.targetWpm, false);
    renderExerciseSubpills();
    renderTextSpans();
    if (textDisplayBox) textDisplayBox.focus();
  }

  // ==========================================================
  // 8. CHALLENGE PRESETS (SPRINTS & SUDDEN DEATH)
  // ==========================================================
  const CHALLENGE_PRESETS = {
    sprint15: {
      titleAr: '⚡ سباق 15 ثانية الخاطف',
      titleEn: '⚡ 15s Rapid Speed Sprint',
      descAr: 'سباق سرعة نفاث لاختبار انسيابية الأصابع وسرعة رد الفعل في 15 ثانية فقط ضد المتسابق الشبح!',
      descEn: 'Rapid speed burst test in 15 seconds against the Ghost Pacer!',
      timeLimit: 15,
      targetWpm: 35,
      textAr: 'الطباعة باللمس مهارة حركية رقمية تبني سرعة الإنجاز ودقة الأداء وثقة الطالب في التعامل مع الحاسب.',
      textEn: 'Touch typing is an essential digital skill that unlocks speed, accuracy, and confidence on any keyboard.'
    },
    sprint30: {
      titleAr: '⚡ سباق 30 ثانية المتقدم',
      titleEn: '⚡ 30s Speed Sprint',
      descAr: 'نصف دقيقة من التركيز المتواصل للوصول لأقصى معدل كلمات بالدقيقة!',
      descEn: '30 seconds of high-velocity typing cadence!',
      timeLimit: 30,
      targetWpm: 40,
      textAr: 'تعد لوحة المفاتيح الأداة الأساسية للإنتاجية الرقمية والتواصل المعرفي الفعال. يحرص الطلاب المتميزون على تدريب أصابعهم العشرة وفق التوزيع الصحيح لضمان انسيابية الكتابة دون النظر.',
      textEn: 'Mastering proper finger placement allows you to type effortlessly without ever glancing down at the keys. Practice daily with rhythm and precision to boost your productivity.'
    },
    sprint60: {
      titleAr: '⚡ سباق 60 ثانية القياسي (Standard 1 Min)',
      titleEn: '⚡ 60s Endurance Typing Race',
      descAr: 'المعيار العالمي لقياس سرعة الطباعة الاحترافية في دقيقة كاملة ضد المتسابق الشبح.',
      descEn: 'The international 60-second typing test benchmark against the Ghost Pacer.',
      timeLimit: 60,
      targetWpm: 45,
      textAr: 'العلم الرقمي نافذة المستقبل، والطباعة السريعة باللمس تختصر الوقت والجهد وتمنحك تركيزاً كاملاً على صياغة الأفكار والإبداع التقني. واصل تدريبك اليومي بثقة وإصرار، واجعل عينيك مثبتتين دائماً على الشاشة لتبني ذاكرة عضلية فائقة تدوم معك طوال مسيرتك التعليمية والمهنية.',
      textEn: 'Modern computing demands fast and accurate keyboard interaction. When your fingers know the home row instinctively, your thoughts flow directly into the computer without friction. Keep your eyes on the monitor, maintain a steady cadence, and watch your typing speed accelerate day after day.'
    },
    survival: {
      titleAr: '💀 نمط البقاء (الموت المفاجئ - صفر أخطاء)',
      titleEn: '💀 Sudden Death Survival Mode',
      descAr: 'تحدي الدقة المطلقة 100%! خطأ واحد في أي حرف يوقف التحدي فوراً؛ اكتب بحذر وتوازن.',
      descEn: 'Absolute 100% precision challenge. A single mistake ends the run immediately!',
      timeLimit: 60,
      targetWpm: 30,
      textAr: 'ثبات الأصابع على صف الارتكاز سر الدقة المتناهية والبراعة والتميز الرقمي المستمر دون خطأ مفرد.',
      textEn: 'Precision without error requires absolute focus and proper hand positioning across every keystroke without mistake.'
    }
  };

  function updateChallengeTabsActive() {
    challengeTabs.forEach(btn => {
      const mode = btn.getAttribute('data-challenge');
      btn.classList.toggle('active', mode === currentChallengeMode);
    });
  }

  function loadChallengePreset(challengeKey) {
    currentChallengeMode = challengeKey;
    updateChallengeTabsActive();

    if (challengeKey === 'curriculum') {
      loadCurrentStageExercise();
      showToast('العودة لمسار المنهج 📚');
      return;
    }

    const preset = CHALLENGE_PRESETS[challengeKey];
    if (!preset) return;

    const isArabic = currentTrack === 'ar';
    const title = isArabic ? preset.titleAr : preset.titleEn;
    const desc = isArabic ? preset.descAr : preset.descEn;
    const text = isArabic ? preset.textAr : preset.textEn;
    const isSuddenDeath = (challengeKey === 'survival');

    if (stageNumBadge) {
      stageNumBadge.textContent = challengeKey === 'survival' ? '💀 تحدي البقاء' : '⚡ سباق سرعة';
    }
    if (stageTitleText) {
      stageTitleText.textContent = title;
    }
    if (stageTargetTime) {
      stageTargetTime.textContent = `${preset.timeLimit} ث`;
    }
    if (stageTargetWpm) {
      stageTargetWpm.textContent = `${preset.targetWpm}+ WPM`;
    }
    if (stageTargetAcc) {
      stageTargetAcc.textContent = isSuddenDeath ? '100% (إلزامي)' : '95%+';
    }
    if (stageObjectiveDesc) {
      stageObjectiveDesc.innerHTML = `<strong>الهدف:</strong> ${desc}`;
    }

    engine.loadLesson(text, preset.timeLimit, preset.targetWpm, isSuddenDeath);
    renderTextSpans();
    if (textDisplayBox) textDisplayBox.focus();

    if (isSuddenDeath) {
      showToast('💀 نمط البقاء: خطأ واحد ينهي الجولة فوراً!');
    } else {
      showToast(`تم بدء: ${title}`);
    }
  }

  challengeTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-challenge');
      loadChallengePreset(mode);
    });
  });

  // Sudden Death Modal Buttons
  if (btnRetrySuddenDeath) {
    btnRetrySuddenDeath.addEventListener('click', () => {
      if (modalSuddenDeath) modalSuddenDeath.classList.remove('show');
      loadChallengePreset('survival');
    });
  }

  if (btnExitSuddenDeath) {
    btnExitSuddenDeath.addEventListener('click', () => {
      if (modalSuddenDeath) modalSuddenDeath.classList.remove('show');
      loadChallengePreset('curriculum');
    });
  }

  if (modalSuddenDeath) {
    modalSuddenDeath.addEventListener('click', (e) => {
      if (e.target === modalSuddenDeath) modalSuddenDeath.classList.remove('show');
    });
  }

  // ==========================================================
  // 9. SOUNDPACK DROPDOWN & METRONOME CONTROLLER
  // ==========================================================
  if (btnSoundpackMenu && soundpackDropdown) {
    btnSoundpackMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      soundpackDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!btnSoundpackMenu.contains(e.target) && !soundpackDropdown.contains(e.target)) {
        soundpackDropdown.classList.remove('show');
      }
    });

    soundpackOpts.forEach(opt => {
      opt.addEventListener('click', () => {
        const pack = opt.getAttribute('data-pack');
        sound.setSoundpack(pack);

        soundpackOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        const labels = {
          cherry: { icon: '🔊', name: 'Cherry MX' },
          typewriter: { icon: '⌨️', name: 'آلة كاتبة' },
          chiclet: { icon: '💻', name: 'أبل ماجيك' },
          bubble: { icon: '🫧', name: 'فقاعات' },
          mute: { icon: '🔇', name: 'صامت' }
        };

        const currentMeta = labels[pack] || labels.cherry;
        if (soundpackIcon) soundpackIcon.textContent = currentMeta.icon;
        if (soundpackLabel) soundpackLabel.textContent = currentMeta.name;
        soundpackDropdown.classList.remove('show');
        showToast(`حزمة الصوت: ${currentMeta.name}`);
        sound.playKeyClick(' ');
      });
    });
  }

  // Metronome Cadence Pacer
  const metronomeSpeeds = [0, 60, 90, 120, 180];
  let currentMetronomeIndex = 0;

  if (btnMetronome) {
    btnMetronome.addEventListener('click', () => {
      currentMetronomeIndex = (currentMetronomeIndex + 1) % metronomeSpeeds.length;
      const bpm = metronomeSpeeds[currentMetronomeIndex];

      sound.setMetronome(bpm, (beatCount, isAccent) => {
        if (!metronomeDot) return;
        metronomeDot.classList.remove('beat-pulse', 'beat-accent');
        void metronomeDot.offsetWidth; // Force reflow
        metronomeDot.classList.add(isAccent ? 'beat-accent' : 'beat-pulse');
        setTimeout(() => {
          if (metronomeDot) metronomeDot.classList.remove('beat-pulse', 'beat-accent');
        }, 110);
      });

      if (bpm === 0) {
        if (metronomeLabel) metronomeLabel.textContent = 'إيقاف';
        btnMetronome.classList.remove('active');
        showToast('تم إيقاف بندول الإيقاع');
      } else {
        const approxWpm = Math.round(bpm / 5);
        if (metronomeLabel) metronomeLabel.textContent = `${bpm} BPM (${approxWpm} WPM)`;
        btnMetronome.classList.add('active');
        showToast(`🎵 الإيقاع الصوتي: ${bpm} نقرة/دقيقة (${approxWpm} WPM)`);
      }
    });
  }

  // ==========================================================
  // 10. OFFICIAL STUDENT CERTIFICATE GENERATOR
  // ==========================================================
  function openCertificateModal() {
    const studentName = certInputName ? certInputName.value.trim() : 'عبدالرحمن طارق ابوعشي';
    if (certDisplayName) certDisplayName.textContent = studentName || 'طالب متميز';

    const stage = STAGES_DATABASE[currentStageKey];
    const metrics = engine.getMetrics();
    const wpm = (lastFinishMetrics && lastFinishMetrics.wpm) ? lastFinishMetrics.wpm : (metrics.wpm > 0 ? metrics.wpm : (stage ? stage.targetWpm : 35));
    const acc = (lastFinishMetrics && lastFinishMetrics.accuracy) ? lastFinishMetrics.accuracy : (metrics.accuracy < 100 ? metrics.accuracy : 98);

    if (certWpmVal) certWpmVal.textContent = `${wpm} WPM`;
    if (certAccVal) certAccVal.textContent = `${acc}%`;
    if (certStageVal) certStageVal.textContent = stage ? `${stage.title}` : 'المسار التدريبي الكامل';

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} م`;
    if (certDateVal) certDateVal.textContent = dateStr;

    if (modalCertificate) modalCertificate.classList.add('show');
  }

  if (btnOpenCert) {
    btnOpenCert.addEventListener('click', openCertificateModal);
  }

  if (btnCertFromModal) {
    btnCertFromModal.addEventListener('click', openCertificateModal);
  }

  if (btnCloseCert) {
    btnCloseCert.addEventListener('click', () => {
      if (modalCertificate) modalCertificate.classList.remove('show');
    });
  }

  if (modalCertificate) {
    modalCertificate.addEventListener('click', (e) => {
      if (e.target === modalCertificate) modalCertificate.classList.remove('show');
    });
  }

  if (certInputName) {
    certInputName.addEventListener('input', () => {
      if (certDisplayName) {
        certDisplayName.textContent = certInputName.value.trim() || 'طالب متميز';
      }
    });
  }

  if (btnPrintCert) {
    btnPrintCert.addEventListener('click', () => {
      window.print();
    });
  }

  // Language Tabs
  if (tabLangAr) {
    tabLangAr.addEventListener('click', () => {
      currentTrack = 'ar';
      tabLangAr.classList.add('active');
      if (tabLangEn) tabLangEn.classList.remove('active');
      currentStageKey = 'stage_ar_1';
      currentExerciseIndex = 0;
      currentChallengeMode = 'curriculum';
      updateChallengeTabsActive();
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
      currentChallengeMode = 'curriculum';
      updateChallengeTabsActive();
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
