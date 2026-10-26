// Mock "database" of registered patients.
// In a real app this data would live on a server/database and
// passwords would be hashed (bcrypt) — never stored in plain text.
// This file only exists to simulate that lookup on the front end.

const patients = [
  {
    id: "P101",
    password: "lifecare123",
    name: "Lavishka",
    blood: "O+",
    nextAppointment: "28 August 2026",
  },
  {
    id: "P102",
    password: "patient102",
    name: "Rahul Verma",
    blood: "B+",
    nextAppointment: "02 September 2026",
  },
  {
    id: "P103",
    password: "patient103",
    name: "Aisha Khan",
    blood: "A-",
    nextAppointment: "10 September 2026",
  },
];

export default patients;
