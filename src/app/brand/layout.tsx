import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="brand">{children}</DashboardLayout>;
}

