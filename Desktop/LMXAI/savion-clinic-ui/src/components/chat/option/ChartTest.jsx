"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Mon", value: 2070 },
  { name: "Tue", value: 2530 },
  { name: "Wed", value: 2176 },
  { name: "Thu", value: 2330 },
  { name: "Fri", value: 2350 },
  { name: "Sat", value: 2340 },
  { name: "Sun", value: 2310 },
];

const AnimatedLabels = ({ points }) => {
  return (
    <>
      {points.map((point, index) => (
        <motion.g
          key={index}
          initial={{ opacity: 0, y: 10, scale: 0.5 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 0.4, type: "spring" }}
        >
          <foreignObject x={point.x - 25} y={point.y - 45} width={50} height={40}>
            <div
              style={{
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
                background: "white",
                padding: "2px 6px",
                borderRadius: "10px",
                color: "#555",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {point.payload.value}
            </div>
          </foreignObject>
        </motion.g>
      ))}
    </>
  );
};

const CustomAreaWithLabels = (props) => {
  const { points } = props;
  return (
    <>
      <AnimatedLabels points={points} />
    </>
  );
};

const GradientAreaChart = () => {
  return (
    <div style={{ width: "100%", height: 120, padding: 0, margin: 0 }}>


      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3CB141" />
              <stop offset="50%" stopColor="#FF8042" />
              <stop offset="100%" stopColor="#8884d8" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#FF8042" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#3CB141" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fill: "#888" }} />
          <YAxis
            width={30} // varsayılan genelde 60 civarındadır
            tick={{ fill: "#888", angle: -45, textAnchor: "end" }}
            domain={['dataMin - 100', 'dataMax + 100']} //en düşük ve en yüksek değerler
          />


          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            fill="url(#areaGradient)"
            strokeWidth={5}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            shape={<CustomAreaWithLabels />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradientAreaChart;
