"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const BmrTdeeCalculate = () => {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "1.2",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateBMRandTDEE = () => {
    const { age, weight, height, gender, activity } = form;
    const parsedAge = parseInt(age);
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const activityFactor = parseFloat(activity);

    if (!parsedAge || !parsedWeight || !parsedHeight) return;

    let bmr =
      gender === "male"
        ? 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5
        : 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;

    let tdee = bmr * activityFactor;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}   // soldan başla
      animate={{ x: 0, opacity: 1 }}      // merkeze gel ve görünür ol
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-6 rounded-2xl shadow-md shadow-color1/30 bg-color2/30 backdrop-blur-3xl dark:bg-gray-700/30 xl:ml-[90px] dark:bg-color33"
    >
      <h3 className="bg-gradient-custom-light bg-clip-text text-transparent hover:text-color1 dark:hover:text-color3 transition m-2">
        Calculate Your BMR & TDEE
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4 w-full">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
        />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={form.height}
          onChange={handleChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          name="activity"
          value={form.activity}
          onChange={handleChange}
          className="col-span-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-400 focus:border-red-400"
        >
          <option value="1.2">Sedentary (Little or no exercise)</option>
          <option value="1.375">Lightly active (Light exercise 1–3 days/week)</option>
          <option value="1.55">Moderately active (Moderate exercise 3–5 days/week)</option>
          <option value="1.725">Very active (Hard exercise 6–7 days/week)</option>
          <option value="1.9">Super active (Very hard training, physical job)</option>
        </select>
      </div>

      <button
        onClick={calculateBMRandTDEE}
        className="w-full text-white  p-3 rounded-xl hover:scale-105 transition-transform duration-500 bg-gradient-green-yellow hover:bg-gradient-dark-green"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-4 text-sm text-color8 dark:text-color11 flex justify-center gap-3">
          <p>
            <strong>BMR:</strong> {result.bmr} kcal/day
          </p>
          <p>
            <strong>TDEE:</strong> {result.tdee} kcal/day
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default BmrTdeeCalculate;
