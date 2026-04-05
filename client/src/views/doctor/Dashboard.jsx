import { Link } from "react-router-dom";

function DoctorDashboard() {

  return (
    <div className="p-6 min-h-screen bg-slate-100">

      <h1 className="text-3xl font-bold text-green-700">
        Doctor Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-6">

        <Link to="/doctor/patients">
          <div className="p-6 bg-white shadow rounded-xl">
            My Patients
          </div>
        </Link>

        <Link to="/doctor/queue">
          <div className="p-6 bg-white shadow rounded-xl">
            OPD Queue
          </div>
        </Link>

        <Link to="/doctor/schedule">
          <div className="p-6 bg-white shadow rounded-xl">
            Schedule
          </div>
        </Link>

      </div>

    </div>
  );
}

export default DoctorDashboard; 