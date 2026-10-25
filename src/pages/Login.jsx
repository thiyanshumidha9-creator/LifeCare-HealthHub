import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();


  function login() {

    if (name !== "" && id !== "") {

      navigate("/dashboard");

    } else {

      alert(
        "Please enter your name and patient ID."
      );

    }

  }


  return (

    <div className="login-page">

      <div className="login-box">

        <div className="login-icon">
          🏥
        </div>

        <h2>
          Patient Login
        </h2>

        <p>
          Login to access your LifeCare dashboard.
        </p>


        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        <input
          type="text"
          placeholder="Patient ID"
          value={id}
          onChange={(e) =>
            setId(e.target.value)
          }
        />


        <button onClick={login}>
          Login to Dashboard
        </button>


        <p className="login-note">
          Demo login — no real account required.
        </p>

      </div>

    </div>

  );
}

export default Login;