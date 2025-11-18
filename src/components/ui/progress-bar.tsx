type Props = {
  value: number;
};

export function ProgressBar({ value }: Props) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 transition-all"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

