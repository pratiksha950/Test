import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavbarPatient from "../components/NavbarPatient.jsx";
import Footer from "../components/Footer.jsx";
import Calendar from "../components/Calendar.jsx";

function Bed() {
  const navigate = useNavigate();

  const [selectedBed, setSelectedBed] = useState(null);
  const [showCalendar, setShowCalendar] = useState(null);
  const [dates, setDates] = useState({});
  const [message, setMessage] = useState("");

  const beds = [
    {
      id: 1,
      name: "Deluxe Room",
      desc: "AC • Attached Bathroom",
      price: 3500,
      img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
    },
    {
      id: 2,
      name: "Semi-Private Room",
      desc: "2 Beds • AC",
      price: 2000,
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118"
    },
    {
      id: 3,
      name: "General Ward",
      desc: "Shared • Non-AC",
      price: 800,
      img: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc"
    }
  ];

  // ================= DATE SELECT =================
  const handleRange = (bedId, start, end) => {
    setDates({
      ...dates,
      [bedId]: { start, end }
    });
    setShowCalendar(null);
  };

  // ================= BOOK BED =================
  const handleBooking = async (bed) => {
    setSelectedBed(null); // ✅ reset at start

    const token = localStorage.getItem("token");

    // ✅ LOGIN CHECK
    if (!token) {
      setMessage("⚠️ Please login first!");
      setTimeout(() => setMessage(""), 3000);
      navigate("/login");
      return; // ❗ stop execution
    }

    // ✅ DATE CHECK
    if (!dates[bed.id]) {
      setMessage("⚠️ Please select dates first!");
      setTimeout(() => setMessage(""), 3000);
      return; // ❗ stop execution
    }

    try {
      const payload = {
        bedName: bed.name,
        price: bed.price,
        startDate: new Date(dates[bed.id].start).toISOString(),
        endDate: new Date(dates[bed.id].end).toISOString()
      };

      const res = await axios.post(
        "http://localhost:8080/api/bed/book",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ ONLY AFTER SUCCESS
      setMessage("✅ Booking Successful!");
      setSelectedBed(bed.name);

      setTimeout(() => setMessage(""), 3000);

    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      setMessage("❌ Booking failed!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarPatient />

      {/* TOP MESSAGE */}
      {message && (
        <div className={`mx-6 mt-4 p-4 rounded-lg text-white shadow 
          ${message.includes("❌") ? "bg-red-500" : 
            message.includes("⚠️") ? "bg-yellow-500" : 
            "bg-green-600"}`}>
          {message}
        </div>
      )}

      {/* HEADER */}
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-green-200">
          <h1 className="text-3xl font-bold text-green-700">
            🛏️ Book a Hospital Bed
          </h1>
          <p className="text-gray-500 mt-1">
            Select check-in and check-out dates
          </p>
        </div>
      </div>

      {/* BED CARDS */}
      <div className="px-6 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beds.map((bed) => (
          <div
            key={bed.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={bed.img}
              alt={bed.name}
              className="h-48 w-full object-cover rounded-t-2xl"
            />

            <div className="p-4">
              <h3 className="text-xl font-bold">{bed.name}</h3>
              <p className="text-gray-500 text-sm">{bed.desc}</p>
              <p className="text-green-600 font-semibold mt-2 text-lg">
                ₹{bed.price} / night
              </p>

              {/* DATE SELECT */}
              <div className="mt-4 relative">
                <button
                  onClick={() => setShowCalendar(bed.id)}
                  className="w-full border p-2 rounded-lg text-left"
                >
                  {dates[bed.id]
                    ? `${new Date(dates[bed.id].start).toDateString()} → ${new Date(dates[bed.id].end).toDateString()}`
                    : "Select Dates"}
                </button>

                {/* CALENDAR */}
                {showCalendar === bed.id && (
                  <div className="absolute z-50 mt-2 left-0">
                    <Calendar
                      onSelectRange={(start, end) =>
                        handleRange(bed.id, start, end)
                      }
                    />
                  </div>
                )}
              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={() => handleBooking(bed)}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED BED POPUP */}
      {selectedBed && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg">
          Selected: {selectedBed}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Bed;