/**
 * TypeMaster Academy | Comprehensive Bilingual Lesson Curriculum
 * ===============================================================
 * Categorized progressive typing exercises for Arabic & English.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

const LESSON_DATABASE = {
  // 1. صف الارتكاز العربي (Home Row - ك، م، ن، ت | ب، ي، س، ش)
  home_row_ar: [
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
  ],

  // 2. الصف العلوي والسفلي
  all_rows_ar: [
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
    }
  ],

  // 3. درر وحكم عربية ملهمة
  quotes_ar: [
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
      text: 'من سار على الدرب وصل، والممارسة اليومية تصنع الفارق الكبير بين المبتدئ والمحترف.'
    },
    {
      id: 'ar_quote_3',
      title: 'إتقان العمل',
      desc: 'عبارة تحفيزية عن الدقة والإتقان.',
      text: 'إن الله يحب إذا عمل أحدكم عملا أن يتقنه، والسرعة ثمرة طبيعية للدقة المستمرة.'
    }
  ],

  // 4. English Home Row Mastery
  home_row_en: [
    {
      id: 'en_home_1',
      title: 'English Home Row (ASDF JKL;)',
      desc: 'Master foundational English index and home row keys.',
      text: 'asdf jkl; aadd ssff jjkk ll;; flash salad flask salsa fall'
    },
    {
      id: 'en_home_2',
      title: 'Full Keyboard Reach (QWERTY)',
      desc: 'Connecting top and bottom rows smoothly.',
      text: 'quick brown fox jumps over the lazy dog and types with speed'
    }
  ],

  // 5. Code & Tech Snippets
  tech_code: [
    {
      id: 'tech_1',
      title: 'برمجة الويب (JavaScript Snippet)',
      desc: 'تدريب على الرموز البرمجية والأقواس.',
      text: 'const speed = wpm > 60 ? "Fast Typer" : "Learning"; console.log(speed);'
    },
    {
      id: 'tech_2',
      title: 'أكواد لغة بايثون (Python Functions)',
      desc: 'كتابة الدوال والتعابير المنطقية.',
      text: 'def calculate_accuracy(correct, total): return (correct / total) * 100'
    }
  ]
};
