// Blood Bank & Donor Center Component (Lectures 19–24, 25–30, 49–54, 55–60, 61–66)
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  getBloodInventory,
  getBloodDonors,
  getBloodRequests,
  registerNewDonor,
  submitBloodRequest
} from "../services/bloodService";
import FormField from "../components/common/FormField";

export function BloodDonate() {
  const [searchParams] = useSearchParams();
  const { patient } = useAuth();
  const toast = useToast();

  const initialTab = searchParams.get("tab") === "request" ? "request" : "inventory";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Live data states
  const [inventory, setInventory] = useState(getBloodInventory());
  const [donors, setDonors] = useState(getBloodDonors());
  const [requests, setRequests] = useState(getBloodRequests());

  // Donor Registration Form State
  const [donorName, setDonorName] = useState(patient?.name || "");
  const [donorAge, setDonorAge] = useState("");
  const [donorGroup, setDonorGroup] = useState(patient?.blood || "O+");
  const [donorPhone, setDonorPhone] = useState(patient?.phone || "");
  const [donorCity, setDonorCity] = useState("Sector 12");
  const [donorAgreed, setDonorAgreed] = useState(false);
  const [donorErrors, setDonorErrors] = useState({});

  // Blood Request Form State
  const [reqPatient, setReqPatient] = useState("");
  const [reqHospital, setReqHospital] = useState("City Hospital Central");
  const [reqGroup, setReqGroup] = useState("O+");
  const [reqUnits, setReqUnits] = useState("1");
  const [reqUrgency, setReqUrgency] = useState("Emergency");
  const [reqErrors, setReqErrors] = useState({});

  // Handle Donor Registration
  function handleDonorSubmit(e) {
    e.preventDefault();
    const errs = {};

    if (!donorName.trim()) errs.name = "Full name is required.";
    if (!donorAge || Number(donorAge) < 18 || Number(donorAge) > 65) {
      errs.age = "Donor age must be between 18 and 65 years.";
    }
    if (!donorGroup) errs.group = "Please select your blood group.";
    if (!donorAgreed) errs.agreed = "You must confirm you weigh at least 50 kg and have no active infection.";

    if (Object.keys(errs).length > 0) {
      setDonorErrors(errs);
      toast.error("Please resolve the highlighted donor requirements.");
      return;
    }

    const newDonor = registerNewDonor({
      name: donorName,
      age: donorAge,
      group: donorGroup,
      phone: donorPhone,
      city: donorCity
    });

    setDonors(getBloodDonors());
    setInventory(getBloodInventory());
    toast.success(`Thank you, ${donorName}! You are now registered as an active ${donorGroup} donor.`);
    setDonorErrors({});
    setDonorAge("");
    setDonorAgreed(false);
    setActiveTab("donors");
  }

  // Handle Blood Request Submission
  function handleRequestSubmit(e) {
    e.preventDefault();
    const errs = {};

    if (!reqPatient.trim()) errs.patient = "Patient name is required.";
    if (!reqHospital.trim()) errs.hospital = "Hospital / Clinic name is required.";
    if (!reqUnits || Number(reqUnits) < 1) errs.units = "Please specify at least 1 unit.";

    if (Object.keys(errs).length > 0) {
      setReqErrors(errs);
      toast.error("Please fill in all blood request details.");
      return;
    }

    submitBloodRequest({
      patientName: reqPatient,
      hospital: reqHospital,
      group: reqGroup,
      units: reqUnits,
      urgency: reqUrgency
    });

    setRequests(getBloodRequests());
    toast.success(`Blood request submitted for ${reqUnits} unit(s) of ${reqGroup}. Our blood bank coordinator has been alerted.`);
    setReqErrors({});
    setReqPatient("");
    setActiveTab("requests");
  }

  return (
    <div className="container">
      <div className="page-heading">
        <p className="small-title red-text">COMMUNITY BLOOD BANK & TRAUMA SUPPLY</p>
        <h1>LifeCare Blood Center</h1>
        <p>
          Real-time blood stock tracking, voluntary donor registration, and emergency hospital requisition.
        </p>
      </div>

      {/* EMERGENCY CALLOUT BANNER */}
      <div className="emergency-card-alert" style={{ marginBottom: "30px" }}>
        <span style={{ fontSize: "2rem" }}>🚨</span>
        <div style={{ flex: 1 }}>
          <h3>Need Rare Blood Group Units Urgently?</h3>
          <p style={{ margin: 0, color: "var(--text-body)", fontSize: "0.925rem" }}>
            For critical ICU or surgical emergencies, contact the Blood Bank Coordinator directly at{" "}
            <strong>+91 98765 43210 (Ext. 4)</strong>.
          </p>
        </div>
        <Link to="/emergency" className="btn btn-red btn-sm" style={{ flexShrink: 0 }}>
          Emergency Hotline
        </Link>
      </div>

      {/* TABS (Lectures 61–66: Tabs) */}
      <div className="tabs-header" role="tablist">
        <button
          type="button"
          className={`tab-btn ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => setActiveTab("inventory")}
        >
          🩸 Live Stock & Inventory
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === "donate" ? "active" : ""}`}
          onClick={() => setActiveTab("donate")}
        >
          ❤️ Register as Donor
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === "request" ? "active" : ""}`}
          onClick={() => setActiveTab("request")}
        >
          🚑 Request Blood Units
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === "donors" ? "active" : ""}`}
          onClick={() => setActiveTab("donors")}
        >
          👥 Donor Registry ({donors.length})
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          📋 Active Requests ({requests.length})
        </button>
      </div>

      {/* TAB 1: INVENTORY */}
      {activeTab === "inventory" && (
        <div>
          <div className="section-title left" style={{ marginBottom: "20px" }}>
            <h2>Available Blood Units in Bank</h2>
            <p>Live inventory synchronized across central blood storage refrigerators.</p>
          </div>

          <div className="blood-inventory-grid">
            {inventory.map((item) => (
              <div
                key={item.group}
                className={`blood-inventory-card ${item.status.includes("Critical") ? "urgent" : ""}`}
              >
                <div className="blood-group-tag">{item.group}</div>
                <h3 style={{ fontSize: "1.4rem", margin: "4px 0" }}>{item.units} Units</h3>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: item.status.includes("Critical")
                      ? "var(--accent-red)"
                      : item.status.includes("Low")
                      ? "var(--accent-amber)"
                      : "var(--accent-green)"
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="blood-banner" style={{ margin: "20px 0 0" }}>
            <div>
              <p className="small-title red-text">VOLUNTARY REPLACEMENT</p>
              <h2>Help replenish low inventory groups</h2>
              <p>Groups O- and AB- are currently in critical shortage across trauma wards.</p>
            </div>
            <button
              type="button"
              className="btn btn-red"
              onClick={() => setActiveTab("donate")}
            >
              Sign Up as Donor Now →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTER AS DONOR */}
      {activeTab === "donate" && (
        <div className="form-container" style={{ maxWidth: "620px" }}>
          <div className="form-icon">🩸</div>
          <h2>Donor Registration</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.925rem", marginBottom: "20px" }}>
            Join our registry of emergency voluntary donors.
          </p>

          <form onSubmit={handleDonorSubmit}>
            <FormField
              label="Full Name"
              required
              error={donorErrors.name}
              placeholder="Your full name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />

            <div className="grid-2" style={{ gap: "14px" }}>
              <FormField
                label="Age (18 - 65)"
                required
                type="number"
                min="18"
                max="65"
                error={donorErrors.age}
                placeholder="e.g. 25"
                value={donorAge}
                onChange={(e) => setDonorAge(e.target.value)}
              />

              <FormField label="Blood Group" required error={donorErrors.group}>
                <select
                  value={donorGroup}
                  onChange={(e) => setDonorGroup(e.target.value)}
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
            </div>

            <div className="grid-2" style={{ gap: "14px" }}>
              <FormField
                label="Contact Phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
              />

              <FormField
                label="City / Sector"
                type="text"
                placeholder="Sector 12"
                value={donorCity}
                onChange={(e) => setDonorCity(e.target.value)}
              />
            </div>

            <div style={{ margin: "16px 0", background: "var(--bg-subtle)", padding: "14px", borderRadius: "var(--radius-md)" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.875rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  style={{ width: "auto", margin: "4px 0 0" }}
                  checked={donorAgreed}
                  onChange={(e) => setDonorAgreed(e.target.checked)}
                />
                <span>
                  I confirm that I weigh over 50 kg, have had no tattoos or major surgeries in the last 6 months, and have not donated blood within the past 90 days.
                </span>
              </label>
              {donorErrors.agreed && (
                <p className="field-error" style={{ marginTop: "6px" }}>
                  ⚠️ {donorErrors.agreed}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-red btn-lg" style={{ width: "100%" }}>
              Register as Blood Donor ❤️
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: REQUEST BLOOD */}
      {activeTab === "request" && (
        <div className="form-container" style={{ maxWidth: "620px" }}>
          <div className="form-icon">🚑</div>
          <h2>Request Blood Units</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.925rem", marginBottom: "20px" }}>
            Submit an official requisition for an admitted patient.
          </p>

          <form onSubmit={handleRequestSubmit}>
            <FormField
              label="Patient Name"
              required
              error={reqErrors.patient}
              placeholder="Name of patient needing blood"
              value={reqPatient}
              onChange={(e) => setReqPatient(e.target.value)}
            />

            <FormField
              label="Hospital / Clinic Facility"
              required
              error={reqErrors.hospital}
              placeholder="e.g. City Trauma Center, ICU Bed 14"
              value={reqHospital}
              onChange={(e) => setReqHospital(e.target.value)}
            />

            <div className="grid-3" style={{ gap: "12px" }}>
              <FormField label="Blood Group" required>
                <select
                  value={reqGroup}
                  onChange={(e) => setReqGroup(e.target.value)}
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
                label="Units Needed"
                required
                type="number"
                min="1"
                max="10"
                error={reqErrors.units}
                value={reqUnits}
                onChange={(e) => setReqUnits(e.target.value)}
              />

              <FormField label="Urgency Level" required>
                <select
                  value={reqUrgency}
                  onChange={(e) => setReqUrgency(e.target.value)}
                >
                  <option value="Emergency">🚨 Emergency (1-2 hrs)</option>
                  <option value="Urgent">⚡ Urgent (Today)</option>
                  <option value="Standard">Standard Planned</option>
                </select>
              </FormField>
            </div>

            <button type="submit" className="btn btn-red btn-lg" style={{ width: "100%", marginTop: "16px" }}>
              Submit Blood Requisition →
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: DONOR REGISTRY */}
      {activeTab === "donors" && (
        <div>
          <div className="section-title left" style={{ marginBottom: "20px" }}>
            <h2>Registered Voluntary Donors</h2>
            <p>Community members ready to assist during hospital shortages.</p>
          </div>

          <div className="grid">
            {donors.map((donor) => (
              <div key={donor.id} className="card" style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.15rem" }}>{donor.name}</h3>
                  <span
                    style={{
                      background: "var(--accent-red-light)",
                      color: "var(--accent-red)",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      fontSize: "0.85rem"
                    }}
                  >
                    {donor.group}
                  </span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "2px 0" }}>
                  Age: {donor.age} yrs • {donor.city}
                </p>
                <p style={{ color: "var(--text-light)", fontSize: "0.8rem", margin: "6px 0 0" }}>
                  Registered on: {donor.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ACTIVE REQUESTS */}
      {activeTab === "requests" && (
        <div>
          <div className="section-title left" style={{ marginBottom: "20px" }}>
            <h2>Active Blood Requisitions</h2>
            <p>Track statuses of submitted hospital requisitions.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {requests.map((req) => (
              <div
                key={req.id}
                className="card"
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "14px"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3 style={{ margin: 0 }}>{req.patientName}</h3>
                    <span
                      style={{
                        background: "var(--accent-red)",
                        color: "#ffffff",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontWeight: 700,
                        fontSize: "0.8rem"
                      }}
                    >
                      {req.group} ({req.units} Units)
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "3px 8px",
                        borderRadius: "9999px",
                        fontWeight: 700,
                        background: req.urgency === "Emergency" ? "var(--accent-red-light)" : "var(--bg-subtle)",
                        color: req.urgency === "Emergency" ? "var(--accent-red)" : "var(--text-main)"
                      }}
                    >
                      {req.urgency}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                    Hospital: {req.hospital} • Requisition ID: {req.id} • Date: {req.date}
                  </p>
                </div>

                <div>
                  <span
                    style={{
                      background: req.status === "Approved" || req.status === "Fulfilled" ? "var(--accent-green-light)" : "var(--accent-amber-light)",
                      color: req.status === "Approved" || req.status === "Fulfilled" ? "var(--accent-green)" : "var(--accent-amber)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      padding: "6px 14px",
                      borderRadius: "9999px"
                    }}
                  >
                    ✓ {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BloodDonate;