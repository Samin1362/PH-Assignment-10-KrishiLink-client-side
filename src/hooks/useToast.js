import { useState } from "react";

// Toast Hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message, duration) =>
    addToast(message, "success", duration);
  const showError = (message, duration) => addToast(message, "error", duration);

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    addToast,
  };
};

