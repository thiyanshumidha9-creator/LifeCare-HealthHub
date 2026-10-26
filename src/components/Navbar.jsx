// Navbar Component - Clean, Modern Healthcare Navigation
import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export function Navbar() {
  const { patient, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  function handleLogout() {
    logout();
    toast.info("You have been logged out securely.");
    setMobileMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  // Close mobile menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header className="nav nav-header" ref={navRef}>
      <div className="nav-container">
        {/* 1. Left: Brand */}
        <div className="nav-brand">
          <Link to="/" className="logo" onClick={closeMenu} aria-label="LifeCare Home">
            <span className="logo-heart" aria-hidden="true">♥</span>
            <span className="logo-text">LifeCare</span>
          </Link>
        </div>

        {/* 2. Center: Main Navigation (Desktop) */}
        <nav className="nav-main" aria-label="Main Navigation">
          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/doctors" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Doctors
          </NavLink>
          <NavLink to="/appointment" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Appointments
          </NavLink>
          <NavLink to="/donate" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Blood Bank
          </NavLink>
          <NavLink to="/symptoms" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Symptom Checker
          </NavLink>
          <NavLink to="/checkups" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Medical Records
          </NavLink>
          <NavLink to="/emergency" onClick={closeMenu} className={({ isActive }) => `nav-link nav-link-emergency ${isActive ? "active" : ""}`}>
            <span className="emergency-icon" aria-hidden="true">🚨</span>
            <span>Emergency</span>
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            About
          </NavLink>
        </nav>

        {/* 3. Right: User Actions (Desktop) & Hamburger (Mobile) */}
        <div className="nav-actions">
          {patient ? (
            <div className="nav-user-group">
              <NavLink to="/dashboard" onClick={closeMenu} className="nav-profile-badge" title="Go to Dashboard">
                <span className="profile-icon" aria-hidden="true">👤</span>
                <span className="profile-name">{patient.name}</span>
              </NavLink>
              <button
                type="button"
                className="nav-btn-logout"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMenu} className="nav-btn-login">
              Patient Login
            </Link>
          )}

          {/* Hamburger toggle button for tablet and mobile */}
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="hamburger-icon" aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-content">
          <nav className="mobile-nav-list" aria-label="Mobile Navigation">
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>Home</span>
            </NavLink>
            <NavLink to="/doctors" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>Doctors</span>
            </NavLink>
            <NavLink to="/appointment" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>Appointments</span>
            </NavLink>
            <NavLink to="/donate" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>Blood Bank</span>
            </NavLink>
            <NavLink to="/symptoms" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>Symptom Checker</span>
            </NavLink>
            <NavLink to="/checkups" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>Medical Records</span>
            </NavLink>
            <NavLink to="/emergency" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item mobile-item-emergency ${isActive ? "active" : ""}`}>
              <span>🚨 Emergency</span>
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
              <span>About</span>
            </NavLink>
          </nav>

          <div className="mobile-drawer-footer">
            {patient ? (
              <div className="mobile-user-panel">
                <NavLink to="/dashboard" onClick={closeMenu} className="mobile-user-card">
                  <span className="mobile-user-avatar" aria-hidden="true">👤</span>
                  <div className="mobile-user-info">
                    <span className="mobile-user-greeting">Signed in as</span>
                    <strong className="mobile-user-name">{patient.name}</strong>
                  </div>
                </NavLink>
                <button
                  type="button"
                  className="mobile-btn-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu} className="mobile-btn-login">
                Patient Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
