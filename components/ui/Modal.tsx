"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  // Закриття по Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Закриття по кліку на backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Додаємо/видаляємо слухачі та блокуємо скрол
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  // Не рендеримо якщо закрито
  if (!isOpen) return null;

  // Контент модалки
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[566px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 md:p-16">
        {/* Кнопка закриття */}
        <button
          type="button"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#191a15] hover:text-[#54be96] transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M24 8L8 24M8 8L24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Заголовок */}
        {title && (
          <h2 className="text-3xl md:text-[40px] font-medium leading-tight text-[#191a15] mb-5 pr-10">
            {title}
          </h2>
        )}

        {/* Контент */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );

  // Рендеримо через портал
  if (typeof window === "undefined") return null;

  return createPortal(modalContent, document.body);
}
