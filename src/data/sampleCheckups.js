// Medical history / past checkup records for demonstration
// Front-End Engineering II Project: LifeCare

export const sampleCheckups = [
  {
    id: "CHK-2026-01",
    patientId: "P101",
    doctor: "Dr. Aarti Sharma",
    speciality: "General Physician",
    date: "12 July 2026",
    disease: "Allergic Rhinitis & Seasonal Cough",
    vitals: {
      bloodPressure: "118/76 mmHg",
      pulse: "72 bpm",
      temperature: "98.4 °F",
      weight: "58 kg"
    },
    symptoms: "Sneezing, dry cough, itchy throat aggravated in evenings.",
    notes: "No chest congestion detected. Advised saline nasal wash and antihistamines for 5 days. Avoid dust exposure.",
    medicines: [
      { name: "Levocetirizine 5mg", dosage: "1 tablet once daily at bedtime", duration: "5 days" },
      { name: "Warm Saline Gargle", dosage: "Twice daily", duration: "7 days" }
    ],
    status: "Completed",
    followUp: "As needed"
  },
  {
    id: "CHK-2026-02",
    patientId: "P101",
    doctor: "Dr. Vikram Mehta",
    speciality: "Cardiologist",
    date: "15 April 2026",
    disease: "Mild Fatigue & Routine Cardiac Screening",
    vitals: {
      bloodPressure: "122/80 mmHg",
      pulse: "78 bpm",
      temperature: "98.6 °F",
      weight: "58.5 kg"
    },
    symptoms: "Mild lethargy after work hours.",
    notes: "Resting ECG normal, sinus rhythm intact. Lipid profile within healthy reference limits. Advised 30 mins brisk walking.",
    medicines: [
      { name: "Coenzyme Q10 / Multivitamin", dosage: "1 capsule with breakfast", duration: "30 days" },
      { name: "Hydration Guidelines", dosage: "2.5 - 3 Liters water daily", duration: "Ongoing" }
    ],
    status: "Completed",
    followUp: "After 6 months"
  },
  {
    id: "CHK-2026-03",
    patientId: "P101",
    doctor: "Dr. Aarti Sharma",
    speciality: "General Physician",
    date: "10 January 2026",
    disease: "Viral Pharyngitis (Common Cold)",
    vitals: {
      bloodPressure: "115/75 mmHg",
      pulse: "84 bpm",
      temperature: "100.2 °F",
      weight: "59 kg"
    },
    symptoms: "Low-grade fever, sore throat, runny nose for 2 days.",
    notes: "Pharyngeal erythema noted without exudates. Symptomatic treatment prescribed.",
    medicines: [
      { name: "Paracetamol 650mg", dosage: "1 tablet SOS if fever > 100°F (max 3/day)", duration: "3 days" },
      { name: "Vitamin C 500mg (Chewable)", dosage: "1 tablet daily", duration: "10 days" }
    ],
    status: "Completed",
    followUp: "If fever persists beyond 72 hours"
  }
];
