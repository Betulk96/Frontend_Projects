
import React, { useState } from "react";
import { FaAppleAlt, FaChartLine, FaClipboardList, FaDumbbell, FaReceipt } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { PiPencilLine } from "react-icons/pi";
export default function ChatOptionsQuestion({ setQuestion, setLoading, setChat }) {
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


    const handleChatByChatOptions = (text) => {
        setQuestion(text);
        setLoading(true);
        setChat(true);
    };




    return (
        <div className="flex flex-col items-center justify-center w-full p-8 sm:p-0">
            <div className="text-color2 dark:text-color22 text-center w-full ">
                <h1 className="text-[44px] leading-[64px] 
      max-[1200px]:text-[36px]
      max-[992px]:text-[32px] max-[992px]:leading-[35px]">
                    <p className="mb-1">
                        How can Savion assist you today?
                        <span className="font-semibold text-color2 dark:text-color7">

                        </span>
                    </p>

                </h1>
            </div>

            {/* Chat Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 sm:mt-10 p-4 w-full ">
                {chatTopics.map((topic, index) => (
                    <div
                        key={index}
                        className="relative group rounded-2xl overflow-hidden flex justify-center"
                    >
                        {/* 3D ve cam efektli buton */}
                        <button
                            onClick={() => handleChatByChatOptions(topic.value)}
                            className="relative w-1/2 mx-auto backdrop-blur-md bg-white/5 dark:bg-white/10 rounded-2xl p-3 flex items-centerjustify-left transition-all duration-500         hover:scale-[0.98]"
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
