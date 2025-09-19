import { Button } from "@/components/ui/button";
import { checkoutAction } from "@/lib/payments/actions";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Feature {
  text: string;
  icon?: React.ReactNode;
}

interface PricingCardProps {
  plan: string;
  price: string;
  priceSubtitle?: string;
  description: string;
  features: Feature[];
  isCurrentPlan?: boolean;
  isPopular?: boolean;
  buttonText: string;
  vatText?: string;
  footerText?: string;
  priceId?: string;
}

export function PricingCard({
  plan,
  price,
  priceSubtitle,
  description,
  features,
  isCurrentPlan,
  isPopular,
  buttonText,
  vatText,
  footerText,
  priceId,
}: PricingCardProps) {
  const cardClasses = cn(
    "border md:min-h-[30rem] md:max-w-96 md:pb-6 relative flex flex-1 flex-col justify-center gap-4 rounded-xl px-6 py-6.5 text-sm bg-white dark:bg-gray-900",
    {
      "md:-mt-4 md:-mb-4 border-purple-300 bg-purple-50 dark:bg-purple-950 dark:border-purple-800":
        isPopular,
    },
  );

  return (
    <div
      data-testid={`${plan.toLowerCase()}-pricing-modal-column`}
      className={cardClasses}
      id={isPopular ? "plus-pricing" : ""}
    >
      <div className="relative flex flex-col mt-0">
        <div className="flex flex-col gap-1 gap-5 rounded-2xl">
          <p className="flex items-center gap-2 justify-between text-[28px] font-medium">
            {plan}
            {isPopular && (
              <span className="ms-1 rounded-full px-2 py-1 text-xs font-semibold bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                POPULAR
              </span>
            )}
          </p>
          <div className="flex items-end gap-1.5">
            <div className="flex text-primary">
              <div className="text-2xl text-gray-500 text-secondary text-xl">
                €
              </div>
              <div className="text-5xl">{price}</div>
            </div>
            {priceSubtitle && (
              <div className="flex items-baseline gap-1.5">
                <div className="mt-auto mb-0.5 flex h-full flex-col items-start">
                  <p className="text-gray-500 w-full text-xs">
                    {priceSubtitle}
                  </p>
                  {vatText && (
                    <p className="text-gray-500 text-xs">{vatText}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-primary text-base mt-4 font-medium">{description}</p>
      </div>
      <div className="mb-2.5 w-full">
        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <Button
            className="w-full"
            disabled={isCurrentPlan}
            variant={isPopular ? "default" : "outline"}
          >
            {isCurrentPlan ? "Your current plan" : buttonText}
          </Button>
        </form>
      </div>
      <div className="flex flex-col grow gap-2">
        <ul className="mb-2 flex flex-col gap-5">
          {features.map((feature, index) => (
            <li key={index} className="relative">
              <div className="text-l flex justify-start gap-3.5">
                {feature.icon || (
                  <Check className="h-5 w-5 shrink-0 text-orange-500" />
                )}
                <span className="text-primary font-normal">{feature.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {footerText && (
        <div>
          <div className="relative flex flex-col text-xs text-gray-500 gap-0.5 pt-3">
            <div>
              {footerText}{" "}
              <a
                className="underline font-medium"
                href="https://help.openai.com/en/collections/3943089-billing"
                target="_blank"
                rel="noreferrer"
              >
                See billing help
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
