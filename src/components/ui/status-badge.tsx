import clsx from "clsx";

type Variant = "primary" | "success" | "warning" | "danger" | "neutral";

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-50 text-blue-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
  neutral: "bg-slate-100 text-slate-700",
};

export function StatusBadge({
  label,
  variant = "neutral",
}: {
  label: string;
  variant?: Variant;
}) {
  return (
    <span className={clsx("pill text-xs font-semibold", variantStyles[variant])}>
      {label}
    </span>
  );
}

