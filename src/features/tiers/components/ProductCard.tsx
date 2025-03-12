import type { Product } from "@polar-sh/sdk/models/components/product.js";

import { useMemo } from "react";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const firstPrice = product.prices[0];

  const price = useMemo(() => {
    switch (firstPrice.amountType) {
      case "fixed":
        // API returns price in cents -- converts to dollars
        return `$${firstPrice.priceAmount / 100}`;
      default:
        return "Something went wrong!";
    }
  }, [firstPrice]);

  return (
    <div className="flex h-full flex-col justify-between gap-y-24 rounded-3xl border border-neutral-900 bg-neutral-950 p-12">
      <div className="flex flex-col gap-y-8">
        <h1 className="text-3xl">{product.name}</h1>
        <p className="text-neutral-400">{product.description}</p>
        <ul>
          {product.benefits.map((benefit) => (
            <li key={benefit.id} className="flex flex-row items-center gap-x-2">
              {benefit.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row items-center justify-between gap-x-4">
        <Link
          className="flex h-8 flex-row items-center justify-center rounded-full bg-white px-4 font-medium text-black"
          href={`/api/checkout?productId=${product.id}&customerExternalId=123xyz`}
        >
          Buy
        </Link>
        <span className="text-neutral-500">{price}</span>
      </div>
    </div>
  );
}
