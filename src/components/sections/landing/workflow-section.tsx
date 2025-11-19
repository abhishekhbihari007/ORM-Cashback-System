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
    <section className="bg-orange-50 py-20" id="workflow">
      <div className="container-responsive space-y-8">
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
                className="rounded-[28px] border border-orange-100 bg-white/80 p-6 shadow-sm shadow-orange-100"
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

