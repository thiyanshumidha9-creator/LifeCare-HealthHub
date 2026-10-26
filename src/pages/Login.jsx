// Patient Login & Registration Component (Lectures 19–24, 55–60)
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import FormField from "../components/common/FormField";

export function Login() {
  const { login, signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("login"); // "login" | "signup"

  // Shared fields
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [confirmPassword, setConfirmPassword] = useState("");
  const [blood, setBlood] = useState("O+");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Intended destination after login (from ProtectedRoute)
  const destination = location.state?.from?.pathname || "/dashboard";

  function handleQuickFill(demoId, demoName, demoPass) {
    setId(demoId);
    setName(demoName);
    setPassword(demoPass);
    setError("");
    setMode("login");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!id.trim() || !name.trim() || !password) {
      setError("Please fill in your Patient ID, Name, and Password.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const loggedIn = login(id, name, password);
        toast.success(`Welcome back, ${loggedIn.name}!`);
        navigate(destination, { replace: true });
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        const newPatient = signup({
          id,
          name,
          password,
          blood,
          phone
        });

        toast.success(`Account created! Welcome to LifeCare, ${newPatient.name}.`);
        navigate(destination, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please verify your details.");
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(newMode) {
    setMode(newMode);
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-icon">🏥</div>
        <h2>{mode === "login" ? "Patient Portal Login" : "New Patient Registration"}</h2>
        <p>
          {mode === "login"
            ? "Enter your credentials to access appointments, vitals, and records."
            : "Create your healthcare account to manage appointments and records."}
        </p>

        <div className="login-tabs" role="tablist">
          <button
            type="button"
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "tab active" : "tab"}
            onClick={() => switchMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Full Name"
            required
            placeholder="e.g. Lavishka"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormField
            label="Patient ID"
            required
            placeholder="e.g. P101"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          {mode === "signup" && (
            <>
              <FormField label="Blood Group" required>
                <select value={blood} onChange={(e) => setBlood(e.target.value)}>
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </FormField>

              <FormField
                label="Contact Phone (Optional)"
                type="tel"
                placeholder="+91 98765 11223"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          )}

          <FormField
            label="Password"
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "signup" && (
            <FormField
              label="Confirm Password"
              required
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            className="btn btn-lg"
            disabled={loading}
            style={{ width: "100%", marginTop: "16px" }}
          >
            {loading ? "Authenticating..." : mode === "login" ? "Login to Dashboard" : "Create Account"}
          </button>
        </form>

        {error && <p className="login-error">⚠️ {error}</p>}

        {mode === "login" && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "8px" }}>
              Quick Demo Logins (Click to autofill):
            </p>
            <div className="demo-account-pills">
              <button
                type="button"
                className="demo-pill-btn"
                onClick={() => handleQuickFill("P101", "Lavishka", "lifecare123")}
              >
                Lavishka (P101)
              </button>
              <button
                type="button"
                className="demo-pill-btn"
                onClick={() => handleQuickFill("P102", "Rahul Verma", "patient102")}
              >
                Rahul (P102)
              </button>
              <button
                type="button"
                className="demo-pill-btn"
                onClick={() => handleQuickFill("P103", "Aisha Khan", "patient103")}
              >
                Aisha (P103)
              </button>
            </div>
          </div>
        )}

        <p className="login-note">
          {mode === "login"
            ? "Demo authentication using local storage. Passwords are validated locally."
            : "Any unique Patient ID creates an instant local demonstration profile."}
        </p>
      </div>
    </div>
  );
}

export default Login;
