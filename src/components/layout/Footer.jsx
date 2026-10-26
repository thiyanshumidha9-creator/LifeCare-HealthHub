// Healthcare Footer Component (Lectures 43–48: Application Layout)
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div>
          <h3>
            <span>♥</span> LifeCare
          </h3>
          <p>
            Digital healthcare platform empowering patients with seamless doctor appointments,
            health records management, emergency support, and blood bank coordination.
          </p>
          <div style={{ marginTop: "16px" }}>
            <span className="footer-academic-badge">
              Front-End Engineering II • University Evaluation
            </span>
          </div>
        </div>

        <div>
          <h3>Healthcare Services</h3>
          <Link to="/appointment">Book Doctor Appointment</Link>
          <Link to="/doctors">Find Specialists</Link>
          <Link to="/donate">Blood Bank & Donors</Link>
          <Link to="/checkups">Medical History & Vitals</Link>
          <Link to="/symptoms">Symptom Checker</Link>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Patient Dashboard</Link>
          <Link to="/about">About LifeCare</Link>
          <Link to="/emergency">Emergency Services</Link>
          <Link to="/login">Patient Portal Login</Link>
        </div>

        <div>
          <h3>Emergency & Contact</h3>
          <p>
            <strong>24/7 Helpline:</strong>
            <br />
            📞 +91 98765 43210
          </p>
          <p>
            <strong>Trauma & Ambulance:</strong>
            <br />
            🚑 Dial 108 / 112
          </p>
          <p>
            <strong>Email Support:</strong>
            <br />
            ✉️ care@lifecare-health.org
          </p>
          <p>
            <strong>Main Campus:</strong>
            <br />
            Sector 12, Medical Enclave
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 LifeCare Healthcare Portal. All rights reserved.</p>
        <p>
          Designed & Developed for <strong>Front-End Engineering II (Lectures 1–72)</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
