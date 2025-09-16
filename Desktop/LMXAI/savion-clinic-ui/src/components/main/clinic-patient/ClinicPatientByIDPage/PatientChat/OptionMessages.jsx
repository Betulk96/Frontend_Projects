import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp, FaChevronDown, FaReceipt } from "react-icons/fa";
import { FaAppleAlt, FaChartLine, FaClipboardList, FaDumbbell, FaShoppingBasket, FaUtensils } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { PiPencilLine } from "react-icons/pi";

const OptionMessages = ({ onSelectQuestion }) => {
    const chatTopics = [
        {
            value: "generate a diet policy based on the given values",
            text: "Generate A Diet Policy",
            icon: <FaClipboardList className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "generate a customised weekly meal plan based on the given values. stay loyal to the diet policy.",
            text: "Generate A Weekly Meal Plan",
            icon: <FaUtensils className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "suggest healthy snack alternatives suitable for the user's dietary restrictions and calorie goals.",
            text: "Suggest Healthy Snacks",
            icon: <FaAppleAlt className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "analyze the current daily meal plan and suggest improvements to optimize macro balance and energy levels.",
            text: "Analyze & Improve Daily Plan",
            icon: <FaChartLine className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "recommend grocery shopping list based on the weekly meal plan and user's dietary preferences.",
            text: "Generate Grocery List",
            icon: <FaShoppingBasket className=" text-color4/70 dark:text-color11" />,
        },
        {
            value:
                "suggest pre and post workout meals tailored to the user's fitness goals and workout intensity.",
            text: "Workout Meal Suggestions",
            icon: <FaDumbbell className=" text-color4/70 dark:text-color11" />,
        },
        {
            value: "Can you give daily menu",
            text: "Generate Daily Menu",
            icon: <FaReceipt className=" text-color4/70 dark:text-color11" />,
        }
    ];

    const [isVisible, setIsVisible] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            setIsVisible(false);
        }
    }, []);

    const scrollUp = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: -100, behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: 100, behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                className="group fixed right-1 md:right-4 lg:right-7 top-28 flex items-center justify-center text-color4 dark:text-color11 z-50"
                onClick={() => setIsVisible(!isVisible)}
            >
                <PiPencilLine className="w-4 h-4 lg:w-6 lg:h-6" />

                {/* Tooltip */}
                <span className="absolute top-2 lg:top-4 right-1 md:right-4 lg:right-7  bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Generate Question
                </span>
            </button>


            {/* Slide Menu with AnimatePresence */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed right-1 md:right-4 lg:right-4 top-30 sm:top-36 z-40 w-64 pt-3 me-1 text-color4 dark:text-color11 backdrop-blur-md rounded-3xl shadow-md"
                    >

                        {/*    <button onClick={scrollUp} className="w-full flex justify-center p-2 transition">
                            <FaChevronUp className="w-3 h-3 text-color4 dark:text-gray-300" />
                        </button> */}

                        <div ref={scrollRef} className="grid grid-cols-1  px-4 w-full gap-3 ">
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

                                    {/* Tooltip */}
                                    <div className="absolute top-4 lg:top-6 right-1 md:right-4 lg:right-7 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                                        {topic.value}
                                    </div>

                                </div>
                            ))}
                        </div>




                        {/*   <button onClick={scrollDown} className="w-full mt-3 flex justify-center transition">
                            <FaChevronDown className="w-3 h-3 text-color4 dark:text-gray-300" />
                        </button> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OptionMessages;
