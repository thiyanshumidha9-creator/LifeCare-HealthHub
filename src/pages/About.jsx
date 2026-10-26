// About LifeCare & Course Evaluation Guide (Lectures 1–72)
import { useState } from "react";
import { Link } from "react-router-dom";

export function About() {
  const [showSyllabus, setShowSyllabus] = useState(false);

  return (
    <div className="container">
      <div className="page-heading">
        <p className="small-title">ABOUT LIFECARE HEALTH SYSTEMS</p>
        <h1>Compassionate, Patient-Centered Healthcare</h1>
        <p>
          A unified digital healthcare environment designed to simplify doctor scheduling, patient health records, voluntary blood donations, and emergency assistance.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="about-grid">
        <div className="about-content">
          <h2>Empowering Patients with Accessible Technology</h2>
          <p>
            LifeCare was founded with the vision of making professional healthcare transparent, accessible, and dignified. We bridge the gap between patients, clinical consultants, and emergency blood banks through human-centered interface design.
          </p>
          <p>
            Whether booking an outpatient specialist consultation, reviewing past vital statistics and diagnostic slips, or coordinating life-saving universal blood donation, LifeCare provides seamless workflows on any screen size.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
            <Link to="/appointment" className="btn">
              📅 Book Appointment
            </Link>
            <Link to="/doctors" className="btn btn-secondary">
              Meet Our Faculty
            </Link>
          </div>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
            alt="Doctor and clinical staff collaborating in hospital"
          />
        </div>
      </div>

      {/* CLINICAL IMPACT STATISTICS */}
      <div className="grid about-stats">
        <div className="card stat-card">
          <h2>24/7</h2>
          <p>Emergency Trauma & ICU</p>
        </div>

        <div className="card stat-card">
          <h2>50+</h2>
          <p>Consultant Specialists</p>
        </div>

        <div className="card stat-card">
          <h2>15,000+</h2>
          <p>Patient Visits Facilitated</p>
        </div>

        <div className="card stat-card">
          <h2>100%</h2>
          <p>Voluntary Blood Supply</p>
        </div>
      </div>

      {/* CORE VALUES */}
      <div style={{ margin: "60px 0 40px" }}>
        <div className="section-title">
          <p className="small-title">OUR CORE CLINICAL VALUES</p>
          <h2>Excellence In Every Interaction</h2>
        </div>

        <div className="grid-3" style={{ gap: "24px" }}>
          <div className="card">
            <div className="card-icon">🛡️</div>
            <h3>Clinical Integrity</h3>
            <p>Every medical consultation and diagnostic record is treated with strict professional ethics and transparency.</p>
          </div>

          <div className="card">
            <div className="card-icon">⚡</div>
            <h3>Rapid Emergency Response</h3>
            <p>Direct lines to our Level-1 trauma desk and universal cross-matched blood supplies within minutes.</p>
          </div>

          <div className="card">
            <div className="card-icon">🤝</div>
            <h3>Accessible to All</h3>
            <p>Engineered with mobile-first responsive architecture, high color contrast, and assistive screen-reader standards.</p>
          </div>
        </div>
      </div>

      {/* UNIVERSITY PROJECT-BASED EVALUATION II SYLLABUS MAPPING */}
      <div
        className="card"
        style={{
          padding: "36px",
          background: "linear-gradient(135deg, #ffffff 0%, var(--primary-light) 100%)",
          border: "2px solid rgba(8, 127, 140, 0.25)",
          borderRadius: "var(--radius-xl)",
          marginTop: "40px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="small-title">ACADEMIC EVALUATION DOSSIER</span>
            <h2 style={{ fontSize: "1.8rem", margin: "4px 0" }}>Front-End Engineering II Syllabus Mapping</h2>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Complete course demonstration covering Lectures 1 through 72.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowSyllabus(!showSyllabus)}
          >
            {showSyllabus ? "Hide Syllabus Details ▲" : "View Syllabus Mapping (Lectures 1–72) ▼"}
          </button>
        </div>

        {showSyllabus && (
          <div style={{ marginTop: "25px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
              <div style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Lectures 1–12: HTML5, CSS3 & JS Foundations</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Semantic HTML tags, Box Model, modern Flexbox & Grid layouts, mobile-first media queries, clean responsive design, and ES6+ modular data structures.
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Lectures 13–24: Browser Storage & React Forms</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Controlled form inputs with inline JavaScript validation, email/phone format checks, localStorage session persistence, and Vite + React component setup.
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Lectures 25–36: React Components & Hooks</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Reusable cards, buttons, badges; useState, useEffect, useRef for modal autofocus, useMemo for expensive filter/sort calculations, useCallback, and custom hooks (useDebounce, useLocalStorage).
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Lectures 37–48: React Router & Navigation</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  React Router v7 client-side routing, dynamic route parameters (`/doctors/:doctorId`), protected private routes (`ProtectedRoute` for `/dashboard`), responsive mobile drawer, and 404 page.
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Lectures 49–60: Context API & State Architecture</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Global state via AuthContext and AppointmentContext, full CRUD lifecycle (Create, Read, Update/Reschedule, Delete/Cancel), ToastContext notifications, and patient dashboard.
                </p>
              </div>

              <div style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <h4 style={{ color: "var(--primary)", marginBottom: "6px" }}>Lectures 61–72: Interactive UI & REST APIs</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Accessible modals with escape key, tabbed interfaces, debounced doctor search, multi-filter combinations, pagination, simulated async REST fetch latency, skeleton loaders, and retry states.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;