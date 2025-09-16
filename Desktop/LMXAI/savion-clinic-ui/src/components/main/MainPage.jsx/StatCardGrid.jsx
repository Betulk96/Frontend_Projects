"use client";
import React from "react";
import { Users, User, Activity, Target } from "lucide-react";

const StatCard = ({ title, value, subtitle, color = "blue", trend, icon: Icon }) => (
    <div className="bg-white/40 dark:bg-gray-700/30 backdrop-blur-md rounded-2xl p-6 shadow-md shadow-color1/30">
        <div className="flex items-center justify-between mb-2 me-8">
            <div className={`w-12 h-12 rounded-xl bg-${color}-50 dark:bg-${color}-700 flex items-center justify-center`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            <div className="">  
                <h3 className="text-2xl font-bold  mb-1">{value}</h3>
                <p className="text-gray-600 text-sm">{title}</p>
                {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
        </div>
    </div>
);

const StatCardGrid = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Consultations"
                value="1215"
                icon={Users}
                color="blue"
                trend="+5%"
            />
            <StatCard
                title="Procedures"
                value="345"
                icon={Activity}
                color="green"
                trend="+12%"
            />
            <StatCard
                title="Treatments"
                value="93"
                icon={Target}
                color="yellow"
                trend="+8%"
            />
            <StatCard
                title="Patients"
                value="71"
                icon={User}
                color="red"
                trend="+15%"
            />
        </div>
    );
};

export default StatCardGrid;
