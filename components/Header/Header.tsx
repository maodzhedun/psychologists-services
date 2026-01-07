"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we are on the main page (to change the colour)
  const isHomePage = pathname === "/";

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/psychologists", label: "Psychologists" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 ${
        isHomePage ? "bg-[#54be96]" : "bg-white border-b border-[#191a15]/10"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* ===== LOGO ===== */}
        <Link
          href="/"
          className="flex items-center gap-1 text-lg sm:text-xl font-semibold"
        >
          <span
            className={`flex items-center ${
              isHomePage ? "text-white" : "text-[#54be96]"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="currentColor" />
              <path
                d="M8 14C8 10.6863 10.6863 8 14 8C17.3137 8 20 10.6863 20 14"
                stroke={isHomePage ? "#54be96" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className={isHomePage ? "text-white" : "text-[#191a15]"}>
            psychologists.
          </span>
          <span className={isHomePage ? "text-white" : "text-[#54be96]"}>
            services
          </span>
        </Link>

        {/* ===== DESKTOP NAVIGATION ===== */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    isHomePage
                      ? "text-white hover:opacity-80"
                      : "text-[#191a15] hover:text-[#54be96]"
                  } ${
                    pathname === link.href
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Authorisation buttons (will be  later) */}
          <div className="flex items-center gap-2">
            <button
              className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                isHomePage
                  ? "text-white hover:opacity-80"
                  : "text-[#191a15] hover:text-[#54be96]"
              }`}
            >
              Log In
            </button>
            <Button>Registration</Button>
          </div>
        </nav>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-0.5 rounded transition-all ${
              isHomePage ? "bg-white" : "bg-[#191a15]"
            } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-full h-0.5 rounded transition-all ${
              isHomePage ? "bg-white" : "bg-[#191a15]"
            } ${isMobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-full h-0.5 rounded transition-all ${
              isHomePage ? "bg-white" : "bg-[#191a15]"
            } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu */}
          <nav className="fixed top-0 right-0 w-[300px] h-full bg-white z-50 p-6 pt-24 flex flex-col gap-6 md:hidden">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-[#191a15] ${
                      pathname === link.href ? "font-medium text-[#54be96]" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-auto">
              <Button variant="secondary" className="w-full">
                Log In
              </Button>
              <Button className="w-full">Registration</Button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
