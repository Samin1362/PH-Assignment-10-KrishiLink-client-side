import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

/**
 * Custom hook to access Toast context
 * Must be used within ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

