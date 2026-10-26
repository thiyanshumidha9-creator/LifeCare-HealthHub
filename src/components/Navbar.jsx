// Navbar Component (Lectures 43–48: Application Navigation Layout & Responsive Menu)
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export function Navbar() {
  const { patient, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    toast.info("You have been logged out securely.");
    setMobileMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <nav className="nav" aria-label="Main Navigation">
      <Link to="/" className="logo" onClick={closeMenu}>
        <span>♥</span> LifeCare
      </Link>

      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}>
        <NavLink to="/" onClick={closeMenu} end>
          Home
        </NavLink>

        <NavLink to="/doctors" onClick={closeMenu}>
          Doctors
        </NavLink>

        <NavLink to="/appointment" onClick={closeMenu}>
          Appointments
        </NavLink>

        <NavLink to="/donate" onClick={closeMenu}>
          Blood Bank
        </NavLink>

        <NavLink to="/symptoms" onClick={closeMenu}>
          Symptom Checker
        </NavLink>

        <NavLink to="/checkups" onClick={closeMenu}>
          Medical Records
        </NavLink>

        <NavLink to="/emergency" onClick={closeMenu} style={{ color: "var(--accent-red)" }}>
          🚨 Emergency
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        {patient ? (
          <>
            <NavLink to="/dashboard" onClick={closeMenu} className="nav-patient">
              👤 {patient.name}
            </NavLink>
            <button
              type="button"
              className="nav-logout-btn"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-login" onClick={closeMenu}>
            Patient Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
