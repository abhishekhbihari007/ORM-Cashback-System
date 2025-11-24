import { DashboardLayout } from "@/components/layouts/DashboardLayout";

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="enterprise">{children}</DashboardLayout>;
}


