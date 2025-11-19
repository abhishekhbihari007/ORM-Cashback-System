"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { LogoIcon } from "@/components/ui/logo-icon";

export function SiteFooter() {
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-white" id="contact">
      <div className="container-responsive py-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <LogoIcon className="h-16 w-16" />
              <p className="text-2xl text-white">
                <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
              </p>
            </Link>
            <p className="text-base leading-relaxed text-slate-400">
              Building trust for global brands
            </p>
            <div className="flex items-center gap-5 text-slate-400">
              <Link href="#" className="hover:text-white transition">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaXTwitter size={24} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaLinkedin size={24} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="mb-6 text-base font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#about" className="text-slate-400 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#partners" className="text-slate-400 hover:text-white transition">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div>
            <h4 className="mb-6 text-base font-semibold uppercase tracking-wider text-white">
              Capabilities
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition">
                  Real-time Intelligence
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition">
                  Verified Reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-white transition">
                  Sentiment Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Trust */}
          <div>
            <h4 className="mb-6 text-base font-semibold uppercase tracking-wider text-white">
              Legal & Trust
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-slate-400 hover:text-white transition">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4">
        <div className="container-responsive text-center text-base text-slate-400">
          © {new Date().getFullYear()} ORM Ecosystem. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

