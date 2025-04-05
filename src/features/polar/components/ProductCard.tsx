import type { Product } from "@polar-sh/sdk/models/components/product.js";

import { useMemo } from "react";

import { Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Glow } from "@/components/ui/glow";

type ProductCardProps = {
  userId: string;
  product: Product;
  benefits: string[];
  highlightColor: string;
};

export default function ProductCard({
  userId,
  product,
  benefits,
  highlightColor,
}: ProductCardProps) {
  // API returns price in cents
  const priceInCents = product.prices[0];

  const price = useMemo(() => {
    switch (priceInCents.amountType) {
      case "fixed":
        // Converts cents to dollars
        return `$${priceInCents.priceAmount / 100}`;
      default:
        return "Something went wrong!";
    }
  }, [priceInCents]);

  return (
    <Glow color={highlightColor} className="rounded-xl">
      <Card className="min-w-96 max-w-md cursor-default">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <CardDescription className="mb-2 text-base font-medium tracking-wide text-gray">
            {product.name.includes("Pro")
              ? "Your reviews, powered up"
              : "The ultimate experience"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2 pb-4 text-lg font-medium tracking-wide text-gray">
            <span className="mr-1 text-4xl font-semibold tracking-normal text-foreground">
              {price}
            </span>{" "}
            per {product.recurringInterval}
          </p>

          <a
            href={`/api/checkout?productId=${product.id}&customerExternalId=${userId}`}
            rel="noopener noreferrer"
            className={`${product.name.includes("Pro") ? "border border-foreground border-opacity-50 bg-foreground text-background hover:border-[#F0602C] hover:border-opacity-100 hover:bg-[#ed4b00]" : "border border-[#5e39ff] bg-[#522aff] text-foreground"} relative flex h-10 items-center justify-center rounded-full px-4 font-bold transition-colors duration-100 ease-in before:absolute before:left-0 before:h-full before:w-full before:rounded-full before:bg-gradient-to-b before:from-white/15 before:to-transparent before:opacity-0 before:transition-opacity before:duration-100 before:ease-in hover:before:opacity-100`}
          >
            Subscribe
          </a>

          <ul className="mt-2 pt-4">
            <p className="mb-2.5 text-lg font-medium">Upcoming features</p>
            {benefits.map((benefit, index) => {
              return (
                <li
                  key={index}
                  className="mb-1.5 flex items-center gap-x-2 text-sm font-medium tracking-wider"
                >
                  <span className="text-foreground">
                    <Check size={16} />
                  </span>
                  {benefit}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </Glow>
  );
}
