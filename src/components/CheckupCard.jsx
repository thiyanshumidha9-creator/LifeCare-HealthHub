// CheckupCard Component (Lectures 25–30: Reusable UI Components)
import { useState } from "react";
import StatusBadge from "./common/StatusBadge";
import Modal from "./common/Modal";

export function CheckupCard({ checkup, onSelect }) {
  const [showModal, setShowModal] = useState(false);

  // Support both legacy props and object prop
  const data = checkup || {};
  const doctor = data.doctor || "Consultant Physician";
  const speciality = data.speciality || "General Medicine";
  const date = data.date || "Past Visit";
  const disease = data.disease || "Routine Medical Checkup";
  const vitals = data.vitals || {};
  const notes = data.notes || "Routine examination completed. Patient reported healthy recovery.";
  const medicines = data.medicines || [];

  return (
    <>
      <div className="checkup-card card">
        <div className="checkup-date">
          <span style={{ fontSize: "1.2rem", display: "block" }}>📅</span>
          {date}
        </div>

        <div className="checkup-info">
          <h3>{doctor}</h3>
          <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "4px" }}>
            {speciality}
          </p>
          <p>
            <strong>Diagnosis:</strong> {disease}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
          <StatusBadge status="completed" />
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => {
              if (onSelect) onSelect(data);
              else setShowModal(true);
            }}
          >
            View Slip & Vitals →
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Medical Record: ${disease}`}
        footer={
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close Record
          </button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
            <div>
              <h4 style={{ color: "var(--text-main)", marginBottom: "2px" }}>{doctor}</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{speciality}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Date of Visit:</span>
              <p style={{ fontWeight: 700, color: "var(--text-main)" }}>{date}</p>
            </div>
          </div>

          {vitals && Object.keys(vitals).length > 0 && (
            <div>
              <h4 style={{ fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "8px" }}>
                Recorded Vitals
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
                {vitals.bloodPressure && (
                  <div style={{ background: "var(--bg-subtle)", padding: "8px 12px", borderRadius: "8px" }}>
                    <small style={{ color: "var(--text-muted)", display: "block" }}>Blood Pressure</small>
                    <strong>{vitals.bloodPressure}</strong>
                  </div>
                )}
                {vitals.pulse && (
                  <div style={{ background: "var(--bg-subtle)", padding: "8px 12px", borderRadius: "8px" }}>
                    <small style={{ color: "var(--text-muted)", display: "block" }}>Pulse</small>
                    <strong>{vitals.pulse}</strong>
                  </div>
                )}
                {vitals.temperature && (
                  <div style={{ background: "var(--bg-subtle)", padding: "8px 12px", borderRadius: "8px" }}>
                    <small style={{ color: "var(--text-muted)", display: "block" }}>Temp</small>
                    <strong>{vitals.temperature}</strong>
                  </div>
                )}
                {vitals.weight && (
                  <div style={{ background: "var(--bg-subtle)", padding: "8px 12px", borderRadius: "8px" }}>
                    <small style={{ color: "var(--text-muted)", display: "block" }}>Weight</small>
                    <strong>{vitals.weight}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "6px" }}>Doctor's Remarks</h4>
            <p style={{ background: "var(--primary-subtle)", padding: "12px", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-body)" }}>
              {notes}
            </p>
          </div>

          {medicines && medicines.length > 0 && (
            <div>
              <h4 style={{ fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "8px" }}>Prescribed Medications</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {medicines.map((med, idx) => (
                  <li key={idx} style={{ padding: "8px 12px", background: "var(--bg-subtle)", borderRadius: "6px", marginBottom: "6px", fontSize: "0.875rem" }}>
                    <strong>{med.name}</strong> — {med.dosage} ({med.duration})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default CheckupCard;