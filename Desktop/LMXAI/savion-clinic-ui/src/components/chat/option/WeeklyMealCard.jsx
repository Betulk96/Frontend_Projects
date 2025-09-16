import Image from "next/image";
import { useState } from "react";

const meals = {
    0: { title: "Grilled Chicken Salad", img: "https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/128/32395-green-salad-icon.png" },
    1: { title: "Vegan Bowl", img: "https://icons.iconarchive.com/icons/aha-soft/desktop-buffet/128/Salad-icon.png" },
    2: { title: "Beef Steak", img: "https://icons.iconarchive.com/icons/aha-soft/desktop-buffet/128/Steak-icon.png" },
    3: { title: "Pasta Primavera", img: "https://icons.iconarchive.com/icons/lemon-liu/recipes/128/recipe-noodles-pasta-icon.png" },
    4: { title: "Tofu Stir Fry", img: "https://icons.iconarchive.com/icons/lemon-liu/recipes/128/recipe-soup-tomato-icon.png" },
    5: { title: "Vegan Pizza", img: "https://icons.iconarchive.com/icons/aha-soft/desktop-buffet/128/Pizza-icon.png" },
    6: { title: "Vegan Pasta", img: "https://icons.iconarchive.com/icons/lemon-liu/recipes/128/recipe-noodles-pasta-icon.png" },
};

function getNext5Days() {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d;
    });
}

export default function WeeklyMealCard() {
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const days = getNext5Days();
    const meal = meals[selectedDayIndex];

    return (
        <div>
            {/* Meal Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                    <p className="font-medium text-gray-700 dark:text-gray-300">{meal.title}</p>
                </div>
                <Image

                    width={48}
                    height={48}
                    src={meal.img}
                    alt={meal.title}
                    className="w-12 h-12 object-cover rounded-full"
                />
            </div>

            {/* Label */}
            {/* <div className="mt-2 text-xs text-gray-400">
                <p>Contents</p>
                <p>Calories: 500</p>
                <p>Carbs: 50g</p>
                <p>Proteins: 50g</p>
            </div> */}

            {/* Date Buttons */}
            <div className="flex gap-2 overflow-hidden mt-2 ">

                {days.map((day, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedDayIndex(i)}
                        className={`w-auto px-2 py-1 rounded-xl flex items-center justify-center text-xs  ${selectedDayIndex === i
                                ? "bg-orange-400 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                    >
                        {day.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </button>
                ))}
            </div>
        </div>
    );
}
