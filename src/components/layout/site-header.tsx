"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/use-ui-store";
import { countries, navLinks } from "@/lib/constants";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export function SiteHeader() {
  const pathname = usePathname();
  const { mobileNavOpen, toggleMobileNav, closeMobileNav, selectedCountry, setCountry } =
    useUIStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-slate-50/80">
        <div className="container-responsive flex flex-wrap items-center justify-between gap-4 py-2 text-[13px] text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-900">Global Presence</span>
            <div className="flex flex-wrap items-center gap-2">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setCountry(country)}
                  className={`rounded-full px-3 py-1 transition ${
                    selectedCountry === country
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">hello@cashback-orm.com</span>
            <div className="flex items-center gap-2 text-slate-500 text-base">
              <FaFacebook />
              <FaInstagram />
              <FaXTwitter />
              <FaLinkedin />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" onClick={closeMobileNav}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white font-black">
            ORM
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Cashback Ecosystem</p>
            <p className="text-xl font-bold text-slate-900">Review Intelligence</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === link.href
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            Login
          </button>
          <button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200">
            Book a Demo
          </button>
        </div>

        <button className="rounded-full border border-slate-200 p-2 lg:hidden" onClick={toggleMobileNav}>
          {mobileNavOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      {mobileNavOpen ? (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={closeMobileNav}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                  pathname === link.href ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600">
              Login
            </button>
            <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-left text-sm font-semibold text-white">
              Book a Demo
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

