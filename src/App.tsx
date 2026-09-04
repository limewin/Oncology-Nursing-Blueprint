import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { TopNav } from './components/TopNav';
import { DashboardTab } from './components/DashboardTab';
import { NotesTab } from './components/NotesTab';
import { LabValuesTab } from './components/LabValuesTab';
import { InterventionsTab } from './components/InterventionsTab';
import { DrugStudyTab } from './components/DrugStudyTab';
import { TestBankTab } from './components/TestBankTab';
import { GraphicLightboxModal } from './components/GraphicLightboxModal';
import { LifetimeStats, DailyStudyLog } from './types';

export default function App() {
  // Navigation & Reviewer display state
  const [showReviewer, setShowReviewer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [highlighterActive, setHighlighterActive] = useState<boolean>(false);

  // Modal Lightbox state
  const [lightboxGraphicId, setLightboxGraphicId] = useState<string | null>(null);
  const [lightboxGraphicTitle, setLightboxGraphicTitle] = useState<string | undefined>();

  // Mouse position for reactive orb background
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  // Real-time Lifetime Statistics (Ready for Part 2 Test Bank)
  const [lifetimeStats, setLifetimeStats] = useState<LifetimeStats>(() => {
    const saved = localStorage.getItem('oncology_reviewer_lifetime_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback default
      }
    }
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      lifetimeAccuracy: 0,
      strengths: [
        'Cellular Pathophysiology & TNM Staging',
        'Nadir Absolute Neutrophil Count Calculation',
        'Oncologic Emergency Red-Flag Triaging',
      ],
      weaknesses: [
        'Vesicant Extravasation Antidote Pairing',
        'Tumor Lysis Syndrome Electrolyte Shifts',
        'Anthracycline Lifetime Dose Ceilings',
      ],
    };
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update study logs & lifetime stats on quiz completion
  const handleRecordQuizResult = (correctCount: number, totalCount: number) => {
    setLifetimeStats((prev) => {
      const nextTotal = prev.totalQuestions + totalCount;
      const nextCorrect = prev.correctAnswers + correctCount;
      const nextAcc = Math.round((nextCorrect / nextTotal) * 100);

      const updated: LifetimeStats = {
        ...prev,
        totalQuestions: nextTotal,
        correctAnswers: nextCorrect,
        lifetimeAccuracy: nextAcc,
      };

      localStorage.setItem('oncology_reviewer_lifetime_stats', JSON.stringify(updated));
      return updated;
    });

    // Also update daily log for today
    const todayStr = new Date().toISOString().split('T')[0];
    const storedLogs = localStorage.getItem('oncology_study_daily_logs');
    let logsMap: Record<string, DailyStudyLog> = {};
    if (storedLogs) {
      try {
        logsMap = JSON.parse(storedLogs);
      } catch {
        logsMap = {};
      }
    }

    const prevQuestions = logsMap[todayStr]?.questionsAnswered || 0;
    const prevCorrect = logsMap[todayStr]?.correctCount || 0;
    const prevTime = logsMap[todayStr]?.timeSpentMinutes || 10;
    const prevTopics = logsMap[todayStr]?.topicsCovered || [];

    const newTodayQuestions = prevQuestions + totalCount;
    const newTodayCorrect = prevCorrect + correctCount;
    const newTodayAcc = Math.round((newTodayCorrect / newTodayQuestions) * 100);

    logsMap[todayStr] = {
      date: todayStr,
      topicsCovered: prevTopics,
      questionsAnswered: newTodayQuestions,
      correctCount: newTodayCorrect,
      accuracy: newTodayAcc,
      timeSpentMinutes: prevTime + 2,
    };

    localStorage.setItem('oncology_study_daily_logs', JSON.stringify(logsMap));
  };

  const handleOpenGraphic = (graphicId: string, title?: string) => {
    setLightboxGraphicId(graphicId);
    setLightboxGraphicTitle(title);
  };

  const handleCloseGraphic = () => {
    setLightboxGraphicId(null);
    setLightboxGraphicTitle(undefined);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">
      {/* Geometric Balance Ambient Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[10%] left-[10%] w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[100px] opacity-30 transition-transform duration-700 ease-out"
          style={{
            backgroundColor: 'var(--accent)',
            transform: `translate(${(cursorPos.x - window.innerWidth / 2) * -0.03}px, ${(cursorPos.y - window.innerHeight / 2) * -0.03}px)`,
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full blur-[120px] opacity-20 transition-transform duration-700 ease-out"
          style={{
            backgroundColor: 'var(--secondary, #A8A492)',
            transform: `translate(${(cursorPos.x - window.innerWidth / 2) * 0.03}px, ${(cursorPos.y - window.innerHeight / 2) * 0.03}px)`,
          }}
        />
      </div>

      {!showReviewer ? (
        // Landing Page View
        <LandingPage
          onStartStudying={() => setShowReviewer(true)}
          cursorPos={cursorPos}
        />
      ) : (
        // Reviewer Workspace Shell
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Navigation & Controls */}
          <TopNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            highlighterActive={highlighterActive}
            setHighlighterActive={setHighlighterActive}
            onReturnHome={() => setShowReviewer(false)}
          />

          {/* Tab Content Container */}
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeTab === 1 && (
              <DashboardTab
                lifetimeStats={lifetimeStats}
                onNavigateToNotes={() => setActiveTab(2)}
              />
            )}

            {activeTab === 2 && (
              <NotesTab
                highlighterActive={highlighterActive}
                onOpenGraphic={handleOpenGraphic}
                onRecordQuizResult={handleRecordQuizResult}
              />
            )}

            {activeTab === 3 && <LabValuesTab />}

            {activeTab === 4 && <InterventionsTab />}

            {activeTab === 5 && <DrugStudyTab />}

            {/* TAB 6: 50-ITEM TEST BANK */}
            <div id="tab-6" className={activeTab === 6 ? 'block' : 'hidden'}>
              {activeTab === 6 && (
                <TestBankTab
                  lifetimeStats={lifetimeStats}
                  onUpdateStats={(newStats) => setLifetimeStats(newStats)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Graphic Lightbox Modal */}
      <GraphicLightboxModal
        graphicId={lightboxGraphicId}
        graphicTitle={lightboxGraphicTitle}
        onClose={handleCloseGraphic}
      />
    </div>
  );
}
