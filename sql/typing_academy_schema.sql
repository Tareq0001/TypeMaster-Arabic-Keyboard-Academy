-- =====================================================================
-- TypeMaster Academy | Typing Curriculum & Student Progress Schema
-- =====================================================================
-- Architecture: Relational DDL + Student Leaderboard Analytics
-- Engine: PostgreSQL 14+ / SQLite 3.35+
-- Author: Tareq Ali (@Tareq0001)
-- =====================================================================

-- 1. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    grade_level VARCHAR(50) DEFAULT 'المرحلة المتوسطة',
    avatar_color VARCHAR(10) DEFAULT '#4f46e5',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. LESSONS CURRICULUM
CREATE TABLE IF NOT EXISTS typing_lessons (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'home_row_ar', 'all_rows_ar', 'quotes_ar', etc.
    language VARCHAR(10) DEFAULT 'ar',
    text_content TEXT NOT NULL,
    total_characters INT NOT NULL,
    difficulty_level INT DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5)
);

-- 3. TYPING SESSIONS & TELEMETRY
CREATE TABLE IF NOT EXISTS typing_sessions (
    id BIGSERIAL PRIMARY KEY,
    student_id VARCHAR(36) REFERENCES students(id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) REFERENCES typing_lessons(id) ON DELETE CASCADE,
    wpm NUMERIC(5, 1) NOT NULL,
    accuracy_percent NUMERIC(5, 2) NOT NULL,
    total_keystrokes INT NOT NULL,
    error_count INT DEFAULT 0,
    time_taken_seconds NUMERIC(6, 2) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. HIGH SCORE LEADERBOARD
CREATE TABLE IF NOT EXISTS leaderboard (
    id BIGSERIAL PRIMARY KEY,
    student_id VARCHAR(36) REFERENCES students(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    highest_wpm NUMERIC(5, 1) NOT NULL,
    highest_accuracy NUMERIC(5, 2) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ANALYTICAL QUERIES

-- QUERY 1: Top 10 Student Speed Rankings
SELECT 
    s.full_name AS student_name,
    MAX(t.wpm) AS top_wpm,
    ROUND(AVG(t.accuracy_percent), 1) AS avg_accuracy,
    COUNT(t.id) AS completed_lessons_count
FROM typing_sessions t
JOIN students s ON s.id = t.student_id
GROUP BY s.id, s.full_name
ORDER BY top_wpm DESC
LIMIT 10;

-- QUERY 2: Lesson Accuracy Bottleneck Analysis
SELECT 
    l.title AS lesson_title,
    l.category,
    COUNT(t.id) AS attempts,
    ROUND(AVG(t.wpm), 1) AS average_wpm,
    ROUND(AVG(t.accuracy_percent), 2) AS average_accuracy
FROM typing_lessons l
LEFT JOIN typing_sessions t ON t.lesson_id = l.id
GROUP BY l.id, l.title, l.category
ORDER BY average_accuracy ASC;
