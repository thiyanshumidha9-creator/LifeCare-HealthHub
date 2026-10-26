// Appointment Management Hub (Lectures 19–24, 25–30, 49–54, 55–60, 61–66)
// Demonstrates: Full CRUD workflows, controlled forms, validation, modals, tabs, toasts, browser persistence

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import { useToast } from "../context/ToastContext";
import { doctorsData } from "../data/doctorsData";
import FormField from "../components/common/FormField";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import EmptyState from "../components/common/EmptyState";

const availableTimeSlots = [
  "09:30 AM",
  "10:15 AM",
  "11:00 AM",
  "11:45 AM",
  "02:30 PM",
  "03:15 PM",
  "04:00 PM",
  "05:30 PM"
];

export function Appointment() {
  const [searchParams] = useSearchParams();
  const { patient } = useAuth();
  const {
    appointments,
    bookAppointment,
    rescheduleAppointment,
    cancelAppointment,
    getPatientAppointments
  } = useAppointments();
  const toast = useToast();

  // Active Main Tab ("book" | "history")
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "history" ? "history" : "book"
  );

  // Sub-filter for history tab ("all" | "upcoming" | "completed" | "cancelled")
  const [historyFilter, setHistoryFilter] = useState("all");
  const [historySearch, setHistorySearch] = useState("");

  // Booking Form State (Controlled inputs)
  const prefilledDoctorName = searchParams.get("doctor") || "";
  const [name, setName] = useState(patient?.name || "");
  const [phone, setPhone] = useState(patient?.phone || "");
  const [selectedDoctorName, setSelectedDoctorName] = useState(prefilledDoctorName);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [consultationType, setConsultationType] = useState("In-Person Clinic Visit");
  const [reason, setReason] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Modal States
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");
  const [newRescheduleTime, setNewRescheduleTime] = useState("");
  const [rescheduleReasonText, setRescheduleReasonText] = useState("");

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelReasonText, setCancelReasonText] = useState("Schedule conflict / patient request");

  const [viewSlipTarget, setViewSlipTarget] = useState(null);

  // Sync patient name if auth state changes
  useEffect(() => {
    if (patient?.name && !name) {
      setName(patient.name);
    }
  }, [patient, name]);

  // If query param changes, update doctor
  useEffect(() => {
    if (prefilledDoctorName) {
      setSelectedDoctorName(prefilledDoctorName);
      setActiveTab("book");
    }
  }, [prefilledDoctorName]);

  // Today's date for HTML date input min attribute
  const todayString = new Date().toISOString().split("T")[0];

  // Form Validation Logic (Lectures 55–60)
  function validateForm() {
    const errs = {};

    if (!name.trim()) {
      errs.name = "Patient full name is required.";
    } else if (name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }

    if (!phone.trim()) {
      errs.phone = "Contact phone number is required.";
    } else if (!/^[0-9+ -]{8,15}$/.test(phone.trim())) {
      errs.phone = "Please enter a valid phone number (e.g. +91 98765 43210).";
    }

    if (!selectedDoctorName) {
      errs.doctor = "Please select a medical specialist.";
    }

    if (!date) {
      errs.date = "Please select an appointment date.";
    } else if (date < todayString) {
      errs.date = "Appointment date cannot be in the past.";
    }

    if (!time) {
      errs.time = "Please choose an available consultation time slot.";
    }

    if (!reason.trim()) {
      errs.reason = "Please briefly describe your medical reason or symptoms.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // Handle Form Submission
  async function handleBookSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the highlighted fields before submitting.");
      return;
    }

    setSubmitting(true);

    // Simulate network submission delay (Lectures 67–72)
    await new Promise((res) => setTimeout(res, 400));

    const matchedDoc = doctorsData.find((d) => d.name === selectedDoctorName);

    const booked = bookAppointment({
      patientId: patient?.id || "GUEST",
      patientName: name.trim(),
      patientPhone: phone.trim(),
      doctorId: matchedDoc?.id || "doc-general",
      doctorName: selectedDoctorName,
      doctorPhoto: matchedDoc?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
      speciality: matchedDoc?.speciality || "Consultant",
      date,
      time,
      consultationType,
      reason: reason.trim(),
      fee: matchedDoc?.fee || 500
    });

    setSubmitting(false);
    toast.success(`Appointment confirmed with ${selectedDoctorName} for ${date} at ${time}!`);

    // Reset non-user fields
    setDate("");
    setTime("");
    setReason("");
    setErrors({});

    // Switch to history tab to see the newly booked appointment
    setActiveTab("history");
  }

  // Handle Reschedule Action
  function handleConfirmReschedule() {
    if (!newRescheduleDate || !newRescheduleTime) {
      toast.warning("Please choose both a new date and time slot.");
      return;
    }
    if (newRescheduleDate < todayString) {
      toast.error("New appointment date cannot be in the past.");
      return;
    }

    rescheduleAppointment(
      rescheduleTarget.id,
      newRescheduleDate,
      newRescheduleTime,
      rescheduleReasonText
    );
    toast.success(`Appointment rescheduled to ${newRescheduleDate} at ${newRescheduleTime}.`);
    setRescheduleTarget(null);
  }

  // Handle Cancel Action
  function handleConfirmCancel() {
    if (!cancelTarget) return;
    cancelAppointment(cancelTarget.id, cancelReasonText);
    toast.info(`Appointment with ${cancelTarget.doctorName} has been cancelled.`);
    setCancelTarget(null);
  }

  // Filtered appointments for History Tab
  const patientAppointments = getPatientAppointments(patient?.id, patient?.name, historyFilter);
  const displayAppointments = patientAppointments.filter((apt) => {
    if (!historySearch.trim()) return true;
    const q = historySearch.toLowerCase();
    return (
      apt.doctorName.toLowerCase().includes(q) ||
      apt.speciality?.toLowerCase().includes(q) ||
      apt.reason?.toLowerCase().includes(q) ||
      apt.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container">
      <div className="page-heading">
        <p className="small-title">APPOINTMENT MANAGEMENT</p>
        <h1>Schedule & Manage Consultations</h1>
        <p>Book hospital visits, manage scheduled consultations, or view clinical visit slips.</p>
      </div>

      {/* TABS HEADER (Lectures 61–66: Tabs Component) */}
      <div className="tabs-header" role="tablist" aria-label="Appointment sections">
        <button
          type="button"
          className={`tab-btn ${activeTab === "book" ? "active" : ""}`}
          onClick={() => setActiveTab("book")}
          role="tab"
          aria-selected={activeTab === "book"}
        >
          📅 Book New Appointment
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
          role="tab"
          aria-selected={activeTab === "history"}
        >
          📋 My Appointments
          <span className="tab-badge">{appointments.length}</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: BOOKING FORM
         ========================================================================= */}
      {activeTab === "book" && (
        <div className="form-container" style={{ maxWidth: "680px" }}>
          <div className="form-icon">📅</div>
          <h2>Book a Consultation</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.925rem", marginBottom: "24px" }}>
            Select your preferred medical specialist, date, and available time slot.
          </p>

          <form onSubmit={handleBookSubmit} noValidate>
            <div className="grid-2" style={{ gap: "16px" }}>
              <FormField
                label="Patient Name"
                required
                error={errors.name}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <FormField
                label="Contact Phone"
                required
                error={errors.phone}
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <FormField
              label="Select Medical Specialist"
              required
              error={errors.doctor}
            >
              <select
                value={selectedDoctorName}
                onChange={(e) => setSelectedDoctorName(e.target.value)}
                className={errors.doctor ? "input-error" : ""}
                aria-label="Select doctor"
              >
                <option value="">-- Choose a Doctor --</option>
                {doctorsData.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} — {doc.speciality} (₹{doc.fee})
                  </option>
                ))}
              </select>
            </FormField>

            <div className="grid-2" style={{ gap: "16px" }}>
              <FormField
                label="Appointment Date"
                required
                error={errors.date}
                type="date"
                min={todayString}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <FormField label="Consultation Mode" required>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                >
                  <option value="In-Person Clinic Visit">🏥 In-Person Clinic Visit</option>
                  <option value="Video Consultation">📹 Telehealth Video Consultation</option>
                </select>
              </FormField>
            </div>

            {/* Time Slot Picker Pills */}
            <div className="form-group" style={{ margin: "16px 0 20px" }}>
              <label className="form-label">
                Select Time Slot <span className="required-star">*</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`btn btn-sm ${time === slot ? "" : "btn-secondary"}`}
                    onClick={() => setTime(slot)}
                    style={{
                      borderRadius: "9999px",
                      padding: "6px 14px",
                      boxShadow: "none"
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.time && (
                <p className="field-error" style={{ marginTop: "6px" }}>
                  ⚠️ {errors.time}
                </p>
              )}
            </div>

            <FormField
              label="Reason for Visit / Symptoms"
              required
              error={errors.reason}
              type="textarea"
              rows={3}
              placeholder="e.g. Persistent fever and throat pain for 3 days; routine follow up..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <button type="submit" className="btn btn-lg" disabled={submitting} style={{ width: "100%", marginTop: "16px" }}>
              {submitting ? "Processing Booking..." : "Confirm & Schedule Appointment"}
            </button>
          </form>
        </div>
      )}

      {/* =========================================================================
          TAB 2: APPOINTMENT HISTORY & MANAGEMENT (FULL CRUD)
         ========================================================================= */}
      {activeTab === "history" && (
        <div>
          {/* Sub-Filter Controls */}
          <div className="filter-toolbar" style={{ marginBottom: "24px" }}>
            <div className="search-input-wrapper">
              <span className="search-input-icon">🔍</span>
              <input
                type="text"
                placeholder="Search appointments by doctor, reason, or ID..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                className={`btn btn-sm ${historyFilter === "all" ? "" : "btn-outline"}`}
                onClick={() => setHistoryFilter("all")}
              >
                All ({appointments.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${historyFilter === "upcoming" ? "" : "btn-outline"}`}
                onClick={() => setHistoryFilter("upcoming")}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`btn btn-sm ${historyFilter === "completed" ? "" : "btn-outline"}`}
                onClick={() => setHistoryFilter("completed")}
              >
                Completed
              </button>
              <button
                type="button"
                className={`btn btn-sm ${historyFilter === "cancelled" ? "" : "btn-outline"}`}
                onClick={() => setHistoryFilter("cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>

          {/* Empty State */}
          {displayAppointments.length === 0 && (
            <EmptyState
              icon="📅"
              title="No Appointments Found"
              message={
                historySearch
                  ? `No appointments match "${historySearch}".`
                  : "You have no appointments in this view."
              }
              actionText="Book New Appointment"
              onAction={() => setActiveTab("book")}
            />
          )}

          {/* Appointment Cards List */}
          {displayAppointments.map((apt) => (
            <div key={apt.id} className="appointment-list-card">
              <div className="appointment-info">
                <img
                  src={apt.doctorPhoto}
                  alt={apt.doctorName}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--primary-light)",
                    flexShrink: 0
                  }}
                />

                <div className="appointment-details">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
                    <h3>{apt.doctorName}</h3>
                    <StatusBadge status={apt.status} />
                    <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>ID: {apt.id}</span>
                  </div>

                  <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>
                    {apt.speciality} • {apt.consultationType}
                  </p>

                  <div className="appointment-meta">
                    <span>📅 {apt.date}</span>
                    <span>⏰ {apt.time}</span>
                    <span>👤 {apt.patientName}</span>
                    {apt.fee && <span>💳 ₹{apt.fee}</span>}
                  </div>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "6px" }}>
                    <strong>Reason:</strong> {apt.reason}
                  </p>

                  {apt.cancelReason && (
                    <p style={{ fontSize: "0.825rem", color: "var(--accent-red)", marginTop: "2px" }}>
                      <strong>Cancellation Note:</strong> {apt.cancelReason}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="appointment-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() => setViewSlipTarget(apt)}
                  title="View / Print Clinical Appointment Slip"
                >
                  📄 View Slip
                </button>

                {(apt.status === "confirmed" || apt.status === "rescheduled") && (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setRescheduleTarget(apt);
                        setNewRescheduleDate(apt.date);
                        setNewRescheduleTime(apt.time);
                      }}
                    >
                      ⟳ Reschedule
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-red"
                      onClick={() => setCancelTarget(apt)}
                    >
                      ✕ Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          RESCHEDULE MODAL (Lectures 61–66: Modals)
         ========================================================================= */}
      <Modal
        isOpen={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        title="Reschedule Appointment"
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setRescheduleTarget(null)}
            >
              Close
            </button>
            <button type="button" className="btn" onClick={handleConfirmReschedule}>
              Confirm New Slot
            </button>
          </>
        }
      >
        {rescheduleTarget && (
          <div>
            <p style={{ marginBottom: "16px", color: "var(--text-muted)" }}>
              Rescheduling appointment with <strong>{rescheduleTarget.doctorName}</strong>.
            </p>

            <FormField
              label="Select New Date"
              required
              type="date"
              min={todayString}
              value={newRescheduleDate}
              onChange={(e) => setNewRescheduleDate(e.target.value)}
            />

            <div className="form-group" style={{ margin: "14px 0" }}>
              <label className="form-label">Select New Time Slot *</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`btn btn-sm ${newRescheduleTime === slot ? "" : "btn-secondary"}`}
                    onClick={() => setNewRescheduleTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <FormField
              label="Reason for Rescheduling (Optional)"
              type="text"
              placeholder="e.g. Personal schedule change"
              value={rescheduleReasonText}
              onChange={(e) => setRescheduleReasonText(e.target.value)}
            />
          </div>
        )}
      </Modal>

      {/* =========================================================================
          CANCEL CONFIRMATION DIALOG
         ========================================================================= */}
      <ConfirmationDialog
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel your appointment with ${cancelTarget?.doctorName} scheduled for ${cancelTarget?.date} at ${cancelTarget?.time}?`}
        confirmText="Yes, Cancel Appointment"
        isDanger
      >
        <div style={{ marginTop: "14px" }}>
          <label className="form-label">Reason for Cancellation</label>
          <input
            type="text"
            value={cancelReasonText}
            onChange={(e) => setCancelReasonText(e.target.value)}
            placeholder="e.g. Symptoms resolved, travelling, conflict..."
          />
        </div>
      </ConfirmationDialog>

      {/* =========================================================================
          PRINTABLE / VIEW APPOINTMENT SLIP MODAL
         ========================================================================= */}
      <Modal
        isOpen={!!viewSlipTarget}
        onClose={() => setViewSlipTarget(null)}
        title="Clinical Appointment Confirmation Slip"
        footer={
          <>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => window.print()}
            >
              🖨️ Print Slip
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setViewSlipTarget(null)}
            >
              Done
            </button>
          </>
        }
      >
        {viewSlipTarget && (
          <div
            style={{
              border: "2px dashed var(--border)",
              padding: "24px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-subtle)"
            }}
          >
            <div style={{ textAlign: "center", borderBottom: "1px solid var(--border)", paddingBottom: "14px", marginBottom: "16px" }}>
              <h3 style={{ color: "var(--primary)" }}>♥ LifeCare Health Systems</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                Sector 12, Medical Enclave • Helpline: +91 98765 43210
              </p>
              <div style={{ marginTop: "8px" }}>
                <StatusBadge status={viewSlipTarget.status} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.9rem" }}>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Appointment Slip ID:</span>
                <p><strong>{viewSlipTarget.id}</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Patient Name:</span>
                <p><strong>{viewSlipTarget.patientName}</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Doctor:</span>
                <p><strong>{viewSlipTarget.doctorName}</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Department:</span>
                <p><strong>{viewSlipTarget.speciality}</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Date & Time:</span>
                <p><strong>{viewSlipTarget.date} at {viewSlipTarget.time}</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Consultation Mode:</span>
                <p><strong>{viewSlipTarget.consultationType}</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Consultation Fee:</span>
                <p><strong>₹{viewSlipTarget.fee} (Paid at clinic)</strong></p>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Contact:</span>
                <p><strong>{viewSlipTarget.patientPhone}</strong></p>
              </div>
            </div>

            <div style={{ marginTop: "14px", borderTop: "1px solid var(--border)", paddingTop: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <strong>Clinical Note / Chief Complaint:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--text-body)" }}>{viewSlipTarget.reason}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Appointment;