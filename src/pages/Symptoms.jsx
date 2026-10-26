// Interactive Symptom Checker & Health Triage (Lectures 25–30, 31–36, 61–66)
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const symptomsDatabase = [
  { id: "fever", name: "High Fever / Chills", category: "General" },
  { id: "cough", name: "Persistent Cough", category: "Respiratory" },
  { id: "headache", name: "Throbbing Headache", category: "Neurological" },
  { id: "chest_tightness", name: "Chest Pressure / Tightness", category: "Cardiovascular" },
  { id: "stomach_pain", name: "Abdominal / Stomach Pain", category: "Gastrointestinal" },
  { id: "skin_rash", name: "Itchy Skin Rash / Hives", category: "Dermatological" },
  { id: "joint_pain", name: "Joint Stiffness / Knee Pain", category: "Orthopedic" },
  { id: "dizziness", name: "Dizziness / Lightheadedness", category: "Neurological" },
  { id: "fatigue", name: "Unusual Extreme Fatigue", category: "General" },
  { id: "sore_throat", name: "Sore Throat / Difficulty Swallowing", category: "Respiratory" }
];

export function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState(["fever"]);
  const [severity, setSeverity] = useState("Moderate");
  const [duration, setDuration] = useState("2-4 days");

  function toggleSymptom(id) {
    if (selectedSymptoms.includes(id)) {
      if (selectedSymptoms.length > 1) {
        setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
      }
    } else {
      if (selectedSymptoms.length < 4) {
        setSelectedSymptoms([...selectedSymptoms, id]);
      }
    }
  }

  // Triage algorithm calculating recommended care level and specialist
  const triageResult = useMemo(() => {
    const hasChest = selectedSymptoms.includes("chest_tightness");
    const hasFever = selectedSymptoms.includes("fever");
    const hasCough = selectedSymptoms.includes("cough");
    const hasRash = selectedSymptoms.includes("skin_rash");
    const hasJoint = selectedSymptoms.includes("joint_pain");
    const hasHeadache = selectedSymptoms.includes("headache");
    const hasStomach = selectedSymptoms.includes("stomach_pain");

    // Emergency check
    if (hasChest || (hasHeadache && severity === "Severe")) {
      return {
        level: "emergency",
        title: "Immediate Medical Attention Advised",
        badge: "Emergency 108 / Urgent Care",
        specialist: "Cardiologist",
        doctorQuery: "Dr. Vikram Mehta",
        conditions: [
          "Cardiovascular evaluation required",
          "Hypertensive episode or acute migraine",
          "Musculoskeletal chest strain"
        ],
        advice: "Do not drive yourself. If experiencing shortness of breath or radiating pain to the left arm, call Emergency 108 immediately.",
        action: "Call Emergency Hotline"
      };
    }

    if (hasRash) {
      return {
        level: "routine",
        title: "Dermatological Assessment Recommended",
        badge: "Routine Outpatient Care",
        specialist: "Dermatologist",
        doctorQuery: "Dr. Simran Kaur",
        conditions: ["Allergic Contact Dermatitis", "Urticaria / Hives", "Eczematous Reaction"],
        advice: "Avoid harsh perfumed soaps and scratching. Cool compresses may alleviate itching.",
        action: "Book Dermatologist"
      };
    }

    if (hasJoint) {
      return {
        level: "routine",
        title: "Orthopedic / Joint Examination",
        badge: "Routine Outpatient Care",
        specialist: "Orthopedic",
        doctorQuery: "Dr. Rajesh Singh",
        conditions: ["Ligament Strain / Sprain", "Early Osteoarthritis", "Post-exercise Tendonitis"],
        advice: "Rest the affected joint. Apply ice for 15 minutes twice daily. Avoid strenuous load.",
        action: "Book Orthopedic Specialist"
      };
    }

    if (hasFever && hasCough) {
      return {
        level: "routine",
        title: "Upper Respiratory Viral Evaluation",
        badge: "Outpatient Consultation",
        specialist: "General Physician",
        doctorQuery: "Dr. Aarti Sharma",
        conditions: ["Viral Pharyngitis / Seasonal Flu", "Acute Bronchitis", "Upper Respiratory Infection"],
        advice: "Maintain good hydration (2.5L warm fluids daily), rest, and monitor body temperature. Seek urgent care if breathing is labored.",
        action: "Book Physician Consultation"
      };
    }

    if (hasStomach) {
      return {
        level: "routine",
        title: "Gastrointestinal Evaluation",
        badge: "Outpatient Consultation",
        specialist: "General Physician",
        doctorQuery: "Dr. Aarti Sharma",
        conditions: ["Gastritis / Acid Reflux", "Food-related Gastroenteritis", "Functional Dyspepsia"],
        advice: "Eat bland meals (oatmeal, rice, toast). Avoid caffeine, fried food, and citrus fruits.",
        action: "Book Physician Consultation"
      };
    }

    // Default General Physician
    return {
      level: "routine",
      title: "General Wellness & Symptom Review",
      badge: "Standard Consultation",
      specialist: "General Physician",
      doctorQuery: "Dr. Aarti Sharma",
      conditions: ["General Fatigue / Mild Viral Illness", "Dehydration", "Tension-type Malaise"],
      advice: "Ensure 8 hours of sleep, balanced nutrition, and adequate fluids. Schedule a doctor visit if symptoms persist.",
      action: "Book General Physician"
    };
  }, [selectedSymptoms, severity, duration]);

  return (
    <div className="container">
      <div className="page-heading">
        <p className="small-title">CLINICAL TRIAGE ASSISTANT</p>
        <h1>Interactive Symptom Checker</h1>
        <p>
          Select your current symptoms to receive structured triage guidance and specialist recommendations.
        </p>
      </div>

      <div className="symptom-box">
        <div className="form-icon">🔍</div>
        <h2>What symptoms are you experiencing?</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.925rem" }}>
          Select up to 4 symptoms currently affecting you:
        </p>

        {/* SYMPTOM SELECTOR CHIPS */}
        <div className="symptom-chips-container" role="group" aria-label="Symptom choices">
          {symptomsDatabase.map((item) => {
            const isSelected = selectedSymptoms.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={`symptom-chip ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSymptom(item.id)}
                aria-pressed={isSelected}
              >
                {isSelected ? "✓ " : "+ "}
                {item.name}
              </button>
            );
          })}
        </div>

        {/* SEVERITY & DURATION SELECTORS */}
        <div className="grid-2" style={{ gap: "14px", margin: "20px 0" }}>
          <div>
            <label className="form-label">Symptom Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="Mild">Mild (Noticeable but does not disrupt routine)</option>
              <option value="Moderate">Moderate (Interferes with work / daily tasks)</option>
              <option value="Severe">Severe (Intense, debilitating discomfort)</option>
            </select>
          </div>

          <div>
            <label className="form-label">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="Under 24 hours">Under 24 hours</option>
              <option value="2-4 days">2 to 4 days</option>
              <option value="Over a week">Over a week</option>
            </select>
          </div>
        </div>

        {/* TRIAGE ASSESSMENT RESULT CARD */}
        <div className="triage-result-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span className={`triage-urgency-badge ${triageResult.level}`}>
                ● {triageResult.badge}
              </span>
              <h3 style={{ fontSize: "1.25rem", margin: "4px 0 8px" }}>
                {triageResult.title}
              </h3>
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Specialty: <strong>{triageResult.specialist}</strong>
            </span>
          </div>

          <p style={{ fontSize: "0.925rem", color: "var(--text-body)", margin: "8px 0" }}>
            <strong>First-Aid & Care Guidance:</strong> {triageResult.advice}
          </p>

          <div style={{ margin: "14px 0" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-main)" }}>
              Possible Clinical Considerations:
            </span>
            <ul style={{ paddingLeft: "20px", marginTop: "4px", fontSize: "0.875rem", color: "var(--text-muted)" }}>
              {triageResult.conditions.map((cond, i) => (
                <li key={i}>{cond}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(8, 127, 140, 0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Suggested Doctor: <strong>{triageResult.doctorQuery}</strong>
            </span>

            {triageResult.level === "emergency" ? (
              <Link to="/emergency" className="btn btn-red">
                🚨 Emergency Contacts & Protocols
              </Link>
            ) : (
              <Link
                to={`/appointment?doctor=${encodeURIComponent(triageResult.doctorQuery)}`}
                className="btn"
              >
                📅 {triageResult.action} →
              </Link>
            )}
          </div>
        </div>

        {/* MANDATORY EDUCATIONAL MEDICAL DISCLAIMER */}
        <div className="warning">
          <strong>⚠️ Educational Disclaimer:</strong> This symptom checker is an interactive
          educational tool built for Front-End Engineering II evaluation and is NOT a substitute
          for formal medical diagnosis, clinical prognosis, or emergency triage. In life-threatening
          situations, dial <strong>108</strong> or visit your nearest emergency trauma ward immediately.
        </div>
      </div>
    </div>
  );
}

export default Symptoms;