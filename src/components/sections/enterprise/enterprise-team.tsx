"use client";

import { FaCrown, FaUserShield, FaUserTie } from "react-icons/fa6";

type Member = {
  name: string;
  title: string;
  role: "Owner" | "Manager" | "Analyst";
  brands: string[];
  avatarColor: string;
};

const members: Member[] = [
  {
    name: "Priya Menon",
    title: "VP, Growth & Partnerships",
    role: "Owner",
    brands: ["Nova Beauty", "Haus Living", "Stride Athletics"],
    avatarColor: "bg-rose-100 text-rose-600",
  },
  {
    name: "Ankur Shah",
    title: "Enterprise Success Manager",
    role: "Manager",
    brands: ["Bloom Foods", "Aurora Skincare"],
    avatarColor: "bg-blue-100 text-blue-600",
  },
  {
    name: "Neha Sethi",
    title: "Marketplace Analytics Lead",
    role: "Analyst",
    brands: ["Portfolio-wide"],
    avatarColor: "bg-emerald-100 text-emerald-600",
  },
];

const roleIcon: Record<Member["role"], JSX.Element> = {
  Owner: <FaCrown className="h-4 w-4 text-amber-500" />,
  Manager: <FaUserTie className="h-4 w-4 text-blue-500" />,
  Analyst: <FaUserShield className="h-4 w-4 text-emerald-500" />,
};

export function EnterpriseTeam() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Enterprise Team
          </p>
          <h3 className="text-xl font-bold text-slate-900">Access & governance</h3>
        </div>
        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Invite member
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {members.map((member) => (
          <div key={member.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${member.avatarColor} font-semibold`}>
                {member.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                <p className="text-xs text-slate-500">{member.title}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
              {roleIcon[member.role]}
              <span>{member.role}</span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-wide text-slate-400">Access scope</p>
              <ul className="space-y-1">
                {member.brands.map((brand) => (
                  <li key={brand} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


