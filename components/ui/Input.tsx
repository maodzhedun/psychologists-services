"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = "text",
      showPasswordToggle,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Визначаємо тип input
    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="flex flex-col">
        {/* Label */}
        {label && (
          <label className="mb-2 text-sm font-medium text-[#191a15]">
            {label}
          </label>
        )}

        <div className="relative">
          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full px-[18px] py-4 text-base text-[#191a15] bg-white
              border rounded-xl transition-colors
              placeholder:text-[#191a15]/50
              focus:outline-none focus:border-[#54be96]
              ${error ? "border-red-500" : "border-[#191a15]/20"}
              ${showPasswordToggle ? "pr-12" : ""}
              ${className}
            `}
            {...props}
          />

          {/* Toggle password button */}
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#191a15] hover:text-[#54be96] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye open icon
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Eye closed icon
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.7667 11.7667C11.5378 12.0123 11.2618 12.2093 10.9551 12.3459C10.6485 12.4826 10.3176 12.556 9.98172 12.5619C9.6458 12.5679 9.31244 12.5061 9.00091 12.3803C8.68939 12.2545 8.40632 12.0672 8.16841 11.8293C7.9305 11.5914 7.74318 11.3083 7.61741 10.9968C7.49164 10.6853 7.42979 10.3519 7.43577 10.016C7.44175 9.68009 7.51516 9.34919 7.65181 9.04257C7.78847 8.73594 7.98546 8.45989 8.23101 8.23101"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.40833 4.3C8.9311 4.21317 9.46021 4.16902 9.99083 4.16834C15 4.16834 17.5 10 17.5 10C17.1227 10.7819 16.6541 11.5153 16.1033 12.1833"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.6 5.6C3.95083 6.90667 2.6925 8.63917 2.5 10C2.5 10 5 15.8333 10 15.8333C11.4741 15.8385 12.9168 15.4126 14.1667 14.6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 2.5L17.5 17.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
