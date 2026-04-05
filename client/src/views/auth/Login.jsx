import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setPageTitle, isUserLoggedIn } from "../../utils.jsx";
import Input from "../../components/Input";
import Button from "../../components/Button";
import backicon from "./../../assets/back.png";
import { Link } from "react-router-dom";
import NavbarPatient from "../../components/NavbarPatient.jsx";
import Footer from "../../components/Footer.jsx";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "PATIENT"
  });

  const navigate = useNavigate();

  useEffect(() => {

    setPageTitle("Login");

    if (isUserLoggedIn()) {

      const role = localStorage.getItem("role");

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      }
      else if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      }
      else if (role === "RECEPTIONIST") {
        navigate("/receptionist/dashboard");
      }
      else {
        navigate("/patient/dashboard");
      }

    }

  }, [navigate]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      toast.success("Login Successful");

      if (res.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
      else if (res.data.role === "DOCTOR") {
        navigate("/doctor/dashboard");
      }
      else if (res.data.role === "RECEPTIONIST") {
        navigate("/receptionist/dashboard");
      }
      else {
        navigate("/patient/dashboard");
      }

    }
    catch (error) {

      toast.error(
        error.response?.data?.error || "Login Failed"
      );

    }

  };

  return (

    <div className="bg-gradient-to-r from-slate-100 to-teal-50 min-h-screen">

      <NavbarPatient />

      <div className="min-h-[640px] flex items-center justify-center">

        <Link to="/">
          <img
            src={backicon}
            alt="Back"
            className="fixed top-6 left-6 h-8 cursor-pointer hover:scale-110 transition duration-200"
          />
        </Link>

        <div className="w-[400px] mx-auto p-6 shadow-xl rounded-xl bg-white border border-green-300 flex flex-col items-center justify-center">

          <h2 className="text-3xl font-semibold text-green-700 mb-7">
            Login
          </h2>

          <Input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* ✅ ROLE DROPDOWN */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md mt-3"
          >
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
            <option value="RECEPTIONIST">Receptionist</option>
            <option value="ADMIN">Admin</option>
          </select>

          <Button
            title="Login"
            size="medium"
            variant="primary"
            onClick={handleSubmit}
          />

           <span
              onClick={() => navigate("/signup")}
              className="text-green-700 font-medium cursor-pointer hover:underline"
            >
              Don't have an account? Sign Up
            </span>

        </div>

      </div>

      <Footer />
      <Toaster />

    </div>

  );

}

export default Login;