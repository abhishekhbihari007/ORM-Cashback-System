import { EnterpriseTeam } from "@/components/sections/enterprise/enterprise-team";

const pendingInvites = [
  { email: "ops.lead@acme.com", role: "Manager", status: "Sent 2d ago" },
  { email: "analytics@brandlabs.io", role: "Analyst", status: "Pending acceptance" },
];

export const metadata = {
  title: "Enterprise Team",
};

export default function EnterpriseTeamPage() {
  return (
    <div className="space-y-10 bg-slate-50 p-6 lg:p-10">
      <EnterpriseTeam />

      <section className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6">
        <h3 className="text-lg font-semibold text-slate-900">Pending invitations</h3>
        <p className="text-sm text-slate-600">
          Track outstanding invites and resend onboarding links.
        </p>
        <div className="mt-4 divide-y divide-slate-200 text-sm text-slate-700">
          {pendingInvites.map((invite) => (
            <div
              key={invite.email}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div>
                <p className="font-semibold">{invite.email}</p>
                <p className="text-xs text-slate-500">{invite.status}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                  {invite.role}
                </span>
                <button className="text-sm font-semibold text-slate-900 hover:underline">
                  Resend invite
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


