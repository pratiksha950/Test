import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus, BedDouble, LogOut, Users } from "lucide-react";

import NavbarPatient from "../../components/NavbarPatient.jsx";
import Footer from "../../components/Footer.jsx";

function ReceptionistDashboard() {

  const [bookings, setBookings] = useState([]);

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/bed/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookings(res.data);

    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  /* ================= AUTO REFRESH ================= */

  useEffect(() => {
    fetchBookings();

    const interval = setInterval(fetchBookings, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status) => {
    if (status === "Pending") return "text-yellow-600 bg-yellow-100";
    if (status === "Accepted") return "text-green-600 bg-green-100";
    if (status === "Rejected") return "text-red-600 bg-red-100";
    return "text-gray-500 bg-gray-100";
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:8080/api/bed/${id}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchBookings(); // refresh

    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-green-50 p-6">

      <NavbarPatient />

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🏥 Receptionist Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Total Patients</h2>
          <p className="text-2xl font-bold text-green-700">245</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Admitted Today</h2>
          <p className="text-2xl font-bold text-green-700">12</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Available Beds</h2>
          <p className="text-2xl font-bold text-green-700">30</p>
        </div>

      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link to="/receptionist/register">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex items-center gap-4">
            <UserPlus className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Register Patient</h2>
              <p className="text-gray-500 text-sm">Add new patient</p>
            </div>
          </div>
        </Link>

        <Link to="/receptionist/admit">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex items-center gap-4">
            <BedDouble className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Admit Patient</h2>
              <p className="text-gray-500 text-sm">Assign bed</p>
            </div>
          </div>
        </Link>

        <Link to="/receptionist/discharge">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex items-center gap-4">
            <LogOut className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Discharge</h2>
              <p className="text-gray-500 text-sm">Release patient</p>
            </div>
          </div>
        </Link>

        <Link to="/receptionist/patients">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex items-center gap-4">
            <Users className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">All Patients</h2>
              <p className="text-gray-500 text-sm">View records</p>
            </div>
          </div>
        </Link>

      </div>

      {/* ================= BED BOOKINGS CARDS ================= */}

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          🛏️ Bed Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold text-green-700">
                  {b.patientName}
                </h3>

                <p className="text-gray-600 mt-2">
                  🛏️ {b.bedName}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  📅 {b.startDate?.slice(0, 10)} → {b.endDate?.slice(0, 10)}
                </p>

                <p className={`mt-3 font-semibold ${getStatusColor(b.status)}`}>
                  Status: {b.status}
                </p>

              </div>
            ))}

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ReceptionistDashboard;