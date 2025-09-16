import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaReceipt } from "react-icons/fa";
import { FaAppleAlt, FaChartLine, FaClipboardList, FaDumbbell, FaShoppingBasket, FaUtensils } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { PiPencilLine } from "react-icons/pi";

const OptionMessages = ({ onSelectQuestion }) => {
    const chatTopics = [
        {
            value:
                "analyze today's patient meal logs and provide feedback on adherence to the prescribed diet.",
            text: "Analyze Patient Logs",
            icon: <FaClipboardList className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "suggest dietary adjustments for patients based on their lab results and health conditions.",
            text: "Adjust Diet by Lab Results",
            icon: <FaChartLine className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "recommend quick meal or snack ideas that fit into a busy patient schedule without compromising health goals.",
            text: "Quick Meal Ideas for Patients",
            icon: <FaAppleAlt className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "generate motivational messages or tips I can share with patients to support adherence.",
            text: "Motivational Tips",
            icon: <ImBooks className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "prepare a weekly follow-up checklist to monitor patient diet progress and challenges.",
            text: "Weekly Follow-up Checklist",
            icon: <FaReceipt className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "suggest professional development resources (articles, books, research) to improve my nutrition practice.",
            text: "Professional Resources",
            icon: <PiPencilLine className=" text-color4/70 dark:text-color11" />,
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 px-4 w-full gap-3">
                {chatTopics.map((topic, index) => (
                    <div key={index} className="relative group">
                        <button
                            className="w-full h-12 flex items-start justify-start gap-1 transition-all duration-300 border-b-2 border-gray-300 dark:border-gray-700 hover:text-color22 dark:hover:text-color11 hover:border-color22 dark:hover:border-color11"
                            onClick={() =>
                                onSelectQuestion({
                                    question: topic.value,
                                    lesson_name: topic.text,
                                })
                            }
                        >
                            <span>{topic.icon}</span>
                            <span className="font-medium first-letter:uppercase text-sm">
                                {topic.text}
                            </span>
                        </button>

                        <div className="absolute top-4 lg:top-6 right-1 md:right-4 lg:right-7 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                            {topic.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default OptionMessages;
