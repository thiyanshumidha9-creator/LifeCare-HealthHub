import { useState } from "react";

function BloodRequest() {

  const [patient, setPatient] = useState("");
  const [group, setGroup] = useState("");
  const [units, setUnits] = useState("");

  const [sent, setSent] = useState(false);


  function requestBlood() {

    if (
      patient !== "" &&
      group !== "" &&
      units !== ""
    ) {

      setSent(true);

    } else {

      alert(
        "Please fill all the fields."
      );

    }

  }


  return (

    <div className="container">

      <div className="page-heading">

        <p className="small-title red-text">
          BLOOD BANK
        </p>

        <h1>
          Request Blood
        </h1>

        <p>
          Submit a blood request for a patient.
        </p>

      </div>


      <div className="emergency-card">

        <h3>
          🚨 Need Blood Urgently?
        </h3>

        <p>
          For serious emergencies, please contact
          the hospital directly.
        </p>

      </div>


      <div className="form-container">

        <div className="form-icon">
          🩸
        </div>

        <h2>
          Blood Request Form
        </h2>


        <input
          type="text"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) =>
            setPatient(e.target.value)
          }
        />


        <select
          value={group}
          onChange={(e) =>
            setGroup(e.target.value)
          }
        >

          <option value="">
            Select Blood Group
          </option>

          <option>O+</option>
          <option>O-</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>

        </select>


        <input
          type="number"
          placeholder="Units Required"
          value={units}
          onChange={(e) =>
            setUnits(e.target.value)
          }
        />


        <button
          className="btn-red"
          onClick={requestBlood}
        >
          Send Blood Request
        </button>


        {sent && (

          <div className="success">

            <h3>
              ✓ Request Submitted
            </h3>

            <p>
              Blood group: {group}
            </p>

            <p>
              Units required: {units}
            </p>

            <p>
              Hospital staff will review the request.
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default BloodRequest;