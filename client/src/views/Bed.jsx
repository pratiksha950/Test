import React, { useState } from "react";
import NavbarPatient from "../components/NavbarPatient.jsx";
import Footer from "../components/Footer.jsx";
import Calendar from "../components/Calendar.jsx";

function Bed() {

  const [selectedBed, setSelectedBed] = useState(null);
  const [showCalendar, setShowCalendar] = useState(null);
  const [dates, setDates] = useState({});

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

  const handleRange = (bedId, start, end) => {
    setDates({
      ...dates,
      [bedId]: { start, end }
    });
    setShowCalendar(null);
  };

  const handleBooking = (bed) => {

  if (!dates[bed.id]) {
    alert("Please select dates first!");
    return;
  }

  const bookingData = {
    patientName: localStorage.getItem("name") || "Patient",
    bedName: bed.name,
    price: bed.price,
    startDate: dates[bed.id].start,
    endDate: dates[bed.id].end,
    status: "Booked"
  };

  // ✅ Get old bookings
  let allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];

  // ✅ Add new booking
  allBookings.push(bookingData);

  // ✅ Save again
  localStorage.setItem("allBookings", JSON.stringify(allBookings));

  alert("Bed Booked Successfully ✅");

  setSelectedBed(bed.name);
};

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarPatient />

      {/* Header */}
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

      {/* Cards */}
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

              {/* Date Range Button */}
              <div className="mt-4 relative">

                <button
                  onClick={() => setShowCalendar(bed.id)}
                  className="w-full border p-2 rounded-lg text-left"
                >
                  {dates[bed.id]
                    ? `${dates[bed.id].start.toDateString()} → ${dates[bed.id].end.toDateString()}`
                    : "Select Dates"}
                </button>

                {/* Calendar */}
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

              {/* Button */}
              <button
                onClick={() => setSelectedBed(bed.name)}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Book Now
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* Selected */}
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