import { PricingCardSkeleton } from "@/components/pricing/PricingCardSkeleton";

export default function Loading() {
  return (
    <div className="flex justify-center gap-6 flex-col md:flex-row px-4">
      <PricingCardSkeleton />
      <PricingCardSkeleton />
      <PricingCardSkeleton />
    </div>
  );
}
