import React, { useState } from 'react';
import {
  Zap,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { CLINICAL_INTERVENTIONS } from '../data/oncologyData';
import { ClinicalStepIntervention } from '../types';

export const InterventionsTab: React.FC = () => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>(
    CLINICAL_INTERVENTIONS[0].id
  );
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(0);
  const [showRationale, setShowRationale] = useState<boolean>(true);

  const activePathway =
    CLINICAL_INTERVENTIONS.find((p) => p.id === selectedPathwayId) ||
    CLINICAL_INTERVENTIONS[0];

  const handleToggleNode = (index: number) => {
    setExpandedStepIndex(expandedStepIndex === index ? null : index);
  };

  return (
    <div id="tab-4-interventions" className="w-full space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
              Core Protocol • Algorithmic Steppers
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
            Clinical Nursing Interventions & Emergency Steppers
          </h2>
          <p className="text-xs sm:text-sm text-[var(--subtle)] mt-1">
            Interactive vertical clinical timelines with clickable SVG nodes, step-by-step procedures, evidence-based rationales, and red-flag alerts.
          </p>
        </div>
      </div>

      {/* Pathway Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CLINICAL_INTERVENTIONS.map((pathway) => {
          const isSelected = pathway.id === selectedPathwayId;
          return (
            <button
              key={pathway.id}
              type="button"
              onClick={() => {
                setSelectedPathwayId(pathway.id);
                setExpandedStepIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'text-white font-bold shadow-sm scale-102'
                  : 'border border-black/5 bg-[var(--card-bg)] text-[var(--text-main)] hover:bg-black/5'
              }`}
              style={
                isSelected
                  ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                  : {}
              }
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{pathway.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pathway Detail Card */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        {/* Pathway Header with Page Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] block">
                {activePathway.phase}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold ${
                  activePathway.priorityLevel === 'Immediate'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : activePathway.priorityLevel === 'Priority'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                {activePathway.priorityLevel} Priority
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
              {activePathway.title}
            </h3>
            <p
              className="text-xs sm:text-sm text-[var(--text-main)] font-medium leading-relaxed p-3 rounded-lg"
              style={{
                background: 'rgba(168, 164, 146, 0.12)',
                borderLeft: '3px solid #A8A492',
              }}
            >
              <strong>Core Clinical Action: </strong>
              {activePathway.keyAction}
            </p>
          </div>

          <span className="slide-ref shrink-0">
            [Page {activePathway.sourceSlide}]
          </span>
        </div>

        {/* Red Flag Warning Box */}
        {activePathway.redFlagSigns.length > 0 && (
          <div
            className="p-4 rounded-xl flex items-start gap-3"
            style={{
              background: 'rgba(236, 91, 56, 0.1)',
              border: '1px solid rgba(236, 91, 56, 0.25)',
            }}
          >
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
            <div className="space-y-1">
              <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                Critical Red Flag Signs & Contraindications
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {activePathway.redFlagSigns.map((sign, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-black/10 border border-black/10 text-[var(--text-main)] font-medium"
                  >
                    • {sign}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Vertical Stepper Timeline with Clickable SVG Nodes */}
        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-black/10">
          {activePathway.detailedProcedure.map((stepText, index) => {
            const isExpanded = expandedStepIndex === index;

            return (
              <div key={index} className="relative group">
                {/* Clickable SVG Node */}
                <button
                  type="button"
                  onClick={() => handleToggleNode(index)}
                  className={`absolute -left-6 sm:-left-10 top-1 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    isExpanded
                      ? 'text-white scale-110 ring-4 ring-[#EC5B38]/20 shadow-md'
                      : 'bg-[var(--card-bg)] border border-[#A8A492] text-[var(--text-main)] hover:scale-105'
                  }`}
                  style={isExpanded ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' } : {}}
                  title="Click node to expand/collapse procedure details"
                >
                  <span className="text-[11px] font-bold">{index + 1}</span>
                </button>

                {/* Step Content Card */}
                <div
                  className={`border rounded-xl p-4 sm:p-5 transition-all bg-[var(--card-bg)]/80 ${
                    isExpanded
                      ? 'border-[#EC5B38]/40 shadow-sm'
                      : 'border-black/5 hover:border-black/10'
                  }`}
                >
                  {/* Step Header */}
                  <div
                    className="flex items-start justify-between gap-3 cursor-pointer"
                    onClick={() => handleToggleNode(index)}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md text-white"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        Step {index + 1}
                      </span>
                      <span className="text-xs text-[var(--subtle)] font-medium">Click node or header to toggle</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleNode(index);
                      }}
                      className="p-1 rounded-md text-[var(--subtle)] hover:text-[var(--text-main)]"
                      aria-label="Toggle step details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Step Action Text */}
                  <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed mt-2.5 font-medium">
                    {stepText}
                  </p>

                  {/* Evidence-Based Clinical Rationale Drawer */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-black/5 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent)]">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Evidence-Based Clinical Rationale & Mechanism</span>
                      </div>
                      <p
                        className="text-xs text-[var(--text-main)] leading-relaxed p-3 rounded-lg"
                        style={{
                          background: 'rgba(168, 164, 146, 0.12)',
                          borderLeft: '3px solid #A8A492',
                        }}
                      >
                        {activePathway.clinicalRationale}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Evidence-Based Pathway Rationale Section */}
        <div className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--border-color)]/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)]">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span>Full Clinical Rationale for Protocol</span>
            </div>
            <button
              type="button"
              onClick={() => setShowRationale(!showRationale)}
              className="text-xs text-[var(--accent)] font-semibold hover:underline"
            >
              {showRationale ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {showRationale && (
            <p className="text-xs text-[var(--subtle)] leading-relaxed pt-1">
              {activePathway.clinicalRationale}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
