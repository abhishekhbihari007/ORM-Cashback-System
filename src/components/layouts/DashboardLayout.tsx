"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import {
  FaChartLine,
  FaBox,
  FaDollarSign,
  FaUsers,
  FaFileCircleCheck,
  FaChartBar,
  FaGear,
  FaRightFromBracket,
  FaWallet,
  FaCirclePlus,
  FaFileLines,
} from "react-icons/fa6";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const brandNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: FaChartLine },
  { href: "/brand/storefront", label: "Storefront", icon: FaBox },
  { href: "/brand/products", label: "Products", icon: FaBox },
  { href: "/brand/products/select", label: "Select Products", icon: FaCirclePlus },
  { href: "/brand/campaigns/create", label: "Create Campaign", icon: FaCirclePlus },
  { href: "/brand/orders", label: "Orders", icon: FaFileLines },
  { href: "/brand/reviews", label: "Reviews", icon: FaFileLines },
  { href: "/brand/budget", label: "Add Budget", icon: FaWallet },
];

const adminNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: FaChartLine },
  { href: "/admin/verifier", label: "Verifier", icon: FaFileCircleCheck },
  { href: "/admin/users", label: "User Manager", icon: FaUsers },
  { href: "/admin/payouts", label: "Payout Manager", icon: FaDollarSign },
  { href: "/admin/review-pipeline", label: "Review Pipeline", icon: FaFileLines },
  { href: "/admin/user-activities", label: "Activities", icon: FaChartBar },
];

export function DashboardLayout({ children, role }: { children: React.ReactNode; role: UserRole }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const navItems = role === "brand" ? brandNavItems : adminNavItems;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          {/* Logo/Header */}
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-black">
                K
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  {role === "brand" ? "Brand Portal" : "Admin Panel"}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {user?.name || "Dashboard"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <FaRightFromBracket size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-black">
                K
              </div>
              <p className="text-sm font-bold text-slate-900">
                {role === "brand" ? "Brand Portal" : "Admin Panel"}
              </p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

