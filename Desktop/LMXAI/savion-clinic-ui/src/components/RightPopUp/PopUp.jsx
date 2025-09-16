// PopUp.js - Güncellenmiş versiyon
"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaClipboardList, FaExclamationTriangle, FaTimes, FaCheck } from "react-icons/fa";
import { useNotifications } from '@/hook/NotificationContext';
import { useRouter } from 'next/navigation';


const PopUp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const scrollRef = useRef(null);
    const router = useRouter();
    const {
        notifications,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        unreadCount
    } = useNotifications();
    //console.log("notifications", notifications);

    const iconMap = {
        reminder: <FaBell className="text-yellow-500 w-5 h-5" />,
        task: <FaClipboardList className="text-blue-500 w-5 h-5" />,
        alert: <FaExclamationTriangle className="text-red-500 w-5 h-5" />,
    };

    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        if (notification.url) {
            router.push(notification.url);
        }
    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                className="fixed right-1 md:right-4 lg:right-8 top-12 sm:top-16 flex items-center justify-center text-color4 dark:text-color11 z-50"
                onClick={() => setIsVisible(!isVisible)}
            >
                <div className="relative bg-white dark:bg-gray-800 p-2 backdrop:blur-sm rounded-full  hover:shadow-color3 transition-all duration-300">
                    <FaBell className="w-4 h-4 lg:w-6 lg:h-6 " />
                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-color1 text-white text-[10px]  rounded-full w-4 h-4 flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </button>

            {/* Popup */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed right-1 md:right-4 lg:right-4 top-[6rem] z-40 w-64 pt-3 me-1 text-color4 dark:text-color11 backdrop-blur-md rounded-3xl shadow-md"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 pb-2">
                            <h3 className=" text-sm">Notifications</h3>
                            <div className="flex gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-blue-500 hover:text-blue-600"
                                        title="Tümünü okundu olarak işaretle"
                                    >
                                        <FaCheck className="w-3 h-3" />
                                    </button>
                                )}
                                <button
                                    onClick={clearAllNotifications}
                                    className="text-xs text-red-500 hover:text-red-600"
                                    title="Tüm bildirimleri temizle"
                                >
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            className="flex flex-col gap-3 px-4 h-auto max-h-[68vh] overflow-y-auto"
                        >
                            {notifications.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    Henüz bildirim yok
                                </div>
                            ) : (
                                notifications.map((notification, index) => (
                                    <div
                                        key={`notification-${notification.id}-${index}`}

                                        className={`flex items-start gap-3 border-b py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                            }`}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        {iconMap[notification.type]}
                                        <div className="flex-1">
                                            <div className=" text-sm flex items-center gap-2">
                                                {notification.title}
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {notification.description}
                                            </div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                {notification.timestamp.toLocaleTimeString('tr-TR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeNotification(notification.id);
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <FaTimes className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PopUp;


