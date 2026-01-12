"use client";

import { useState, useRef, useEffect } from "react";
import { FilterValue, FilterOption } from "@/types";

interface FilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

// Filter options
const filterOptions: FilterOption[] = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "price-asc", label: "Less than 10$" },
  { value: "price-desc", label: "Greater than 10$" },
  { value: "rating-desc", label: "Popular" },
  { value: "rating-asc", label: "Not popular" },
  { value: "default", label: "Show all" },
];

export default function Filter({ value, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Currently selected option
  const selectedOption =
    filterOptions.find((opt) => opt.value === value) || filterOptions[6];

  // Closing the dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: FilterValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 mb-6 sm:mb-8">
      <label className="text-sm font-medium text-[#8a8a89]">Filters</label>

      <div ref={dropdownRef} className="relative w-full max-w-[226px]">
        {/* Button dropdown - rounded-[30px] */}
        <button
          type="button"
          className={`
            w-full flex items-center justify-between gap-2
            px-[18px] py-3.5 font-medium text-white
            bg-[#54be96] rounded-[30px] transition-colors
            hover:bg-[#36a379]
            ${isOpen ? "bg-[#36a379]" : ""}
          `}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span>{selectedOption.label}</span>
          <svg
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg p-2 z-10 animate-slideDown">
            {filterOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`
                    w-full px-4 py-3 text-base text-left rounded-lg transition-colors
                    hover:bg-[#f3f3f3] hover:text-[#191a15]
                    ${
                      option.value === value
                        ? "text-[#191a15] font-medium"
                        : "text-[#191a15]/50"
                    }
                  `}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
