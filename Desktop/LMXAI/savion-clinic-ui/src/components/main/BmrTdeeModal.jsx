"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import BmrTdeeCalculate from "./BmrTdeeCalculate";


export default function BmrTdeeModal({ onClose }) {
  useEffect(() => {
    const escClose = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", escClose);
    return () => window.removeEventListener("keydown", escClose);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
       className="fixed inset-0 z-50  bg-black/20  flex items-center justify-start"
      onClick={onClose}
    >
      <div

        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3  text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <BmrTdeeCalculate />
      </div>
    </div>,
    document.body
  );
}
