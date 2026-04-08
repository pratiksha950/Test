import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import NavbarPatient from "../components/NavbarPatient";
import { setPageTitle } from "../utils";
import Footer from "../components/Footer";
import Appointment from "../assets/appointment.png";
import MyAppointments from "../assets/myappointment.png";
import { Link } from "react-router-dom";
import { Clock3, ShieldCheck, HeartPulse, CalendarDays } from "lucide-react";

function BookAppointment() {
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
    problem: "",
    address: "",
  });

  useEffect(() => {
    setPageTitle("Book Appointment");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAppointment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/BookAppointment`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setForm({
          patientName: "",
          email: "",
          phone: "",
          problem: "",
          address: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Please login to book an appointment.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-200 min-h-screen text-slate-900">
      <NavbarPatient />

      <div className="relative pt-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-2xl shadow-slate-300/20 backdrop-blur-xl transition-all">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">Appointment Booking</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Book Your Medical Appointment Quickly
                </h1>
                <p className="mt-4 text-slate-600 leading-8">
                  Fill out the form below to schedule your visit with our expert medical team and receive fast, compassionate care.
                </p>
              </div>

              <Link
                to="/MyAppointment"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
              >
                <img src={MyAppointments} alt="My Appointments" className="h-5 w-5" />
                My Appointments
              </Link>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/20">
              <div className="flex items-center gap-4 rounded-3xl bg-sky-100/80 p-5">
                <img src={Appointment} alt="Appointment icon" className="h-12 w-12 rounded-2xl bg-white p-2" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Why choose us</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Comfortable care from start to finish</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-100 text-sky-700">
                    <Clock3 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Easy Scheduling</p>
                    <p className="text-sm text-slate-600">Choose your preferred date and time in just a few clicks.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Trusted Doctors</p>
                    <p className="text-sm text-slate-600">Work with our certified medical specialists across key disciplines.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-rose-100 text-rose-700">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Advanced Care</p>
                    <p className="text-sm text-slate-600">Benefit from modern equipment and a compassionate treatment experience.</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-100 text-sky-700">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Quick Confirmations</p>
                    <p className="text-sm text-slate-600">Receive appointment updates and reminders instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/20">
              <div className="mb-8 rounded-3xl bg-slate-100 p-6 text-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-600">Patient Details</p>
                <h2 className="mt-3 text-2xl font-bold">Let us know how we can help.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Complete the form and our team will contact you to confirm your appointment.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Patient Name"
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                />

                <Input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <Input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <Input
                  type="textarea"
                  placeholder="Describe your symptoms or reason for visit"
                  name="problem"
                  value={form.problem}
                  onChange={handleChange}
                />

                <Input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Need help? Our support team is ready to assist.</p>
                </div>
                <Button
                  title="Book Appointment"
                  size="medium"
                  variant="primary"
                  onClick={addAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
      <Footer />
    </div>
  );
}

export default BookAppointment;
