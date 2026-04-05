import BedBooking from "../models/BedBooking.js";

/* ================= BOOK BED ================= */
export const bookBed = async (req, res) => {
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
};


/* ================= GET ALL BOOKINGS (Receptionist/Admin) ================= */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BedBooking.find().sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET PATIENT BOOKINGS ================= */
export const getPatientBookings = async (req, res) => {
  try {
    const bookings = await BedBooking.find({
      patientId: req.user.id
    });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE STATUS ================= */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await BedBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};