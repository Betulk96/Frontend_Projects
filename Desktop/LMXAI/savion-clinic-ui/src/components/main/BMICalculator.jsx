"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeters = Number(height) / 100;
    const bmiValue = Number(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal weight");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}     // soldan başlayacak
      animate={{ x: 0, opacity: 1 }}        // merkeze kayıp görünecek
      transition={{ duration: 0.8, ease: "easeOut" }}
      c className="p-6 rounded-2xl shadow-md shadow-color1/30 bg-color2/30 backdrop-blur-3xl dark:bg-gray-700/30 xl:ml-[90px] dark:bg-color33"
    >
      <h3 className="bg-gradient-custom-light bg-clip-text text-transparent hover:text-color1 dark:hover:text-color3 transition m-2">
        Body Mass Index Calculator
      </h3>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-200 mb-1">
          Height (cm)
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 170"
        />
      </div>

      <div className="mb-7">
        <label className="block text-gray-700 dark:text-gray-200 mb-1">
          Weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 65"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="w-full text-white p-3 rounded-xl hover:scale-105 transition-transform duration-500 bg-gradient-green-yellow hover:bg-gradient-dark-green"
      >
        Calculate
      </button>

      {bmi && (
        <div className="mt-6 text-center">
          <p className="text-gray-800 dark:text-white">
            BMI: <span className="text-color3">{bmi}</span>
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {category}
          </p>
        </div>
      )}
    </motion.div>
  );
}
