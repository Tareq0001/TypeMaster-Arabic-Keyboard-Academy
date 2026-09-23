/**
 * TypeMaster Academy | Comprehensive Bilingual Lesson Curriculum
 * ===============================================================
 * Categorized progressive typing exercises for Arabic & English.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

const LESSON_DATABASE = {
  // 1. صف الارتكاز العربي (Home Row - ك، م، ن، ت | ب، ي، س، ش)
  home_row_ar: {
    lang: 'ar',
    title: 'صف الارتكاز (عربي)',
    lessons: [
      {
        id: 'ar_home_1',
        title: 'صف الارتكاز الأساسي (ت ن م ك)',
        desc: 'تدريب أصابع اليد اليمنى على الحروف المحورية.',
        text: 'تنتن كمنم تتنن ممكك تكمن نتك نمك تمن تكن كمنت تمكن'
      },
      {
        id: 'ar_home_2',
        title: 'صف الارتكاز لليد اليسرى (ب ي س ش)',
        desc: 'تدريب أصابع اليد اليسرى على الحروف المحورية.',
        text: 'ببيس شيب سيب يشب شبي بشير سبب يابس بيش شبيس سبيب'
      },
      {
        id: 'ar_home_3',
        title: 'دمج صف الارتكاز كاملاً (اليدين معاً)',
        desc: 'التناوب بين اليدين لتوليد كلمات متكاملة دون النظر إلى اللوحة.',
        text: 'كتب يكتب مسكت تمسك بيت نسيم شباب شبكة تمكين تسكين مسك كسب'
      }
    ]
  },

  // 2. جميع الصفوف العربية
  all_rows_ar: {
    lang: 'ar',
    title: 'كل الصفوف (عربي)',
    lessons: [
      {
        id: 'ar_rows_1',
        title: 'الصف العلوي (ق، ف، غ، ع، هـ، خ، ح، ج)',
        desc: 'مد أصابع السبابة والوسطى نحو الصف العلوي بمرونة.',
        text: 'قلم فكر غيمة علم هدى خير حلم جمال حكمة قمة فخر عزم هدف'
      },
      {
        id: 'ar_rows_2',
        title: 'الصف السفلي (ئ، ء، ؤ، ر، لا، ى، ة، و، ز، ظ)',
        desc: 'تحريك الأصابع نحو الصف السفلي بدقة وثبات.',
        text: 'رؤية ورقة زهرة وطن واحة فوز رائد رمز قرار زاد رزق نداء'
      },
      {
        id: 'ar_rows_3',
        title: 'توليفة الحروف الكاملة',
        desc: 'تطبيق عملي يجمع الحروف العربية من مختلف الصفوف.',
        text: 'طريق النجاح يبدأ بخطوة واثقة والهمة العالية تصنع المستحيل'
      }
    ]
  },

  // 3. درر وحكم عربية ملهمة
  quotes_ar: {
    lang: 'ar',
    title: 'حكم ودرر ملهمة',
    lessons: [
      {
        id: 'ar_quote_1',
        title: 'قيمة المهارة الرقمية',
        desc: 'اقتباس عن التطور التكنولوجي والإتقان.',
        text: 'المهارات الرقمية والطباعة السريعة هي بوابة الإبداع والإنتاجية في العصر المعرفي الحديث.'
      },
      {
        id: 'ar_quote_2',
        title: 'حكمة عن التعلم المستمر',
        desc: 'حكمة تعليمية ملهمة.',
        text: 'من سار على الدرب وصل والممارسة اليومية تصنع الفارق الكبير بين المبتدئ والمحترف.'
      },
      {
        id: 'ar_quote_3',
        title: 'إتقان العمل',
        desc: 'عبارة تحفيزية عن الدقة والإتقان.',
        text: 'إن الله يحب إذا عمل أحدكم عملا أن يتقنه والسرعة ثمرة طبيعية للدقة المستمرة.'
      }
    ]
  },

  // 4. English Home Row Mastery
  home_row_en: {
    lang: 'en',
    title: 'English Home Row',
    lessons: [
      {
        id: 'en_home_1',
        title: 'Foundation Keys (ASDF JKL;)',
        desc: 'Master foundational English index and home row keys.',
        text: 'asdf jkl; aadd ssff jjkk ll;; flash salad flask salsa fall'
      },
      {
        id: 'en_home_2',
        title: 'Home Row Word Combos',
        desc: 'Fluid transitions between left and right hands.',
        text: 'ask dad a salad add flash fall glad alfalfa dash salads shall'
      }
    ]
  },

  // 5. English All Rows & Reach
  all_rows_en: {
    lang: 'en',
    title: 'All Rows (QWERTY)',
    lessons: [
      {
        id: 'en_rows_1',
        title: 'Top & Bottom Row Integration',
        desc: 'Reaching QWERTY top keys and ZXCV bottom row.',
        text: 'the quick brown fox jumps over the lazy dog and types with speed'
      },
      {
        id: 'en_rows_2',
        title: 'Speed & Rhythm Practice',
        desc: 'Building consistent cadence across the entire keyboard.',
        text: 'pack my box with five dozen liquor jugs for the grand typing challenge'
      }
    ]
  },

  // 6. Inspiring English Quotes
  quotes_en: {
    lang: 'en',
    title: 'Quotes & Wisdom',
    lessons: [
      {
        id: 'en_quote_1',
        title: 'Continuous Practice',
        desc: 'Wisdom on practice and excellence.',
        text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'
      },
      {
        id: 'en_quote_2',
        title: 'Technology & Creativity',
        desc: 'Inspirational tech quote.',
        text: 'Technology is best when it brings people together and unleashes human potential.'
      }
    ]
  },

  // 7. Tech & Code Snippets
  tech_code: {
    lang: 'en',
    title: 'Coding & Syntax',
    lessons: [
      {
        id: 'tech_1',
        title: 'JavaScript Modern Syntax',
        desc: 'Practice brackets, arrow functions, and punctuation.',
        text: 'const speed = wpm > 60 ? "Fast Typer" : "Learning"; console.log(speed);'
      },
      {
        id: 'tech_2',
        title: 'Python Functions',
        desc: 'Clean code indentation and function definitions.',
        text: 'def calculate_accuracy(correct, total): return (correct / total) * 100'
      },
      {
        id: 'tech_3',
        title: 'HTML & CSS Elements',
        desc: 'Tag syntax, attributes, and CSS properties.',
        text: '<div class="keyboard-cap" data-key="enter">Touch Typing</div>'
      }
    ]
  }
};
