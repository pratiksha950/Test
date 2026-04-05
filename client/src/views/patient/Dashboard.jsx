import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarPatient from "../../components/NavbarPatient.jsx";
import Footer from "../../components/Footer.jsx";

function PatientDashboard() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {

    const storedName = localStorage.getItem("name");

    if (storedName) {
      setName(storedName);
    }

  }, []);

  /* Logout */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="bg-gradient-to-r from-slate-100 to-teal-50 min-h-screen">

      <NavbarPatient />

      {/* MAIN */}

      <div className="max-w-6xl mx-auto p-6">

        {/* Welcome Card */}

        <div className="bg-white shadow-lg rounded-xl p-6 border border-green-300">

          <h1 className="text-3xl font-bold text-green-700">
            Welcome, {name || "Patient"} 👋
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your appointments and services easily.
          </p>

        </div>

        {/* ACTION CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          {/* Book Appointment */}

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">

            <h2 className="text-xl font-semibold text-green-700">
              Book Appointment
            </h2>

            <p className="text-gray-600 mt-2">
              Schedule an appointment with doctors.
            </p>

            <button
              onClick={() => navigate("/book-appointment")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Book Now
            </button>

          </div>

          {/* My Appointments */}

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">

            <h2 className="text-xl font-semibold text-green-700">
              My Appointments
            </h2>

            <p className="text-gray-600 mt-2">
              View your appointment history.
            </p>

            <button
              onClick={() => navigate("/my-appointments")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              View Appointments
            </button>

          </div>

          {/* Services */}

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">

            <h2 className="text-xl font-semibold text-green-700">
              Services
            </h2>

            <p className="text-gray-600 mt-2">
              Explore available hospital services.
            </p>

            <button
              onClick={() => navigate("/services")}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              View Services
            </button>

          </div>

        </div>

        {/* PROFILE + LOGOUT */}

        <div className="mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200">

          <h2 className="text-2xl font-semibold text-green-700">
            Profile
          </h2>

          <div className="mt-4 space-y-2">

            <p>
              <span className="font-semibold">Name:</span> {name}
            </p>

            <p>
              <span className="font-semibold">Role:</span> Patient
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default PatientDashboard;