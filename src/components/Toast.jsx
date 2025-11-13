import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Toast = ({ message, type = "success", duration = 4000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100);
        if (newProgress <= 0) {
          clearInterval(progressInterval);
          handleClose();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, isPaused]);

  const toastConfig = {
    success: {
      bgColor: "bg-white",
      borderColor: "border-[#4CAF50]",
      iconBg: "bg-[#4CAF50]",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      progressColor: "bg-[#4CAF50]",
      title: "Success!",
      animation: "animate-slideInRight",
    },
    error: {
      bgColor: "bg-white",
      borderColor: "border-red-500",
      iconBg: "bg-red-500",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      progressColor: "bg-red-500",
      title: "Error!",
      animation: "animate-slideInRight",
    },
  };

  const config = toastConfig[type] || toastConfig.success;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor}
        ${isExiting ? "animate-slideOutRight" : config.animation}
        border-l-4 rounded-lg shadow-2xl p-4 mb-4 
        min-w-[320px] max-w-md
        transition-all duration-300
        hover:shadow-3xl hover:scale-105
        font-[Poppins,sans-serif]
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-start gap-3">
        {/* Icon with animation */}
        <div
          className={`
            ${config.iconBg} 
            shrink-0 w-10 h-10 rounded-full 
            flex items-center justify-center
            animate-scaleIn
            shadow-lg
          `}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 pt-0.5">
          <h4 className="font-semibold text-[#1A1A1A] text-base mb-1">
            {config.title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-2"
          aria-label="Close notification"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.progressColor} transition-all duration-100 ease-linear rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return createPortal(
    <div
      className="fixed top-20 right-4 z-50 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      <div className="pointer-events-auto space-y-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>,
    document.body
  );
};

export default Toast;
