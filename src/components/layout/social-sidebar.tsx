"use client";

import Link from "next/link";

export function SocialSidebar() {
  const socialLinks = [
    { name: "facebook", href: "#" },
    { name: "instagram", href: "#" },
    { name: "x", href: "#" },
    { name: "linkedin", href: "#" },
    { name: "youtube", href: "#" },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
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

