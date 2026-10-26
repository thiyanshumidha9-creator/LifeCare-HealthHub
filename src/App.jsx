// Main Application Architecture (Front-End Engineering II: Lectures 1–72)
import { Routes, Route, Navigate } from "react-router-dom";

// Context Providers (Global State Architecture)
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { ToastProvider } from "./context/ToastContext";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routes/ProtectedRoute";

// Page Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Checkups from "./pages/Checkups";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import BloodDonate from "./pages/BloodDonate";
import BloodRequest from "./pages/BloodRequest";
import Symptoms from "./pages/Symptoms";
import Emergency from "./pages/Emergency";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <ToastProvider>
          <Navbar />

          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:doctorId" element={<DoctorDetails />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/donate" element={<BloodDonate />} />
              <Route path="/request" element={<BloodRequest />} />
              <Route path="/symptoms" element={<Symptoms />} />
              <Route path="/checkups" element={<Checkups />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/about" element={<About />} />

              {/* Protected Routes (Requires Login) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </ToastProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
