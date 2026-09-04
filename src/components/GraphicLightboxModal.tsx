import React from 'react';
import { X, ZoomIn, Info } from 'lucide-react';

interface GraphicLightboxModalProps {
  graphicId: string | null;
  graphicTitle?: string;
  onClose: () => void;
}

export const GraphicLightboxModal: React.FC<GraphicLightboxModalProps> = ({
  graphicId,
  graphicTitle,
  onClose,
}) => {
  if (!graphicId) return null;

  const renderGraphicContent = () => {
    switch (graphicId) {
      case 'trajectory-graphic':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[70vh] select-none">
            <defs>
              <linearGradient id="trajGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.8" />
                <stop offset="33%" stopColor="#0284C7" stopOpacity="0.8" />
                <stop offset="66%" stopColor="#EC5B38" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect width="900" height="450" fill="#0B132B" rx="16" />
            <text x="450" y="45" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">
              The Cancer Care Trajectory Continuum (Page 2)
            </text>
            <text x="450" y="70" fill="#94A3B8" fontSize="13" textAnchor="middle">
              Specialized Oncology Nursing: The Trajectory Constant
            </text>

            {/* Trajectory Arrow */}
            <path d="M 80 200 L 780 200" stroke="url(#trajGrad)" strokeWidth="12" strokeLinecap="round" />
            <polygon points="800,200 770,185 770,215" fill="#7C3AED" />

            {/* Stage 1: Prevention */}
            <g transform="translate(100, 130)">
              <circle cx="0" cy="70" r="18" fill="#2E7D32" stroke="#FFFFFF" strokeWidth="3" />
              <text x="0" y="35" fill="#4ADE80" fontSize="14" fontWeight="bold" textAnchor="middle">Phase 1</text>
              <text x="0" y="15" fill="#FFFFFF" fontSize="13" textAnchor="middle">Prevention & Detection</text>
              <rect x="-80" y="105" width="160" height="75" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="-70" y="125" fill="#CBD5E1" fontSize="11">• Primary Vaccines (HPV/HBV)</text>
              <text x="-70" y="145" fill="#CBD5E1" fontSize="11">• ACS Screening Guidelines</text>
              <text x="-70" y="165" fill="#CBD5E1" fontSize="11">• Genetic Risk Counseling</text>
            </g>

            {/* Stage 2: Diagnostic */}
            <g transform="translate(320, 130)">
              <circle cx="0" cy="70" r="18" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
              <text x="0" y="35" fill="#38BDF8" fontSize="14" fontWeight="bold" textAnchor="middle">Phase 2</text>
              <text x="0" y="15" fill="#FFFFFF" fontSize="13" textAnchor="middle">Diagnostic Evaluation</text>
              <rect x="-80" y="105" width="160" height="75" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="-70" y="125" fill="#CBD5E1" fontSize="11">• Biopsy & Pathology</text>
              <text x="-70" y="145" fill="#CBD5E1" fontSize="11">• TNM Anatomic Staging</text>
              <text x="-70" y="165" fill="#CBD5E1" fontSize="11">• Histopathologic Grading</text>
            </g>

            {/* Stage 3: Treatment */}
            <g transform="translate(540, 130)">
              <circle cx="0" cy="70" r="18" fill="#EC5B38" stroke="#FFFFFF" strokeWidth="3" />
              <text x="0" y="35" fill="#FB923C" fontSize="14" fontWeight="bold" textAnchor="middle">Phase 3</text>
              <text x="0" y="15" fill="#FFFFFF" fontSize="13" textAnchor="middle">Multimodal Treatment</text>
              <rect x="-80" y="105" width="160" height="75" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="-70" y="125" fill="#CBD5E1" fontSize="11">• Surgery & Radiation</text>
              <text x="-70" y="145" fill="#CBD5E1" fontSize="11">• Cytotoxic Chemotherapy</text>
              <text x="-70" y="165" fill="#CBD5E1" fontSize="11">• Nadir & Toxicity Care</text>
            </g>

            {/* Stage 4: Survivorship */}
            <g transform="translate(750, 130)">
              <circle cx="0" cy="70" r="18" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="3" />
              <text x="0" y="35" fill="#C084FC" fontSize="14" fontWeight="bold" textAnchor="middle">Phase 4</text>
              <text x="0" y="15" fill="#FFFFFF" fontSize="13" textAnchor="middle">Survivorship / End-of-Life</text>
              <rect x="-80" y="105" width="160" height="75" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="-70" y="125" fill="#CBD5E1" fontSize="11">• Palliative Symptom Care</text>
              <text x="-70" y="145" fill="#CBD5E1" fontSize="11">• Secondary Cancer Watch</text>
              <text x="-70" y="165" fill="#CBD5E1" fontSize="11">• Smooth Hospice Transition</text>
            </g>

            {/* Bottom Constant Banner */}
            <rect x="100" y="360" width="700" height="55" rx="10" fill="#15803D" fillOpacity="0.25" stroke="#22C55E" strokeWidth="1.5" />
            <text x="450" y="392" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">
              The Trajectory Constant: Specialized nursing care is the ONLY intervention provided continuously across this entire continuum.
            </text>
          </svg>
        );

      case 'cellular-matrix-graphic':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[70vh] select-none">
            <rect width="900" height="450" fill="#0F172A" rx="16" />
            <text x="450" y="45" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">
              The Cellular Matrix: Benign vs. Malignant (Page 3)
            </text>

            {/* Benign Column */}
            <rect x="50" y="75" width="380" height="340" rx="12" fill="#1E293B" stroke="#059669" strokeWidth="2" />
            <text x="240" y="110" fill="#10B981" fontSize="18" fontWeight="bold" textAnchor="middle">BENIGN NEOPLASM</text>
            <circle cx="240" cy="180" r="45" fill="#065F46" stroke="#34D399" strokeWidth="4" strokeDasharray="6,3" />
            <circle cx="240" cy="180" r="18" fill="#10B981" />
            <text x="240" y="245" fill="#A7F3D0" fontSize="13" fontWeight="bold" textAnchor="middle">Well-Differentiated • Encapsulated</text>

            <g transform="translate(75, 275)" fill="#CBD5E1" fontSize="12">
              <text y="0">• Growth: Expands radially; remains in capsule</text>
              <text y="24">• Contact Inhibition: Fully preserved</text>
              <text y="48">• Metastasis: Zero distant seeding</text>
              <text y="72">• Systemic Effects: Localized pressure only</text>
            </g>

            {/* Malignant Column */}
            <rect x="470" y="75" width="380" height="340" rx="12" fill="#1E293B" stroke="#DC2626" strokeWidth="2" />
            <text x="660" y="110" fill="#EF4444" fontSize="18" fontWeight="bold" textAnchor="middle">MALIGNANT NEOPLASM</text>
            <path
              d="M 640 140 Q 670 120, 690 150 T 710 190 T 670 220 T 620 200 T 610 160 Z"
              fill="#7F1D1D"
              stroke="#F87171"
              strokeWidth="3"
            />
            {/* Irregular Nuclei */}
            <circle cx="650" cy="170" r="14" fill="#EF4444" />
            <circle cx="675" cy="185" r="9" fill="#B91C1C" />
            <circle cx="635" cy="190" r="8" fill="#B91C1C" />
            <text x="660" y="245" fill="#FECACA" fontSize="13" fontWeight="bold" textAnchor="middle">Anaplasia • Infiltrative Invasiveness</text>

            <g transform="translate(495, 275)" fill="#CBD5E1" fontSize="12">
              <text y="0">• Growth: Infiltrates tissue, breaches basement membrane</text>
              <text y="24">• Contact Inhibition: Overcomes contact inhibition</text>
              <text y="48">• Metastasis: Invades blood & lymph to seed distant organs</text>
              <text y="72">• Systemic Effects: Severe CACS, anemia, metabolic drain</text>
            </g>
          </svg>
        );

      case 'carcinogenesis-graphic':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[70vh] select-none">
            <rect width="900" height="450" fill="#0A1128" rx="16" />
            <text x="450" y="40" fill="#FFFFFF" fontSize="19" fontWeight="bold" textAnchor="middle">
              The Carcinogenesis Cascade & Genetic Control (Pages 4 & 5)
            </text>

            {/* 3 Stages */}
            <g transform="translate(60, 75)">
              {/* Initiation */}
              <rect x="0" y="0" width="240" height="150" rx="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <text x="120" y="30" fill="#38BDF8" fontSize="15" fontWeight="bold" textAnchor="middle">1. INITIATION</text>
              <text x="12" y="60" fill="#E2E8F0" fontSize="11">• Carcinogen alters DNA</text>
              <text x="12" y="80" fill="#E2E8F0" fontSize="11">• Bypasses normal apoptosis</text>
              <text x="12" y="100" fill="#E2E8F0" fontSize="11">• Irreversible cellular damage</text>
              <text x="12" y="130" fill="#94A3B8" fontSize="10" fontStyle="italic">Fail-safe mechanism disabled</text>

              {/* Arrow */}
              <polygon points="255,75 270,75 270,70 285,80 270,90 270,85 255,85" fill="#94A3B8" />

              {/* Promotion */}
              <rect x="295" y="0" width="240" height="150" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
              <text x="415" y="30" fill="#F59E0B" fontSize="15" fontWeight="bold" textAnchor="middle">2. PROMOTION</text>
              <text x="307" y="60" fill="#E2E8F0" fontSize="11">• Co-carcinogen exposure</text>
              <text x="307" y="80" fill="#E2E8F0" fontSize="11">• Proliferation of initiated cells</text>
              <text x="307" y="100" fill="#E2E8F0" fontSize="11">• Long latency period</text>
              <text x="307" y="130" fill="#FCD34D" fontSize="10" fontStyle="italic">Target for primary risk reduction</text>

              {/* Arrow */}
              <polygon points="550,75 565,75 565,70 580,80 565,90 565,85 550,85" fill="#94A3B8" />

              {/* Progression */}
              <rect x="590" y="0" width="240" height="150" rx="10" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
              <text x="710" y="30" fill="#EF4444" fontSize="15" fontWeight="bold" textAnchor="middle">3. PROGRESSION</text>
              <text x="602" y="60" fill="#E2E8F0" fontSize="11">• Malignant cell phenotype</text>
              <text x="602" y="80" fill="#E2E8F0" fontSize="11">• Angiogenesis (VEGF release)</text>
              <text x="602" y="100" fill="#E2E8F0" fontSize="11">• Local tissue invasion</text>
              <text x="602" y="130" fill="#F87171" fontSize="10" fontStyle="italic">Metastasis to distant sites</text>
            </g>

            {/* Gas Pedal vs Brakes Model */}
            <g transform="translate(60, 255)">
              <rect x="0" y="0" width="370" height="160" rx="10" fill="#172554" stroke="#60A5FA" strokeWidth="1.5" />
              <text x="185" y="32" fill="#93C5FD" fontSize="15" fontWeight="bold" textAnchor="middle">
                Proto-Oncogenes: "The Gas Pedal"
              </text>
              <text x="20" y="65" fill="#DBEAFE" fontSize="12">• Examples: KRAS, c-Myc</text>
              <text x="20" y="90" fill="#DBEAFE" fontSize="12">• Normal Role: Pro-mitotic "ON switch" for tissue repair</text>
              <text x="20" y="115" fill="#DBEAFE" fontSize="12">• Mutation: Amplified into oncogene = Gas pedal stuck ON</text>
              <text x="20" y="140" fill="#93C5FD" fontSize="11" fontStyle="italic">Leads to continuous, autonomous proliferation</text>

              <rect x="460" y="0" width="370" height="160" rx="10" fill="#450A0A" stroke="#F87171" strokeWidth="1.5" />
              <text x="645" y="32" fill="#FCA5A5" fontSize="15" fontWeight="bold" textAnchor="middle">
                Tumor Suppressors: "The Brakes"
              </text>
              <text x="480" y="65" fill="#FEE2E2" fontSize="12">• Examples: BRCA1, BRCA2, TP53</text>
              <text x="480" y="90" fill="#FEE2E2" fontSize="12">• Normal Role: "OFF switch" & checkpoint guardian</text>
              <text x="480" y="115" fill="#FEE2E2" fontSize="12">• Mutation: Loss of function = Brakes fail completely</text>
              <text x="480" y="140" fill="#FCA5A5" fontSize="11" fontStyle="italic">Cells cannot stop producing mutant clones</text>
            </g>
          </svg>
        );

      case 'immune-evasion-graphic':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[70vh] select-none">
            <rect width="900" height="450" fill="#0B132B" rx="16" />
            <text x="450" y="45" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">
              Immune Evasion: The Cellular Camouflage (Page 6)
            </text>

            {/* Malignant Cell */}
            <g transform="translate(180, 240)">
              <circle cx="0" cy="0" r="100" fill="#581C87" stroke="#A855F7" strokeWidth="4" />
              <circle cx="0" cy="0" r="45" fill="#3B0764" />
              <text x="0" y="-120" fill="#D8B4FE" fontSize="16" fontWeight="bold" textAnchor="middle">Malignant Neoplasm</text>
              <text x="0" y="5" fill="#F3E8FF" fontSize="13" textAnchor="middle">Tumor Cell</text>

              {/* PD-L1 Ligand protruding */}
              <rect x="95" y="-15" width="50" height="30" rx="6" fill="#F43F5E" />
              <text x="120" y="5" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">PD-L1</text>
            </g>

            {/* Checkpoint receptor bridge */}
            <g transform="translate(450, 240)">
              <rect x="-40" y="-45" width="80" height="90" rx="10" fill="#1E293B" stroke="#E2E8F0" strokeWidth="1" />
              <text x="0" y="-15" fill="#F87171" fontSize="12" fontWeight="bold" textAnchor="middle">LIGAND DOCK</text>
              <text x="0" y="8" fill="#FFFFFF" fontSize="10" textAnchor="middle">PD-L1 binds</text>
              <text x="0" y="24" fill="#FFFFFF" fontSize="10" textAnchor="middle">to PD-1</text>
            </g>

            {/* T-Lymphocyte */}
            <g transform="translate(720, 240)">
              <circle cx="0" cy="0" r="85" fill="#047857" stroke="#34D399" strokeWidth="4" />
              <circle cx="0" cy="0" r="35" fill="#064E3B" />
              <text x="0" y="-105" fill="#6EE7B7" fontSize="16" fontWeight="bold" textAnchor="middle">Cytotoxic T-Lymphocyte</text>
              <text x="0" y="5" fill="#ECFDF5" fontSize="13" textAnchor="middle">T-Cell</text>

              {/* PD-1 Receptor */}
              <rect x="-145" y="-15" width="50" height="30" rx="6" fill="#0284C7" />
              <text x="-120" y="5" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">PD-1</text>
            </g>

            {/* The Effect Banner */}
            <rect x="150" y="380" width="600" height="45" rx="8" fill="#1E1B4B" stroke="#818CF8" />
            <text x="450" y="408" fill="#E0E7FF" fontSize="13" fontWeight="bold" textAnchor="middle">
              The Effect: Induces T-lymphocyte anergy, exhaustion, or apoptosis. The immune system is essentially down-regulated.
            </text>
          </svg>
        );

      case 'cell-cycle-graphic':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[70vh] select-none">
            <rect width="900" height="450" fill="#0B132B" rx="16" />
            <text x="450" y="45" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">
              The Cell Cycle Clock & Rationale for Chemotherapy Cycles (Page 13)
            </text>

            {/* Clock wheel */}
            <g transform="translate(250, 250)">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="140" fill="#1E293B" stroke="#475569" strokeWidth="8" />

              {/* Phase Wedges */}
              {/* G1 */}
              <path d="M 0 0 L 0 -140 A 140 140 0 0 1 140 0 Z" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="2" />
              <text x="50" y="-60" fill="#BAE6FD" fontSize="15" fontWeight="bold">G1 Phase</text>
              <text x="35" y="-40" fill="#E0F2FE" fontSize="10">Organelle duplication</text>

              {/* S Phase */}
              <path d="M 0 0 L 140 0 A 140 140 0 0 1 0 140 Z" fill="#16A34A" fillOpacity="0.4" stroke="#4ADE80" strokeWidth="2" />
              <text x="50" y="60" fill="#BBF7D0" fontSize="15" fontWeight="bold">S Phase</text>
              <text x="30" y="80" fill="#DCFCE7" fontSize="10">DNA replication</text>

              {/* G2 Phase */}
              <path d="M 0 0 L 0 140 A 140 140 0 0 1 -140 0 Z" fill="#D97706" fillOpacity="0.4" stroke="#FBBF24" strokeWidth="2" />
              <text x="-110" y="60" fill="#FDE68A" fontSize="15" fontWeight="bold">G2 Phase</text>
              <text x="-110" y="80" fill="#FEF3C7" fontSize="10">Growth & RNA</text>

              {/* Mitosis */}
              <path d="M 0 0 L -140 0 A 140 140 0 0 1 0 -140 Z" fill="#DC2626" fillOpacity="0.4" stroke="#F87171" strokeWidth="2" />
              <text x="-105" y="-60" fill="#FECACA" fontSize="15" fontWeight="bold">Mitosis (M)</text>
              <text x="-115" y="-40" fill="#FEE2E2" fontSize="10">Active cell division</text>

              {/* Center G0 */}
              <circle cx="0" cy="0" r="35" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
              <text x="0" y="5" fill="#E2E8F0" fontSize="13" fontWeight="bold" textAnchor="middle">G0</text>
              <text x="0" y="20" fill="#94A3B8" fontSize="9" textAnchor="middle">Resting</text>
            </g>

            {/* Rationale Panel */}
            <g transform="translate(470, 90)">
              <rect width="380" height="320" rx="12" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
              <text x="190" y="35" fill="#38BDF8" fontSize="16" fontWeight="bold" textAnchor="middle">
                The "Why" Behind Chemotherapy Cycles
              </text>

              <g transform="translate(20, 65)" fill="#E2E8F0" fontSize="13">
                <text y="0" fontWeight="bold" fill="#FCD34D">• Fractional Cell Kill Hypothesis:</text>
                <text y="24" fill="#CBD5E1">Single doses kill a percentage (20–99%) of cells,</text>
                <text y="44" fill="#CBD5E1">not an absolute number.</text>

                <text y="84" fontWeight="bold" fill="#F87171">• G0 Phase Survival:</text>
                <text y="108" fill="#CBD5E1">Non-dividing cells survive the initial strike.</text>

                <text y="148" fontWeight="bold" fill="#4ADE80">• Nursing Insight:</text>
                <text y="172" fill="#CBD5E1">Repeated cycles are mandatory to destroy these</text>
                <text y="192" fill="#CBD5E1">'resting' cells once they re-enter active division.</text>

                <text y="228" fill="#94A3B8" fontSize="11" fontStyle="italic">Healthy tissues recover during planned intervals.</text>
              </g>
            </g>
          </svg>
        );

      case 'emergencies-graphic':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[70vh] select-none">
            <rect width="900" height="450" fill="#0A0F1D" rx="16" />
            <text x="450" y="40" fill="#FFFFFF" fontSize="20" fontWeight="bold" textAnchor="middle">
              Oncologic Emergencies: The Red Flag Dashboard (Page 16)
            </text>

            <g transform="translate(50, 70)">
              {/* SVCS */}
              <rect x="0" y="0" width="380" height="160" rx="10" fill="#1E293B" stroke="#EC5B38" strokeWidth="2" />
              <text x="20" y="30" fill="#EC5B38" fontSize="15" fontWeight="bold">Superior Vena Cava Syndrome (SVCS)</text>
              <text x="20" y="60" fill="#CBD5E1" fontSize="12" fontWeight="bold">Mechanism: SVC compression by tumor/thrombus</text>
              <text x="20" y="90" fill="#F87171" fontSize="12" fontWeight="bold">Red Flags:</text>
              <text x="20" y="112" fill="#E2E8F0" fontSize="11">• Dyspnea, facial/periorbital swelling</text>
              <text x="20" y="132" fill="#E2E8F0" fontSize="11">• Engorged jugular veins, collateral chest veins</text>

              {/* Spinal Cord Compression */}
              <rect x="420" y="0" width="380" height="160" rx="10" fill="#1E293B" stroke="#EC5B38" strokeWidth="2" />
              <text x="440" y="30" fill="#EC5B38" fontSize="15" fontWeight="bold">Spinal Cord Compression (SCC)</text>
              <text x="440" y="60" fill="#CBD5E1" fontSize="12" fontWeight="bold">Mechanism: Epidural tumor invasion or bone collapse</text>
              <text x="440" y="90" fill="#F87171" fontSize="12" fontWeight="bold">Red Flags:</text>
              <text x="440" y="112" fill="#E2E8F0" fontSize="11">• Radicular back pain worse when lying down</text>
              <text x="440" y="132" fill="#E2E8F0" fontSize="11">• Lower motor weakness, new bowel/bladder dysfunction</text>

              {/* Hypercalcemia */}
              <rect x="0" y="180" width="380" height="160" rx="10" fill="#1E293B" stroke="#EC5B38" strokeWidth="2" />
              <text x="20" y="210" fill="#EC5B38" fontSize="15" fontWeight="bold">Hypercalcemia of Malignancy</text>
              <text x="20" y="240" fill="#CBD5E1" fontSize="12" fontWeight="bold">Mechanism: Bone breakdown or PTHrP (Ca &gt; 10.5 mg/dL)</text>
              <text x="20" y="270" fill="#F87171" fontSize="12" fontWeight="bold">Red Flags:</text>
              <text x="20" y="292" fill="#E2E8F0" fontSize="11">• Confusion, lethargy, hyporeflexia</text>
              <text x="20" y="312" fill="#E2E8F0" fontSize="11">• Extreme thirst, polyuria, cardiac dysrhythmias</text>

              {/* Tumor Lysis Syndrome */}
              <rect x="420" y="180" width="380" height="160" rx="10" fill="#1E293B" stroke="#EC5B38" strokeWidth="2" />
              <text x="440" y="210" fill="#EC5B38" fontSize="15" fontWeight="bold">Tumor Lysis Syndrome (TLS)</text>
              <text x="440" y="240" fill="#CBD5E1" fontSize="12" fontWeight="bold">Mechanism: Massive tumor destruction spilling ions</text>
              <text x="440" y="270" fill="#F87171" fontSize="12" fontWeight="bold">Red Flags (P-U-K-Ca):</text>
              <text x="440" y="292" fill="#E2E8F0" fontSize="11">• Hyperkalemia (fatal dysrhythmias), Uric acid spikes</text>
              <text x="440" y="312" fill="#E2E8F0" fontSize="11">• Hyperphosphatemia, Hypocalcemia &rarr; Acute Kidney Injury</text>
            </g>
          </svg>
        );

      default:
        return (
          <div className="p-12 text-center text-slate-300">
            <Info className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
            <p className="text-lg font-semibold">Clinical Concept Diagram</p>
            <p className="text-sm text-slate-400 mt-2">Diagram details correspond to clinical oncology study modules.</p>
          </div>
        );
    }
  };

  return (
    <div
      id="graphic-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl border border-[var(--border-color)] bg-[#0B132B] shadow-2xl overflow-hidden p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {graphicTitle || 'Clinical Graphic Illustration'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-center overflow-auto rounded-xl bg-black/40 p-2 sm:p-4">
          {renderGraphicContent()}
        </div>

        <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
          <span>High-Resolution Clinical Oncology Pathway Illustration</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition-opacity"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
