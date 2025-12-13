import { MobileLayout } from "@/components/layouts/MobileLayout";
import { UserDashboardClient } from "@/components/sections/user/user-dashboard-client";

export default async function UserPage() {
  return (
    <MobileLayout>
      <div className="page-wrapper bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-responsive space-y-8 py-10 relative z-10">
          <UserDashboardClient />
        </div>
      </div>
    </MobileLayout>
  );
}

