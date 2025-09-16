import React from 'react'
import { MdOutlineFastfood } from 'react-icons/md'

const FoodLogCard = ({ log }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white/20backdrop-blur-md dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow hover:bg-color1/50 dark:hover:bg-color22">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <MdOutlineFastfood className="text-white" />
                </div>
                <div>
                    <h4 className=" ">{log.patient}</h4>
                    <p className="text-sm text-gray-500">{log.date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className=" text-lg ">{log.calories} kcal</p>
                <p className={`text-xs ${log.status === 'normal' ? 'text-green-600' : log.status === 'high' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {log.status === 'normal' ? 'Hedef dahilinde' : log.status === 'high' ? 'Hedefin üstünde' : 'Hedefin altında'}
                </p>
            </div>
        </div>
    )
}

export default FoodLogCard
