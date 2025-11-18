import clsx from "clsx";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "dark",
}: Props) {
  const isLight = theme === "light";

  return (
    <div
      className={clsx(
        "space-y-3",
        align === "center" && "text-center",
        isLight ? "text-white" : "text-slate-900",
      )}
    >
      {eyebrow ? (
        <p
          className={clsx(
            "text-xs font-semibold uppercase tracking-[0.35em]",
            isLight ? "text-blue-200" : "text-slate-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {description ? (
        <p className={clsx("text-base md:text-lg", isLight ? "text-blue-100" : "text-slate-600")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

