import seedPatients from "../data/patients";

// This file simulates a small "database" using localStorage.
// On first ever run, it seeds itself with the 3 demo patients
// from data/patients.js. After that, every new signup gets added
// here too, so new users can actually register and log in —
// not just the 3 hardcoded demo accounts.

const DB_KEY = "lifecare_patients_db";

function loadDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) {
    return JSON.parse(raw);
  }
  // First run — seed with the demo patients and save.
  localStorage.setItem(DB_KEY, JSON.stringify(seedPatients));
  return seedPatients;
}

function saveDB(patients) {
  localStorage.setItem(DB_KEY, JSON.stringify(patients));
}

// Find a patient whose id + name + password all match (case-insensitive
// id/name, exact password) — used for login.
export function findPatient(id, name, password) {
  const patients = loadDB();
  return patients.find(
    (p) =>
      p.id.toLowerCase() === id.trim().toLowerCase() &&
      p.name.toLowerCase() === name.trim().toLowerCase() &&
      p.password === password
  );
}

// Check if a patient ID is already taken — used during signup.
export function idExists(id) {
  const patients = loadDB();
  return patients.some(
    (p) => p.id.toLowerCase() === id.trim().toLowerCase()
  );
}

// Add a brand new patient to the "database" — used during signup.
export function registerPatient({ id, name, password, blood }) {
  const patients = loadDB();
  const newPatient = {
    id: id.trim(),
    name: name.trim(),
    password,
    blood,
    nextAppointment: "Not scheduled yet",
  };
  const updated = [...patients, newPatient];
  saveDB(updated);
  return newPatient;
}
