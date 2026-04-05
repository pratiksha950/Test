import React, { useState } from "react";

const Calendar = ({ onSelectRange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= totalDays; i++) arr.push(i);

    return arr;
  };

  const changeMonth = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(
      dir === "prev"
        ? currentDate.getMonth() - 1
        : currentDate.getMonth() + 1
    );
    setCurrentDate(newDate);
  };

  const handleClick = (day) => {
    if (!day) return;

    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
    } else if (selected >= startDate) {
      setEndDate(selected);
      onSelectRange(startDate, selected);
    } else {
      setStartDate(selected);
      setEndDate(null);
    }
  };

  const isBetween = (day) => {
    if (!startDate || !endDate || !day) return false;

    const d = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    return d > startDate && d < endDate;
  };

  const isSelected = (day) => {
    if (!day) return false;

    const d = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    return (
      (startDate && d.getTime() === startDate.getTime()) ||
      (endDate && d.getTime() === endDate.getTime())
    );
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl p-4 border">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => changeMonth("prev")}>◀</button>

        <h2 className="font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button onClick={() => changeMonth("next")}>▶</button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
        {days.map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {getDays().map((day, i) => (
          <div
            key={i}
            onClick={() => handleClick(day)}
            className={`
              h-9 flex items-center justify-center rounded cursor-pointer
              ${day ? "hover:bg-green-100" : ""}
              ${isSelected(day) ? "bg-blue-600 text-white" : ""}
              ${isBetween(day) ? "bg-blue-200" : ""}
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;