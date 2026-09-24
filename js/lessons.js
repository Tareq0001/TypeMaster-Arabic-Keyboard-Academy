/**
 * TypeMaster Academy | Comprehensive Pedagogical Curriculum & Stages
 * ===================================================================
 * Multi-Stage Developmental Training Plan for Arabic & English Typing.
 * Each stage features:
 * - Stage number & title
 * - Pedagogical objective
 * - Time limit (countdown challenge)
 * - Target Speed (WPM) & Target Accuracy (%)
 * - Focused progressive exercises
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

const STAGES_DATABASE = {
  // ================================================================
  // المسار التعليمي العربي (6 مراحل تطويرية تدريجية)
  // ================================================================
  stage_ar_1: {
    id: 'stage_ar_1',
    lang: 'ar',
    stageNumber: 1,
    title: 'المرحلة 1: تثبيت صف الارتكاز (Home Row)',
    shortTitle: 'صف الارتكاز',
    badge: 'الأساس المتين',
    objective: 'تثبيت السبابتين على نتوءي (ت) و (ب)، وطباعة الحروف المحورية (ك، م، ن، ت | ب، ي، س، ش) دون النظر للوحة.',
    timeLimitSeconds: 60,
    targetWpm: 15,
    targetAccuracy: 95,
    fingersFocused: 'السبابة، الوسطى، البنصر، الخنصر (اليدين)',
    lessons: [
      {
        id: 'ar_1_1',
        title: 'اليد اليمنى (ت ن م ك)',
        desc: 'تمركز أصابع اليد اليمنى على الحروف المحورية والضغط الخفيف.',
        text: 'تنتن كمنم تتنن ممكك تكمن نتك نمك تمن تكن كمنت تمكن'
      },
      {
        id: 'ar_1_2',
        title: 'اليد اليسرى (ب ي س ش)',
        desc: 'تمركز أصابع اليد اليسرى والضغط بالسبابة على نتوء (ب).',
        text: 'ببيس شيب سيب يشب شبي بشير سبب يابس بيش شبيس سبيب'
      },
      {
        id: 'ar_1_3',
        title: 'التناوب الشامل بين اليدين',
        desc: 'تناوب انسيابي بين أصابع اليدين لتوليد كلمات ذات معنى.',
        text: 'كتب يكتب مسكت تمسك بيت نسيم شباب شبكة تمكين تسكين مسك كسب'
      }
    ]
  },

  stage_ar_2: {
    id: 'stage_ar_2',
    lang: 'ar',
    stageNumber: 2,
    title: 'المرحلة 2: الصعود للصف العلوي (Top Row Reach)',
    shortTitle: 'الصف العلوي',
    badge: 'مرونة الحركة',
    objective: 'مد أصابع اليدين للأعلى للوصول إلى (ق، ف، غ، ع، هـ، خ، ح، ج) والرجوع المباشر لصف الارتكاز.',
    timeLimitSeconds: 90,
    targetWpm: 22,
    targetAccuracy: 92,
    fingersFocused: 'السبابة والوسطى للأعلى مع ثبات المعصم',
    lessons: [
      {
        id: 'ar_2_1',
        title: 'أحرف السبابتين والوسطى (ق، ف، غ، ع)',
        desc: 'مد السبابة والوسطى للأعلى بسلاسة دون تحريك المعصم.',
        text: 'قلم فكر غيمة علم غفور فتى عالي قادم عفريت فقير عظيم'
      },
      {
        id: 'ar_2_2',
        title: 'أحرف البنصر والخنصر (هـ، خ، ح، ج، د)',
        desc: 'وصول أصابع البنصر والخنصر لأطراف الصف العلوي.',
        text: 'هدى خير حلم جمال حكمة قمة فخر عزم هدف حديد جوهر'
      },
      {
        id: 'ar_2_3',
        title: 'كلمات مدمجة (الارتكاز + العلوي)',
        desc: 'تطبيق عملي سريع يربط أحرف صف الارتكاز بالصف العلوي.',
        text: 'تفوق فكرك يفتح لك آفاق المعرفة ويثمر في عملك خيرا كبيرا'
      }
    ]
  },

  stage_ar_3: {
    id: 'stage_ar_3',
    lang: 'ar',
    stageNumber: 3,
    title: 'المرحلة 3: إتقان الصف السفلي (Bottom Row Shift)',
    shortTitle: 'الصف السفلي',
    badge: 'التحكم الشامل',
    objective: 'انزلاق الأصابع للأسفل للوصول إلى (ئ، ء، ؤ، ر، لا، ى، ة، و، ز، ظ) مع المحافظة على وضعية الاسترخاء.',
    timeLimitSeconds: 90,
    targetWpm: 26,
    targetAccuracy: 92,
    fingersFocused: 'حركة انزلاق الأصابع نحو الأسفل',
    lessons: [
      {
        id: 'ar_3_1',
        title: 'أحرف السبابتين والوسطى السفلية (ر، لا، ى، ة، و)',
        desc: 'النزول بالسبابة والوسطى للأحرف السفلية الشائعة.',
        text: 'رؤية ورقة زهرة وطن واحة فوز رائد رمز قرار زاد رزق نداء'
      },
      {
        id: 'ar_3_2',
        title: 'الهمزات وأطراف الصف السفلي (ئ، ء، ؤ، ظ)',
        desc: 'الضغط بالخنصر والبنصر على الهمزات المختلفة وظاء.',
        text: 'سؤال رئيسي مؤمن فؤاد ظبي ظهر ظل رائع مسؤول جزاء بناء'
      },
      {
        id: 'ar_3_3',
        title: 'تناغم الصفوف الثلاثة كاملة',
        desc: 'تحرك الأصابع بحرية بين الصف العلوي والارتكاز والسفلي.',
        text: 'طريق النجاح يبدأ بخطوة واثقة والهمة العالية تصنع المستحيل في كل ميدان'
      }
    ]
  },

  stage_ar_4: {
    id: 'stage_ar_4',
    lang: 'ar',
    stageNumber: 4,
    title: 'المرحلة 4: الأرقام والرموز وعلامات الترقيم',
    shortTitle: 'الأرقام والرموز',
    badge: 'الدقة المتقدمة',
    objective: 'الوصول لصف الأرقام العربي/اللاتيني وعلامات الترقيم (الأقواس، الفواصل، النقاط، علامات الاستفهام).',
    timeLimitSeconds: 120,
    targetWpm: 25,
    targetAccuracy: 90,
    fingersFocused: 'مد الخناصر والسبابات لصف الأرقام والرموز',
    lessons: [
      {
        id: 'ar_4_1',
        title: 'صف الأرقام مع مسافات فاصلة',
        desc: 'تدريب الذاكرة المكانية على الأرقام بالتناوب بين اليدين.',
        text: '١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠ ١٢٣ ٤٥٦ ٧٨٩ ٠٩٨ ٧٦٥ ٤٣٢ ١٠٠'
      },
      {
        id: 'ar_4_2',
        title: 'علامات الترقيم والأقواس في الجمل',
        desc: 'استخدام الفواصل والنقاط والأقواس في سياق نصوص ذات معنى.',
        text: 'العلم نور، والجهل ظلام؛ هل تعلم أن الممارسة اليومية تزيد سرعتك بنسبة ٥٠%؟'
      }
    ]
  },

  stage_ar_5: {
    id: 'stage_ar_5',
    lang: 'ar',
    stageNumber: 5,
    title: 'المرحلة 5: سباق الكلمات الشائعة وبناء الإيقاع',
    shortTitle: 'بناء الإيقاع والسرعة',
    badge: 'السرعة والتدفق',
    objective: 'كتابة الكلمات العربية الأكثر تكراراً واستخداماً بإيقاع صوتي متوازن وسرعة تتجاوز 35 كلمة بالدقيقة.',
    timeLimitSeconds: 120,
    targetWpm: 35,
    targetAccuracy: 95,
    fingersFocused: 'تناوب سريع ومتزامن بين الأصابع العشرة',
    lessons: [
      {
        id: 'ar_5_1',
        title: 'الكلمات الأكثر شيوعاً في العربية',
        desc: 'طباعة فورية دون توقف للكلمات الرابطة والأساسية.',
        text: 'في على من إلى هذا التي الذي كان وقال وهو وفيها وعن مع ذلك كل يوم'
      },
      {
        id: 'ar_5_2',
        title: 'جمل قصيرة متدفقة',
        desc: 'بناء تدفق كتابي متصل وسريع يحاكي النقر الآلي.',
        text: 'العمل المستمر يثمر الإبداع والتطور التقني يصنع مستقبلا مشرقا لكل الأجيال'
      }
    ]
  },

  stage_ar_6: {
    id: 'stage_ar_6',
    lang: 'ar',
    stageNumber: 6,
    title: 'المرحلة 6: الاحتراف والنصوص المتكاملة (Mastery)',
    shortTitle: 'الاحتراف النهائي',
    badge: 'خبير الطباعة',
    objective: 'كتابة نصوص أدبية ومعرفية طويلة ومسترسلة بسرعة واثقة تتجاوز 45 كلمة بالدقيقة مع دقة تفوق 97%.',
    timeLimitSeconds: 180,
    targetWpm: 45,
    targetAccuracy: 97,
    fingersFocused: 'الطباعة باللمس الغريزية دون أدنى تفكير بمكان المفتاح',
    lessons: [
      {
        id: 'ar_6_1',
        title: 'المهارات الرقمية ورؤية المستقبل',
        desc: 'نص متكامل يجمع بين الطلاقة والمصطلحات التقنية الراقية.',
        text: 'المهارات الرقمية والطباعة السريعة باللمس هي لغة الإنتاجية في العصر الحديث، ومن يتقن التفاعل مع لوحة المفاتيح بمرونة يختصر وقته ويضاعف أثره المعرفي.'
      },
      {
        id: 'ar_6_2',
        title: 'حكمة الإتقان والممارسة المستمرة',
        desc: 'نص إلهامي ختامي يختبر الصمود والسرعة العالية المتواصلة.',
        text: 'إن الله يحب إذا عمل أحدكم عملا أن يتقنه، والسرعة ثمرة طبيعية للدقة المستمرة؛ فمن حافظ على عادات التدريب اليومية ارتقى سلم المهارة وبلغ قمة الاحتراف.'
      }
    ]
  },

  // ================================================================
  // المسار التعليمي الإنجليزي (6 Progressive Stages)
  // ================================================================
  stage_en_1: {
    id: 'stage_en_1',
    lang: 'en',
    stageNumber: 1,
    title: 'Stage 1: Home Row Anchor (ASDF JKL;)',
    shortTitle: 'Home Row Anchor',
    badge: 'Foundation',
    objective: 'Lock your index fingers on the F and J bumps. Train pinky to index fingers across the home row.',
    timeLimitSeconds: 60,
    targetWpm: 15,
    targetAccuracy: 95,
    fingersFocused: 'Left Hand (A-S-D-F) & Right Hand (J-K-L-;)',
    lessons: [
      {
        id: 'en_1_1',
        title: 'Foundational Key Drills',
        desc: 'Alternate index and middle fingers on home row keys.',
        text: 'asdf jkl; aadd ssff jjkk ll;; flash salad flask salsa fall'
      },
      {
        id: 'en_1_2',
        title: 'Fluid Home Row Words',
        desc: 'Combine home row letters into complete natural words.',
        text: 'ask dad a salad add flash fall glad alfalfa dash salads shall'
      }
    ]
  },

  stage_en_2: {
    id: 'stage_en_2',
    lang: 'en',
    stageNumber: 2,
    title: 'Stage 2: Top Row Expansion (QWERTYUIOP)',
    shortTitle: 'Top Row Reach',
    badge: 'Reach & Agility',
    objective: 'Reach upward smoothly from home row keys to the QWERTY row and return immediately.',
    timeLimitSeconds: 90,
    targetWpm: 22,
    targetAccuracy: 92,
    fingersFocused: 'Index, Middle, Ring & Pinky upward reaches',
    lessons: [
      {
        id: 'en_2_1',
        title: 'Index & Middle Upward Reach (R-T-Y-U-E-I)',
        desc: 'Reaching the central upper keys with index and middle fingers.',
        text: 'try true tree your unit wire tire pure write quit quite trip'
      },
      {
        id: 'en_2_2',
        title: 'Full Top Row Integration',
        desc: 'Connecting top row reaches with home row stability.',
        text: 'the quick brown fox jumps over the lazy dog and types with speed'
      }
    ]
  },

  stage_en_3: {
    id: 'stage_en_3',
    lang: 'en',
    stageNumber: 3,
    title: 'Stage 3: Bottom Row Shift (ZXCVBNM,./)',
    shortTitle: 'Bottom Row Shift',
    badge: 'Precision Drop',
    objective: 'Slide fingers downward smoothly to hit bottom row keys without twisting your wrists.',
    timeLimitSeconds: 90,
    targetWpm: 26,
    targetAccuracy: 92,
    fingersFocused: 'Index and middle fingers downward glide',
    lessons: [
      {
        id: 'en_3_1',
        title: 'Central Bottom Keys (V-B-N-M-C)',
        desc: 'Sliding index and middle fingers to bottom row characters.',
        text: 'van ban man can vim zoom move born verb comb cave cab vane'
      },
      {
        id: 'en_3_2',
        title: 'Pangram Across All Three Rows',
        desc: 'Exercises covering every single letter of the English alphabet.',
        text: 'pack my box with five dozen liquor jugs for the grand typing challenge'
      }
    ]
  },

  stage_en_4: {
    id: 'stage_en_4',
    lang: 'en',
    stageNumber: 4,
    title: 'Stage 4: Numbers, Quotes & Punctuation',
    shortTitle: 'Numbers & Symbols',
    badge: 'Advanced Precision',
    objective: 'Reach number rows (0-9) and master punctuation marks (commas, periods, colons, quotes).',
    timeLimitSeconds: 120,
    targetWpm: 25,
    targetAccuracy: 90,
    fingersFocused: 'Pinky and index reach to top number row',
    lessons: [
      {
        id: 'en_4_1',
        title: 'Number Row Fluency',
        desc: 'Train muscle memory for numbers combined with space.',
        text: '1 2 3 4 5 6 7 8 9 0 100 250 480 750 999 2026'
      },
      {
        id: 'en_4_2',
        title: 'Quotes and Punctuation Drills',
        desc: 'Type quotes, semicolons, and commas within sentences.',
        text: 'Practice makes permanent; only perfect practice makes perfect! Are you ready?'
      }
    ]
  },

  stage_en_5: {
    id: 'stage_en_5',
    lang: 'en',
    stageNumber: 5,
    title: 'Stage 5: Speed Drills & High-Frequency Flow',
    shortTitle: 'Cadence & Flow',
    badge: 'High Cadence',
    objective: 'Build steady typing cadence on the top 100 most frequent English words with zero pauses.',
    timeLimitSeconds: 120,
    targetWpm: 35,
    targetAccuracy: 95,
    fingersFocused: 'Coordinated 10-finger rapid alternation',
    lessons: [
      {
        id: 'en_5_1',
        title: 'High-Frequency Common Words',
        desc: 'Build burst speed without looking down at the keyboard.',
        text: 'that with have this from they will would there their about which could make'
      },
      {
        id: 'en_5_2',
        title: 'Rhythmic Sentence Cadence',
        desc: 'Maintaining consistent inter-keystroke intervals.',
        text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'
      }
    ]
  },

  stage_en_6: {
    id: 'stage_en_6',
    lang: 'en',
    stageNumber: 6,
    title: 'Stage 6: Code Syntax & Tech Snippets (Mastery)',
    shortTitle: 'Tech & Code Mastery',
    badge: 'Code Master',
    objective: 'Type modern code constructs, brackets, symbols, and functions at professional software engineer speed.',
    timeLimitSeconds: 180,
    targetWpm: 40,
    targetAccuracy: 96,
    fingersFocused: 'Full tactile typing mastery across letters and symbols',
    lessons: [
      {
        id: 'en_6_1',
        title: 'JavaScript Modern Syntax',
        desc: 'Practice brackets, arrow functions, and punctuation.',
        text: 'const speed = wpm > 60 ? "Fast Typer" : "Learning"; console.log(speed);'
      },
      {
        id: 'en_6_2',
        title: 'Python Functions & Algorithms',
        desc: 'Clean code indentation and function definitions.',
        text: 'def calculate_accuracy(correct, total): return (correct / total) * 100'
      }
    ]
  }
};
