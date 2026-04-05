import { useState } from "react";
import NavbarPatient from "../components/NavbarPatient.jsx";
import Footer from "../components/Footer.jsx";


function HealthTips() {

  const [category, setCategory] = useState("ALL");

  const tips = [
    {
      title: "Stay Hydrated",
      desc: "Drink at least 8 glasses of water daily to keep your body hydrated.",
      category: "GENERAL"
    },
    {
      title: "Exercise Daily",
      desc: "Do at least 30 minutes of physical activity every day.",
      category: "FITNESS"
    },
    {
      title: "Eat Healthy",
      desc: "Include fruits, vegetables, and proteins in your diet.",
      category: "DIET"
    },
    {
      title: "Proper Sleep",
      desc: "Get 7-8 hours of quality sleep every night.",
      category: "GENERAL"
    },
    {
      title: "Avoid Junk Food",
      desc: "Reduce intake of oily and processed food.",
      category: "DIET"
    },
    {
      title: "Mental Health",
      desc: "Practice meditation and reduce stress regularly.",
      category: "MENTAL"
    }
  ];

  const filteredTips =
    category === "ALL"
      ? tips
      : tips.filter((tip) => tip.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-slate-100 p-6">
        <NavbarPatient />
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🩺 Health Tips
      </h1>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">

        {["ALL", "GENERAL", "DIET", "FITNESS", "MENTAL"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              category === cat
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600"
            } hover:bg-green-500 hover:text-white transition`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* TIPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {tip.title}
            </h2>

            <p className="text-gray-600 text-sm mb-3">
              {tip.desc}
            </p>

            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {tip.category}
            </span>
          </div>
        ))}

      </div>
        <Footer />
    </div>
  );
}

export default HealthTips;