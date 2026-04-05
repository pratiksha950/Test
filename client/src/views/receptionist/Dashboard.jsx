import { Link } from "react-router-dom";
import { UserPlus, BedDouble, LogOut, Users, ClipboardList } from "lucide-react";
import NavbarPatient from "../../components/NavbarPatient.jsx";
import Footer from "../../components/Footer.jsx";


function ReceptionistDashboard() {

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

      {/* MAIN ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Register */}
        <Link to="/receptionist/register">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <UserPlus className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Register Patient</h2>
              <p className="text-gray-500 text-sm">Add new patient</p>
            </div>
          </div>
        </Link>

        {/* Admit */}
        <Link to="/receptionist/admit">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <BedDouble className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Admit Patient</h2>
              <p className="text-gray-500 text-sm">Assign bed & ward</p>
            </div>
          </div>
        </Link>

        {/* Discharge */}
        <Link to="/receptionist/discharge">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <LogOut className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">Discharge</h2>
              <p className="text-gray-500 text-sm">Release patient</p>
            </div>
          </div>
        </Link>

        {/* Patients List */}
        <Link to="/receptionist/patients">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex items-center gap-4">
            <Users className="text-green-600" size={32} />
            <div>
              <h2 className="text-lg font-semibold">All Patients</h2>
              <p className="text-gray-500 text-sm">View records</p>
            </div>
          </div>
        </Link>

      </div>

      {/* EXTRA SECTION */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          📋 Today's Activity
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li>✔ 5 patients registered</li>
          <li>✔ 3 patients admitted</li>
          <li>✔ 2 patients discharged</li>
        </ul>
      </div>
    <Footer />
    </div>
  );
}

export default ReceptionistDashboard;