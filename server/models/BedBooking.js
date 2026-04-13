import mongoose from "mongoose";

const bedBookingSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bedName: {
    type: String,
    required: true
  },
  price: Number,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("BedBooking", bedBookingSchema);