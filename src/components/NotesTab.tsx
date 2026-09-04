import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { CLINICAL_TOPICS } from '../data/oncologyData';
import { ClinicalTopic, NclexQuestion } from '../types';

interface NotesTabProps {
  highlighterActive: boolean;
  onOpenGraphic: (graphicId: string, title?: string) => void;
  onRecordQuizResult: (correctCount: number, totalCount: number) => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  highlighterActive,
  onOpenGraphic,
  onRecordQuizResult,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(CLINICAL_TOPICS[0].id);
  const [expandedMnemonicIndex, setExpandedMnemonicIndex] = useState<number | null>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedRationales, setRevealedRationales] = useState<Record<string, boolean>>({});
  const [showFormulaCenter, setShowFormulaCenter] = useState<boolean>(false);

  // Formula Center Calculators State
  // 1. ANC Calculator
  const [ancWbc, setAncWbc] = useState<number>(3000);
  const [ancSegs, setAncSegs] = useState<number>(25);
  const [ancBands, setAncBands] = useState<number>(5);

  // 2. BSA Calculator (Mosteller)
  const [bsaHeightCm, setBsaHeightCm] = useState<number>(170);
  const [bsaWeightKg, setBsaWeightKg] = useState<number>(70);

  // 3. Corrected Calcium Calculator
  const [serumCalcium, setSerumCalcium] = useState<number>(10.8);
  const [serumAlbumin, setSerumAlbumin] = useState<number>(2.5);

  const activeTopic = CLINICAL_TOPICS.find((t) => t.id === activeTopicId) || CLINICAL_TOPICS[0];

  // Highlighter Tool handler: when active, wraps selected text in <mark class="study-highlight">
  const handleTextSelection = () => {
    if (!highlighterActive) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    const range = selection.getRangeAt(0);

    // Check if selection is already inside a mark
    const commonAncestor = range.commonAncestorContainer;
    const parentMark =
      commonAncestor instanceof HTMLElement
        ? commonAncestor.closest('mark')
        : commonAncestor.parentElement?.closest('mark');

    if (parentMark) {
      // Remove highlight if clicked or selected again
      const textNode = document.createTextNode(parentMark.textContent || '');
      parentMark.parentNode?.replaceChild(textNode, parentMark);
      selection.removeAllRanges();
      return;
    }

    try {
      const markElement = document.createElement('mark');
      markElement.className = 'study-highlight';
      markElement.appendChild(range.extractContents());
      range.insertNode(markElement);
      selection.removeAllRanges();
    } catch {
      // Graceful fallback for cross-node selections
    }
  };

  // Mini-Quiz Handlers
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleRevealRationale = (q: NclexQuestion) => {
    setRevealedRationales((prev) => ({
      ...prev,
      [q.id]: true,
    }));

    const isCorrect = selectedAnswers[q.id] === q.correctIndex;
    onRecordQuizResult(isCorrect ? 1 : 0, 1);
  };

  // Calculations
  const calculatedAnc = Math.round((ancWbc * (ancSegs + ancBands)) / 100);
  const calculatedBsa = Math.sqrt((bsaHeightCm * bsaWeightKg) / 3600);
  const calculatedCorrectedCalcium = Number((serumCalcium + 0.8 * (4.0 - serumAlbumin)).toFixed(2));

  return (
    <div id="tab-2-notes" className="w-full space-y-6 animate-fadeIn" onMouseUp={handleTextSelection}>
      {/* Top Banner / Formula Center Toggle */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
              Core Curriculum • Clinical Notes & Tools
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
            Clinical Oncology Pathophysiology & Therapeutics
          </h2>
          <p className="text-xs sm:text-sm text-[var(--subtle)]">
            {highlighterActive ? (
              <span className="text-amber-500 font-bold">
                Highlighter Tool Active: Highlight or click text across any section to highlight.
              </span>
            ) : (
              'Select any clinical module from the navigation sidebar to review concepts, mnemonics, and NCLEX questions.'
            )}
          </p>
        </div>

        <button
          type="button"
          id="btn-toggle-formula-center"
          onClick={() => setShowFormulaCenter(!showFormulaCenter)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
            showFormulaCenter
              ? 'text-white'
              : 'border border-black/5 bg-[var(--card-bg)] text-[var(--text-main)] hover:bg-black/5'
          }`}
          style={showFormulaCenter ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' } : {}}
        >
          <Calculator className="w-4 h-4" />
          <span>{showFormulaCenter ? 'Hide Formula Center' : 'Open Formula Center'}</span>
        </button>
      </div>

      {/* Formula Center Drawer (ANC, BSA, Corrected Calcium) */}
      {showFormulaCenter && (
        <div className="glass-panel p-6 rounded-2xl border-2 border-[var(--accent)] space-y-6">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">
                Clinical Oncology Formula Center & Calculators
              </h3>
            </div>
            <span className="slide-ref">
              [Page 15 & 16]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. ANC Calculator */}
            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/80 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-main)]">Absolute Neutrophil Count (ANC)</h4>
                  <p className="text-[11px] text-[var(--subtle)]">WBC × (% Segs + % Bands) / 100</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 font-semibold">
                  Nadir Lab
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[var(--subtle)] mb-1">Total WBC (/mm³):</label>
                  <input
                    type="number"
                    value={ancWbc}
                    onChange={(e) => setAncWbc(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[var(--subtle)] mb-1">% Segs:</label>
                    <input
                      type="number"
                      value={ancSegs}
                      onChange={(e) => setAncSegs(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--subtle)] mb-1">% Bands:</label>
                    <input
                      type="number"
                      value={ancBands}
                      onChange={(e) => setAncBands(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[var(--text-main)]">Calculated ANC:</span>
                  <span className="text-base font-extrabold text-[var(--accent)]">{calculatedAnc} /mm³</span>
                </div>
                <div className="mt-1 text-[11px] font-medium">
                  {calculatedAnc < 500 ? (
                    <span className="text-red-500 font-bold">Severe Neutropenia (High Sepsis Risk)</span>
                  ) : calculatedAnc < 1000 ? (
                    <span className="text-amber-500 font-bold">Moderate Neutropenia</span>
                  ) : (
                    <span className="text-emerald-500 font-semibold">Mild / Normal Range</span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Mosteller BSA Calculator */}
            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/80 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-main)]">Body Surface Area (Mosteller)</h4>
                  <p className="text-[11px] text-[var(--subtle)]">√ [ (Height cm × Weight kg) / 3600 ]</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 font-semibold">
                  Chemo Dosing
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[var(--subtle)] mb-1">Height (cm):</label>
                  <input
                    type="number"
                    value={bsaHeightCm}
                    onChange={(e) => setBsaHeightCm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--subtle)] mb-1">Weight (kg):</label>
                  <input
                    type="number"
                    value={bsaWeightKg}
                    onChange={(e) => setBsaWeightKg(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[var(--text-main)]">Calculated BSA:</span>
                  <span className="text-base font-extrabold text-[var(--accent)]">{calculatedBsa.toFixed(2)} m²</span>
                </div>
                <p className="text-[10px] text-[var(--subtle)] mt-1">
                  Standard baseline for dosing alkylating agents, anthracyclines, and platinum protocols.
                </p>
              </div>
            </div>

            {/* 3. Corrected Calcium Calculator */}
            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/80 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-main)]">Corrected Calcium</h4>
                  <p className="text-[11px] text-[var(--subtle)]">Serum Ca + 0.8 × (4.0 - Albumin)</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-semibold">
                  Emergency Lab
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[var(--subtle)] mb-1">Measured Total Ca (mg/dL):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={serumCalcium}
                    onChange={(e) => setSerumCalcium(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--subtle)] mb-1">Serum Albumin (g/dL):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={serumAlbumin}
                    onChange={(e) => setSerumAlbumin(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-main)]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[var(--text-main)]">Corrected Calcium:</span>
                  <span className="text-base font-extrabold text-[var(--accent)]">{calculatedCorrectedCalcium} mg/dL</span>
                </div>
                <div className="mt-1 text-[11px] font-medium">
                  {calculatedCorrectedCalcium > 10.5 ? (
                    <span className="text-red-500 font-bold">Hypercalcemia of Malignancy Present!</span>
                  ) : (
                    <span className="text-emerald-500 font-semibold">Normal Ionized Equivalent</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Reviewer Layout: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="glass-panel p-3 rounded-2xl sticky top-20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--subtle)] px-2 py-1 mb-2">
              Curriculum Topics (Pages 1–18)
            </h3>
            <div className="space-y-1 max-h-[75vh] overflow-y-auto pr-1">
              {CLINICAL_TOPICS.map((topic, index) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setActiveTopicId(topic.id);
                      setExpandedMnemonicIndex(0);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'text-white font-bold shadow-xs'
                        : 'text-[var(--text-main)] hover:bg-black/5'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                        : {}
                    }
                  >
                    <div className="flex-1">
                      <span className="block font-semibold line-clamp-1 leading-snug">
                        {index + 1}. {topic.title}
                      </span>
                      <span className="text-[10px] opacity-80 block truncate mt-0.5">
                        {topic.category}
                      </span>
                    </div>
                    <span
                      className="slide-ref shrink-0"
                      style={{
                        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.25)' : 'var(--accent)',
                        color: '#FFFFFF',
                        padding: '1px 6px',
                        fontSize: '0.65rem',
                      }}
                    >
                      P.{topic.sourceSlide}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-8">
          {/* Topic Header Card */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] block">
                  {activeTopic.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
                  {activeTopic.title}
                </h1>
                <p className="text-xs sm:text-sm text-[var(--subtle)] mt-1">{activeTopic.subtitle}</p>
              </div>

              {/* Exact Global Badge */}
              <span className="slide-ref">
                [Page {activeTopic.sourceSlide}]
              </span>
            </div>

            {/* Summary Callout */}
            <p
              className="text-sm leading-relaxed text-[var(--text-main)] p-4 rounded-xl"
              style={{
                background: 'rgba(168, 164, 146, 0.12)',
                borderLeft: '4px solid #A8A492',
              }}
            >
              {activeTopic.summary}
            </p>

            {/* Key Clinical Points */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Essential Clinical Takeaways</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeTopic.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-lg border border-black/5 bg-[var(--card-bg)]/50 text-[var(--text-main)] flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Graphic Lightbox Placeholder Card */}
          {activeTopic.graphicId && (
            <div
              className="glass-panel p-5 rounded-2xl border-2 border-dashed border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all text-center cursor-pointer group"
              onClick={() => onOpenGraphic(activeTopic.graphicId!, activeTopic.graphicTitle)}
            >
              <div
                className="w-12 h-12 mx-auto rounded-full text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-[var(--text-main)]">
                Click to view Clinical Graphic
              </h4>
              <p className="text-xs text-[var(--subtle)] mt-1">
                {activeTopic.graphicTitle || 'High-Resolution Clinical Diagram'}
              </p>
              <span className="inline-block mt-2 text-xs font-bold text-[var(--accent)]">
                Open Full-Screen Vector Illustration →
              </span>
            </div>
          )}

          {/* Detailed Topic Content Sections */}
          <div className="space-y-6">
            {activeTopic.detailedSections.map((sec, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                  <h3 className="text-lg font-bold text-[var(--text-main)]">{sec.heading}</h3>
                  {sec.subheading && (
                    <span className="text-xs text-[var(--subtle)]">{sec.subheading}</span>
                  )}
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Structured Table If Present */}
                {sec.tableData && (
                  <div className="overflow-x-auto mt-4 rounded-xl border border-[var(--border-color)]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[var(--border-color)]/40 border-b border-[var(--border-color)]">
                          {sec.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-extrabold text-[var(--text-main)]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-color)]">
                        {sec.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[var(--border-color)]/20 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3 text-[var(--text-main)] ${
                                  cIdx === 0 ? 'font-bold' : ''
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Callout Box If Present */}
                {sec.callout && (
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3 mt-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                        {sec.callout.title}
                      </h5>
                      <p className="text-xs text-[var(--subtle)] mt-1">{sec.callout.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mnemonics Accordion Grid */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="text-base font-bold text-[var(--text-main)]">
                  Clinical Mnemonics ({activeTopic.mnemonics.length} Available)
                </h3>
              </div>
              <span className="text-xs text-[var(--subtle)]">High-Yield Recall Tools</span>
            </div>

            <div className="space-y-3">
              {activeTopic.mnemonics.map((mn, mIdx) => {
                const isExpanded = expandedMnemonicIndex === mIdx;
                return (
                  <div
                    key={mIdx}
                    className="border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--card-bg)]/60"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedMnemonicIndex(isExpanded ? null : mIdx)}
                      className="w-full flex items-center justify-between p-3.5 text-left font-bold text-xs sm:text-sm text-[var(--text-main)] hover:bg-[var(--border-color)]/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-white font-bold text-xs"
                          style={{ backgroundColor: 'var(--accent)' }}
                        >
                          {mn.acronym}
                        </span>
                        <span>{mn.title}</span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 border-t border-black/5 bg-black/[0.02] space-y-3 animate-fadeIn">
                        <div className="space-y-1.5">
                          {mn.breakdown.map((item, bIdx) => (
                            <div key={bIdx} className="text-xs flex items-start gap-2">
                              <span className="font-extrabold text-[var(--accent)] shrink-0 w-6">
                                {item.letter} :
                              </span>
                              <span className="text-[var(--text-main)]">{item.meaning}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-black/5 text-[11px] text-[var(--subtle)]">
                          <strong className="text-[var(--text-main)]">Clinical Value: </strong>
                          {mn.clinicalSignificance}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Module Mini-Quiz: EXACTLY 3 Questions */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                  Module NCLEX Mini-Quiz (3 High-Yield Questions)
                </h3>
              </div>
              <span className="text-xs font-semibold text-[var(--subtle)]">
                Immediate Clinical Rationale
              </span>
            </div>

            <div className="space-y-6">
              {activeTopic.miniQuiz.map((q, qIndex) => {
                const userSelected = selectedAnswers[q.id];
                const isRevealed = revealedRationales[q.id];
                const hasAnswered = userSelected !== undefined;
                const isCorrect = userSelected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-xl border border-black/5 bg-[var(--card-bg)]/80 space-y-4"
                  >
                    {/* Question Stem */}
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center bg-black/5 text-xs font-bold text-[var(--text-main)] shrink-0">
                        {qIndex + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-[var(--text-main)] leading-relaxed">
                          {q.stem}
                        </p>
                        <span className="slide-ref inline-block mt-2">
                          [Page {q.sourceSlide}]
                        </span>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pl-9">
                      {q.options.map((opt, oIndex) => {
                        const isOptionSelected = userSelected === oIndex;
                        const isThisCorrect = oIndex === q.correctIndex;

                        let optionStyle =
                          'border-black/10 hover:bg-black/5 text-[var(--text-main)]';

                        if (isRevealed) {
                          if (isThisCorrect) {
                            optionStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-600 font-bold';
                          } else if (isOptionSelected && !isThisCorrect) {
                            optionStyle = 'border-red-500 bg-red-500/20 text-red-600 line-through';
                          }
                        } else if (isOptionSelected) {
                          optionStyle = 'border-[var(--accent)] bg-[var(--accent)]/15 font-bold';
                        }

                        return (
                          <button
                            key={oIndex}
                            type="button"
                            onClick={() => !isRevealed && handleSelectOption(q.id, oIndex)}
                            className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                          >
                            <span className="font-bold shrink-0">{String.fromCharCode(65 + oIndex)}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit / Reveal Action */}
                    <div className="pl-9 flex items-center justify-between pt-2">
                      {!isRevealed ? (
                        <button
                          type="button"
                          disabled={!hasAnswered}
                          onClick={() => handleRevealRationale(q)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                            hasAnswered
                              ? 'text-white hover:opacity-90'
                              : 'opacity-40 bg-black/10 text-[var(--subtle)] cursor-not-allowed'
                          }`}
                          style={hasAnswered ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' } : {}}
                        >
                          Verify Answer & Rationale
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                              <CheckCircle2 className="w-4 h-4" /> Correct Answer
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600">
                              <XCircle className="w-4 h-4" /> Incorrect Selection
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Revealed Rationale */}
                    {isRevealed && (
                      <div
                        className="ml-9 p-3.5 rounded-lg text-xs text-[var(--text-main)] space-y-1 animate-fadeIn"
                        style={{
                          background: 'rgba(168, 164, 146, 0.12)',
                          borderLeft: '4px solid #A8A492',
                        }}
                      >
                        <strong className="block text-[var(--accent)]">Clinical Rationale:</strong>
                        <p className="leading-relaxed">{q.rationale}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
