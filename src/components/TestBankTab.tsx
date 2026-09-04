import React, { useState, useEffect } from 'react';
import {
  Award,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  FileText,
  Activity,
  Calculator,
  User,
  AlertTriangle,
  HeartPulse,
} from 'lucide-react';
import { TEST_BANK_QUESTIONS } from '../data/testBankData';
import { TestBankQuestion, TestBankOption, LifetimeStats, DailyStudyLog } from '../types';
import { triggerConfetti } from '../utils/confetti';

interface TestBankTabProps {
  lifetimeStats: LifetimeStats;
  onUpdateStats: (newStats: LifetimeStats) => void;
}

interface QuestionUserRecord {
  firstTapOption: 'A' | 'B' | 'C' | 'D';
  firstTapCorrect: boolean;
  revealedOptions: ('A' | 'B' | 'C' | 'D')[];
}

export const TestBankTab: React.FC<TestBankTabProps> = ({
  lifetimeStats,
  onUpdateStats,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [questionRecords, setQuestionRecords] = useState<Record<number, QuestionUserRecord>>({});
  const [animatedRingPercent, setAnimatedRingPercent] = useState<number>(0);

  // Load existing testBankLogs from localStorage on mount
  useEffect(() => {
    const rawLogs = localStorage.getItem('testBankLogs');
    if (rawLogs) {
      try {
        const parsed = JSON.parse(rawLogs);
        const map: Record<number, QuestionUserRecord> = {};
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            if (item.questionId) {
              map[item.questionId] = {
                firstTapOption: item.selectedOption,
                firstTapCorrect: item.isCorrect,
                revealedOptions: [item.selectedOption],
              };
            }
          });
        } else if (typeof parsed === 'object') {
          Object.assign(map, parsed);
        }
        setQuestionRecords(map);
      } catch (e) {
        console.error('Error loading testBankLogs:', e);
      }
    }
  }, []);

  // Sync animated SVG ring with lifetime accuracy
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRingPercent(lifetimeStats.lifetimeAccuracy || 0);
    }, 150);
    return () => clearTimeout(timer);
  }, [lifetimeStats.lifetimeAccuracy]);

  const currentQ: TestBankQuestion = TEST_BANK_QUESTIONS[currentIdx] || TEST_BANK_QUESTIONS[0];
  const currentRecord = questionRecords[currentQ.id];

  // SVG circular calculations
  const ringRadius = 50;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset =
    ringCircumference - (Math.min(100, Math.max(0, animatedRingPercent)) / 100) * ringCircumference;

  // Option Click Handler (Category 4 & 6: No Lockout, First-Tap Scoring)
  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: TestBankOption
  ) => {
    e.preventDefault();

    setQuestionRecords((prev) => {
      const existing = prev[currentQ.id];
      const isFirstTap = !existing;

      const updatedRevealed = existing
        ? existing.revealedOptions.includes(option.id)
          ? existing.revealedOptions
          : [...existing.revealedOptions, option.id]
        : [option.id];

      const newRecord: QuestionUserRecord = {
        firstTapOption: isFirstTap ? option.id : existing.firstTapOption,
        firstTapCorrect: isFirstTap ? option.isCorrect : existing.firstTapCorrect,
        revealedOptions: updatedRevealed,
      };

      const updatedMap = { ...prev, [currentQ.id]: newRecord };

      // If it is the first tap on this question: score it
      if (isFirstTap) {
        const isCorrect = option.isCorrect;

        // Trigger pure CSS Confetti on correct first tap
        if (isCorrect) {
          triggerConfetti(e.clientX, e.clientY);
        }

        // 1. Update testBankLogs in localStorage
        const logArray: any[] = [];
        Object.entries(updatedMap).forEach(([qIdStr, item]) => {
          const rec = item as QuestionUserRecord;
          const qObj = TEST_BANK_QUESTIONS.find((q) => q.id === Number(qIdStr));
          logArray.push({
            questionId: Number(qIdStr),
            selectedOption: rec.firstTapOption,
            isCorrect: rec.firstTapCorrect,
            topic: qObj?.category || 'Oncology Practice',
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
          });
        });
        localStorage.setItem('testBankLogs', JSON.stringify(logArray));

        // 2. Calculate dynamic true strengths & weaknesses
        const categoryPerformance: Record<string, { total: number; correct: number }> = {};
        logArray.forEach((entry) => {
          if (!categoryPerformance[entry.topic]) {
            categoryPerformance[entry.topic] = { total: 0, correct: 0 };
          }
          categoryPerformance[entry.topic].total += 1;
          if (entry.isCorrect) {
            categoryPerformance[entry.topic].correct += 1;
          }
        });

        const newStrengths: string[] = [];
        const newWeaknesses: string[] = [];

        Object.entries(categoryPerformance).forEach(([cat, stats]) => {
          const pct = Math.round((stats.correct / stats.total) * 100);
          if (pct >= 70) {
            newStrengths.push(`${cat} (${pct}%)`);
          } else {
            newWeaknesses.push(`${cat} (${pct}%)`);
          }
        });

        const newTotalQuestions = lifetimeStats.totalQuestions + 1;
        const newCorrectAnswers = lifetimeStats.correctAnswers + (isCorrect ? 1 : 0);
        const newLifetimeAcc = Math.round((newCorrectAnswers / newTotalQuestions) * 100);

        const newLifetimeStats: LifetimeStats = {
          totalQuestions: newTotalQuestions,
          correctAnswers: newCorrectAnswers,
          lifetimeAccuracy: newLifetimeAcc,
          strengths:
            newStrengths.length > 0
              ? newStrengths
              : ['Cellular Pathophysiology & TNM Staging', 'Oncologic Emergency Red-Flag Triaging'],
          weaknesses:
            newWeaknesses.length > 0
              ? newWeaknesses
              : ['Vesicant Extravasation Protocols', 'Anthracycline Lifetime Dose Ceilings'],
        };

        localStorage.setItem('oncology_reviewer_lifetime_stats', JSON.stringify(newLifetimeStats));
        onUpdateStats(newLifetimeStats);

        // 3. Update Daily Study Log in localStorage
        const todayStr = new Date().toISOString().split('T')[0];
        const rawDaily = localStorage.getItem('oncology_study_daily_logs');
        let dailyMap: Record<string, DailyStudyLog> = {};
        if (rawDaily) {
          try {
            dailyMap = JSON.parse(rawDaily);
          } catch {
            dailyMap = {};
          }
        }

        const existingDaily = dailyMap[todayStr];
        const prevQCount = existingDaily ? existingDaily.questionsAnswered : 0;
        const prevCorrect = existingDaily ? (existingDaily.correctCount || 0) : 0;
        const newDailyQ = prevQCount + 1;
        const newDailyC = prevCorrect + (isCorrect ? 1 : 0);
        const newDailyAcc = Math.round((newDailyC / newDailyQ) * 100);
        const prevTopics = existingDaily?.topicsCovered || [];
        const updatedTopics = prevTopics.includes(currentQ.category)
          ? prevTopics
          : [...prevTopics, currentQ.category];

        dailyMap[todayStr] = {
          date: todayStr,
          topicsCovered: updatedTopics,
          questionsAnswered: newDailyQ,
          correctCount: newDailyC,
          accuracy: newDailyAcc,
          timeSpentMinutes: (existingDaily?.timeSpentMinutes || 0) + 1,
        };
        localStorage.setItem('oncology_study_daily_logs', JSON.stringify(dailyMap));
      }

      return updatedMap;
    });
  };

  // CATEGORY 12 & 13: Tab 6 Reset Button Complete Overhaul
  const handleResetTestBank = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 1. Remove testBankLogs from localStorage
    localStorage.removeItem('testBankLogs');

    // 2. Reset live scoring variables & clear question records
    setQuestionRecords({});

    // 3. Reset live scoring variables in lifetimeStats
    const resetStats: LifetimeStats = {
      totalQuestions: 0,
      correctAnswers: 0,
      lifetimeAccuracy: 0,
      strengths: ['No test data recorded yet. Solve questions to identify strengths.'],
      weaknesses: ['No test data recorded yet. Solve questions to identify weaknesses.'],
    };

    localStorage.setItem('oncology_reviewer_lifetime_stats', JSON.stringify(resetStats));
    onUpdateStats(resetStats);

    // 4. Reset today's daily log test bank contributions
    const todayStr = new Date().toISOString().split('T')[0];
    const rawDaily = localStorage.getItem('oncology_study_daily_logs');
    if (rawDaily) {
      try {
        const dailyMap = JSON.parse(rawDaily);
        if (dailyMap[todayStr]) {
          dailyMap[todayStr].questionsAnswered = 0;
          dailyMap[todayStr].correctCount = 0;
          dailyMap[todayStr].accuracy = 0;
          localStorage.setItem('oncology_study_daily_logs', JSON.stringify(dailyMap));
        }
      } catch {
        // Fallback
      }
    }

    setAnimatedRingPercent(0);
    setCurrentIdx(0);
  };

  // Pagination navigation with event.preventDefault()
  const handlePrevQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentIdx < TEST_BANK_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleSelectQuestion = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentIdx(index);
  };

  return (
    <div id="tab-6-testbank" className="w-full space-y-8 animate-fadeIn">
      {/* Category 7: Header & Synchronized Lifetime Analytics Widget */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-color)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
                Tab 6 • Comprehensive Examination Suite
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
              50-Item Clinical NCLEX/PNLE Test Bank
            </h2>
            <p className="text-sm text-[var(--subtle)] leading-relaxed">
              Curated across 40 document-grounded high-yield topics, 5 NextGen Clinical Case EMRs, and 5 Oncology Formula/Dosage Calculations. Features no-lockout multi-option rationale review and first-tap scoring.
            </p>
          </div>

          {/* Dynamic SVG Accuracy Ring + Stats */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-8 bg-[var(--card-bg)] p-4 sm:p-5 rounded-2xl border border-[var(--border-color)] shadow-xs">
            {/* Animated SVG Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  className="stroke-black/10 dark:stroke-white/10"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={ringRadius}
                  stroke="var(--accent)"
                  strokeWidth="10"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[var(--text-main)] tracking-tight">
                  {animatedRingPercent}%
                </span>
                <span className="text-[10px] uppercase font-bold text-[var(--subtle)] tracking-wider">
                  Accuracy
                </span>
              </div>
            </div>

            {/* Score & Telemetry Badges */}
            <div className="flex flex-col justify-center space-y-2">
              <div className="text-xs text-[var(--subtle)]">
                Answered:{' '}
                <span className="font-extrabold text-base text-[var(--text-main)]">
                  {lifetimeStats.totalQuestions}
                </span>{' '}
                / 50
              </div>
              <div className="text-xs text-[var(--subtle)]">
                Correct First-Taps:{' '}
                <span className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                  {lifetimeStats.correctAnswers}
                </span>
              </div>

              {/* Reset Test Bank Button (Category 12 & 13) */}
              <button
                type="button"
                id="btn-reset-testbank"
                onClick={handleResetTestBank}
                className="btn-tab6-reset inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[var(--text-main)] border border-[var(--border-color)] hover:bg-[var(--accent)] hover:text-white dark:hover:text-black transition-all cursor-pointer shadow-xs active:scale-95"
                title="Reset All Test Bank Progress and Logs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Test Bank</span>
              </button>
            </div>
          </div>
        </div>

        {/* Strengths and Weaknesses Strip */}
        <div className="mt-6 pt-5 border-t border-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Identified Mastery &amp; Strengths (First-Tap &ge; 70%)</span>
            </div>
            <ul className="space-y-1 text-[var(--text-main)]">
              {lifetimeStats.strengths.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Target Review Focus & Weaknesses</span>
            </div>
            <ul className="space-y-1 text-[var(--text-main)]">
              {lifetimeStats.weaknesses.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Category 3: Question Quick-Navigation Grid (1 to 50) */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold uppercase tracking-wider text-[var(--text-main)]">
            Question Index Navigator (1–50)
          </span>
          <div className="flex items-center gap-3 text-[11px] text-[var(--subtle)]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              Review Needed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-gray-400 inline-block" />
              Unanswered
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 sm:grid-cols-25 gap-1.5">
          {TEST_BANK_QUESTIONS.map((q, idx) => {
            const rec = questionRecords[q.id];
            const isCurrent = idx === currentIdx;
            const isAnswered = Boolean(rec);
            const isFirstCorrect = rec?.firstTapCorrect;

            let badgeBg = 'bg-[var(--card-bg)] text-[var(--text-main)] border-[var(--border-color)]';
            if (isAnswered) {
              badgeBg = isFirstCorrect
                ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                : 'bg-rose-500 text-white border-rose-600 font-bold';
            }

            return (
              <button
                key={q.id}
                type="button"
                id={`btn-nav-q-${q.id}`}
                onClick={(e) => handleSelectQuestion(idx, e)}
                className={`w-full py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${badgeBg} ${
                  isCurrent ? 'ring-2 ring-[var(--accent)] scale-110 shadow-md font-extrabold z-10' : 'hover:scale-105'
                }`}
                title={`Question ${q.id}: ${q.category}`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category 3: Question Display Container (One Question at a Time) */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-color)] space-y-6">
        {/* Question Header & Category Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-color)]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Question {currentQ.id} of 50
            </span>

            {currentQ.type === 'ngn' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
                <Activity className="w-3.5 h-3.5" />
                NGN Clinical Scenario (EMR / Dx Chart)
              </span>
            )}

            {currentQ.type === 'math' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                <Calculator className="w-3.5 h-3.5" />
                Clinical Dosage & Formula Math
              </span>
            )}

            {currentQ.type === 'standard' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-[var(--border-color)] text-[var(--text-main)]">
                <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                Curriculum Review
              </span>
            )}

            <span className="text-xs font-medium text-[var(--subtle)]">
              Topic: <strong className="text-[var(--text-main)]">{currentQ.category}</strong>
            </span>
          </div>

          <div className="text-xs text-[var(--subtle)]">
            Source Slide:{' '}
            <span
              className="slide-ref"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'black',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
            >
              [Page {currentQ.sourceSlide}]
            </span>
          </div>
        </div>

        {/* NGN-STYLE DX CHART / EMR (Questions 41 to 45) */}
        {currentQ.type === 'ngn' && currentQ.dxChart && (
          <div className="dx-chart-container rounded-xl border border-purple-300 dark:border-purple-800/60 bg-purple-50/40 dark:bg-purple-950/20 overflow-hidden text-xs">
            {/* EMR Top Banner */}
            <div className="bg-purple-900 text-white px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold tracking-wide">
                <HeartPulse className="w-4 h-4 text-purple-300 animate-pulse" />
                <span>ELECTRONIC MEDICAL RECORD (EMR) • CLINICAL DIAGNOSTIC CHART</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest bg-purple-800 px-2 py-0.5 rounded">
                CONFIDENTIAL SIMULATION
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Patient Profile Demographics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[var(--card-bg)] p-3 rounded-lg border border-[var(--border-color)]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block">Patient</span>
                  <span className="font-bold text-[var(--text-main)]">
                    {currentQ.dxChart.patientInfo.age} y/o {currentQ.dxChart.patientInfo.gender}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block">Diagnosis</span>
                  <span className="font-bold text-[var(--text-main)] truncate block" title={currentQ.dxChart.patientInfo.diagnosis}>
                    {currentQ.dxChart.patientInfo.diagnosis}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block">Code Status</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {currentQ.dxChart.patientInfo.codeStatus}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block">Allergies</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    {currentQ.dxChart.patientInfo.allergies}
                  </span>
                </div>
              </div>

              {/* Vitals Ribbon */}
              {currentQ.dxChart.vitalSigns && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[var(--card-bg)] p-3 rounded-lg border border-[var(--border-color)] font-mono text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block font-sans">Temp</span>
                    <span className="font-bold text-[var(--text-main)]">{currentQ.dxChart.vitalSigns.temp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block font-sans">BP</span>
                    <span className="font-bold text-[var(--text-main)]">{currentQ.dxChart.vitalSigns.bp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block font-sans">HR</span>
                    <span className="font-bold text-[var(--text-main)]">{currentQ.dxChart.vitalSigns.hr}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block font-sans">Resp</span>
                    <span className="font-bold text-[var(--text-main)]">{currentQ.dxChart.vitalSigns.rr}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[var(--subtle)] block font-sans">SpO2</span>
                    <span className="font-bold text-[var(--text-main)]">{currentQ.dxChart.vitalSigns.spo2}</span>
                  </div>
                </div>
              )}

              {/* Nurse's Clinical Progress Notes */}
              {currentQ.dxChart.clinicalNotes && (
                <div className="bg-[var(--card-bg)] p-3.5 rounded-lg border border-[var(--border-color)]">
                  <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider block mb-1">
                    Nurse’s Clinical Observation Note:
                  </span>
                  <p className="text-[var(--text-main)] leading-relaxed italic">
                    "{currentQ.dxChart.clinicalNotes}"
                  </p>
                </div>
              )}

              {/* Diagnostic Lab Results Table */}
              {currentQ.dxChart.labResults && currentQ.dxChart.labResults.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
                  <table className="w-full text-left bg-[var(--card-bg)]">
                    <thead className="bg-purple-100/60 dark:bg-purple-900/40 text-[10px] uppercase font-bold text-[var(--text-main)]">
                      <tr>
                        <th className="p-2 border-b border-[var(--border-color)]">Laboratory Diagnostic</th>
                        <th className="p-2 border-b border-[var(--border-color)]">Observed Value</th>
                        <th className="p-2 border-b border-[var(--border-color)]">Normal Reference Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {currentQ.dxChart.labResults.map((lab, i) => {
                        const isCritical =
                          lab.value.includes('CRITICAL') || lab.value.includes('ELEVATED');
                        return (
                          <tr key={i} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/20">
                            <td className="p-2 font-medium text-[var(--text-main)]">{lab.test}</td>
                            <td
                              className={`p-2 font-bold ${
                                isCritical ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--text-main)]'
                              }`}
                            >
                              {lab.value}
                            </td>
                            <td className="p-2 text-[var(--subtle)] font-mono">{lab.reference}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Math Formula Hint Box (Questions 46 to 50) */}
        {currentQ.type === 'math' && currentQ.mathFormulaNotes && (
          <div className="p-4 rounded-xl border border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 text-xs">
            <div className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 mb-1.5">
              <Calculator className="w-4 h-4" />
              <span>Standard Nursing Calculation Reference:</span>
            </div>
            <pre className="font-mono text-xs whitespace-pre-wrap text-[var(--text-main)] bg-[var(--card-bg)] p-2.5 rounded-lg border border-[var(--border-color)]">
              {currentQ.mathFormulaNotes}
            </pre>
          </div>
        )}

        {/* Question Stem */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] leading-relaxed">
            {currentQ.stem}
          </h3>
        </div>

        {/* Options List (Category 4 & 5: No Lockout, Discrete Rationale Reveal, [Page #] badges) */}
        <div className="space-y-4 pt-2">
          {currentQ.options.map((opt) => {
            const isRevealed = currentRecord?.revealedOptions.includes(opt.id);
            const isFirstTapSelection = currentRecord?.firstTapOption === opt.id;

            let buttonClass =
              'option-btn w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 bg-[var(--card-bg)] hover:bg-[var(--border-color)]/30';

            if (isRevealed) {
              buttonClass += opt.isCorrect
                ? ' correct border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                : ' incorrect border-rose-500 bg-rose-50/30 dark:bg-rose-950/30 ring-1 ring-rose-500';
            } else {
              buttonClass += ' border-[var(--border-color)] text-[var(--text-main)]';
            }

            return (
              <div key={opt.id} className="space-y-2">
                <button
                  type="button"
                  id={`btn-opt-${currentQ.id}-${opt.id}`}
                  onClick={(e) => handleOptionClick(e, opt)}
                  className={buttonClass}
                  style={{ cursor: 'pointer' }}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isRevealed
                        ? opt.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-[var(--border-color)] text-[var(--text-main)]'
                    }`}
                  >
                    {opt.id}
                  </span>

                  <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed text-[var(--text-main)]">
                    {opt.text}
                  </div>

                  {isFirstTapSelection && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent)] text-white uppercase tracking-wider flex-shrink-0">
                      Your First Tap
                    </span>
                  )}
                </button>

                {/* Category 4 & 5: Discrete Rationale Block */}
                {isRevealed && (
                  <div
                    className={`rationale p-4 rounded-xl text-xs sm:text-sm leading-relaxed border transition-all animate-fadeIn ${
                      opt.isCorrect
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                        : 'border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 font-bold">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )}
                      <span>
                        {opt.isCorrect ? 'Correct Clinical Option' : 'Incorrect Clinical Option'}
                      </span>
                      {/* Global Page Badge inside Rationale per Category 5 */}
                      <span
                        className="slide-ref ml-auto"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'black',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                        }}
                      >
                        [Page {opt.sourcePage}]
                      </span>
                    </div>
                    <p>{opt.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination & Next/Previous Controls (Category 3) */}
        <div className="pt-6 border-t border-[var(--border-color)] flex items-center justify-between gap-4">
          <button
            type="button"
            id="btn-prev-question"
            onClick={handlePrevQuestion}
            disabled={currentIdx === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed border-[var(--border-color)] text-[var(--subtle)]'
                : 'border-[var(--border-color)] hover:bg-[var(--border-color)] text-[var(--text-main)] active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-semibold text-[var(--subtle)]">
            Question {currentIdx + 1} of {TEST_BANK_QUESTIONS.length}
          </span>

          <button
            type="button"
            id="btn-next-question"
            onClick={handleNextQuestion}
            disabled={currentIdx === TEST_BANK_QUESTIONS.length - 1}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer ${
              currentIdx === TEST_BANK_QUESTIONS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-gray-400'
                : 'hover:opacity-90 active:scale-95 shadow-xs'
            }`}
            style={
              currentIdx === TEST_BANK_QUESTIONS.length - 1
                ? {}
                : { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
            }
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
