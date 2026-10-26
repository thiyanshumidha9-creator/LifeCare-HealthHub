// Toast Notification System (Lectures 61–66: Toasts & Micro-Interactions)
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = "info", title = "", message = "", duration = 4000 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newToast = { id, type, title, message };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toast = {
    success: (message, title = "Success") => addToast({ type: "success", title, message }),
    error: (message, title = "Error") => addToast({ type: "error", title, message, duration: 5000 }),
    warning: (message, title = "Attention") => addToast({ type: "warning", title, message, duration: 4500 }),
    info: (message, title = "Information") => addToast({ type: "info", title, message })
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="toast-container" role="region" aria-label="Notifications" aria-live="polite">
        {toasts.map((item) => {
          let icon = "ℹ️";
          if (item.type === "success") icon = "✅";
          if (item.type === "error") icon = "⚠️";
          if (item.type === "warning") icon = "🔔";

          return (
            <div key={item.id} className={`toast toast-${item.type}`} role="alert">
              <span className="toast-icon">{icon}</span>
              <div className="toast-content">
                {item.title && <h4>{item.title}</h4>}
                {item.message && <p>{item.message}</p>}
              </div>
              <button
                type="button"
                className="toast-dismiss"
                onClick={() => removeToast(item.id)}
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
}

export default ToastContext;
