"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/psychologists", label: "Psychologists" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#191a15]/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* ===== LOGO ===== */}
        <Link
          href="/"
          className="flex items-center text-lg sm:text-xl font-semibold"
        >
          <span className="text-[#54be96]">psychologists</span>
          <span className="text-[#191a15]">.services</span>
        </Link>

        {/* ===== DESKTOP NAVIGATION ===== */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-2 transition-colors text-[#191a15] hover:text-[#54be96]`}
                >
                  {link.label}
                  {/* Active indicator - green dot */}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#54be96] rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Кнопки авторизації (будуть функціональні пізніше) */}
          <div className="flex items-center gap-2">
            <button className="px-6 py-2.5 font-medium text-[#191a15] border border-[#191a15]/20 rounded-full transition-colors hover:border-[#191a15]/40">
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
            className={`w-full h-0.5 rounded bg-[#191a15] transition-all ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 rounded bg-[#191a15] transition-all ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 rounded bg-[#191a15] transition-all ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
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
                    className={`flex items-center gap-2 py-2 text-[#191a15] ${
                      pathname === link.href ? "font-medium" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="w-2 h-2 bg-[#54be96] rounded-full" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-auto">
              <button className="w-full px-6 py-3 font-medium text-[#191a15] border border-[#191a15]/20 rounded-full">
                Log In
              </button>
              <Button className="w-full">Registration</Button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}