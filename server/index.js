import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import User from "./models/User.js";
import BedBooking from "./models/BedBooking.js"; // ✅ IMPORTANT

import ImageKit from "@imagekit/nodejs";
import bcrypt from "bcryptjs";

import { registerPatient, loginUser } from "./controllers/authController.js";

import {
  postAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  approveAppointment,
  rejectAppointment
} from "./controllers/appointment.js";

import { authenticateJWT, authorizeRole } from "./middlewares/auth.js";
import { postSerivice, getService } from "./controllers/services.js";
import { postContact, getContact } from "./controllers/contact.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

/* ================= IMAGEKIT ================= */

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

/* ================= CREATE DOCTOR ================= */

const createDoctor = async () => {
  try {
    const existingDoctor = await User.findOne({
      email: process.env.DOCTOR_EMAIL
    });

    if (existingDoctor) {
      console.log("Doctor already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.DOCTOR_PASSWORD,
      10
    );

    await User.create({
      email: process.env.DOCTOR_EMAIL,
      name: process.env.DOCTOR_NAME || "Doctor",
      password: hashedPassword,
      role: "DOCTOR"
    });

    console.log("Doctor created ✅");
  } catch (error) {
    console.error("Doctor error:", error.message);
  }
};

/* ================= CREATE ADMIN ================= */

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN"
    });

    console.log("Admin created ✅");
  } catch (error) {
    console.error("Admin error:", error.message);
  }
};

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.json({ message: "Server Running 🚀" });
});

/* ================= AUTH ================= */

app.post("/api/auth/register", registerPatient);
app.post("/api/auth/login", loginUser);

/* ================= BED BOOKING ================= */

/* 🧑‍🦱 Patient - Book Bed */
app.post(
  "/api/bed/book",
  authenticateJWT,
  authorizeRole("PATIENT"),
  async (req, res) => {
    try {
      const { bedName, price, startDate, endDate } = req.body;

      const booking = await BedBooking.create({
        patientName: req.user.name,
        patientId: req.user.id,
        bedName,
        price,
        startDate,
        endDate
      });

      res.status(201).json({
        message: "Bed booked successfully",
        booking
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* 🧑‍💻 Receptionist/Admin - Get All Bookings */
app.get(
  "/api/bed/all",
  authenticateJWT,
  authorizeRole("RECEPTIONIST", "ADMIN"),
  async (req, res) => {
    try {
      const bookings = await BedBooking.find().sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* 🧑‍🦱 Patient - My Bookings */
app.get(
  "/api/bed/my",
  authenticateJWT,
  authorizeRole("PATIENT"),
  async (req, res) => {
    try {
      const bookings = await BedBooking.find({
        patientId: req.user.id
      });

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* 🔄 Update Booking Status */
app.put(
  "/api/bed/status/:id",
  authenticateJWT,
  authorizeRole("RECEPTIONIST", "ADMIN"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const booking = await BedBooking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      res.json({
        message: "Status updated",
        booking
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/* ================= APPOINTMENTS ================= */

app.post(
  "/api/appointment/book",
  authenticateJWT,
  authorizeRole("PATIENT"),
  postAppointment
);

app.get(
  "/api/appointment/doctor/:doctorId",
  authenticateJWT,
  authorizeRole("DOCTOR"),
  getDoctorAppointments
);

app.put(
  "/api/appointment/approve/:id",
  authenticateJWT,
  authorizeRole("DOCTOR"),
  approveAppointment
);

app.put(
  "/api/appointment/reject/:id",
  authenticateJWT,
  authorizeRole("DOCTOR"),
  rejectAppointment
);

app.get(
  "/api/appointment/patient/:patientId",
  authenticateJWT,
  authorizeRole("PATIENT"),
  getPatientAppointments
);

/* ================= SERVICES ================= */

app.post(
  "/api/services",
  authenticateJWT,
  authorizeRole("DOCTOR"),
  postSerivice
);

app.get("/api/services", getService);

/* ================= CONTACT ================= */

app.post(
  "/api/contact",
  authenticateJWT,
  authorizeRole("PATIENT"),
  postContact
);

app.get("/api/contact", getContact);

/* ================= SERVER START ================= */

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} 🚀`);

  await connectDB();
  await createDoctor();
  await createAdmin();
});