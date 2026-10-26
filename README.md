# LifeCare — Modern Healthcare & Patient Management Portal

> **Front-End Engineering II (Lectures 1–72)**  
> **Course:** Project-Based Evaluation II (PBE-II)  
> **Tech Stack:** React 19 • React Router v7 • Vanilla CSS Design System • Vite

---

## 🏥 1. Project Overview

**LifeCare** is a modern, responsive digital healthcare web application designed to connect patients with medical specialists, manage clinical appointments, coordinate emergency blood bank supply, track medical checkups and vitals, and provide intelligent symptom triage guidance.

The application has been elevated from a basic frontend project into a comprehensive healthcare prototype that models real-world patient workflows while demonstrating core curriculum concepts from **Lectures 1 through 72** of the Front-End Engineering II syllabus.

---

## ✨ 2. Key Features & Workflows

### 👨‍⚕️ Verified Doctors Directory & Dynamic Route (`/doctors`, `/doctors/:doctorId`)
* **Real-time debounced search:** Search doctors by name, hospital, or clinical focus using the custom `useDebounce` hook.
* **Specialty filtering:** Filter across 8 medical specialties (Cardiologist, General Physician, Dermatologist, Orthopedic, Pediatrician, Neurologist, Gynecologist, Ophthalmologist).
* **Consultation mode filter:** Filter by In-Person Clinic Visits or Telehealth Video Consultations.
* **Multi-criteria sorting:** Sort by rating, clinical experience years, consultation fee (low-to-high / high-to-low), or alphabetical order.
* **Pagination:** Accessible multi-page navigation for large rosters.
* **Dynamic Doctor Details route (`/doctors/:doctorId`):** Rich clinical biography, education credentials, consultation fees, clinic hours, location, and verified patient reviews.
* **Pre-filled appointment booking:** One-click "Book Consultation" passes the doctor's name directly into the booking form.

### 📅 Appointment Management Hub (`/appointment`)
* **Full CRUD Lifecycle:**
  * **Create:** Controlled form with field-level JavaScript validation (patient name, phone, date with past-date prohibition, time slot selector, consultation mode, chief medical complaints).
  * **Read:** Tabbed views for "Upcoming", "Completed", and "Cancelled" appointments with status badges.
  * **Update (Reschedule):** Accessible modal dialog to select a new date and time slot.
  * **Delete (Cancel):** Confirmation dialog requiring a cancellation reason before updating the appointment status.
* **Clinical Appointment Slip:** Printable confirmation receipt modal with appointment ID, doctor details, and clinical notes.
* **Persistence:** Synchronized in real time with `localStorage` under `lifecare_appointments_db`.

### 👤 Patient Dashboard (`/dashboard` — Protected Route)
* Guarded by `<ProtectedRoute>` which redirects unauthenticated visitors to `/login` and remembers their target URL.
* Greeting banner displaying patient name, ID, and blood group badge.
* Dynamic upcoming appointment highlight card with quick reschedule/cancel controls.
* Vital overview metrics: Total checkups, blood donor status, and active appointment counters.
* Quick-action shortcuts to all hospital services.
* Interactive "Edit Profile" modal to update contact phone, email, emergency contact, and blood group.

### 🩸 Community Blood Center (`/donate`, `/request`)
* **Live Inventory Tracking:** Units available per blood group (O+, O-, A+, A-, B+, B-, AB+, AB-) with shortage alerts ("Critical Shortage", "Low Stock", "Optimal").
* **Voluntary Donor Registration:** Controlled form with eligibility confirmation checklist (age 18–65, weight > 50kg, no recent tattoo/surgery).
* **Emergency Blood Requisition:** Requisition form with patient name, hospital, units needed, and urgency level.
* **Active Requisitions Registry:** Real-time requisition tracking table.

### 🔍 Interactive Symptom Checker & Health Triage (`/symptoms`)
* Multi-symptom chip selectors (Fever, Cough, Headache, Chest Tightness, Stomach Pain, Skin Rash, Joint Pain, Dizziness, Fatigue).
* Severity level selector (Mild, Moderate, Severe) and duration selector (< 24h, 2-4 days, > 1 week).
* Clinical Triage Assessment:
  * Care urgency level: Self-Care Home Protocol, Routine Consultation, Urgent Care, or Emergency 108.
  * Potential clinical considerations and self-care first aid advice.
  * Recommended specialist with a one-click direct appointment booking link.
  * Prominent medical disclaimer banner.

### 📋 Medical Records & Vitals History (`/checkups`)
* Timeline of past hospital visits, diagnoses, and attending physicians.
* Expandable details modal with recorded vitals (Blood Pressure, Pulse, Temperature, Weight), doctor's remarks, and prescribed medications.
* "Record Health Vitals" modal allowing patients to self-log blood pressure readings and symptoms.

### 🚑 Emergency & Trauma Center (`/emergency`)
* Direct click-to-call links for National Ambulance (108 / 112) and LifeCare Trauma Hotline (+91 98765 43210).
* Emergency Department capabilities: Level-1 trauma surgical units and blood dispatch.
* Hospital campus directions and landmark information.
* Clinical first-aid protocols (CPR, Choking, Severe Bleeding, Thermal Burns).

### 🔐 Authentication System (`/login`)
* Toggle between "Patient Login" and "New Patient Registration".
* Quick Demo Account auto-fill pills for evaluation:
  * `P101: Lavishka` (Password: `lifecare123`)
  * `P102: Rahul Verma` (Password: `patient102`)
  * `P103: Aisha Khan` (Password: `patient103`)
* Automatic redirection to intended protected pages.

### 🔔 Global Toast Notification System
* Accessible auto-dismissing toast notifications for Success, Error, Warning, and Info states (`ToastContext`).

### 📱 Responsive Mobile Navigation & 404 Recovery
* Mobile-first responsive CSS tested at 360px, 390px, 768px, 1024px, and 1440px.
* Mobile drawer with accessible hamburger toggle button (`☰` / `✕`).
* Dedicated 404 Not Found page (`*`) with clean navigation recovery.

---

## 📚 3. Front-End Engineering II Syllabus Mapping (Lectures 1–72)

| Lecture Topics | Syllabus Concept | Implementation in LifeCare |
| :--- | :--- | :--- |
| **Lectures 1–6** | HTML5 Semantic Tags, Box Model, Flexbox, Grid, Media Queries, Mobile-First CSS | Semantic elements (`<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`), CSS Grid for dashboards, Flexbox for navigation, mobile-first breakpoints (360px–1440px), reduced-motion support. |
| **Lectures 7–12** | JavaScript Fundamentals, Arrays, Objects, Functions, Loops, Git | Structured doctor datasets, appointment objects, array methods (`.filter()`, `.map()`, `.reduce()`, `.slice()`, `.sort()`). |
| **Lectures 13–18** | ES6+ Modules, Promises, async/await, Browser Storage, JSON | ES modules, asynchronous service layer (`fetchDoctors`, `fetchDailyHealthTips`), safe `localStorage` synchronization with JSON serialization. |
| **Lectures 19–24** | React Setup, JSX, Events, Controlled Components | Controlled inputs in appointment and registration forms, `onChange` event handlers, reusable input components. |
| **Lectures 25–30** | Components, Props, State, Conditional Rendering, Lists | `DoctorCard`, `CheckupCard`, `StatusBadge`, `FormField`, list rendering with unique keys, conditional rendering of emergency warnings and empty states. |
| **Lectures 31–36** | `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, Custom Hooks | `useDebounce` hook for search, `useLocalStorage` hook, `useRef` for modal focus trapping, `useMemo` for filtered doctor lists, `useCallback` for stable API fetches. |
| **Lectures 37–42** | React Router, Dynamic Routes, Protected Routes, 404 Pages | React Router v7, dynamic route `/doctors/:doctorId`, protected route `<ProtectedRoute>` guarding `/dashboard`, 404 page for `*`. |
| **Lectures 43–48** | Application Layout, Multi-page SPA, Navigation | Shared navbar with active `NavLink` styling, responsive mobile drawer, consistent footer, breadcrumb navigation. |
| **Lectures 49–54** | Context API, Global vs. Local State, Dashboard Mini-Project | `AuthContext` (patient session), `AppointmentContext` (CRUD operations), `ToastContext` (notifications), patient health dashboard with live vitals. |
| **Lectures 55–60** | React Forms, Validation Strategies, Reusable Inputs | `FormField` component with inline error messages, phone number regex validation, date boundary validation, submit loading states. |
| **Lectures 61–66** | Modals, Tabs, Dropdowns, Toast Notifications, Search & Filter | Accessible `Modal` with ESC key and backdrop dismissal, tab components in Appointment and Blood Center, `Toast` system, filter toolbars. |
| **Lectures 67–72** | REST APIs, Asynchronous State, Loading Skeletons, Error/Retry, Pagination, Debouncing, CRUD | Simulated REST API service layer (`doctorService.js`, `healthService.js`), debounced search, loading skeletons (`Skeleton.jsx`), `ErrorState` with retry buttons, pagination, full CRUD appointment workflow. |

---

## 📂 4. Project Structure

```
lifecare/
├── index.html                     # HTML5 entry with Google Fonts & SEO meta tags
├── package.json                   # Dependencies (React 19, React Router v7, Vite)
├── vite.config.js                 # Vite bundler configuration
├── src/
│   ├── main.jsx                   # React root render with BrowserRouter
│   ├── App.jsx                    # Route declarations & Context Providers
│   ├── index.css                  # Design system tokens, utilities & responsive CSS
│   ├── context/
│   │   ├── AuthContext.jsx        # Authentication session context & user store
│   │   ├── AppointmentContext.jsx # Full appointment CRUD state & localStorage sync
│   │   └── ToastContext.jsx       # Global notification toasts provider
│   ├── hooks/
│   │   ├── useDebounce.js         # Custom debouncing hook for search
│   │   └── useLocalStorage.js     # Custom persistent storage hook
│   ├── services/
│   │   ├── doctorService.js       # Asynchronous REST simulation (search, filter, sort, paginate)
│   │   ├── healthService.js       # Asynchronous health tips & advisory with retry
│   │   └── bloodService.js        # Blood bank inventory, donor registry & requests
│   ├── data/
│   │   ├── doctorsData.js         # 8 verified healthcare specialists & specialties
│   │   ├── sampleAppointments.js  # Pre-seeded demo appointments
│   │   ├── sampleCheckups.js      # Diagnostic records, vitals & prescriptions
│   │   └── patients.js            # Registered demo patient credentials
│   ├── components/
│   │   ├── Navbar.jsx             # Responsive navbar with mobile drawer & user pill
│   │   ├── CheckupCard.jsx        # Medical checkup card with vitals & modal
│   │   ├── common/
│   │   │   ├── Modal.jsx          # Accessible dialog with ESC key & focus trap
│   │   │   ├── StatusBadge.jsx    # Standardized status badge
│   │   │   ├── FormField.jsx      # Reusable form field with validation error display
│   │   │   ├── Pagination.jsx     # Multi-page pagination component
│   │   │   ├── LoadingSpinner.jsx # Clean healthcare SVG loading spinner
│   │   │   ├── Skeleton.jsx       # Card & text shimmer loading skeletons
│   │   │   ├── EmptyState.jsx     # Friendly zero-result state with action
│   │   │   ├── ErrorState.jsx     # Friendly error state with retry button
│   │   │   └── ConfirmationDialog.jsx # Modal confirmation for cancel/delete
│   │   ├── layout/
│   │   │   └── Footer.jsx         # Comprehensive healthcare footer
│   │   └── routes/
│   │       └── ProtectedRoute.jsx # Route authentication guard
│   └── pages/
│       ├── Home.jsx               # Landing page with hero, search, services, tips
│       ├── Doctors.jsx            # Specialist directory with search, filter, paginate
│       ├── DoctorDetails.jsx      # Dynamic doctor profile (`/doctors/:doctorId`)
│       ├── Appointment.jsx        # Booking form + My Appointments full CRUD
│       ├── Dashboard.jsx          # Patient portal with live vitals & next visit
│       ├── Checkups.jsx           # Medical records history with vitals logger
│       ├── BloodDonate.jsx        # Blood center: stock, donors & requests
│       ├── BloodRequest.jsx       # Requisition route handler
│       ├── Symptoms.jsx           # Interactive symptom triage assistant
│       ├── Emergency.jsx          # Emergency numbers, trauma info & first aid
│       ├── About.jsx              # About LifeCare & syllabus mapping dossier
│       ├── Login.jsx              # Demo login & signup with validation
│       └── NotFound.jsx           # 404 recovery page
```

---

## 🚀 5. Installation & Running Locally

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Builds the optimized production bundle to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🔑 6. Demo Accounts (For Evaluators)

| Patient ID | Patient Name | Password | Blood Group | Next Scheduled Visit |
| :--- | :--- | :--- | :--- | :--- |
| **P101** | Lavishka | `lifecare123` | O+ | Dr. Aarti Sharma |
| **P102** | Rahul Verma | `patient102` | B+ | Dr. Vikram Mehta |
| **P103** | Aisha Khan | `patient103` | A- | Dr. Simran Kaur |

> *Tip:* On the login page (`/login`), click any of the **Quick Demo Login** pills to autofill credentials instantly.

---

## 🔒 7. Architectural Notes & Real-World Boundaries

* **Frontend Demonstration:** LifeCare is a pure frontend Single Page Application (SPA). Authentication and records are persisted locally in browser `localStorage`. In a real-world hospital deployment, authentication would use HTTP-only secure JWT tokens, bcrypt hashed passwords on a backend database, and end-to-end encrypted medical records complying with HIPAA / national healthcare data privacy standards.
* **Triage Tool:** The symptom checker is an interactive educational triage tool for evaluation purposes and provides medical disclaimers directing patients to licensed practitioners.

---

## 🎓 8. Evaluation Readiness Checklist

- [x] React 19 + Vite architecture preserved and verified.
- [x] Zero compilation or bundling errors (`npm run build` exits 0).
- [x] Browser automated tests passed on desktop and mobile viewports.
- [x] Reusable component hierarchy implemented with clean props.
- [x] Custom hooks (`useDebounce`, `useLocalStorage`, `useAuth`, `useAppointments`, `useToast`).
- [x] Dynamic routing (`/doctors/:doctorId`) and Protected Routing (`/dashboard`).
- [x] Context API global state boundaries with local state isolation.
- [x] Controlled forms with client-side JavaScript validation.
- [x] Interactive UI elements: Modals, Tabs, Toasts, Badges, Dropdowns, Skeletons.
- [x] Full CRUD operations demonstrated in Appointment Management.
- [x] REST API asynchronous loading, error, and retry workflows demonstrated.
