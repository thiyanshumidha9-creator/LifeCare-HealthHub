// Medical Records & Checkup History Component (Lectures 25–30, 49–54, 55–60)
import { useState, useMemo } from "react";
import { sampleCheckups } from "../data/sampleCheckups";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import CheckupCard from "../components/CheckupCard";
import Modal from "../components/common/Modal";
import FormField from "../components/common/FormField";
import EmptyState from "../components/common/EmptyState";

const STORAGE_KEY_CHECKUPS = "lifecare_records_db";

export function Checkups() {
  const { patient } = useAuth();
  const toast = useToast();

  const [records, setRecords] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CHECKUPS);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_CHECKUPS, JSON.stringify(sampleCheckups));
    return sampleCheckups;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("All");

  // Add Health Reading Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState("Dr. Aarti Sharma");
  const [newDisease, setNewDisease] = useState("");
  const [newBp, setNewBp] = useState("120/80 mmHg");
  const [newPulse, setNewPulse] = useState("72 bpm");
  const [newTemp, setNewTemp] = useState("98.6 °F");
  const [newNotes, setNewNotes] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchesSearch =
        rec.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        filterSpecialty === "All" || rec.speciality === filterSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [records, searchTerm, filterSpecialty]);

  function handleSaveRecord(e) {
    e.preventDefault();
    if (!newDisease.trim()) {
      toast.error("Please enter a diagnosis or health summary.");
      return;
    }

    const newRecord = {
      id: `CHK-${Date.now().toString().slice(-4)}`,
      patientId: patient?.id || "P101",
      doctor: newDoctor,
      speciality: newDoctor.includes("Mehta") ? "Cardiologist" : "General Physician",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      disease: newDisease.trim(),
      vitals: {
        bloodPressure: newBp,
        pulse: newPulse,
        temperature: newTemp,
        weight: "58 kg"
      },
      notes: newNotes.trim() || "Routine patient self-monitoring record.",
      medicines: [],
      status: "Completed"
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem(STORAGE_KEY_CHECKUPS, JSON.stringify(updated));

    toast.success("Health reading recorded successfully!");
    setShowAddModal(false);
    setNewDisease("");
    setNewNotes("");
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "35px" }}>
        <div>
          <p className="small-title">CLINICAL RECORDS & DIAGNOSES</p>
          <h1 style={{ fontSize: "2.4rem", margin: "4px 0" }}>Medical Checkup History</h1>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>
            Access verified diagnoses, recorded vital signs, prescription slips, and clinical doctor notes.
          </p>
        </div>

        <button
          type="button"
          className="btn"
          onClick={() => setShowAddModal(true)}
        >
          + Record Health Vitals
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="filter-toolbar" style={{ marginBottom: "25px" }}>
        <div className="search-input-wrapper">
          <span className="search-input-icon">🔍</span>
          <input
            type="text"
            placeholder="Search records by diagnosis, condition, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-selects" style={{ flex: "1 1 200px" }}>
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
          >
            <option value="All">All Specialties</option>
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
          </select>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No Medical Records Match"
          message="No checkup records match your search or filter criteria. Try resetting your search."
          actionText="Show All Records"
          onAction={() => {
            setSearchTerm("");
            setFilterSpecialty("All");
          }}
        />
      ) : (
        <div>
          {filteredRecords.map((item) => (
            <CheckupCard key={item.id} checkup={item} />
          ))}
        </div>
      )}

      {/* ADD HEALTH RECORD MODAL */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Record New Health Vitals Reading"
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleSaveRecord}
            >
              Save Record
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveRecord}>
          <FormField label="Consulting Doctor">
            <select
              value={newDoctor}
              onChange={(e) => setNewDoctor(e.target.value)}
            >
              <option value="Dr. Aarti Sharma">Dr. Aarti Sharma - General Physician</option>
              <option value="Dr. Vikram Mehta">Dr. Vikram Mehta - Cardiologist</option>
              <option value="Dr. Simran Kaur">Dr. Simran Kaur - Dermatologist</option>
              <option value="Home Monitoring">Home Monitoring / Self Check</option>
            </select>
          </FormField>

          <FormField
            label="Diagnosis / Health Reason"
            required
            placeholder="e.g. Mild headache and blood pressure follow up"
            value={newDisease}
            onChange={(e) => setNewDisease(e.target.value)}
          />

          <div className="grid-3" style={{ gap: "10px", margin: "10px 0" }}>
            <FormField
              label="Blood Pressure"
              placeholder="120/80 mmHg"
              value={newBp}
              onChange={(e) => setNewBp(e.target.value)}
            />
            <FormField
              label="Pulse (bpm)"
              placeholder="72 bpm"
              value={newPulse}
              onChange={(e) => setNewPulse(e.target.value)}
            />
            <FormField
              label="Temp (°F)"
              placeholder="98.6 °F"
              value={newTemp}
              onChange={(e) => setNewTemp(e.target.value)}
            />
          </div>

          <FormField
            label="Clinical Remarks / Symptoms"
            type="textarea"
            rows={2}
            placeholder="Describe physical sensations, diet, or notes..."
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
}

export default Checkups;