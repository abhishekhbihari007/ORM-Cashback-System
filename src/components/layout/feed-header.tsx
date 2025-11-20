"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAnimation } from "@/contexts/AnimationContext";
import { LogoIcon } from "@/components/ui/logo-icon";
import { FaBell, FaUser } from "react-icons/fa6";

export function FeedHeader() {
  const { user } = useAuth();
  const { triggerGraphAnimation } = useAnimation();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Deals", href: "/feed" },
    { label: "For Sellers", href: "/for-sellers" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between relative py-2">
        {/* Hamburger - mobile */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col items-start justify-center gap-1 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-110 z-50 lg:hidden"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${mobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${mobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        {/* Left Side - Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 ml-10 sm:ml-12 lg:ml-0" onClick={() => {
          triggerGraphAnimation();
        }}>
          <LogoIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
          <p className="text-lg sm:text-xl md:text-2xl text-slate-900">
            <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
          </p>
        </Link>

        {/* Navigation Links - Show directly in navbar (hidden on mobile, show on tablet+) */}
        <nav className="hidden lg:flex items-center gap-3 md:gap-4 lg:gap-6 ml-4 md:ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              onClick={() => {
                if (link.label === "Home" || link.href === "/") {
                  triggerGraphAnimation();
                }
              }}
              className={`text-xs sm:text-sm md:text-base font-semibold transition ${
                pathname === link.href
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side - User Avatar & Notification */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Bell */}
          <button className="relative p-1.5 sm:p-2 rounded-full hover:bg-slate-100 transition-colors">
            <FaBell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <FaUser size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="hidden sm:inline md:block text-xs sm:text-sm font-semibold text-slate-900">{user.name}</span>
            </div>
          ) : (
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <FaUser size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 right-0 bottom-0 z-40 overflow-y-auto transition-transform duration-300 ease-in-out bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden ${
        mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full p-6 max-w-4xl mx-auto relative">
          <div className="flex flex-col gap-8 sm:gap-10 mt-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  closeMobileNav();
                  if (link.href === "/" || link.href === "/feed") {
                    triggerGraphAnimation();
                  }
                }}
                className="text-3xl sm:text-4xl font-black text-slate-800"
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  href="/signup"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl font-black text-slate-800"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl font-black text-slate-800"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  closeMobileNav();
                }}
                className="text-3xl sm:text-4xl font-black text-left text-slate-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

