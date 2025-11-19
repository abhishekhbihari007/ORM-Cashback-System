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
    <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat py-20 flex items-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)' }} id="workflow">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      <div className="container-responsive space-y-12 md:space-y-16 relative z-10">
        <div className="space-y-4 md:space-y-5 text-center">
          <p className="section-title text-center text-blue-200">User Flow</p>
          <h3 className="text-3xl font-bold text-white md:text-4xl">
            Structured experiences for brands and shoppers
          </h3>
          <p className="text-blue-100 md:text-lg">
            Every persona gets a tailored workspace for clarity and compliance.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid gap-12 md:gap-16 lg:gap-20 md:grid-cols-2 w-full max-w-6xl">
            {columns.map((column) => (
              <div
                key={column.title}
                className="rounded-[28px] border border-white/30 bg-white/10 backdrop-blur-xl p-10 md:p-12 lg:p-14 shadow-2xl shadow-white/10"
              >
                <h4 className="mb-8 md:mb-10 text-2xl md:text-3xl font-semibold text-white">{column.title}</h4>
                <ol className="space-y-6 md:space-y-7 lg:space-y-8 text-base md:text-lg text-blue-100 leading-relaxed">
                  {column.steps.map((step, index) => (
                    <li key={step} className="flex gap-5 md:gap-6 items-start">
                      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/40 text-base font-semibold text-white flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 text-white/90">{step}</span>
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

