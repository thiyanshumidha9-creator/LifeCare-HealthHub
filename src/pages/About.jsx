// About LifeCare
import { Link } from "react-router-dom";

export function About() {
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
    </div>
  );
}

export default About;