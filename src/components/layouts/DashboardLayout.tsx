"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import { Icons } from "@/lib/icons";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const brandNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Icons.ChartLine },
  { href: "/brand/storefront", label: "Storefront", icon: Icons.Box },
  { href: "/brand/products", label: "Products", icon: Icons.Box },
  { href: "/brand/products/select", label: "Select Products", icon: Icons.PlusCircle },
  { href: "/brand/campaigns/create", label: "Create Campaign", icon: Icons.PlusCircle },
  { href: "/brand/orders", label: "Orders", icon: Icons.FileText },
  { href: "/brand/reviews", label: "Reviews", icon: Icons.FileText },
  { href: "/brand/budget", label: "Add Budget", icon: Icons.Wallet },
];

const adminNavItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: Icons.ChartLine },
  { href: "/admin/verifier", label: "Verifier", icon: Icons.FileCheck },
  { href: "/admin/users", label: "User Manager", icon: Icons.Users },
  { href: "/admin/payouts", label: "Payout Manager", icon: Icons.DollarSign },
  { href: "/admin/review-pipeline", label: "Review Pipeline", icon: Icons.FileText },
  { href: "/admin/user-activities", label: "Activities", icon: Icons.ChartBar },
];

const enterpriseNavItems: NavItem[] = [
  { href: "/enterprise", label: "Enterprise Home", icon: Icons.ChartLine },
  { href: "/enterprise/brands", label: "Brands", icon: Icons.Building },
  { href: "/enterprise/analytics", label: "Analytics", icon: Icons.ChartBar },
  { href: "/enterprise/team", label: "Team & Access", icon: Icons.Users },
];

export function DashboardLayout({ children, role }: { children: React.ReactNode; role: UserRole }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const navItems =
    role === "brand" ? brandNavItems : role === "admin" ? adminNavItems : enterpriseNavItems;
  const panelTitle =
    role === "brand"
      ? "Brand Portal"
      : role === "admin"
      ? "Admin Panel"
      : "Enterprise Hub";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          {/* Logo/Header */}
          <div className="border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold">
                  {user?.name?.charAt(0) || "O"}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">{panelTitle}</p>
                  <p className="text-sm font-bold text-slate-900">{user?.name || "Dashboard"}</p>
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
              <Icons.LogOut className="h-5 w-5" />
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                {user?.name?.charAt(0) || "O"}
              </div>
              <p className="text-sm font-bold text-slate-900">{panelTitle}</p>
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

