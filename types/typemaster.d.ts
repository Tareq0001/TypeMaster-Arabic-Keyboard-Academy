/**
 * TypeMaster Academy | Touch Typing & Keyboard Speed - TypeScript Definitions
 * ============================================================================
 * Type contracts for typing engine, lessons, biometrics, and virtual keyboard.
 * 
 * Author: Tareq Ali (@Tareq0001)
 */

export type LanguageMode = 'ar' | 'en';
export type FingerType = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
export type HandSide = 'left' | 'right';
export type TypingRating = 'مبتدئ' | 'متوسط ومتقدم' | 'محترف' | 'طابع نفاث (خبير)';

export interface TypingMetrics {
  wpm: number;
  cpm: number;
  accuracy: number;
  elapsedSeconds: number;
  correctCount: number;
  incorrectCount: number;
  totalKeystrokes: number;
  currentIndex: number;
  totalChars: number;
  rating: TypingRating;
  isFinished: boolean;
}

export interface LessonItem {
  id: string;
  title: string;
  desc: string;
  text: string;
  difficulty?: number;
}

export interface KeyCapDefinition {
  code: string;
  arabicLabel: string;
  englishLabel: string;
  finger: FingerType;
  hand: HandSide;
  hasTactileBump?: boolean;
}

export interface StudentScoreCertificate {
  studentName: string;
  lessonId: string;
  wpm: number;
  accuracyPercent: number;
  totalTimeSeconds: number;
  awardedBadge: string;
  completedAt: string;
}
