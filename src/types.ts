export type ThemeId = 'geometric' | 'stone' | 'charcoal' | 'pastel' | 'sunset' | 'powder';

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  topicsCovered: string[];
  questionsAnswered: number;
  correctCount?: number;
  accuracy: number; // 0-100
  timeSpentMinutes: number;
}

export interface LifetimeStats {
  totalQuestions: number;
  correctAnswers: number;
  lifetimeAccuracy: number;
  strengths: string[];
  weaknesses: string[];
}

export interface NclexQuestion {
  id: string;
  stem: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  sourceSlide: number;
}

export interface MnemonicItem {
  acronym: string;
  title: string;
  breakdown: { letter: string; meaning: string }[];
  clinicalSignificance: string;
}

export interface ClinicalTopic {
  id: string;
  title: string;
  subtitle: string;
  sourceSlide: number;
  category: string;
  summary: string;
  keyPoints: string[];
  detailedSections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      type: 'warning' | 'alert' | 'clinical_pearl';
      title: string;
      text: string;
    };
  }[];
  graphicId?: string;
  graphicTitle?: string;
  mnemonics: MnemonicItem[];
  miniQuiz: [NclexQuestion, NclexQuestion, NclexQuestion]; // Exactly 3 questions
}

export interface LabValueItem {
  id: string;
  name: string;
  category: string;
  normalRangeText: string;
  unit: string;
  minSpectrum: number;
  maxSpectrum: number;
  lowThreshold: number;
  highThreshold: number;
  criticalLowThreshold?: number;
  criticalHighThreshold?: number;
  typicalClinicalValue: number; // For demonstration indicator dot
  clinicalSignificance: string;
  oncologyContext: string;
  sourceSlide: number;
}

export interface ClinicalStepIntervention {
  id: string;
  stepNumber: number;
  title: string;
  phase: string;
  keyAction: string;
  priorityLevel: 'Immediate' | 'Priority' | 'Ongoing Assessment';
  detailedProcedure: string[];
  clinicalRationale: string;
  redFlagSigns: string[];
  sourceSlide: number;
}

export interface DrugStudyItem {
  id: string;
  drugName: string;
  drugClass: string;
  doseRoute: string;
  moa: string;
  indications: string;
  contraindications: string;
  sideEffects: string;
  interventions: string;
  rationales: string;
  sourceSlide: number;
}

export interface TestBankOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  rationale: string;
  sourcePage: number;
}

export interface TestBankQuestion {
  id: number;
  type: 'standard' | 'ngn' | 'math';
  category: string;
  sourceSlide: number;
  stem: string;
  dxChart?: {
    patientInfo: {
      age: number;
      gender: string;
      diagnosis: string;
      codeStatus: string;
      allergies: string;
    };
    vitalSigns?: {
      temp: string;
      bp: string;
      hr: string;
      rr: string;
      spo2: string;
    };
    clinicalNotes?: string;
    labResults?: { test: string; value: string; reference: string }[];
  };
  mathFormulaNotes?: string;
  options: TestBankOption[];
}

export interface TestBankLogEntry {
  questionId: number;
  selectedOption: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  date: string;
  topic: string;
  timestamp: number;
}

