import React, { useState } from "react";
import Image from "next/image";

export default function ToolOutputButton({ entry }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [faviconError, setFaviconError] = useState(false);

    function cleanAndTruncateText(text, maxLength = 40) {
        const cleaned = text.replace(/^[A-Z][a-z]{2} \d{1,2}, \d{4} \s*\.\.\.\s*/g, "");
        return cleaned.length > maxLength ? cleaned.slice(0, maxLength) + "..." : cleaned;
    }

    // favicon url
    const faviconUrl = entry.url
        ? `https://www.google.com/s2/favicons?domain=${new URL(entry.url).hostname}`
        : null;

    // fallback url
    const defaultIcon = "/logos/Size=Dark.svg";

    return (
        <div className="relative inline-block">
            <button
                onClick={() => {
                    if (entry.url) {
                        window.open(entry.url, "_blank");
                    } else {
                        alert("This snippet does not contain a valid URL.");
                    }
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="p-3 min-w-[2rem] h-10 px-3 flex items-center justify-center border-2 border-color2 dark:border-color22 rounded-3xl text-left bg-transparent transition-all duration-300 shadow-md shadow-color22 hover:shadow-lg hover:shadow-color33 dark:hover:shadow-2xl dark:hover:shadow-color33 glow-border-effect cursor-pointer"
            >
                <Image
                    src={faviconError || !faviconUrl ? defaultIcon : faviconUrl}
                    alt="favicon"
                    width={20}
                    height={20}
                    className="w-5 h-5 bg-white"
                    onError={() => setFaviconError(true)}
                />
            </button>

            {/* Tooltip */}
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap z-[999]">
                    {cleanAndTruncateText(entry.text, 40)}
                </div>
            )}
        </div>
    );
}
