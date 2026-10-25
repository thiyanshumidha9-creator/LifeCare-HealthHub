import { useState } from "react";

function Symptoms() {

  const [symptom, setSymptom] = useState("");


  return (

    <div className="container">

      <div className="page-heading">

        <p className="small-title">
          HEALTH CHECK
        </p>

        <h1>
          Symptom Checker
        </h1>

        <p>
          Select a symptom to see basic health information.
        </p>

      </div>


      <div className="symptom-box">

        <div className="form-icon">
          🔍
        </div>

        <h2>
          What are you feeling?
        </h2>


        <select
          value={symptom}
          onChange={(e) =>
            setSymptom(e.target.value)
          }
        >

          <option value="">
            Select a symptom
          </option>

          <option value="Fever">
            Fever
          </option>

          <option value="Cough">
            Cough
          </option>

          <option value="Headache">
            Headache
          </option>

          <option value="Stomach Pain">
            Stomach Pain
          </option>

        </select>


        {symptom === "Fever" && (

          <div className="symptom-result">

            <h3>
              Possible: Viral Fever
            </h3>

            <p>
              Fever can have many causes.
            </p>

          </div>

        )}


        {symptom === "Cough" && (

          <div className="symptom-result">

            <h3>
              Possible: Common Cold
            </h3>

            <p>
              Cough may occur due to several conditions.
            </p>

          </div>

        )}


        {symptom === "Headache" && (

          <div className="symptom-result">

            <h3>
              Possible: Headache/Migraine
            </h3>

            <p>
              Headaches can have many different causes.
            </p>

          </div>

        )}


        {symptom === "Stomach Pain" && (

          <div className="symptom-result">

            <h3>
              Possible: Gastric Problem
            </h3>

            <p>
              Stomach pain can have several causes.
            </p>

          </div>

        )}


        <div className="warning">

          ⚠️ This is only an educational feature and
          does not provide a medical diagnosis.
          Please consult a qualified doctor.

        </div>

      </div>

    </div>

  );
}

export default Symptoms;