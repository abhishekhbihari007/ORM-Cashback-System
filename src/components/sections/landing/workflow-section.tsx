const brandFlow = [
  "Signup / Login",
  "Provide storefront link",
  "Select SKUs + review slots",
  "Track orders and reviews",
  "Manage budgets & compliance",
];

const userFlow = [
  "Browse curated storefronts",
  "Buy with cashback instructions",
  "Submit proof & reviews",
  "Track reimbursements",
];

export function WorkflowSection() {
  const columns = [
    { title: "Brand Dashboard", steps: brandFlow },
    { title: "User Dashboard", steps: userFlow },
  ];

  return (
    <section className="relative bg-gradient-to-b from-red-100/70 via-red-50/50 to-red-100/60 py-20 overflow-hidden" id="workflow">
      {/* Background Image - Dramatic Shadow Pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 110% 70% at 75% 50%, rgba(220, 38, 38, 0.7) 0%, rgba(239, 68, 68, 0.6) 15%, rgba(185, 28, 28, 0.5) 30%, rgba(153, 27, 27, 0.4) 45%, rgba(127, 29, 29, 0.3) 60%, transparent 75%)',
          backgroundSize: '110% 110%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(100px)',
          transform: 'rotate(-15deg)'
        }}
      />
      
      {/* Abstract Shadow/Shape Effect - Right Side */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-25">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'rotate(-20deg)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 100% at 30% 70%, rgba(185, 28, 28, 0.3) 0%, transparent 60%)',
          filter: 'blur(60px)',
          transform: 'rotate(15deg)'
        }} />
      </div>
      
      <div className="container-responsive space-y-8 relative z-10">
        <div className="space-y-3 text-center">
          <p className="section-title text-center">User Flow</p>
          <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Structured experiences for brands and shoppers
          </h3>
          <p className="text-slate-600 md:text-lg">
            Every persona gets a tailored workspace for clarity and compliance.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl">
            {columns.map((column) => (
              <div
                key={column.title}
                className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60"
              >
                <h4 className="mb-4 text-xl font-semibold text-slate-900">{column.title}</h4>
                <ol className="space-y-3 text-sm text-slate-600">
                  {column.steps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-900">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

