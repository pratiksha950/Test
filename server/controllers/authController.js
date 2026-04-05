import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ================= REGISTER ================= */

export const registerPatient = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    /* Validate Fields */
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    /* Check Existing User */
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    /* Hash Password */
    const hashed = await bcrypt.hash(password, 10);

    /* Create User */
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "PATIENT"
    });

    res.status(201).json({
      message: "Registration successful"
    });

  }

  catch (error) {

    console.log("Register Error:", error);

    res.status(500).json({
      error: error.message
    });

  }

};


/* ================= LOGIN ================= */

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      userId: user._id,
      name: user.name
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};