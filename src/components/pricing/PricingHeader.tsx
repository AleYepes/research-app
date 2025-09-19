import { X } from "lucide-react";

export function PricingHeader() {
  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] px-6 py-4 md:pt-[4.5rem] md:pb-6">
      <div></div>
      <div className="my-1 flex flex-col items-center justify-center md:mt-0 md:mb-0">
        <h2 className="text-2xl font-semibold">Upgrade your plan</h2>
      </div>
      <button className="text-primary justify-self-end opacity-50 transition hover:opacity-75 md:absolute md:end-6 md:top-6">
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}
