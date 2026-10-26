// Authentication Context (Lectures 49–54: Context API, Global State Management)
import { createContext, useContext, useState, useEffect } from "react";
import seedPatients from "../data/patients";
import { findPatient, idExists, registerPatient as storeRegisterPatient } from "../utils/patientStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore existing session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lifecare_patient");
      if (saved) {
        setPatient(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse saved patient session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login handler
  function login(id, name, password) {
    const matched = findPatient(id, name, password);
    if (!matched) {
      throw new Error("Invalid Patient ID, name, or password. Please check your credentials or register.");
    }
    setPatient(matched);
    localStorage.setItem("lifecare_patient", JSON.stringify(matched));
    return matched;
  }

  // Signup handler
  function signup({ id, name, password, blood, phone, email }) {
    if (idExists(id)) {
      throw new Error(`Patient ID "${id}" is already registered. Please login instead.`);
    }
    const newPatient = storeRegisterPatient({ id, name, password, blood });
    // Add optional extra profile info
    if (phone || email) {
      newPatient.phone = phone || "";
      newPatient.email = email || "";
    }
    setPatient(newPatient);
    localStorage.setItem("lifecare_patient", JSON.stringify(newPatient));
    return newPatient;
  }

  // Update profile handler
  function updateProfile(updatedFields) {
    if (!patient) return;
    const updated = { ...patient, ...updatedFields };
    setPatient(updated);
    localStorage.setItem("lifecare_patient", JSON.stringify(updated));

    // Also update in patients DB
    try {
      const raw = localStorage.getItem("lifecare_patients_db");
      if (raw) {
        const db = JSON.parse(raw);
        const idx = db.findIndex((p) => p.id.toLowerCase() === patient.id.toLowerCase());
        if (idx !== -1) {
          db[idx] = { ...db[idx], ...updatedFields };
          localStorage.setItem("lifecare_patients_db", JSON.stringify(db));
        }
      }
    } catch (err) {
      console.warn("Could not synchronize profile to patients DB", err);
    }
  }

  // Logout handler
  function logout() {
    setPatient(null);
    localStorage.removeItem("lifecare_patient");
  }

  const value = {
    patient,
    isAuthenticated: !!patient,
    loading,
    login,
    signup,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
