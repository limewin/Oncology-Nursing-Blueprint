import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  RotateCcw,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { LifetimeStats, DailyStudyLog } from '../types';

interface DashboardTabProps {
  lifetimeStats: LifetimeStats;
  onNavigateToNotes: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  lifetimeStats,
  onNavigateToNotes,
}) => {
  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    today.toISOString().split('T')[0]
  );
  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyStudyLog>>({});

  // SVG ring animated progress state (0% -> actual on load)
  const [animatedDailyAcc, setAnimatedDailyAcc] = useState<number>(0);
  const [animatedLifetimeAcc, setAnimatedLifetimeAcc] = useState<number>(0);

  useEffect(() => {
    // Load logs from localStorage or initialize empty dynamic store
    const storedLogs = localStorage.getItem('oncology_study_daily_logs');
    if (storedLogs) {
      try {
        setDailyLogs(JSON.parse(storedLogs));
      } catch {
        setDailyLogs({});
      }
    }

    // Trigger ring animations
    const timer = setTimeout(() => {
      // Calculate today's accuracy from real logs if available, else 0
      const todayLog = storedLogs ? JSON.parse(storedLogs)[selectedDateStr] : null;
      const targetDaily = todayLog?.accuracy || 0;
      const targetLifetime = lifetimeStats.lifetimeAccuracy || 0;

      setAnimatedDailyAcc(targetDaily);
      setAnimatedLifetimeAcc(targetLifetime);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedDateStr, lifetimeStats]);

  const handleBackToToday = () => {
    const todayStr = today.toISOString().split('T')[0];
    setSelectedDateStr(todayStr);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Calendar generation logic
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const selectedLog = dailyLogs[selectedDateStr];

  // SVG Circular Ring calculation
  const ringRadius = 54;
  const ringCircumference = 2 * Math.PI * ringRadius;

  const getStrokeDashoffset = (percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent));
    return ringCircumference - (clamped / 100) * ringCircumference;
  };

  return (
    <div id="tab-1-dashboard" className="w-full space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
              Real-Time Study Telemetry
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
            Clinical Dashboard & Analytics
          </h2>
          <p className="text-sm text-[var(--subtle)] mt-1">
            Track daily study cadence, review topic mastery, and monitor readiness for Part 2 Test Bank scoring.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToNotes}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
          style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
        >
          <BookOpen className="w-4 h-4" />
          <span>Resume Curriculum Review</span>
        </button>
      </div>

      {/* Daily Goal Telemetry Box (Geometric Callout Pattern) */}
      <div
        className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          background: 'rgba(236, 91, 56, 0.08)',
          border: '1px solid rgba(236, 91, 56, 0.2)',
        }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold text-base tracking-wide" style={{ color: 'var(--accent)' }}>
              DAILY CLINICAL GOAL
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(236, 91, 56, 0.15)', color: 'var(--accent)' }}
            >
              85% Target Pace
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-85 text-[var(--text-main)] mb-3">
            Review 5 critical pathophysiology topics, assess tumor markers, and verify diagnostic staging criteria.
          </p>
          <div className="w-full max-w-md bg-black/10 h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: '75%', backgroundColor: 'var(--accent)' }}
            />
          </div>
        </div>
        <div className="text-right sm:self-center">
          <span className="text-2xl font-black text-[var(--text-main)] block">4 / 5</span>
          <span className="text-[11px] text-[var(--subtle)] font-medium">Modules Completed</span>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated Rings Card */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
              <Target className="w-4 h-4 text-[var(--accent)]" />
              <span>Animated Accuracy Rings</span>
            </h3>
            <span className="text-xs text-[var(--subtle)] font-medium">Geometric Telemetry</span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Daily Accuracy Ring */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
                  <circle
                    cx="65"
                    cy="65"
                    r={ringRadius}
                    fill="transparent"
                    stroke="rgba(0, 0, 0, 0.05)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r={ringRadius}
                    fill="transparent"
                    stroke="var(--accent)"
                    strokeWidth="10"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={getStrokeDashoffset(animatedDailyAcc)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                    {Math.round(animatedDailyAcc)}%
                  </span>
                  <span className="text-[10px] text-[var(--subtle)] uppercase font-bold opacity-75">Today</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[var(--text-main)] mt-3">Daily Accuracy</span>
              <span className="text-[11px] text-[var(--subtle)]">
                {selectedLog ? `${selectedLog.questionsAnswered} items logged` : 'Active session'}
              </span>
            </div>

            {/* Lifetime Accuracy Ring */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
                  <circle
                    cx="65"
                    cy="65"
                    r={ringRadius}
                    fill="transparent"
                    stroke="rgba(0, 0, 0, 0.05)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r={ringRadius}
                    fill="transparent"
                    stroke="var(--secondary, #A8A492)"
                    strokeWidth="10"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={getStrokeDashoffset(animatedLifetimeAcc)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                    {Math.round(animatedLifetimeAcc)}%
                  </span>
                  <span className="text-[10px] text-[var(--subtle)] uppercase font-bold opacity-75">Overall</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[var(--text-main)] mt-3">Lifetime Accuracy</span>
              <span className="text-[11px] text-[var(--subtle)]">
                {lifetimeStats.totalQuestions} Questions Done
              </span>
            </div>
          </div>

          {/* Geometric Ring Legend */}
          <div className="flex items-center justify-center space-x-4 pt-3 border-t border-black/5 text-xs font-medium">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EC5B38' }} />
              <span className="text-[11px] text-[var(--subtle)]">Daily Acc</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#A8A492' }} />
              <span className="text-[11px] text-[var(--subtle)]">Lifetime</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#524646' }} />
              <span className="text-[11px] text-[var(--subtle)]">Telemetry</span>
            </div>
          </div>
        </div>

        {/* Lifetime Analytics Widget */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--accent)]" />
                <span>Lifetime Clinical Analytics</span>
              </h3>
              <span
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Part 1 Foundation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                <span className="text-xs text-[var(--subtle)] block">Total Questions</span>
                <span className="text-2xl font-black text-[var(--text-main)]">
                  {lifetimeStats.totalQuestions}
                </span>
                <span className="text-[10px] text-[var(--subtle)] block mt-0.5">Scored sessions</span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                <span className="text-xs text-[var(--subtle)] block">Correct Ratio</span>
                <span className="text-2xl font-black text-[var(--accent)]">
                  {lifetimeStats.correctAnswers} / {lifetimeStats.totalQuestions}
                </span>
                <span className="text-[10px] text-[var(--subtle)] block mt-0.5">Validated rationales</span>
              </div>
            </div>

            {/* True Strengths */}
            <div className="mb-4">
              <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Identified Clinical Strengths</span>
              </span>
              <div className="space-y-1.5">
                {lifetimeStats.strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-[var(--text-main)] font-medium"
                  >
                    {str}
                  </div>
                ))}
              </div>
            </div>

            {/* True Weaknesses */}
            <div>
              <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Target High-Yield Focus Areas</span>
              </span>
              <div className="space-y-1.5">
                {lifetimeStats.weaknesses.map((wk, idx) => (
                  <div
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-[var(--text-main)] font-medium"
                  >
                    {wk}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--subtle)]">
            Persistent analytics will automatically link to Tab 6’s 50-Question Test Bank in Part 2.
          </div>
        </div>

        {/* Study Calendar & Daily Log Filter */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[var(--accent)]" />
                <span>Study Calendar</span>
              </h3>
              <button
                type="button"
                id="btn-back-to-today"
                onClick={handleBackToToday}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-[var(--border-color)] hover:bg-[var(--border-color)] text-[var(--text-main)] transition-colors"
                title="Reset to Current Date"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Back to Today</span>
              </button>
            </div>

            {/* Month Navigator */}
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-color)] mb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-md hover:bg-[var(--border-color)] text-[var(--text-main)]"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-[var(--text-main)]">
                {monthNames[month]} {year}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-md hover:bg-[var(--border-color)] text-[var(--text-main)]"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[var(--subtle)] mb-1">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="p-1.5 opacity-0 pointer-events-none" />
              ))}

              {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const isToday =
                  today.getFullYear() === year &&
                  today.getMonth() === month &&
                  today.getDate() === dayNum;
                const isSelected = selectedDateStr === dateStr;
                const hasLog = Boolean(dailyLogs[dateStr]);

                return (
                  <button
                    key={`day-${dayNum}`}
                    type="button"
                    onClick={() => setSelectedDateStr(dateStr)}
                    className={`relative p-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'text-white font-extrabold shadow-xs scale-105'
                        : isToday
                        ? 'ring-2 ring-[var(--accent)] text-[var(--text-main)] bg-[var(--border-color)]/40 font-bold'
                        : 'hover:bg-black/5 text-[var(--text-main)]'
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                        : {}
                    }
                  >
                    <span>{dayNum}</span>
                    {hasLog && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Daily Log Output (No hardcoded dummy data) */}
          <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[var(--text-main)]">Daily Log: {selectedDateStr}</span>
              <span className="text-[10px] text-[var(--subtle)]">Filtered by Selection</span>
            </div>

            {selectedLog ? (
              <div className="text-xs space-y-1 p-2 rounded-lg bg-[var(--border-color)]/20">
                <div className="flex justify-between">
                  <span className="text-[var(--subtle)]">Questions Solved:</span>
                  <span className="font-bold text-[var(--text-main)]">{selectedLog.questionsAnswered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--subtle)]">Calculated Accuracy:</span>
                  <span className="font-bold text-[var(--accent)]">{selectedLog.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--subtle)]">Time Spent:</span>
                  <span className="font-bold text-[var(--text-main)]">{selectedLog.timeSpentMinutes} mins</span>
                </div>
              </div>
            ) : (
              <div className="p-3 text-center rounded-lg border border-dashed border-[var(--border-color)] text-xs text-[var(--subtle)]">
                No study data for this date.
                <br />
                <span className="text-[10px]">Solve mini-quizzes in Tab 2 or Test Bank items in Tab 6 to populate study logs.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
