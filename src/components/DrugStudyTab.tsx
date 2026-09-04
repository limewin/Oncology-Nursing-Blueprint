import React, { useState, useMemo } from 'react';
import { Pill, Eye, EyeOff, Sparkles, Filter, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { DRUG_STUDY_DATA } from '../data/oncologyData';
import { DrugStudyItem } from '../types';

export const DrugStudyTab: React.FC = () => {
  const [activeRecallMode, setActiveRecallMode] = useState<boolean>(false);
  const [unblurredCells, setUnblurredCells] = useState<Record<string, boolean>>({});
  const [filterClass, setFilterClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const classes = [
    'All',
    'Alkylating',
    'Anthracycline',
    'Plant Alkaloid',
    'Antimetabolite',
    'Monoclonal Antibody',
    'Immune Checkpoint',
    'Urate Oxidase',
    'Opioid',
  ];

  const toggleRecallCell = (cellKey: string) => {
    if (!activeRecallMode) return;
    setUnblurredCells((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey],
    }));
  };

  const filteredDrugs = DRUG_STUDY_DATA.filter((drug) => {
    const matchesClass =
      filterClass === 'All' ||
      drug.drugClass.toLowerCase().includes(filterClass.toLowerCase());
    const matchesSearch =
      drug.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.drugClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.sideEffects.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.interventions.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Calculate statistics for active recall
  const totalRecallCells = filteredDrugs.length * 3;
  const revealedCount = useMemo(() => {
    let count = 0;
    filteredDrugs.forEach((d) => {
      if (unblurredCells[`${d.id}-moa`]) count++;
      if (unblurredCells[`${d.id}-se`]) count++;
      if (unblurredCells[`${d.id}-int`]) count++;
    });
    return count;
  }, [filteredDrugs, unblurredCells]);

  const revealAllCells = () => {
    const allRevealed: Record<string, boolean> = {};
    filteredDrugs.forEach((d) => {
      allRevealed[`${d.id}-moa`] = true;
      allRevealed[`${d.id}-se`] = true;
      allRevealed[`${d.id}-int`] = true;
    });
    setUnblurredCells(allRevealed);
  };

  const reblurAllCells = () => {
    setUnblurredCells({});
  };

  return (
    <div id="tab-5-drug-study" className="w-full space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
              Core Pharmacology • Horizontal Matrix
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
            Oncology Pharmacology & Active Recall Study
          </h2>
          <p className="text-xs sm:text-sm text-[var(--subtle)] mt-1">
            Full-width flat pharmacology matrix with touch-friendly Active Recall blur mode for MOA, Side Effects, and Interventions.
          </p>
        </div>

        {/* Active Recall Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-toggle-active-recall"
            onClick={() => {
              const nextMode = !activeRecallMode;
              setActiveRecallMode(nextMode);
              if (!nextMode) setUnblurredCells({});
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
              activeRecallMode
                ? 'text-white scale-105'
                : 'border border-black/5 bg-[var(--card-bg)] text-[var(--text-main)] hover:bg-black/5'
            }`}
            style={activeRecallMode ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' } : {}}
          >
            {activeRecallMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>Active Recall: {activeRecallMode ? 'ENABLED (Blurred)' : 'DISABLED'}</span>
          </button>
        </div>
      </div>

      {/* Mode Instruction Banner */}
      {activeRecallMode && (
        <div
          className="p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-fadeIn"
          style={{
            background: 'rgba(236, 91, 56, 0.1)',
            border: '1px solid rgba(236, 91, 56, 0.25)',
            color: 'var(--text-main)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--accent)' }} />
            <span>
              <strong style={{ color: 'var(--accent)' }}>Active Recall Enabled:</strong> MOA, Side Effects, and Interventions are blurred.
              Click or tap any blurred cell to reveal it and test your pharmacology recall!
              <span className="ml-2 font-semibold px-2 py-0.5 rounded-md bg-black/5 border border-black/5 inline-block">
                {revealedCount} of {totalRecallCells} revealed
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              id="btn-reveal-all-cells"
              onClick={revealAllCells}
              className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-black/5 hover:bg-black/10 transition-colors cursor-pointer"
              style={{ color: 'var(--text-main)' }}
            >
              Reveal all
            </button>
            <button
              type="button"
              id="btn-reblur-all-cells"
              onClick={reblurAllCells}
              className="text-[11px] font-bold px-2.5 py-1 rounded-md text-white transition-opacity hover:opacity-90 cursor-pointer flex items-center gap-1"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <RotateCcw className="w-3 h-3" />
              Re-blur all
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[var(--subtle)] shrink-0" />
          {classes.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => setFilterClass(cls)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterClass === cls
                  ? 'text-white font-bold shadow-xs'
                  : 'border border-black/5 bg-[var(--card-bg)] text-[var(--text-main)] hover:bg-black/5'
              }`}
              style={filterClass === cls ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' } : {}}
            >
              {cls}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search drug, toxicity, intervention..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-black/10 bg-[var(--card-bg)] text-xs text-[var(--text-main)] w-full sm:w-64 focus:outline-hidden focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>

      {/* Flat Full-Width Horizontal Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-lg border border-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1200px]">
            {/* 8 Required Headers */}
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02] text-[var(--text-main)]">
                <th className="p-3.5 font-extrabold w-52">Drug Name / Class</th>
                <th className="p-3.5 font-extrabold w-36">Dose / Route</th>
                <th className="p-3.5 font-extrabold w-56">
                  <span className="flex items-center gap-1.5">
                    MOA
                    {activeRecallMode && <span className="text-[10px] font-normal text-[var(--accent)]">(Recall)</span>}
                  </span>
                </th>
                <th className="p-3.5 font-extrabold w-48">Indications</th>
                <th className="p-3.5 font-extrabold w-44">Contraindications</th>
                <th className="p-3.5 font-extrabold w-60">
                  <span className="flex items-center gap-1.5">
                    Side Effects
                    {activeRecallMode && <span className="text-[10px] font-normal text-[var(--accent)]">(Recall)</span>}
                  </span>
                </th>
                <th className="p-3.5 font-extrabold w-64">
                  <span className="flex items-center gap-1.5">
                    Interventions
                    {activeRecallMode && <span className="text-[10px] font-normal text-[var(--accent)]">(Recall)</span>}
                  </span>
                </th>
                <th className="p-3.5 font-extrabold w-60">Rationales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-[var(--text-main)]">
              {filteredDrugs.map((drug) => {
                const moaKey = `${drug.id}-moa`;
                const seKey = `${drug.id}-se`;
                const intKey = `${drug.id}-int`;

                const isMoaBlurred = activeRecallMode && !unblurredCells[moaKey];
                const isSeBlurred = activeRecallMode && !unblurredCells[seKey];
                const isIntBlurred = activeRecallMode && !unblurredCells[intKey];

                return (
                  <tr key={drug.id} className="hover:bg-black/[0.02] transition-colors">
                    {/* 1. Drug Name / Class */}
                    <td className="p-3.5 align-top">
                      <div className="font-extrabold text-sm text-[var(--text-main)]">
                        {drug.drugName}
                      </div>
                      <div className="text-[10px] font-semibold text-[var(--accent)] mt-0.5">
                        {drug.drugClass}
                      </div>
                      <span className="slide-ref inline-block mt-2">
                        [Page {drug.sourceSlide}]
                      </span>
                    </td>

                    {/* 2. Dose / Route */}
                    <td className="p-3.5 align-top">
                      <div className="font-semibold text-xs bg-[var(--border-color)]/30 p-2 rounded-lg border border-[var(--border-color)]">
                        {drug.doseRoute}
                      </div>
                    </td>

                    {/* 3. MOA (Active Recallable) */}
                    <td className="p-3.5 align-top">
                      {activeRecallMode ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleRecallCell(moaKey)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleRecallCell(moaKey);
                            }
                          }}
                          className={`active-recall-container p-2.5 rounded-lg transition-all ${
                            isMoaBlurred ? 'is-blurred select-none' : 'is-revealed'
                          }`}
                          title={isMoaBlurred ? 'Click to reveal MOA' : 'Click to hide MOA'}
                        >
                          <div className={isMoaBlurred ? 'recall-blurred-text' : 'recall-revealed-text'}>
                            <p className="text-xs leading-relaxed">{drug.moa}</p>
                          </div>
                          {isMoaBlurred ? (
                            <div className="absolute inset-0 flex items-center justify-center p-1">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm transition-transform hover:scale-105"
                                style={{ backgroundColor: 'var(--accent)' }}
                              >
                                <Eye className="w-3 h-3" />
                                Reveal MOA
                              </span>
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--subtle)] border-t border-black/5 pt-1">
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Revealed
                              </span>
                              <span className="underline hover:opacity-80 cursor-pointer" style={{ color: 'var(--accent)' }}>
                                Re-hide
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2">
                          <p className="text-xs leading-relaxed">{drug.moa}</p>
                        </div>
                      )}
                    </td>

                    {/* 4. Indications */}
                    <td className="p-3.5 align-top text-xs leading-relaxed">
                      {drug.indications}
                    </td>

                    {/* 5. Contraindications */}
                    <td className="p-3.5 align-top text-xs leading-relaxed">
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 font-medium">
                        {drug.contraindications}
                      </div>
                    </td>

                    {/* 6. Side Effects (Active Recallable) */}
                    <td className="p-3.5 align-top">
                      {activeRecallMode ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleRecallCell(seKey)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleRecallCell(seKey);
                            }
                          }}
                          className={`active-recall-container p-2.5 rounded-lg transition-all ${
                            isSeBlurred ? 'is-blurred select-none' : 'is-revealed'
                          }`}
                          title={isSeBlurred ? 'Click to reveal Side Effects' : 'Click to hide Side Effects'}
                        >
                          <div className={isSeBlurred ? 'recall-blurred-text' : 'recall-revealed-text'}>
                            <p className="text-xs leading-relaxed font-medium">{drug.sideEffects}</p>
                          </div>
                          {isSeBlurred ? (
                            <div className="absolute inset-0 flex items-center justify-center p-1">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm transition-transform hover:scale-105"
                                style={{ backgroundColor: 'var(--accent)' }}
                              >
                                <Eye className="w-3 h-3" />
                                Reveal Toxicities
                              </span>
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--subtle)] border-t border-black/5 pt-1">
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Revealed
                              </span>
                              <span className="underline hover:opacity-80 cursor-pointer" style={{ color: 'var(--accent)' }}>
                                Re-hide
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2">
                          <p className="text-xs leading-relaxed font-medium">{drug.sideEffects}</p>
                        </div>
                      )}
                    </td>

                    {/* 7. Interventions (Active Recallable) */}
                    <td className="p-3.5 align-top">
                      {activeRecallMode ? (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleRecallCell(intKey)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleRecallCell(intKey);
                            }
                          }}
                          className={`active-recall-container p-2.5 rounded-lg transition-all ${
                            isIntBlurred ? 'is-blurred select-none' : 'is-revealed'
                          }`}
                          title={isIntBlurred ? 'Click to reveal Interventions' : 'Click to hide Interventions'}
                        >
                          <div className={isIntBlurred ? 'recall-blurred-text' : 'recall-revealed-text'}>
                            <p className="text-xs leading-relaxed">{drug.interventions}</p>
                          </div>
                          {isIntBlurred ? (
                            <div className="absolute inset-0 flex items-center justify-center p-1">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm transition-transform hover:scale-105"
                                style={{ backgroundColor: 'var(--accent)' }}
                              >
                                <Eye className="w-3 h-3" />
                                Reveal Interventions
                              </span>
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--subtle)] border-t border-black/5 pt-1">
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Revealed
                              </span>
                              <span className="underline hover:opacity-80 cursor-pointer" style={{ color: 'var(--accent)' }}>
                                Re-hide
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2">
                          <p className="text-xs leading-relaxed">{drug.interventions}</p>
                        </div>
                      )}
                    </td>

                    {/* 8. Rationales */}
                    <td className="p-3.5 align-top text-xs leading-relaxed">
                      <div
                        className="p-2.5 rounded-lg text-xs"
                        style={{
                          background: 'rgba(168, 164, 146, 0.12)',
                          borderLeft: '3px solid #A8A492',
                        }}
                      >
                        {drug.rationales}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

