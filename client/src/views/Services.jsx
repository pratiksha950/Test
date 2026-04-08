import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Stethoscope,
  Activity,
  HeartPulse,
  Brain,
  Users,
  Bandage,
  Aperture,
  FlaskConical,
  Pill,
  Clock3,
  Award,
  Cpu,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";
import NavbarPatient from "../components/NavbarPatient";
import Footer from "../components/Footer";

const services = [
  {
    id: 1,
    title: "General Consultation",
    description: "Expert doctors available for routine checkups, advice, and preventive care.",
    Icon: Stethoscope,
    accent: "bg-sky-100 text-sky-700",
  },
  {
    id: 2,
    title: "Emergency Care",
    description: "Fast, compassionate emergency response with specialist support around the clock.",
    Icon: AlertTriangle,
    accent: "bg-red-100 text-red-700",
  },
  {
    id: 3,
    title: "Cardiology",
    description: "Advanced heart care backed by experienced cardiologists and diagnostics.",
    Icon: HeartPulse,
    accent: "bg-rose-100 text-rose-700",
  },
  {
    id: 4,
    title: "Neurology",
    description: "Comprehensive brain and nervous system care using modern treatment methods.",
    Icon: Brain,
    accent: "bg-violet-100 text-violet-700",
  },
  {
    id: 5,
    title: "Pediatrics",
    description: "Gentle, family-friendly healthcare services designed for children of all ages.",
    Icon: Users,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 6,
    title: "Orthopedics",
    description: "Bone, joint, and muscle care with rehabilitation support and surgery planning.",
    Icon: Bandage,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    id: 7,
    title: "Radiology",
    description: "High-definition imaging services for accurate diagnosis and treatment planning.",
    Icon: Aperture,
    accent: "bg-slate-100 text-slate-700",
  },
  {
    id: 8,
    title: "Laboratory Services",
    description: "Rapid lab testing and trustworthy results for a wide range of medical needs.",
    Icon: FlaskConical,
    accent: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 9,
    title: "Pharmacy Services",
    description: "Convenient medication support and expert guidance for every treatment plan.",
    Icon: Pill,
    accent: "bg-indigo-100 text-indigo-700",
  },
];

const features = [
  {
    id: 1,
    title: "24/7 Emergency Support",
    description: "Immediate access to medical help whenever you need it.",
    Icon: Clock3,
    accent: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Experienced Doctors",
    description: "Care from certified specialists with years of clinical expertise.",
    Icon: Award,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    title: "Modern Equipment",
    description: "State-of-the-art technology for faster diagnosis and treatment.",
    Icon: Cpu,
    accent: "bg-slate-100 text-slate-700",
  },
  {
    id: 4,
    title: "Online Appointment Booking",
    description: "Schedule visits quickly using our simple online booking system.",
    Icon: CalendarDays,
    accent: "bg-sky-100 text-sky-700",
  },
];

const ServiceCard = ({ Icon, title, description, accent }) => (
  <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className={`inline-flex items-center justify-center rounded-3xl p-4 ${accent} mb-6`}>
      <Icon className="h-7 w-7" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-7 mb-6">{description}</p>
    <Link
      to="/BookAppointment"
      className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
    >
      Learn More
      <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

function Services() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <NavbarPatient />

      <main className="min-h-screen">
        <section className="relative overflow-hidden bg-slate-900 text-white">
          <img
            src="https://images.unsplash.com/photo-1580281657521-0be2e5aafb7f?auto=format&fit=crop&w=1600&q=80"
            alt="Hospital care background"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>

          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8">
            <div className="max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-sky-100/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                Trusted Patient Care
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Our Medical Services
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200">
                Providing high-quality healthcare services for patients with advanced technology and expert doctors.
              </p>
              <div className="mt-10 flex justify-center gap-4 flex-wrap">
                <Link
                  to="/BookAppointment"
                  className="rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-600"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/patient/health-tips"
                  className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  View Health Tips
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Services</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Complete care for every medical need
            </h2>
            <p className="mt-4 text-slate-600 leading-7">
              Explore our service offerings, from primary consultations to specialized diagnostics and pharmacy support.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                  Why choose us
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Hospital advantages you can trust
                </h2>
                <p className="mt-4 max-w-xl text-slate-300 leading-7">
                  We combine compassionate care with modern tools and fast service to make every visit smooth and reassuring.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="rounded-[1.75rem] border border-slate-700/80 bg-white/5 p-6 shadow-lg shadow-slate-900/10"
                  >
                    <div className={`inline-flex items-center justify-center rounded-3xl p-4 ${feature.accent} mb-4`}>
                      <feature.Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-slate-300 leading-7">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] bg-sky-500/10 border border-sky-200/40 p-10 shadow-xl shadow-sky-500/10 sm:p-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Need medical help?</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Book Your Appointment Today!
                </h2>
                <p className="mt-4 max-w-xl text-slate-600 leading-7">
                  Get fast access to doctors and support with a streamlined appointment booking experience.
                </p>
              </div>
              <div className="flex items-center justify-start lg:justify-end">
                <Link
                  to="/BookAppointment"
                  className="inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Services;
