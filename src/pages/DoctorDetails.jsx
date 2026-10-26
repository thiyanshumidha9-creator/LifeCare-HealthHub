// Doctor Details Page Component (Lectures 37–42: Dynamic Routes & Route Parameters)
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchDoctorById } from "../services/doctorService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";

export function DoctorDetails() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDoctor() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchDoctorById(doctorId);
        setDoctor(data);
      } catch (err) {
        setError(err.message || "Failed to load doctor profile.");
      } finally {
        setLoading(false);
      }
    }

    loadDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingSpinner text="Loading doctor profile & credentials..." size="lg" />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container">
        <ErrorState
          title="Doctor Not Found"
          message={error || `The specialist with ID "${doctorId}" could not be located.`}
          onRetry={() => navigate("/doctors")}
          retryText="Return to Doctors Directory"
        />
      </div>
    );
  }

  return (
    <div className="container">
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: "24px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
        <Link to="/" style={{ color: "var(--primary)" }}>Home</Link>
        {" / "}
        <Link to="/doctors" style={{ color: "var(--primary)" }}>Doctors</Link>
        {" / "}
        <span style={{ color: "var(--text-main)", fontWeight: 600 }}>{doctor.name}</span>
      </div>

      <div className="card" style={{ padding: "36px", marginBottom: "35px" }}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" }}>
          <img
            src={doctor.image}
            alt={doctor.name}
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid var(--primary-light)",
              boxShadow: "var(--shadow-sm)",
              flexShrink: 0
            }}
          />

          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
              <span className="doctor-specialty-badge" style={{ margin: 0 }}>
                {doctor.speciality}
              </span>
              <span style={{ background: "var(--accent-green-light)", color: "var(--accent-green)", padding: "4px 10px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700 }}>
                Verified LifeCare Specialist
              </span>
            </div>

            <h1 style={{ fontSize: "2.2rem", marginBottom: "6px" }}>{doctor.name}</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "12px", fontWeight: 500 }}>
              {doctor.qualifications}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", color: "var(--text-body)", fontSize: "0.925rem", marginBottom: "18px" }}>
              <div>
                <strong>Rating:</strong> <span style={{ color: "var(--accent-amber)" }}>★ {doctor.rating}</span> ({doctor.reviewsCount} verified reviews)
              </div>
              <div>
                <strong>Experience:</strong> {doctor.experienceYears} Years
              </div>
              <div>
                <strong>Consultation:</strong> {doctor.consultationType}
              </div>
            </div>

            <div style={{ padding: "16px 20px", background: "var(--primary-subtle)", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Consultation Fee:</span>
                <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)", margin: 0 }}>
                  ₹{doctor.fee}
                </p>
              </div>

              <Link
                to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
                className="btn btn-lg"
              >
                📅 Book Appointment With {doctor.name.split(" ")[1]}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED INFORMATION GRID */}
      <div className="grid-2" style={{ gap: "30px", marginBottom: "35px" }}>
        {/* Practice Overview & Bio */}
        <div className="card">
          <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "16px" }}>
            Biography & Clinical Focus
          </h3>
          <p style={{ lineHeight: 1.7, color: "var(--text-body)", marginBottom: "16px" }}>
            {doctor.about}
          </p>
          <h4 style={{ fontSize: "1rem", marginBottom: "8px", color: "var(--text-main)" }}>Languages Spoken</h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.925rem" }}>
            {doctor.languages?.join(", ")}
          </p>
        </div>

        {/* Schedule & Hospital Clinic */}
        <div className="card">
          <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "16px" }}>
            Clinic Hours & Location
          </h3>
          <div style={{ marginBottom: "14px" }}>
            <strong>Hospital Wing:</strong>
            <p style={{ color: "var(--text-muted)", marginTop: "2px" }}>📍 {doctor.hospital}</p>
          </div>
          <div style={{ marginBottom: "14px" }}>
            <strong>Consultation Days:</strong>
            <p style={{ color: "var(--text-muted)", marginTop: "2px" }}>
              {doctor.availableDays?.join(", ")}
            </p>
          </div>
          <div>
            <strong>Available Hours:</strong>
            <p style={{ color: "var(--text-muted)", marginTop: "2px" }}>
              ⏰ {doctor.availableHours}
            </p>
          </div>
        </div>
      </div>

      {/* SAMPLE PATIENT REVIEWS */}
      <div className="card" style={{ padding: "32px" }}>
        <h3 style={{ marginBottom: "20px" }}>Patient Reviews & Ratings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "16px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <strong>Kavita N.</strong>
              <span style={{ color: "var(--accent-amber)" }}>★★★★★</span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>
              "Dr. {doctor.name.split(" ")[1]} listened very carefully and explained the treatment clearly. The consultation was punctual and thorough."
            </p>
          </div>
          <div style={{ padding: "16px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <strong>Ramesh K.</strong>
              <span style={{ color: "var(--accent-amber)" }}>★★★★★</span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>
              "Extremely professional care and clear advice on follow-up medications. Highly recommended specialist."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
