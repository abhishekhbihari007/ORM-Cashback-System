"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAnimation } from "@/contexts/AnimationContext";
import { FaUser, FaRightFromBracket } from "react-icons/fa6";
import { LogoIcon } from "@/components/ui/logo-icon";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { triggerGraphAnimation } = useAnimation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);
  const toggleAccountDropdown = () => setAccountDropdownOpen((prev) => !prev);
  const closeAccountDropdown = () => setAccountDropdownOpen(false);

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

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      closeAccountDropdown();
    }
  };

  // Hide header on auth pages and pages that use FeedHeader
  // Keep header visible on for-sellers and how-it-works pages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/feed" ||
    pathname.startsWith("/feed/") ||
    pathname === "/profile" ||
    pathname === "/upload" ||
    pathname === "/wallet" ||
    pathname === "/user" ||
    pathname.startsWith("/user/")
  ) {
    return null;
  }

  // Define navigation links based on authentication state and role
  const getNavLinks = () => {
    if (!user) {
      // Not logged in - public navigation
      return [
        { label: "Home", href: "/" },
        { label: "For Sellers", href: "/for-sellers" },
        { label: "How It Works", href: "/how-it-works" },
      ];
    }

    if (user.role === "user") {
      // User logged in - no Home button
      return [
        { label: "Browse Deals", href: "/feed" },
        { label: "My Wallet", href: "/wallet" },
        { label: "Upload Proof", href: "/upload" },
        { label: "How It Works", href: "/how-it-works" },
      ];
    }

    if (user.role === "brand") {
      // Brand logged in - no Home button
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create Campaign", href: "/dashboard/create-campaign" },
        { label: "Reports", href: "/dashboard/reports" },
        { label: "How It Works", href: "/how-it-works" },
      ];
    }

    // Enterprise feature hidden for now - will be enabled after launch
    // if (user.role === "enterprise") {
    //   return [
    //     { label: "Enterprise Home", href: "/enterprise" },
    //     { label: "Brands", href: "/enterprise/brands" },
    //     { label: "Analytics", href: "/enterprise/analytics" },
    //     { label: "Team", href: "/enterprise/team" },
    //   ];
    // }

    if (user.role === "admin") {
      // Admin logged in - no Home button
      return [
        { label: "Master View", href: "/admin" },
        { label: "Verifier Tool", href: "/admin/verifier" },
        { label: "Payouts", href: "/admin/payouts" },
        { label: "How It Works", href: "/how-it-works" },
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();
  const isHomePage = pathname === "/";
  // Pages with light backgrounds need dark navbar text
  const isLightPage = pathname === "/feed" || 
                      pathname.startsWith("/feed/") || 
                      pathname === "/wallet" || 
                      pathname === "/upload" || 
                      pathname.startsWith("/user/") ||
                      pathname === "/for-sellers" ||
                      pathname === "/how-it-works" ||
                      pathname.startsWith("/dashboard") ||
                      pathname.startsWith("/admin") ||
                      pathname.startsWith("/enterprise");

  return (
    <header className={`${isHomePage ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-40 w-full ${
      isHomePage ? 'bg-transparent' : isLightPage ? 'bg-white border-b border-slate-200' : 'bg-slate-900/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between relative py-2">
        {/* Hamburger Menu - Show on all pages for smaller screens, always on home page */}
        <button 
          className={`absolute left-0 sm:left-1.5 md:left-3 lg:left-6 top-1/2 -translate-y-1/2 -translate-x-full flex flex-col items-start justify-center gap-1 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-110 z-[60] ${
            isHomePage ? '' : 'lg:hidden'
          }`}
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 transition-all duration-300 ease-in-out ${
            isHomePage || isLightPage ? 'bg-slate-900' : 'bg-white'
          } ${mobileNavOpen ? 'w-5 sm:w-6 rotate-45 translate-y-1.5' : 'w-4 sm:w-5'}`} />
          <span className={`h-0.5 transition-all duration-300 ease-in-out ${
            isHomePage || isLightPage ? 'bg-slate-900' : 'bg-white'
          } ${mobileNavOpen ? 'w-5 sm:w-6 -rotate-45 -translate-y-1.5' : 'w-5 sm:w-6'}`} />
        </button>
        
        {/* Logo - Center/Left */}
        <Link 
          href="/" 
          className={`flex items-center gap-1.5 sm:gap-2 ${isHomePage ? 'ml-6 sm:ml-8 md:ml-10 lg:ml-12' : 'ml-4 sm:ml-6 lg:ml-0'}`}
          onClick={() => {
            closeMobileNav();
            triggerGraphAnimation();
          }}
        >
          <LogoIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" />
          <div>
            <p className={`text-lg sm:text-xl md:text-2xl ${isHomePage || isLightPage ? 'text-slate-900' : 'text-white'}`}>
              <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
            </p>
          </div>
        </Link>

        {/* Navigation Links - Show directly in navbar on non-home pages (hidden on mobile, show on tablet+) */}
        {!isHomePage && (
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
                    ? isLightPage ? "text-slate-900" : "text-white"
                    : isLightPage ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        )}

        {/* Right Side - Account Button with Dropdown */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${
                  isHomePage || isLightPage ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  <FaUser size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span className={`hidden sm:inline md:block text-xs sm:text-sm font-semibold ${
                  isHomePage || isLightPage ? 'text-slate-900' : 'text-white'
                }`}>{user.name}</span>
              </button>

              {/* Dropdown Menu */}
              {accountDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-2 z-50 ${
                  isHomePage || isLightPage 
                    ? 'bg-white border-slate-200' 
                    : 'bg-slate-800 border-slate-700'
                }`}>
                  <Link
                    href="/profile"
                    onClick={() => {
                      closeAccountDropdown();
                    }}
                    className={`flex items-center gap-3 px-4 py-2 text-sm transition ${
                      isHomePage || isLightPage
                        ? 'text-slate-700 hover:bg-slate-50'
                        : 'text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <FaUser size={16} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition text-left ${
                      isHomePage || isLightPage
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-red-400 hover:bg-red-900/20'
                    }`}
                  >
                    <FaRightFromBracket size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        </div>

      {/* Mobile Menu - Slides in from left covering full screen - Show on all pages for smaller screens */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white/95 backdrop-blur-xl shadow-2xl`}
      >
        <div className="h-full p-4 sm:p-6 md:p-8 max-w-7xl mx-auto relative">
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 mt-12 sm:mt-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => {
                  closeMobileNav();
                  if (link.label === "Home" || link.href === "/") {
                    triggerGraphAnimation();
                  }
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition leading-tight text-gray-800 hover:text-gray-900"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {link.label}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  href="/signup"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition leading-tight text-gray-800 hover:text-gray-900"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login?tab=brands"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition leading-tight text-gray-800 hover:text-gray-900"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={closeMobileNav}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition leading-tight text-gray-800 hover:text-gray-900"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    closeMobileNav();
                    handleLogout();
                  }}
                  className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition text-left leading-tight text-gray-800 hover:text-gray-900"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
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

