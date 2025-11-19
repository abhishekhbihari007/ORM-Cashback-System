"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAnimation } from "@/contexts/AnimationContext";
import { FaUser } from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LogoIcon } from "@/components/ui/logo-icon";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { triggerGraphAnimation } = useAnimation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);

  // Hide header on auth pages
  if (pathname === "/login" || pathname === "/signup") {
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between py-6 relative">
        {/* Hamburger Menu - Far Left */}
        <button 
          className="fixed left-1 md:left-2 top-6 flex flex-col items-start justify-center gap-1.5 w-10 h-10 transition-all duration-300 hover:scale-110 z-50"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 transition-all duration-300 ease-in-out ${
            isHomePage || isLightPage ? 'bg-slate-900' : 'bg-white'
          } ${mobileNavOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-5'}`} />
          <span className={`h-0.5 transition-all duration-300 ease-in-out ${
            isHomePage || isLightPage ? 'bg-slate-900' : 'bg-white'
          } ${mobileNavOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-6'}`} />
        </button>
        
        {/* Backdrop overlay when menu is open */}
        {mobileNavOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={closeMobileNav}
          />
        )}
        
        {/* Logo - Center/Left */}
        <Link 
          href="/" 
          className="flex items-center gap-3 ml-2 md:ml-3" 
          onClick={() => {
            closeMobileNav();
            triggerGraphAnimation();
          }}
        >
          <LogoIcon className="h-16 w-16" />
          <div>
            <p className={`text-2xl ${isHomePage || isLightPage ? 'text-slate-900' : 'text-white'}`}>
              <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
            </p>
          </div>
        </Link>

        {/* Navigation Links - Show on desktop for non-home pages */}
        {!isHomePage && (
          <nav className="hidden lg:flex items-center gap-6 ml-8">
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
                className={`text-base font-semibold transition ${
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
          <div className="flex items-center gap-4">
            {user.role === "user" && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <FaUser size={18} />
                </div>
                <span className={`text-base font-semibold ${isHomePage || isLightPage ? 'text-slate-900' : 'text-white'}`}>{user.name}</span>
              </div>
            )}
            <button
              onClick={logout}
              className={`rounded-full border px-6 py-3 text-base font-semibold transition ${
                isHomePage || isLightPage
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-50' 
                  : 'border-slate-700/50 text-white hover:bg-slate-700/50'
              }`}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu - Slides in from left covering entire screen */}
      <div className={`fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
        mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl relative bg-white`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(/arrow-bottom1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/95" />
        <div className="pt-2 pb-6 px-6 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-14">
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
                className={`text-5xl md:text-6xl font-black transition leading-tight ${
                  pathname === link.href 
                    ? "text-gray-900"
                    : "text-gray-800 hover:text-gray-900"
                }`}
                style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.02em'
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
                  className="text-5xl md:text-6xl font-black transition leading-tight text-gray-800 hover:text-gray-900"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  onClick={closeMobileNav}
                  className="text-5xl md:text-6xl font-black transition leading-tight text-gray-800 hover:text-gray-900"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="space-y-14">
                {user.role === "user" && (
                  <div className="flex items-center gap-3 text-gray-900">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-400">
                      <FaUser size={18} />
                    </div>
                    <span className="text-5xl md:text-6xl font-black leading-tight text-gray-900" style={{ 
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em'
                    }}>{user.name}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMobileNav();
                  }}
                  className="w-full text-5xl md:text-6xl font-black transition text-left leading-tight text-gray-800 hover:text-gray-900"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.02em'
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

