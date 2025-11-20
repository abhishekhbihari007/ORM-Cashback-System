"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAnimation } from "@/contexts/AnimationContext";
import { FaUser } from "react-icons/fa6";
import { LogoIcon } from "@/components/ui/logo-icon";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { triggerGraphAnimation } = useAnimation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);

  // Hide header on auth pages and feed page (uses custom header)
  // Keep header visible on for-sellers and how-it-works pages
  if (pathname === "/login" || pathname === "/signup" || pathname === "/feed" || pathname.startsWith("/feed/")) {
    return null;
  }

  // Define navigation links based on authentication state and role
  const getNavLinks = () => {
    if (!user) {
      // Not logged in - public navigation
      return [
        { label: "Home", href: "/" },
        { label: "Browse Deals", href: "/feed" },
        { label: "For Sellers", href: "/for-sellers" },
        { label: "How It Works", href: "/how-it-works" },
      ];
    }

    if (user.role === "user") {
      // User logged in
      return [
        { label: "Deals Feed", href: "/feed" },
        { label: "My Wallet", href: "/wallet" },
        { label: "Upload Proof", href: "/upload" },
      ];
    }

    if (user.role === "brand") {
      // Brand logged in
      return [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create Campaign", href: "/dashboard/create-campaign" },
        { label: "Reports", href: "/dashboard/reports" },
      ];
    }

    if (user.role === "admin") {
      // Admin logged in
      return [
        { label: "Master View", href: "/admin" },
        { label: "Verifier Tool", href: "/admin/verifier" },
        { label: "Payouts", href: "/admin/payouts" },
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
                      pathname.startsWith("/admin");
  
  return (
    <header className={`${isHomePage ? 'absolute' : 'sticky'} top-0 left-0 right-0 z-40 w-full ${
      isHomePage ? 'bg-transparent' : isLightPage ? 'bg-white border-b border-slate-200' : 'bg-slate-900/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between relative py-2">
        {/* Hamburger Menu - Show on all pages for smaller screens, always on home page */}
        <button 
          className={`absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-start justify-center gap-1 w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-110 z-[60] ${
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
          className={`flex items-center gap-1.5 sm:gap-2 ${isHomePage ? 'ml-12 sm:ml-14 md:ml-16 lg:ml-20' : 'ml-10 sm:ml-12 lg:ml-0'}`}
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

        {/* Right Side - Only show user info if logged in */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-4">
            {user.role === "user" && (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <FaUser size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span className={`hidden sm:inline text-sm sm:text-base font-semibold ${isHomePage || isLightPage ? 'text-slate-900' : 'text-white'}`}>{user.name}</span>
              </div>
            )}
            <button
              onClick={logout}
              className={`rounded-full border px-3 py-1.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-semibold transition ${
                isHomePage || isLightPage
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-50' 
                  : 'border-slate-700/50 text-white hover:bg-slate-700/50'
              }`}
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </button>
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
                  href="/login"
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
              <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
                {user.role === "user" && (
                  <div className="flex items-center gap-3 text-gray-900">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-400">
                      <FaUser size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <span
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {user.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMobileNav();
                  }}
                  className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black transition text-left leading-tight text-gray-800 hover:text-gray-900"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

