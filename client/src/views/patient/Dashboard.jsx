import { Link } from "react-router-dom";

function PatientDashboard() {

  return (
    <div className="p-6 bg-slate-100 min-h-screen">

      <h1 className="text-3xl font-bold text-green-700">
        Patient Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-6">

        <Link to="/patient/appointments">
          <div className="p-6 bg-white shadow rounded-xl">
            My Appointments
          </div>
        </Link>

        <Link to="/patient/reports">
          <div className="p-6 bg-white shadow rounded-xl">
            Reports
          </div>
        </Link>

      </div>

    </div>
  );
}

export default PatientDashboard;