import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Checkups from "./pages/Checkups";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import BloodDonate from "./pages/BloodDonate";
import BloodRequest from "./pages/BloodRequest";
import Symptoms from "./pages/Symptoms";
import Emergency from "./pages/Emergency";
import About from "./pages/About";

function App() {
  const patient = {
    name: "Lavishka",
    id: "P101",
    blood: "O+",
    nextAppointment: "28 August 2026",
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard patient={patient} />}
        />

        <Route path="/checkups" element={<Checkups />} />

        <Route path="/appointment" element={<Appointment />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/donate" element={<BloodDonate />} />

        <Route path="/request" element={<BloodRequest />} />

        <Route path="/symptoms" element={<Symptoms />} />

        <Route path="/emergency" element={<Emergency />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

