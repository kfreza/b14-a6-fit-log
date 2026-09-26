"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

type ToastType = "success" | "info" | "error";
type Toast = { id: number; message: string; type: ToastType };

type ToastContextValue = (message: string, type?: ToastType) => void;

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS = {
  success: FiCheckCircle,
  info: FiInfo,
  error: FiAlertCircle,
};

const STYLES: Record<ToastType, string> = {
  success: "border-lime/40 text-white",
  info: "border-line-strong text-white",
  error: "border-error/50 text-white",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const toast = useCallback<ToastContextValue>((message, type = "success") => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast toast-end toast-bottom z-100" aria-live="polite">
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          return (
            <div
              key={t.id}
              role="status"
              className={`alert bg-surface border shadow-lg shadow-black/40 text-sm ${STYLES[t.type]}`}
            >
              <Icon
                className={t.type === "error" ? "text-error" : "text-lime"}
                size={18}
                aria-hidden
              />
              <span>{t.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
