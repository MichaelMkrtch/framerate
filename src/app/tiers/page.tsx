import Link from "next/link";

import { api } from "@/polar";

import ProductCard from "@/features/tiers/components/ProductCard";

export default async function TiersPage() {
  const { result } = await api.products.list({ isArchived: false });

  return (
    <div className="flex flex-col gap-y-32">
      <h1 className="text-5xl">Products</h1>
      <div className="grid grid-cols-4 gap-12">
        {result.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
