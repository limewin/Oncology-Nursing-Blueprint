import {
  ClinicalTopic,
  LabValueItem,
  ClinicalStepIntervention,
  DrugStudyItem,
  LifetimeStats,
  DailyStudyLog,
} from '../types';

export const INITIAL_LIFETIME_STATS: LifetimeStats = {
  totalQuestions: 0,
  correctAnswers: 0,
  lifetimeAccuracy: 0,
  strengths: ['Pathophysiology & Cellular Matrix', 'ACS Screening Timelines'],
  weaknesses: ['Tumor Lysis Syndrome Electrolyte Shifts', 'Chemotherapy Vesicant Extravasation'],
};

export const INITIAL_DAILY_LOG: DailyStudyLog = {
  date: new Date().toISOString().split('T')[0],
  topicsCovered: ['Pathophysiology', 'Oncologic Emergencies', 'TNM Staging'],
  questionsAnswered: 0,
  accuracy: 0,
  timeSpentMinutes: 0,
};

export const CLINICAL_TOPICS: ClinicalTopic[] = [
  {
    id: 'topic-1',
    title: 'The Oncology Care Trajectory & Nursing Constant',
    subtitle: 'The 4 Pillars of Specialized Care from Diagnosis to Survivorship',
    sourceSlide: 2,
    category: 'Foundations & Nursing Role',
    summary:
      'Specialized oncology nursing is the singular intervention provided continuously across the complete cancer care trajectory: from primary prevention and early detection to diagnostic staging, acute multimodal therapy, and survivorship or palliative end-of-life care.',
    keyPoints: [
      'The Trajectory Constant: Physicians diagnose pathology; oncology nurses treat the whole human response continuously.',
      'Four Essential Roles: Educator & Navigator, Clinical Assessor, Symptom Manager, Holistic Patient Advocate.',
      'Clinical vigilance: Immediate recognition of oncologic flags (e.g. 100.4°F neutropenic fever, mucositis grading, nadir timing).',
      'Palliative integration occurs concurrently with active treatment, not merely in terminal phases.',
    ],
    detailedSections: [
      {
        heading: 'The Continuum of Cancer Care',
        subheading: 'Continuous Navigation Across Clinical Phases',
        paragraphs: [
          'Cancer care is structured as a non-linear trajectory comprising four defined phases: (1) Prevention & Detection, (2) Diagnostic Evaluation, (3) Multimodal Treatment, and (4) Survivorship or End-of-Life care.',
          'While medical, surgical, and radiation oncologists enter and exit during specific intervention windows, specialized oncology nurses remain the constant presence. The nurse coordinates care transitions, interprets complex genetic risks, titrates pharmacotherapies, and safeguards client autonomy.',
        ],
        callout: {
          type: 'clinical_pearl',
          title: 'The Oncology Trajectory Constant',
          text: 'The physician treats the pathology. The oncology nurse treats the human. Holistic advocacy spans fertility preservation prior to gonadotoxic therapy through gentle transition to hospice.',
        },
      },
      {
        heading: 'The Four Pillars of Clinical Practice',
        paragraphs: [
          'Educator & Navigator: Decodes complex genetic test results (BRCA, Lynch syndrome), outlines multi-cycle chemotherapy schedules, and prepares clients for safe home self-care.',
          'Clinical Assessor: Identifies occult complications early, such as detecting a 100.4°F (38.0°C) neutropenic fever, tracking bone marrow nadir, and grading mucositis lesions.',
          'Symptom Manager: Implements evidence-based pain algorithms (WHO 3-step analgesic ladder), oversees anticipatory and acute CINV antiemetics, and delivers complex wound care for fungating cutaneous lesions.',
          'Holistic Advocate: Facilitates end-of-life decisions, assists with body image restructuring following alopecia or disfiguring surgery, and promotes psychosocial resilience.',
        ],
      },
    ],
    graphicId: 'trajectory-graphic',
    graphicTitle: 'The Cancer Care Trajectory Continuum',
    mnemonics: [
      {
        acronym: 'CARE',
        title: 'The Trajectory Constant Framework',
        breakdown: [
          { letter: 'C', meaning: 'Clinical Assessor (Nadir labs, early fever, toxicities)' },
          { letter: 'A', meaning: 'Advocate & Holistic Supporter (Body image, fertility, hospice)' },
          { letter: 'R', meaning: 'Resource & Navigator (Education, home protocols, transitions)' },
          { letter: 'E', meaning: 'Expert Symptom Manager (Pain ladder, CINV, extravasation)' },
        ],
        clinicalSignificance: 'Highlights the continuous, multi-dimensional presence of oncology nursing across all care phases.',
      },
      {
        acronym: 'TRIP',
        title: 'Trajectory Care Phases',
        breakdown: [
          { letter: 'T', meaning: 'Targeted Prevention & Screening' },
          { letter: 'R', meaning: 'Rigorous Diagnostic Workup & Staging' },
          { letter: 'I', meaning: 'Interventional Multimodal Therapy' },
          { letter: 'P', meaning: 'Palliative, Survivorship & End-of-Life Care' },
        ],
        clinicalSignificance: 'Ensures structured handoffs as clients navigate between treatment modalities and outpatient settings.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-1-1',
        stem: 'An oncology client scheduled for gonadotoxic chemotherapy expresses anxiety regarding future family planning. Which nursing action best exemplifies the nurse’s role as a Holistic Advocate?',
        options: [
          'Reassure the client that cancer treatments rarely cause long-term infertility.',
          'Facilitate a prompt referral for reproductive endocrinology consultation and cryopreservation prior to treatment.',
          'Advise the client to postpone discussion until after achieving complete remission.',
          'Recommend herbal supplements to protect ovarian and testicular tissues during therapy.',
        ],
        correctIndex: 1,
        rationale:
          'Page 18 emphasizes the holistic advocate role in addressing fertility preservation before initiating sterilizing or mutagenic chemotherapy. Delaying discussion until after therapy may lead to irreversible infertility.',
        sourceSlide: 18,
      },
      {
        id: 'mq-1-2',
        stem: 'A client receiving outpatient chemotherapy calls the clinic stating their oral temperature is 100.5°F (38.1°C). The client feels mildly fatigued but denies chills. What is the priority nursing instruction?',
        options: [
          'Take 650 mg of acetaminophen and recheck the temperature in 4 hours.',
          'Proceed immediately to the emergency department or designated oncology urgent center for evaluation.',
          'Increase fluid intake and rest quietly until morning.',
          'Schedule a routine clinic appointment for the following week.',
        ],
        correctIndex: 1,
        rationale:
          'Page 18 notes that in the neutropenic client, an oral temperature >= 100.4°F (38.0°C) is an oncologic emergency indicating neutropenic fever. Antipyretics such as acetaminophen mask fevers and must not delay emergency broad-spectrum antibiotics.',
        sourceSlide: 18,
      },
      {
        id: 'mq-1-3',
        stem: 'Which clinical concept best describes the distinction between medical management and specialized oncology nursing care?',
        options: [
          'Medical care is continuous, whereas nursing care occurs only during acute chemotherapy infusions.',
          'The physician treats the pathology; the oncology nurse treats the human response across the full trajectory.',
          'Oncology nurses focus exclusively on surgical wound management and medication dispension.',
          'Nursing interventions are limited to terminal hospice care without involvement in acute symptom titration.',
        ],
        correctIndex: 1,
        rationale:
          'Page 2 and Page 18 reinforce that specialized nursing care is the only intervention provided continuously across the entire continuum, managing the human physical, psychological, and holistic response.',
        sourceSlide: 2,
      },
    ],
  },
  {
    id: 'topic-2',
    title: 'The Cellular Matrix: Benign vs. Malignant Tumors',
    subtitle: 'Cellular Differentiation, Contact Inhibition, and Infiltration Dynamics',
    sourceSlide: 3,
    category: 'Pathophysiology',
    summary:
      'Understanding cellular differentiation (anaplasia), contact inhibition failure, encapsulating margins, and systemic manifestations provides the pathophysiologic foundation for evaluating malignancy.',
    keyPoints: [
      'Benign Tumors: Well-differentiated cells, expansive encapsulated growth, no distant metastasis, localized effects.',
      'Malignant Tumors: Undifferentiated (anaplasia), infiltrative growth overcoming contact inhibition, hematogenous/lymphatic dissemination.',
      'Metabolic Demands: Malignant tumors outgrow their vascular supply, release damaging enzymes, and cause Cancer-Related Anorexia-Cachexia Syndrome (CACS).',
      'Tissue Destruction: Malignant cells secrete proteases that degrade extracellular matrices, facilitating local invasion.',
    ],
    detailedSections: [
      {
        heading: 'Pathologic Comparison: The Cellular Matrix',
        paragraphs: [
          'Neoplasms are categorized based on cytologic characteristics, growth patterns, and invasive potential.',
          'Benign lesions remain demarcated from surrounding parenchymal tissue by a fibrous pseudocapsule. They grow slowly by expansive radial enlargement without breaching basement membranes.',
          'Conversely, malignant neoplastic cells exhibit anaplasia—loss of cellular differentiation, pleomorphism in size and shape, hyperchromatic enlarged nuclei, and abnormal mitotic figures. They override contact inhibition, the normal regulatory signal that halts proliferation upon physical contact with neighboring cells.',
        ],
        tableData: {
          headers: ['Parameter', 'Benign Neoplasm', 'Malignant Neoplasm'],
          rows: [
            ['Cell Differentiation', 'Well-differentiated, resembles tissue of origin', 'Undifferentiated (Anaplasia), loss of architecture'],
            ['Growth Pattern', 'Slow expansion within fibrous capsule', 'Rapid infiltrative invasion across tissue planes'],
            ['Contact Inhibition', 'Intact contact inhibition', 'Loss of contact inhibition (overcomes cellular boundaries)'],
            ['Metastatic Potential', 'Zero metastasis capability', 'High potential (seeds vascular and lymphatic channels)'],
            ['Systemic Impact', 'Localized compression; rarely systemic', 'Systemic: anemia, profound fatigue, CACS, metabolic drain'],
            ['Tissue Destruction', 'Minimal; damage via pressure atrophy', 'Extensive necrosis, ulceration, enzyme release, hemorrhage'],
          ],
        },
      },
      {
        heading: 'Cancer-Related Anorexia-Cachexia Syndrome (CACS)',
        paragraphs: [
          'Malignant tumors produce pro-inflammatory cytokines, including Tumor Necrosis Factor-alpha (cachectin), Interleukin-1 (IL-1), and Interleukin-6 (IL-6).',
          'These humoral factors alter hypothalamic satiety setpoints and induce skeletal muscle proteolysis and lipolysis. Unlike simple starvation, CACS cannot be reversed by caloric refeeding alone; it requires specialized multimodal nutritional and anti-inflammatory intervention.',
        ],
        callout: {
          type: 'warning',
          title: 'Clinical Distinction from Starvation',
          text: 'Starvation conserves lean muscle mass while oxidizing adipose reserves. CACS preferentially catabolizes skeletal muscle proteins alongside fat stores, resulting in severe asthenia and immunocompromise.',
        },
      },
    ],
    graphicId: 'cellular-matrix-graphic',
    graphicTitle: 'The Cellular Matrix: Benign vs Malignant Cytoarchitecture',
    mnemonics: [
      {
        acronym: 'BENIGN',
        title: 'Hallmarks of Benign Lesions',
        breakdown: [
          { letter: 'B', meaning: 'Border Encapsulated (distinct fibrous capsule)' },
          { letter: 'E', meaning: 'Expands radially without invasion' },
          { letter: 'N', meaning: 'No metastasis to lymph or blood' },
          { letter: 'I', meaning: 'Intact contact inhibition maintained' },
          { letter: 'G', meaning: 'Good differentiation (resembles parent tissue)' },
          { letter: 'N', meaning: 'Non-destructive to surrounding tissue beds' },
        ],
        clinicalSignificance: 'Differentiates benign tumors from destructive malignant lesions on physical assessment and histology.',
      },
      {
        acronym: 'MALIGN',
        title: 'Hallmarks of Malignancy',
        breakdown: [
          { letter: 'M', meaning: 'Metastasizes via blood and lymphatic vessels' },
          { letter: 'A', meaning: 'Anaplasia (poorly differentiated, pleomorphic)' },
          { letter: 'L', meaning: 'Loss of contact inhibition' },
          { letter: 'I', meaning: 'Infiltrates and invades basement membranes' },
          { letter: 'G', meaning: 'Growth of neo-vasculature (Angiogenesis)' },
          { letter: 'N', meaning: 'Nutritional cachexia (CACS) and systemic drain' },
        ],
        clinicalSignificance: 'Rapid clinical recall for identifying invasive malignant traits during pathology review.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-2-1',
        stem: 'A pathology report describes a newly excised solid mass as "anaplastic, pleomorphic cells lacking contact inhibition with microvascular invasion." How should the nurse interpret these findings?',
        options: [
          'The tumor is benign and contained within a fibrous capsule.',
          'The tumor is malignant, poorly differentiated, and highly aggressive.',
          'The tumor is a low-grade hyperplasia that requires watchful waiting.',
          'The tumor exhibits normal cellular differentiation and favorable prognosis.',
        ],
        correctIndex: 1,
        rationale:
          'Page 3 defines anaplasia and loss of contact inhibition as key cytologic markers of malignant transformation that correlate with invasion and poor differentiation.',
        sourceSlide: 3,
      },
      {
        id: 'mq-2-2',
        stem: 'A client with advanced malignancy exhibits profound weight loss, temporal muscle wasting, and severe weakness despite parenteral nutrition. What is the underlying pathophysiologic mechanism?',
        options: [
          'Simple calorie deprivation amenable to carbohydrate boluses.',
          'Cytokine-mediated skeletal muscle proteolysis and lipolysis known as CACS.',
          'Excessive voluntary caloric restriction due to dental caries.',
          'Normal age-related sarcopenia unrelated to neoplastic disease.',
        ],
        correctIndex: 1,
        rationale:
          'Page 3 highlights Cancer-Related Anorexia-Cachexia Syndrome (CACS), driven by pro-inflammatory cytokines that cause accelerated protein degradation and systemic wasting.',
        sourceSlide: 3,
      },
      {
        id: 'mq-2-3',
        stem: 'Which characteristic differentiates benign neoplastic growth from malignant tumor expansion?',
        options: [
          'Benign tumors invade surrounding tissue planes through proteolytic destruction.',
          'Benign tumors expand uniformly within an encapsulated boundary without metastasis.',
          'Benign tumors demonstrate early hematogenous seeding to the liver and lungs.',
          'Benign tumors lack differentiated cell characteristics under light microscopy.',
        ],
        correctIndex: 1,
        rationale:
          'Page 3 establishes that benign neoplasms expand within encapsulated margins without invading adjacent tissues or spreading to distant anatomic sites.',
        sourceSlide: 3,
      },
    ],
  },
  {
    id: 'topic-3',
    title: 'The Carcinogenesis Cascade & Genetic Mutations',
    subtitle: 'Initiation, Promotion, Progression, and the Gas Pedal & Brakes Model',
    sourceSlide: 4,
    category: 'Pathophysiology',
    summary:
      'Carcinogenesis is a multi-step cellular cascade (Initiation -> Promotion -> Progression) governed by genetic alterations in proto-oncogenes (the accelerator) and tumor suppressor genes (the brakes).',
    keyPoints: [
      'Initiation: Irreversible cellular DNA damage by carcinogens; intrinsic repair mechanisms (apoptosis/senescence) are bypassed.',
      'Promotion: Proliferation of initiated cells triggered by co-carcinogens; long latency window; reversible if promoter is eliminated.',
      'Progression: Acquisition of overt malignant phenotype, tumor angiogenesis (VEGF), tissue invasion, and distant seeding.',
      'Gas Pedal Model: Proto-oncogenes (KRAS, c-Myc) mutate into oncogenes, locking cell division into constant "ON".',
      'Brakes Model: Tumor suppressor genes (BRCA1, BRCA2, TP53) experience loss of function, disabling regulatory cell cycle checkpoints.',
    ],
    detailedSections: [
      {
        heading: 'The Three Phases of Carcinogenesis',
        paragraphs: [
          '1. Initiation: Initiating chemical, physical, or viral carcinogens inflict irreversible lesions in cellular DNA. In normal cells, TP53 and repair enzymes prompt DNA repair or initiate programmed cell death (apoptosis). In initiated cells, this protective fail-safe fails.',
          '2. Promotion: Initiated cells are repeatedly exposed to promoting factors (e.g., estrogens, dietary fats, chronic cigarette smoke toxins). Promotion has a prolonged latency period (often decades). Notably, promotional activity is theoretically reversible if promoting exposures cease.',
          '3. Progression: Cells demonstrate chromosomal instability, express vascular endothelial growth factor (VEGF) to develop autonomous blood supplies (angiogenesis), and penetrate basement membranes to metastasize.',
        ],
      },
      {
        heading: 'The "Gas Pedal & Brakes" Genetic Framework',
        paragraphs: [
          'Proto-oncogenes act as cellular "gas pedals." Normally, they produce proteins that drive controlled mitosis during tissue repair. When mutated or amplified (becoming oncogenes such as mutated KRAS or c-Myc), the gas pedal is permanently depressed, generating uncontrolled proliferative signaling.',
          'Tumor Suppressor Genes act as the cellular "brakes." Genes like BRCA1, BRCA2, and TP53 produce gatekeeper proteins that halt the cell cycle at checkpoints (G1/S and G2/M) to verify genomic integrity. When both alleles sustain inactivating mutations (Knudson two-hit hypothesis), the brakes fail, allowing mutated daughter cells to multiply unchecked.',
        ],
        callout: {
          type: 'clinical_pearl',
          title: 'The Genetic Dual-Hit Paradigm',
          text: 'BRCA1/BRCA2 mutation carriers inherit one defective brake. A single somatic hit to the remaining allele is sufficient to trigger unregulated neoplastic progression.',
        },
      },
    ],
    graphicId: 'carcinogenesis-graphic',
    graphicTitle: 'The Carcinogenesis Cascade & Genetic Gas Pedal / Brakes Model',
    mnemonics: [
      {
        acronym: 'IPP',
        title: 'Cascade of Carcinogenesis',
        breakdown: [
          { letter: 'I', meaning: 'Initiation (Irreversible DNA mutation, bypassed apoptosis)' },
          { letter: 'P', meaning: 'Promotion (Proliferation by co-carcinogens, long latency, reversible)' },
          { letter: 'P', meaning: 'Progression (Phenotype of malignancy, angiogenesis, metastasis)' },
        ],
        clinicalSignificance: 'Guides nursing education: smoking cessation during promotion phase halts disease emergence.',
      },
      {
        acronym: 'GAS-BRAKE',
        title: 'Molecular Tumor Genetics',
        breakdown: [
          { letter: 'GAS', meaning: 'Proto-oncogenes (KRAS, c-Myc) = Accelerators locked ON' },
          { letter: 'BRAKE', meaning: 'Tumor Suppressors (BRCA1/2, TP53) = Brakes snapped OFF' },
        ],
        clinicalSignificance: 'Assists in explaining targeted genetic sequencing results and familial risk panels to clients.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-3-1',
        stem: 'Which clinical statement regarding the "Promotion" phase of the carcinogenesis cascade is essential for oncology health promotion counseling?',
        options: [
          'The promotion phase is instantaneous and irreversible.',
          'Promotion involves long latency periods and may be mitigated by removing co-carcinogenic promoters like tobacco.',
          'Promotion only occurs in individuals with inherited chromosomal translocations.',
          'Promotion bypasses cellular proliferation directly into metastatic dissemination.',
        ],
        correctIndex: 1,
        rationale:
          'Page 4 notes that promotion involves repeated exposures, preneoplastic lesions, and prolonged latency windows, rendering lifestyle intervention highly effective during this stage.',
        sourceSlide: 4,
      },
      {
        id: 'mq-3-2',
        stem: 'A client tests positive for a germline BRCA1 gene mutation. In educating the client using the "Gas Pedal & Brakes" model, how does the nurse explain the function of BRCA1?',
        options: [
          'BRCA1 is an oncogene that acts as a stuck gas pedal speeding up mitosis.',
          'BRCA1 is a tumor suppressor gene that normally functions as a brake to stop mutated cell proliferation.',
          'BRCA1 is an antigenic ligand that cloaks tumor cells from cytotoxic T-lymphocytes.',
          'BRCA1 stimulates tumor angiogenesis by upregulating vascular endothelial growth factor.',
        ],
        correctIndex: 1,
        rationale:
          'Page 5 defines BRCA1 and BRCA2 as classic tumor suppressor genes ("brakes") whose loss of function prevents cells from halting defective cellular division.',
        sourceSlide: 5,
      },
      {
        id: 'mq-3-3',
        stem: 'During the "Progression" stage of carcinogenesis, what critical capability enables malignant cells to sustain continuous exponential growth?',
        options: [
          'Return of normal contact inhibition.',
          'Stimulation of angiogenesis (formation of new tumor blood vessels).',
          'Immediate resumption of spontaneous cellular apoptosis.',
          'Encapsulation by a thick, impermeable fibrous membrane.',
        ],
        correctIndex: 1,
        rationale:
          'Page 4 highlights that during progression, tumor cells stimulate angiogenesis (neovascularization) to secure oxygen and nutrients, facilitating invasive growth and metastasis.',
        sourceSlide: 4,
      },
    ],
  },
  {
    id: 'topic-4',
    title: 'Immune Evasion: The Cellular Camouflage',
    subtitle: 'Tumor-Associated Antigens, The PD-1/PD-L1 Invisibility Cloak, and Anergy',
    sourceSlide: 6,
    category: 'Immunology & Targeted Therapy',
    summary:
      'Malignant cells evade host immunosurveillance through checkpoint camouflage. By expressing programmed death-ligand 1 (PD-L1) to engage T-cell PD-1 receptors, tumor cells induce T-lymphocyte anergy and immune shutdown.',
    keyPoints: [
      'Tumor-Associated Antigens (TAAs): Mutated proteins presented on major histocompatibility complexes to alert host T-lymphocytes.',
      'The Invisibility Cloak: Tumor cells upregulate PD-L1, which binds to PD-1 receptors on cytotoxic T-lymphocytes.',
      'Induction of Anergy: PD-1/PD-L1 ligation transmits an inhibitory intracellular signal, triggering T-cell exhaustion or apoptosis.',
      'Immune Checkpoint Inhibitors: Monoclonal antibodies (e.g. Pembrolizumab) physically block this camouflage, re-energizing cytotoxic T-cell antitumor attacks.',
      'Immune-Related Adverse Events (irAEs): Overactive immune response can cause colitis, pneumonitis, hepatitis, and endocrinopathies.',
    ],
    detailedSections: [
      {
        heading: 'Mechanisms of Tumor Camouflage',
        paragraphs: [
          'Normally, host immune surveillance relies on Antigen-Presenting Cells (APCs) phagocytosing abnormal cellular debris and displaying Tumor-Associated Antigens (TAAs) on MHC class I and II molecules to cytotoxic CD8+ and helper CD4+ T-lymphocytes.',
          'Malignant cells subvert this defense by expressing checkpoint ligands, primarily PD-L1 (Programmed Death-Ligand 1). When PD-L1 docks with the PD-1 receptor on an activated T-lymphocyte, it delivers a potent inhibitory signal that inactivates the T-cell, rendering it functionally dormant (anergy) or inducing programmed cell death.',
        ],
        callout: {
          type: 'clinical_pearl',
          title: 'The T-Cell Off Switch',
          text: 'PD-1 is the physiological off-switch meant to prevent autoimmune destruction of healthy tissues. Tumors exploit this natural regulatory brake to evade immune clearance.',
        },
      },
      {
        heading: 'Reversing Immune Evasion: Checkpoint Blockade',
        paragraphs: [
          'Targeted monoclonal antibodies—checkpoint inhibitors—target either PD-1 (e.g., Pembrolizumab, Nivolumab) or PD-L1 (e.g., Atezolizumab).',
          'By sterically blocking the ligand-receptor interaction, these agents strip away the tumor invisibility cloak, unleashing native T-lymphocytes to recognize and destroy the malignant clone.',
          'Nursing Alert: Because checkpoint inhibitors disinhibit systemic immunity, nurses must monitor for immune-related adverse events (irAEs), including severe diarrhea/colitis, hypophysitis, pneumonitis, and thyroiditis.',
        ],
      },
    ],
    graphicId: 'immune-evasion-graphic',
    graphicTitle: 'Immune Evasion & The PD-1/PD-L1 Checkpoint Invisibility Cloak',
    mnemonics: [
      {
        acronym: 'CLOAK',
        title: 'Immune Camouflage Mechanism',
        breakdown: [
          { letter: 'C', meaning: 'Cancer cell expresses PD-L1 surface ligands' },
          { letter: 'L', meaning: 'Locks onto PD-1 receptors on host T-lymphocytes' },
          { letter: 'O', meaning: 'Off-signal delivered to cytotoxic immune defenses' },
          { letter: 'A', meaning: 'Anergy & exhaustion induced in T-cells' },
          { letter: 'K', meaning: 'Kills/evades immune surveillance clearance' },
        ],
        clinicalSignificance: 'Clarifies why advanced tumors evade high concentrations of circulating tumor-infiltrating lymphocytes.',
      },
      {
        acronym: 'IRAE',
        title: 'Checkpoint Adverse Event Watchlist',
        breakdown: [
          { letter: 'I', meaning: 'Intestinal inflammation (Severe immune colitis & watery diarrhea)' },
          { letter: 'R', meaning: 'Respiratory distress (Immune-mediated pneumonitis & dry cough)' },
          { letter: 'A', meaning: 'Adrenal / Thyroid / Pituitary endocrinopathies' },
          { letter: 'E', meaning: 'Elevated transaminases (Autoimmune hepatitis)' },
        ],
        clinicalSignificance: 'Differentiates immune checkpoint toxicity from classic cytotoxic myelosuppressive side effects.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-4-1',
        stem: 'What is the primary cellular consequence when tumor-cell PD-L1 binds to the PD-1 receptor on a cytotoxic T-lymphocyte?',
        options: [
          'Immediate lysis and destruction of the malignant cell.',
          'Down-regulation of T-lymphocyte activity, inducing anergy or cell death.',
          'Rapid degranulation of natural killer cells with histamine release.',
          'Accelerated presentation of tumor antigens to peripheral B-cells.',
        ],
        correctIndex: 1,
        rationale:
          'Page 6 illustrates that PD-L1 binding to PD-1 induces T-cell anergy (tolerance) or apoptosis, effectively camouflaging the malignant cell from immune destruction.',
        sourceSlide: 6,
      },
      {
        id: 'mq-4-2',
        stem: 'A client receiving Pembrolizumab (anti-PD-1 monoclonal antibody) reports new-onset frequent watery stools and abdominal cramping. What complication should the oncology nurse suspect?',
        options: [
          'Standard infectious viral gastroenteritis requiring antidiarrheal boluses.',
          'Immune-related colitis caused by checkpoint disinhibition.',
          'Acute bone marrow nadir-induced neutropenic colitis.',
          'An expected mild side effect that requires no clinical intervention.',
        ],
        correctIndex: 1,
        rationale:
          'Checkpoint inhibitors disinhibit immune responses, causing immune-related adverse events (irAEs) like autoimmune colitis. Unchecked immune colitis can progress to bowel perforation.',
        sourceSlide: 6,
      },
      {
        id: 'mq-4-3',
        stem: 'How do Antigen-Presenting Cells (APCs) normally interact with Tumor-Associated Antigens (TAAs) under intact immunosurveillance?',
        options: [
          'They bind PD-L1 to deactivate helper T-cells in bone marrow.',
          'They ingest TAAs and display them to T-lymphocytes to prime tumor recognition.',
          'They stimulate angiogenesis around the primary tumor bed.',
          'They encapsulate malignant cells within dense collagen matrices.',
        ],
        correctIndex: 1,
        rationale:
          'Page 6 highlights that TAAs are normally processed by APCs to prime and activate cytotoxic T-cells against malignant cells before immune evasion occurs.',
        sourceSlide: 6,
      },
    ],
  },
  {
    id: 'topic-5',
    title: 'The Prevention Matrix & ACS Early Detection Guidelines',
    subtitle: 'Primary, Secondary, Tertiary Prevention, and Screening Timelines',
    sourceSlide: 7,
    category: 'Prevention & Screening',
    summary:
      'Cancer prevention spans three rigorous levels: Primary (risk reduction, HPV/HBV vaccination, diet), Secondary (evidence-based screening: mammography, colonoscopy, Pap smear), and Tertiary (survivorship and secondary malignancy surveillance).',
    keyPoints: [
      'Primary Prevention: Prevent initial occurrence (vaccination against oncoviruses, smoking cessation, SPF 30+ sun protection between 10 AM-3 PM).',
      'Dietary Guidelines: High fiber, cruciferous vegetables (broccoli, cauliflower, cabbage), low saturated fats, moderate alcohol, limit nitrites/smoked meats.',
      'Secondary Prevention: Identify asymptomatic precancerous or early lesions (Sigmoidoscopy q5y at 50+, annual FOBT at 50+, annual DRE at 40+, annual Pap starting at 18/sexual debut, annual Mammography at 40+).',
      'Tertiary Prevention: Survivorship surveillance for treatment-induced secondary leukemias/lymphomas and lymphedema rehabilitation.',
    ],
    detailedSections: [
      {
        heading: 'The Three-Tiered Prevention Matrix',
        paragraphs: [
          'Primary Prevention focuses on reducing modifiable carcinogenic exposures. Interventions include prophylactic immunization (HPV vaccine to eliminate cervical/oropharyngeal oncogenesis; HBV vaccine to prevent hepatocellular carcinoma), environmental protection against industrial toxins (asbestos, nickel, coal tar), and lifestyle optimization.',
          'Secondary Prevention centers on early detection in asymptomatic populations before symptoms appear. Detecting malignancies at localized Stage I dramatically improves 5-year survival rates compared to metastatic Stage IV presentation.',
          'Tertiary Prevention encompasses comprehensive survivorship care: surveillance for treatment-associated secondary malignancies (e.g., acute myeloid leukemia secondary to alkylating agents or topoisomerase II inhibitors), monitoring radiation-induced fibrosis, and providing specialized lymphedema decongestive therapy.',
        ],
      },
      {
        heading: 'American Cancer Society Screening Timelines (Table 20-2)',
        paragraphs: [
          'Nurses must master screening intervals to educate clients across community and ambulatory settings.',
        ],
        tableData: {
          headers: ['Diagnostic Test', 'Target Population', 'Initiation Age', 'Recommended Frequency'],
          rows: [
            ['Flexible Sigmoidoscopy', 'Males & Females', 'Age 50 and older', 'Every 5 years'],
            ['Fecal Occult Blood (FOBT)', 'Males & Females', 'Age 50 and older', 'Every year (annually)'],
            ['Digital Rectal Exam (DRE)', 'Males & Females', 'Age 40 and older', 'Every year (annually)'],
            ['Prostate Exam (DRE + PSA)', 'Males', 'Age 50 and older', 'Every year (annually)'],
            ['Papanicolaou (Pap) Test', 'Females', '18+ or sexually active', 'Annual; less frequent after 3 normal tests'],
            ['Breast Self-Exam (BSE)', 'Females', 'Age 20 and older', 'Every month (monthly)'],
            ['Clinical Breast Exam (CBE)', 'Females', 'Age 20 to 40', 'Every 3 years'],
            ['Clinical Breast Exam (CBE)', 'Females', 'Older than 40', 'Every year (annually)'],
            ['Screening Mammography', 'Females', 'Age 40 and older', 'Every year (annually)'],
          ],
        },
      },
      {
        heading: 'Client Teaching: Nutritional Guidelines (Teaching 20-1)',
        paragraphs: [
          'Avoid obesity through balanced energy expenditure.',
          'Decrease total dietary fat intake, particularly saturated and trans fats.',
          'Increase dietary fiber by consuming whole-grain cereals, legumes, fruits, and vegetables.',
          'Incorporate cruciferous vegetables (broccoli, brussels sprouts, kohlrabi, cabbage, cauliflower) rich in sulforaphanes and indoles.',
          'Select foods rich in antioxidant vitamins A and C to scavenge free radicals.',
          'Limit intake of salt-cured, smoked, and nitrate/nitrite-preserved meats associated with gastric and colorectal neoplasms.',
        ],
      },
    ],
    graphicId: 'prevention-matrix-graphic',
    graphicTitle: 'The Cancer Prevention Matrix: Primary, Secondary, and Tertiary Continuum',
    mnemonics: [
      {
        acronym: 'CAUTION',
        title: '7 Warning Signs of Cancer (ACS)',
        breakdown: [
          { letter: 'C', meaning: 'Change in bowel or bladder habits' },
          { letter: 'A', meaning: 'A sore that does not heal' },
          { letter: 'U', meaning: 'Unusual bleeding or discharge' },
          { letter: 'T', meaning: 'Thickening or lump in breast or elsewhere' },
          { letter: 'I', meaning: 'Indigestion or difficulty in swallowing' },
          { letter: 'O', meaning: 'Obvious change in wart or mole (ABCD rule)' },
          { letter: 'N', meaning: 'Nagging cough or persistent hoarseness' },
        ],
        clinicalSignificance: 'Standard patient education tool for recognizing early signs warranting clinical evaluation.',
      },
      {
        acronym: 'SCREEN',
        title: 'ACS Secondary Screening Protocol',
        breakdown: [
          { letter: 'S', meaning: 'Sigmoidoscopy q5y (50+) & FOBT yearly' },
          { letter: 'C', meaning: 'CBE q3y (20-40) & yearly (>40)' },
          { letter: 'R', meaning: 'Rectal digital exam q1y starting at 40' },
          { letter: 'E', meaning: 'Every month Breast Self-Exam (20+)' },
          { letter: 'E', meaning: 'Every year Mammogram at 40+' },
          { letter: 'N', meaning: 'Neck/Pelvic Pap yearly starting 18 or sexual active' },
        ],
        clinicalSignificance: 'Summarizes key age-based screening recommendations from Table 20-2.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-5-1',
        stem: 'According to American Cancer Society recommendations (Table 20-2), what screening interval should a healthy 45-year-old female follow for mammography and clinical breast examination (CBE)?',
        options: [
          'Mammography every 3 years; CBE every 5 years.',
          'Annual mammography and annual clinical breast examination.',
          'Mammography only if symptomatic; monthly CBE by physician.',
          'Mammography starting at age 50; CBE every 3 years.',
        ],
        correctIndex: 1,
        rationale:
          'Page 9 (Table 20-2) states that females age 40 and older should undergo annual mammography and annual clinical breast examination.',
        sourceSlide: 9,
      },
      {
        id: 'mq-5-2',
        stem: 'A community health nurse is conducting an educational session on cancer risk reduction. Which dietary choice best aligns with ACS Client Teaching 20-1?',
        options: [
          'Increasing dietary consumption of salt-cured sausages and smoked bacon.',
          'Consuming cruciferous vegetables such as broccoli, cauliflower, and brussels sprouts regularly.',
          'Adopting a high-fat, low-fiber diet to maintain caloric density.',
          'Restricting intake of foods rich in vitamins A and C.',
        ],
        correctIndex: 1,
        rationale:
          'Page 8 (Teaching 20-1) recommends cruciferous vegetables, high fiber, and foods rich in vitamins A and C while moderating fats, smoked foods, and nitrites.',
        sourceSlide: 8,
      },
      {
        id: 'mq-5-3',
        stem: 'Which intervention is an example of Tertiary Cancer Prevention?',
        options: [
          'Administering the 9-valent Human Papillomavirus (HPV) vaccine to an adolescent.',
          'Conducting screening colonoscopies to detect adenomatous polyps.',
          'Providing continuous surveillance for secondary leukemias in a lymphoma survivor previously treated with alkylating agents.',
          'Instructing a client to avoid midday sun exposure between 10 AM and 3 PM.',
        ],
        correctIndex: 2,
        rationale:
          'Page 7 defines tertiary prevention as survivorship monitoring for disease recurrence, secondary treatment-induced malignancies, and managing chronic treatment sequelae like lymphedema.',
        sourceSlide: 7,
      },
    ],
  },
  {
    id: 'topic-6',
    title: 'Diagnostic Staging & TNM Classification',
    subtitle: 'Anatomic Disease Mapping vs. Histopathologic Grading (G1–G4)',
    sourceSlide: 10,
    category: 'Diagnostics & Staging',
    summary:
      'Staging defines the anatomical extent and spread of disease using the TNM System (Tumor, Node, Metastasis: Stages I-IV), whereas Grading (G1-G4) evaluates cytologic differentiation and aggressiveness under microscopy.',
    keyPoints: [
      'Staging (The Anatomic Map): Evaluates primary tumor size, regional lymph node invasion, and distant metastatic seeding.',
      'T Subclasses: Tx (cannot assess), T0 (no evidence), Tis (carcinoma in situ), T1-T4 (progressive tumor volume/invasion).',
      'N Subclasses: Nx (cannot assess), N0 (no regional nodal metastasis), N1-N4 (progressive nodal involvement).',
      'M Subclasses: Mx (not assessed), M0 (no distant metastasis), M1 (distant metastasis verified).',
      'Histopathologic Grading: Grade I (well-differentiated, favorable) through Grade IV (undifferentiated/anaplastic, highly aggressive).',
    ],
    detailedSections: [
      {
        heading: 'Staging vs. Grading: Fundamental Clinical Differences',
        paragraphs: [
          'Staging describes the anatomic extent of tumor spread at diagnosis. It dictates surgical resectability, radiation planning, and systemic chemotherapy protocols, and serves as a major prognostic benchmark.',
          'Grading describes the microscopic appearance and biological behavior of tumor cells. Low-grade tumors resemble normal tissue architecture and tend to grow more indolently. High-grade tumors display profound cellular anaplasia and replicate rapidly.',
        ],
        tableData: {
          headers: ['Parameter', 'Staging (TNM System)', 'Grading (Histopathology)'],
          rows: [
            ['Primary Question', 'Where is the tumor located and how far has it spread?', 'What does the cell look like microscopically?'],
            ['Assessment Modality', 'CT, MRI, PET scans, surgical exploration, sentinel biopsy', 'Biopsy tissue pathology, cytologic grading (G1-G4)'],
            ['Clinical Impact', 'Determines anatomic stage grouping (Stage I through IV)', 'Estimates proliferative index and biologic aggressiveness'],
            ['Scale', 'T (0-4, is), N (0-4), M (0-1)', 'Grade 1 (Well) to Grade 4 (Undifferentiated/Anaplastic)'],
          ],
        },
      },
      {
        heading: 'Complete TNM System Breakdown (Table 20-3)',
        paragraphs: [
          'Tumor (T): Tis denotes carcinoma in situ (pre-invasive lesion confined to epithelial layer without breaching basement membrane). T1 to T4 represent increasing physical diameter and invasion into contiguous anatomical structures.',
          'Nodes (N): N0 indicates clean regional lymphatics on histopathologic or imaging assessment. N1 to N4 denote increasing numbers, clusters, and anatomical distances of positive regional lymph nodes.',
          'Metastasis (M): M0 confirms absence of distant spread. M1 documents hematogenous or distant lymphatic seeding (e.g. breast carcinoma metastasizing to bone, lung, brain, or liver).',
        ],
        callout: {
          type: 'clinical_pearl',
          title: 'Carcinoma in Situ (Tis)',
          text: 'Tis is non-invasive neoplasia. Because the basement membrane remains intact, cells lack access to lymphatics or capillaries, precluding distant metastasis at this stage.',
        },
      },
    ],
    graphicId: 'tnm-staging-graphic',
    graphicTitle: 'Diagnostic Classification: The TNM Anatomic Map & Cellular Grading',
    mnemonics: [
      {
        acronym: 'TNM',
        title: 'Core Staging Components',
        breakdown: [
          { letter: 'T', meaning: 'Tumor extent & depth (Tis in situ, T1-T4)' },
          { letter: 'N', meaning: 'Nodes involved in regional basin (N0-N4)' },
          { letter: 'M', meaning: 'Metastasis to distant organs (M0 none, M1 present)' },
        ],
        clinicalSignificance: 'Universal clinical language for staging solid malignant tumors.',
      },
      {
        acronym: 'GRADE',
        title: 'Histopathologic Cellular Differentiation',
        breakdown: [
          { letter: 'G1', meaning: 'Grade 1: Well-differentiated (Closest to parent tissue, lowest risk)' },
          { letter: 'G2', meaning: 'Grade 2: Moderately well-differentiated' },
          { letter: 'G3', meaning: 'Grade 3: Poorly differentiated' },
          { letter: 'G4', meaning: 'Grade 4: Undifferentiated / Anaplastic (Aggressive behavior)' },
        ],
        clinicalSignificance: 'Predicts response to cell-cycle-active chemotherapy regimens.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-6-1',
        stem: 'A client’s pathology report indicates a tumor classification of "T2, N0, M0, Grade I". How should the nurse interpret these findings?',
        options: [
          'The tumor is widespread with extensive distant metastatic spread to the liver.',
          'There is a moderately sized primary tumor without lymph node involvement or distant metastasis, and cells are well-differentiated.',
          'The tumor is carcinoma in situ with multiple regional lymph node metastases.',
          'The tumor cannot be assessed clinically and is highly anaplastic.',
        ],
        correctIndex: 1,
        rationale:
          'Pages 10 and 11 establish that T2 represents localized tumor growth, N0 confirms absence of regional nodal disease, M0 confirms absence of distant metastasis, and Grade I denotes well-differentiated cells.',
        sourceSlide: 10,
      },
      {
        id: 'mq-6-2',
        stem: 'What does the designation "Tis" specifically denote in the TNM classification system?',
        options: [
          'Tumor has metastasized through the bloodstream to distant organs.',
          'Carcinoma in situ; pre-invasive cancer confined above the basement membrane.',
          'Primary tumor size cannot be measured or evaluated adequately.',
          'Extensive regional lymph node chain involvement.',
        ],
        correctIndex: 1,
        rationale:
          'Page 11 (Table 20-3) defines Tis as carcinoma in situ, meaning malignant cells remain within their epithelial boundaries without penetrating the basement membrane.',
        sourceSlide: 11,
      },
      {
        id: 'mq-6-3',
        stem: 'Which histological finding carries the poorest prognosis regarding cellular identity and biological aggressiveness?',
        options: [
          'Grade I: Well-differentiated cells resembling tissue of origin.',
          'Grade II: Moderately well-differentiated architecture.',
          'Grade IV: Undifferentiated/anaplastic cells bearing little resemblance to tissue of origin.',
          'T1: Tumor size less than 2 centimeters in diameter.',
        ],
        correctIndex: 2,
        rationale:
          'Page 10 states that Grade IV (undifferentiated/anaplastic) cells have lost distinguishing tissue characteristics, proliferate aggressively, and carry a poorer prognosis.',
        sourceSlide: 10,
      },
    ],
  },
  {
    id: 'topic-7',
    title: 'The Treatment Arsenal & Cell Cycle Kinetics',
    subtitle: 'Surgery, Radiation, Hyperthermia, Chemotherapy Cycles, and Fractional Cell Kill',
    sourceSlide: 12,
    category: 'Therapeutics & Pharmacology',
    summary:
      'Cancer therapeutics combine Local (Surgery, Radiation), Regional (Hyperthermia >41.5°C), and Systemic modalities (Chemotherapy, Targeted therapies). Understanding cell cycle kinetics explains why chemotherapy must be administered in repeated cycles.',
    keyPoints: [
      'Treatment Modalities: Local (Surgery, Radiotherapy), Regional (Hyperthermia >41.5°C / 106.7°F), Systemic (Chemo, Biologics).',
      'Hyperthermia Mechanism: Temperatures exceeding 41.5°C selectively damage tumor microvasculature and sensitize hypoxic cells to ionizing radiation.',
      'Cell Cycle Phases: G1 (organelle duplication), S (DNA replication), G2 (growth/protein synthesis), Mitosis (active cell division).',
      'The Fractional Cell Kill Hypothesis: A single chemotherapy dose eliminates a fixed percentage (20-99%) of actively dividing cells rather than an absolute number.',
      'Why Cycles are Essential: Cells in resting G0 phase survive initial treatment; repeated cycles are required to destroy them as they re-enter active cell division.',
    ],
    detailedSections: [
      {
        heading: 'Multimodal Oncology Arsenal',
        paragraphs: [
          'Surgical interventions include diagnostic biopsy (incisional, excisional, core needle), surgical staging, curative resection with negative margins, cytoreductive debulking to enhance chemotherapy penetration, and palliative decompression.',
          'Ionizing radiation delivers lethal breaks to DNA double-strands in rapidly proliferating tissue beds. It is fractionated over multiple weeks to allow normal tissues to repair sub-lethal damage between fractions.',
          'Regional Hyperthermia applies therapeutic heating (>41.5°C / 106.7°F). Neoplastic vasculature is disorganized and cannot dilate to dissipate heat, leading to vascular collapse and increased oxygenation that sensitizes previously radioresistant hypoxic cells.',
        ],
      },
      {
        heading: 'The Cell Cycle Clock & Rationale for Chemotherapy Cycles',
        paragraphs: [
          'Chemotherapeutic agents are broadly categorized into Cell Cycle-Specific (CCS) drugs (e.g., antimetabolites active in S-phase; plant alkaloids active in M-phase) and Cell Cycle-Non-Specific (CCNS) drugs (e.g., alkylating agents, antitumor antibiotics).',
          'According to the Gompertzian growth model and fractional cell kill hypothesis, each chemotherapy treatment cycle destroys a constant fraction (e.g., 90% or 1 log) of viable neoplastic cells. If a tumor possesses 10^9 cells, one cycle reduces it to 10^8, the next to 10^7, and so on.',
          'Furthermore, cancer cells residing in the quiescent G0 resting phase are protected from cell-cycle-active agents. Scheduled rest intervals permit healthy bone marrow and GI mucosa to regenerate while coaxing dormant malignant clones to recruit back into G1, rendering them vulnerable to the subsequent cycle.',
        ],
        callout: {
          type: 'warning',
          title: 'Adherence to Dosing Schedules',
          text: 'Unwarranted treatment delays or dose reductions compromise the fractional kill rate, enabling malignant cell regrowth and emergence of multidrug resistance (P-glycoprotein efflux pumps).',
        },
      },
    ],
    graphicId: 'cell-cycle-graphic',
    graphicTitle: 'The Cell Cycle Clock & Rationale for Chemotherapy Cycles',
    mnemonics: [
      {
        acronym: 'CYCLE',
        title: 'Cell Cycle Phases & Vulnerability',
        breakdown: [
          { letter: 'C', meaning: 'Cell in G0 resting phase (resistant to phase-specific chemo)' },
          { letter: 'Y', meaning: 'Yields to G1 (Organelle synthesis & RNA preparation)' },
          { letter: 'C', meaning: 'Chromosomal DNA synthesis in S-phase (Antimetabolites target here)' },
          { letter: 'L', meaning: 'Last growth phase in G2 (Preparation for spindle assembly)' },
          { letter: 'E', meaning: 'Equatorial division in Mitosis (Taxanes/Vincas freeze spindle)' },
        ],
        clinicalSignificance: 'Rationalizes multi-agent chemotherapy regimens that target multiple cell cycle phases simultaneously.',
      },
      {
        acronym: 'LOCAL',
        title: 'Treatment Arsenal Hierarchy',
        breakdown: [
          { letter: 'L', meaning: 'Local Surgery (Biopsy, curative resection, debulking)' },
          { letter: 'O', meaning: 'Organ-focused Radiation (DNA strand breakage)' },
          { letter: 'C', meaning: 'Caloric/Thermal Hyperthermia (>41.5°C vascular damage)' },
          { letter: 'A', meaning: 'Antineoplastic Systemic Chemo (Fractional cell kill)' },
          { letter: 'L', meaning: 'Locked Molecular Targeted Therapy (Monoclonals/TKI)' },
        ],
        clinicalSignificance: 'Classifies cancer treatments from anatomically focal to whole-body systemic modalities.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-7-1',
        stem: 'A client receiving cyclic chemotherapy asks why the oncologist scheduled treatments every 21 days rather than delivering all medication in a single week. What is the nurse’s best evidence-based explanation?',
        options: [
          'A single high dose would permanently damage all healthy organs without killing cancer cells.',
          'Each cycle kills a fixed percentage of dividing cells, and rest periods allow resting cancer cells to re-enter active phases where they become vulnerable to the next cycle.',
          'Chemotherapy medications lose potency if administered consecutively over more than three days.',
          'Rest periods prevent the immune system from identifying the cancer cells.',
        ],
        correctIndex: 1,
        rationale:
          'Page 13 explains that single doses kill a percentage (20-99%) of cells. Non-dividing (G0) cells survive the initial strike; repeated cycles are required to eradicate them once they re-enter active division.',
        sourceSlide: 13,
      },
      {
        id: 'mq-7-2',
        stem: 'How does regional hyperthermia (>41.5°C / 106.7°F) enhance the therapeutic efficacy of radiation therapy?',
        options: [
          'It stimulates rapid proliferation of tumor suppressor genes.',
          'It selectively damages tumor blood vessels and increases oxygenation to sensitize hypoxic tumor cells to radiation.',
          'It completely prevents bone marrow suppression caused by systemic drugs.',
          'It cools surrounding healthy tissue to prevent dermal burns.',
        ],
        correctIndex: 1,
        rationale:
          'Page 12 states that regional hyperthermia (>41.5°C) preferentially damages tumor blood vessels and sensitizes hypoxic cells to radiation.',
        sourceSlide: 12,
      },
      {
        id: 'mq-7-3',
        stem: 'Which phase of the cell cycle involves replication of cellular DNA and is the primary target for antimetabolite chemotherapy medications (such as Methotrexate and 5-Fluorouracil)?',
        options: [
          'G0 resting phase',
          'S (Synthesis) phase',
          'Mitotic Metaphase',
          'Cytokinesis',
        ],
        correctIndex: 1,
        rationale:
          'Page 13 illustrates that S Phase is dedicated to DNA replication, making it the primary target for antimetabolite chemotherapeutic agents.',
        sourceSlide: 13,
      },
    ],
  },
  {
    id: 'topic-8',
    title: 'Systemic vs. Precision Medicine & Targeted Biologics',
    subtitle: 'Cytotoxic "Carpet Bombing" vs. Monoclonal Antibody "Sniper Rifles"',
    sourceSlide: 14,
    category: 'Therapeutics & Pharmacology',
    summary:
      'Traditional cytotoxic chemotherapy acts as broad "carpet bombing," attacking all rapidly dividing cell populations indiscriminately. In contrast, precision targeted therapies act as molecular "sniper rifles," locking onto specific deregulated cell-signaling proteins (e.g., HER2, CD20).',
    keyPoints: [
      'Traditional Chemotherapy ("Carpet Bombing"): Cytotoxic agents target any cell with rapid mitotic turnover, causing collateral damage to hair follicles, oral mucosa, and bone marrow.',
      'Targeted Therapies ("Sniper Rifle"): Inhibit deregulated signal transduction pathways and surface antigens with minimal collateral cytopenias.',
      'Trastuzumab (Herceptin): Monoclonal antibody locking onto human epidermal growth factor receptor 2 (HER2) proteins in breast and gastric cancers.',
      'Rituximab (Rituxan): Monoclonal antibody binding CD20 cell-surface antigens on normal and malignant B-lymphocytes in lymphomas and leukemias.',
      'Cardiotoxicity Alert: Trastuzumab carries a black-box warning for cardiomyopathy and ventricular dysfunction; requires baseline and serial Echocardiograms (LVEF monitoring).',
    ],
    detailedSections: [
      {
        heading: 'Cytotoxic vs. Precision Paradigms',
        paragraphs: [
          'Conventional antineoplastic chemotherapy exploits a fundamental vulnerability of cancer: accelerated proliferation. However, it cannot differentiate between a malignant cell and normal rapidly dividing host tissues—namely, hematopoietic stem cells in the bone marrow, enterocytes lining the gastrointestinal tract, and hair matrix keratinocytes.',
          'Precision oncology targets molecular alterations specific to the malignancy. These include monoclonal antibodies targeting extracellular receptors (ending in -mab) and small-molecule tyrosine kinase inhibitors targeting intracellular enzymatic pockets (ending in -nib).',
        ],
        tableData: {
          headers: ['Feature', 'Traditional Cytotoxic Chemo ("Carpet Bombing")', 'Targeted Precision Biologics ("Sniper Rifle")'],
          rows: [
            ['Mechanism', 'Disrupts DNA synthesis or mitotic spindles in all dividing cells', 'Blocks specific mutated signaling pathways or surface receptors'],
            ['Selectivity', 'Low; high collateral toxicity to normal tissues', 'High; targets specific molecular receptors (HER2, CD20, EGFR)'],
            ['Toxicity Profile', 'Severe myelosuppression, alopecia, mucositis, CINV', 'Receptor-specific: cardiomyopathy (HER2), rash (EGFR), infusion reactions'],
            ['Representative Agents', 'Cisplatin, Doxorubicin, Cyclophosphamide, Paclitaxel', 'Trastuzumab (anti-HER2), Rituximab (anti-CD20), Pembrolizumab (anti-PD1)'],
          ],
        },
      },
      {
        heading: 'Clinical Profiles: Trastuzumab & Rituximab',
        paragraphs: [
          'Trastuzumab (Herceptin): Blocks HER2 homodimerization, downregulating downstream MAPK and PI3K/Akt survival signaling cascades. Essential Nursing Intervention: Perform baseline and periodic echocardiography; withhold treatment if left ventricular ejection fraction (LVEF) drops >= 16% from baseline or falls below institutional normal limits.',
          'Rituximab: Binds CD20 surface antigens on B-cells, triggering complement-dependent cytotoxicity (CDC) and antibody-dependent cellular cytotoxicity (ADCC). Essential Nursing Intervention: Premedicate with acetaminophen and diphenhydramine; titrate infusion rates slowly to manage severe cytokine release and infusion reactions.',
        ],
        callout: {
          type: 'warning',
          title: 'Black-Box Warning: Cardiotoxicity with HER2 Blockade',
          text: 'Unlike Doxorubicin cardiotoxicity which is cumulative and permanent, Trastuzumab-induced cardiomyopathy is typically not dose-dependent and is frequently reversible upon drug discontinuation.',
        },
      },
    ],
    graphicId: 'systemic-vs-precision-graphic',
    graphicTitle: 'Traditional Cytotoxic Chemo vs Precision Targeted Therapies',
    mnemonics: [
      {
        acronym: 'SNIPER',
        title: 'Precision Medicine Characteristics',
        breakdown: [
          { letter: 'S', meaning: 'Specific molecular receptors targeted (e.g., HER2, CD20)' },
          { letter: 'N', meaning: 'No indiscriminate DNA destruction' },
          { letter: 'I', meaning: 'Inhibits deregulated signal transduction pathways' },
          { letter: 'P', meaning: 'Pathology testing required first (HER2+, CD20+)' },
          { letter: 'E', meaning: 'Echocardiogram required for Trastuzumab LVEF monitoring' },
          { letter: 'R', meaning: 'Reduced bone marrow collateral suppression' },
        ],
        clinicalSignificance: 'Reminds nurses of pre-treatment testing and cardiac safety requirements for targeted biologics.',
      },
      {
        acronym: 'HER2-HEART',
        title: 'Trastuzumab Clinical Watch',
        breakdown: [
          { letter: 'H', meaning: 'Herceptin (Trastuzumab) Locks onto HER2' },
          { letter: 'E', meaning: 'Ejection fraction monitored via Echo/MUGA' },
          { letter: 'A', meaning: 'Assess for signs of heart failure (dyspnea, peripheral edema)' },
          { letter: 'R', meaning: 'Reversible cardiac dysfunction (unlike anthracyclines)' },
          { letter: 'T', meaning: 'Titrate with caution alongside other cardiotoxic agents' },
        ],
        clinicalSignificance: 'Reinforces cardiovascular monitoring priorities during HER2-targeted therapy.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-8-1',
        stem: 'A client with metastatic breast cancer is receiving Trastuzumab. Which diagnostic surveillance test is mandatory to monitor for drug-specific adverse effects?',
        options: [
          'Serial serum amylase and lipase levels',
          'Baseline and periodic Echocardiogram to evaluate Left Ventricular Ejection Fraction (LVEF)',
          'Monthly bone density scans (DEXA)',
          'Weekly audiometry examinations',
        ],
        correctIndex: 1,
        rationale:
          'Page 14 outlines targeted therapies like Trastuzumab. Trastuzumab carries a recognized risk of cardiotoxicity and heart failure, requiring serial LVEF monitoring.',
        sourceSlide: 14,
      },
      {
        id: 'mq-8-2',
        stem: 'How does the mechanism of action of Rituximab differ fundamentally from that of traditional cytotoxic chemotherapy like Cyclophosphamide?',
        options: [
          'Rituximab damages DNA double strands in all proliferating human cells.',
          'Rituximab is a monoclonal antibody that specifically targets CD20 surface antigens on B-cells, whereas cytotoxic chemo attacks all rapidly dividing cells.',
          'Rituximab acts as a synthetic hormone that blocks androgen receptors.',
          'Rituximab induces generalized hyperthermia exceeding 41.5°C.',
        ],
        correctIndex: 1,
        rationale:
          'Page 14 contrasts traditional chemotherapy ("carpet bombing" of dividing cells) with precision targeted biologics like Rituximab ("sniper rifle" locking onto CD20 antigens).',
        sourceSlide: 14,
      },
      {
        id: 'mq-8-3',
        stem: 'Why do targeted therapies typically cause less severe alopecia and bone marrow suppression compared to conventional cytotoxic chemotherapeutic agents?',
        options: [
          'Targeted agents are administered at one-tenth of the therapeutic dose.',
          'They specifically target deregulated intracellular pathways or unique tumor antigens rather than indiscriminately killing all rapidly dividing host cells.',
          'Targeted therapies are completely cleared from the bloodstream within five minutes.',
          'Targeted therapies contain high doses of granulocyte colony-stimulating factors.',
        ],
        correctIndex: 1,
        rationale:
          'Page 14 explains that targeted therapies act as molecular modifiers against deregulated signaling pathways, sparing normal dividing hair and marrow tissues from indiscriminate damage.',
        sourceSlide: 14,
      },
    ],
  },
  {
    id: 'topic-9',
    title: 'Anatomical Mapping of Systemic Toxicities',
    subtitle: 'Alopecia, Mucositis, Myelosuppression (Nadir), and Cachexia',
    sourceSlide: 15,
    category: 'Toxicities & Nursing Care',
    summary:
      'Because conventional chemotherapy targets all rapidly replicating tissues, adverse effects map anatomically: Head (alopecia), Mouth/GI (stomatitis, mucositis, CINV), Bone Marrow (neutropenia, thrombocytopenia, anemia at nadir), and Systemic (CACS, profound fatigue).',
    keyPoints: [
      'Head: Alopecia typically begins 2-3 weeks post-treatment; causes significant psychosocial distress; hair regrowth usually begins 4-8 weeks post-chemo.',
      'Mouth/GI: Stomatitis and mucositis occur along the alimentary canal; require non-alcoholic rinses, cryotherapy during bolus 5-FU, and soft/bland diets.',
      'Bone Marrow Myelosuppression: The Nadir (lowest point of blood counts) typically occurs 7 to 14 days after chemotherapy administration.',
      'Neutropenia (ANC < 1000/mm³): Risk for life-threatening sepsis; fever >= 100.4°F is an immediate emergency.',
      'Thrombocytopenia (Platelets < 50,000/mm³): Bleeding precautions; < 20,000/mm³ confers risk for spontaneous intracranial or GI hemorrhage.',
      'Systemic & Metabolic: Cancer-related anorexia-cachexia syndrome (CACS) and cytokine-driven cancer-related fatigue.',
    ],
    detailedSections: [
      {
        heading: 'Anatomical Toxicity Mapping',
        paragraphs: [
          'Alopecia: Keratinocyte turnover in hair bulb matrices is among the fastest in the human body. Hair loss begins 2 to 3 weeks following initial treatment. Nursing support includes proactive head coverings, scalp cooling caps (vasoconstriction to reduce follicular drug uptake), and validating emotional grief regarding body image alteration.',
          'Gastrointestinal Mucosa: Rapid turnover of mucosal enterocytes leads to painful ulcerations from mouth to anus (stomatitis/esophagitis/colitis). Clients suffer dysphagia, diarrhea, and nutrient malabsorption. Avoid lemon-glycerin swabs, commercial alcohol mouthwashes, and spicy or acidic foods.',
          'Bone Marrow Myelosuppression: Stem cells in hematopoietic marrow are profoundly sensitive to cell cycle disruptions. The resulting cytopenias include neutropenia, thrombocytopenia, and anemia.',
        ],
      },
      {
        heading: 'The Chemotherapy Nadir: Clinical Management',
        paragraphs: [
          'The Nadir represents the lowest cell counts following antineoplastic administration, typically occurring 7 to 14 days post-infusion (though delayed up to 21-28 days with agents like Mitomycin C or Carmustine).',
          'Neutropenia: Calculate Absolute Neutrophil Count (ANC). ANC < 1,000/mm³ indicates neutropenia; ANC < 500/mm³ indicates severe neutropenia with high risk of systemic infection. Implement neutropenic precautions: private room, strict hand hygiene, no fresh flowers or standing water, cooked foods only, avoid rectal exams/suppositories.',
          'Thrombocytopenia: Platelet counts < 50,000/mm³ require bleeding precautions (soft toothbrush, electric razor, avoid IM injections, gentle nose blowing). Counts < 20,000/mm³ require immediate transfusion and monitoring for intracranial hemorrhage.',
        ],
        callout: {
          type: 'warning',
          title: 'The Blunted Inflammatory Response',
          text: 'Because neutropenic clients cannot produce pus or mount erythema, fever (>= 100.4°F / 38.0°C) may be the ONLY clinical sign of life-threatening septic shock.',
        },
      },
    ],
    graphicId: 'anatomical-toxicities-graphic',
    graphicTitle: 'Anatomical Mapping of Systemic Chemotherapy Toxicities',
    mnemonics: [
      {
        acronym: 'NADIR',
        title: 'Bone Marrow Nadir Protocol',
        breakdown: [
          { letter: 'N', meaning: 'Neutropenia: Check ANC daily, private room if <1000' },
          { letter: 'A', meaning: 'Avoid rectal temps, suppositories, and raw foods' },
          { letter: 'D', meaning: 'Decontamination: Rigorous handwashing before entering' },
          { letter: 'I', meaning: 'Immediate broad-spectrum antibiotics within 60 min of fever >=100.4°F' },
          { letter: 'R', meaning: 'Recover counts before initiating subsequent chemo cycle' },
        ],
        clinicalSignificance: 'Standardizes critical care priorities during the nadir phase of therapy.',
      },
      {
        acronym: 'BLEED',
        title: 'Thrombocytopenic Precautions',
        breakdown: [
          { letter: 'B', meaning: 'Blow nose gently; avoid forceful valsalva straining' },
          { letter: 'L', meaning: 'Laxatives (stool softeners) to prevent rectal fissures' },
          { letter: 'E', meaning: 'Electric razor only; no straight-edge safety blades' },
          { letter: 'E', meaning: 'Eliminate invasive procedures (No IM injections, no enemas)' },
          { letter: 'D', meaning: 'Dental care via ultra-soft toothbrush or foam swabs' },
        ],
        clinicalSignificance: 'Protects clients with platelet counts < 50,000 from life-threatening hemorrhage.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-9-1',
        stem: 'A client who completed a chemotherapy cycle 10 days ago presents with an ANC of 420/mm³ and an oral temperature of 100.6°F (38.1°C). Which physician order must the nurse execute first?',
        options: [
          'Administer 650 mg oral acetaminophen for fever reduction.',
          'Obtain two sets of blood cultures and administer IV broad-spectrum antibiotics within 60 minutes.',
          'Order a standard high-protein, raw-vegetable nutritional tray.',
          'Discharge the client with instructions to call back if fever reaches 102°F.',
        ],
        correctIndex: 1,
        rationale:
          'Page 15 and 18 emphasize that neutropenic fever (ANC < 500 with temp >= 100.4°F) is a medical emergency requiring rapid blood cultures and prompt IV broad-spectrum antibiotics within 60 minutes to prevent septic shock.',
        sourceSlide: 15,
      },
      {
        id: 'mq-9-2',
        stem: 'A client undergoing chemotherapy develops Grade 3 oral mucositis. Which nursing recommendation is appropriate for oral hygiene care?',
        options: [
          'Cleanse the oral cavity with a commercial alcohol-based antiseptic mouthwash four times daily.',
          'Rinse the mouth with a warm 0.9% normal saline and sodium bicarbonate solution before and after meals.',
          'Scrub oral ulcerations vigorously with a firm-bristle toothbrush to remove exudate.',
          'Instruct the client to consume hot, spicy citrus juices to stimulate saliva production.',
        ],
        correctIndex: 1,
        rationale:
          'Page 15 and 18 outline mucositis care: alcohol mouthwashes and lemon-glycerin swabs cause tissue dehydration and severe pain. Bland saline/bicarbonate rinses soothe mucosa and prevent secondary infection.',
        sourceSlide: 15,
      },
      {
        id: 'mq-9-3',
        stem: 'When educating a client receiving myelosuppressive chemotherapy regarding the expected "nadir", which timeframe should the nurse provide for the lowest drop in blood cell counts?',
        options: [
          'Within 24 hours of chemotherapy infusion completion.',
          'Typically between 7 to 14 days following chemotherapy administration.',
          'Exactly 6 months after completing the entire treatment protocol.',
          'Only after the client develops severe clinical signs of sepsis.',
        ],
        correctIndex: 1,
        rationale:
          'Page 15 notes that myelosuppression typically peaks at the nadir, occurring 7 to 14 days post-chemotherapy.',
        sourceSlide: 15,
      },
    ],
  },
  {
    id: 'topic-10',
    title: 'Oncologic Emergencies: The Red Flag Dashboard',
    subtitle: 'SVCS, Spinal Cord Compression, Hypercalcemia, and Tumor Lysis Syndrome',
    sourceSlide: 16,
    category: 'Acute Care & Emergencies',
    summary:
      'Oncologic emergencies demand prompt recognition and intervention: Superior Vena Cava Syndrome (SVCS), Spinal Cord Compression (SCC), Hypercalcemia of Malignancy (>10.5 mg/dL), and Tumor Lysis Syndrome (rapid hyperkalemia, hyperphosphatemia, hypocalcemia, hyperuricemia).',
    keyPoints: [
      'Superior Vena Cava Syndrome (SVCS): Compression by mediastinal mass/thrombus. Red flags: Facial/periorbital edema, dyspnea, engorged thoracic veins, Pemberton sign. Management: High Fowler position, dexamethasone, emergent radiation/stenting.',
      'Spinal Cord Compression (SCC): Epidural metastasis. Red flags: Radicular localized back pain exacerbated by lying down, progressive lower extremity weakness, new-onset bowel/bladder incontinence. Management: High-dose IV steroids, emergent MRI, surgical decompression.',
      'Hypercalcemia of Malignancy (Serum Ca > 10.5 mg/dL): Bone osteolysis or PTHrP secretion. Red flags: Lethargy, confusion, hyporeflexia, extreme thirst, polyuria, shortened QT. Management: Aggressive IV 0.9% Normal Saline hydration, IV Bisphosphonates (Zoledronic acid), Calcitonin.',
      'Tumor Lysis Syndrome (TLS): Rapid lysis of bulky tumors. Hallmark electrolyte shifts: Hyperkalemia, Hyperphosphatemia, Hypocalcemia, Hyperuricemia. Management: Aggressive hydration, Rasburicase, Allopurinol, cardiac telemetry.',
    ],
    detailedSections: [
      {
        heading: 'Superior Vena Cava Syndrome (SVCS)',
        paragraphs: [
          'Pathophysiology: External compression or intraluminal thrombosis of the thin-walled superior vena cava, commonly seen in non-small cell lung cancer, small cell lung cancer, and mediastinal lymphomas.',
          'Clinical Signs: Dyspnea (most common), facial and periorbital edema, sensation of fullness in the head, collateral venous engorgement over anterior chest wall, stridor.',
          'Nursing Actions: Elevate head of bed (High Fowler) to facilitate venous drainage; avoid blood pressures or venipunctures in upper extremities; administer corticosteroids and oxygen; prepare for emergent radiation therapy or endovascular stenting.',
        ],
      },
      {
        heading: 'Spinal Cord Compression (SCC)',
        paragraphs: [
          'Pathophysiology: Direct tumor extension into the epidural space, commonly arising from breast, lung, prostate, renal cell, or myeloma metastases.',
          'Clinical Signs: New-onset localized or radicular back pain aggravated by recumbency, coughing, or straining; motor weakness; sensory loss below the lesion; late signs include urinary retention, fecal incontinence, and paralysis.',
          'Nursing Actions: Administer high-dose IV dexamethasone immediately to reduce vasogenic cord edema; maintain spinal immobilization; obtain emergent whole-spine MRI; prepare for neurosurgical decompression or radiation.',
        ],
      },
      {
        heading: 'Hypercalcemia of Malignancy',
        paragraphs: [
          'Pathophysiology: Occurs in up to 30% of advanced malignancies via tumor secretion of Parathyroid Hormone-related Protein (PTHrP) or direct osteolytic bone metastases.',
          'Clinical Signs: "Bones, Stones, Groans, and Psychiatric Overtones"—severe constipation, nausea/vomiting, lethargy, confusion, hyporeflexia, polyuria, dehydration, cardiac dysrhythmias (shortened QT interval). Correct for hypoalbuminemia!',
          'Nursing Actions: Infuse IV 0.9% Normal Saline at 200-300 mL/hr to restore intravascular volume and promote renal calcium excretion; administer IV bisphosphonates (Zoledronic acid or Pamidronate) to halt osteoclastic bone resorption; administer subcutaneous Calcitonin for rapid, short-term reduction.',
        ],
      },
      {
        heading: 'Tumor Lysis Syndrome (TLS)',
        paragraphs: [
          'Pathophysiology: Rapid intracellular lysis of massive tumor burdens following cytotoxic therapy (especially acute leukemias and high-grade lymphomas). Large volumes of intracellular electrolytes and nucleic acids flood the bloodstream.',
          'Electrolyte Shifts (P-U-K-Ca): Hyperphosphatemia, Hyperuricemia, Hyperkalemia, and reciprocal Hypocalcemia. Uric acid and calcium phosphate crystals precipitate in renal tubules, causing acute tubular necrosis and acute kidney injury (AKI).',
          'Clinical Signs: ECG changes (peaked T waves, widened QRS from hyperkalemia), tetany, positive Chvostek/Trousseau signs (hypocalcemia), oliguria, flank pain, seizures.',
          'Nursing Actions: Vigorous IV pre-hydration (2.5-3 L/m²/day); administer Rasburicase (catalyzes insoluble uric acid into soluble allantoin) or Allopurinol (inhibits xanthine oxidase); continuous cardiac telemetry; monitor electrolytes every 6 to 12 hours.',
        ],
        callout: {
          type: 'alert',
          title: 'The Fatal Electrolyte in TLS',
          text: 'Hyperkalemia (>6.0 mEq/L) is the most rapidly lethal complication in TLS, capable of inducing fatal ventricular fibrillation within minutes. Keep IV calcium gluconate, insulin/glucose, and telemetry on hand.',
        },
      },
    ],
    graphicId: 'emergencies-graphic',
    graphicTitle: 'Oncologic Emergencies: The Red Flag Dashboard',
    mnemonics: [
      {
        acronym: 'PUK-Ca',
        title: 'Tumor Lysis Syndrome Electrolyte Shifts',
        breakdown: [
          { letter: 'P', meaning: 'Phosphorus Up (Hyperphosphatemia > 4.5 mg/dL)' },
          { letter: 'U', meaning: 'Uric Acid Up (Hyperuricemia > 8.0 mg/dL precipitates AKI)' },
          { letter: 'K', meaning: 'Potassium Up (Hyperkalemia > 5.0 mEq/L induces dysrhythmias)' },
          { letter: 'Ca', meaning: 'Calcium Down (Hypocalcemia < 8.5 mg/dL causing tetany)' },
        ],
        clinicalSignificance: 'Identifies the classic metabolic quartet of tumor lysis syndrome.',
      },
      {
        acronym: 'CORD',
        title: 'Spinal Cord Compression Red Flags',
        breakdown: [
          { letter: 'C', meaning: 'Constant back pain worsening when supine' },
          { letter: 'O', meaning: 'Onset of motor weakness in lower extremities' },
          { letter: 'R', meaning: 'Radicular sensory band or numbness' },
          { letter: 'D', meaning: 'Defecation / bladder incontinence (Late ominous emergency)' },
        ],
        clinicalSignificance: 'Guides triage nurses to identify epidural compression before irreversible paraplegia develops.',
      },
    ],
    miniQuiz: [
      {
        id: 'mq-10-1',
        stem: 'A client receiving induction chemotherapy for high-grade lymphoma develops peaked T waves on the cardiac monitor, serum potassium of 6.3 mEq/L, and serum uric acid of 11.2 mg/dL. What condition is developing?',
        options: [
          'Superior Vena Cava Syndrome (SVCS)',
          'Tumor Lysis Syndrome (TLS)',
          'Hypercalcemia of Malignancy',
          'Spinal Cord Compression',
        ],
        correctIndex: 1,
        rationale:
          'Page 16 identifies rapid electrolyte shifts (Hyperkalemia, Hyperuricemia, Hyperphosphatemia, Hypocalcemia) secondary to massive tumor breakdown as Tumor Lysis Syndrome (TLS).',
        sourceSlide: 16,
      },
      {
        id: 'mq-10-2',
        stem: 'A client with metastatic prostate cancer complains of severe mid-thoracic back pain that intensifies when lying down, along with bilateral lower-extremity stumbling. What is the nurse’s immediate priority?',
        options: [
          'Administer an oral NSAID and schedule physical therapy evaluation for next week.',
          'Notify the physician immediately, maintain spinal immobilization, and prepare for emergent whole-spine MRI and IV corticosteroids.',
          'Instruct the client to perform deep-knee squats to evaluate quadriceps strength.',
          'Perform a straight catheterization and discharge the client home with a walker.',
        ],
        correctIndex: 1,
        rationale:
          'Page 16 describes Spinal Cord Compression as an oncologic emergency. Worsening supine back pain with motor deficits requires urgent MRI and high-dose dexamethasone to prevent permanent paralysis.',
        sourceSlide: 16,
      },
      {
        id: 'mq-10-3',
        stem: 'A client with squamous cell lung carcinoma exhibits confusion, muscle weakness, severe thirst, and a serum calcium of 13.8 mg/dL. Which medication should the nurse anticipate administering to promote long-term reduction in bone resorption?',
        options: [
          'Oral Calcium carbonate',
          'IV Bisphosphonate (e.g., Zoledronic acid or Pamidronate)',
          'IV Potassium chloride bolus',
          'Subcutaneous Filgrastim (G-CSF)',
        ],
        correctIndex: 1,
        rationale:
          'Page 16 identifies Hypercalcemia of Malignancy (>10.5 mg/dL). Following initial IV normal saline hydration, IV bisphosphonates (Zoledronic acid) are administered to inhibit osteoclast-mediated bone breakdown.',
        sourceSlide: 16,
      },
    ],
  },
];

export const LAB_VALUES_DATA: LabValueItem[] = [
  {
    id: 'lab-1',
    name: 'Absolute Neutrophil Count (ANC)',
    category: 'Hematology / Nadir',
    normalRangeText: '1,500 – 8,000 /mm³',
    unit: '/mm³',
    minSpectrum: 0,
    maxSpectrum: 10000,
    lowThreshold: 1500,
    highThreshold: 8000,
    criticalLowThreshold: 500,
    typicalClinicalValue: 650, // Moderately neutropenic nadir example
    clinicalSignificance:
      'Calculated as WBC × (% Segmented Neutrophils + % Bands) / 100. Measures actual infection-fighting granulocytes. ANC < 1,000 indicates neutropenia; < 500 is severe neutropenia (high sepsis risk).',
    oncologyContext: 'Nadir occurs 7-14 days post-chemo. An oral temperature >= 100.4°F with ANC < 1,000 is an immediate oncologic emergency.',
    sourceSlide: 15,
  },
  {
    id: 'lab-2',
    name: 'Platelets (Thrombocytes)',
    category: 'Hematology / Nadir',
    normalRangeText: '150,000 – 450,000 /mm³',
    unit: '/mm³',
    minSpectrum: 0,
    maxSpectrum: 500000,
    lowThreshold: 150000,
    highThreshold: 450000,
    criticalLowThreshold: 20000,
    typicalClinicalValue: 42000, // Thrombocytopenic bleeding precautions
    clinicalSignificance:
      'Essential for primary hemostasis. Counts < 50,000 require bleeding precautions. Counts < 20,000 carry severe risk for spontaneous fatal intracranial or gastrointestinal hemorrhage.',
    oncologyContext: 'Myelosuppression from alkylating agents, antimetabolites, and radiation. Avoid IM injections, rectal probes, and NSAIDs.',
    sourceSlide: 15,
  },
  {
    id: 'lab-3',
    name: 'Hemoglobin (Hgb)',
    category: 'Hematology / Nadir',
    normalRangeText: '12.0 – 17.5 g/dL',
    unit: 'g/dL',
    minSpectrum: 4.0,
    maxSpectrum: 20.0,
    lowThreshold: 12.0,
    highThreshold: 17.5,
    criticalLowThreshold: 7.0,
    typicalClinicalValue: 8.4, // Chemo-induced anemia
    clinicalSignificance:
      'Oxygen-carrying capacity of erythrocytes. Suppression causes profound cancer-related fatigue, dyspnea on exertion, tachycardia, and poor tissue oxygenation.',
    oncologyContext: 'Transfusion threshold typically Hgb < 7.0-8.0 g/dL or symptomatic anemia. Managed with PRBC transfusions or ESAs when indicated.',
    sourceSlide: 15,
  },
  {
    id: 'lab-4',
    name: 'Total White Blood Cell Count (WBC)',
    category: 'Hematology / Nadir',
    normalRangeText: '4,500 – 11,000 /mm³',
    unit: '/mm³',
    minSpectrum: 500,
    maxSpectrum: 25000,
    lowThreshold: 4500,
    highThreshold: 11000,
    criticalLowThreshold: 2000,
    typicalClinicalValue: 2200,
    clinicalSignificance:
      'Total circulating leukocyte population. Low in bone marrow suppression; elevated in hematologic malignancies (leukemias) or active secondary infections.',
    oncologyContext: 'Must calculate differential to derive ANC. Do not rely solely on total WBC, as blast cells can falsely elevate counts in leukemias.',
    sourceSlide: 15,
  },
  {
    id: 'lab-5',
    name: 'Serum Calcium (Total)',
    category: 'Electrolytes & Oncologic Emergencies',
    normalRangeText: '8.5 – 10.5 mg/dL',
    unit: 'mg/dL',
    minSpectrum: 5.0,
    maxSpectrum: 16.0,
    lowThreshold: 8.5,
    highThreshold: 10.5,
    criticalHighThreshold: 12.0,
    typicalClinicalValue: 12.8, // Hypercalcemia of malignancy
    clinicalSignificance:
      'Regulates neuromuscular excitability, cardiac conduction, and bone mineralization. Hypercalcemia (>10.5 mg/dL) causes confusion, lethargy, hyporeflexia, polyuria, and shortened QT.',
    oncologyContext: 'Occurs in up to 30% of cancer cases via osteolytic metastases or PTHrP secretion. Correct for hypoalbuminemia. Managed with IV NS + Bisphosphonates.',
    sourceSlide: 16,
  },
  {
    id: 'lab-6',
    name: 'Serum Uric Acid',
    category: 'Metabolic & Tumor Lysis Syndrome',
    normalRangeText: '2.5 – 7.0 mg/dL',
    unit: 'mg/dL',
    minSpectrum: 1.0,
    maxSpectrum: 18.0,
    lowThreshold: 2.5,
    highThreshold: 7.0,
    criticalHighThreshold: 8.0,
    typicalClinicalValue: 10.4, // TLS Spike
    clinicalSignificance:
      'End-product of purine nucleic acid catabolism. Massive cellular lysis releases purines, leading to hyperuricemia. Crystals precipitate in distal renal tubules, causing acute tubular necrosis.',
    oncologyContext: 'Hallmark of Tumor Lysis Syndrome (TLS). Prevent with Allopurinol (xanthine oxidase inhibitor) or treat with Rasburicase (degrades uric acid to allantoin).',
    sourceSlide: 16,
  },
  {
    id: 'lab-7',
    name: 'Serum Potassium (K+)',
    category: 'Electrolytes & Tumor Lysis Syndrome',
    normalRangeText: '3.5 – 5.0 mEq/L',
    unit: 'mEq/L',
    minSpectrum: 2.0,
    maxSpectrum: 8.0,
    lowThreshold: 3.5,
    highThreshold: 5.0,
    criticalHighThreshold: 6.0,
    criticalLowThreshold: 3.0,
    typicalClinicalValue: 5.8, // TLS Hyperkalemia
    clinicalSignificance:
      'Primary intracellular cation. In TLS, massive tumor cell destruction dumps potassium into extracellular fluid, leading to peaked T waves, prolonged PR, widened QRS, and fatal arrhythmias.',
    oncologyContext: 'Potentially fatal complication of TLS. Immediate cardiac telemetry required. Managed with IV Calcium Gluconate (cardiac membrane stabilization), Insulin + D50, and Kayexalate.',
    sourceSlide: 16,
  },
  {
    id: 'lab-8',
    name: 'Serum Phosphorus (PO4)',
    category: 'Electrolytes & Tumor Lysis Syndrome',
    normalRangeText: '2.5 – 4.5 mg/dL',
    unit: 'mg/dL',
    minSpectrum: 1.0,
    maxSpectrum: 10.0,
    lowThreshold: 2.5,
    highThreshold: 4.5,
    criticalHighThreshold: 5.5,
    typicalClinicalValue: 6.8, // TLS Hyperphosphatemia
    clinicalSignificance:
      'Malignant cells contain up to 4x more intracellular phosphate than normal cells. Rapid lysis causes hyperphosphatemia, which precipitates with calcium, causing hypocalcemia and renal calcification.',
    oncologyContext: 'Core component of TLS (P-U-K-Ca). Managed with aggressive IV hydration and oral phosphate binders (e.g., Sevelamer, Aluminum hydroxide).',
    sourceSlide: 16,
  },
  {
    id: 'lab-9',
    name: 'Prostate-Specific Antigen (PSA)',
    category: 'Tumor Markers & Screening',
    normalRangeText: '< 4.0 ng/mL',
    unit: 'ng/mL',
    minSpectrum: 0,
    maxSpectrum: 30.0,
    lowThreshold: 0,
    highThreshold: 4.0,
    typicalClinicalValue: 6.2, // Elevated screening flag
    clinicalSignificance:
      'Glycoprotein produced by prostate epithelial cells. Levels > 4.0 ng/mL warrant further diagnostic evaluation (repeat testing, free PSA percentage, biopsy) for prostate adenocarcinoma or BPH.',
    oncologyContext: 'ACS guidelines recommend annual PSA and DRE discussion starting at age 50 for men with average risk (or age 45 for high risk).',
    sourceSlide: 9,
  },
  {
    id: 'lab-10',
    name: 'Serum Albumin',
    category: 'Nutrition & Cachexia (CACS)',
    normalRangeText: '3.5 – 5.0 g/dL',
    unit: 'g/dL',
    minSpectrum: 1.5,
    maxSpectrum: 6.0,
    lowThreshold: 3.5,
    highThreshold: 5.0,
    criticalLowThreshold: 2.5,
    typicalClinicalValue: 2.8, // CACS / Malnutrition
    clinicalSignificance:
      'Key marker of visceral protein stores and oncotic pressure. Severe hypoalbuminemia indicates progressive CACS, systemic inflammation, and altered drug-protein binding.',
    oncologyContext: 'Serum calcium must be mathematically corrected when albumin is low: Corrected Ca = Serum Ca + 0.8 × (4.0 - Albumin).',
    sourceSlide: 3,
  },
];

export const CLINICAL_INTERVENTIONS: ClinicalStepIntervention[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Neutropenic Fever & Nadir Crisis Protocol',
    phase: 'Immediate Critical Triage',
    keyAction: 'Isolate client in private room, assess vital signs, verify fever >= 100.4°F, obtain 2 sets of blood cultures, and start IV broad-spectrum antibiotics within 60 minutes.',
    priorityLevel: 'Immediate',
    detailedProcedure: [
      'Confirm oral or tympanic temperature >= 100.4°F (38.0°C). Strictly avoid rectal temperatures or suppositories to prevent mucosal tears and bacteremia.',
      'Place client in a private room under protective neutropenic precautions; ensure all personnel and visitors perform strict alcohol-based hand hygiene.',
      'Auscultate lungs, inspect IV catheter sites, oral mucosa, and perianal region for subtle erythema or tenderness (pus will be absent due to lack of neutrophils).',
      'Draw two separate sets of blood cultures (one peripheral, one through central venous catheter) prior to antimicrobial administration.',
      'Initiate empiric anti-pseudomonal beta-lactam IV antibiotic (e.g., Cefepime 2g or Piperacillin-Tazobactam 4.5g) within the critical 60-minute "Golden Hour".',
      'Administer Subcutaneous G-CSF (Filgrastim) as prescribed to accelerate bone marrow granulocyte recovery.',
    ],
    clinicalRationale:
      'Page 15 & 18: Neutropenic fever is a life-threatening medical emergency. Because neutrophils are depleted, the classic signs of inflammation (pus, extensive redness) are absent. Unchecked bacteremia can progress to septic shock and vascular collapse within hours.',
    redFlagSigns: ['Hypotension (SBP < 90 mmHg)', 'Tachycardia > 110 bpm', 'Tachypnea > 24/min', 'Altered mental status / lethargy', 'Rigors / chills'],
    sourceSlide: 18,
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Chemotherapy Vesicant Extravasation Emergency Protocol',
    phase: 'Antineoplastic Infusion Safety',
    keyAction: 'Immediately STOP infusion at the first sign of burning, swelling, or loss of blood return. Do NOT remove the catheter initially. Aspirate residual drug and follow antidote protocol.',
    priorityLevel: 'Immediate',
    detailedProcedure: [
      'Halt the infusion pump immediately upon client report of pain, burning, stinging, or upon visual detection of swelling or lack of brisk blood return.',
      'Leave the IV catheter or Huber needle in place; disconnect the IV tubing and attach a 5 mL syringe to aspirate as much residual drug and subcutaneous fluid as possible.',
      'Notify the treating oncologist and chemotherapy-certified pharmacist immediately to obtain specific extravasation antidotes.',
      'For DNA-binding vesicants like Anthracyclines (Doxorubicin): Apply topical dry cold packs (15-20 min QID) to induce vasoconstriction, and administer IV Dexrazoxane within 6 hours.',
      'For Plant Alkaloid vesicants (Vincristine, Vinblastine): Apply dry HEAT packs to facilitate vasodilation and drug dispersion; inject Subcutaneous Hyaluronidase.',
      'Elevate the affected extremity above heart level for 48 hours and perform photographic documentation of the site.',
    ],
    clinicalRationale:
      'Page 12 & 14: Vesicants cause severe progressive tissue destruction, ischemic ulceration, necrosis, and tendon damage requiring surgical debridement and grafting if extravasation is not managed promptly.',
    redFlagSigns: ['Severe burning at IV site', 'Absence of brisk venous blood return', 'Induration / blanching / erythema', 'Subcutaneous blistering'],
    sourceSlide: 12,
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Oncologic Emergency Rapid Triage (SVCS & Cord Compression)',
    phase: 'Structural Decompression Triage',
    keyAction: 'Position client in High Fowler position for SVCS; for suspected Cord Compression, maintain spinal alignment and administer immediate high-dose IV Dexamethasone.',
    priorityLevel: 'Immediate',
    detailedProcedure: [
      'Superior Vena Cava Syndrome (SVCS): Elevate head of bed to 90 degrees (High Fowler) to reduce thoracic venous hydrostatic pressure. Administer high-flow humidified oxygen.',
      'Place strict "NO Blood Pressure / NO Venipuncture" signs above both upper extremities to avoid increasing venous stasis and worsening periorbital/cerebral edema.',
      'Spinal Cord Compression (SCC): If client presents with new progressive radicular back pain aggravated when supine or motor weakness, enforce strict bedrest and spinal alignment.',
      'Administer IV Dexamethasone (10-20 mg initial bolus) immediately to decrease vasogenic spinal cord edema and prevent axonal ischemia.',
      'Expedite STAT emergent whole-spine contrast-enhanced MRI and consult radiation oncology/neurosurgery for emergent decompression.',
    ],
    clinicalRationale:
      'Page 16: SVCS leads to upper-body venous congestion, stridor, and cerebral edema. SCC is an acute neurosurgical emergency where delayed intervention results in permanent, irreversible paraplegia.',
    redFlagSigns: ['Stridor / laryngeal edema (SVCS)', 'Engorged jugular and thoracic veins', 'New-onset urinary retention or fecal incontinence (SCC)', 'Bilateral lower-extremity paresis'],
    sourceSlide: 16,
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Tumor Lysis Syndrome (TLS) Hyper-Hydration & Cytoprotection',
    phase: 'Metabolic Detoxification',
    keyAction: 'Initiate aggressive IV hydration with 0.9% Normal Saline at 2.5–3 L/m²/day, administer Rasburicase/Allopurinol, connect continuous telemetry, and monitor P-U-K-Ca labs Q6H.',
    priorityLevel: 'Priority',
    detailedProcedure: [
      'Begin vigorous IV hydration with 0.9% Normal Saline (or 5% Dextrose in 0.45% NS) 24 to 48 hours prior to starting cytotoxic therapy in high-risk bulky malignancies.',
      'Target urine output >= 100 mL/m²/hr (approximately 150-200 mL/hr in adults) with a urine specific gravity <= 1.010 to prevent intraluminal crystallization.',
      'Administer IV Rasburicase (0.15-0.20 mg/kg) over 30 minutes for hyperuricemia. Draw blood samples on ICE for lab analysis (uric acid continues to break down at room temperature).',
      'Connect continuous 12-lead ECG telemetry monitoring to detect peaked T waves, QT widening, and ventricular irritability from acute hyperkalemia.',
      'Withhold all potassium and phosphorus supplements from IV maintenance solutions and oral diet.',
    ],
    clinicalRationale:
      'Page 16: Massive tumor lysis releases intracellular potassium, phosphate, and purines. Unchecked hyperuricemia and calcium phosphate precipitates obstruct renal collecting tubules, leading to acute kidney injury and fatal cardiac arrest.',
    redFlagSigns: ['Serum Potassium > 6.0 mEq/L', 'Peaked T waves / widened QRS on ECG', 'Oliguria (< 30 mL/hr)', 'Positive Chvostek or Trousseau sign'],
    sourceSlide: 16,
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Stomatitis & Mucositis Clinical Protocol',
    phase: 'Mucosal Barrier Preservation',
    keyAction: 'Inspect oral cavity daily, grade mucositis (WHO scale 0–4), perform bland saline/bicarbonate oral rinses Q2H, avoid alcohol mouthwashes, and manage pain with topical/systemic analgesics.',
    priorityLevel: 'Ongoing Assessment',
    detailedProcedure: [
      'Perform thorough oral mucosal assessment before and after each chemotherapy cycle, documenting erythema, leukoplakia, pseudomembranes, and ulcerations.',
      'Instruct client to rinse oral cavity with 1/2 tsp salt + 1/2 tsp baking soda in 8 oz warm water every 2 hours while awake and after meals.',
      'Strictly eliminate all commercial mouthwashes containing alcohol, hydrogen peroxide solutions, and lemon-glycerin swabs which dry mucosa and degrade tissue.',
      'For Grade 2-4 painful mucositis, administer topical "Magic Mouthwash" (Diphenhydramine, Lidocaine, Aluminum/Magnesium Hydroxide) or IV PCA opioids prior to eating.',
      'Provide soft, bland, room-temperature or chilled foods (popsicles, pureed soups, gelatin); avoid hot, spicy, acidic, or abrasive textures.',
    ],
    clinicalRationale:
      'Page 15 & 18: Chemotherapy and head/neck radiation destroy rapidly dividing oral epithelial cells, exposing submucosal capillaries to oral flora and serving as a primary portal of entry for fatal systemic bacteremia in neutropenic clients.',
    redFlagSigns: ['Inability to swallow liquids (Grade 4)', 'Oral hemorrhage', 'White curd-like plaques (oral candidiasis)', 'Submandibular lymphadenopathy'],
    sourceSlide: 15,
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'WHO Cancer Pain Ladder Titration & Breakthrough Protocol',
    phase: 'Continuous Symptom Titration',
    keyAction: 'Evaluate pain score (0–10) and etiology, administer scheduled around-the-clock analgesics based on WHO Step (1–3), provide rapid-onset rescue opioid for breakthrough pain, and initiate prophylactic bowel regimen.',
    priorityLevel: 'Ongoing Assessment',
    detailedProcedure: [
      'Assess pain intensity (0-10), location, radiation, quality, and aggravating/alleviating factors every 4 hours and 30 minutes following opioid administration.',
      'Step 1 (Mild 1-3): Non-opioid (Acetaminophen max 3g/day, NSAIDs if platelets > 50,000) +/- adjuvant (Gabapentin for neuropathic pain).',
      'Step 2 (Moderate 4-6): Weak opioid (Codeine, Hydrocodone, Tramadol) combined with non-opioid +/- adjuvant.',
      'Step 3 (Severe 7-10): Strong opioid (Morphine, Hydromorphone, Fentanyl, Oxycodone) dosed around-the-clock for persistent chronic baseline cancer pain.',
      'Calculate breakthrough PRN dose as 10% to 15% of the total 24-hour baseline opioid dose, available every 1 to 2 hours as needed.',
      'Never prescribe an around-the-clock opioid without a concurrent daily prophylactic bowel regimen (Senna stimulant laxative + Docusate stool softener); tolerance to constipation never develops.',
    ],
    clinicalRationale:
      'Page 17 & 18: Effective cancer pain management requires around-the-clock scheduling to maintain therapeutic serum levels rather than PRN-only administration, which results in pain breakthroughs.',
    redFlagSigns: ['Sedation Score 3 or 4 (Pasero Opioid-Induced Sedation Scale)', 'Respiratory rate < 10 breaths/min', 'Absence of bowel movement > 3 days (obstipation)', 'Acute neuropathic burning'],
    sourceSlide: 17,
  },
];

export const DRUG_STUDY_DATA: DrugStudyItem[] = [
  {
    id: 'drug-1',
    drugName: 'Cisplatin (Platinol)',
    drugClass: 'Alkylating-Like Platinum Agent (CCNS)',
    doseRoute: '20–100 mg/m² IV infusion every 3–4 weeks based on BSA',
    moa: 'Binds covalently to guanine bases in DNA, forming intra-strand and inter-strand cross-links that halt DNA replication and trigger apoptosis.',
    indications: 'Solid tumors including testicular, ovarian, bladder, and non-small cell lung carcinomas.',
    contraindications: 'Pre-existing renal impairment (Creatinine > 1.5 mg/dL), baseline hearing loss/neuropathy, severe myelosuppression, pregnancy.',
    sideEffects: 'Severe nephrotoxicity (acute tubular necrosis), ototoxicity (tinnitus, high-frequency hearing loss), high emetogenic potential (severe acute and delayed CINV), peripheral neuropathy.',
    interventions: 'Vigorous pre- and post-hydration with 1 to 2 Liters of 0.9% Normal Saline; maintain urine output >= 100 mL/hr; administer aggressive antiemetics (Aprepitant + Ondansetron + Dexamethasone); perform baseline audiometry; monitor BUN/Creatinine.',
    rationales: 'Aggressive pre-hydration dilutes platinum concentrations within renal tubules, mitigating drug-induced acute tubular necrosis and preserving nephron filtration.',
    sourceSlide: 12,
  },
  {
    id: 'drug-2',
    drugName: 'Doxorubicin (Adriamycin)',
    drugClass: 'Antitumor Anthracycline Antibiotic',
    doseRoute: '60–75 mg/m² IV push or infusion every 21 days; lifetime cap 450–550 mg/m²',
    moa: 'Intercalates between DNA base pairs, inhibits Topoisomerase II enzyme, and produces cytotoxic iron-mediated free oxygen radicals that induce DNA strand breaks.',
    indications: 'Breast carcinomas, sarcomas, Hodgkin and non-Hodgkin lymphomas, acute leukemias.',
    contraindications: 'Baseline left ventricular ejection fraction (LVEF) < 50%, severe hepatic impairment, cumulative lifetime dose > 550 mg/m².',
    sideEffects: 'Cardiotoxicity (acute dysrhythmias and progressive irreversible congestive heart failure), severe vesicant tissue necrosis on extravasation, complete alopecia, reddish urine discoloration ("Red Devil").',
    interventions: 'Obtain baseline and serial MUGA scans or Echocardiograms; enforce cumulative lifetime dose limit <= 550 mg/m²; administer via central venous line with confirmed blood return; educate that red urine/tears is a harmless metabolite; administer Dexrazoxane cardioprotectant if lifetime dose approaches cap.',
    rationales: 'Anthracycline-generated free radicals cause lipid peroxidation of myocardial membranes, which have low catalase concentrations, resulting in dose-dependent cumulative cardiomyopathy.',
    sourceSlide: 12,
  },
  {
    id: 'drug-3',
    drugName: 'Cyclophosphamide (Cytoxan)',
    drugClass: 'Nitrogen Mustard Alkylating Agent',
    doseRoute: '500–1,000 mg/m² IV every 3–4 weeks or 1–5 mg/kg oral daily',
    moa: 'Activated by hepatic cytochrome P450 into phosphoramide mustard, which transfers alkyl groups to DNA, causing mispairing and strand breaks.',
    indications: 'Lymphomas, leukemias, breast and ovarian carcinomas, multiple myeloma, autoimmune glomerulonephritis.',
    contraindications: 'Severe bone marrow depression, active hemorrhagic cystitis, urinary outflow tract obstruction.',
    sideEffects: 'Hemorrhagic cystitis (caused by urotoxic metabolite Acrolein), severe myelosuppression, moderate-to-high CINV, secondary malignancies (AML, bladder carcinoma).',
    interventions: 'Administer early in the day; force IV/oral hydration (2-3 L/day); instruct client to void every 2 hours and before bedtime; administer IV Mesna (chemoprotectant) with high doses to bind and detoxify acrolein; monitor urinalysis for micro/gross hematuria.',
    rationales: 'Acrolein concentrates in static bladder urine, directly eroding and inflaming transitional epithelium. Frequent voiding, hydration, and Mesna neutralize this local urothelial toxicity.',
    sourceSlide: 12,
  },
  {
    id: 'drug-4',
    drugName: 'Paclitaxel (Taxol)',
    drugClass: 'Plant Alkaloid / Taxane (M-Phase Specific)',
    doseRoute: '135–175 mg/m² IV infusion over 3 hours every 3 weeks',
    moa: 'Hyper-stabilizes microtubule polymers, preventing spindle depolymerization during mitosis, freezing cancer cells in metaphase and causing mitotic arrest.',
    indications: 'Ovarian, advanced breast, non-small cell lung, and AIDS-related Kaposi sarcoma.',
    contraindications: 'Baseline absolute neutrophil count < 1,500/mm³, history of severe hypersensitivity to polyoxyethylated castor oil (Cremophor EL).',
    sideEffects: 'Severe type-I anaphylactic hypersensitivity reactions (dyspnea, hypotension, bronchospasm, urticaria), peripheral sensory neuropathy (stocking-glove distribution), severe neutropenia, bradycardia.',
    interventions: 'Mandatory premedication 30-60 min prior with Dexamethasone (oral/IV), Diphenhydramine (IV), and H2-blocker (Famotidine IV); infuse via non-PVC IV tubing through an in-line 0.22-micron filter; continuous vital sign monitoring during first 15 minutes.',
    rationales: 'Cremophor EL vehicle triggers complement activation and histamine release. Premedication with dual-histamine blockade and corticosteroids prevents life-threatening anaphylactoid shock.',
    sourceSlide: 13,
  },
  {
    id: 'drug-5',
    drugName: 'Vincristine (Oncovin)',
    drugClass: 'Vinca Alkaloid (M-Phase Specific)',
    doseRoute: '1.4 mg/m² IV (single dose capped at 2.0 mg maximum)',
    moa: 'Binds to tubulin dimers, preventing microtubule assembly and mitotic spindle formation, arresting cells in metaphase.',
    indications: 'Acute lymphocytic leukemia (ALL), Hodgkin and non-Hodgkin lymphomas, neuroblastoma, Wilms tumor.',
    contraindications: 'FOR INTRAVENOUS USE ONLY. INTRATHECAL ADMINISTRATION IS FATAL. Demyelinating Charcot-Marie-Tooth syndrome.',
    sideEffects: 'Dose-limiting neurotoxicity (peripheral motor/sensory neuropathy, loss of deep tendon reflexes, foot drop, paresthesias), paralytic ileus / severe obstipation, severe vesicant.',
    interventions: 'Never prepare in a syringe labeled for lumbar puncture; verify single dose is capped at 2.0 mg; assess deep tendon reflexes (Achilles/patellar) and grip strength; assess daily bowel sounds and institute proactive bowel regimens (senna/docusate); treat extravasation with heat and hyaluronidase.',
    rationales: 'Vincristine binds axonal neurotubules, disrupting fast axonal transport. Intrathecal administration causes ascending chemical myeloradiculopathy, encephalopathy, and fatal respiratory arrest.',
    sourceSlide: 13,
  },
  {
    id: 'drug-6',
    drugName: 'Trastuzumab (Herceptin)',
    drugClass: 'Targeted Anti-HER2 Monoclonal Antibody',
    doseRoute: '4 mg/kg IV loading dose, then 2 mg/kg weekly or 6 mg/kg every 3 weeks',
    moa: 'Binds to the extracellular domain of the Human Epidermal Growth Factor Receptor 2 (HER2), inhibiting downstream MAPK and PI3K/Akt oncogenic survival signaling and mediating ADCC.',
    indications: 'HER2-overexpressing (IHC 3+ or FISH amplified) breast carcinomas and HER2+ metastatic gastric/gastroesophageal junction adenocarcinomas.',
    contraindications: 'Pre-existing symptomatic congestive heart failure, pregnancy (causes oligohydramnios and fetal death).',
    sideEffects: 'Cardiotoxicity (reduced LVEF, congestive heart failure), acute infusion-related reactions (fever, chills, rigors), pulmonary toxicity (interstitial pneumonitis).',
    interventions: 'Confirm tumor HER2 status prior to initiation; assess baseline LVEF via Echocardiogram or MUGA scan; repeat LVEF every 3 months; withhold if LVEF drops >= 16% from baseline or below 50%; have Meperidine ready for infusion-induced rigors.',
    rationales: 'HER2 signaling plays an essential survival role in adult cardiomyocytes under stress. Blocking HER2 impairs myocardial contractility, resulting in cardiomyopathy.',
    sourceSlide: 14,
  },
  {
    id: 'drug-7',
    drugName: 'Rituximab (Rituxan)',
    drugClass: 'Targeted Anti-CD20 Monoclonal Antibody',
    doseRoute: '375 mg/m² IV infusion weekly for 4–8 doses',
    moa: 'Binds specifically to the transmembrane CD20 antigen expressed on pre-B and mature B-lymphocytes, initiating complement-dependent cytotoxicity (CDC) and apoptosis.',
    indications: 'CD20-positive non-Hodgkin lymphomas, chronic lymphocytic leukemia (CLL), rheumatoid arthritis, granulomatosis with polyangiitis.',
    contraindications: 'Active, severe hepatitis B infection (causes viral reactivation and fulminant hepatic failure), active systemic infections.',
    sideEffects: 'Severe fatal infusion reactions (80% occur during first infusion: fever, chills, bronchospasm, angioedema), Hepatitis B reactivation, Tumor Lysis Syndrome (in bulky disease), progressive multifocal leukoencephalopathy (PML).',
    interventions: 'Screen for Hepatitis B (HBsAg, anti-HBc) prior to initiation; premedicate with Acetaminophen and Diphenhydramine (and IV Methylprednisolone); start infusion at 50 mg/hr and titrate upward by 50 mg/hr every 30 minutes if tolerated; monitor for TLS.',
    rationales: 'Rapid lysis of CD20+ circulating B-cells triggers massive systemic pro-inflammatory cytokine release (TNF-alpha, IL-6), producing severe hypersensitivity, bronchospasm, and hypotension.',
    sourceSlide: 14,
  },
  {
    id: 'drug-8',
    drugName: 'Pembrolizumab (Keytruda)',
    drugClass: 'Immune Checkpoint Inhibitor (Anti-PD-1)',
    doseRoute: '200 mg IV every 3 weeks or 400 mg IV every 6 weeks',
    moa: 'Binds to the PD-1 receptor on cytotoxic T-lymphocytes, blocking interaction with PD-L1/PD-L2 on tumor cells and restoring the T-cell antitumor immune response.',
    indications: 'Melanoma, non-small cell lung carcinoma, renal cell carcinoma, classical Hodgkin lymphoma, MSI-H/dMMR solid tumors.',
    contraindications: 'Severe life-threatening prior immune-mediated reactions, active autoimmune disease requiring systemic immunosuppression.',
    sideEffects: 'Immune-Related Adverse Events (irAEs): autoimmune colitis (severe diarrhea), pneumonitis (dry cough, hypoxia), endocrinopathies (hypophysitis, thyroiditis, adrenal insufficiency), hepatitis, nephritis.',
    interventions: 'Monitor bowel habits daily (report >= 3 loose stools/day); monitor pulmonary symptoms (new cough/dyspnea); check baseline and serial liver function, serum creatinine, and thyroid panels (TSH, free T4); withhold drug and administer high-dose systemic Corticosteroids (Prednisone 1-2 mg/kg) for Grade 2-3 irAEs.',
    rationales: 'Blocking the physiological PD-1 off-switch removes peripheral self-tolerance checkpoints, enabling unrestrained T-lymphocytes to mount autoimmune inflammatory attacks on normal healthy organs.',
    sourceSlide: 6,
  },
  {
    id: 'drug-9',
    drugName: 'Ondansetron (Zofran)',
    drugClass: 'Serotonin 5-HT3 Receptor Antagonist',
    doseRoute: '8–16 mg IV/oral 30 minutes prior to chemotherapy, then every 8 hours',
    moa: 'Selectively blocks 5-HT3 serotonin receptors located peripherally on vagal nerve terminals in the gut and centrally in the chemoreceptor trigger zone (CTZ).',
    indications: 'Prevention and treatment of acute chemotherapy-induced nausea and vomiting (CINV) and radiation-induced emesis.',
    contraindications: 'Congenital long QT syndrome, concurrent use of Apomorphine (causes profound hypotension).',
    sideEffects: 'Dose-dependent cardiac QT prolongation / Torsades de Pointes, headache, constipation, transient elevation of liver transaminases.',
    interventions: 'Administer 30 minutes PRIOR to initiating emetogenic chemotherapy; obtain baseline ECG and assess serum potassium/magnesium before IV boluses; combine with Dexamethasone for enhanced efficacy against acute CINV; treat headache with acetaminophen.',
    rationales: 'Cytotoxic chemotherapy damages enterochromaffin cells in the duodenal mucosa, triggering massive serotonin release that fires vagal afferents to the vomiting center. Blocking 5-HT3 halts acute emetic cascades.',
    sourceSlide: 18,
  },
  {
    id: 'drug-10',
    drugName: 'Filgrastim (Neupogen / G-CSF)',
    drugClass: 'Granulocyte Colony-Stimulating Factor',
    doseRoute: '5 mcg/kg/day Subcutaneous or IV infusion starting 24 hours post-chemo',
    moa: 'Recombinant human G-CSF that binds to cell surface receptors on hematopoietic stem cells, stimulating proliferation, differentiation, and activation of neutrophil precursors.',
    indications: 'Prevention and reduction of duration/severity of severe neutropenia and neutropenic fever in myelosuppressive chemotherapy.',
    contraindications: 'History of severe allergic reactions to E. coli-derived proteins; do NOT administer within 24 hours BEFORE or AFTER cytotoxic chemotherapy.',
    sideEffects: 'Medullary bone pain (sternum, pelvis, lower back in 20-30% of clients), splenic enlargement and rare splenic rupture, leukocytosis (WBC > 50,000/mm³).',
    interventions: 'Administer >= 24 hours after completion of chemotherapy; monitor CBC with differential twice weekly; treat medullary bone pain with Acetaminophen, NSAIDs, or Loratadine (antihistamine); educate client to immediately report severe left upper quadrant abdominal or shoulder tip pain (splenic rupture).',
    rationales: 'Administering G-CSF concurrently with cytotoxic chemotherapy makes rapidly dividing myeloid precursors highly vulnerable to the antineoplastic agent, exacerbating bone marrow suppression.',
    sourceSlide: 18,
  },
  {
    id: 'drug-11',
    drugName: 'Allopurinol (Zyloprim)',
    drugClass: 'Xanthine Oxidase Inhibitor',
    doseRoute: '300–600 mg/day oral divided doses starting 24–48 hours prior to chemo',
    moa: 'Inhibits xanthine oxidase, the enzyme that converts hypoxanthine to xanthine and xanthine to uric acid, reducing uric acid production.',
    indications: 'Prevention of hyperuricemia and acute uric acid nephropathy in Tumor Lysis Syndrome (TLS).',
    contraindications: 'Severe hypersensitivity reaction to allopurinol (HLA-B*5801 allele carriers), severe renal impairment without dose titration.',
    sideEffects: 'Maculopapular skin rash, Allopurinol Hypersensitivity Syndrome (AHS: exfoliative dermatitis, Stevens-Johnson syndrome, hepatitis, renal failure), nausea, diarrhea.',
    interventions: 'Initiate 24-48 hours before chemotherapy; ensure vigorous concurrent fluid intake (2-3 L/day); maintain neutral or slightly alkaline urine pH (6.5-7.5); immediately and permanently DISCONTINUE at first sign of any cutaneous skin rash.',
    rationales: 'Prevents formation of new insoluble uric acid from degraded tumor cell nucleic acids. Note: Allopurinol does NOT dissolve pre-existing uric acid crystals; only Rasburicase degrades circulating uric acid directly.',
    sourceSlide: 16,
  },
  {
    id: 'drug-12',
    drugName: 'Rasburicase (Elitek)',
    drugClass: 'Recombinant Urate Oxidase Enzyme',
    doseRoute: '0.15–0.20 mg/kg IV infusion over 30 minutes daily for 1–5 days',
    moa: 'Recombinant urate oxidase enzyme that catalyzes the enzymatic oxidation of poorly soluble uric acid directly into allantoin, an inactive, highly soluble metabolite excreted by kidneys.',
    indications: 'Management and treatment of elevated plasma uric acid levels in adults and children with leukemia, lymphoma, and solid tumor TLS.',
    contraindications: 'Glucose-6-Phosphate Dehydrogenase (G6PD) deficiency (causes severe life-threatening acute hemolysis and methemoglobinemia).',
    sideEffects: 'Methemoglobinemia, severe acute hemolysis (in G6PD deficient patients), anaphylaxis, fever, neutropenia with fever, nausea.',
    interventions: 'Screen for G6PD deficiency before administration, especially in clients of African, Mediterranean, or Southeast Asian ancestry; draw blood samples on ICE in pre-chilled heparinized tubes and transport to lab immediately for uric acid assay; have epinephrine ready.',
    rationales: 'Rasburicase enzymatic breakdown of uric acid produces hydrogen peroxide. In G6PD-deficient erythrocytes that lack NADPH/glutathione protective pathways, hydrogen peroxide induces acute hemolytic crisis and methemoglobinemia.',
    sourceSlide: 16,
  },
  {
    id: 'drug-13',
    drugName: 'Zoledronic Acid (Zometa)',
    drugClass: 'Third-Generation Nitrogenous Bisphosphonate',
    doseRoute: '4 mg IV infusion over at least 15 minutes every 3–4 weeks',
    moa: 'Inhibits osteoclastic bone resorption by binding to hydroxyapatite crystals in bone and inhibiting farnesyl pyrophosphate synthase, inducing osteoclast apoptosis.',
    indications: 'Hypercalcemia of malignancy (serum calcium > 10.5 mg/dL or corrected calcium >= 12 mg/dL), multiple myeloma osteolytic lesions, bone metastases from solid tumors.',
    contraindications: 'Severe renal impairment (Creatinine Clearance < 30 mL/min), baseline hypocalcemia, known hypersensitivity.',
    sideEffects: 'Renal impairment / acute tubular necrosis, osteonecrosis of the jaw (ONJ), acute phase reaction (fever, chills, bone pain, arthralgia within 72 hours), hypocalcemia, hypophosphatemia.',
    interventions: 'Ensure client is adequately hydrated with IV normal saline prior to infusion; infuse over a minimum of 15 minutes (never rapid IV push); assess serum creatinine prior to each dose; recommend comprehensive dental examination prior to starting therapy to prevent ONJ; monitor serum calcium and provide vitamin D/calcium supplements only once hypercalcemia has resolved.',
    rationales: 'Rapid infusion of bisphosphonates precipitates in renal capillary networks, causing acute renal failure. Osteoclast inhibition reduces bone remodeling, impairing microvascular healing in the alveolar mandible (ONJ).',
    sourceSlide: 16,
  },
  {
    id: 'drug-14',
    drugName: 'Morphine Sulfate (MS Contin / Roxanol)',
    drugClass: 'Strong Opioid Agonist (WHO Step 3)',
    doseRoute: 'Oral: 15–30 mg Q4H immediate release or 30–60 mg Q12H sustained release; IV: 2–5 mg Q2–4H',
    moa: 'Binds to mu-opioid receptors in the central nervous system, inhibiting ascending nociceptive pain pathways, altering perception of pain, and producing central analgesia and sedation.',
    indications: 'Moderate to severe chronic cancer pain (WHO Step 3), breakthrough oncologic pain, dyspnea in advanced palliative/end-of-life care.',
    contraindications: 'Severe acute respiratory depression, acute or severe bronchial asthma, paralytic ileus, known opioid hypersensitivity.',
    sideEffects: 'Constipation (tolerance never develops), sedation, respiratory depression, nausea and vomiting, pruritus (histamine release), urinary retention, miosis.',
    interventions: 'Administer around-the-clock for baseline chronic cancer pain; provide rescue dose (10-15% of daily dose) for breakthrough pain; continuously monitor respiratory rate and sedation level using the Pasero scale; co-prescribe daily stimulant bowel regimen (senna + docusate); have Naloxone available for severe overdose.',
    rationales: 'Around-the-clock scheduling maintains therapeutic blood levels, preventing pain emergence and avoiding the severe peaks and troughs that exacerbate distress.',
    sourceSlide: 17,
  },
];
