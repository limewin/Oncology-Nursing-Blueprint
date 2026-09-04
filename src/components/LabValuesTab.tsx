import React, { useState } from 'react';
import { Layers, AlertCircle, Sparkles, Filter } from 'lucide-react';
import { LAB_VALUES_DATA } from '../data/oncologyData';
import { LabValueItem } from '../types';

export const LabValuesTab: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Hematology & Bone Marrow Nadir',
    'Electrolytes & Emergencies',
    'Tumor Lysis Syndrome',
    'Nutrition & Cachexia (CACS)',
  ];

  const filteredLabs = LAB_VALUES_DATA.filter((lab) => {
    const matchesCat =
      filterCategory === 'All' ||
      lab.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch =
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.clinicalSignificance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.oncologyContext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate indicator position percentage across Low - Normal - High spectrum
  const getMarkerPosition = (lab: LabValueItem): number => {
    const range = lab.maxSpectrum - lab.minSpectrum;
    if (range <= 0) return 50;
    const rawPercent = ((lab.typicalClinicalValue - lab.minSpectrum) / range) * 100;
    return Math.max(8, Math.min(92, rawPercent));
  };

  const getZoneLabel = (lab: LabValueItem): string => {
    if (lab.typicalClinicalValue < lab.lowThreshold) return 'Low (Nadir)';
    if (lab.typicalClinicalValue > lab.highThreshold) return 'High (Critical)';
    return 'Normal Range';
  };

  return (
    <div id="tab-3-lab-values" className="w-full space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
              Core Reference • Spectrum Diagnostics
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
            Clinical Laboratory Spectrum & Critical Thresholds
          </h2>
          <p className="text-xs sm:text-sm text-[var(--subtle)] mt-1">
            Edge-to-edge diagnostic parameters with pure CSS visual spectrum bars (Low → Normal → High) and nadir safety indices.
          </p>
        </div>

        {/* Search Control */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search lab, nadir, or panic sign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--text-main)] w-56 sm:w-72 focus:outline-hidden focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-[var(--subtle)] shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat
                ? 'text-white font-bold shadow-xs'
                : 'border border-black/5 bg-[var(--card-bg)] text-[var(--text-main)] hover:bg-black/5'
            }`}
            style={
              filterCategory === cat
                ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Edge-to-Edge Table Card */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02] text-[var(--text-main)]">
                <th className="p-4 font-extrabold w-48">Lab Parameter & Source</th>
                <th className="p-4 font-extrabold w-44">Reference Range</th>
                <th className="p-4 font-extrabold w-64">Visual Spectrum (CSS)</th>
                <th className="p-4 font-extrabold w-52">Critical Panic Alert</th>
                <th className="p-4 font-extrabold">Clinical Significance & Oncology Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-[var(--text-main)]">
              {filteredLabs.map((lab) => {
                const markerPos = getMarkerPosition(lab);
                const zoneLabel = getZoneLabel(lab);

                const hasCritical =
                  lab.criticalLowThreshold !== undefined ||
                  lab.criticalHighThreshold !== undefined;

                return (
                  <tr
                    key={lab.id}
                    className="hover:bg-black/[0.02] transition-colors"
                  >
                    {/* Lab Name + Badge */}
                    <td className="p-4 align-top">
                      <div className="font-extrabold text-sm text-[var(--text-main)]">{lab.name}</div>
                      <div className="text-[10px] text-[var(--subtle)] mb-2">{lab.category}</div>
                      <span className="slide-ref">
                        [Page {lab.sourceSlide}]
                      </span>
                    </td>

                    {/* Reference Range */}
                    <td className="p-4 align-top">
                      <div className="font-bold text-xs bg-black/5 px-2.5 py-1.5 rounded-lg inline-block border border-black/5 text-[var(--text-main)]">
                        {lab.normalRangeText}
                      </div>
                      <div className="text-[10px] text-[var(--subtle)] mt-1 font-mono">
                        Unit: {lab.unit}
                      </div>
                    </td>

                    {/* CSS Visual Spectrum Bar - Geometric Balance Pattern */}
                    <td className="p-4 align-top">
                      <div className="space-y-1.5 w-full max-w-xs">
                        <div className="flex justify-between items-center text-[10px] font-semibold text-[var(--text-main)] mb-1">
                          <span>Visual Spectrum</span>
                          <span style={{ color: 'var(--accent)' }}>Target Clinical</span>
                        </div>

                        {/* Geometric Spectrum Track: Low (Stone 0.35) -> Normal (Stone 0.85) -> High (Terracotta 0.75) */}
                        <div
                          className="h-4 w-full rounded-full relative flex overflow-hidden border border-black/5"
                          style={{ background: '#EEEEEE' }}
                        >
                          <div className="flex-1" style={{ background: '#A8A492', opacity: 0.35 }} />
                          <div className="flex-[2]" style={{ background: '#A8A492', opacity: 0.85 }} />
                          <div className="flex-1" style={{ background: '#EC5B38', opacity: 0.75 }} />
                          {/* Spectrum Pin Indicator */}
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-white shadow-sm ring-1 ring-black/10 transition-all duration-500"
                            style={{ left: `${markerPos}%` }}
                          />
                        </div>

                        <div className="flex justify-between text-[10px] text-[var(--subtle)] font-mono">
                          <span>Low</span>
                          <span>Normal</span>
                          <span>High</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-[var(--accent)]">
                            Typical: {lab.typicalClinicalValue} ({zoneLabel})
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Panic / Nadir Alert */}
                    <td className="p-4 align-top">
                      {hasCritical ? (
                        <div
                          className="p-3 rounded-xl text-xs font-semibold text-[var(--text-main)] flex items-start gap-2"
                          style={{
                            background: 'rgba(236, 91, 56, 0.1)',
                            border: '1px solid rgba(236, 91, 56, 0.25)',
                          }}
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                          <div>
                            <span className="font-extrabold block" style={{ color: 'var(--accent)' }}>
                              Critical Panic Alert:
                            </span>
                            <span className="text-[11px] leading-tight">
                              {lab.criticalLowThreshold !== undefined &&
                                `< ${lab.criticalLowThreshold} ${lab.unit} `}
                              {lab.criticalHighThreshold !== undefined &&
                                `> ${lab.criticalHighThreshold} ${lab.unit}`}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-[var(--subtle)] italic">
                          Standard oncologic monitoring range.
                        </div>
                      )}
                    </td>

                    {/* Clinical Significance & Oncology Context */}
                    <td className="p-4 align-top space-y-2 text-xs leading-relaxed">
                      <p className="text-[var(--text-main)] font-medium">{lab.clinicalSignificance}</p>
                      <div
                        className="text-[11px] text-[var(--subtle)] p-2.5 rounded-lg"
                        style={{
                          background: 'rgba(168, 164, 146, 0.12)',
                          borderLeft: '3px solid #A8A492',
                        }}
                      >
                        <strong className="text-[var(--text-main)]">Oncology Nursing Context: </strong>
                        {lab.oncologyContext}
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
