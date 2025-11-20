export function CtaSection() {
  return (
    <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat py-20 flex items-center overflow-hidden" style={{ backgroundImage: "url('/68f7851e-a0bd-4bec-b1f0-b9e75940b806.avif')" }}>
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-red-500/30 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />
      
      {/* Glow effect behind the card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[500px] w-full max-w-5xl rounded-3xl bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 blur-3xl opacity-60 animate-pulse" />
      </div>
      
      {/* Floating CTA Card */}
      <div className="container-responsive relative z-10">
        <div className="group mx-auto max-w-5xl rounded-3xl border border-white/40 bg-white/10 backdrop-blur-2xl p-12 md:p-16 text-center shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-white/30">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-white/0 opacity-50" />
          
          <div className="relative z-10">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-orange-50 to-white bg-clip-text text-transparent">
                Start turning reviews
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-50 via-white to-orange-50 bg-clip-text text-transparent">
                into revenue.
              </span>
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-orange-50/95 leading-relaxed">
              Plug into our cashback users, incentive playbooks, and marketplace policy desk to boost
              visibility across every SKU.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <button className="group/btn relative rounded-full bg-white px-8 py-4 font-bold text-orange-600 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-white/50 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Talk to Reputation Strategist
                  <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="group/btn relative rounded-full border-2 border-white/90 bg-white/10 backdrop-blur-sm px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-xl hover:shadow-white/20">
                <span className="relative z-10 flex items-center gap-2">
                  Download Product One-pager
                  <svg className="w-5 h-5 transition-transform group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

