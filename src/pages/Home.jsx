import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO LIFECARE
          </p>

          <h1>
            Your Health,
            <br />
            <span>Our Priority.</span>
          </h1>

          <p>
            Take control of your health with LifeCare.
            Book appointments, view your medical history,
            donate blood and get basic health information
            all in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/appointment"
              className="btn"
            >
              📅 Book Appointment
            </Link>

            <Link
              to="/donate"
              className="btn btn-red"
            >
              🩸 Donate Blood
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
            alt="Doctor and patient"
          />

        </div>

      </section>


      {/* SERVICES */}

      <section className="section">

        <div className="section-title">

          <p className="small-title">
            OUR SERVICES
          </p>

          <h2>
            Everything You Need
          </h2>

          <p>
            Simple healthcare services designed for patients.
          </p>

        </div>


        <div className="grid">


          <div className="card service-card">

            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80"
              alt="Appointment"
            />

            <div className="card-icon">
              📅
            </div>

            <h3>
              Book Appointment
            </h3>

            <p>
              Schedule your next hospital visit easily.
            </p>

            <Link to="/appointment">
              Book Now →
            </Link>

          </div>


          <div className="card service-card">

            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80"
              alt="Blood donation"
            />

            <div className="card-icon">
              🩸
            </div>

            <h3>
              Blood Donation
            </h3>

            <p>
              Register yourself as a blood donor.
            </p>

            <Link to="/donate">
              Donate →
            </Link>

          </div>


          <div className="card service-card">

            <img
              src="https://images.unsplash.com/photo-1559757175-7cb057fba93c?auto=format&fit=crop&w=600&q=80"
              alt="Health check"
            />

            <div className="card-icon">
              🔍
            </div>

            <h3>
              Symptom Checker
            </h3>

            <p>
              Check possible conditions based on symptoms.
            </p>

            <Link to="/symptoms">
              Check →
            </Link>

          </div>


          <div className="card service-card">

            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80"
              alt="Doctor"
            />

            <div className="card-icon">
              👨‍⚕️
            </div>

            <h3>
              Our Doctors
            </h3>

            <p>
              View our doctors and specialists.
            </p>

            <Link to="/doctors">
              View Doctors →
            </Link>

          </div>


          <div className="card service-card">

            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
              alt="Medical records"
            />

            <div className="card-icon">
              📋
            </div>

            <h3>
              Medical History
            </h3>

            <p>
              View your previous checkups and diagnoses.
            </p>

            <Link to="/checkups">
              View History →
            </Link>

          </div>


          <div className="card service-card">

            <img
              src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80"
              alt="Emergency"
            />

            <div className="card-icon">
              🚑
            </div>

            <h3>
              Emergency
            </h3>

            <p>
              Find emergency contact information.
            </p>

            <Link to="/emergency">
              Emergency →
            </Link>

          </div>

        </div>

      </section>


      {/* BLOOD BANNER */}

      <section className="blood-banner">

        <div>

          <p className="small-title red-text">
            SAVE LIVES
          </p>

          <h2>
            One Donation Can Make
            <br />
            A Difference ❤️
          </h2>

          <p>
            Your blood donation can help someone in need.
          </p>

        </div>

        <Link
          to="/donate"
          className="btn btn-red"
        >
          Become a Donor
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-content">

          <div>

            <h3>
              ♥ LifeCare
            </h3>

            <p>
              Simple healthcare management
              for everyone.
            </p>

          </div>


          <div>

            <h3>
              Quick Links
            </h3>

            <p>
              Appointments
            </p>

            <p>
              Blood Donation
            </p>

            <p>
              Doctors
            </p>

          </div>


          <div>

            <h3>
              Contact
            </h3>

            <p>
              📞 +91 98765 43210
            </p>

            <p>
              ✉️ lifecare@example.com
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;