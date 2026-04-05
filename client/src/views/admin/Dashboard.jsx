import { Link } from "react-router-dom";

function AdminDashboard() {

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <Link to="/admin/add-doctor">
          <div className="p-6 bg-white shadow rounded-xl">
            Add Doctor
          </div>
        </Link>

        <Link to="/admin/add-receptionist">
          <div className="p-6 bg-white shadow rounded-xl">
            Add Receptionist
          </div>
        </Link>

        <Link to="/admin/add-beds">
          <div className="p-6 bg-white shadow rounded-xl">
            Manage Beds
          </div>
        </Link>

        <Link to="/admin/patients">
          <div className="p-6 bg-white shadow rounded-xl">
            All Patients
          </div>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;