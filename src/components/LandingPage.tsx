import React from 'react';
import { ArrowRight, BookOpen, Activity, Pill, ShieldCheck, Zap, Layers } from 'lucide-react';

interface LandingPageProps {
  onStartStudying: () => void;
  cursorPos: { x: number; y: number };
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartStudying, cursorPos }) => {
  // Parallax orb offset calculations
  const orbOffsetX = (cursorPos.x - window.innerWidth / 2) * -0.04;
  const orbOffsetY = (cursorPos.y - window.innerHeight / 2) * -0.04;

  return (
    <div id="landing-page-hero" className="relative min-h-[92vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Interactive glowing orbs that gently drift away from the cursor */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl transition-transform duration-500 ease-out opacity-40"
        style={{
          backgroundColor: 'var(--accent)',
          transform: `translate(${orbOffsetX * 1.5}px, ${orbOffsetY * 1.5}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 w-96 h-96 rounded-full blur-3xl transition-transform duration-500 ease-out opacity-30"
        style={{
          backgroundColor: 'var(--secondary, #A8A492)',
          transform: `translate(${orbOffsetX * -1.2}px, ${orbOffsetY * -1.2}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl transition-transform duration-500 ease-out opacity-25"
        style={{
          backgroundColor: 'var(--tertiary, #524646)',
          transform: `translate(${orbOffsetX * 0.8}px, ${orbOffsetY * 0.8}px)`,
        }}
      />

      {/* Hero Container */}
      <div className="relative z-10 max-w-5xl w-full text-center my-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/5 bg-[var(--card-bg)] backdrop-blur-md shadow-xs mb-6">
          <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-main)]">
            Clinical Oncology Nursing Reviewer • Pages 1–100 Curriculum
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-main)] mb-6">
          Oncology Nursing: <br />
          <span className="text-[var(--accent)]">From Cell to Bedside</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-[var(--subtle)] leading-relaxed mb-10">
          A clinical framework for pathophysiology, staging, therapeutics, toxicities, and holistic care.
          Engineered for NCLEX mastery and bedside clinical judgment across the complete cancer care trajectory.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            id="btn-start-studying-cta"
            onClick={onStartStudying}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
          >
            <span>Start Studying Reviewer</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          <div className="glass-panel p-4 rounded-xl transition-transform hover:-translate-y-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">Tab 1: Dashboard</h3>
            <p className="text-xs text-[var(--subtle)] leading-snug">
              Interactive calendar, animated accuracy rings, and lifetime tracking metrics.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl transition-transform hover:-translate-y-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">Tab 2: Notes & Tools</h3>
            <p className="text-xs text-[var(--subtle)] leading-snug">
              Document topics, mnemonics, NCLEX mini-quizzes, graphic lightboxes, and ANC/BSA calculators.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl transition-transform hover:-translate-y-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">Tab 3: Lab Values</h3>
            <p className="text-xs text-[var(--subtle)] leading-snug">
              CSS visual spectrum bars (Low-Normal-High), critical thresholds, and oncology clinical pearls.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl transition-transform hover:-translate-y-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">Tab 4: Interventions</h3>
            <p className="text-xs text-[var(--subtle)] leading-snug">
              Clinical stepper timeline with clickable nodes, evidence-based rationales, and red-flag alerts.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl transition-transform hover:-translate-y-1">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">Tab 5: Drug Study</h3>
            <p className="text-xs text-[var(--subtle)] leading-snug">
              Full-width pharmacology matrix with touch-friendly Active Recall blur mode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
