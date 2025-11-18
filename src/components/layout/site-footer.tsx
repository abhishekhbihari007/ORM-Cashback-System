import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-white" id="contact">
      <div className="container-responsive py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 font-black">
                K
              </div>
              <p className="text-xl font-bold text-white">Kudos</p>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Building trust for global brands
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="#" className="hover:text-white transition">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaXTwitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaLinkedin size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
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
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm">
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
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal & Trust
            </h4>
            <ul className="space-y-3 text-sm">
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
      <div className="border-t border-slate-800 py-5">
        <div className="container-responsive text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Kudos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

