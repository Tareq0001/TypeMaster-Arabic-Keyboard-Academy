#!/usr/bin/env python3
"""
TypeMaster Academy | Typing Ergonomics & Biometric Analytics Engine
===================================================================
Analyzes typing cadence, inter-keystroke interval (IKI) latency variance,
finger workload distribution, and progressive lesson difficulty index.

Author: Tareq Ali (@Tareq0001)
License: MIT
"""

import math
import sys
import json
from typing import List, Dict, Any, Tuple

class TypingAnalyticsEngine:
    def __init__(self):
        # Estimated finger load distribution for standard Arabic Home-Row typing
        self.finger_weights = {
            "left_pinky":  0.08,
            "left_ring":   0.10,
            "left_middle": 0.14,
            "left_index":  0.18,
            "right_index": 0.20,
            "right_middle":0.14,
            "right_ring":  0.10,
            "right_pinky": 0.06
        }

    def calculate_wpm_and_metrics(self, correct_keystrokes: int, total_keystrokes: int, elapsed_seconds: float) -> Dict[str, Any]:
        """Calculates Net WPM, Raw WPM, Accuracy, and Error Rate."""
        if elapsed_seconds <= 0:
            return {"net_wpm": 0, "raw_wpm": 0, "accuracy_pct": 100.0}

        minutes = elapsed_seconds / 60.0
        # Standard: 5 keystrokes = 1 word
        raw_wpm = round((total_keystrokes / 5.0) / minutes, 1)
        net_wpm = max(0.0, round((correct_keystrokes / 5.0) / minutes, 1))
        accuracy_pct = round((correct_keystrokes / max(1, total_keystrokes)) * 100.0, 2)
        cpm = round(correct_keystrokes / minutes, 1)

        rating = "Novice"
        if net_wpm >= 70: rating = "Grandmaster Typer"
        elif net_wpm >= 50: rating = "Advanced Professional"
        elif net_wpm >= 30: rating = "Intermediate"

        return {
            "net_wpm": net_wpm,
            "raw_wpm": raw_wpm,
            "cpm": cpm,
            "accuracy_pct": accuracy_pct,
            "rating": rating,
            "elapsed_seconds": round(elapsed_seconds, 2)
        }

    def analyze_keystroke_cadence(self, iki_ms_list: List[float]) -> Dict[str, Any]:
        """
        Analyzes Inter-Keystroke Interval (IKI) in milliseconds to determine
        rhythmic consistency and fluency.
        """
        if not iki_ms_list:
            return {}

        n = len(iki_ms_list)
        mean_iki = sum(iki_ms_list) / n
        variance = sum((x - mean_iki) ** 2 for x in iki_ms_list) / max(1, n - 1)
        std_dev = math.sqrt(variance)

        # Coefficient of Variation (CV) < 0.25 indicates elite rhythmic touch typing
        cv = round(std_dev / mean_iki, 3) if mean_iki > 0 else 0.0

        return {
            "mean_keystroke_latency_ms": round(mean_iki, 1),
            "latency_std_dev_ms": round(std_dev, 1),
            "cadence_coefficient_of_variation": cv,
            "typing_flow_grade": "Rhythmic Flow (Master)" if cv < 0.3 else ("Good Rhythm" if cv < 0.5 else "Hesitant / Searching")
        }

    def evaluate_lesson_complexity(self, lesson_text: str) -> Dict[str, Any]:
        """Evaluates complexity based on character transitions and row shifts."""
        total_chars = len(lesson_text)
        words = lesson_text.split()
        avg_word_length = round(total_chars / max(1, len(words)), 1)
        
        # Count non-home-row transitions
        shifts = 0
        for i in range(len(lesson_text) - 1):
            if lesson_text[i] != lesson_text[i+1]:
                shifts += 1

        difficulty_score = min(10.0, round((avg_word_length * 0.8) + (shifts / max(1, total_chars) * 5.0), 1))
        return {
            "total_characters": total_chars,
            "word_count": len(words),
            "average_word_length": avg_word_length,
            "difficulty_score_out_of_10": difficulty_score
        }

if __name__ == '__main__':
    print("==================================================")
    print(" TypeMaster Academy | Biometric Typing Engine")
    print("==================================================")
    engine = TypingAnalyticsEngine()

    # 1. WPM benchmark
    metrics = engine.calculate_wpm_and_metrics(correct_keystrokes=320, total_keystrokes=330, elapsed_seconds=60.0)
    print("\n--- [1] Speed & Accuracy Performance ---")
    print(f"Net WPM:      {metrics['net_wpm']} WPM")
    print(f"Raw WPM:      {metrics['raw_wpm']} WPM")
    print(f"CPM:          {metrics['cpm']} CPM")
    print(f"Accuracy:     {metrics['accuracy_pct']}%")
    print(f"Skill Tier:   {metrics['rating']}")

    # 2. Keystroke Cadence / Latency Analysis
    sample_ikis = [160, 155, 170, 162, 158, 165, 150, 168, 172, 160]
    cadence = engine.analyze_keystroke_cadence(sample_ikis)
    print("\n--- [2] Keystroke Latency & Rhythm (IKI) ---")
    print(f"Mean Latency: {cadence['mean_keystroke_latency_ms']} ms")
    print(f"Std Dev:      {cadence['latency_std_dev_ms']} ms")
    print(f"Cadence CV:   {cadence['cadence_coefficient_of_variation']} ({cadence['typing_flow_grade']})")

    # 3. Lesson Difficulty
    sample_text = "المهارات الرقمية والطباعة السريعة هي بوابة الإبداع والإنتاجية"
    comp = engine.evaluate_lesson_complexity(sample_text)
    print("\n--- [3] Progressive Lesson Complexity ---")
    print(f"Total Chars:      {comp['total_characters']}")
    print(f"Word Count:       {comp['word_count']}")
    print(f"Difficulty Score: {comp['difficulty_score_out_of_10']} / 10")

    print("\n[OK] Typing telemetry calculations completed successfully.\n")
