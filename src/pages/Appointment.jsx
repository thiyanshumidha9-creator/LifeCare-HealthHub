import { useState } from "react";

function Appointment() {

  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [booked, setBooked] = useState(false);


  function bookAppointment() {

    if (
      name !== "" &&
      doctor !== "" &&
      date !== "" &&
      time !== ""
    ) {

      setBooked(true);

    } else {

      alert(
        "Please fill all the fields."
      );

    }

  }


  return (

    <div className="container">

      <div className="page-heading">

        <p className="small-title">
          APPOINTMENTS
        </p>

        <h1>
          Book an Appointment
        </h1>

        <p>
          Choose your doctor and preferred appointment time.
        </p>

      </div>


      <div className="form-container">

        <div className="form-icon">
          📅
        </div>

        <h2>
          Appointment Details
        </h2>


        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        <select
          value={doctor}
          onChange={(e) =>
            setDoctor(e.target.value)
          }
        >

          <option value="">
            Select Doctor
          </option>

          <option value="Dr. Sharma">
            Dr. Sharma - General Physician
          </option>

          <option value="Dr. Mehta">
            Dr. Mehta - Cardiologist
          </option>

          <option value="Dr. Kaur">
            Dr. Kaur - Dermatologist
          </option>

        </select>


        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />


        <select
          value={time}
          onChange={(e) =>
            setTime(e.target.value)
          }
        >

          <option value="">
            Select Time
          </option>

          <option>
            10:00 AM
          </option>

          <option>
            12:00 PM
          </option>

          <option>
            3:00 PM
          </option>

          <option>
            5:00 PM
          </option>

        </select>


        <button onClick={bookAppointment}>
          Confirm Appointment
        </button>


        {booked && (

          <div className="success">

            <h3>
              ✓ Appointment Confirmed!
            </h3>

            <p>
              Patient: {name}
            </p>

            <p>
              Doctor: {doctor}
            </p>

            <p>
              Date: {date}
            </p>

            <p>
              Time: {time}
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default Appointment;