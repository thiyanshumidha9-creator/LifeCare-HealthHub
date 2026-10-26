// Patient Dashboard Component (Lectures 49–54: Context API & Dashboard Mini-Project)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import { useToast } from "../context/ToastContext";
import { sampleCheckups } from "../data/sampleCheckups";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";
import FormField from "../components/common/FormField";

export function Dashboard() {
  const { patient, logout, updateProfile } = useAuth();
  const { appointments, getNextAppointment } = useAppointments();
  const toast = useToast();
  const navigate = useNavigate();

  // Profile Edit Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editPhone, setEditPhone] = useState(patient?.phone || "+91 98765 11223");
  const [editEmail, setEditEmail] = useState(patient?.email || `${patient?.name?.toLowerCase().replace(/\s+/g, "") || "patient"}@lifecare.org`);
  const [editBlood, setEditBlood] = useState(patient?.blood || "O+");
  const [emergencyContact, setEmergencyContact] = useState(patient?.emergencyContact || "+91 98765 99887");

  // Get next upcoming appointment
  const nextApt = getNextAppointment(patient?.id, patient?.name);

  function handleLogout() {
    logout();
    toast.info("Logged out successfully.");
    navigate("/login", { replace: true });
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    updateProfile({
      phone: editPhone,
      email: editEmail,
      blood: editBlood,
      emergencyContact
    });
    toast.success("Profile contact details updated successfully.");
    setShowProfileModal(false);
  }

  return (
    <div className="container">
      {/* DASHBOARD HEADER */}
      <div className="dashboard-header">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="profile-avatar-circle">
            {patient?.name ? patient.name.charAt(0).toUpperCase() : "P"}
          </div>

          <div>
            <p className="small-title">PATIENT PORTAL DASHBOARD</p>
            <h1>Welcome, {patient?.name || "Patient"}</h1>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Patient ID: <strong>{patient?.id || "P101"}</strong> • Blood Group:{" "}
              <strong style={{ color: "var(--accent-red)" }}>{patient?.blood || "O+"}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setShowProfileModal(true)}
          >
            ✏️ Edit Profile
          </button>
          <button
            type="button"
            className="btn btn-red"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* HEALTH OVERVIEW CARDS */}
      <div className="section-title left" style={{ marginBottom: "20px" }}>
        <p className="small-title">HEALTH OVERVIEW</p>
        <h2>Your Vital Statistics</h2>
      </div>

      <div className="grid">
        {/* Next Appointment Card */}
        <div className="card dashboard-card" style={{ borderLeft: "5px solid var(--primary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="card-icon" style={{ margin: 0 }}>📅</div>
            {nextApt ? (
              <StatusBadge status={nextApt.status} />
            ) : (
              <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>No Active Slots</span>
            )}
          </div>
          <p style={{ marginTop: "14px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Next Scheduled Appointment
          </p>
          {nextApt ? (
            <div>
              <h3 style={{ fontSize: "1.25rem", margin: "4px 0" }}>{nextApt.doctorName}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--primary)", fontWeight: 600 }}>
                {nextApt.date} at {nextApt.time}
              </p>
              <Link
                to="/appointment?tab=history"
                style={{ fontSize: "0.825rem", color: "var(--text-muted)", textDecoration: "underline" }}
              >
                Manage Appointment →
              </Link>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: "1.1rem", margin: "4px 0", color: "var(--text-light)" }}>None Scheduled</h3>
              <Link to="/appointment" className="btn btn-sm btn-secondary" style={{ marginTop: "6px" }}>
                + Book Now
              </Link>
            </div>
          )}
        </div>

        {/* Blood Group Card */}
        <div className="card dashboard-card" style={{ borderLeft: "5px solid var(--accent-red)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="card-icon" style={{ background: "var(--accent-red-light)", color: "var(--accent-red)", margin: 0 }}>
              🩸
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-green)", fontWeight: 700 }}>
              ✓ Registered Donor
            </span>
          </div>
          <p style={{ marginTop: "14px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Blood Group
          </p>
          <h2 style={{ color: "var(--accent-red)", fontSize: "2.4rem", margin: "4px 0" }}>
            {patient?.blood || "O+"}
          </h2>
          <Link to="/donate" style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
            Blood Bank Stock & Requests →
          </Link>
        </div>

        {/* Medical Checkups Card */}
        <div className="card dashboard-card" style={{ borderLeft: "5px solid var(--secondary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="card-icon" style={{ background: "var(--secondary-light)", color: "var(--secondary)", margin: 0 }}>
              📋
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>All-Time</span>
          </div>
          <p style={{ marginTop: "14px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Recorded Checkups
          </p>
          <h2 style={{ color: "var(--secondary)", fontSize: "2.4rem", margin: "4px 0" }}>
            {sampleCheckups.length}
          </h2>
          <Link to="/checkups" style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
            View Diagnoses & Vitals →
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="section-title left" style={{ margin: "40px 0 16px" }}>
        <p className="small-title">QUICK ACTIONS</p>
        <h2>Healthcare Services</h2>
      </div>

      <div className="dashboard-actions" style={{ marginTop: 0 }}>
        <Link to="/appointment" className="action-card">
          <span>📅</span>
          <div>
            <h3>Book Appointment</h3>
            <p>Schedule a visit with your preferred specialist</p>
          </div>
        </Link>

        <Link to="/doctors" className="action-card">
          <span>👨‍⚕️</span>
          <div>
            <h3>Doctors Directory</h3>
            <p>Browse qualifications, reviews, and clinical fees</p>
          </div>
        </Link>

        <Link to="/checkups" className="action-card">
          <span>📋</span>
          <div>
            <h3>Medical Records</h3>
            <p>Access vitals, doctor notes, and prescriptions</p>
          </div>
        </Link>

        <Link to="/donate" className="action-card">
          <span>🩸</span>
          <div>
            <h3>Blood Center</h3>
            <p>Check available stock or request urgent units</p>
          </div>
        </Link>

        <Link to="/symptoms" className="action-card">
          <span>🔍</span>
          <div>
            <h3>Symptom Checker</h3>
            <p>Interactive triage and specialist recommendations</p>
          </div>
        </Link>

        <Link to="/emergency" className="action-card" style={{ borderLeft: "4px solid var(--accent-red)" }}>
          <span>🚑</span>
          <div>
            <h3 style={{ color: "var(--accent-red)" }}>Emergency Services</h3>
            <p>24/7 hotline numbers and trauma assistance</p>
          </div>
        </Link>
      </div>

      {/* RECENT MEDICAL RECORDS SUMMARY */}
      <div style={{ marginTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <p className="small-title">CLINICAL RECORDS</p>
            <h2>Recent Checkup History</h2>
          </div>
          <Link to="/checkups" className="btn btn-sm btn-outline">
            View All Records ({sampleCheckups.length}) →
          </Link>
        </div>

        <div>
          {sampleCheckups.slice(0, 2).map((chk) => (
            <div key={chk.id} className="checkup-card card">
              <div className="checkup-date">
                <span style={{ fontSize: "1.2rem", display: "block" }}>📅</span>
                {chk.date}
              </div>

              <div className="checkup-info">
                <h3>{chk.doctor}</h3>
                <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "4px" }}>
                  {chk.speciality}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {chk.disease}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                <StatusBadge status="completed" />
                <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>BP: {chk.vitals.bloodPressure}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Edit Patient Contact & Medical Info"
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowProfileModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleSaveProfile}
            >
              Save Profile Changes
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveProfile}>
          <FormField
            label="Contact Phone"
            type="tel"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            required
          />

          <FormField
            label="Email Address"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            required
          />

          <FormField label="Blood Group" required>
            <select
              value={editBlood}
              onChange={(e) => setEditBlood(e.target.value)}
            >
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </FormField>

          <FormField
            label="Emergency Contact Phone"
            type="tel"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            helperText="Hospital will notify this contact during critical situations."
          />
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;