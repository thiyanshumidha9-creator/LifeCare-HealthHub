// Appointment Management Context (Lectures 49–54: Global State & CRUD Workflows)
import { createContext, useContext, useState, useEffect } from "react";
import { sampleAppointments } from "../data/sampleAppointments";

const AppointmentContext = createContext(null);
const STORAGE_KEY = "lifecare_appointments_db";

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Error reading appointments from localStorage", e);
    }
    // Seed initial appointments
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleAppointments));
    return sampleAppointments;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error("Failed to save appointments to localStorage", e);
    }
  }, [appointments]);

  /**
   * CREATE: Book a new appointment
   */
  function bookAppointment(appointmentData) {
    const newAppointment = {
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
      ...appointmentData
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  }

  /**
   * UPDATE: Reschedule existing appointment date/time
   */
  function rescheduleAppointment(id, newDate, newTime, reason = "") {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          return {
            ...apt,
            date: newDate,
            time: newTime,
            status: "rescheduled",
            rescheduledAt: new Date().toISOString(),
            rescheduleReason: reason || apt.rescheduleReason
          };
        }
        return apt;
      })
    );
  }

  /**
   * UPDATE: Cancel an appointment
   */
  function cancelAppointment(id, cancelReason = "Cancelled by patient") {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          return {
            ...apt,
            status: "cancelled",
            cancelledAt: new Date().toISOString(),
            cancelReason
          };
        }
        return apt;
      })
    );
  }

  /**
   * DELETE: Remove appointment entirely from records
   */
  function deleteAppointment(id) {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  }

  /**
   * READ: Get all appointments for a specific patient
   */
  function getPatientAppointments(patientId, patientName, filterStatus = "all") {
    return appointments.filter((apt) => {
      const matchesPatient =
        (patientId && apt.patientId?.toLowerCase() === patientId.toLowerCase()) ||
        (patientName && apt.patientName?.toLowerCase() === patientName.toLowerCase());

      if (!matchesPatient && (patientId || patientName)) return false;

      if (filterStatus === "all") return true;
      if (filterStatus === "upcoming") {
        return apt.status === "confirmed" || apt.status === "rescheduled";
      }
      return apt.status === filterStatus;
    });
  }

  /**
   * Helper: Get next upcoming appointment for a patient
   */
  function getNextAppointment(patientId, patientName) {
    const active = appointments
      .filter((apt) => {
        const matchesPatient =
          (patientId && apt.patientId?.toLowerCase() === patientId.toLowerCase()) ||
          (patientName && apt.patientName?.toLowerCase() === patientName.toLowerCase());
        return matchesPatient && (apt.status === "confirmed" || apt.status === "rescheduled");
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return active[0] || null;
  }

  const value = {
    appointments,
    bookAppointment,
    rescheduleAppointment,
    cancelAppointment,
    deleteAppointment,
    getPatientAppointments,
    getNextAppointment
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
}

export default AppointmentContext;
