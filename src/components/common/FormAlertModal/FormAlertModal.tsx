"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, X } from "lucide-react";
import "./FormAlertModal.scss";

export interface FormAlertModalProps {
  isOpen: boolean;
  type?: "error" | "success" | "warning";
  title?: string;
  message: string;
  onClose: () => void;
  confirmText?: string;
}

export function FormAlertModal({
  isOpen,
  type = "error",
  title,
  message,
  onClose,
  confirmText = "Try Again",
}: FormAlertModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultTitles: Record<string, string> = {
    error: "Submission Error",
    success: "Success",
    warning: "Notice",
  };

  const displayTitle = title || defaultTitles[type] || "Alert";

  return (
    <div
      className="form-alert-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-desc"
      onClick={onClose}
    >
      <div
        className={`form-alert-modal form-alert-modal--${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="form-alert-close-btn"
          onClick={onClose}
          aria-label="Close alert"
        >
          <X size={18} />
        </button>

        <div className="form-alert-icon-wrap" aria-hidden="true">
          {type === "error" && <AlertCircle size={28} className="form-alert-icon" />}
          {type === "success" && <CheckCircle2 size={28} className="form-alert-icon" />}
          {type === "warning" && <AlertTriangle size={28} className="form-alert-icon" />}
        </div>

        <div className="form-alert-content">
          <h3 id="alert-dialog-title" className="form-alert-title">
            {displayTitle}
          </h3>
          <p id="alert-dialog-desc" className="form-alert-message">
            {message}
          </p>
        </div>

        <div className="form-alert-actions">
          <button
            type="button"
            className="form-alert-action-btn"
            onClick={onClose}
            autoFocus
          >
            {type === "error" ? confirmText : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
