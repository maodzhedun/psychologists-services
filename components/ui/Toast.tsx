"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "info",
  isOpen,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen && !isVisible) return null;

  const bgColors = {
    success: "bg-[#54be96]",
    error: "bg-red-500",
    info: "bg-[#4535af]",
  };

  const icons = {
    success: "check",
    error: "close-sm",
    info: "info",
  } as const;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slideIn">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white
          ${bgColors[type]}
          ${isVisible ? "opacity-100" : "opacity-0"}
          transition-opacity duration-300
        `}
      >
        <Icon name={icons[type]} size={20} />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 hover:opacity-80 transition-opacity"
        >
          <Icon name="close-sm" size={16} />
        </button>
      </div>
    </div>
  );
}
