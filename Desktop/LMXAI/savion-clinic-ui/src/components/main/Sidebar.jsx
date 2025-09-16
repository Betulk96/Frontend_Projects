"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import React, { useState } from 'react';
import {
    FaUserFriends,
    FaCalendarAlt,
} from "react-icons/fa";
import { MdOutlineFastfood, MdDashboard, MdFitnessCenter } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { IoMdChatboxes } from "react-icons/io";
import { useRouter } from 'next/navigation';
import BmrTdeeModal from '@/components/main/BmrTdeeModal';
import BmiCalculatorModal from '@/components/main/BMICalculaterModal';
import { RiChatAiLine } from 'react-icons/ri';
import ThemeLogo from "./ThemeLogo";
import { NotebookIcon } from "lucide-react";

const Sidebar = ({ session }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showBmrModal, setShowBmrModal] = useState(false);
    const [showBmiModal, setShowBmiModal] = useState(false);
    const router = useRouter();

    const MenuItem = ({ icon, label, href, onClick }) => {
        const content = (
            <div className="relative group flex items-center justify-center">
                {/* Modern Button */}
                <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-700/30  backdrop-blur-sm shadow-md hover:bg-color4/20 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 text-2xl text-gray-700 dark:text-gray-100">
                    {icon}
                </div>

                {/* Tooltip */}
                <span className="absolute left-full ml-3 px-3 py-1 text-sm rounded-lg bg-gray-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50">
                    {label}
                </span>
            </div>
        );

        if (href) {
            return (
                <Link
                    href={href}
                    className="flex items-center justify-center"
                >
                    {content}
                </Link>
            );
        }

        return (
            <div
                onClick={onClick}
                className="flex items-center justify-center cursor-pointer"
            >
                {content}
            </div>
        );
    };

    const SidebarContent = () => {
        const menuItems = [
            { icon: <MdDashboard />, label: "Main", href: "/main" },
            { icon: <FaUserFriends />, label: "Clients", href: "/main/patients" },
            { icon: <FaCalendarAlt />, label: "Appointments", href: "/main/appointments" },
            { icon: <MdFitnessCenter />, label: "BMR Calculator", onClick: () => setShowBmrModal(true) },
            { icon: <GiBodyHeight />, label: "BMI Calculator", onClick: () => setShowBmiModal(true) },
            { icon: <MdOutlineFastfood />, label: "Food Database", href: "/main/foods" },
            { icon: <NotebookIcon />, label: "Chat", href: "/main/notes" },
        ];

        return (
            <div className="flex flex-col items-center h-full w-full py-6 overflow-visible">
                {/* Logo */}
                <div className="mb-8">
                    <ThemeLogo
                        size={60}
                        onClick={() => router.push("/main")}
                        className="cursor-pointer"
                    />
                </div>

                {/* Menu */}
                <nav className="flex-1 flex flex-col items-center space-y-6 overflow-visible">
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            onClick={item.onClick}
                        />
                    ))}
                </nav>

                {/* Bottom Chat Button */}
                <div className="mt-auto">
                    <MenuItem
                        icon={<RiChatAiLine />}
                        label="Savion - AI Chat"
                        href="/main/chat"
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Toggle Button - Mobile */}
            <button
                className="xl:hidden fixed left-4 top-6 z-50 p-1 rounded-md shadow-md bg-white dark:bg-gray-800"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ThemeLogo size={24} />
            </button>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 xl:hidden z-40 bg-black bg-opacity-50"
                            onClick={() => setIsSidebarOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            className="fixed left-0 top-0 w-[90px] h-screen px-2 pb-2 overflow-visible rounded-b-2xl bg-gradient-sidebar dark:bg-gray-900/60 backdrop-blur-md text-gray-800 dark:text-gray-100 z-50 flex flex-col justify-between items-center  shadow-md shadow-color1"
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
                        >
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden xl:flex fixed left-0 top-0 w-[90px] h-screen px-2 overflow-visible bg-gradient-sidebar backdrop-blur-md dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 z-50 flex-col justify-between items-center shadow-md shadow-color1/50">
                <SidebarContent />
            </div>

            {/* Modals */}
            {showBmrModal && <BmrTdeeModal onClose={() => setShowBmrModal(false)} />}
            {showBmiModal && <BmiCalculatorModal onClose={() => setShowBmiModal(false)} />}
        </>
    );
};

export default Sidebar;
