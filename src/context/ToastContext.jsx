import React, { createContext, useContext } from "react";
import { ToastContainer } from "../components/Toast";
import { useToast as useToastHook } from "../hooks/useToast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const { toasts, removeToast, showSuccess, showError, addToast } =
    useToastHook();

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, addToast, toasts, removeToast }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

