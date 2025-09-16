
import React, { useState } from "react";
import { CiReceipt } from "react-icons/ci";
import { FaAppleAlt, FaChartLine, FaClipboardList, FaReceipt, FaShoppingBasket, FaUtensils } from "react-icons/fa";

export default function ChatOptionsQuestion({ setQuestion, setLoading, setChat, detail }) {
    const chatTopics = [
        {
            value: "generate a diet policy based on the given values",
            text: "Generate A Diet Policy",
            icon: <FaClipboardList className="text-color2/70 dark:text-color11" />,
        },
        {
            value:
                "generate a customised weekly meal plan based on the given values. stay loyal to the diet policy.",
            text: "Generate A Weekly Meal Plan",
            icon: <FaUtensils className=" text-color2/70 dark:text-color11" />,
        },
        {
            value:
                "suggest healthy snack alternatives suitable for the user's dietary restrictions and calorie goals.",
            text: "Suggest Healthy Snacks",
            icon: <FaAppleAlt className=" text-color2/70 dark:text-color11" />,
        },
        {
            value:
                "analyze the current daily meal plan and suggest improvements to optimize macro balance and energy levels.",
            text: "Analyze & Improve Daily Plan",
            icon: <FaChartLine className=" text-color2/70 dark:text-color11" />,
        },
        {
            value:
                "recommend grocery shopping list based on the weekly meal plan and user's dietary preferences.",
            text: "Generate Grocery List",
            icon: <FaShoppingBasket className=" text-color2/70 dark:text-color11" />,
        },

        {
            value: "Can you give daily menu",
            text: "Generate Daily Menu",
            icon: <FaReceipt className=" text-color2/70 dark:text-color11" />,
        }
    ];


    const handleChatByChatOptions = (text) => {
        setQuestion(text);
        setLoading(true);
        setChat(true);
    };




    return (
        <div className="flex flex-col items-center justify-center w-full p-8 sm:p-0">
            <div className="text-color66 dark:text-color22 text-left w-full max-w-3xl">
                <h1 className="text-[44px] leading-[64px] 
      max-[1200px]:text-[36px]
      max-[992px]:text-[32px] max-[992px]:leading-[35px]">
                    <p className="mb-1">
                        Let&#39;s plan the diet of{" "}
                        <span className="font-semibold text-color2 dark:text-color7">
                            {detail?.username}
                        </span>
                    </p>

                </h1>
            </div>

            {/* Chat Options */}
            <div className="grid grid-cols-1  gap-4 mt-5 sm:mt-10 p-4 w-full max-w-3xl">
                {chatTopics.map((topic, index) => (
                    <div key={index} className="relative group rounded-2xl overflow-hidden">


                        {/* 3D ve cam efektli buton */}
                        <button
                            onClick={() => handleChatByChatOptions(topic.value)}
                            className="relative w-1/2 backdrop-blur-md 
                            bg-white/5 dark:bg-white/10 rounded-2xl p-2  flex items-center gap-4 transition-all duration-500
                            hover:scale-[0.98]  "
                        >

                            <span className="text-md text-color2 dark:text-color7">
                                {topic.text}
                            </span>
                        </button>
                    </div>
                ))}
            </div>



        </div>

    );
}
