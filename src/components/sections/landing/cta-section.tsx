export function CtaSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-200/60 via-slate-50 to-slate-200/40 py-20 overflow-hidden">
      {/* Background Image - Orange Glow Pattern */}
      <div 
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(249, 115, 22, 0.6) 0%, rgba(251, 146, 60, 0.5) 20%, rgba(234, 88, 12, 0.4) 35%, rgba(220, 38, 38, 0.3) 50%, rgba(239, 68, 68, 0.2) 65%, transparent 85%)',
          backgroundSize: '110% 110%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(90px)'
        }}
      />
      
      {/* Glow effect behind the card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-full max-w-4xl rounded-3xl bg-orange-100/20 blur-3xl" />
      </div>
      
      {/* Floating CTA Card */}
      <div className="container-responsive relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-orange-200/50 bg-gradient-to-r from-orange-400 to-orange-600 p-12 text-center shadow-2xl shadow-orange-500/20">
          <h3 className="text-4xl font-bold text-white">
            Start turning reviews into revenue.
          </h3>
          <p className="mx-auto mt-4 max-w-[600px] text-orange-50/90">
            Plug into our cashback users, incentive playbooks, and marketplace policy desk to boost
            visibility across every SKU.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-white px-6 py-3 font-semibold text-orange-600 shadow-lg transition hover:bg-orange-50 hover:shadow-xl">
              Talk to Reputation Strategist
            </button>
            <button className="rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-6 py-3 font-semibold text-white transition hover:bg-white/20">
              Download Product One-pager
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

