import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", position = "top-end", duration = 2500 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!show) return null;

  const positionClasses = {
    "top-end": "top-4 right-4",
    "top-start": "top-4 left-4",
    "bottom-end": "bottom-4 right-4",
    "bottom-start": "bottom-4 left-4",
  };

  const bgColors = {
    success: "bg-color6",
    error: "bg-red-200/10",
    info: "bg-blue-200/10",
    warning: "bg-yellow-200/10",
  };

  return (
    <div className={`fixed ${positionClasses[position]} textrounded-b-2xl backdrop-blur-md px-4 py-2 z-50 ${bgColors[type]}`}>
      {message}
    </div>
  );
};

export default Toast;
