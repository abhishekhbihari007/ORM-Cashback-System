import Link from "next/link";
import { quickLinks, serviceHighlights } from "@/lib/constants";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50" id="contact">
      <div className="container-responsive grid gap-10 py-12 md:grid-cols-[1.5fr,1fr,1fr]">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              Cashback ORM Suite
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              Trusted marketplace reputation partners
            </p>
            <p className="mt-4 text-slate-600">
              Integrated with our influencer marketing agency and cashback ecosystem to deliver
              verified, policy-compliant reviews across 5+ geographies.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-500">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedin />
            <FaYoutube />
          </div>
          <div className="text-sm text-slate-500">
            Splendor Spectrum One, Tower 1, Gurugram 122001 • hello@cashback-orm.com
          </div>
        </div>

        <div>
          <p className="section-title">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-title">Capabilities</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {serviceHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white/60 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Cashback ORM. Built for compliant global reputation programs.
      </div>
    </footer>
  );
}

