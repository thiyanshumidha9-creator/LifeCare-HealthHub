import { Link } from "react-router-dom";

function Emergency() {

  return (

    <div className="container">

      <div className="emergency-page">

        <div className="emergency-icon">
          🚑
        </div>

        <p className="small-title red-text">
          EMERGENCY SERVICES
        </p>

        <h1>
          Need Immediate Help?
        </h1>

        <p>
          If you are experiencing a serious medical
          emergency, contact emergency services or
          visit the nearest hospital immediately.
        </p>


        <img
          src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80"
          alt="Hospital emergency"
          className="emergency-image"
        />


        <div className="emergency-number">

          <span>
            📞
          </span>

          <div>

            <p>
              Hospital Emergency
            </p>

            <h2>
              +91 98765 43210
            </h2>

          </div>

        </div>


        <div className="emergency-cards">


          <div className="card">

            <div className="card-icon">
              🚑
            </div>

            <h3>
              Ambulance
            </h3>

            <p>
              Emergency ambulance service available.
            </p>

          </div>


          <div className="card">

            <div className="card-icon">
              🏥
            </div>

            <h3>
              Emergency Department
            </h3>

            <p>
              Open for urgent medical cases.
            </p>

          </div>


          <div className="card">

            <div className="card-icon">
              🩸
            </div>

            <h3>
              Blood Bank
            </h3>

            <p>
              Contact us for blood availability.
            </p>

          </div>

        </div>


        <Link
          to="/"
          className="btn"
        >
          ← Back to Home
        </Link>

      </div>

    </div>

  );
}

export default Emergency;