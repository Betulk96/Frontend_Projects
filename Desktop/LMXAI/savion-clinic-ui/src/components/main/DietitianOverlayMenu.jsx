"use client";

import {
    FaCalculator,
    FaCalendarAlt,
    FaChartPie,
    FaListAlt,
    FaEnvelope,
} from "react-icons/fa";
import { RiBodyScanFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import BmrTdeeCalculate from "./BmrTdeeCalculate";
import BMICalculator from "./BMICalculator";
import { swalConfirm } from "@/helpers/alert/swal";
import { signOut } from "next-auth/react";

export default function DietitianOverlayMenu({ onClose, role }) {
    const [showBmrModal, setShowBmrModal] = useState(false);
    const [showBmiModal, setShowBmiModal] = useState(false);

    const menuItems = [
        { icon: <FaCalculator size={20} />, label: "BMR / TDEE", action: () => setShowBmrModal(true) },
        { icon: <RiBodyScanFill size={26} />, label: "BMI Calculator", action: () => setShowBmiModal(true) },
        ...(role !== "admin" && role !== "dietitian"
            ? [
               /*  { icon: <FaCalendarAlt size={20} />, label: "Weekly Food Plan", href: "/main/food" }, */
                { icon: <FaChartPie size={20} />, label: "Body Analysis", href: "/main/edit" },
                { icon: <FaListAlt size={20} />, label: "Diet Plan", href: "/main/diet-samples" },
                { icon: <FaEnvelope size={20} />, label: "Daily Menu", href: "/main/dailymenu" },
            ]
            : []),
        {
            icon: <IoIosLogOut size={22} />,
            label: "Logout",
            action: async () => {
                const resp = await swalConfirm("!!! Are you sure to logout?");
                if (!resp.isConfirmed) return;
                signOut({ callbackUrl: "/" });
            },
        },
    ];

    return (
        <div
            className="fixed inset-0 z-50 backdrop-blur-md bg-green-200/10 flex flex-col items-center justify-center px-4"
            onClick={onClose}
        >
            {/* Başlık */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl sm:text-4xl  mb-2 text-gray-200">DASHBOARD</h2>
            </div>

            {/* Menü grid */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl z-40"
                onClick={(e) => e.stopPropagation()}
            >
                {menuItems.map((item, idx) => {
                    const handleClick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (item.action) item.action();
                        if (item.href) window.location.href = item.href;
                    };

                    return (
                        <a
                            key={idx}
                            href={item.href || "#"}
                            onClick={handleClick}
                            className="flex flex-col items-center justify-center text-center transform transition-all group"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-animate hover:scale-110 hover:bg-gradient-green-yellow transition-all duration-300 ease-in-out flex items-center justify-center">
                                <div className="text-white">{item.icon}</div>
                            </div>
                            <span className="text-sm sm:text-base mt-2 text-gray-200">{item.label}</span>
                        </a>
                    );
                })}
            </div>

            {/* BMR Modal */}
            {showBmrModal && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setShowBmrModal(false)}
                >
                    <div
                        className="relative p-4 sm:p-6 bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowBmrModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 "
                        >
                            &times;
                        </button>
                        <BmrTdeeCalculate />
                    </div>
                </div>
            )}

            {/* BMI Modal */}
            {showBmiModal && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setShowBmiModal(false)}
                >
                    <div
                        className="relative p-4 sm:p-6 bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowBmiModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 "
                        >
                            &times;
                        </button>
                        <BMICalculator />
                    </div>
                </div>
            )}
        </div>
    );
}
