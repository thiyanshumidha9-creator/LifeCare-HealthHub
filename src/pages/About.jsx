import { Link } from "react-router-dom";

function About() {

  return (

    <div className="container">

      <div className="page-heading">

        <p className="small-title">
          ABOUT US
        </p>

        <h1>
          About LifeCare
        </h1>

        <p>
          A simple digital healthcare experience.
        </p>

      </div>


      <div className="about-grid">

        <div className="about-content">

          <h2>
            Healthcare Made Simple
          </h2>

          <p>
            LifeCare is a basic hospital and blood
            donation management website created to make
            common healthcare activities easier for
            patients.
          </p>

          <p>
            Patients can view their previous checkups,
            book appointments, find doctors, register
            for blood donation, request blood and use
            our basic symptom checker.
          </p>

          <Link
            to="/appointment"
            className="btn"
          >
            Book an Appointment
          </Link>

        </div>


        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
            alt="Healthcare"
          />

        </div>

      </div>


      <div className="grid about-stats">


        <div className="card stat-card">

          <h2>
            24/7
          </h2>

          <p>
            Emergency Support
          </p>

        </div>


        <div className="card stat-card">

          <h2>
            50+
          </h2>

          <p>
            Healthcare Professionals
          </p>

        </div>


        <div className="card stat-card">

          <h2>
            1000+
          </h2>

          <p>
            Patients Served
          </p>

        </div>

      </div>

    </div>

  );
}

export default About;