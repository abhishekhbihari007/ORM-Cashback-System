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
        { label: "How it Works", href: "/how-it-works" },
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

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-responsive flex items-center justify-between py-6">
        <Link 
          href="/" 
          className="flex items-center gap-3" 
          onClick={() => {
            closeMobileNav();
            triggerGraphAnimation();
          }}
        >
          <LogoIcon className="h-16 w-16" />
          <div>
            <p className="text-2xl text-slate-900">
              <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
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
              className={`rounded-full px-6 py-3 text-base font-semibold transition ${
                pathname === link.href
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <Link
              href="/login"
              className="rounded-full bg-slate-900 px-8 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition shadow-sm"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              {user.role === "user" && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaUser size={18} />
                  </div>
                  <span className="text-base font-semibold text-slate-900">{user.name}</span>
                </div>
              )}
              <button
                onClick={logout}
                className="rounded-full border border-slate-200 px-6 py-3 text-base font-semibold text-slate-600 hover:text-slate-900 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <button className="rounded-full border border-slate-200 p-3 lg:hidden" onClick={toggleMobileNav}>
          {mobileNavOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {mobileNavOpen ? (
        <div className="border-t border-slate-100 bg-white px-4 py-6 lg:hidden">
          <div className="flex flex-col gap-3">
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
                className={`rounded-2xl px-5 py-4 text-base font-semibold ${
                  pathname === link.href ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <Link
                href="/login"
                onClick={closeMobileNav}
                className="rounded-2xl border border-slate-200 px-5 py-4 text-left text-base font-semibold text-slate-600"
              >
                Login
              </Link>
            ) : (
              <div className="space-y-3">
                {user.role === "user" && (
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FaUser size={18} />
                    </div>
                    <span className="text-base font-semibold text-slate-900">{user.name}</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMobileNav();
                  }}
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-left text-base font-semibold text-slate-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

