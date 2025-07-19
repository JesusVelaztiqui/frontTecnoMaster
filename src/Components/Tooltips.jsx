import React, { useState, useEffect } from "react";
import { CheckCircle, Info, AlertTriangle, X, Command } from "lucide-react";

const CustomTooltip = ({
  type = "info",
  title,
  message,
  isVisible,
  onClose,
  duration = 5000,
  showKeyboardShortcut = false,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      setTimeout(() => onClose(), 300);
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bgClass: "cts-success-bg",
          borderClass: "cts-success-border",
          iconClass: "cts-success-icon",
          icon: CheckCircle,
        };
      case "info":
        return {
          bgClass: "cts-info-bg",
          borderClass: "cts-info-border",
          iconClass: "cts-info-icon",
          icon: Info,
        };
      case "warning":
        return {
          bgClass: "cts-warning-bg",
          borderClass: "cts-warning-border",
          iconClass: "cts-warning-icon",
          icon: AlertTriangle,
        };
      case "error":
        return {
          bgClass: "cts-error-bg",
          borderClass: "cts-error-border",
          iconClass: "cts-error-icon",
          icon: X,
        };
      default:
        return {
          bgClass: "cts-default-bg",
          borderClass: "cts-default-border",
          iconClass: "cts-default-icon",
          icon: Info,
        };
    }
  };

  if (!isVisible || !show) return null;

  const styles = getStyles();
  const IconComponent = styles.icon;

  return (
    <div className="cts-container">
      <div className={`cts-box ${styles.bgClass} ${styles.borderClass}`}>
        <div className={`cts-icon ${styles.iconClass}`}>
          <IconComponent size={24} />
        </div>
        <div className="cts-content">
          <p className="cts-title">{title}</p>
          <p className="cts-message">
            {message}
            {showKeyboardShortcut && type === "info" && (
              <span className="cts-shortcut">
                <Command size={12} /> T
              </span>
            )}
          </p>
        </div>
        <button className="cts-close" onClick={handleClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CustomTooltip;
