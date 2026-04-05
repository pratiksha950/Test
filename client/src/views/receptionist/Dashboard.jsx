import { Link } from "react-router-dom";

function ReceptionistDashboard() {

  return (
    <div className="p-6 bg-slate-100 min-h-screen">

      <h1 className="text-3xl font-bold text-green-700">
        Receptionist Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-6">

        <Link to="/receptionist/register">
          <div className="p-6 bg-white shadow rounded-xl">
            Register Patient
          </div>
        </Link>

        <Link to="/receptionist/admit">
          <div className="p-6 bg-white shadow rounded-xl">
            Admit Patient
          </div>
        </Link>

        <Link to="/receptionist/discharge">
          <div className="p-6 bg-white shadow rounded-xl">
            Discharge Patient
          </div>
        </Link>

      </div>

    </div>
  );
}

export default ReceptionistDashboard;