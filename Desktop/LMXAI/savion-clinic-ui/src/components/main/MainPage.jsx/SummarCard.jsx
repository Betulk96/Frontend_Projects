import React from 'react'
import { MdTrendingDown, MdTrendingUp } from 'react-icons/md'

const SummaryCard = ({ title, value, icon: Icon, color = "blue", trend = null, trendDirection = null }) => {
    return (
        <div className=" p-6 rounded-2xl shadow-md border border-gray-100  dark:border-color33 dark:shadow-color2/10 shadow-color6/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-${color}-100`}>
                        <Icon className={` text-${color}-600`} />
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">{title}</p>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-3xl  ">{value}</h2>
                            {trend && (
                                <div className={`flex items-center text-sm ${trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {trendDirection === 'up' ? <MdTrendingUp /> : <MdTrendingDown />}
                                    <span className="ml-1">{trend}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard
