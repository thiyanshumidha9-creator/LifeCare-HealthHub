// 404 Not Found Page (Lectures 37–42: Protected Routes & 404 Error Handling)
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: "5rem", marginBottom: "16px" }}>🏥</div>
      <p className="small-title">PAGE NOT FOUND • 404 ERROR</p>
      <h1 style={{ fontSize: "2.8rem", margin: "8px 0 16px" }}>Looking for Healthcare Support?</h1>
      <p style={{ maxWidth: "520px", margin: "0 auto 28px", color: "var(--text-muted)", fontSize: "1.05rem" }}>
        The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let us guide you back to safety.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
        <Link to="/" className="btn btn-lg">
          ← Return to Home
        </Link>
        <Link to="/doctors" className="btn btn-lg btn-secondary">
          Find a Doctor
        </Link>
        <Link to="/appointment" className="btn btn-lg btn-secondary">
          Book Appointment
        </Link>
        <Link to="/emergency" className="btn btn-lg btn-red">
          🚨 Emergency Hotline
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
