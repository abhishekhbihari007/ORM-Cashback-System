export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
      <div className="container-responsive flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">
            Ready to scale reviews
          </p>
          <h3 className="text-3xl font-bold md:text-4xl">
            Launch a compliant review engine in less than 7 days.
          </h3>
          <p className="text-white/80">
            Plug into our cashback users, incentive playbooks, and marketplace policy desk to boost
            visibility across every SKU.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-slate-900/20">
            Talk to Reputation Strategist
          </button>
          <button className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white">
            Download Product One-pager
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.2),_transparent_45%),radial-gradient(circle_at_80%_0,_rgba(14,165,233,0.25),_transparent_40%)]" />
    </section>
  );
}

