export function CtaSection() {
  return (
    <section className="relative bg-white py-20">
      {/* Glow effect behind the card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-full max-w-4xl rounded-3xl bg-slate-900/20 blur-3xl" />
      </div>
      
      {/* Floating CTA Card */}
      <div className="container-responsive relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center shadow-2xl">
          <h3 className="text-4xl font-bold text-white">
            Start turning reviews into revenue.
          </h3>
          <p className="mx-auto mt-4 max-w-[600px] text-slate-400">
            Plug into our cashback users, incentive playbooks, and marketplace policy desk to boost
            visibility across every SKU.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100">
              Talk to Reputation Strategist
            </button>
            <button className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Download Product One-pager
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

