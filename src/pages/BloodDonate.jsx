import { useState } from "react";

function BloodDonate() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [group, setGroup] = useState("");

  const [registered, setRegistered] = useState(false);


  function registerDonor() {

    if (
      name !== "" &&
      age !== "" &&
      group !== ""
    ) {

      setRegistered(true);

    } else {

      alert(
        "Please fill all the fields."
      );

    }

  }


  return (

    <div className="container">

      <div className="blood-section">

        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=900&q=80"
          alt="Blood donation"
          className="blood-image"
        />


        <p className="small-title red-text">
          BLOOD DONATION
        </p>

        <h1>
          Be Someone's Hero
        </h1>

        <p>
          Blood donation is a simple way to help people
          who need blood during emergencies, surgeries,
          and medical treatments.
        </p>


        <div className="form-container blood-form">

          <h2>
            Donor Registration
          </h2>


          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


          <input
            type="number"
            placeholder="Your Age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
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


          <button
            className="btn-red"
            onClick={registerDonor}
          >
            Register as Donor
          </button>


          {registered && (

            <div className="success">

              <h3>
                ❤️ Thank You, {name}!
              </h3>

              <p>
                You have registered as a
                {" "}{group} blood donor.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default BloodDonate;