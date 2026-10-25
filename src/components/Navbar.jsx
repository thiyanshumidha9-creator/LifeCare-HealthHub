import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">

      <Link to="/" className="logo">
        <span>♥</span> LifeCare
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/appointment">
          Appointment
        </Link>

        <Link to="/doctors">
          Doctors
        </Link>

        <Link to="/donate">
          Blood
        </Link>

        <Link to="/symptoms">
          Symptoms
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/login" className="nav-login">
          Patient Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;