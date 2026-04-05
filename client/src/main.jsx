import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* AUTH */
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";

/* DASHBOARDS */
import PatientDashboard from "./views/patient/Dashboard";
import DoctorDashboard from "./views/doctor/Dashboard";
import AdminDashboard from "./views/admin/Dashboard";
import ReceptionistDashboard from "./views/receptionist/Dashboard";
import Home from "./views/Home.jsx";

const root = createRoot(document.getElementById("root"));

root.render(

  <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />} />

      {/* AUTH */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* PATIENT */}
      <Route
        path="/"
        element={<PatientDashboard />}
      />

      {/* DOCTOR */}
      {/* <Route
        path="/doctor/dashboard"
        element={<DoctorDashboard />}
      /> */}

      {/* ADMIN */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      {/* RECEPTIONIST */}
      <Route
        path="/receptionist/dashboard"
        element={<ReceptionistDashboard />}
      />

    </Routes>

  </BrowserRouter>

);