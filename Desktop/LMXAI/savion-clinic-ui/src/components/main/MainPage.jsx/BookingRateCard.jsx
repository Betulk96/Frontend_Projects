"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { day: "Sun", value: 20 },
  { day: "Mon", value: 25 },
  { day: "Tue", value: 30 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 35 },
  { day: "Fri", value: 80 }, // en yüksek
  { day: "Sat", value: 22 },
];

export default function BookingRateCard() {
  return (
    <div >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 dark:text-gray-100 font-semibold">
          Booking Rate
        </h2>
        <span className="text-sm text-gray-500">Weekly</span>
      </div>

      {/* Rate Info */}
      <div className="flex items-start gap-6">


        {/* Chart */}
        <div className="flex-1 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: "transparent" }} />

              {/* Gradient Tanımı */}
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FC3F7" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0288D1" stopOpacity={1} />
                </linearGradient>
              </defs>

              {/* Gradient Uygulaması */}
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
}
