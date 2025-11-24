import { EnterpriseOverview } from "@/components/sections/enterprise/enterprise-overview";
import { EnterpriseBrandTable } from "@/components/sections/enterprise/enterprise-brand-table";
import { EnterpriseAnalytics } from "@/components/sections/enterprise/enterprise-analytics";
import { EnterpriseTeam } from "@/components/sections/enterprise/enterprise-team";

export const metadata = {
  title: "Enterprise Command Center",
};

export default function EnterpriseDashboardPage() {
  return (
    <div className="space-y-10 bg-slate-50 p-6 lg:p-10">
      <EnterpriseOverview />
      <EnterpriseAnalytics />
      <EnterpriseBrandTable />
      <EnterpriseTeam />
    </div>
  );
}


