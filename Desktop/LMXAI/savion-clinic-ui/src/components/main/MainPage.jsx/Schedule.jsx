"use client";
import React, { useState } from "react";
import {
  addDays,
  startOfWeek,
  format,
  isSameDay,
  setHours,
  setMinutes,
} from "date-fns";

// Dinamik mock data üretici
const generateMockAppointments = () => {
  const today = new Date();
  const data = {};

  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    const key = format(date, "yyyy-MM-dd");

    const count = Math.floor(Math.random() * 4); // 0-3 randevu
    const appointments = Array.from({ length: count }).map((_, idx) => {
      const hour = 9 + Math.floor(Math.random() * 5); // 09:00 - 14:00
      const minute = Math.random() > 0.5 ? 30 : 0;

      return {
        id: `${key}-${idx}`,
        time: format(setMinutes(setHours(date, hour), minute), "HH:mm"),
        title: `Meeting ${idx + 1}`,
      };
    });

    data[key] = appointments;
  }

  return data;
};

const ScheduleDay = ({
  day,
  date,
  isToday,
  isSelected,
  appointments = 0,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center p-1 px-2 rounded-xl transition-all cursor-pointer 
      ${isSelected
        ? "bg-color2 text-white" // seçilen gün
        : isToday
          ? "bg-color3 text-white" // bugün
          : "hover:bg-gray-50"
      }`}
  >
    <span className="text-xs font-medium mb-1">{day}</span>
    <span
      className={`text-lg font-bold ${isToday || isSelected ? "text-white" : "text-gray-900"
        }`}
    >
      {format(date, "d")}
    </span>
    {appointments > 0 && (
      <div
        className={`w-2 h-2 rounded-full mt-2 ${isToday || isSelected ? "bg-white" : "bg-color2"
          }`}
      />
    )}
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white/20backdrop-blur-md shadow-md rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm text-gray-500 cursor-pointer">Weekly ▾</span>
    </div>
    {children}
  </div>
);

export default function Schedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const mockAppointments = generateMockAppointments();

  // O haftanın günlerini oluştur
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(currentWeekStart, i);
    const key = format(date, "yyyy-MM-dd");
    return {
      day: format(date, "EEE").toUpperCase(),
      date,
      isToday: isSameDay(date, today),
      isSelected: isSameDay(date, selectedDate),
      appointments: mockAppointments[key]?.length || 0,
    };
  });

  // Seçili günün randevuları
  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const dayAppointments = mockAppointments[selectedKey] || [];

  return (
    <div className="h-full ">
      {/* Hafta değiştirme */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-sm"
        >
          ← 
        </button>
        <span className="font-medium">
          {format(currentWeekStart, "MMM d")} -{" "}
          {format(addDays(currentWeekStart, 6), "MMM d")}
        </span>
        <button
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-sm"
        >
           →
        </button>
      </div>

      {/* Günler */}
      <div className="flex space-x-3 justify-between">
        {weekDays.map((item, index) => (
          <ScheduleDay
            key={index}
            day={item.day}
            date={item.date}
            isToday={item.isToday}
            isSelected={item.isSelected}
            appointments={item.appointments}
            onClick={() => setSelectedDate(item.date)}
          />
        ))}
      </div>

      {/* Saat çizelgesi + appointmentlar */}
      <div className="mt-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>10:00</span>
          <span>11:00</span>
          <span>12:00</span>
        </div>

        {/* sabit yükseklik + içeride scroll */}
        <div className="mt-2 relative h-20">
          <div className="h-full backdrop-blur-md rounded-lg relative p-3 overflow-y-auto">
            {dayAppointments.length === 0 ? (
              <p className="text-gray-400 text-sm text-center mt-12">
                No appointments
              </p>
            ) : (
              <ul className="space-y-2">
                {dayAppointments.map((appt) => (
                  <li
                    key={appt.id}
                    className="bg-white/60 dark:bg-gray-800/60 shadow-sm rounded-lg px-3 py-2 text-sm flex justify-between items-center"
                  >
                    <span>{appt.title}</span>
                    <span className="text-gray-500">{appt.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
