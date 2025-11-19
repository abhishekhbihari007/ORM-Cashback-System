const partners = [
  "Amazon",
  "Flipkart",
  "Nykaa",
  "Meesho",
  "Myntra",
  "Ajio",
  "Noon",
  "Sephora",
];

export function PartnersSection() {
  return (
    <section className="border-y border-orange-100 bg-orange-50 py-10" id="partners">
      <div className="container-responsive space-y-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          Trusted by omnichannel D2C brands
        </p>
        <div className="grid grid-cols-2 gap-4 text-center text-lg font-semibold text-slate-500 sm:grid-cols-4">
          {partners.map((partner) => (
            <div key={partner} className="rounded-2xl border border-orange-100 bg-white/80 py-4">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

