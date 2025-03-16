"use client";

import type { ListResourceProduct } from "@polar-sh/sdk/models/components/listresourceproduct.js";
import type { Product } from "@polar-sh/sdk/models/components/product.js";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { toast } from "sonner";

import Header from "@/components/Header";
import { GlowArea } from "@/components/ui/glow";
import { Switch } from "@/components/ui/switch";
import ProductCard from "@/features/polar/components/ProductCard";

export default function TiersPage({
  result,
}: {
  result: ListResourceProduct | undefined;
}) {
  if (!result) {
    toast.error("Something went wrong! Please try again later.");
    redirect("/home");
  }

  // plans array must have at least 2 items
  const [plans, setPlans] = useState<Product[]>(
    result.items.filter((plan) => plan.recurringInterval === "year"),
  );

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (checked) {
      const filteredPlans = result.items.filter(
        (plan) => plan.recurringInterval === "year",
      );

      return setPlans(filteredPlans);
    }

    const filteredPlans = result.items.filter(
      (plan) => plan.recurringInterval === "month",
    );

    return setPlans(filteredPlans);
  }, [checked]);

  const [proTier] = plans.filter((plan) =>
    plan.name.toLowerCase().includes("pro pass"),
  );

  const [premiereTier] = plans.filter((plan) =>
    plan.name.toLowerCase().includes("premiere pass"),
  );

  const proBenefits = [
    "Personalized annual and all-time stats",
    "See friends' average ratings",
    "Pin content to your profile",
    "Advanced filters",
    "Pro badge",
  ];

  const premiereBenefits = [
    "Customizable posters and backdrops",
    "Your name on a dedicated supporters page",
    "Premiere badge",
    "Eternal gratitude of the FrameRate team",
    "...and much more",
  ];

  return (
    <main className="relative z-10 h-full w-full bg-background">
      <div className="absolute bottom-0 left-0 right-0 top-2 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_34px] [mask-image:radial-gradient(ellipse_50%_90%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <Header title="Tiers" />

      <div className="animate-fade-in-fast">
        <div className="relative">
          <div className="absolute left-0 right-0 top-[26px] z-10 mx-auto flex w-fit items-center justify-center gap-x-2 rounded-full border border-white/10 bg-background-darker px-5 py-2 font-semibold tracking-wide">
            <label htmlFor="interval">Monthly</label>
            <Switch
              id="interval"
              checked={checked}
              onCheckedChange={setChecked}
              className="data-[state=checked]:bg-[#441aff] data-[state=unchecked]:bg-[#2a2b32]"
            />
            <label htmlFor="interval">Annual</label>
          </div>

          {plans.length >= 2 && (
            <GlowArea className="flex flex-col items-center justify-center gap-8 px-10 lg:flex-row lg:py-24">
              <ProductCard
                product={proTier}
                highlightColor="#ed4b00"
                benefits={proBenefits}
              />
              <ProductCard
                product={premiereTier}
                highlightColor="#441aff"
                benefits={premiereBenefits}
              />
            </GlowArea>
          )}
        </div>
      </div>
    </main>
  );
}
