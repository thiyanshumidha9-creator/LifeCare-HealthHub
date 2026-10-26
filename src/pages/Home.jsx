// Home Page Component (Lectures 7–12, 25–30, 43–48, 67–72)
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doctorsData } from "../data/doctorsData";
import { fetchDailyHealthTips } from "../services/healthService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorState from "../components/common/ErrorState";

export function Home() {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState("");
  const [healthTips, setHealthTips] = useState([]);
  const [tipsLoading, setTipsLoading] = useState(true);
  const [tipsError, setTipsError] = useState("");

  // Featured doctors (top 3)
  const featuredDoctors = doctorsData.slice(0, 3);

  // Load health advisory tips asynchronously (demonstrates Lectures 67–72)
  async function loadTips(shouldSimulateError = false) {
    setTipsLoading(true);
    setTipsError("");
    try {
      const tips = await fetchDailyHealthTips(shouldSimulateError);
      setHealthTips(tips);
    } catch (err) {
      setTipsError(err.message || "Failed to load health tips.");
    } finally {
      setTipsLoading(false);
    }
  }

  useEffect(() => {
    loadTips();
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/doctors");
    }
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">TRUSTED DIGITAL HEALTHCARE</p>
          <h1>
            Your Health,
            <br />
            <span>Our Highest Priority.</span>
          </h1>
          <p>
            Experience comprehensive healthcare management. Schedule doctor consultations,
            view medical checkup records, coordinate emergency blood donations, and check symptoms —
            all in one intuitive portal.
          </p>

          {/* Search bar inside Hero */}
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: "flex", gap: "10px", margin: "20px 0 25px", maxWidth: "520px" }}
          >
            <input
              type="text"
              placeholder="Search by doctor name or specialty (e.g. Cardiologist, Sharma)..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              style={{ margin: 0, padding: "14px 18px", fontSize: "0.95rem" }}
              aria-label="Search doctors"
            />
            <button type="submit" className="btn" style={{ padding: "0 22px", flexShrink: 0 }}>
              Search 🔍
            </button>
          </form>

          <div className="hero-buttons">
            <Link to="/appointment" className="btn btn-lg">
              📅 Book Appointment
            </Link>
            <Link to="/donate" className="btn btn-lg btn-red">
              🩸 Blood Bank & Donors
            </Link>
            <Link to="/emergency" className="btn btn-lg btn-outline" style={{ background: "#ffffff" }}>
              🚨 Emergency
            </Link>
          </div>

          <div className="hero-trust-badges">
            <div className="trust-badge-item">
              <span>🛡️</span> Verified Specialists
            </div>
            <div className="trust-badge-item">
              <span>⚡</span> Real-Time Booking
            </div>
            <div className="trust-badge-item">
              <span>📋</span> Digitized Records
            </div>
            <div className="trust-badge-item">
              <span>🚑</span> 24/7 Helpline
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
            alt="Doctor consulting with a patient in modern clinic"
          />
        </div>
      </section>

      {/* HEALTHCARE SERVICES SECTION */}
      <section className="section">
        <div className="container" style={{ padding: "0 0 20px" }}>
          <div className="section-title">
            <p className="small-title">OUR SERVICES</p>
            <h2>Comprehensive Medical Care</h2>
            <p>Thoughtfully designed digital services to streamline every stage of patient care.</p>
          </div>

          <div className="grid">
            <div className="card service-card">
              <img
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80"
                alt="Doctor consultation desk"
              />
              <div className="card-icon">📅</div>
              <h3>Doctor Appointments</h3>
              <p>Schedule clinic visits or video consultations with verified medical specialists.</p>
              <Link to="/appointment">Book Appointment →</Link>
            </div>

            <div className="card service-card">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80"
                alt="Blood donation medical lab"
              />
              <div className="card-icon">🩸</div>
              <h3>Blood Bank & Donors</h3>
              <p>Register as a voluntary donor, check live blood stock, or request emergency units.</p>
              <Link to="/donate">Visit Blood Center →</Link>
            </div>

            <div className="card service-card">
              <img
                src="https://images.unsplash.com/photo-1559757175-7cb057fba93c?auto=format&fit=crop&w=600&q=80"
                alt="Medical stethoscope and checkup"
              />
              <div className="card-icon">🔍</div>
              <h3>Symptom Checker</h3>
              <p>Assess common symptoms, understand triage urgency, and find the right specialist.</p>
              <Link to="/symptoms">Check Symptoms →</Link>
            </div>

            <div className="card service-card">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80"
                alt="Team of healthcare professionals"
              />
              <div className="card-icon">👨‍⚕️</div>
              <h3>Specialist Directory</h3>
              <p>Browse doctors by specialty, read qualifications, consultation fees, and patient reviews.</p>
              <Link to="/doctors">Meet Our Doctors →</Link>
            </div>

            <div className="card service-card">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
                alt="Patient medical history files"
              />
              <div className="card-icon">📋</div>
              <h3>Medical Records</h3>
              <p>Review recorded vitals, previous checkups, doctors' clinical notes, and prescriptions.</p>
              <Link to="/checkups">View Medical History →</Link>
            </div>

            <div className="card service-card">
              <img
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80"
                alt="Emergency ambulance vehicle"
              />
              <div className="card-icon">🚑</div>
              <h3>Emergency Support</h3>
              <p>Instant access to 24/7 hospital helplines, trauma unit directions, and first-aid protocols.</p>
              <Link to="/emergency">Emergency Information →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SPECIALISTS PREVIEW */}
      <section className="section" style={{ background: "#ffffff", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ padding: "0 0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "35px", flexWrap: "wrap", gap: "15px" }}>
            <div>
              <p className="small-title">OUR MEDICAL FACULTY</p>
              <h2>Featured Specialists</h2>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>Experienced consultants available for in-person and telehealth appointments.</p>
            </div>
            <Link to="/doctors" className="btn btn-secondary">
              View All Doctors ({doctorsData.length}) →
            </Link>
          </div>

          <div className="grid">
            {featuredDoctors.map((doc) => (
              <div key={doc.id} className="card doctor-card">
                <div>
                  <img src={doc.image} alt={doc.name} className="doctor-photo" />
                  <span className="doctor-specialty-badge">{doc.speciality}</span>
                  <h3>{doc.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                    {doc.qualifications}
                  </p>
                  <div className="doctor-rating">
                    <span>★ {doc.rating}</span>
                    <span style={{ color: "var(--text-light)" }}>({doc.reviewsCount} reviews)</span>
                  </div>
                  <p className="doctor-fee">
                    Consultation: <strong>₹{doc.fee}</strong>
                  </p>
                </div>

                <div className="doctor-card-actions">
                  <Link to={`/doctors/${doc.id}`} className="btn btn-outline btn-sm">
                    View Profile
                  </Link>
                  <Link to={`/appointment?doctor=${encodeURIComponent(doc.name)}`} className="btn btn-sm">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASYNC HEALTH ADVISORY & WELLNESS TIPS (Lectures 67–72) */}
      <section className="section">
        <div className="container" style={{ padding: "0 0 20px" }}>
          <div className="section-title">
            <p className="small-title">PREVENTIVE CARE & WELLNESS</p>
            <h2>Daily Health Insights</h2>
            <p>Evidence-based wellness advisories curated by LifeCare medical consultants.</p>
          </div>

          {tipsLoading && <LoadingSpinner text="Fetching latest healthcare advisories..." />}

          {tipsError && (
            <ErrorState
              title="Unable to load health advisories"
              message={tipsError}
              onRetry={() => loadTips(false)}
            />
          )}

          {!tipsLoading && !tipsError && (
            <div className="grid">
              {healthTips.map((tip) => (
                <div key={tip.id} className="card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span
                      style={{
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: 700
                      }}
                    >
                      {tip.category}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>{tip.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>{tip.title}</h3>
                  <p style={{ fontSize: "0.925rem", color: "var(--text-muted)", flex: 1 }}>{tip.summary}</p>
                  <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>
                    ✍️ {tip.author}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BLOOD DONATION BANNER */}
      <div className="container" style={{ padding: "0 0 30px" }}>
        <section className="blood-banner">
          <div>
            <p className="small-title red-text">SAVE LIVES TODAY</p>
            <h2>
              One Blood Donation Can
              <br />
              Save Up to Three Lives ❤️
            </h2>
            <p>
              Hospital emergencies and surgeries require a steady blood supply every day.
              Join our voluntary blood donor community or request urgent units.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/donate" className="btn btn-red btn-lg">
              Become a Donor
            </Link>
            <Link to="/donate" className="btn btn-secondary btn-lg" style={{ background: "#ffffff" }}>
              Check Blood Stock
            </Link>
          </div>
        </section>
      </div>

      {/* SAMPLE TESTIMONIALS (IDENTIFIED AS DEMO CONTENT) */}
      <section className="section" style={{ background: "var(--bg-subtle)" }}>
        <div className="container" style={{ padding: "0 0 20px" }}>
          <div className="section-title">
            <p className="small-title">PATIENT STORIES</p>
            <h2>Trusted by Families</h2>
            <p>Demonstration feedback reflecting our focus on compassionate, accessible digital healthcare.</p>
          </div>

          <div className="grid">
            <div className="card">
              <div style={{ color: "var(--accent-amber)", fontSize: "1.1rem", marginBottom: "8px" }}>
                ★★★★★
              </div>
              <p style={{ fontStyle: "italic", marginBottom: "16px" }}>
                "Booking an appointment with Dr. Sharma took under a minute. The ability to check my past vitals and medication instructions in one place is invaluable."
              </p>
              <div>
                <strong>Meera Swaminathan</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)", margin: 0 }}>Patient since 2025 • Verified Demo Review</p>
              </div>
            </div>

            <div className="card">
              <div style={{ color: "var(--accent-amber)", fontSize: "1.1rem", marginBottom: "8px" }}>
                ★★★★★
              </div>
              <p style={{ fontStyle: "italic", marginBottom: "16px" }}>
                "During a critical surgery, the blood bank status feature helped our family quickly find matching B+ donors in our district. A true life saver."
              </p>
              <div>
                <strong>Harish Patel</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)", margin: 0 }}>Donor & Relative • Verified Demo Review</p>
              </div>
            </div>

            <div className="card">
              <div style={{ color: "var(--accent-amber)", fontSize: "1.1rem", marginBottom: "8px" }}>
                ★★★★★
              </div>
              <p style={{ fontStyle: "italic", marginBottom: "16px" }}>
                "The symptom checker provided clear, calm guidance and directed me to the right specialist when I had persistent headaches. Exceptional interface!"
              </p>
              <div>
                <strong>Lavishka</strong>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)", margin: 0 }}>Registered Patient (P101) • Demo Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;