"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

const PatientHistoryDropdown = ({ chatHistory, anchorEl, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // dışarı tıklama kontrolü
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorEl &&
        !anchorEl.contains(e.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorEl]);

  if (!mounted || !anchorEl) return null;

  const rect = anchorEl.getBoundingClientRect();

  return createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-[9999] w-64 bg-white dark:bg-gray-800 
                 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      style={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 256 + window.scrollX,
        position: "absolute",
      }}
    >
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {chatHistory.map((chat) => (
          <li
            key={chat.id}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
            onClick={() => {
              alert(`Seçilen history: ${chat.title}`);
              onClose();
            }}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
};

export default PatientHistoryDropdown;
