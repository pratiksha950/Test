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

      {/* Navbar */}
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
        <div className="grid md:grid-cols-4 gap-6 mt-8">

          {/* Book Appointment */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-green-700">
              Book Appointment
            </h2>

            <p className="text-gray-600 mt-2">
              Schedule an appointment with doctors.
            </p>

            <button
              onClick={() => navigate("/BookAppointment")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Book Now
            </button>
          </div>

          {/* My Appointments */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-green-700">
              My Appointments
            </h2>

            <p className="text-gray-600 mt-2">
              View your appointment history.
            </p>

            <button
              onClick={() => navigate("/MyAppointment")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              View Appointments
            </button>
          </div>

          {/* Services */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition">
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

          {/* ✅ Book a Bed */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-green-700">
              🛏️ Book a Bed
            </h2>

            <p className="text-gray-600 mt-2">
              Reserve a hospital bed easily.
            </p>

            <div className="mt-4 space-y-2">

              <button
                onClick={() =>
                  navigate("/bed", {
                    state: { room: "Deluxe Room", price: 3500 },
                  })
                }
                className="w-full bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600"
              >
                Deluxe Room (₹3500)
              </button>

              <button
                onClick={() =>
                  navigate("/bed", {
                    state: { room: "Semi-Private Room", price: 2000 },
                  })
                }
                className="w-full bg-orange-400 text-white px-3 py-2 rounded-md hover:bg-orange-500"
              >
                Semi-Private (₹2000)
              </button>

              <button
                onClick={() =>
                  navigate("/bed", {
                    state: { room: "General Ward", price: 800 },
                  })
                }
                className="w-full bg-orange-300 text-white px-3 py-2 rounded-md hover:bg-orange-400"
              >
                General Ward (₹800)
              </button>

            </div>
          </div>

        </div>

        {/* PROFILE */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PatientDashboard;