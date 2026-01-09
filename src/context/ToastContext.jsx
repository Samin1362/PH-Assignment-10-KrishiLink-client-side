import React, { createContext } from "react";
import { ToastContainer } from "../components/Toast";
import { useToast as useToastHook } from "../hooks/useToast";

const ToastContext = createContext();

export { ToastContext };

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

