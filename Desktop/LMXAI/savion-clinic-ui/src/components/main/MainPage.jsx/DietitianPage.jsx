"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import BookingRateCard from "./BookingRateCard";
import StatCardGrid from "./StatCardGrid";
import { RiChatAiLine } from "react-icons/ri";

import Schedule from "./Schedule";
import DietitianChat from "../DietitianChat";

// Appointment item component
const AppointmentItem = ({ time, patient, type }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-center space-x-3">
      <div className="text-sm text-gray-600 w-12">{time}</div>
      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">
          {patient.charAt(0)}
        </span>
      </div>
      <div>
        <div className="font-medium text-gray-900">{patient}</div>
        <div className="text-sm text-gray-500">{type}</div>
      </div>
    </div>
    <div
      className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer"
      onClick={() => alert(`Chatting with ${patient}`)}
    >
      <RiChatAiLine className="w-4 h-4 text-white" />
    </div>
  </div>
);

// Section wrapper
const Section = ({ title, children, className = "", showDropdown = false }) => (
  <div
    className={`bg-white/40 dark:bg-gray-700/30 backdrop-blur-md p-5 rounded-2xl shadow-md shadow-color1/30 ${className}`}
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {showDropdown && (
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
          <span className="text-sm">Weekly</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
    {children}
  </div>
);

const DietitianPage = () => {
  const appointments = [
    { time: "09:00", patient: "Sarah Hansen", type: "Follow-up" },
    { time: "09:30", patient: "Michael Johnson", type: "Initial" },
    { time: "10:00", patient: "Meghan Matthews", type: "Follow-up" },
    { time: "10:30", patient: "John Jacob Matthews", type: "Initial" },
    { time: "11:00", patient: "Sara Watson", type: "Follow-up" },
    { time: "14:00", patient: "Tessa Tiffany", type: "Initial" },
    { time: "14:30", patient: "Meghan Morise", type: "Follow-up" },
    { time: "15:00", patient: "Wallace Storme", type: "Initial" },
    { time: "16:30", patient: "Irene Andrews", type: "Follow-up" },
  ];

  return (
    <div className="h-screen flex flex-col  overflow-hidden">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-md">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-color4 to-color5 dark:from-color2 dark:to-color1 bg-clip-text text-transparent">
              Dietitian Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome, Dr. Ayşe Türkmen
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - scrollable */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <StatCardGrid />
            <DietitianChat />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Score Card */}
            <Section>
              <Schedule />
            </Section>

            {/* Today's Patients */}
            <Section title="Your Patients Today" showDropdown>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {appointments.map((appointment, index) => (
                  <AppointmentItem
                    key={index}
                    time={appointment.time}
                    patient={appointment.patient}
                    type={appointment.type}
                  />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DietitianPage;
