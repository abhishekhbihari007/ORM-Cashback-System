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
    <div 
      className="flex flex-col gap-3 rounded-2xl bg-slate-200/90 border border-slate-300/50 p-6 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-100 hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
      style={{ willChange: 'transform' }}
    >
      <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <span className="text-4xl font-bold text-slate-900">{value}</span>
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
      {helper ? <p className="text-sm text-slate-600">{helper}</p> : null}
    </div>
  );
}

