"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAnimation } from "@/contexts/AnimationContext";
import { LogoIcon } from "@/components/ui/logo-icon";
import notifications from "@/data/notifications";
import { Icons } from "@/lib/icons";

export function FeedHeader() {
  const { user, logout } = useAuth();
  const { triggerGraphAnimation } = useAnimation();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);
  const toggleAccountDropdown = () => setAccountDropdownOpen((prev) => !prev);
  const closeAccountDropdown = () => setAccountDropdownOpen(false);
  const toggleNotificationDropdown = () => setNotificationOpen((prev) => !prev);
  const closeNotificationDropdown = () => setNotificationOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };

    if (accountDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountDropdownOpen]);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      closeAccountDropdown();
    }
  };

  const navLinks = [
    // Only show Home if not logged in
    ...(!user ? [{ label: "Home", href: "/" }] : []),
    ...(user?.role === "user" ? [
      { label: "User Dashboard", href: "/user" },
      { label: "Browse Deals", href: "/feed" },
      { label: "My Wallet", href: "/wallet" },
      { label: "Upload Proof", href: "/upload" },
    ] : []),
    ...(user?.role !== "user" ? [{ label: "For Sellers", href: "/for-sellers" }] : []),
    { label: "How It Works", href: "/how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between relative py-2">
        {/* Hamburger - mobile */}
        <button
          className="flex flex-col items-center justify-center gap-1 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-110 z-50 lg:hidden flex-shrink-0"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-4 sm:w-5 bg-slate-900 transition-all duration-300 ${mobileNavOpen ? 'rotate-45 translate-y-1.5 w-5 sm:w-6' : ''}`} />
          <span className={`h-0.5 w-5 sm:w-6 bg-slate-900 transition-all duration-300 ${mobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>

        {/* Left Side - Logo */}
        <Link 
          href={user?.role === "user" ? "/user" : "/"} 
          className="flex items-center gap-1.5 sm:gap-2 ml-2 sm:ml-4 lg:ml-0" 
          onClick={() => {
            triggerGraphAnimation();
          }}
        >
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

        {/* Right Side - User Avatar with Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {/* Notifications */}
          {user && (
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotificationDropdown}
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 relative"
                aria-label="Notifications"
              >
                <Icons.Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                  {notifications.slice(0, 99).length}
                </span>
              </button>
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">Notifications</p>
                    <button className="text-xs font-medium text-blue-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-6 text-sm text-slate-500 text-center">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((note) => (
                        <div key={note.id} className="px-4 py-3 border-b border-slate-100 last:border-none hover:bg-slate-50 transition">
                          <p className="text-sm font-semibold text-slate-900">{note.title}</p>
                          <p className="mt-0.5 text-xs text-slate-600">{note.message}</p>
                          <p className="mt-1 text-xs text-slate-400">{note.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 text-right border-t border-slate-100">
                    <Link href="/notifications" className="text-xs font-semibold text-blue-600 hover:underline">
                      View all →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Avatar */}
        <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
          {user ? (
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Icons.User className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </div>
                <span className="hidden sm:inline md:block text-xs sm:text-sm font-semibold text-slate-900">{user.name}</span>
              </button>
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => {
                      closeAccountDropdown();
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Icons.User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <Icons.LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <Icons.User className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </div>
          )}
          </div>
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
                  href="/login?tab=brands"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl font-black text-slate-800"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl font-black text-slate-800"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    closeMobileNav();
                    handleLogout();
                  }}
                  className="text-3xl sm:text-4xl font-black text-left text-slate-800"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

