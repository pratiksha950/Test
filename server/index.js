import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db.js";
import User from "./models/User.js";
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
    // ✅ FIX: only email check (NO name)
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

    console.log("Doctor created successfully ✅");
  } catch (error) {
    console.error("Doctor creation error:", error.message);
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

    console.log("Admin created successfully ✅");
  } catch (error) {
    console.error("Admin creation error:", error.message);
  }
};

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/* AUTH */
app.post("/api/auth/register", registerPatient);
app.post("/api/auth/login", loginUser);

/* IMAGEKIT AUTH */
app.get("/auth", (req, res) => {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();

  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY
  });
});

/* APPOINTMENTS */
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

/* SERVICES */
app.post(
  "/api/services",
  authenticateJWT,
  authorizeRole("DOCTOR"),
  postSerivice
);

app.get("/api/services", getService);

/* CONTACT */
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

  // ✅ Ensure these run after DB connect
  await createDoctor();
  await createAdmin();
});