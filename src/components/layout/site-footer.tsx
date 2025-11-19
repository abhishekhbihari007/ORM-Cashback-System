"use client";

import Image from "next/image";
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
    <footer className="relative bg-white text-slate-900 overflow-hidden" id="contact">
      {/* Optional subtle texture pattern - very light (matching hero) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(15, 23, 42) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Arrow Bottom Decoration - PNG Image on Right Side */}
      <div className="absolute bottom-0 right-0 z-20 pointer-events-none overflow-hidden">
        <div className="relative" style={{ width: '800px', height: '400px' }}>
          <Image 
            src="/arrow-bottom1.png" 
            alt="" 
            fill
            className="object-contain object-bottom-right"
            priority={false}
            unoptimized
            sizes="800px"
          />
        </div>
      </div>
      
      <div className="container-responsive py-12 relative z-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <LogoIcon className="h-16 w-16" />
              <p className="text-2xl text-slate-900">
                <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
              </p>
            </Link>
            <p className="text-base leading-relaxed text-slate-600">
              Building trust for global brands
            </p>
            <div className="flex items-center gap-5 text-slate-600">
              <Link href="#" className="hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
                <FaFacebook size={24} />
              </Link>
              <Link href="#" className="hover:text-pink-600 transition-colors duration-300 hover:scale-110 transform">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="hover:text-slate-900 transition-colors duration-300 hover:scale-110 transform">
                <FaXTwitter size={24} />
              </Link>
              <Link href="#" className="hover:text-blue-700 transition-colors duration-300 hover:scale-110 transform">
                <FaLinkedin size={24} />
              </Link>
              <Link href="#" className="hover:text-red-600 transition-colors duration-300 hover:scale-110 transform">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="mb-6 text-base font-semibold uppercase tracking-wider text-slate-900">
              Company
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#about" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#partners" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div>
            <h4 className="mb-6 text-base font-semibold uppercase tracking-wider text-slate-900">
              Capabilities
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Real-time Intelligence
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Verified Reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Sentiment Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Trust */}
          <div>
            <h4 className="mb-6 text-base font-semibold uppercase tracking-wider text-slate-900">
              Legal & Trust
            </h4>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 border-t border-slate-200 relative z-10">
        <div className="container-responsive text-center text-base text-slate-600">
          © {new Date().getFullYear()} ORM Ecosystem. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

