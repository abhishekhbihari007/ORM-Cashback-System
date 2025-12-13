import { ProductsPageClient } from "@/components/sections/brand/products-page-client";

export const metadata = {
  title: "Brand Products • ORM Dashboard",
};

export default function BrandProductsPage() {
  return (
    <div className="bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Products</p>
          <h1 className="text-4xl font-bold text-slate-900">SKU level reputation controls</h1>
          <p className="text-slate-600">
            Allocate review slots, monitor sentiment, and track progress across every marketplace.
          </p>
        </div>
        <ProductsPageClient />
      </div>
    </div>
  );
}

