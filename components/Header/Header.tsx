"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/lib/auth";
import AuthModal from "@/components/modals/AuthModal";
import Button from "@/components/ui/Button";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [authModalType, setAuthModalType] = useState<
    "login" | "register" | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Log out of your account
  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/psychologists", label: "Psychologists" },
    // Favourites only for authorised users
    ...(isAuthenticated ? [{ href: "/favorites", label: "Favorites" }] : []),
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
                  className={`relative pb-3 transition-colors text-[#191a15] hover:text-[#54be96] ${
                    pathname === link.href ? "text-[#191a15]" : ""
                  }`}
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

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              // Authorised user
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* User avatar icon */}
                  <span className="w-10 h-10 flex items-center justify-center bg-[#54be96] text-white rounded-xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {/* User name */}
                  <span className="font-medium text-[#191a15]">
                    {user?.displayName || "User"}
                  </span>
                </div>
                {/* Log out button */}
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 font-medium text-[#191a15] border border-[#191a15]/20 rounded-full transition-colors hover:border-[#191a15]/40"
                >
                  Log out
                </button>
              </div>
            ) : (
              // Unauthorised user
              <>
                <button
                  onClick={() => setAuthModalType("login")}
                  className="px-6 py-2.5 font-medium text-[#191a15] border border-[#191a15]/20 rounded-full transition-colors hover:border-[#191a15]/40"
                >
                  Log In
                </button>
                <Button onClick={() => setAuthModalType("register")}>
                  Registration
                </Button>
              </>
            )}
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
          <nav className="fixed top-0 right-0 w-[300px] h-full bg-white z-50 p-6 pt-24 flex flex-col gap-6 md:hidden animate-slideIn">
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#191a15"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Navigation links */}
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

            {/* Auth buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center bg-[#54be96] text-white rounded-xl">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-medium text-[#191a15]">
                      {user?.displayName || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 font-medium text-[#191a15] border border-[#191a15]/20 rounded-full transition-colors hover:border-[#191a15]/40"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthModalType("login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 font-medium text-[#191a15] border border-[#191a15]/20 rounded-full transition-colors hover:border-[#191a15]/40"
                  >
                    Log In
                  </button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setAuthModalType("register");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Registration
                  </Button>
                </>
              )}
            </div>
          </nav>
        </>
      )}

      {/* ===== AUTH MODAL ===== */}
      <AuthModal
        isOpen={authModalType !== null}
        onClose={() => setAuthModalType(null)}
        type={authModalType}
        onSwitchType={setAuthModalType}
      />
    </header>
  );
}
