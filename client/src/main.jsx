import { createRoot } from "react-dom/client";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

/* AUTH */
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";

/* DASHBOARDS */
import PatientDashboard from "./views/patient/Dashboard";
import DoctorDashboard from "./views/doctor/Dashboard";
import AdminDashboard from "./views/admin/Dashboard";
import ReceptionistDashboard from "./views/receptionist/Dashboard";
import BookAppointment from "./views/BookAppointment.jsx";
import MyAppointment from "./views/MyAppointment.jsx";

/* OTHER */
import Home from "./views/Home.jsx";
import HealthTips from "./views/HealthTips.jsx";
import Bed from "./views/Bed.jsx";


/* ✅ PROTECTED ROUTE */
function ProtectedRoute({ children, allowedRole }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" />;
  }

  /* ✅ Allowed */
  return children;
}

const root = createRoot(document.getElementById("root"));

root.render(

  <BrowserRouter>

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* HEALTH TIPS */}
      <Route
        path="/patient/health-tips"
        element={<HealthTips />}
      />

      {/* AUTH */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/bed"
        element={<Bed />}
      />

      <Route
        path="/BookAppointment"
       element={<BookAppointment />}
      />


      <Route
        path="/MyAppointment"
        element={<MyAppointment />}
      />

      {/* ================= PATIENT ================= */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRole="PATIENT">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= DOCTOR ================= */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRole="DOCTOR">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= RECEPTIONIST ================= */}
      <Route
        path="/receptionist/dashboard"
        element={
          <ProtectedRoute allowedRole="RECEPTIONIST">
            <ReceptionistDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<h1>404 Page Not Found</h1>}
      />

    </Routes>

  </BrowserRouter>

);