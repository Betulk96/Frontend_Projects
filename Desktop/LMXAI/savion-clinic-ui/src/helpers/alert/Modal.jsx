import React from "react";

const Modal = ({
  isOpen,
  title,
  text,
  children,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-40">
      <div className="bg-color7 dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full ">
        <h2 className="  mb-2">{title}</h2>
        {text && <p className="text-gray-600 mb-4">{text}</p>}
        {children}
        <div className="flex justify-end gap-2 mt-4 text-black  ">
          {showCancel && (
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            className="px-4 py-2 bg-color4 rounded text-white hover:bg-color2"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
