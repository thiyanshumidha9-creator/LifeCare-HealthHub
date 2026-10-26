// Emergency Services & First-Aid Protocols (Lectures 25–30, 43–48, 61–66)
import { useState } from "react";
import { Link } from "react-router-dom";

const firstAidProtocols = [
  {
    id: "cpr",
    title: "Cardiopulmonary Resuscitation (CPR)",
    icon: "🫀",
    steps: [
      "Check responsiveness and verify breathing by watching the chest.",
      "Call for an ambulance immediately (Dial 108).",
      "Place heel of one hand in center of the chest, interlock the second hand.",
      "Compress hard and fast: 100-120 beats per minute (to the rhythm of 'Stayin' Alive').",
      "Allow chest to recoil fully between compressions."
    ]
  },
  {
    id: "choking",
    title: "Choking (Heimlich Maneuver)",
    icon: "🫁",
    steps: [
      "Stand behind the choking person and lean them slightly forward.",
      "Give 5 firm back blows between shoulder blades with the heel of your hand.",
      "If unsuccessful, place fist above navel, grasp with other hand.",
      "Perform 5 quick, upward abdominal thrusts until airway clears."
    ]
  },
  {
    id: "bleeding",
    title: "Severe Bleeding Control",
    icon: "🩸",
    steps: [
      "Apply firm, direct pressure with a clean cloth or sterile gauze.",
      "Keep pressure continuous for at least 10 minutes without lifting to check.",
      "Elevate the wounded limb above heart level if no fracture is suspected.",
      "Seek emergency hospital trauma department immediately."
    ]
  },
  {
    id: "burns",
    title: "Thermal Burns Protocol",
    icon: "🔥",
    steps: [
      "Immediately cool the burn under running tap water for 10-20 minutes.",
      "Never apply ice, butter, or toothpaste as they worsen tissue trauma.",
      "Cover loosely with sterile plastic cling film or clean dry cloth.",
      "Seek medical review if blistering covers an area larger than a palm."
    ]
  }
];

export function Emergency() {
  const [activeGuide, setActiveGuide] = useState("cpr");

  const selectedGuide = firstAidProtocols.find((g) => g.id === activeGuide) || firstAidProtocols[0];

  return (
    <div className="container">
      <div className="emergency-page">
        <div className="emergency-icon">🚑</div>

        <p className="small-title red-text">24/7 TRAUMA & EMERGENCY CARE</p>

        <h1 style={{ fontSize: "2.6rem", margin: "4px 0 12px" }}>Immediate Emergency Assistance</h1>

        <p style={{ maxWidth: "680px", margin: "0 auto", color: "var(--text-muted)" }}>
          If you or someone around you is facing a life-threatening crisis, call our trauma hotline or emergency responders right away.
        </p>

        {/* CLICK-TO-CALL EMERGENCY BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", margin: "30px 0" }}>
          <a
            href="tel:108"
            className="emergency-number"
            style={{ textDecoration: "none", minWidth: "290px" }}
          >
            <span>🚑</span>
            <div>
              <p>National Emergency Ambulance</p>
              <h2>Dial 108 / 112</h2>
            </div>
          </a>

          <a
            href="tel:+919876543210"
            className="emergency-number"
            style={{ textDecoration: "none", minWidth: "290px", background: "linear-gradient(135deg, #12343b 0%, #05636e 100%)" }}
          >
            <span>📞</span>
            <div>
              <p>LifeCare Hospital Trauma Desk</p>
              <h2>+91 98765 43210</h2>
            </div>
          </a>
        </div>

        {/* EMERGENCY DEPARTMENT HIGHLIGHTS */}
        <div className="emergency-cards">
          <div className="card">
            <div className="card-icon" style={{ background: "var(--accent-red-light)", color: "var(--accent-red)" }}>
              🚑
            </div>
            <h3>Advanced Cardiac Ambulance</h3>
            <p>Equipped with defibrillators, oxygen supplies, and trained paramedics on call 24 hours a day.</p>
          </div>

          <div className="card">
            <div className="card-icon" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
              🏥
            </div>
            <h3>Level-1 Trauma Center</h3>
            <p>Immediate surgical triage, CT scans, and acute critical care ready 24/7/365 without prior booking.</p>
          </div>

          <div className="card">
            <div className="card-icon" style={{ background: "var(--accent-amber-light)", color: "var(--accent-amber)" }}>
              🩸
            </div>
            <h3>Emergency Blood Dispatch</h3>
            <p>Cross-matched O-negative and universal plasma readily prepared for immediate transfusions.</p>
          </div>
        </div>

        {/* HOSPITAL LOCATION & DIRECTIONS */}
        <div className="card" style={{ padding: "30px", textAlign: "left", margin: "40px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <span className="small-title">HOSPITAL LOCATION</span>
              <h2 style={{ fontSize: "1.8rem", margin: "4px 0 10px" }}>LifeCare Central Campus</h2>
              <p style={{ color: "var(--text-muted)" }}>
                📍 Sector 12, Medical Enclave, Main Health Boulevard, City Center
              </p>
              <p style={{ color: "var(--text-body)", fontSize: "0.925rem" }}>
                <strong>Nearest Landmark:</strong> 300 meters east of Central Metro Station Exit Gate 3
              </p>
              <p style={{ color: "var(--accent-green)", fontWeight: 700, fontSize: "0.9rem" }}>
                ● Emergency Gate open 24 Hours • Free Emergency Parking
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/appointment" className="btn btn-secondary">
                Regular Appointment
              </Link>
              <Link to="/donate" className="btn btn-red">
                Blood Requisition
              </Link>
            </div>
          </div>
        </div>

        {/* FIRST-AID QUICK GUIDE TABS (Lectures 61–66: Interactive Tabs) */}
        <div style={{ textAlign: "left", margin: "40px 0" }}>
          <div className="section-title left" style={{ marginBottom: "20px" }}>
            <p className="small-title">CLINICAL FIRST-AID PROTOCOLS</p>
            <h2>First-Aid While Help Is on the Way</h2>
            <p>Vital life-support procedures before paramedic arrival.</p>
          </div>

          <div className="tabs-header">
            {firstAidProtocols.map((guide) => (
              <button
                key={guide.id}
                type="button"
                className={`tab-btn ${activeGuide === guide.id ? "active" : ""}`}
                onClick={() => setActiveGuide(guide.id)}
              >
                <span>{guide.icon}</span> {guide.title.split("(")[0]}
              </button>
            ))}
          </div>

          <div className="card" style={{ padding: "26px", borderLeft: "5px solid var(--accent-red)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ fontSize: "2rem" }}>{selectedGuide.icon}</span>
              <h3 style={{ margin: 0 }}>{selectedGuide.title}</h3>
            </div>

            <ol style={{ paddingLeft: "24px", lineHeight: 1.8, color: "var(--text-body)" }}>
              {selectedGuide.steps.map((step, idx) => (
                <li key={idx} style={{ marginBottom: "8px" }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link to="/" className="btn btn-outline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Emergency;