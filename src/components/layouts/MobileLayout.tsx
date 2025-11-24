"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAnimation } from "@/contexts/AnimationContext";
import { FeedHeader } from "@/components/layout/feed-header";
import { FaHouse, FaUpload, FaWallet } from "react-icons/fa6";

type MobileLayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
};

export function MobileLayout({ children, showHeader = true }: MobileLayoutProps) {
  const pathname = usePathname();
  const { triggerGraphAnimation } = useAnimation();
  
  // Bottom nav removed for shoppers
  const showBottomNav = false;

  const navItems = [
    { href: "/feed", label: "Home", icon: FaHouse },
    { href: "/upload", label: "Upload", icon: FaUpload },
    { href: "/wallet", label: "Wallet", icon: FaWallet },
  ];
  
  // Check if current path matches any nav item or user dashboard
  const isNavActive = (href: string) => {
    if (href === "/feed") {
      return pathname === "/feed" || pathname === "/user" || pathname.startsWith("/feed/");
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <div className={`flex min-h-screen flex-col ${showBottomNav ? 'pb-20' : ''}`}>
      {showHeader && <FeedHeader />}
      <main className="flex-1">{children}</main>
      
      {/* Bottom Navigation Bar - Only for logged-in shoppers */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isNavActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (item.label === "Home" || item.href === "/feed") {
                      triggerGraphAnimation();
                    }
                  }}
                  className={`flex flex-col items-center gap-1 px-4 py-3 transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}

