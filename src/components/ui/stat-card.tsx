type Props = {
  label: string;
  value: string;
  helper?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
};

export function StatCard({ label, value, helper, trend }: Props) {
  return (
    <div className="glass-panel flex flex-col gap-4 rounded-3xl">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <span className="metric-number">{value}</span>
        {trend ? (
          <span
            className={`pill text-xs ${
              trend.isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
          >
            {trend.value}
          </span>
        ) : null}
      </div>
      {helper ? <p className="text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}

