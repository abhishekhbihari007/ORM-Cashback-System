import Link from "next/link";
import Image from "next/image";
import { Deal } from "@/lib/types";

type Props = {
  deals: Deal[];
};

export function DealsFeed({ deals }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {deals.map((deal) => (
        <Link
          key={deal.id}
          href={`/feed/${deal.id}`}
          className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
            <Image
              src={deal.productImage}
              alt={deal.productName}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
              {deal.cashbackPercent}% Cashback
            </div>
          </div>
          <div className="p-4">
            <p className="line-clamp-2 text-sm font-semibold text-slate-900">{deal.productName}</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">₹{deal.price.toFixed(2)}</p>
                <p className="text-xs text-green-600">Get ₹{deal.cashbackAmount.toFixed(2)} back</p>
              </div>
              <button className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700">
                Get Deal
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

