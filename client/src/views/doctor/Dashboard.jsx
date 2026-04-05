import { Link } from "react-router-dom";
import { Users, Calendar, Clock, ClipboardList } from "lucide-react";
import NavbarPatient from "../../components/NavbarPatient.jsx";
import Footer from "../../components/Footer.jsx";


function DoctorDashboard() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-green-50 p-6">
      <NavbarPatient />

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        👨‍⚕️ Doctor Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Total Patients</h2>
          <p className="text-2xl font-bold text-green-700">120</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Today's Appointments</h2>
          <p className="text-2xl font-bold text-green-700">18</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Pending Requests</h2>
          <p className="text-2xl font-bold text-green-700">5</p>
        </div>

      </div>

      {/* MAIN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Patients */}
        <Link to="/doctor/patients">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <Users className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">My Patients</h2>
              <p className="text-gray-500 text-sm">View patient records</p>
            </div>
          </div>
        </Link>

        {/* Queue */}
        <Link to="/doctor/queue">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <Clock className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">OPD Queue</h2>
              <p className="text-gray-500 text-sm">Manage waiting list</p>
            </div>
          </div>
        </Link>

        {/* Schedule */}
        <Link to="/doctor/schedule">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <Calendar className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Schedule</h2>
              <p className="text-gray-500 text-sm">Check availability</p>
            </div>
          </div>
        </Link>

        {/* Appointments */}
        <Link to="/doctor/appointments">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <ClipboardList className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Appointments</h2>
              <p className="text-gray-500 text-sm">Manage bookings</p>
            </div>
          </div>
        </Link>

      </div>
    <Footer />
    </div>
  );
}

export default DoctorDashboard;