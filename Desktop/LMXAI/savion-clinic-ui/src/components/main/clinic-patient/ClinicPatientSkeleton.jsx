// components/ClinicPatientSkeleton.jsx
import React from "react";

const ClinicPatientSkeleton = () => {
    return (
        <div className="bg-color3/20 min-h-screen p-6 pt-20 space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="h-8 bg-gray-300 rounded w-64" />
                <div className="flex items-center space-x-4">
                    <div className="relative w-64 h-10 bg-gray-300 rounded" />
                    <div className="w-40 h-10 bg-gray-400 rounded-lg" />
                </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                        <div className="h-4 bg-gray-300 w-24 mb-2 rounded" />
                        <div className="h-6 bg-gray-400 w-16 rounded" />
                    </div>
                ))}
            </div>

            {/* Hasta Kartları */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="p-6 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 shadow space-y-4"
                    >
                        <div className="h-5 bg-gray-300 w-1/2 rounded" />
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 w-3/4 rounded" />
                            <div className="h-3 bg-gray-200 w-2/3 rounded" />
                            <div className="h-3 bg-gray-200 w-1/2 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClinicPatientSkeleton;
