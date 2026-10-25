import { Link } from "react-router-dom";

function Dashboard({ patient }) {

  return (

    <div className="container">


      <div className="dashboard-header">

        <div>

          <p>
            GOOD MORNING 👋
          </p>

          <h1>
            Welcome, {patient.name}
          </h1>

          <p>
            Patient ID: {patient.id}
          </p>

        </div>


        <div className="profile-circle">
          👤
        </div>

      </div>


      <div className="section-title left">

        <p className="small-title">
          PATIENT OVERVIEW
        </p>

        <h2>
          Your Health Summary
        </h2>

      </div>


      <div className="grid dashboard-grid">


        <div className="card dashboard-card">

          <div className="card-icon">
            🩸
          </div>

          <p>
            Blood Group
          </p>

          <h2>
            {patient.blood}
          </h2>

        </div>


        <div className="card dashboard-card">

          <div className="card-icon">
            📅
          </div>

          <p>
            Next Appointment
          </p>

          <h3>
            {patient.nextAppointment}
          </h3>

        </div>


        <div className="card dashboard-card">

          <div className="card-icon">
            📋
          </div>

          <p>
            Previous Checkups
          </p>

          <h2>
            3
          </h2>

        </div>

      </div>


      <div className="dashboard-actions">


        <Link
          to="/appointment"
          className="action-card"
        >

          <span>
            📅
          </span>

          <div>

            <h3>
              Book Appointment
            </h3>

            <p>
              Schedule your next visit
            </p>

          </div>

        </Link>


        <Link
          to="/checkups"
          className="action-card"
        >

          <span>
            📋
          </span>

          <div>

            <h3>
              Medical History
            </h3>

            <p>
              View previous checkups
            </p>

          </div>

        </Link>


        <Link
          to="/donate"
          className="action-card"
        >

          <span>
            🩸
          </span>

          <div>

            <h3>
              Donate Blood
            </h3>

            <p>
              Help someone in need
            </p>

          </div>

        </Link>

      </div>

    </div>

  );
}

export default Dashboard;