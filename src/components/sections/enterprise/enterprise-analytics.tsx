"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

const reviewVelocity = [
  { week: "Week 1", reviews: 720, goal: 600 },
  { week: "Week 2", reviews: 860, goal: 620 },
  { week: "Week 3", reviews: 940, goal: 640 },
  { week: "Week 4", reviews: 1020, goal: 660 },
  { week: "Week 5", reviews: 1180, goal: 700 },
  { week: "Week 6", reviews: 1280, goal: 720 },
];

const budgetUsage = [
  { name: "Nova Beauty Co.", spend: 82 },
  { name: "Stride Athletics", spend: 54 },
  { name: "Haus Living", spend: 90 },
  { name: "Bloom Foods", spend: 47 },
  { name: "Aurora Skincare", spend: 62 },
];

export function EnterpriseAnalytics() {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Review velocity
            </p>
            <h3 className="text-xl font-bold text-slate-900">Weekly cross-brand output</h3>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            +18% vs last cycle
          </span>
        </div>
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reviewVelocity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="week" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Line type="monotone" dataKey="goal" stroke="#CBD5F5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="reviews" stroke="#4338CA" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Incentive burn rate
            </p>
            <h3 className="text-xl font-bold text-slate-900">Spend distribution by brand</h3>
          </div>
          <span className="text-sm font-semibold text-slate-500">₹14.2L total budget</span>
        </div>
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={budgetUsage}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB923C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="spend"
                stroke="#EA580C"
                fillOpacity={1}
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}


