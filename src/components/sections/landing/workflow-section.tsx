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

const adminFlow = [
  "Monitor user activities",
  "Approve reimbursements",
  "Flag anomalies",
  "Update marketplace policies",
];

export function WorkflowSection() {
  const columns = [
    { title: "Brand Dashboard", steps: brandFlow },
    { title: "User Dashboard", steps: userFlow },
    { title: "Admin Panel", steps: adminFlow },
  ];

  return (
    <section className="bg-white py-20" id="workflow">
      <div className="container-responsive space-y-8">
        <div className="space-y-3 text-center">
          <p className="section-title text-center">User Flow</p>
          <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Structured experiences for brands, shoppers, and admins
          </h3>
          <p className="text-slate-600 md:text-lg">
            Every persona gets a tailored workspace for clarity and compliance.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.title}
              className="rounded-[28px] border border-slate-100 bg-slate-50 p-6 shadow-sm"
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
    </section>
  );
}

