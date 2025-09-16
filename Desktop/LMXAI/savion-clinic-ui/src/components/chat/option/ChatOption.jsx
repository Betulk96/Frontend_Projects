"use client";
import React, { useState } from "react";
import { FiTrendingUp, FiSmile } from "react-icons/fi";
import ChartTest from "./ChartTest";
import { AiFillFire } from "react-icons/ai";
import WeeklyMealCard from "./WeeklyMealCard";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";

const ChatOption = ({ session }) => {
  const [mood, setMood] = useState(3);

  const cardBase = `backdrop-blur-sm rounded-3xl transition-all duration-300 
    shadow-md hover:shadow-lg p-5 relative flex flex-col justify-between h-full 
    dark:border-color33 dark:shadow-color33 shadow-color22 hover:shadow-color33 border-2`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-10">
      {/* Üst sıra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full col-span-2">
        {/* Weekly Trend */}
        <div className={`${cardBase} text-color4  border-color1/30`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Trend</h2>
            <div className="bg-indigo-100 dark:bg-indigo-200 p-2 rounded-full">
              <FiTrendingUp className="text-indigo-600 text-lg" />
            </div>
          </div>
          <ChartTest />
        </div>

        {/* Daily Meal */}
        <div className={`${cardBase} text-color4  border-color2/50`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Meal</h2>
            <div className="bg-orange-100 dark:bg-orange-200 p-2 rounded-full">
              <GiForkKnifeSpoon className="text-orange-600 text-lg" />
            </div>
          </div>
          <WeeklyMealCard />
        </div>
      </div>

      {/* Alt sıra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full col-span-2">
        {/* 5-Day Streak */}
        <div className={`${cardBase} border-color3/30`}>
          <div className="absolute top-3 right-3">
            <div className="bg-red-100 dark:bg-red-200 p-2 rounded-full">
              <AiFillFire className="text-red-600 text-lg" />
            </div>
          </div>
          <h2 className="text-md  mb-1 text-gray-700 dark:text-gray-300">5-Day Streak</h2>
          <p className="text-sm">You&apos;re on fire! 🔥</p>
          <p className="text-sm">Keep it going.</p>
        </div>

        {/* Mood */}
        <div className={`${cardBase} text-color4 border-color4/30`}>
          <div className="absolute top-3 right-3">
            <div className="bg-green-100 dark:bg-green-200 p-2 rounded-full">
              <FiSmile className="text-green-600 text-lg" />
            </div>
          </div>
          <h2 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Mood</h2>
          <input
            type="range"
            min="1"
            max="5"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Today’s mood: {mood}/5</p>
        </div>

        {/* Daily Compliance */}
        <div className={`${cardBase} text-color4 border-color6/30`}>
          <div className="absolute top-3 right-3">
            <div className="bg-blue-200 dark:bg-blue-300 p-2 rounded-full">
              <CiCircleQuestion className="text-blue-600 text-lg" />
            </div>
          </div>
          <h2 className="text-sm font-medium mb-3 mr-5 text-gray-700 dark:text-gray-300">
            Did you follow your healthy plan today?
          </h2>
          <div className="flex gap-3">
            <button
              className="bg-color5/80 text-white text-sm px-4 py-2 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
              onClick={() => console.log("User followed the plan")}
            >
              <IoMdCheckmarkCircleOutline className="text-white text-lg" /> Yes, I did
            </button>
            <button
              className="bg-color3/80 text-white text-sm px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2"
              onClick={() => console.log("User did NOT follow the plan")}
            >
              <IoMdCloseCircleOutline className="text-white text-lg" /> No, I didn’t
            </button>
          </div>
        </div>
      </div>

      {/* Alt yazı */}
      <div className="col-span-2 flex items-center justify-center">
        <h3
          className="text-lg  text-center text-emerald-900 dark:text-emerald-300 pt-16"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          Let&apos;s start your meal planning
        </h3>
      </div>
    </div>
  );
};

export default ChatOption;
