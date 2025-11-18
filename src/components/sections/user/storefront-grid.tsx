import Link from "next/link";
import Image from "next/image";
import { Storefront } from "@/lib/types";

type Props = {
  storefronts: Storefront[];
};

export function StorefrontGrid({ storefronts }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {storefronts.map((store) => (
        <div key={store.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="relative h-48 w-full">
            <Image
              src={`${store.image}?auto=format&fit=crop&w=600&q=80`}
              alt={store.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-2 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {store.category}
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">{store.name}</h3>
            <p className="text-sm text-slate-500">Reward: {store.reward}</p>
            <Link
              href={`/user/shop/${store.id}`}
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View Products →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

