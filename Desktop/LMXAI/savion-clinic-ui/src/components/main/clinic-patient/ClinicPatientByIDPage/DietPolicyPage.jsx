"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { FaFire, FaDrumstickBite, FaBreadSlice } from 'react-icons/fa';
import { GiMilkCarton, GiFruitBowl, GiGrain, GiOlive, GiMuscleUp, GiBroccoli } from 'react-icons/gi';
import { getSamplesMeAction } from '@/actions/samples-action';

const iconMap = {
    Bread: <FaBreadSlice className="text-yellow-600" />,
    Fat: <GiOlive className="text-green-700" />,
    Fruits: <GiFruitBowl className="text-red-500" />,
    Grains: <GiGrain className="text-orange-500" />,
    Meat: <FaDrumstickBite className="text-rose-600" />,
    Milk: <GiMilkCarton className="text-blue-500" />,
    Vegetables: <GiBroccoli className="text-green-500" />,
};

// Placeholder data
const placeholderData = {
    nutrition_breakdown: {
        total_contribution: {
            calories: '---',
            carbs: '---',
            fat: '---',
            protein: '---'
        },
        allocated_portions: {
            Bread: '--- portions',
            Fat: '--- portions',
            Fruits: '--- portions',
            Grains: '--- portions',
            Meat: '--- portions',
            Milk: '--- portions',
            Vegetables: '--- portions'
        }
    },
    sample_list: `# Your Meal Plan is Being Prepared...

Your personalized nutrition plan is being created. Please wait.

---

## 🌅 Breakfast
- Analyzing your data...

## 🍽️ Lunch  
- Evaluating your preferences...

## 🌙 Dinner
- Calculating your nutritional needs...

## 🍎 Snacks
- Preparing your recommendations...`
};

const DietPolicyPage = () => {
    // İlk başta placeholder verilerle başla
    const [data, setData] = useState(placeholderData);
    const [isRealData, setIsRealData] = useState(false);

    useEffect(() => {
        const fetchSamples = async () => {
            try {
                /*   const response = await getSamplesMeAction();
                  console.log("getSamplesMeAction", response);
                  if (response && response.nutrition_breakdown && response.sample_list) {
                      setData(response);
                      setIsRealData(true);
                  } */
                const mockResponse = {
                    diet_id: "diet_e46a1a27f61baf8561b33060c535ebeb",
                    patient_id: "patient_e63dfb37ef12",
                    nutrition_breakdown: {
                        allocated_portions: {
                            Bread: 2.77,
                            Fat: 0.07,
                            Fruits: 0.78,
                            Grains: 0.35,
                            Meat: 2.58,
                            Milk: 0.03,
                            Vegetables: 2.73,
                        },
                        total_contribution: {
                            calories: 546.93,
                            carbs: 75.2,
                            fat: 15.19,
                            protein: 27.35,
                        },
                    },
                    created_at: "2025-08-12T10:03:47.254000",
                    sample_list: [
                        {
                            date: "2025-08-12",
                            day: 1,
                            menu: {
                                meals: {
                                    Breakfast: "Oatmeal (50g), Banana (100g), Milk (200ml)",
                                    Lunch: "Grilled Chicken (150g), Brown Rice (100g), Broccoli (80g)",
                                    Dinner: "Salmon (120g), Quinoa (90g), Mixed Salad (150g)",
                                    Snacks: "Apple (150g), Almonds (30g)",
                                },
                                "Summary of Portions": {
                                    "Food Group": ["Bread", "Meat", "Vegetables", "Fruits", "Milk", "Fat"],
                                    Portion: [2.5, 2.0, 3.0, 1.5, 1.0, 0.5],
                                    Grams: [70, 200, 250, 150, 200, 20],
                                },
                            },
                        },
                        {
                            date: "2025-08-13",
                            day: 2,
                            menu: {
                                meals: {
                                    Breakfast: "Whole Grain Bread (60g), Cheese (40g), Orange (120g)",
                                    Lunch: "Beef Steak (180g), Mashed Potatoes (120g), Green Beans (90g)",
                                    Dinner: "Chicken Soup (250ml), Rice (80g), Spinach (100g)",
                                    Snacks: "Yogurt (150g), Walnuts (20g)",
                                },
                                "Summary of Portions": {
                                    "Food Group": ["Bread", "Meat", "Vegetables", "Fruits", "Milk", "Fat"],
                                    Portion: [3.0, 2.3, 2.5, 2.0, 1.2, 0.7],
                                    Grams: [90, 220, 230, 180, 220, 25],
                                },
                            },
                        },
                    ],
                };


                // API'den gelmiş gibi set et
                setData(mockResponse);
                setIsRealData(true);
                // Eğer geçerli veri gelmezse placeholder veriler kalır
            } catch (error) {
                console.error('Error fetching samples:', error);
                // Hata durumunda placeholder veriler kalır
            }
        };

        fetchSamples();
    }, []);

    const { nutrition_breakdown, sample_list } = data;
    const { total_contribution, allocated_portions } = nutrition_breakdown;

    // Verinin placeholder olup olmadığını kontrol et
    const isPlaceholderData = !isRealData;

    return (
        <div className="h-full">
            <div className="h-full max-h-[80vh] overflow-y-auto p-6 space-y-4 sm:space-y-2 pt-6 bg-white/40 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl shadow-md shadow-color1/30">
                <h1 className="text-4xl  text-center text-green-800 dark:text-green-300">
                    Your Personalized Diet Plan
                </h1>



                {/* Macro Nutrients */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className={`bg-green-100 dark:bg-green-800 p-4 rounded-xl shadow-lg ${isPlaceholderData ? 'opacity-60' : ''}`}>
                        <FaFire className="text-3xl mx-auto mb-2 text-orange-500" />
                        <p className=" ">Calories</p>
                        <p className="text-2xl ">
                            {total_contribution.calories} {total_contribution.calories !== '---' ? 'kcal' : ''}
                        </p>
                    </div>
                    <div className={`bg-yellow-100 dark:bg-yellow-700 p-4 rounded-xl shadow-lg ${isPlaceholderData ? 'opacity-60' : ''}`}>
                        <GiGrain className="text-3xl mx-auto mb-2 text-yellow-600" />
                        <p className=" ">Carbs</p>
                        <p className="text-2xl ">
                            {total_contribution.carbs} {total_contribution.carbs !== '---' ? 'g' : ''}
                        </p>
                    </div>
                    <div className={`bg-red-100 dark:bg-red-700 p-4 rounded-xl shadow-lg ${isPlaceholderData ? 'opacity-60' : ''}`}>
                        <GiOlive className="text-3xl mx-auto mb-2 text-red-600" />
                        <p className=" ">Fat</p>
                        <p className="text-2xl ">
                            {total_contribution.fat} {total_contribution.fat !== '---' ? 'g' : ''}
                        </p>
                    </div>
                    <div className={`bg-blue-100 dark:bg-blue-700 p-4 rounded-xl shadow-lg ${isPlaceholderData ? 'opacity-60' : ''}`}>
                        <GiMuscleUp className="text-3xl mx-auto mb-2 text-blue-600" />
                        <p className=" ">Protein</p>
                        <p className="text-2xl ">
                            {total_contribution.protein} {total_contribution.protein !== '---' ? 'g' : ''}
                        </p>
                    </div>
                </div>

                {/* Allocated Portions - Button Layout */}
                <div>
                    <h2 className="text-2xl  mb-4">Daily Portion Summary</h2>
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                        {Object.entries(allocated_portions).map(([key, value]) => (
                            <button
                                key={key}
                                className={`flex items-center justify-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:bg-green-50 dark:hover:bg-green-900 transition duration-200 ${isPlaceholderData ? 'opacity-60 cursor-not-allowed' : ''}`}
                                disabled={isPlaceholderData}
                            >
                                <span className="text-2xl">{iconMap[key] || <FaBreadSlice />}</span>
                                <div className="text-left">
                                    <div className="text-sm  text-gray-700 dark:text-gray-100">
                                        {key}
                                    </div>
                                    <div className="text-sm  text-green-700 dark:text-green-300">
                                        {value}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sample Meal Plan */}
                <div>
                    <h2 className="text-2xl  mb-4">Sample Meal Plan</h2>
                    <div className={`${isPlaceholderData ? 'opacity-60' : ''}`}>
                        {isPlaceholderData ? (
                            <div className="prose dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight, rehypeKatex]}
                                    remarkPlugins={[remarkGfm, remarkMath]}
                                >
                                    {sample_list}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {data.sample_list.map((dayItem) => (
                                    <div key={dayItem.date} className="space-y-6">
                                        {/* Day Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                            <h3 className="text-2xl  text-green-700 dark:text-green-300">
                                                Day {dayItem.day}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                {new Date(dayItem.date).toLocaleDateString("en-GB")}
                                            </p>
                                        </div>

                                        {/* Meals Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {Object.entries(dayItem.menu.meals).map(([mealName, mealString]) => {
                                                const foods = mealString.split(",").map(f => f.trim());
                                                return (
                                                    <div key={mealName} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                                                        <h4 className="text-lg ">{mealName}</h4>
                                                        <ul className="space-y-2">
                                                            {foods.map((food, i) => {
                                                                const [name, amount] = food.split("(").map(s => s.trim().replace(")", ""));
                                                                return (
                                                                    <li key={i} className="flex justify-between">
                                                                        <span>{name}</span>
                                                                        <span>{amount}</span>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                );
                                            })}

                                        </div>


                                        {/* Summary of Portions Table */}
                                        {dayItem.menu["Summary of Portions"] && (
                                            <div className="mt-8">
                                                <h5 className="text-lg  text-gray-700 dark:text-gray-200 mb-4">
                                                    Summary of Portions
                                                </h5>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                                        <thead className="bg-green-100 dark:bg-green-800">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-sm  text-gray-700 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                                                                    Food Group
                                                                </th>
                                                                <th className="px-6 py-3 text-left text-sm  text-gray-700 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                                                                    Portion
                                                                </th>
                                                                <th className="px-6 py-3 text-left text-sm  text-gray-700 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                                                                    Grams
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                            {dayItem.menu["Summary of Portions"]["Food Group"].map((group, index) => (
                                                                <tr key={group}>
                                                                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">
                                                                        {group}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-green-800 dark:text-green-300">
                                                                        {dayItem.menu["Summary of Portions"]["Portion"][index]}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                                                                        {dayItem.menu["Summary of Portions"]["Grams"][index]}g
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DietPolicyPage
