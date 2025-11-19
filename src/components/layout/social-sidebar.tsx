"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function SocialSidebar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Don't render if not on homepage
  if (!isHomePage) {
    return null;
  }

  const socialLinks = [
    { name: "facebook", href: "#" },
    { name: "instagram", href: "#" },
    { name: "x", href: "#" },
    { name: "linkedin", href: "#" },
    { name: "youtube", href: "#" },
  ];

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block transition-opacity duration-300 ${
        isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 pr-6">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            className="text-white hover:text-slate-300 transition text-base font-normal lowercase"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {social.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

